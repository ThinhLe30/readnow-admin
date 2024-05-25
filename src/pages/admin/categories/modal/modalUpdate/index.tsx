import { Button, Form, Input, Spin } from "antd";
import useServerMessage from "@/hooks/useServerMessage";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/services/categories/categories.service";
import { ICreateCategoryRequest } from "@/interfaces/category.interface";

const ModalUpdate = (props: IModal) => {
  const { title, data: category } = props;
  const { id, name } = category;
  const [updateCategoy, { data, error, isLoading }] =
    useUpdateCategoryMutation();

  useServerMessage({ data: data!, error: error });

  const onFinish = async (values: any) => {
    const body: ICreateCategoryRequest = {
      name: values.name,
    };
    await updateCategoy({ name: values.name, id });
  };

  return (
    <Spin spinning={isLoading}>
      <Title>{title}</Title>
      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="flex w-full flex-col items-center gap-2"
        initialValues={{ name: name }}
      >
        <Form.Item
          className="w-full"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input className="w-full" placeholder="Name" />
        </Form.Item>
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 bg-primary text-white"
          >
            Finish
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default ModalUpdate;
