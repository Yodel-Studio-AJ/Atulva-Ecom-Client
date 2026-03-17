export default function PressBanner() {
    const logos = [
        "/images/economic-times-banner.png",
        "/images/economic-times-banner.png",
        "/images/economic-times-banner.png",
        "/images/economic-times-banner.png",
    ]

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between">

                    {logos.map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-6 px-8"
                        >
                            {/* Logo */}
                            <img
                                src={logo}
                                alt="Press Logo"
                                className="h-8 object-contain"
                            />

                            {/* Divider (not after last item) */}
                            {i !== logos.length - 1 && (
                                <div className="w-px h-8 bg-blue-500" />
                            )}
                        </div>
                    ))}

                </div>

            </div>
        </section>
    )
}