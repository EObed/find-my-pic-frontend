'use client'

import { Camera } from 'lucide-react'

export function Loader() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent animate-spin" />

                        <div className="absolute inset-1.5 rounded-full bg-card" />

                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse" />

                        <div className="absolute inset-0 flex items-center justify-center [animation:fadeFull_2s_infinite_ease-in-out]">
                            <Camera className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Processing Your Image</h3>
                        <p className="text-sm text-foreground/60">
                            Our AI is analyzing your photo and searching for matches...
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>

                    <p className="text-xs text-foreground/50">This usually takes 10-30 seconds</p>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeFull {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    )
}