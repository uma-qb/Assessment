import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';
import '../FeedbackForm.css'; // Create an App.css file for the custom styles
import success from '../images/success-greentick.gif';
import { Slide, toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const FeedbackForm = () => {
    const { baseUrl } = useContext(UserContext)
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleRatingClick = (rating) => {
        setRating(rating);
    };

    /* useEffect(() => {
    //     window.history.replaceState(null, '', location.pathname);
    //     // navigate(location.pathname, { replace: true });
    //     navigate("/", {replace: true})
    // }, [navigate, location.pathname]) */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback) {
            setErrorMsg("Please Enter Your Feedback")
            return
        }
        try {
            const token = localStorage.getItem("token")
            const url = `${baseUrl}/save_feedback`
            const response = await axios.post(url, {
                rating: rating,
                token: token,
                feedback: feedback
            })
            console.log(response.data)
            setSubmitted(true);
            localStorage.clear()
        } catch (error) {
            let errMsg = "Something went wrong!";
            if (error.response.status == 404) {
                errMsg = "404 - Route Not Found";
            } else if (error.response) {
                let msg = error.response.data.message
                errMsg = msg.replace(/^Error: /, '')
            }

            toast.error(errMsg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide
            })

        }
    };

    return (
        <div className='feedbackForm'>
            {(!submitted) ? (
                <form onSubmit={handleSubmit} className="card-container form-content">
                    <h3 className="heading">Give us your feedback</h3>
                    <p className="para top-para">How was your experience with our application?</p>
                    <p className="para top-para">Give us your rating to improve</p>
                    <div className="feedback-level">
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <div
                                key={rate}
                                className={`level tooltip-r tooltips pointer ${rating === rate ? 'active' : ''}`}
                                title={getTooltipText(rate)}
                                onClick={() => handleRatingClick(rate)}
                            >
                                <i className={getIconClass(rate)}></i>
                            </div>
                        ))}
                        <input type="hidden" name="rating" id="rating" value={rating} />
                    </div>
                    <div className="feedback-msg">
                        <p className="para">What are the main reasons for your rating?</p>
                        <textarea
                            name="feedback"
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <span className='text-danger'>{errorMsg}</span>
                    </div>
                    <div className="buttonsec">
                        <button type="submit" name="feed_submit" id="feed_submit">
                            Submit Feedback
                        </button>
                    </div>
                </form>
            ) : (
                <div className="card-container thanks-content">
                    <img src={success} className="green-tick" alt="Success" />
                    <h3>Thank You !!!</h3>
                    <p>Thanks a bunch for filling that out.</p>
                    <p>We really appreciate you giving us a moment of your time today.</p>
                </div>
            )}
        </div>
    );
};

const getTooltipText = (rating) => {
    switch (rating) {
        case 1:
            return 'I just hate it';
        case 2:
            return "I don't like it";
        case 3:
            return 'It is fine !';
        case 4:
            return 'I like it';
        case 5:
            return 'I just love it';
        default:
            return '';
    }
};

const getIconClass = (rating) => {
    switch (rating) {
        case 1:
            return 'lar la-sad-tear';
        case 2:
            return 'las la-frown';
        case 3:
            return 'lar la-meh';
        case 4:
            return 'lar la-smile';
        case 5:
            return 'lar la-grin';
        default:
            return '';
    }
};

export default FeedbackForm;
