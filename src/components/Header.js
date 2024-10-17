import React from 'react';
import logo from '../assets/Brandeis_logo_seal_white_digital.png';

const Header = () => {
    return (
        <header className="relative bg-[#003478] text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo on the left */}
                <div className="flex items-center space-x-3">
                    <img src={logo} alt="Logo" className="h-12 w-36 rounded-full" />
                    <span className="text-xl font-semibold"></span>
                </div>

                {/* Title in the center */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
                    Computer Science Curriculum
                </h1>
            </div>
        </header>
    );
};

export default Header;
