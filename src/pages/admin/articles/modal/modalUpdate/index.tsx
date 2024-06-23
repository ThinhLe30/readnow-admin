import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Spin,
  Upload,
  UploadFile,
} from "antd";
import { IModal } from "@/interfaces/modal.interface";
import Title from "@/components/Modal/Title";
import TextEditor from "../../TextEditor";
import { AiOutlineUpload } from "react-icons/ai";
import { useGetCategoriesQuery } from "@/redux/services/categories/categories.service";
import { normFile } from "@/utils/helpers";
import moment from "moment-timezone";
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
  const defaultFileList: UploadFile<any>[] = [
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
      values.publishedAt = values.publishedAt.format("YYYY-MM-DD HH:mm:ss");
      console.log(values.publishedAt);
      formData.append("publishedAt", values.publishedAt);
    }
    await updateArticle({ id: article.id!, body: formData });
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
        initialValues={{
          author: article.author,
          title: article.title,
          description: article.description,
          publishedAt: moment(article.publishedAt).utc(),
          summary: article.summary,
        }}
      >
        <Form.Item className="w-full" name="summary" label="Summary">
          <Input placeholder="Summary" disabled={true} />
        </Form.Item>
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
        <div className="mb-2">Content</div>
        <TextEditor
          placeholder={"Content of article..."}
          value={content}
          onChange={(e) => {
            content = e;
          }}
        />
        <br />
        <Form.Item
          label="Upload Image"
          className="w-full"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="https://run.mocky.io/v3/8e427baf-1e13-482a-b198-c5b55b7d8ae4"
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
        <Form.Item className="w-full" name="categoryID" label="Category">
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
