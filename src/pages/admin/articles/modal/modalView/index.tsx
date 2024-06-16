import { IModal } from "@/interfaces/modal.interface";
import { Divider, Image, Typography } from "antd";
import ReactHtmlParser from "react-html-parser";
const { Title, Paragraph, Text } = Typography;

import "./style.css";
import moment from "moment";
const ModalView = (props: IModal) => {
  const { title, data: article } = props;

  return (
    <Typography>
      <Title>{article.title}</Title>
      <Divider />
      <div className="flex items-center w-full justify-center">
        <Image
          width={400}
          height={200}
          src={article.imageURL}
          className="rounded-lg items-center justify-center"
          alt="article-image"
        />
      </div>

      <Text italic>
        <br />
        {article.summary}
      </Text>

      <Paragraph>
        <br />
        {ReactHtmlParser(article.content)}
      </Paragraph>
      <Text italic>
        Tác giả: {article.author} <br />
      </Text>
      <Text strong>
        Xuất bản lúc:{" "}
        {moment(article.publishedAt).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </Typography>
  );
};

export default ModalView;
