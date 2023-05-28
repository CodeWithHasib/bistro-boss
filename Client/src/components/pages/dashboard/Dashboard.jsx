import React, { useContext, useState } from 'react';
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaSwatchbook } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { TbStarsFilled } from 'react-icons/tb';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {loader} = useContext(AuthContext);
    if (loader) {
        return <div className="h-screen w-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }

    const menuItems = [
        {
            icon: <AiFillHome className='text-2xl' />,
            text: 'Home',
        },
        {
            icon: <BsFillCalendarCheckFill className='text-2xl' />,
            text: 'Reservation',
        },
        {
            icon: <ImSpoonKnife className='text-2xl' />,
            text: 'Payment history',
        },
        {
            icon: <AiOutlineShoppingCart className='text-2xl' />,
            text: 'My Cart',
        },
        {
            icon: <TbStarsFilled className='text-2xl' />,
            text: 'My Reviews',
        },
        {
            icon: <FaSwatchbook className='text-2xl' />,
            text: 'My Bookings',
        },
    ];

    return (
        <div className="grid bg-[#F6F6F6] grid-cols-10">
            <div className="col-span-2 sticky hidden md:block top-0 font-Cinzel px-5 py-5 bg-[#D1A054] msdin-h-screen">
                <div className="text-center mt-4">
                    <h1 className='uppercase text-2xl font-Cinzel font-bold'>Bistro BOSS</h1>
                    <p className='tracking-[0.6rem] font-Cinzel'>Restaurant</p>
                </div>
                <div className="mt-6 px-5">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className="mt-4">
                                <NavLink>
                                    <span className='inline-flex w-full whitespace-nowrap uppercase items-center text-base gap-4'>
                                        {item.icon} {item.text}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-8 w-full h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
