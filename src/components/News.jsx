import React, { useState } from "react";
import { Typography, Row, Col, Card, Select } from 'antd';
import moment from 'moment';
import Loader from "./Loader";

import { useGetCoinDeskNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsProvider, setNewsProvider] = useState('coindesk');
  const { data: cryptoNews } = useGetCoinDeskNewsQuery(newsProvider);

  if (!cryptoNews) return <Loader/>;

  // Limit the number of news articles to 6
  const limitedNews = simplified ? cryptoNews.data.slice(0, 3) : cryptoNews.data;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Title className='heading' level={2}>Track Crypto News</Title>
          <Select
            showSearch
            className="select-news"
            placeholder="Select News Provider"
            optionFilterProp="children"
            onChange={(value) => setNewsProvider(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
          >
            <Option value='coindesk'>Coindesk</Option>
            <Option value='cointelegraph'>Cointelegraph</Option>
            <Option value='bitcoinist'>Bitcoinist</Option>
            <Option value='decrypt'>Decrypt</Option>
            <Option value='bsc'>BSC News</Option>
            <Option value='theguardian'>The Guardian</Option>
          </Select>
        </Col>
      )}
      {limitedNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
              <div className="news-image-container">
                <img src={news.thumbnail} alt={news.title} />
              </div>
              <Title className="news-title" level={4}>
                {news.title}
              </Title>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
