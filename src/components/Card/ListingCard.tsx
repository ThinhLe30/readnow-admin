import { BsStarFill } from "react-icons/bs"
import HeartButton from "../Button/HeartButton"
import Carousel from "antd/es/carousel"
import { GrFormNext, GrFormPrevious } from "react-icons/gr"
import "./index.css"
import { useState } from "react"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import { formatPrice } from "@/utils/helpers"
import { Tooltip } from "antd"
import { useCreateChecklistMutation } from "@/redux/services/checklist/checklist.service"
import { useAppSelector } from "@/redux/hook"
import { IUser } from "@/interfaces/user.interface"
import useServerMessage from "@/hooks/useServerMessage"
interface ListingCardProps {
    dataRoom: IRoomFinding
    onClick?: () => void
}

const settings = {
    nextArrow: <GrFormNext />,
    prevArrow: <GrFormPrevious />
}

const ListingCard: React.FC<ListingCardProps> = ({ dataRoom }) => {
    const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser

    const [currentSlide, setCurrentSlide] = useState(0)
    const [createChecklist, { data, error }] = useCreateChecklistMutation()

    const { images, address, district, price, avgRate, utilities } = dataRoom

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${SITE_MAP.ROOM}/${dataRoom.id}`)
    }

    const handleClickHeartButton = async () => {
        if (userInfo) {
            await createChecklist({
                data: {
                    roomId: dataRoom.id
                }
            })
        } else {
            navigate("/login")
        }
    }

    useServerMessage({ data, error })

    return (
        <div className="group col-span-1 mb-2 cursor-pointer">
            <div className="flex w-full flex-col gap-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Carousel
                        dotPosition={"bottom"}
                        effect="scrollx"
                        arrows={true}
                        style={{ height: "100%" }}
                        beforeChange={(_, to) => setCurrentSlide(to)}
                        {...settings}
                    >
                        {images?.map((image, index) => (
                            <img
                                key={index}
                                onClick={handleClick}
                                className={`h-full object-cover transition ${
                                    currentSlide == index ? "group-hover:scale-110" : ""
                                } `}
                                src={image}
                                alt="Listing"
                            />
                        ))}
                    </Carousel>

                    <div className="absolute right-3 top-3" onClick={handleClickHeartButton}>
                        <HeartButton isInCheckList={dataRoom.isInCheckList} />
                    </div>
                </div>
                <div className="flex justify-between gap-1 overflow-hidden">
                    <h4 className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                        {address}, {district}
                    </h4>
                    <div className="flex items-center gap-1 text-sm font-normal">
                        <BsStarFill size={12} />
                        {avgRate || 0}
                    </div>
                </div>
                <div className="flex gap-2">
                    {utilities.map((utility) => (
                        <Tooltip key={utility.id} title={utility.name}>
                            <img alt={utility.note} className="h-7 rounded-xl bg-gray-200 p-1" src={utility.icon} />
                        </Tooltip>
                    ))}
                </div>
                <h4 className="mt-0.5 flex items-center text-sm">
                    <span className="font-medium">{formatPrice(price)}</span>/month
                </h4>
            </div>
        </div>
    )
}

export default ListingCard
