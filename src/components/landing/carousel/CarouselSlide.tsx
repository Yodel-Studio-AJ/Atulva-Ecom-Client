import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Slide {
    id: number;
    subtitle: string;
    title: string;
    image: string;
    productImage: string,
    color: string
}

interface Props {
    slide: Slide;
    isActive: boolean;
}

export default function CarouselSlide({ slide, isActive }: Props) {
    // const { openForm } = useLead();
    return (
        <AnimatePresence mode="wait">
            {isActive && (
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        {/* <div className="absolute inset-0 bg-black/40" /> */}
                    </div>

                    <div className="relative h-full flex items-center">
                        <div className="flex gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <motion.div
                                className="max-w-3xl"
                                initial={{ x: -32, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -32, opacity: 0 }}
                                transition={{ duration: 1, ease: "easeIn" }}
                            >
                                <h1 className="text-5xl md:text-7xl xl:text-8xl uppercase text-white mb-6 font-extrabold">{slide.title}</h1>
                                <p className="text-lg xl:text-2xl font-bold text-gray-200 mb-8">{slide.subtitle}</p>
                                <button
                                    className="group flex items-center gap-2 text-black font-extrabold tracking-wide border border-white/30 hover:border-black bg-yellow-primary px-6 py-3 rounded-3xl hover:bg-black hover:text-white transition-all duration-300"
                                >
                                    Order Now
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>

                            <div className="grow relative flex items-center justify-end overflow-visible">

                                {/* Product image - pulls the banner */}
                                <motion.div
                                    className="relative z-10"
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{
                                        duration: 2,
                                        ease: [0.34, 1.56, 0.64, 1]
                                    }}
                                >
                                    <img
                                        src={slide.productImage}
                                        alt={slide.title}
                                        className="h-[400px] max-h-[400px] w-auto object-contain drop-shadow-2xl"
                                    />
                                </motion.div>
                            </div>
                        </div>


                        {/* Yellow banner with spring effect - behind the image */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 right-0 bg-yellow-primary z-0 h-full max-h-[280px]"
                            initial={{ width: "0%" }}
                            animate={{ width: "30%" }}
                            exit={{ width: "0%" }}
                            transition={{
                                duration: 1.8,
                                ease: [0.34, 1.56, 0.64, 1],
                                delay: 0
                            }}
                            style={{ right: 0, backgroundColor: slide.color }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}