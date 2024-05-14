import { IPayments } from "@/interfaces/payments.interface"
import { useGetMyPaymentsQuery } from "@/redux/services/payments/payments.service"
import { Empty, Skeleton, Tabs, TabsProps } from "antd"
import MyPaymentCard from "./card"
import { useState } from "react"
import { PAYMENT_STATUS } from "@/utils/constants/GlobalConst"

const MyPayment = () => {
    const { data, isLoading, isFetching } = useGetMyPaymentsQuery(undefined, { refetchOnMountOrArgChange: true })
    const [filter, setFilter] = useState<PAYMENT_STATUS.UNPAID | PAYMENT_STATUS.PAID>(PAYMENT_STATUS.UNPAID)

    const myPayments = data?.data

    if (myPayments?.length === 0 && !isLoading && !isFetching)
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No payments in list." className="mt-24" />

    const filteredPayments = myPayments?.filter((payment) =>
        filter === PAYMENT_STATUS.PAID
            ? payment.status === PAYMENT_STATUS.PAID
            : payment.status === PAYMENT_STATUS.UNPAID
    )

    const items: TabsProps["items"] = [
        {
            key: PAYMENT_STATUS.UNPAID,
            label: "Unpaid"
        },
        {
            key: PAYMENT_STATUS.PAID,
            label: "Paid"
        }
    ]

    const onChange = (key: string) => {
        setFilter(key as PAYMENT_STATUS.UNPAID | PAYMENT_STATUS.PAID)
    }

    return (
        <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <h1 className="mb-2 text-2xl font-bold text-secondary">My Payment</h1>
            {isLoading || isFetching ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-md">
                            <Skeleton.Image className="aspect-[5/3] !h-auto !w-full" />

                            <div className="px-4 py-2">
                                <Skeleton active style={{ marginTop: "10px", width: "100%" }} />

                                <hr className="my-2 border border-b-gray-50" />

                                <div className="mb-1 flex h-full items-center justify-end">
                                    <Skeleton.Button style={{ width: "80px" }} active />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <Tabs defaultValue={PAYMENT_STATUS.UNPAID} items={items} onChange={onChange} />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredPayments?.map((item: IPayments) => <MyPaymentCard key={item.id} myPayment={item} />)}
                    </div>
                </>
            )}
        </div>
    )
}

export default MyPayment
