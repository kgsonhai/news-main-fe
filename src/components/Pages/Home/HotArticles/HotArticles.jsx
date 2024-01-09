import { Divider } from "antd";
import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AppContext } from "../../../../App";
import "./index.scss";

const HotArticles = ({ hotArticles }) => {
  const { t } = useTranslation();
  const { lang } = useContext(AppContext);
  const history = useHistory();

  const handleNavigation = (article) => {
    history.push(`/article/${article.id}`);
  };

  const firstArticle = hotArticles[0];
  const otherArticle = hotArticles.filter(
    (article) => article.id !== firstArticle.id
  );

  const titleFirstNewsWithLocale = useMemo(() => {
    return lang === "vi" ? firstArticle?.title : firstArticle?.title_english;
  }, [firstArticle, lang]);

  const contentFirstNewsWithLocale = useMemo(() => {
    return lang === "vi"
      ? firstArticle?.content
      : firstArticle?.content_english;
  }, [firstArticle, lang]);

  const titleOtherNewsWithLocale = useCallback(
    (news) => {
      return lang === "vi" ? news.title : news.title_english;
    },
    [lang]
  );

  const createdTimeFirstArticle = useMemo(() => {
    const diffTime = (new Date() - new Date(firstArticle?.time)) / (1000 * 60);

    // Nếu nhỏ hơn 1h
    if (diffTime < 60) {
      return Math.round(diffTime) + ` ${t("minutes-ago")}`;
    }
    // Nếu nhỏ hơn 1 ngày
    if (diffTime < 1 * 24 * 60) {
      return Math.round(diffTime / 60) + ` ${t("hours-ago")}`;
    }
    return Math.round(diffTime / 60 / 24) + ` ${t("days-ago")}`;
  }, [firstArticle?.time, t]);

  return (
    <div className="hot-articles-container">
      <div className="left-hot-articles">
        <div className="first-article">
          <img
            src={firstArticle?.img_urls}
            alt="first article"
            width="450px"
            height="400px"
            style={{ objectFit: "cover" }}
          />
          <div
            className="first-article__content"
            onClick={() => handleNavigation(firstArticle)}
          >
            <h3>{titleFirstNewsWithLocale}</h3>
            <p>{contentFirstNewsWithLocale}</p>
            <div className="first-article__content--info">
              <p>{createdTimeFirstArticle}</p>
              <p>{t(firstArticle?.category)}</p>
            </div>
          </div>
        </div>

        <Divider />

        <div className="bottom-articles">
          {otherArticle.map((item) => (
            <div
              className="item-card"
              key={item.article_id}
              onClick={() => handleNavigation(item)}
            >
              <h4>{titleOtherNewsWithLocale(item)}</h4>
              <img
                src={item.img_urls}
                alt={item.article_id}
                width="100%"
                height="200px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="animation_container">
        <a
          href="https://ebox.vnexpress.net/?utm_source=VnExpress&utm_medium=Display_ads&utm_campaign=Default_fullyear_300x600_Web_28103112&utm_content=eBox&size=300x600"
          target="_blank"
        >
          <canvas className="canvas"></canvas>
        </a>
      </div> */}
    </div>
  );
};

export default HotArticles;
