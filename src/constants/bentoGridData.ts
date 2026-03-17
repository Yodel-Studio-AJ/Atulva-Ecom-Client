type BentoItem = {
    id: number;
    title?: string;
    subtitle?: string;
    image: string;
    link: string;
    size: "large" | "small";
    titleColor?: string;
};

export const bentoItems: BentoItem[] = [
    {
        id: 1,
        title: "15% OFF",
        subtitle: "On Oils, Grains & Natural Foods",
        image: "/images/offer-main.png",
        link: "/offers",
        size: "large",
    },
    {
        id: 2,
        title: "DEVOUR",
        image: "/images/devour.png",
        link: "/shop/devour",
        size: "small",
        titleColor: "text-yellow-300",
    },
    {
        id: 3,
        title: "Damn good!",
        image: "/images/damn-good.png",
        link: "/shop/premium",
        size: "small",
        titleColor: "text-red-500",
    },
];