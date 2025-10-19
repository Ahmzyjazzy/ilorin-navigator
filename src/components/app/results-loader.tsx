'use client'

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";

type ResultsLoaderProps = {
    children: React.ReactNode;
    loadingMessage?: string;
    loadingContent?: React.ReactNode;
}

export function ResultsLoader({ children, loadingMessage, loadingContent }: ResultsLoaderProps) {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <CardContent>
                <div className="mt-6 border-t pt-6 flex justify-center items-center">
                    {loadingContent || (
                        <>
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            {loadingMessage && <p className="ml-4">{loadingMessage}</p>}
                        </>
                    )}
                </div>
            </CardContent>
        )
    }

    return <>{children}</>
}