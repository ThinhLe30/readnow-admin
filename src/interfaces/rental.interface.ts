export interface IRental {
    roomId: string
    tenantInfo: ITenantInfo
    rentalInfo: IRentalInfo
}

export interface ITenantInfo {
    identityNumber: string
    identityDateOfIssue: string
    identityPlaceOfIsse: string
    birthday: string
    phoneNumber: string
}

export interface IRentalInfo {
    leaseTerm: number
    moveInDate: string
    numberOfTenants: number
}

export interface IRentalResponse {
    message: string
    status: string
}
