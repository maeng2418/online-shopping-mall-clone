import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { RocketOutlined } from '@ant-design/icons';
import { Button, Row, Col, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from 'components/Common/ImageSlider'

function LandingPage(props) {

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0); // flag 0 -> 8 -> 16
  const [Limit, setLimit] = useState(8); // 한번에 8개씩 가져옴.
  const [PostSize, setPostSize] = useState(0); // LoadMore 버튼을 위함.

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

          setProducts([...Products, ...response.data.products]);
          setPostSize(response.data.postSize);

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
      limit: Limit
    }

    getProducts(variables);
    setSkip(skip);

  }

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's Travel Anywhere <RocketOutlined /></h2>
      </div>

      {/* Filter */}

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
