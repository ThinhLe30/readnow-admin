import { IUtiltity } from "./utility.interface"

export interface IChecklist {
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
}

export interface IChecklistRequest {
    roomId: string
}

export interface IChecklistCreateResponse {
    success: string
    message: string
}
