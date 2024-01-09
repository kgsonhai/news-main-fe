import { CheckCircleTwoTone } from "@ant-design/icons";
import { Divider } from "antd";
import axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { client } from "../../api/client";
import { Footer } from "../../components/Footer/Footer";
import { normalizeContent, splitAndJoinString } from "../../shared/utils";
import "./ArticleDetail.scss";

export const ArticleDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { lang } = useContext(AppContext);
  const [article, setArticle] = useState({});
  const [listTranslation, setListTranslation] = useState([]);
  const [listTranslatedText, setListTranslatedText] = useState([]);
  const fetchArticleDetail = useCallback(async () => {
    const data = await client.get("/api/common/article/" + id);
    setArticle(data);
  }, [id]);

  const titleWithLocale = useMemo(() => {
    return lang === "vi" ? article?.title : article?.title_english;
  }, [article, lang]);

  const audioWithLocale = useMemo(() => {
    return lang === "vi" ? article?.audio_path : article?.audio_path_en;
  }, [article, lang]);

  const createdTimeFirstArticle = useMemo(() => {
    const diffTime = (new Date() - new Date(article?.time)) / (1000 * 60);

    // Nếu nhỏ hơn 1h
    if (diffTime < 60) {
      return Math.round(diffTime) + " phút trước";
    }
    // Nếu nhỏ hơn 1 ngày
    if (diffTime < 1 * 24 * 60) {
      return Math.round(diffTime / 60) + " giờ trước";
    }
    return Math.round(diffTime / 60 / 24) + " ngày trước";
  }, [article]);

  const listMainConent = useMemo(() => {
    return lang === "vi"
      ? splitAndJoinString(normalizeContent(article?.content || ""))
      : splitAndJoinString(normalizeContent(article?.content_english || ""));
  }, [article, lang]);

  const getTranslateContent = useCallback(
    async (text) => {
      try {
        const data = await axios.post("http://localhost:3035/translate-text", {
          text,
          currentLang: lang,
        });
        return data?.translation || "";
      } catch (error) {
        console.log({ error });
      }
    },
    [lang]
  );

  const handleShowTransaleItem = useCallback(
    async (id, originalText) => {
      const listlistTranslatedTextId = listTranslatedText.map(
        (item) => item?.id
      );
      if (!listlistTranslatedTextId.includes(id)) {
        console.log("CALL API");
        const translateText = await getTranslateContent(originalText);
        setListTranslatedText((pre) => [...pre, { id, translateText }]);
      }

      if (listTranslation.includes(id)) {
        setListTranslation((preList) => preList.filter((item) => item !== id));
      } else {
        setListTranslation((pre) => [...pre, id]);
      }
    },
    [listTranslatedText, listTranslation, getTranslateContent]
  );

  useEffect(() => {
    fetchArticleDetail();
  }, [fetchArticleDetail, id]);

  useEffect(() => {
    setListTranslation([]);
    setListTranslatedText([]);
  }, [lang]);

  return (
    <div className={"article-detail"}>
      <h1>{titleWithLocale}</h1>
      <div className="header-live">
        <CheckCircleTwoTone twoToneColor="red" />
        <span className="update-time">
          {t("updated")} {createdTimeFirstArticle}
        </span>
        <Divider type="vertical" />
        <span className="time">{t("time")} (GMT+7)</span>
        <Divider type="vertical" />
        <span className="time">
          {t("topic")} {t(article.category)}
        </span>
        <div className="source">
          {t("source")}:
          <a href={article.url} target="_blank" rel="noreferrer">
            {` ${article.url}`}
          </a>
        </div>
      </div>
      <img
        src={article.img_urls}
        alt="article"
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
      />
      <small
        style={{
          textAlign: "right",
          display: "block",
          paddingBottom: 15,
          paddingTop: 20,
        }}
      >
        {`${t("created-post")}: `}
        <Moment format={"DD/MM/YYYY "} utc={true}>
          {article.time}
        </Moment>
      </small>
      {listMainConent?.filter(Boolean)?.map((content, index) => (
        <>
          <div className="main-content">{content}</div>
          <div
            className="icon-translate"
            onClick={() => handleShowTransaleItem(index, content)}
          >
            <img
              src="/icon-translate.png"
              alt="icon-translate"
              height={50}
              width={50}
            />
          </div>
          {listTranslation.includes(index) && (
            <div className="translate-content">
              {
                listTranslatedText?.find((item) => item.id === index)
                  ?.translateText
              }
            </div>
          )}
        </>
      ))}
      <Footer audios={[{ src: `${audioWithLocale}` }]} />
    </div>
  );
};
