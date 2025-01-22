import React from "react";
import NavbarMB from '~/component/Layout/MenuMB/NavbarMB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const navItems = [
        {
            title: 'TRANG CHỦ',
            href: '/'
        },
        {
            title: 'TOUR TRONG NƯỚC',
            href: '/tour-trong-nuoc'
        },
        {
            title: 'TOUR NƯỚC NGOÀI',
            href: '#outsidetour'
        },
        {
            title: 'tin tức',
            href: '#news'
        },
        {
            title: 'giới thiệu',
            href: '#aboutus'
        },
    ]
    const NavItemsElm = ({title,href}) => {
     return (
         <div className={''}>
         <Link to={href} className={"text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"}>{title}</Link>
     </div>)
    }
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-xl font-bold text-indigo-600">
                            MyWebsite
                        </a>
                    </div>

                    {/* Menu Items */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <NavItemsElm key={index}
                                         title={item.title}
                                            href={item.href}/>
                        ))}
                    </div>
                    <div className={"hidden md:flex space-x-4"}>
                        <Link to={'/dang-nhap'} className={"text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"}>Login</Link>
                        <Link to={'/dang-ky'} className={"text-gray-700 hover:text-yellow-600 transition duration-300 uppercase font-bold"}>Register</Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <NavbarMB />
                    </div>
                </div>
            </nav>
        </header>
    );
};
