import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { RocketOutlined } from '@ant-design/icons';
import { Button, Row, Col, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from 'components/Common/ImageSlider'
import CheckBox from './Sections/CheckBox';

function LandingPage(props) {

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0); // flag 0 -> 8 -> 16
  const [Limit, setLimit] = useState(8); // 한번에 8개씩 가져옴.
  const [PostSize, setPostSize] = useState(0); // LoadMore 버튼을 위함.
  const [Filters, setFilters] = useState({
    continents: [], // continents 필터
    price: [] // price 필터
  });

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit
    }

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts', variables)
      .then(response => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.products]);
          } else {
            setProducts(response.data.products)
          }
          setPostSize(response.data.postSize); // 8개 이상이 남아있을 경우만 LoadMore 버튼 생성

        } else {
          alert('Failed to fetch product datas')
        }
      })
  }

  const renderCards = Products.map((product, index) => (
    <Col lg={6} md={8} xs={24} key={index}>
      <Card
        hoverable={true}
        cover={<ImageSlider images={product.images} />}
      >
        <Meta
          title={product.title}
          description={`$${product.price}`}
        />
      </Card>
    </Col>
  ));

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }

    getProducts(variables);
    setSkip(skip);

  }

  const showFilteredResults = (filters) => {

    const variables = {
      skip: 0, // refresh를 위해서 처음부터 가져옴.
      limit: Limit,
      filters: filters
    }

    getProducts(variables);
    setSkip(0);
  }

  const handleFilters = (filters, category) => { // 필터는 선택된 항목들  &  카테고리는 '가격필터'인지 '국가필터'인지

    console.log(filters)
    const newFilters = { ...Filters }

    newFilters[category] = filters

    if (category == "price") {

    }

    showFilteredResults(newFilters); // 필터적용
    setFilters(newFilters); // 필터 업데이트

  }

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere <RocketOutlined /></h2>
      </div>

      {/* Filter */}

      <CheckBox handleFilters={(filters) => handleFilters(filters, "continents")} />  {/* 국가필터 설정 */}

      {/* Search */}

      {Products.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
          <h2>No Post yet ...</h2>
        </div>
        :
        <div>
          <Row gutter={[16, 16]}>
            {renderCards}
          </Row>

          {PostSize >= Limit && // 8개 이상이 남아있을 경우만 LoadMore 버튼 생성
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={onLoadMore}>Load More</Button>
            </div>
          }

        </div>
      }
    </div>
  )
}

export default LandingPage;
