import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const PeopleChoiceItems = [
    {
        category: "JAMS",
        items: [
            { name: "Apple Cinnamon Jam", id: "123", imageUrl: "/images/apple-cinnamon-jam.png" },
            { name: "Plum Jam", id: "124", imageUrl: "/images/plum-jam.png" },
        ],
        title: "Taste The Sweetness\nFind Your Flavour",
        subTitle: "Devour into the handmade\n delight and enjoy.",
    },
    {
        category: "SPREAD",
        items: [
            { name: "Apple Cinnamon Jam", id: "123", imageUrl: "/images/apple-cinnamon-jam.png" },
            { name: "Plum Jam", id: "124", imageUrl: "/images/plum-jam.png" },
        ],
        title: "Pure Fruit Goodness\nIn Every Spoon",
        subTitle: "Made from handpicked fruits for a rich,\n natural sweetness you’ll love.",
    },
    {
        category: "HONEY",
        items: [
            { name: "Apple Cinnamon Jam", id: "123", imageUrl: "/images/apple-cinnamon-jam.png" },
            { name: "Plum Jam", id: "124", imageUrl: "/images/plum-jam.png" },
        ],
        title: "Smooth, Creamy &\nIrresistibly Deliciousr",
        subTitle: "Perfect for toast, desserts,\n or straight from the jar.",
    },
]

const PopularSection = () => {
    const [activeChoice, setActiveChoice] = useState(0)

    return (
        <div className="relative flex bg-[#F7FF83] mt-10">
            <div className="relative flex w-full max-w-[1440px] mx-auto bg-[#F7FF83] overflow-hidden">
                <div className="flex flex-col py-10 px-10 w-full">

                    {/* Heading */}
                    <h3 className="text-4xl font-bold">People's Choice</h3>

                    {/* Categories */}
                    <div className="flex gap-4 mt-4">
                        {PeopleChoiceItems.map((ele, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveChoice(i)}
                                className={`px-8 pt-2.5 pb-2 rounded-full border font-extrabold
              ${activeChoice === i ? "bg-black text-white border-black" : "border-neutral-800"}`}
                            >
                                {ele.category}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT */}
                    <div className="relative mt-10 pb-32 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeChoice}
                                className="flex justify-between gap-20 w-full"
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >

                                {/* IMAGES — move LEFT on exit, RIGHT on entry */}
                                <motion.div
                                    className="flex gap-10 w-3/5"
                                    variants={{
                                        initial: { x: -120, opacity: 0 }, // from right
                                        animate: { x: 0, opacity: 1 },
                                        exit: { x: -120, opacity: 0 },   // to left
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    {PeopleChoiceItems[activeChoice].items.map((item, i) => (
                                        <div key={i} className="flex flex-col gap-2 min-w-1/2">
                                            <div className="h-auto rounded-3xl overflow-hidden">
                                                <img src={item.imageUrl} alt={item.name} className="w-full" />
                                            </div>
                                            <button className="w-fit mx-auto py-2 px-16 rounded-lg bg-[#166534] text-white">
                                                Add To Cart
                                            </button>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* TEXT — move RIGHT on exit, LEFT on entry */}
                                <motion.div
                                    className="flex flex-col w-2/5 mt-10"
                                    variants={{
                                        initial: { x: 120, opacity: 0 }, // from left
                                        animate: { x: 0, opacity: 1 },
                                        exit: { x: 120, opacity: 0 },     // to right
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                    <h2 className="font-bold text-5xl whitespace-pre-line">
                                        {PeopleChoiceItems[activeChoice].title}
                                    </h2>

                                    <p className="text-lg text-neutral-800 mt-2 whitespace-pre-line">
                                        {PeopleChoiceItems[activeChoice].subTitle}
                                    </p>

                                    <button className="w-fit px-8 py-3 rounded-full bg-black text-white mt-4">
                                        SHOP ALL PRODUCTS
                                    </button>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

            </div>
            {/* TREE — move DOWN on exit, UP on entry */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChoice + "-tree"}
                    className="absolute bottom-0 left-0"
                    initial={{ y: 120, opacity: 0 }} // from top
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}     // go down
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <img src="/images/land-tree.png" alt="Land Tree" />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default PopularSection