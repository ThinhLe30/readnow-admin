import { IRoomBlock } from "@/interfaces/block.interface"
import { ILandlord } from "@/interfaces/user.interface"
import { useState } from "react"
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa"

interface IHostInformation {
    landlord: ILandlord
    roomblock: IRoomBlock
}

const HostInformation = ({ landlord, roomblock }: IHostInformation) => {
    const { name, email, photo, phoneNumber } = landlord

    const [showFullText, setShowFullText] = useState(false)

    const limitedDescription = roomblock.description.slice(0, 500)
    const fullDescription = roomblock.description

    const toggleShowFullText = () => {
        setShowFullText(!showFullText)
    }

    return (
        <>
            <div className="flex justify-between gap-20 border-b border-gray-300 pb-4 pl-2 pr-2">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-bold">Host information</h1>
                    <div className="flex items-center gap-4 text-sm">
                        <span>{name}</span>
                        <span className="text-xs">•</span>
                        <span className="cursor-pointer underline">Tel: {phoneNumber}</span>
                        <span className="text-xs">•</span>
                        <a
                            className="underline transition duration-150 hover:text-primary hover:underline"
                            href={`mailto:${email}`}
                        >
                            Mail
                        </a>
                    </div>
                </div>
                <div>
                    <img className="h-14 w-14 rounded-full border" src={photo} alt="Photo of landlord" />
                </div>
            </div>
            <div className="flex gap-20 border-b border-gray-300 pb-4 pl-2 pr-2">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-lg font-bold">Room information</h1>
                    <span className="text-justify text-sm">
                        {showFullText ? fullDescription : limitedDescription + "..."}
                    </span>
                    {roomblock.description.length > 500 && (
                        <button className="inline-block text-sm font-bold text-black" onClick={toggleShowFullText}>
                            {showFullText ? (
                                <span className="flex items-center gap-2">
                                    Show less <FaAngleDoubleUp className="h-3 w-3" />
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    Show more <FaAngleDoubleDown className="h-3 w-3" />
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default HostInformation
