"use client"

import { motion } from "framer-motion"

type ImageItem = {
    type: "image"
    src: string
}

type TextItem = {
    type: "text"
    text: string
    name: string
    bg: string
}

type SpotlightItem = ImageItem | TextItem

const spotlightImages = [
    "/images/jam-oranges.png",
    "/images/jam-apples.png",
]

const spotlightTestimonials = [
    {
        text:
            "Honestly, this is sunshine in a jar. It's rare to find actual fruit pieces, and the taste is perfectly balanced — not too sweet, not too tart.",
        name: "Jamie L.",
        bg: "bg-[#3B0E0E]",
    },
    {
        text:
            "This jam tastes like actual fruit rather than just sugar. The texture is perfect — thick, bright, and delightfully tart.",
        name: "Sophie K.",
        bg: "bg-red-500",
    },
]

export default function SpotlightSection() {
    // Build alternating list
    const combined: SpotlightItem[] = [
        { type: "image", src: spotlightImages[0] },
        { type: "text", ...spotlightTestimonials[0] },
        { type: "image", src: spotlightImages[1] },
        { type: "text", ...spotlightTestimonials[1] },
    ]

    // Duplicate for seamless loop
    const infiniteList = [...combined, ...combined]

    return (
        <section className="py-12 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden">
                <div className="flex gap-4 items-center  mb-8">
                    <h2 className="text-6xl font-bold text-[#866B00]">Spotlight</h2>
                    <img src="/images/hand-sign.png" alt="Hand" className="h-24" />
                </div>

                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40, // VERY slow
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {infiniteList.map((item, i) => {
                        if (item.type === "image") {
                            return (
                                <div
                                    key={i}
                                    className="mt-10 w-[240px] h-[240px] rounded-3xl overflow-hidden border-4 border-blue-100 flex-shrink-0 shadow shadow-neutral-600"
                                >
                                    <img
                                        src={item.src}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )
                        }

                        return (
                            <div
                                key={i}
                                className={` mb-10 w-[280px] h-[240px] rounded-3xl p-5 text-white flex flex-col justify-between flex-shrink-0 ${item.bg}`}
                            >
                                <p className="text-sm leading-relaxed">{item.text}</p>
                                <p className="text-sm font-semibold mt-4">
                                    — {item.name}
                                </p>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}