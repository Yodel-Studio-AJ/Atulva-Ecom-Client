import type { ReactNode } from "react";

type CategoryItem = {
    id: number;
    title: string;
    icon: ReactNode;
    link: string;
};

const categoryItems: CategoryItem[] = [
    {
        id: 1,
        title: "All Products",
        link: "/products",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.3256 26.0532H42.9112C45.4503 26.0532 47.5088 28.1116 47.5088 30.6508V45.9761C47.5088 48.5153 45.4503 50.5737 42.9112 50.5737H15.3256C12.7864 50.5737 10.728 48.5153 10.728 45.9761V30.6508C10.728 28.1116 12.7864 26.0532 15.3256 26.0532Z" stroke="#E8C87A" stroke-width="3.06506" />
                <path d="M47.5088 32.1831L29.1184 38.3132L10.728 32.1831" stroke="#E8C87A" stroke-width="3.06506" stroke-linecap="round" />
                <path d="M52.1064 21.4555L38.3136 26.0531L29.1184 19.923L19.9232 26.0531L6.13045 21.4555L19.9232 16.8579L29.1184 10.7278L38.3136 16.8579L52.1064 21.4555Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="2.75855" stroke-linejoin="round" />
                <path d="M19.9232 9.19519L18.3907 6.13013M15.3256 12.2602H12.2606M18.3907 15.3253L16.8582 18.3904" stroke="#E8C87A" stroke-width="2.2988" stroke-linecap="round" />
                <path d="M12.2606 6.13019L10.7281 4.59766M9.19553 9.19525L6.13047 7.66272M10.7281 12.2603L9.19553 13.7928" stroke="#E8C87A" stroke-width="1.83904" stroke-linecap="round" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Membership Deals",
        link: "/membership",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5592 27.5857H43.6773C45.7933 27.5857 47.5086 29.301 47.5086 31.417V45.2098C47.5086 47.3258 45.7933 49.0411 43.6773 49.0411H14.5592C12.4432 49.0411 10.7279 47.3258 10.7279 45.2098V31.417C10.7279 29.301 12.4432 27.5857 14.5592 27.5857Z" stroke="#E8C87A" stroke-width="3.06506" />
                <path d="M10.7279 21.4556H47.5086C49.2014 21.4556 50.5737 22.8278 50.5737 24.5206V27.5857C50.5737 29.2785 49.2014 30.6507 47.5086 30.6507H10.7279C9.0351 30.6507 7.66283 29.2785 7.66283 27.5857V24.5206C7.66283 22.8278 9.0351 21.4556 10.7279 21.4556Z" fill="#E8C87A" fill-opacity="0.15" stroke="#E8C87A" stroke-width="3.06506" />
                <path d="M29.1182 21.4556V49.0411" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M29.1182 21.4558C32.1833 16.8582 39.8459 15.3256 39.8459 19.9232C39.8459 24.5208 32.1833 22.9883 29.1182 21.4558Z" fill="#E8C87A" fill-opacity="0.25" stroke="#E8C87A" stroke-width="2.75855" stroke-linejoin="round" />
                <path d="M29.1182 21.4558C26.0532 16.8582 18.3905 15.3256 18.3905 19.9232C18.3905 24.5208 26.0532 22.9883 29.1182 21.4558Z" fill="#E8C87A" fill-opacity="0.25" stroke="#E8C87A" stroke-width="2.75855" stroke-linejoin="round" />
                <path d="M49.0411 15.3253L47.5086 12.2603L45.9761 15.3253H49.0411Z" stroke="#E8C87A" stroke-width="1.83904" />
                <path d="M10.7278 13.7928L9.19531 10.7278L7.66278 13.7928H10.7278Z" stroke="#E8C87A" stroke-width="1.83904" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Healthy Combos",
        link: "/combos",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.4554 24.5205H36.7807C40.1663 24.5205 42.9108 27.2651 42.9108 30.6506V42.9109C42.9108 46.2964 40.1663 49.041 36.7807 49.041H21.4554C18.0698 49.041 15.3253 46.2964 15.3253 42.9109V30.6506C15.3253 27.2651 18.0698 24.5205 21.4554 24.5205Z" fill="#E8C87A" fill-opacity="0.12" stroke="#E8C87A" stroke-width="3.06506" />
                <path d="M16.8578 16.8579H41.3783C43.9175 16.8579 45.9759 18.9163 45.9759 21.4555V22.988C45.9759 25.5272 43.9175 27.5856 41.3783 27.5856H16.8578C14.3186 27.5856 12.2602 25.5272 12.2602 22.988V21.4555C12.2602 18.9163 14.3186 16.8579 16.8578 16.8579Z" stroke="#E8C87A" stroke-width="2.75855" />
                <path d="M29.1181 42.9109C29.1181 42.9109 38.3132 36.7808 38.3132 31.4169C38.3132 28.5051 36.0144 26.8193 33.7156 26.8193C31.8766 26.8193 30.1908 27.8921 29.1181 29.4246C28.0453 27.8921 26.3595 26.8193 24.5205 26.8193C22.2217 26.8193 19.9229 28.5051 19.9229 31.4169C19.9229 36.7808 29.1181 42.9109 29.1181 42.9109Z" fill="#E8C87A" fill-opacity="0.3" stroke="#E8C87A" stroke-width="2.45205" />
                <path d="M33.7156 16.8579C35.2482 12.2603 39.8458 10.7278 41.3783 13.7929C38.3132 13.7929 35.2482 15.3254 33.7156 16.8579Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="2.14554" />
                <path d="M24.5204 16.8579C22.9879 12.2603 18.3903 10.7278 16.8578 13.7929C19.9229 13.7929 22.9879 15.3254 24.5204 16.8579Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="2.14554" />
                <path d="M29.118 9.19531V16.858" stroke="#E8C87A" stroke-width="2.2988" stroke-linecap="round" />
            </svg>
        ),
    },
    {
        id: 4,
        title: "Under ₹499",
        link: "/under-499",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5853 7.66284H9.19498V26.0532L27.5853 44.4436L44.4432 27.5857L27.5853 7.66284Z" fill="#E8C87A" fill-opacity="0.15" stroke="#E8C87A" stroke-width="3.06506" stroke-linejoin="round" />
                <path d="M16.8577 19.1568C14.7417 19.1568 13.0264 17.4414 13.0264 15.3255C13.0264 13.2095 14.7417 11.4941 16.8577 11.4941C18.9737 11.4941 20.689 13.2095 20.689 15.3255C20.689 17.4414 18.9737 19.1568 16.8577 19.1568Z" stroke="#E8C87A" stroke-width="2.75855" />
                <path d="M35.248 24.5205H24.5203" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M35.248 29.1182H24.5203" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M32.1829 24.5205L27.5853 38.3133" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M49.0408 30.6507L44.4432 21.4556L45.9758 29.1182H41.3782L45.9758 38.3134L44.4432 30.6507H49.0408Z" fill="#E8C87A" fill-opacity="0.25" stroke="#E8C87A" stroke-width="2.14554" stroke-linejoin="round" />
            </svg>

        ),
    },
    {
        id: 5,
        title: "Make Your Own Box",
        link: "/build-box",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5853 7.66284H9.19498V26.0532L27.5853 44.4436L44.4432 27.5857L27.5853 7.66284Z" fill="#E8C87A" fill-opacity="0.15" stroke="#E8C87A" stroke-width="3.06506" stroke-linejoin="round" />
                <path d="M16.8577 19.1568C14.7417 19.1568 13.0264 17.4414 13.0264 15.3255C13.0264 13.2095 14.7417 11.4941 16.8577 11.4941C18.9737 11.4941 20.689 13.2095 20.689 15.3255C20.689 17.4414 18.9737 19.1568 16.8577 19.1568Z" stroke="#E8C87A" stroke-width="2.75855" />
                <path d="M35.248 24.5205H24.5203" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M35.248 29.1182H24.5203" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M32.1829 24.5205L27.5853 38.3133" stroke="#E8C87A" stroke-width="2.75855" stroke-linecap="round" />
                <path d="M49.0408 30.6507L44.4432 21.4556L45.9758 29.1182H41.3782L45.9758 38.3134L44.4432 30.6507H49.0408Z" fill="#E8C87A" fill-opacity="0.25" stroke="#E8C87A" stroke-width="2.14554" stroke-linejoin="round" />
            </svg>

        ),
    },
    {
        id: 6,
        title: "New Launches",
        link: "/new",
        icon: (
            <svg width="50" height="50" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.1176 45.9759C29.1176 45.9759 38.3127 39.8458 38.3127 27.5855C38.3127 16.8578 29.1176 6.13013 29.1176 6.13013C29.1176 6.13013 19.9224 16.8578 19.9224 27.5855C19.9224 39.8458 29.1176 45.9759 29.1176 45.9759Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="3.06506" stroke-linejoin="round" />
                <path d="M29.1176 31.4169C26.1552 31.4169 23.7537 29.0154 23.7537 26.0531C23.7537 23.0907 26.1552 20.6892 29.1176 20.6892C32.08 20.6892 34.4814 23.0907 34.4814 26.0531C34.4814 29.0154 32.08 31.4169 29.1176 31.4169Z" fill="#E8C87A" fill-opacity="0.35" stroke="#E8C87A" stroke-width="2.75855" />
                <path d="M38.3128 33.7158L44.4429 39.8459L38.3128 38.3134V33.7158Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="2.45205" stroke-linejoin="round" />
                <path d="M19.9224 33.7158L13.7922 39.8459L19.9224 38.3134V33.7158Z" fill="#E8C87A" fill-opacity="0.2" stroke="#E8C87A" stroke-width="2.45205" stroke-linejoin="round" />
                <path d="M33.7152 45.9761C33.7152 45.9761 32.1827 50.5737 29.1176 52.1062C26.0526 50.5737 24.52 45.9761 24.52 45.9761" stroke="#E8C87A" stroke-width="2.45205" stroke-linecap="round" />
                <path d="M15.3248 12.2604L13.7923 9.19531L12.2598 12.2604H15.3248Z" fill="#E8C87A" stroke="#E8C87A" stroke-width="1.83904" />
                <path d="M47.5079 18.3905L45.9754 15.3254L44.4429 18.3905H47.5079Z" fill="#E8C87A" stroke="#E8C87A" stroke-width="1.83904" />
                <path d="M12.2598 19.923C11.4134 19.923 10.7273 19.2368 10.7273 18.3904C10.7273 17.544 11.4134 16.8579 12.2598 16.8579C13.1062 16.8579 13.7924 17.544 13.7924 18.3904C13.7924 19.2368 13.1062 19.923 12.2598 19.923Z" fill="#E8C87A" />
                <path d="M45.9754 13.7928C45.129 13.7928 44.4429 13.1067 44.4429 12.2603C44.4429 11.4139 45.129 10.7278 45.9754 10.7278C46.8218 10.7278 47.5079 11.4139 47.5079 12.2603C47.5079 13.1067 46.8218 13.7928 45.9754 13.7928Z" fill="#E8C87A" />
            </svg>
        ),
    },
];


export default function QuickAccessCategories() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                {categoryItems.map((item, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <a
                            key={item.id}
                            href={item.link}
                            className="flex flex-col items-center group"
                        >
                            <div
                                className={`
                                    w-32 h-32 rounded-full flex items-center justify-center
                                    transition-transform duration-300 group-hover:scale-110
                                    ${isEven
                                        ? 'bg-gradient-to-tr from-[#1A3A08] to-[#2D5A0E] border-2 border-[#6AAA28]/40'
                                        : 'bg-gradient-to-tr from-[#5A1500] to-[#8B2500] border-2 border-[#C8501E]/40'
                                    }
                                `}
                            >
                                <div className="">
                                    {item.icon}
                                </div>
                            </div>
                            <span className="mt-3 text-base text-center font-medium font-sans">
                                {item.title}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

