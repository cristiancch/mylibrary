import React from "react";

const ErrorMessage = ({isError, message}) => {
    if (isError) {
        return (
            <div style={{color: 'red', fontSize: 11}}>
                {message}
            </div>
        );
    } else {
        return null;
    }
};

export default ErrorMessage;