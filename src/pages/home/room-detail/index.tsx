import Gallery from "./gallery"
import HostInformation from "./host"
import Contract from "./contract"
import RoomAction from "./action"
import Utilities from "./utilities"
import RatingDashboard, { AverageRating } from "./rating"
import { convertAddress } from "@/utils/helpers"
import Map from "@/components/Map"
import Reviews from "./reviews"
import { useParams } from "react-router-dom"
import { useGetRoomDetailQuery } from "@/redux/services/room-detail/room-detail.service"
import { IRoomDetail } from "@/interfaces/room-detail.interface"
import { IRoomBlock } from "@/interfaces/block.interface"
import { ILandlord } from "@/interfaces/user.interface"
import { Affix, Skeleton } from "antd"
import "./style.css"

export const gridLayout = ["2fr 1fr 1fr 1fr 1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]

const RoomDetail = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetRoomDetailQuery({ id })
    const roomDetail = data?.data || ({} as IRoomDetail)

    const {
        price,
        images = [],
        utilities = [],
        roomblock = {} as IRoomBlock,
        landlord = {} as ILandlord,
        ratingDetail = {
            ratings: [],
            totalRating: 0
        }
    } = roomDetail

    const coordinate = roomblock?.coordinate || { latitude: 0, longitude: 0 }

    return isLoading ? (
        <div className="px-4 sm:px-6 md:px-10 xl:px-28">
            <br />
            <Skeleton className="header-skeleton" active paragraph={{ rows: 1 }} style={{ marginBottom: "12px" }} />
            <div style={{ display: "grid", gridTemplateColumns: gridLayout[1], gap: "8px", height: "24rem" }}>
                <Skeleton.Image style={{ width: "100%", height: "100%" }} active />
                <div style={{ display: "grid", gridTemplateColumns: gridLayout[2], gap: "8px" }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton.Image key={index} style={{ width: "100%", height: "100%" }} active />
                    ))}
                </div>
            </div>
            <br />
            <Skeleton active paragraph={{ rows: 4 }} />
        </div>
    ) : (
        <div className="h-full px-4 pb-20 pt-4 sm:px-6 md:px-10 xl:px-28">
            <address className="font-bold not-italic">{convertAddress(roomblock)}</address>
            <div className="mt-2 flex justify-between">
                <AverageRating ratingDetail={ratingDetail} />
                <RoomAction dataRoom={roomDetail} />
            </div>
            <Gallery images={images} />
            <div className="mt-6 flex flex-col items-end gap-12 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex w-full flex-col gap-4 lg:w-5/6">
                    <HostInformation roomblock={roomblock} landlord={landlord} />
                    <Utilities utilities={utilities} />
                    <RatingDashboard ratingDetail={ratingDetail} />
                    <h1 className="mb-4 text-lg font-bold">Where you will go</h1>
                    <Map
                        markerText="This is where you will go"
                        zoom={16}
                        center={[coordinate.latitude, coordinate.longitude]}
                        height="480px"
                    />

                    {ratingDetail?.ratings.length > 0 && <Reviews reviews={ratingDetail?.ratings} />}
                </div>
                <Affix className="!z-50" offsetTop={100}>
                    <Contract price={price} />
                </Affix>
            </div>

            <div className="z-0 mt-6 pl-2"></div>
        </div>
    )
}

export default RoomDetail
