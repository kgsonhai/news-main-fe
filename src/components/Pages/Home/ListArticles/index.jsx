import { Col, Row } from "antd";
import { splitArrayIntoGroups } from "../../../../shared/utils";
import { ArticleCard } from "../../../../pages/Article/ArticleCard";
import { useTranslation } from "react-i18next";

const ListArticles = ({ articles }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2>{t("news-everyday")}</h2>
      <Row gutter={40}>
        {splitArrayIntoGroups(articles)?.map((listArticle, index) => (
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            {listArticle.map((article) => (
              <div
                className={`articles-column articles-column__${index}`}
                key={article.article_id}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ListArticles;
