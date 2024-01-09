import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../App";
import { client } from "../../api/client";
import { Footer } from "../../components/Footer/Footer";
import { ArticleCard } from "./ArticleCard";
import "./ArticleCategory.scss";

export const ArticlesCategory = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { lang } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [audio, setAudio] = useState([]);

  const { categoryName } = useParams();

  const fetchArticles = useCallback(async () => {
    try {
      const data = await client.get("/api/common/article/name/" + categoryName);
      setArticles(data);
      setAudio(
        data.map((article) => {
          return {
            src: `${
              lang === "vi" ? article.audio_path : article.audio_path_en
            }`,
          };
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }, [categoryName, lang]);

  const handleNavigation = (article) => {
    history.push(`/article/${article.id}`);
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  return (
    <>
      <div className="article-with-category">
        <h2>
          {t("topic")} {t(categoryName)}
        </h2>
        {articles.map((article) => (
          <div
            className="article-in-category"
            onClick={() => handleNavigation(article)}
          >
            <ArticleCard article={article} key={article.id} />
          </div>
        ))}
      </div>
      <Footer audios={audio} />
    </>
  );
};
