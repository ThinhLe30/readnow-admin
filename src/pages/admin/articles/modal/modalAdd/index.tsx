import { Button, DatePicker, Form, Input, Select, Spin, Upload } from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import { createArticleFormData, normFile } from "@/utils/helpers";
import TextEditor from "../../TextEditor";
import { AiOutlineUpload } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service";
import { useCreateArticleMutation } from "@/redux/services/articles/article.service";
import useServerMessage from "@/hooks/useServerMessage";

const { TextArea } = Input;
const ModalAdd = (props: IModal) => {
  const { title } = props;
  const categories = useGetCategoriesQuery("");
  const [createArticle, { data, error, isLoading }] =
    useCreateArticleMutation();
  useServerMessage({ data: data!, error: error });
  const onFinish = async (values: any) => {
    const formData = createArticleFormData(values);
    await createArticle(formData);
  };

  return (
    <Spin spinning={isLoading}>
      <Title>{title}</Title>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 100 }}
        onFinish={onFinish}
        layout="vertical"
        // className="flex w-full flex-col items-center gap-2"
        className=""
      >
        <Form.Item
          label="Author"
          className="w-full"
          name="author"
          rules={[{ required: true, message: "Please input author!" }]}
        >
          <Input placeholder="Author" />
        </Form.Item>
        <Form.Item
          label="Title"
          className="w-full"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <TextArea placeholder="Title" rows={2} />
        </Form.Item>
        <Form.Item
          label="Description"
          className="w-full"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>
        <Form.Item
          label="Content"
          rules={[{ required: true, message: "Please input content!" }]}
          className="w-full"
          name="content"
        >
          <TextEditor
            value={""}
            placeholder={"Content of article..."}
            onChange={() => {}}
          />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          className="w-full"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload image!" }]}
        >
          <Upload
            action="https://run.mocky.io/v3/8e427baf-1e13-482a-b198-c5b55b7d8ae4"
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button
              icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
              className="flex flex-row-reverse items-center justify-between gap-2"
            >
              Upload Article Image
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item
          className="w-full"
          name="publishedAt"
          label="Publication Date"
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: "100%" }}
            placeholder={"Published At"}
            showTime={{ use12Hours: true }}
          />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="categoryID"
          label="Category"
          rules={[{ required: true, message: "Please select category!" }]}
        >
          <Select
            placeholder={"Select Category"}
            // defaultValue={data?.[0]?.id}
            options={
              categories.data?.map((item) => ({
                label: item.name,
                value: item.id,
              })) || []
            }
          />
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
