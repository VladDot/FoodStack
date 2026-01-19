import { Header } from "..";
import { authLinks } from "../mock";

interface HeaderActionProps {
    className?: string;
}

export const HeaderAction = ({ className }: HeaderActionProps) => {
    const user = true;

    return (
        <div className={className}>
            {user ? (
                <Header.Navigation links={authLinks} />
            ) : (
                <Header.HeaderProfile />
            )}
        </div>
    );
};
