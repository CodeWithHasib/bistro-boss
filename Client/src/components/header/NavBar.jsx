import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { BsFillCartCheckFill } from 'react-icons/bs'
import { useCart } from '../../hooks/useCart';
const navLinks = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'Our Menu',
        route: '/menu'
    },
    {
        name: 'Our Shop',
        route: '/shop'
    }
];

const NavBar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const [cart, , isLoading] = useCart();
    let totalItem = 0;
    if (user?.email && !isLoading) {
        totalItem = cart.length;
    }


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const [navBg, setNavBg] = useState('bg-[#15151580]');

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;
            setScrollPosition(currentPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition > 1000) {
            setNavBg('bg-black');
        } else {
            setNavBg('bg-[#15151580]');
        }
    }, [scrollPosition]);
  
    
    return (
        <motion.nav
            className={`${navBg}  fixed top-0 transition-colors duration-500 ease-in-out text-white w-full z-10`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
                <div className="flex px-4 items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex-shrink-0 pl-7 md:p-0 flex items-center">
                        <div className="">
                            <h1 className='text-2xl font-Cinzel font-bold'>BISTRO BOSS</h1>
                            <p className='font-bold tracking-[8px]'>Restaurant</p>
                        </div>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <FaBars className="h-6 text-white hover:text-primary w-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden  text-black md:block">
                        <div className="flex">
                            <ul className="ml-10 flex items-center space-x-4 pr-4">
                                {navLinks.map((link) => (
                                    <li key={link.route}>
                                        <NavLink
                                            className={({ isActive }) => `font-bold ${isActive ? 'text-[#EEFF25]' : 'text-white'} hover:text-primary duration-300`}
                                            to={link.route}

                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}
                                {
                                    user && <li>
                                        <NavLink
                                            to='/dashboard'
                                            className={({ isActive }) => `font-bold ${isActive ? 'text-[#EEFF25]' : 'text-white'} hover:text-primary duration-300`}
                                        >Dashboard</NavLink></li>
                                }
                                {
                                    user && <li>
                                        <button onClick={() => navigate('/dashboard/my-cart')} className='relative'>
                                            <span>
                                                <BsFillCartCheckFill className='text-2xl text-[#EEFF25]' />
                                            </span>
                                            <span className='px-2 absolute -top-3 left-4 py-1 rounded-full bg-blue-500 text-white text-xs font-bold'>{cart.length}</span>
                                        </button>
                                    </li>
                                }

                                {
                                    user ? <li>
                                        <span
                                            className={` cursor-pointer  text-white font-bold hover:text-primary duration-300`}
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Are you sure to logout ?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, log me out!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        logout()
                                                            .then(() => {
                                                                Swal.fire(
                                                                    'Okk..!',
                                                                    'Your are logged out .',
                                                                    'success'
                                                                )
                                                            })
                                                            .catch((err) => {
                                                                Swal.fire(
                                                                    'Oops!',
                                                                    err.message,
                                                                    'error'
                                                                )
                                                            }
                                                            )
                                                    }
                                                })
                                            }}
                                        >Log Out</span></li> : <li>
                                        <NavLink
                                            to={isLogin ? '/register' : '/login'}
                                            className={({ isActive }) => `font-bold ${isActive ? 'text-[#EEFF25]' : 'text-white'} hover:text-primary duration-300`}
                                        >{isLogin ? '/register' : 'Login'}</NavLink></li>
                                }

                            </ul>

                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-2 w-full bg-black"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {
                                navLinks.map((link) => (
                                    <NavLink
                                        key={link.route}
                                        className={({ isActive }) => `block ${isActive ? 'text-primary' : 'text-white'} px-4 py-2  hover:text-primary duration-300`}
                                        to={link.route}
                                        onClick={toggleMobileMenu}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))

                            }

                            {/* Add more mobile menu links as needed */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default NavBar;
