import React, { useEffect } from "react";

function Message({ message, duration = 2000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        document.getElementById("popup-message").style.display = "none";
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return (
    <div
      id="popup-message"
      style={{
        display: message ? "flex" : "none",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "10rem",
        width: "20rem",
        justifyContent: "center",
        alignItems: "center",
        background: "#3A95E4",
        color: "white",
        textAlign: "center",
        zIndex: 1000,
        transition: "opacity 2s",
        backgroundColor: message === "error" ? "#fff" : "#16AB39",
        borderRadious: "20px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="10rem"
          height="5rem"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
        {message === "error" ? (
          <h1 style={{ color: "red" }}>
            Something went worng!!. please try again
          </h1>
        ) : (
          <h1>DONE</h1>
        )}
      </div>
    </div>
  );
}

export default Message;
