import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import "../../Styles/Toast.css";

const Notification = () => (
    <ToastContainer position="bottom-right" newestOnTop limit={3} />
);

export default Notification;
