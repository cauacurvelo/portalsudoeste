export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 animate-pulse space-y-12">
            {/* Hero Skeleton */}
            <div className="w-full aspect-[21/9] bg-gray-200 dark:bg-gray-800 rounded-sm" />

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <div className="w-full aspect-[16/9] bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                    </div>
                ))}
            </div>
        </div>
    )
}
