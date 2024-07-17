import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { CgDanger } from "react-icons/cg";


const Toastify = ({ message, showToast }) => {
    const [show, setShow] = useState(showToast)

    useEffect(() => {
        setShow(showToast);
      }, [showToast]);

    const toggleShow = () => setShow(!show)
    return (
        <>
            <div  style={{ minHeight: '240px' }}>
            <Toast show={show} onClose={toggleShow} delay={5000} style={{ zIndex: 1 }} position="top-end" autohide animation={true}	>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto fw-bolder"><CgDanger className="fs-6"/> Error</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body className="text-danger fw-bold"> {message}</Toast.Body>
            </Toast>
            </div>
        </>
    )
}

export default Toastify;