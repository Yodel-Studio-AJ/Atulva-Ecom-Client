const features = [
    {
        iconSrc: "https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775674403/More_Fruit_Lass_Filler_1_gs03mz.png",
        title: "More Fruit\nLess Filler",
    },
    {
        iconSrc: "",
        title: "Longer Freshness\nZero Waste",
    },
    {
        iconSrc: "",
        title: "People's Choice",
    },
    {
        iconSrc: "",
        title: "More Value In\nEvery Jar",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full bg-[#f5f5f5] py-12 font-poppins">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-10 font-serif">
                    Why Thousands Choose Us
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center text-[#3b3b1f]"
                        >
                            {item.iconSrc && (
                                <img
                                    src={item.iconSrc}
                                    alt={item.title}
                                    className="w-[60px] h-[60px] object-contain mb-4"
                                />
                            )}
                            <p className="whitespace-pre-line text-sm md:text-base font-medium">
                                {item.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
