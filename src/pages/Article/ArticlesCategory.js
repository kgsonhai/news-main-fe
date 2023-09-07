import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../api/client";
import { Footer } from "../../components/Footer/Footer";
import { ArticleCard } from "./ArticleCard";

export const ArticlesCategory = () => {
  const [articles, setArticles] = useState([]);
  const [audio, setAudio] = useState([]);

  const { categoryName } = useParams();

  const fetchArticles = useCallback(async () => {
    try {
      const data = await client.get("/api/common/article/name/" + categoryName);
      setArticles(data);
      setAudio(
        data.map((article) => {
          return { src: `${article.audio_path}` };
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }, [categoryName]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard article={article} key={article.id} />
      ))}
      <Footer audios={audio} />
    </div>
  );
};
