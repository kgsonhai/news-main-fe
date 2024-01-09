import { Divider } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { client } from "../../api/client";
import { Footer } from "../../components/Footer/Footer";
import HotArticles from "../../components/Pages/Home/HotArticles/HotArticles";
import ListArticles from "../../components/Pages/Home/ListArticles";
import "./MainPage.scss";
import { AppContext } from "../../App";

export const MainPage = () => {
  const { lang } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [hotArticles, setHotArticles] = useState([]);
  const [audio, setAudio] = useState([]);
  const isLogin = !!localStorage.getItem("token");

  const urlWithAuth = isLogin ? "/api/user/article" : "/api/common/article";

  const fetchArticles = useCallback(async () => {
    try {
      const data = await client.get(urlWithAuth);
      const dataHasAudio = data.filter((article) => article.audio_path);
      setHotArticles(dataHasAudio.slice(0, 4));
      setArticles(dataHasAudio.slice(5, dataHasAudio.length - 4));
      setAudio(
        data?.map((article) => {
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
  }, [lang, urlWithAuth]);

  useEffect(() => {
    fetchArticles();
    // setArticles(mockArticle);
  }, [fetchArticles]);

  return (
    <div className={"MainPage"}>
      <HotArticles hotArticles={hotArticles} />
      <Divider />
      <ListArticles articles={articles} />
      <Footer audios={audio} />
    </div>
  );
};
