import { Button, DatePicker, Form, Input, Select, Spin, Upload } from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import TextEditor from "../../TextEditor";
import { AiOutlineUpload } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service";
import { normFile } from "@/utils/helpers";
import moment from "moment";
import { useUpdateArticleMutation } from "@/redux/services/articles/article.service";
import useServerMessage from "@/hooks/useServerMessage";

const { TextArea } = Input;
const ModalUpdate = (props: IModal) => {
  const { title, data: article } = props;
  // const [content, setContent] = useState<string>(article.content);
  let content = article.content;
  const categories = useGetCategoriesQuery("");
  const [updateArticle, { data, error, isLoading }] =
    useUpdateArticleMutation();
  useServerMessage({ data: data!, error: error });
  const defaultFileList = [
    {
      uid: "-1", // Unique identifier, negative values are reserved for default files
      name: "image", // File name
      status: "done", // Status of the file: done, uploading, error, removed
      url: article.imageURL, // URL of the image
    },
  ];
  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("author", values.author);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", content);
    if (values.image) {
      formData.append("image", values.image[0].originFileObj);
    }
    if (values.cagegoryID) {
      formData.append("categoryID", values.categoryID);
    }

    if (values.publishedAt) {
      values.publishedAt = moment(values.publishedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      formData.append("publishedAt", values.publishedAt);
    }
    await updateArticle({ id: article.id!, body: formData });
  };

  return (
    <Spin spinning={isLoading}>
      <Title>{title}</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 100 }}
        onFinish={onFinish}
        layout="vertical"
        // className="flex w-full flex-col items-center gap-2"
        className=""
        initialValues={{
          author: article.author,
          title: article.title,
          description: article.description,
          publishedAt: moment(article.publishedAt),
          summary: article.summary,
        }}
      >
        <Form.Item className="w-full" name="summary">
          <Input placeholder="Author" disabled={true} />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="author"
          rules={[{ required: true, message: "Please input author!" }]}
        >
          <Input placeholder="Author" />
        </Form.Item>

        <Form.Item
          className="w-full"
          name="title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <TextArea placeholder="Title" rows={2} />
        </Form.Item>
        <Form.Item
          className="w-full"
          name="description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <TextEditor
          placeholder={"Content of article..."}
          value={content}
          onChange={(e) => {
            content = e;
          }}
        />
        <br />
        <Form.Item
          className="w-full"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://run.mocky.io/v3/3f3dc1c7-6e80-4851-9394-74c2d97f8da7"
            listType="picture"
            maxCount={1}
            accept="image/*"
            defaultFileList={defaultFileList}
          >
            <Button
              icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
              className="flex flex-row-reverse items-center justify-between gap-2"
            >
              Upload Article Image
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item className="w-full" name="publishedAt">
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder={"Published At"}
          />
        </Form.Item>
        <Form.Item className="w-full" name="categoryID">
          <Select
            placeholder={"Select Category"}
            value={article.category.id}
            defaultValue={article.category.id}
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

export default ModalUpdate;
