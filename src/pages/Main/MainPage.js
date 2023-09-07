import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { client } from "../../api/client";
import { ArticleCard } from "../Article/ArticleCard";
import { Footer } from "../../components/Footer/Footer";
import "./MainPage.css";

export const MainPage = () => {
  const [articles, setArticles] = useState([]);
  const [audio, setAudio] = useState([]);
  const isLogin = !!localStorage.getItem("token");

  const urlWithAuth = isLogin ? "/api/user/article" : "/api/common/article";

  const fetchArticles = useCallback(async () => {
    try {
      const data = await client.get(urlWithAuth);
      setArticles(data);
      setAudio(
        data?.map((article) => {
          return { src: `${article.audio_path}` };
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }, [urlWithAuth]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className={"MainPage"}>
      <Row gutter={24}>
        {articles?.map((article) => (
          <Col sm={{ span: 24 }} md={{ span: 8 }} key={article.id}>
            <ArticleCard article={article} />
          </Col>
        ))}
      </Row>
      <Footer audios={audio} />
    </div>
  );
};
