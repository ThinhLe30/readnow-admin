import { Button, Form, Input, Spin } from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import Password from "antd/es/input/Password";
import { useCreateUserMutation } from "@/redux/services/users/users.service";
import useServerMessage from "@/hooks/useServerMessage";
const ModalAdd = (props: IModal) => {
  const { title } = props;
  const [createUser, { data, error, isLoading }] = useCreateUserMutation();
  useServerMessage({ data: data!, error: error });
  const onFinish = async (values: any) => {
    console.log(values);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);
    console.log(formData);
    createUser(formData);
  };

  return (
    <Spin spinning={isLoading}>
      <Title>{title}</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 100 }}
        onFinish={onFinish}
        layout="vertical"
        className=""
      >
        <Form.Item
          className="w-full"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="rePassword"
          rules={[{ required: true, message: "Please input re-password!" }]}
        >
          <Password placeholder="Re-Password" />
        </Form.Item>

        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 bg-primary text-white"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ModalAdd;
