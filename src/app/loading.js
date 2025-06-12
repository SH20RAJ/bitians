import React from 'react'

export default function loading() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                    <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-32 mx-auto animate-pulse"></div>
                    <p className="text-sm text-muted-foreground">Loading BITians.org...</p>
                </div>
            </div>
        </div>
    )
}
