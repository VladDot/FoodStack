interface StylesProps {
    navClass?: string;
}
export const getStyles = ({ navClass }: StylesProps) => ({
    ul: `flex items-center gap-6 laptop:gap-12 ${navClass}`,
});
