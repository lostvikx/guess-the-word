import React from "react";

export default function Notification(props) {  

  return (
    <div id={props.type} className="notification">{props.message}</div>
  );
}