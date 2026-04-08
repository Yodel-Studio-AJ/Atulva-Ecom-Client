import { useNavigate } from 'react-router-dom';

interface LoginPromptModalProps {
    onClose: () => void;
    redirectAfter?: string;
}

const LoginPromptModal = ({ onClose, redirectAfter = '/' }: LoginPromptModalProps) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate('/login', { state: { from: { pathname: redirectAfter } } });
    };

    const handleRegister = () => {
        onClose();
        navigate('/register');
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm font-poppins"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-8 flex flex-col items-center text-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-1">Login to add to cart</h2>
                <p className="text-sm text-gray-500 mb-7">
                    You need to be signed in to add items to your cart.
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors mb-3"
                >
                    Sign In
                </button>
                <button
                    onClick={handleRegister}
                    className="w-full py-3 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                    Create Account
                </button>

                <button
                    onClick={onClose}
                    className="mt-4 text-xs text-gray-400 hover:text-gray-600"
                >
                    Continue browsing
                </button>
            </div>
        </div>
    );
};

export default LoginPromptModal;
