import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getSpotlights } from "@/apis/landingPageApi"
import type { SpotlightItem } from "@/apis/landingPageApi"

type ScrollCard =
    | { type: "image"; src: string }
    | { type: "text"; quote: string; person_name: string; bg_color: string }

export default function SpotlightSection() {
    const [spotlights, setSpotlights] = useState<SpotlightItem[]>([])

    useEffect(() => {
        getSpotlights().then(res => {
            if (res.success && res.data?.length) setSpotlights(res.data)
        })
    }, [])

    // Each spotlight expands to an image card + a text card (alternating layout)
    const combined: ScrollCard[] = spotlights.flatMap(s => [
        { type: "image", src: s.image_url },
        { type: "text", quote: s.quote, person_name: s.person_name, bg_color: s.bg_color },
    ])

    console.log(combined);

    // Need at least enough cards to fill the viewport — duplicate until we have 8+
    const padded = combined.length === 0 ? [] :
        combined.length < 8 ? [...combined, ...combined, ...combined] : combined

    // Duplicate for seamless infinite loop
    const infiniteList = [...padded, ...padded]

    if (combined.length === 0) return null

    return (
        <section className="py-12 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden">
                <div className="flex gap-4 items-center mb-8">
                    <h2 className="text-6xl font-bold text-[#866B00]">Spotlight</h2>
                    <img src="/images/hand-sign.png" alt="Hand" className="h-24" />
                </div>

                <motion.div
                    className="flex gap-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
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
                                className="mb-10 w-[280px] h-[240px] rounded-3xl p-5 text-white flex flex-col justify-between flex-shrink-0"
                                style={{ backgroundColor: item.bg_color }}
                            >
                                <p className="text-sm leading-relaxed">"{item.quote}"</p>
                                <p className="text-sm font-semibold">— {item.person_name}</p>
                            </div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
