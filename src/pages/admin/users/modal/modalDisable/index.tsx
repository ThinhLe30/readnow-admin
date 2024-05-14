import Title from "@/components/Modal/Title"
import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useUpdateUserMutation } from "@/redux/services/user/user.service"
import { USER_STATUS } from "@/utils/constants/GlobalConst"
import { Button, Image, Spin } from "antd"

const ModalDisable = (props: IModal) => {
    const { title, isActive, data: user } = props
    const [updateUser, { data, error, isLoading }] = useUpdateUserMutation()

    useServerMessage({ data: data!, error: error })

    const handleClick = async () => {
        const formData = new FormData()
        if (isActive) formData.append("status", USER_STATUS.DISABLED)
        else formData.append("status", USER_STATUS.ACTIVE)

        await updateUser({ id: user!.id as number, formData: formData })
    }

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <Title>{title}</Title>
            <p className=" mb-6 text-center font-medium">
                Are you sure you want to {isActive ? "disable" : "active"} the account of <br />
                <span className=" font-bold">{user?.firstName}</span>?
            </p>
            <div className="mb-6 flex w-full justify-center">
                <Image src={user?.photo} width={100} height={100} className="rounded-full" />
            </div>
            <div className="flex w-full justify-end">
                <Button
                    onClick={handleClick}
                    loading={isLoading}
                    className={`text-white ${isActive ? "bg-red-500" : "bg-green-500"} border-none`}
                >
                    {isActive ? "Disable" : "Active"}
                </Button>
            </div>
        </Spin>
    )
}

export default ModalDisable
