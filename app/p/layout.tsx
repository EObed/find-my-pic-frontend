import { ReactNode } from "react";
import PhotographerPageWrapper from "@/components/photographer/PhotographerPageWrapper";

export default function Layout({
                                   children,
                               }: {
    children: ReactNode;
}) {
    return (
        <PhotographerPageWrapper
            user={{
                name: "John Doe",
                email: "john@example.com",
            }}
        >
            {children}
        </PhotographerPageWrapper>
    );
}