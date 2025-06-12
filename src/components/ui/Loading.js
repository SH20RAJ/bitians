"use client";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ className, ...props }) {
    return (
        <div
            className={cn(
                "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
                className
            )}
            role="status"
            {...props}
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
}

export function LoadingSkeleton({ className, ...props }) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    );
}

export function LoadingCard() {
    return (
        <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
                <LoadingSkeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <LoadingSkeleton className="h-4 w-[200px]" />
                    <LoadingSkeleton className="h-4 w-[100px]" />
                </div>
            </div>
            <LoadingSkeleton className="h-4 w-full" />
            <LoadingSkeleton className="h-4 w-[80%]" />
            <LoadingSkeleton className="h-4 w-[60%]" />
        </div>
    );
}

export function Loading({ className, ...props }) {
    return (
        <div
            className={cn(
                "flex items-center justify-center space-x-2",
                className
            )}
            {...props}
        >
            <LoadingSpinner />
            <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
    );
}
export function LoadingButton({ className, ...props }) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
                className
            )}
            disabled
            {...props}
        >
            <LoadingSpinner className="mr-2" />
            Loading...
        </button>
    );
}