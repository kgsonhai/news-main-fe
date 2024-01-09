import { Card } from "antd";
import "./ArticleCard.scss";
import Moment from "react-moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useMemo } from "react";
import { AppContext } from "../../App";
import { useTranslation } from "react-i18next";

export const ArticleCard = ({ article }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { lang } = useContext(AppContext);
  const handleNavigation = (article) => {
    history.push(`/article/${article.id}`);
  };

  const titleWithLocale = useMemo(() => {
    return lang === "vi" ? article.title : article.title_english;
  }, [article, lang]);

  const contentWithLocale = useMemo(() => {
    return lang === "vi" ? article.content : article.content_english;
  }, [article, lang]);

  return (
    <Card
      title={titleWithLocale}
      className="article-card"
      style={{ textAlign: "left", height: "100%", cursor: "pointer" }}
      onClick={() => handleNavigation(article)}
    >
      <img src={article.img_urls} width="100%" height="auto" alt="" />
      <div
        style={{
          textAlign: "right",
          display: "block",
          marginBottom: "20px",
          marginTop: "5px",
        }}
      >
        {`${t("created-post")}: `}
        <Moment format={"DD/MM/YYYY"} utc={true}>
          {article.time}
        </Moment>
      </div>
      <div className="line-clamp">{contentWithLocale} </div>
      {/* </Link> */}
    </Card>
  );
};
