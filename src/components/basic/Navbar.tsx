import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCustomerStore from '../../stores/customerStore';
import useCartStore from '../../stores/cartStore';

const Navbar = () => {
    const navigate = useNavigate();
    const { customer, logout } = useCustomerStore();
    const { cart } = useCartStore();
    const [menuOpen, setMenuOpen] = useState(false);

    const itemCount = cart?.item_count ?? 0;

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-8xl font-poppins">
            <div className="bg-white backdrop-blur-md border border-gray-500/10 shadow-lg rounded-2xl px-10 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src="/images/logo.png" alt="Altuva" className="h-20 object-contain" />
                </Link>

                {/* Nav links */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link to="/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                        Products
                    </Link>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
                    <Link to="/cart" className="relative p-2 text-gray-700 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {itemCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gray-900 text-white text-[10px] font-semibold px-1">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User menu */}
                    {customer ? (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                                    {customer.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="hidden sm:block">{customer.name.split(' ')[0]}</span>
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/cart"
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        My Cart
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                to="/login"
                                className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
