import { IRating } from "@/interfaces/room-detail.interface"
import { Rate } from "antd"
import { useState } from "react"
import { FiChevronsRight } from "react-icons/fi"

interface IReviews {
    reviews: IRating[]
}

const Reviews = (props: IReviews) => {
    const { reviews } = props

    const totalReviews = reviews.length

    const [isShowAll, setIsShowAll] = useState(false)

    const displayedReviews = isShowAll ? reviews : reviews.slice(0, 6)

    return (
        <div className="mt-6 pl-2">
            <h1 className="text-lg font-bold">Reviews</h1>
            <div className="grid grid-cols-2 gap-x-20 gap-y-4">
                {displayedReviews.map((review) => (
                    <div key={review.id} className="col-span-1 mt-4 flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                            <img className="h-12 w-12 rounded-full" src={review.renterPhoto} alt={review.renterPhoto} />
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-sm font-bold">{review.renterName}</span>
                                <div>
                                    <Rate
                                        style={{ fontSize: "12px" }}
                                        disabled
                                        allowHalf
                                        defaultValue={Number(review.avgRate)}
                                    />
                                    <span className="ml-2 text-sm font-light">{review.createdAt.split("T")[0]}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                    </div>
                ))}
            </div>
            {!isShowAll && totalReviews > 6 && (
                <button
                    onClick={() => setIsShowAll(true)}
                    className="group mt-8 flex w-fit items-center gap-1 rounded-lg border-2 border-black py-2 pl-5 pr-3 text-sm font-medium transition duration-200 hover:shadow-md"
                >
                    Show all {totalReviews} reviews{" "}
                    <FiChevronsRight className="hidden h-4 w-4 transition-all duration-200 group-hover:block" />
                </button>
            )}
        </div>
    )
}

export default Reviews
