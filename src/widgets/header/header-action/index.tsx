import { Header } from "..";
import { authLinks } from "../mock";

interface HeaderActionProps {
    isLoggedIn: boolean;
    className?: string;
}

export const HeaderAction = ({ isLoggedIn, className }: HeaderActionProps) => {
    return (
        <div className={className}>
            {isLoggedIn ? (
                <Header.HeaderProfile />
            ) : (
                <Header.Navigation links={authLinks} />
            )}
        </div>
    );
};
