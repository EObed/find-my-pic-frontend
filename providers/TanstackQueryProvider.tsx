"use client"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
interface IProps{
    children: React.ReactNode
}

export default function TanstackQueryProvider({children}: IProps) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>)

}