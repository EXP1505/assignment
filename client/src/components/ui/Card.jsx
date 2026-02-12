import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

export default Card;
