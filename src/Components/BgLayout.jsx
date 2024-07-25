import React from 'react';
import logo from '../images/qbrainxlogo.png';


const BgLayout = ({ details }) => {
    return (
        <>
            <img src={logo} alt="QBRAINX" className='logoimage' style={{ height: "40px", width: "150px" }} />
            <br></br>
            <br></br>
            <h5 className='heading1'>{details?.quiz_name}</h5>
            <hr className='hrline' />
            <h6 className='heading1'>Hi {details?.user_name}!</h6>
            <p className='heading1'>Welcome to online assessment platform</p>
            <div >
                <div className='row'>
                    <div className='col-3'>
                        <p className='heading2'>Questions :</p>
                    </div>
                    <div className='col-3'>
                        <p className='heading2'>Sections :</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'>
                        <p className='heading2'>{details?.total_questions}</p>
                    </div>
                    <div className='col-3'>
                        <p className='heading2'>{details?.total_sections}</p>
                    </div>
                </div>
                <div className='row'>
                    <p className='heading2'>Test Duration : </p>
                </div>
                <div className='col-3'>
                    <p className='heading2'>{details?.total_duration_display}</p>
                </div>
            </div>

        </>
    )
}

export default BgLayout
