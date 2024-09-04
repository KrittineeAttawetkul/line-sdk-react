import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import './transfer.css'
import MemberCard from '../../components/memberCard/MemberCard'
import Liff_Id from '../../assets/Liff_Id';
import useLineLogin from '../../utils/addons/useLineLogin';
import { USER_ACTION } from '../../apis/userApi';
import liff from '@line/liff';
import loadingGif from '../../assets/arrow.gif'; // Import the GIF file

function Transfer() {
    // const [lineProfile, setLineProfile] = useState(null);
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
            // setLineProfile(profile);

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
            inputLabel: "Message",
            inputPlaceholder: "Type your message here...",
            inputAttributes: {
                "aria-label": "Type your message here",
                style: "height: 200px;",
            },
            showCancelButton: true,
            customClass: {
                input: 'custom-textarea' // Add a custom class to the textarea
            }

        });

        setAlertVisible(false); // Unlock after alert is closed

        if (result.isConfirmed && result.value) {
            Swal.fire(result.value).then(() => {
                // Navigate to the next page and pass the value using state
                // navigate('/next-page', { state: { message: result.value } });
                // setMoveCard('0')
                // setPositionLocked(false);
                liff.closeWindow();
            });
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
                            <img className='receiverPic' src='https://fastly.picsum.photos/id/56/200/200.jpg?hmac=rRTTTvbR4tHiWX7-kXoRxkV7ix62g9Re_xUvh4o47jA' />
                            <p>Loading...</p>
                        </>
                    )}
                    {/* <h3>{receiver ? `You submitted: ${receiver}` : 'No message was submitted.'}</h3> */}
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
                            className='loadingGif'
                            src={loadingGif}
                            alt='Loading...'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Transfer;
