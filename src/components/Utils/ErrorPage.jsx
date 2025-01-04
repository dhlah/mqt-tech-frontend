import React from 'react';

const ErrorPage = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-red-100 text-red-700 text-center p-5">
            <h1 className="text-2xl mb-5">Oops!</h1>
            <p className="text-lg">{message}</p>
        </div>
    );
};

export default ErrorPage;
