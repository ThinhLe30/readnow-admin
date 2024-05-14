import { TransactionStatusType } from "@/utils/constants/GlobalConst"

export interface ITransactions {
    payment_id?: string
    renterName?: string
    status: TransactionStatusType
    description: string
    stripe_id?: string
    rental_id?: string
    created_at: string
}

export interface ITransactionsResponse {
    message: string
    status: string
    data: ITransactions[]
}
