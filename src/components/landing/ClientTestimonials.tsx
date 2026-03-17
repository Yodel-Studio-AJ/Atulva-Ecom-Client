
"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"


const testimonials = [
    {
        text:
            "Honestly, this is sunshine in a jar. It’s rare to find an Apricot Jam that tastes like actual fruit rather than just sugar. The texture is perfect—thick, bright, and slightly tart. It’s become the best part of my morning toast! So happy to find a treat that’s both delicious and consciously made.",
        name: "Jamie L.",
        avatar: "/images/avatar-1.png",
    },
    {
        text:
            "Honestly, this is sunshine in a jar. It’s rare to find an Apricot Jam that tastes like actual fruit rather than just sugar. The texture is perfect—thick, bright, and slightly tart. It’s become the best part of my morning toast! So happy to find a treat that’s both delicious and consciously made.",
        name: "Daniel R.",
        avatar: "/images/avatar-2.png",
    },
]

export default function ClientTestimonialsSection() {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">

                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-8">

                    {testimonials.map((t, i) => (
                        <div key={i} className="relative">

                            {/* Avatar */}
                            <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                                <div className="flex">
                                    <img
                                        src={t.avatar}
                                        alt={t.name}
                                        className="w-32 h-auto rounded-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Card */}
                            <div className="bg-[#7B1E1E] text-white rounded-3xl px-20 py-10 pt-20 text-center shadow-md">
                                <p className="text-sm leading-relaxed">
                                    {t.text}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Bottom Right Navigation */}
                <div className="flex justify-end gap-3 mt-10">

                    <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition">
                        <ChevronLeft size={20} />
                    </button>

                    <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition">
                        <ChevronRight size={20} />
                    </button>

                </div>

            </div>
        </section>
    )
}