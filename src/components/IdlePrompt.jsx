import { Search } from "lucide-react"

const IdlePrompt = () => {
    return (
        <div className="flex flex-col items-center justify-center text-gray-500 py-20">
            <Search size={32} />
            <p className="text-lg font-medium">Start searching for a GitHub repo or username</p>
            <p className="text-sm text-gray-400 mt-1">Enter something in the search bar above ⬆️</p>
        </div>
    )
}

export default IdlePrompt