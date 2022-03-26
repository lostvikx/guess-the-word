import React from "react";

export default function Notification(props) {

  const alertUser = () => {
    setTimeout(() => {
      
    }, 5000);
  }

  return (
    <div className="notification">{props.message}</div>
  );
}