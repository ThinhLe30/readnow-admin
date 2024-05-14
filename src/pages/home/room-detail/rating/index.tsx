import { AiFillStar } from "react-icons/ai"
import { MdOutlineCleanHands, MdSecurity } from "react-icons/md"
import { GrLocation } from "react-icons/gr"
import { BiSupport } from "react-icons/bi"
import { IRatingDetail } from "@/interfaces/room-detail.interface"

type TSize = "big" | "normal" | "small"

interface IRating {
    size?: TSize
    ratingDetail?: IRatingDetail
}

const AverageRating = (props: IRating) => {
    const { avgRate = 0, ratings = [] } = props.ratingDetail ?? {
        avgRate: 0,
        ratings: []
    }

    return (
        <div
            className={`${
                props.size === "big" ? "text-lg font-bold" : props.size === "small" ? "text-sm" : "text-base"
            } flex items-center gap-2 `}
        >
            <span className="flex items-center gap-1 font-bold">
                <AiFillStar /> {avgRate}
            </span>
            <span className="text-xs">•</span>
            <span>{ratings.length} reviews</span>
        </div>
    )
}

export { AverageRating }

interface IRatingDashboard {
    ratingDetail?: IRatingDetail
}

const RatingDashboard = (props: IRatingDashboard) => {
    const {
        avgClean = 0,
        avgLocation = 0,
        avgSecurity = 0,
        avgSupport = 0
    } = props.ratingDetail ?? {
        avgClean: 0,
        avgLocation: 0,
        avgSecurity: 0,
        avgSupport: 0
    }

    const averageRating = [
        {
            title: "Cleanliness",
            value: avgClean,
            icon: <MdOutlineCleanHands className="h-6 w-6" />
        },
        {
            title: "Location",
            value: avgLocation,
            icon: <GrLocation className="h-6 w-6" />
        },
        {
            title: "Security",
            value: avgSecurity,
            icon: <MdSecurity className="h-6 w-6" />
        },
        {
            title: "Support",
            value: avgSupport,
            icon: <BiSupport className="h-6 w-6" />
        }
    ]

    return (
        <div className="flex flex-col border-b pb-4 pl-2">
            <AverageRating size="big" ratingDetail={props.ratingDetail} />
            <div className="flex">
                {averageRating.map((rating) => (
                    <div key={rating.title} className="mr-6 mt-2 flex w-32 flex-col border-r last:border-none">
                        <span className="text-sm font-medium text-gray-600">{rating.title}</span>
                        <span className="mt-1 text-lg font-bold">{rating.value}</span>
                        <span className="mt-4">{rating.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingDashboard
