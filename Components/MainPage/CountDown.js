
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { PiArrowBendUpRightBold } from 'react-icons/pi';

const CountDown = () => {
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");
    let interval = useRef();
    const startTimer = () => {
        const countdownDate = new Date("2023-09-17T22:00:00").getTime(); // July 27, 2023, 9:00 PM
        interval.current = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            if (distance < 0) {
                // Timer reached the end time
                clearInterval(interval.current);
                setTimerDays("00");
                setTimerHours("00");
                setTimerMinutes("00");
                setTimerSeconds("00");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimerDays(String(days).padStart(2, "0"));
                setTimerHours(String(hours).padStart(2, "0"));
                setTimerMinutes(String(minutes).padStart(2, "0"));
                setTimerSeconds(String(seconds).padStart(2, "0"));
            }
        }, 1000);
    };

    useEffect(() => {
        startTimer();

        return () => {
            clearInterval(interval.current);
        };
    }, []);
    return (
        <section className="CountDown">

            <Container>

                <Row>

                    <Col lg={12}>

                        <div className="CountDownContent">

                            <div className="left">

                                {/* <p>Funnel Liner দিয়ে কিভাবে আপনার বিজনেস অটোমেশন করবেন সেটা জানতে জয়েন করুন আমাদের ফ্রি ওয়েবিনারে</p> */}
                                <p>Funnel Liner এর অফার প্রাইস অ্যাভেলেবেল থাকছে আর মাত্র</p>

                                <div className="CountDownBox">

                                    <div className="CountDownItem">
                                        <h4>{timerDays}</h4>
                                        <h6>Days</h6>
                                    </div>

                                    <div className="CountDownItem">
                                        <h4>{timerHours}</h4>
                                        <h6>Hours</h6>
                                    </div>

                                    <div className="CountDownItem">
                                        <h4>{timerMinutes}</h4>
                                        <h6>Min</h6>
                                    </div>

                                    <div className="CountDownItem">
                                        <h4>{timerSeconds}</h4>
                                        <h6>Sec</h6>
                                    </div>

                                </div>

                            </div>

                            <div className="JoinNow">
                                {/* <Link href='https://app.funnelliner.com/join' target='_blank'>Join Now <PiArrowBendUpRightBold /></Link> */}
                                <Link href='https://app.funnelliner.com/offer' target='_blank'>Join Now <PiArrowBendUpRightBold /></Link>
                            </div>

                        </div>

                    </Col>

                </Row>

            </Container>

        </section>
    );
};

export default CountDown;
