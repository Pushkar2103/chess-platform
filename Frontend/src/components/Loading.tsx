const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-lg text-white">Waiting for opponent...</p>
        </div>
    );
}

export default Loading;