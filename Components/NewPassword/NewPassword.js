import { Link } from '@mui/material';
import React from 'react';

const NewPassword = () => {

    return (

        <>

            <div className="Otp">

                <div className="OtpContent">

                    <div className="Logo">
                        <img src="../images/home_page/logo_1.svg" alt="" />
                    </div>

                    <h4>New Password</h4>

                    {/* <p><a href="">01683311917</a> Enter the 6 digit code sent to the email</p> */}
                    <div className="OtpCode">
                        
                        <div className="CustomeInput">
                            <label>New Password</label>
                            <input type="text" placeholder='New Password'/>
                        </div>

                        <div className="CustomeInput">
                            <label>Confirm Password</label>
                            <input type="text" placeholder='Confirm New Password'/>
                        </div>

                    </div>

                    <button type="submit">Submit</button>

                </div>

            </div>
        
        </>

    )

}

export default NewPassword