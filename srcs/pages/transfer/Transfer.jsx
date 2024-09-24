import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { POPUP } from '../../components/popUp/PopUP';
import { useState } from 'react';
import './transfer.css'
import MemberCard from '../../components/memberCard/MemberCard'
import Liff_Id from '../../assets/Liff_Id';
import useLineLogin from '../../utils/addons/useLineLogin';
import { USER_ACTION } from '../../apis/userApi';
import liff from '@line/liff';
import slideGif from '../../assets/arrow.gif'; // Import the GIF file
import { BASE_URL } from '../../config/HostConfig';


function Transfer() {
    const [lineProfile, setLineProfile] = useState(null);
    const [receiverLine, setReceiverLine] = useState(null);
    // const [userCard, setUserCard] = useState({
    //     card_url: ''
    // });
    const [statusCard, setStatus] = useState(false);
    const [moveCard, setMoveCard] = useState('0');
    const [data, setData] = useState({ userCard: '', lineProfile: null });
    // const [receiver, setReceiver] = useState({
    //     receiver_id: ''
    // });

    const location = useLocation();

    useEffect(() => {
        const savedReceiver = localStorage.getItem('receiver_id');
        if (savedReceiver) {
            // setReceiver(savedReceiver);
        } else if (location.state) {
            localStorage.setItem('receiver_id', location.state.receiver_id);
            // setReceiver(location.state.receiver_id);
        }
    }, [location.state]);

    useEffect(() => {
        pageInit();
    }, [])

    useEffect(() => {
        if (statusCard) {
            console.log("userCard : ", data.userCard);
            if (data.userCard.balance === 0) {

                POPUP.warningPopUp({
                    title: 'โอ๊ะโอ',
                    text: 'คะแนนของคุณไม่เพียงพอ',
                    function: () => {
                        liff.closeWindow();
                    } // Correct way to pass the function
                })
            }
        }
    }, [statusCard])

    useEffect(() => {
        if (moveCard === '1') {
            moveCardTrue()
        }
    }, [moveCard])

    const pageInit = async () => {
        // await useLineLogin(Liff_Id.transfer);
        userInit();
        receiverProfile()
        localStorage.removeItem('receiver_id');
    }

    const userInit = async () => {
        try {
            const storedProfile = localStorage.getItem('lineProfile');
            const profile = storedProfile ? JSON.parse(storedProfile) : null;
            setLineProfile(profile);

            const payload = { user_id: profile.user_id };
            const res = await USER_ACTION.getCardByUserId(payload);

            if (res.status) {
                setStatus(res.status);
                // setUserCard(res.data);
                setData({
                    userCard: res.data,
                    lineProfile: profile
                });
            } else {
                console.error("Error fetching card data:", res.status);
            }

        } catch (error) {
            console.error("getCardByUserId API call error:", error);
        }
    };

    const receiverProfile = async () => {
        const receiver_id = localStorage.getItem('receiver_id');
        console.log('receiverProfile receiver_id', receiver_id);

        const payload = { user_id: receiver_id };

        const res = await USER_ACTION.getProfile(payload);
        console.log('receiverProfile', res);

        setReceiverLine(res)
    };

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const [positionLocked, setPositionLocked] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    // Define the drag handler
    const bind = useDrag(async ({ down, movement: [mx, my] }) => {
        if (alertVisible) return; // Prevent dragging if alert is visible

        const pos = -250

        const newY = positionLocked ? pos : (down ? Math.min(0, Math.max(my, pos)) : 0);

        api.start({ x: down ? mx : 0, y: newY, immediate: down });
        console.log("newY : ", newY);

        if (newY <= pos && !positionLocked) {
            if (newY === pos && moveCard === '0') {
                setMoveCard('1')
                setPositionLocked(true);
                setAlertVisible(true); // Lock position while alert is visible
                // moveCardTrue()
            }
        }
    });

    const moveCardTrue = async () => {

        const result = await Swal.fire({
            input: "textarea",
            inputLabel: "เหตุผลการให้คะแนน",
            inputPlaceholder: "เหตุผลการให้คะแนน...",
            inputAttributes: {
                style: "height: 200px;",
            },
            confirmButtonText: 'ตกลง',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            allowOutsideClick: false,
            customClass: {
                popup: 'custom-popup', // Add a custom class to the popup
                inputLabel: 'custom-input-label',
                input: 'custom-textarea',
                inputPlaceholder: 'custom-input-placeholder',
                confirmButton: 'custom-confirm-button', // Add a custom class to the confirm button
                cancelButton: 'custom-cancel-button',// Add a custom class to the cancel button // Add a custom class to the textarea
            }
        });

        // const result = await POPUP.textAreaPopUp({
        //     inputLabel: "เหตุผลการให้คะแนน",
        //     inputPlaceholder: "เหตุผลการให้คะแนน...",
        // })

        setAlertVisible(false); // Unlock after alert is closed

        // console.log('receiverLine', receiverLine);

        const transfer = async () => {

            const transPayload = {
                sender_id: lineProfile.user_id,
                receiver_id: receiverLine.userId,
                point_amount: "1",
                comment: result.value
            }
            console.log('transPayload ', transPayload);

            const res = await USER_ACTION.transferPoint(transPayload);
            console.log('transfer', res);

            const total = data.userCard.balance - transPayload.point_amount

            if (res.status) {

                POPUP.successPopUp({
                    title: 'โอนคะแนนสำเร็จ',
                    html: `<span class="small-text">คุณมียอดคงเหลือ </span><span class="large-text">${total} </span><span class="small-text">คะแนน</span>`,
                    function: () => {
                        liff.closeWindow();
                    } // Correct way to pass the function
                })
            }
        };

        if (result.isConfirmed && result.value) {

            transfer()

        } else {
            // User cancelled or no value was provided, reset position
            console.log("moveCard :", moveCard);

            api.start({ y: 0 });
            setPositionLocked(false);
            setMoveCard('0')
        }
    }



    return (
        <>
            <div className='transferContainer'>
                <div className='receiverProfile'>
                    {receiverLine ? (
                        <>
                            <img className='receiverPic' src={receiverLine.pictureUrl} />
                            <p>{receiverLine.displayName}</p>
                        </>
                    ) : (
                        <>
                            <img className='receiverPic' src={`${BASE_URL.baseApi}/images/NileconProfile.png`} />
                            <p>Loading...</p>
                        </>
                    )}
                    {/* <h3>{receiver ? `You submitted: ${receiver}` : 'No message was submitted.'}</h3> */}
                    <div className='overlay' onContextMenu={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()} />
                </div>

                <div className='transferCardContainer'>
                    <animated.div
                        {...bind()} // Apply the drag bindings
                        style={{
                            y,
                            // width: '325px',
                            // height: '208px',
                            // backgroundColor: 'pink',
                            touchAction: 'none',
                            willChange: 'transform, opacity',
                            position: 'absolute',
                        }}
                    >
                        <MemberCard data={data} />
                    </animated.div>
                    <div className='Gif'>
                        <img
                            className='slideGif'
                            src={slideGif}
                            alt='Loading...'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transfer;
