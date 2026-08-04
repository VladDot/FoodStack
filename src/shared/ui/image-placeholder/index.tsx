interface ImagePlaceholderProps {
    className?: string;
    iconClassName?: string;
}

export const ImagePlaceholder = ({
    className = "w-40 h-40",
    iconClassName = "w-10 h-10",
}: ImagePlaceholderProps) => {
    return (
        <div
            className={`${className} bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-300`}
        >
            <svg
                className={iconClassName}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0A2.701 2.701 0 013 15.546M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
        </div>
    );
};
