import React, { useState, useRef, useEffect } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
function Header() {
    
     const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false); // State for desktop profile dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile hamburger menu
    const dropdownRef = useRef(null); // Ref for desktop profile dropdown click outside
    const mobileMenuRef = useRef(null); // Ref for mobile menu click outside

    // Define navigation items with their names, slugs (paths), and active status based on authStatus
    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
      // { name: 'All Posts', slug: '/all-posts', active: authStatus }, // Link to view all posts
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ];

    // Effect to close dropdowns/menus when clicking outside of them
    useEffect(() => {
        function handleClickOutside(event) {
            // Close desktop profile dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            // Close mobile menu
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        }
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);
        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

    // Helper function to navigate and close the mobile menu
    const handleMobileNavLinkClick = (slug) => {
        navigate(slug);
        setIsMobileMenuOpen(false); // Close mobile menu after navigation
    };

    return (
        <header className="py-3 shadow bg-gray-500 relative z-50"> 
            <Container>
                <nav className="flex items-center justify-between"> 
                    {/* Logo Section */}
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Desktop Navigation - Hidden on small screens, flex on medium and larger */}
                    <ul className="text-gray-800 hidden md:flex ml-auto items-center space-x-4">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {/* Desktop Profile Dropdown (visible if authenticated) */}
                        {authStatus && (
                            <li className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown((prev) => !prev)}
                                    className="inline-block px-6 py-2 bg-white text-black rounded-full hover:bg-blue-100 hover:text-black transition"
                                >
                                    Profile
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 text-gray-800">
                                        <button
                                            className="w-full px-4 py-2 text-left hover:bg-gray-200 rounded-t-md"
                                            onClick={() => {
                                                navigate('/viewProfile');
                                                setShowDropdown(false);
                                            }}
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            className="w-full px-4 py-2 text-left hover:bg-gray-200 rounded-b-md"
                                            onClick={() => {
                                                navigate('/my-posts'); // Link to user's own posts
                                                setShowDropdown(false);
                                            }}
                                        >
                                            My Posts
                                        </button>
                                        <div className="border-t my-1"></div>
                                        {/* Logout button within the profile dropdown */}
                                        <div onClick={() => setShowDropdown(false)}>
                                            <LogoutBtn />
                                        </div>
                                    </div>
                                )}
                            </li>
                        )}
                    </ul>

                    {/* Mobile Hamburger Button - Visible on small screens, hidden on medium and larger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-7 w-7" /> // Close icon
                            ) : (
                                <Bars3Icon className="h-7 w-7" /> // Hamburger icon
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu - Only appears when isMobileMenuOpen is true and on small screens */}
                {isMobileMenuOpen && (
                    <div
                        className="absolute top-full left-0 w-full bg-gray-400 shadow-lg py-4 md:hidden z-40" // Z-index higher than desktop dropdown
                        ref={mobileMenuRef}
                    >
                        <ul className="flex flex-col items-center space-y-4">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name} className="w-full text-center">
                                        <button
                                            onClick={() => handleMobileNavLinkClick(item.slug)}
                                            className="block px-6 py-2 hover:bg-gray-200 hover:w-full hover:text-black mx-auto" // Use w-fit and mx-auto for centered buttons
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}

                            {/* Mobile specific profile and logout links (visible if authenticated) */}
                            {authStatus && (
                                <>
                                    <li className="w-full text-center">
                                        <button
                                            className="block px-6 py-2 hover:bg-gray-200 hover:w-full hover:text-black mx-auto"
                                            onClick={() => handleMobileNavLinkClick('/viewProfile')}
                                        >
                                            View Profile
                                        </button>
                                    </li>
                                    <li className="w-full text-center">
                                        <button
                                            className="block px-6 py-2 hover:bg-gray-200 hover:w-full hover:text-black mx-auto"
                                            onClick={() => handleMobileNavLinkClick('/my-posts')}
                                        >
                                            My Posts
                                        </button>
                                    </li>
                                    
                                    <li className="w-full text-center">
                                        <LogoutBtn /> {/* LogoutBtn component will handle its own click logic */}
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;
