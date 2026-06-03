type AvatarProps = {
    name: string;
    size?: "sm" | "md" | "lg";
};

export function Avatar({
                           name,
                           size = "md",
                       }: AvatarProps) {
    const initials = name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const sizes = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };

    return (
        <div
            className={`
                ${sizes[size]}
                rounded-full
                flex
                items-center
                justify-center
                font-semibold
                bg-primary
                text-primary-foreground
                border
                border-border
                shrink-0
                select-none
            `}
        >
            {initials}
        </div>
    );
}