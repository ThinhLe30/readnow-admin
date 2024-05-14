export interface IUtiltity {
    name: string
    note: string
    id: number
    icon: string
}
export interface IUtiltityResponse {
    data: {
        utilities: IUtiltity[]
    }
    message: string
    status: string
}

export interface IUtiltityCUResponse {
    message: string
    status: string
}

export interface ICreateUtilityRequest {
    name: string
    note: string
}
export interface IUpdateUtilityRequest {
    id: number
    body: {
        name: string
        note: string
    }
}
