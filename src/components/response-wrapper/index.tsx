import { useWindowWidth } from "@/hooks/useWindowWIdth";

type Endpoints =
    | "isMobile"
    | "isLaptop"
    | "isTablet"
    | "isDesktop"
    | "isDesktopXL"
    | "isNotMobile"
    | "isNotDesktop";

interface IResponseWrapper {
    endpoint: Endpoints;
    children: React.ReactNode;
}

export const ResponseWrapper = ({ endpoint, children }: IResponseWrapper) => {
    const response = useWindowWidth();

    if (response[endpoint]) {
        return <>{children}</>;
    }

    return null;
};
