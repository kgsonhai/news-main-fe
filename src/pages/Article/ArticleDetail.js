import { useCallback, useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { client } from "../../api/client";
import { Footer } from "../../components/Footer/Footer";
import "./ArticleDetail.css";

export const ArticleDetail = () => {
  const { id } = useParams();

  const [article, setArticle] = useState({});
  const fetchArticleDetail = useCallback(async () => {
    const data = await client.get("/api/common/article/" + id);
    setArticle(data);
  }, [id]);

  useEffect(() => {
    fetchArticleDetail();
  }, [fetchArticleDetail, id]);

  return (
    <div className={"article-detail"}>
      <h1>{article.title}</h1>
      <small
        style={{ textAlign: "right", display: "block", paddingBottom: 15 }}
      >
        <Moment format={"DD/MM/YYYY HH:mm"} utc={true}>
          {article.time}
        </Moment>
      </small>
      <p style={{ textAlign: "justify" }}>{article.content}</p>
      <Footer audios={[{ src: `${article.audio_path}` }]} />
    </div>
  );
};
