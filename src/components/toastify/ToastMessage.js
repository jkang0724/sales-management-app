import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import styled from "styled-components";

const ToastMessageComponent = styled(ToastContainer)`
  top: 20px;
  z-index: 10000;
  width: 500px;
`;

const ToastMessage = () => {
  return (
    <ToastMessageComponent
      position="top-center"
      hideProgressBar
      autoClose={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Slide}
    />
  );
};

export default ToastMessage;
