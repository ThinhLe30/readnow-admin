import { AiFillInfoCircle } from "react-icons/ai"

const Rule = () => {
    return (
        <div className="mt-3 flex flex-col gap-2 rounded-lg bg-gray-100 px-4 py-3">
            <p className="flex items-center gap-1 text-xs text-gray-600">
                <AiFillInfoCircle /> Please payment before expiration date
            </p>
        </div>
    )
}

export default Rule
