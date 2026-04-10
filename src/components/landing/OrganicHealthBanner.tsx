
export default function OrganicHealthBanner() {
    // const navigate = useNavigate();

    return (
        <section className="relative w-full overflow-hidden font-poppins">
            <img
                src="/bg/organichealth.png"
                alt="Organic Health"
                className="w-full object-cover"
            />

            {/* Shop Now button — bottom left */}
            {/* <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <button
                    onClick={() => navigate('/products')}
                    className="bg-white text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200"
                >
                    Shop Now
                </button>
            </div> */}
        </section>
    );
}
