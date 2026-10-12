import Image from "next/image";

type AvatarProps = {
    name: string;
    src?: string;
    size?: "sm" | "md" | "lg" | "xl";
};

export function Avatar({
                           name,
                           src,
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
        xl: "h-24 w-24 text-2xl",
    };

    return (
        <div
            className={`
                ${sizes[size]}
                relative
                overflow-hidden
                rounded-full
                flex
                items-center
                justify-center
                font-semibold
                bg-gradient-to-br
                from-primary
                to-accent
                text-primary-foreground
                ring-2
                ring-background
                shrink-0
                select-none
            `}
        >
            {src ? (
                <Image src={src} alt={name} fill sizes="96px" className="object-cover" />
            ) : (
                initials
            )}
        </div>
    );
}
