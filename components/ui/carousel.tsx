"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { LucideIcon, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselProps = React.ComponentProps<"div">

const Carousel = React.forwardRef<
    HTMLDivElement,
    CarouselProps & {
        plugins?: any[]
    }
>(({ className, children, plugins, ...props }, ref) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
        },
        plugins
    )

    return (
        <div
            ref={ref}
            className={cn("relative", className)}
            role="region"
            aria-roledescription="carousel"
            {...props}
        >
            <div ref={emblaRef} className="overflow-hidden">
                {children}
            </div>
        </div>
    )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex", className)} {...props} />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
        {...props}
    />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
                "absolute h-10 w-10 rounded-full -left-12 top-1/2 -translate-y-1/2",
                className
            )}
            {...props}
        >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
        </Button>
    )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            className={cn(
                "absolute h-10 w-10 rounded-full -right-12 top-1/2 -translate-y-1/2",
                className
            )}
            {...props}
        >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
        </Button>
    )
})
CarouselNext.displayName = "CarouselNext"

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
}
