import { IUtiltity } from "./utility.interface"

export interface IRoomFinding {
    id: string
    price: string
    images: string[]
    address: string
    district: string
    move_out_date?: string
    coordinate: {
        latitude: number
        longitude: number
    }
    utilities: IUtiltity[]
    avgRate?: number
    isInCheckList: boolean
}

export interface IRoomFindingResponse {
    message: string
    status: string
    data: {
        numberOfPage: number
        currentPage: number
        totalRoom: number
        rooms: IRoomFinding[]
    }
}
