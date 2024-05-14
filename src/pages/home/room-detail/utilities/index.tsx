import { IUtility } from "@/interfaces/room-detail.interface"

interface IUtilities {
    utilities: IUtility[]
}

const Utilities = (props: IUtilities) => {
    return (
        <div className="border-b border-gray-300 pl-2">
            {props.utilities.map((utility) => (
                <div key={utility.id} className="mb-4 flex items-center gap-5">
                    <img className="h-5 w-5" src={utility.icon} alt={utility.name} />
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{utility.name}</span>
                        <p className="text-sm text-gray-500/90">{utility.note}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Utilities
