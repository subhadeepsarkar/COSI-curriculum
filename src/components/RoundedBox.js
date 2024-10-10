import React from 'react';

const RoundedBox = ({ title, content }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 w-64 text-center">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};

export default RoundedBox;