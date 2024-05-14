import { ILandlord } from "./user.interface"

export interface IRoomBlock {
    id: number | string
    address: string
    city: string
    district: string
    country: string
    coordinate: ICoordinate
    description: string
    landlord?: ILandlord
    quantityRooms?: number
    emptyRooms?: number
    deletedAt?: string | null
}

export interface ICoordinate {
    latitude: number
    longitude: number
}

export interface IRoomBlocksRespone {
    data: {
        roomBlocks: IRoomBlock[]
    }
    message: string
    status: string
}

export interface IRoomBlockRespone {
    data: {
        roomBlock: IRoomBlock
    }
    message: string
    status: string
}

export interface IRoomBlockQuery {
    keyword?: string
    role: string
}

export interface IRoomBlockRequest {
    address: string
    city: string
    district: string
    country: string
    coordinate: ICoordinate
    description: string
    landlordId: number
}
