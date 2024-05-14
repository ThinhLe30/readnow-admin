import { Badge, Button, Form, Input, Spin } from "antd"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import JsPDF from "jspdf"
import html2canvas from "html2canvas"
import Rule from "./rule"
import Contract from "./contract"
import {
    useConfirmRentalMutation,
    useGetMyRentalQuery,
    useRequestBreakRentalMutation
} from "@/redux/services/rentals/rentals.service"
import { useEffect } from "react"
import { RENTAL_STATUS_COLORS, RENTAL_STATUS, RENTAL_STATUS_TEXT } from "@/utils/constants/GlobalConst"
import useServerMessage from "@/hooks/useServerMessage"
import { message } from "antd"
import { SITE_MAP } from "@/utils/constants/Path"
import ModalReview from "../modalReview"
import { RentalContract } from "./RentalContract"
import ReactDOM from "react-dom"

const MyRentalDetail = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const confirm = new URLSearchParams(useLocation().search).get("confirm")

    useEffect(() => {
        if (confirm) {
            message.success("Confirm rental successfully!")
        }
    }, [confirm])

    const { data, isLoading } = useGetMyRentalQuery({ id: Number(id) })
    const [confirmRental, { isLoading: isConfirmLoading }] = useConfirmRentalMutation()
    const [requestBreakRental, { data: dataRequestBreak, error: errorRequestBreak, isLoading: isRequestBreakLoading }] =
        useRequestBreakRentalMutation()

    useServerMessage({ data: dataRequestBreak!, error: errorRequestBreak })

    const myRental = data?.data
    const status = myRental?.status

    useEffect(() => {
        if (myRental) {
            form.setFieldsValue({
                moveInDate: myRental?.rentalInfo.moveInDate,
                leaseTerm: myRental?.rentalInfo.leaseTerm,
                numberOfTenants: myRental?.rentalInfo.numberOfTenants,
                monthlyRent: myRental?.roomInfo.price,
                leaseTerminationCost: myRental?.rentalInfo.leaseTerminationCost,
                depositAmount: myRental?.roomInfo.depositAmount,
                waterPrice: myRental?.rentalInfo.waterPrice,
                electricPrice: myRental?.rentalInfo.electricPrice,
                additionalPrice: myRental?.rentalInfo.additionalPrice,
                firstName: myRental?.hostInfo.firstName,
                lastName: myRental?.hostInfo.lastName,
                phone: myRental?.hostInfo.phone,
                email: myRental?.hostInfo.email,
                identityDateOfIssue: myRental?.hostInfo.identityDateOfIssue,
                identityNumber: myRental?.hostInfo.identityNumber,
                identityPlaceOfIssue: myRental?.hostInfo.identityPlaceOfIssue,
                birthday: myRental?.hostInfo.birthday
            })
        }
    }, [data, form, myRental])

    const isApprove = status === RENTAL_STATUS.APPROVED
    const isComplete = status === RENTAL_STATUS.COMPLETED
    const isHaveAction = isApprove || isComplete

    const onFinish = async () => {
        switch (true) {
            case isApprove: {
                const res = await confirmRental({ id: Number(id) })

                if ("data" in res && res.data) {
                    window.open(res.data.data.toString(), "_blank")
                }
                break
            }
            case isComplete:
                await requestBreakRental({ id: Number(id) })
                break
            default:
                break
        }
    }

    const generatePDF = async () => {
        const report = new JsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4"
        })
        const div = document.createElement("div")
        document.body.appendChild(div)

        ReactDOM.render(
            <RentalContract
                roomBlockAddress={myRental?.roomBlockInfo.address}
                AFullName={`${myRental?.hostInfo.firstName} ${myRental?.hostInfo.lastName}`}
                ABirthDay={myRental?.hostInfo.birthday}
                AIdentifyNo={myRental?.hostInfo.identityNumber}
                AIdentifyDate={myRental?.hostInfo.identityDateOfIssue}
                AIdentifyAddress={myRental?.hostInfo.identityPlaceOfIssue}
                APhoneNumber={myRental?.hostInfo.phone}
                BFullName={`${myRental?.renterInfo.firstName} ${myRental?.renterInfo.lastName}`}
                BBirthDay={myRental?.renterInfo.birthday}
                BIdentifyNo={myRental?.renterInfo.identityNumber}
                BIdentifyDate={myRental?.renterInfo.identityDateOfIssue}
                BIdentifyAddress={myRental?.renterInfo.identityPlaceOfIssue}
                BPhoneNumber={myRental?.renterInfo.phone}
                roomPrice={myRental?.roomInfo.price}
                electricPrice={myRental?.rentalInfo.electricPrice}
                waterPrice={myRental?.rentalInfo.waterPrice}
                depositAmount={myRental?.roomInfo.depositAmount}
                moveInDate={myRental?.rentalInfo.moveInDate}
                moveOutDate={myRental?.rentalInfo.moveOutDate}
                ASignature={`${myRental?.hostInfo.firstName} ${myRental?.hostInfo.lastName}`}
                BSignature={`${myRental?.renterInfo.firstName} ${myRental?.renterInfo.lastName}`}
            />,
            div
        )

        const canvas = await html2canvas(div)

        // Adjust the dimensions to fit the content
        const contentWidth = 600 // Adjust this based on your content
        const contentHeight = canvas.height * (contentWidth / canvas.width)
        report.addImage(canvas.toDataURL("image/png"), "PNG", 20, 20, contentWidth, contentHeight)

        document.body.removeChild(div)

        report.save("contract.pdf")
    }

    return (
        <div className="mb-16 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <ModalReview />
            <div className="flex flex-row items-center">
                <span onClick={() => navigate(`/${SITE_MAP.MY_RENTAL}`)}>
                    <MdOutlineArrowBackIosNew className="-ml-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-black transition duration-100 hover:scale-110 hover:bg-gray-100" />
                </span>
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-xl font-bold">My rentals</h1>
                    {isComplete && (
                        <Button
                            onClick={async () => {
                                await generatePDF()
                            }}
                            className="h-full w-fit rounded-lg bg-primary px-5 py-1.5 text-sm font-bold text-white hover:shadow-md hover:shadow-primary/60"
                        >
                            Export to PDF
                        </Button>
                    )}
                </div>
            </div>
            <Rule />
            <Spin spinning={isLoading}>
                <div className="mt-4 flex gap-20">
                    <div className="grow">
                        <Form form={form} onFinish={onFinish} layout="vertical" colon={false}>
                            <div>
                                <h2 className="text-lg font-bold">Rental Information</h2>
                                <div className="mx-2 mt-2 flex gap-12">
                                    <div className="flex w-full flex-col">
                                        <Form.Item label="Move in date" name="moveInDate" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Lease term" name="leaseTerm" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Number of tenants" name="numberOfTenants" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>

                                        <Form.Item label="Water price" name="waterPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Electric price" name="electricPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                    <div className="flex w-full flex-col">
                                        <Form.Item label="Monthly rent" name="monthlyRent" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item
                                            label="Lease termination cost"
                                            name="leaseTerminationCost"
                                            className="text-sm"
                                        >
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Deposit amount" name="depositAmount" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Additional price" name="additionalPrice" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-b border-gray-200" />
                            <div>
                                <h2 className="text-lg font-bold">Host Information</h2>
                                <div className="mx-2 mt-2 flex gap-12">
                                    <div className="flex w-full flex-col">
                                        <Form.Item label="Firstname" name="firstName" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Lastname" name="lastName" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Phone" name="phone" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                    <div className="flex w-full flex-col">
                                        <Form.Item label="Birthday" name="birthday" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item label="Identity number" name="identityNumber" className="text-sm">
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item
                                            label="Identity date of issue"
                                            name="identityDateOfIssue"
                                            className="text-sm"
                                        >
                                            <Input readOnly />
                                        </Form.Item>
                                        <Form.Item
                                            label="Identity place of issue"
                                            name="identityPlaceOfIssue"
                                            className="text-sm"
                                        >
                                            <Input readOnly />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            {isHaveAction && (
                                <div className="mt-8 flex w-full justify-center">
                                    <Button
                                        loading={isConfirmLoading || isRequestBreakLoading}
                                        type="primary"
                                        htmlType="submit"
                                        className="h-full w-full rounded-lg bg-primary px-10 py-2 font-bold text-white hover:shadow-md hover:shadow-primary/60"
                                    >
                                        {isApprove ? "Confirm" : "Request break"}
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>
                    <Badge.Ribbon
                        style={{ top: "-11px" }}
                        text={RENTAL_STATUS_TEXT[status as RENTAL_STATUS]}
                        color={RENTAL_STATUS_COLORS[status as RENTAL_STATUS]}
                    >
                        <Contract
                            isComplete={isComplete}
                            rentalInfo={myRental?.rentalInfo}
                            hostInfo={myRental?.hostInfo}
                            roomInfo={myRental?.roomInfo}
                        />
                    </Badge.Ribbon>
                </div>
            </Spin>
        </div>
    )
}

export default MyRentalDetail
