import { IUtility } from "./room-detail.interface"

export interface IRentals {
    status: string
    rentalInfo: IRentalInfo
    hostInfo: IHostInfo
    renterInfo: IRenterInfo
    roomInfo: IRoomInfo
    roomBlockInfo: IRoomBlockInfo
}

export interface IModInfo {
    id: number
    photo: string
    firstName: string
    lastName: string
    email: string
    phone: string
    identityNumber: any
    identityDateOfIssue: any
    identityPlaceOfIssue: any
    birthday: any
    electricPrice: any
    waterPrice: any
}

export interface IRentalInfo {
    id: number
    photo: string
    rentalDetailId: number
    electricPrice: string
    waterPrice: string
    additionalPrice: string
    leaseTerm: number
    leaseTerminationCost: string
    moveInDate: string
    moveOutDate: string
    numberOfTenants: number
    ratingStatus: TRatingStatus
}

export type TRatingStatus = "NONE" | "RATED"

export interface IHostInfo {
    birthday: string
    photo: string
    email: string
    firstName: string
    id: number
    identityDateOfIssue: string
    identityPlaceOfIssue: string
    identityNumber: string
    lastName: string
    phone: string
}

export interface IRenterInfo {
    email: string
    firstName: string
    id: number
    identityDateOfIssue: string
    identityNumber: string
    identityPlaceOfIssue: string
    lastName: string
    phone: string
    birthday: string
}

export interface IRoomInfo {
    area: string
    depositAmount: string
    id: string
    images: string[]
    price: string
    roomName: string
    utilities: IUtility[]
    roomRatings: IRoomRatings
}

export interface IRoomRatings {
    avgRate: number
    numberOfRatings: number
}

export interface IRoomBlockInfo {
    id: number
    address: string
    city: string
    district: string
    description: string
    lattitude: number
    longitude: number
}

export interface IRentalsResponse {
    data: IRentals[]
    message: string
    status: string
}

export interface IReviewRentalRequest {
    rentalId: number
    comment: string
    cleanRate: number
    supportRate: number
    locationRate: number
    securityRate: number
}

export interface IMyRentalResponse {
    data: IRentals
    message: string
    status: string
}

export interface IModInfoResponse {
    data: IModInfo
    message: string
    status: string
}
