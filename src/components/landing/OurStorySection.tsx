import { useNavigate } from 'react-router-dom';

export default function OurStorySection() {
    const navigate = useNavigate();

    return (
        <section className="relative w-full overflow-hidden font-poppins">
            {/* Background image */}
            <img
                src="/bg/ourstory.png"
                alt="Our Story"
                className="w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Centered content */}
            <div className="absolute inset-0 flex flex-col justify-center gap-6 text-center px-4 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-tight drop-shadow-lg text-left">
                    Our Story, Their<br /> Words
                </h2>
                <button
                    onClick={() => navigate('/about')}
                    className="mt-2 px-8 py-3 border border-white text-white hover:text-black font-semibold text-sm rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 w-fit"
                >
                    Know More
                </button>
            </div>
        </section>
    );
}
