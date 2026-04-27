"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faXmark} from "@fortawesome/free-solid-svg-icons";

interface NavItem {
    title: string;
    submenus?: NavItem[];
    subSubmenus?: string[];
    url?: string;        // If present, go directly to this link
    external?: boolean;  // If true, open in a new tab/window
}

interface MenuPathItem {
    title: string;
    submenus: NavItem[];
}

interface MobileMenuProps {
    navItems: NavItem[];
    onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, onClose }) => {
    const router = useRouter();

    // Track multi-level breadcrumb path
    const [menuPath, setMenuPath] = useState<MenuPathItem[]>([]);
    // Track if menu is animating out
    const [isClosing, setIsClosing] = useState(false);
    // Control slide-in from top
    const [animateIn, setAnimateIn] = useState(false);

    // On mount, slide in and lock body scroll
    useEffect(() => {
        setAnimateIn(true);

        // Lock scroll: measure scrollbar if present
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        document.body.style.overflow = "hidden";

        // On unmount (or parent removal), restore body
        return () => {
            document.body.style.removeProperty("padding-right");
            document.body.style.removeProperty("overflow");
        };
    }, []);

    // Current level of nesting
    const currentLevel = menuPath.length;

    // Build array of menus for each level
    const menus: NavItem[][] = [
        navItems,
        ...menuPath.map((level) => level.submenus),
    ];

    // Slugify helper
    const slugify = (text: string) =>
        text.toLowerCase().trim().replace(/\s+/g, "-");

    // Navigate to a page (no submenu open)
    const handleNavigateToPage = (item: NavItem) => {
        if (item.url) {
            if (item.external) {
                window.open(item.url, "_blank");
            } else {
                router.push(item.url);
            }
            handleClose();
        } else {
            const pathSegments = [
                ...menuPath.map((level) => slugify(level.title)),
                slugify(item.title),
            ];
            router.push(`/${pathSegments.join("/")}`);
            handleClose();
        }
    };

    // Expand submenu
    const handleExpandSubmenu = (item: NavItem) => {
        const nextMenu: NavItem[] = item.subSubmenus
            ? item.subSubmenus.map((title: string) => ({ title }))
            : item.submenus || [];
        setMenuPath((prev) => [...prev, { submenus: nextMenu, title: item.title }]);
    };

    // Go back one level
    const handleBack = () => {
        if (currentLevel > 0) {
            setMenuPath((prev) => prev.slice(0, -1));
        }
    };

    // Animate out, then call parent onClose
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300); // match tailwind transition time
    };

    return (
        <div
            className={`
        fixed inset-0 z-[1000] flex flex-col bg-[#4B1890] text-white
        transition-transform duration-300
        ${isClosing || !animateIn ? "-translate-y-full" : "translate-y-0"}
      `}
        >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 relative min-h-[80px]">
                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            router.push("/");
                            handleClose();
                        }}
                        className="flex justify-center"
                    >
                        <Image
                            src="/logo-dome.png"
                            alt="Logo"
                            width={180}
                            height={80}
                            className="object-contain"
                            priority
                        />
                    </button>
                </div>

                {/* Back Button */}
                {currentLevel > 0 && (
                    <button
                        onClick={handleBack}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>

            {/* Sliding panel container */}
            <div className="flex-1 overflow-hidden">
                <div
                    className="flex transition-transform duration-300 h-full"
                    style={{
                        width: "100%",
                        transform: `translateX(-${currentLevel * 100}%)`,
                    }}
                >
                    {menus.map((menu, level) => (
                        <div
                            key={level}
                            className="w-full flex-shrink-0 p-4 overflow-y-auto"
                        >
                            {menu.map((item, index) => (
                                <div
                                    key={index}
                                    className={`
                    flex justify-between items-center py-3 px-4 transition text-[20px]
                    ${
                        item.submenus || item.subSubmenus
                            ? "cursor-pointer"
                            : "cursor-default"
                    }
                  `}
                                >
                                    <span onClick={() => handleNavigateToPage(item)}>{item.title}</span>
                                    {(item.submenus || item.subSubmenus) && (
                                        <button onClick={() => handleExpandSubmenu(item)}>
                                            <FontAwesomeIcon icon={faChevronRight} className="text-xl" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;