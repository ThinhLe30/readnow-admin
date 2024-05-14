import { AiFillInfoCircle } from "react-icons/ai"

const Rule = () => {
    return (
        <div className="mt-3 flex flex-col gap-2 rounded-lg bg-gray-100 px-4 py-3">
            <p className="flex items-center gap-1 text-xs text-gray-600">
                <AiFillInfoCircle /> These information will be used to prepare the digital contract, please help to
                provide correct information.
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-600">
                <AiFillInfoCircle /> The contract then will be proceeded by the host
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-600">
                <AiFillInfoCircle /> You will be informed when the host accept your confirmation.
            </p>
        </div>
    )
}

export default Rule
