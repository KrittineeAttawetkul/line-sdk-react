import React, { useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import './transfer.css'
import MemberCard from '../../components/memberCard/MemberCard'
import Liff_Id from '../../assets/Liff_Id';
import useLineLogin from '../../utils/addons/useLineLogin';
import { USER_ACTION } from '../../apis/userApi';

function Transfer() {
    const [lineProfile, setLineProfile] = useState(null);
    const [userCard, setUserCard] = useState({
        card_url: ''
    });
    const [statusCard, setStatus] = useState(false);
    const [moveCard, setMoveCard] = useState('0');
    const [data, setData] = useState({ userCard: '', lineProfile: null });

    useEffect(() => {
        pageInit();
    }, [])

    useEffect(() => {
        if (statusCard) {
            console.log("userCard : ", userCard);
        }
    }, [statusCard])

    useEffect(() => {
        if (moveCard === '1') {
            moveCardTrue()
        }
    }, [moveCard])

    const pageInit = async () => {
        await useLineLogin(Liff_Id.transfer);
        userInit();
    }

    const userInit = async () => {
        const storedProfile = localStorage.getItem('lineProfile');
        console.log('Stored Profile:', storedProfile); // Debugging log
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        setLineProfile(profile);
        console.log('Parsed Profile:', profile); // Debugging log

        const payload = {
            user_id: profile.user_id
        }
        const res = await USER_ACTION.getCardByUserId(payload);
        console.log('user res: ', res);
        console.log('res Data: ', res.data);

        if (res.status) {
            setStatus(res.status);
            setUserCard(res.data);
            setData({
                userCard: res.data,
                lineProfile: profile
            });
        } else {
            setStatus(res.status);
            console.log("getQrByUserId (Error) : Error Api ");
        }
    }

    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const navigate = useNavigate();
    const [positionLocked, setPositionLocked] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    // Define the drag handler
    const bind = useDrag(async ({ down, movement: [mx, my] }) => {
        if (alertVisible) return; // Prevent dragging if alert is visible

        const newY = positionLocked ? -300 : (down ? Math.min(0, Math.max(my, -300)) : 0);

        api.start({ x: down ? mx : 0, y: newY, immediate: down });
        console.log("newY : ", newY);



        if (newY <= -300 && !positionLocked) {
            if (newY === -300 && moveCard === '0') {
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
                <animated.div
                    {...bind()} // Apply the drag bindings
                    style={{
                        y,
                        // width: '325px',
                        // height: '208px',
                        // backgroundColor: 'pink',
                        touchAction: 'none',
                        willChange: 'transform, opacity',
                        position: 'absolute'
                    }}
                >
                    <MemberCard data={data} />
                </animated.div>
            </div>
        </>
    );
}

export default Transfer;
