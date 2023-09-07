import { Card } from "antd";
import "./ArticleCard.css";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export const ArticleCard = ({ article }) => {
  return (
    <div className={"article-card"}>
      <Link to={`/article/${article.id}`}>
        <Card title={article.title} style={{ textAlign: "left" }}>
          <img src={article.img_urls} width="100%" height="auto" />
          <small style={{ textAlign: "right", display: "block" }}>
            <Moment format={"DD/MM/YYYY HH:mm"} utc={true}>
              {article.time}
            </Moment>
          </small>
          <p className={"line-clamp"}>{article.content} </p>
        </Card>
      </Link>
    </div>
  );
};
