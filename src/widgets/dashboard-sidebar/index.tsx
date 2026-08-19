"use client";

import { useRef, useState } from "react";

import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button, ListLink } from "@/shared/ui";
import { useOutsideClick } from "@/shared/hooks";

import { getStyles } from "./styles";
import { dashboardLinks } from "./mock";

export const DashboardSidebar = () => {
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);

    const asideRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useOutsideClick(() => setIsOpen(false), [asideRef, buttonRef]);

    const { aside, nav, toggle } = getStyles({ isOpen });

    return (
        <>
            <Button
                size="icon"
                type="button"
                ref={buttonRef}
                className={toggle}
                aria-label="Toggle menu"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? (
                    <ChevronLeft className="h-7 w-7 " />
                ) : (
                    <ChevronRight className="h-7 w-7" />
                )}
            </Button>

            <aside
                ref={asideRef}
                className={aside}
            >
                <nav>
                    <ul className={nav}>
                        {dashboardLinks.map(({ href, label, icon }) => (
                            <ListLink
                                key={href}
                                href={href}
                                icon={icon}
                                label={label}
                                locale={locale}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};
