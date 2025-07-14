const LoadingSkeleton = () => {
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

    )
}

export default LoadingSkeleton