import { IRoom } from "./room.interface"

export interface IStatisticRevenue {
    revenue: number
    electric: number
    water: number
    additionalPrice: number
    month: number
}

export interface IStatisticRevenueResponse {
    message: string
    status: string
    data: {
        statistics: IStatisticRevenue[]
        totalRevenue: number
    }
}

export interface IStatisticRatingResponse {
    message: string
    status: string
    data: {
        good: IRoom[]
        bad: IRoom[]
    }
}

export interface IStatisticCostResponse {
    message: string
    status: string
    data: {
        statistics: IStatisticCost[]
        totalCost: number
    }
}

export interface IStatisticCost {
    cost: number
    electric: number
    water: number
    additionalPrice: number
    month: number
    increase: number
}
