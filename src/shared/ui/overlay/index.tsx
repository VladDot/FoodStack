import { useMounted } from "@/shared/hooks";

import { Portal } from "../portal";
import { getStyles } from "./style";

interface IOverlay {
    isOpen: boolean;
    children?: React.ReactNode;
}

export const Overlay = ({ isOpen, children }: IOverlay) => {
    const { isUnmounted } = useMounted({ isOpened: isOpen, duration: 300 });

    console.log(isOpen);

    const style = getStyles({ isOpen });

    return (
        <Portal opened={isUnmounted}>
            <div className={style.overlay} />
            {children}
        </Portal>
    );
};
