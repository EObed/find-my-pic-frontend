import { ReactNode } from "react";
import { redirect } from "next/navigation";

import PhotographerPageWrapper from "@/components/photographer/PhotographerPageWrapper";
import { getSession } from "@/lib/session";

export default async function Layout({
                                        children,
                                    }: {
    children: ReactNode;
}) {
    const session = await getSession();
    if (!session) {
        redirect("/p/login");
    }

    const { user } = session;
    const name = `${user.firstName} ${user.lastName}`.trim() || user.email;

    return (
        <PhotographerPageWrapper user={{ name, email: user.email }}>
            {children}
        </PhotographerPageWrapper>
    );
}
