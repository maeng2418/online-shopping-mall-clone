import React, { useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import FileUpload from 'components/Common/FileUpload';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Continents = [
  {key:1, value: "Africa"},
  {key:2, value: "Europe"},
  {key:3, value: "Asia"},
  {key:4, value: "North America"},
  {key:5, value: "South America"},
  {key:6, value: "Australia"},
  {key:7, value: "Antarctica"}
];

const UploadProductPage = (props) => {

  const [Images, setImages] = useState([]);
  const user = useSelector(state => state.user);

  const onSubmit = (body) => {

    if (!body.title || !body.price || !Images || !body.continents) {
      return alert('fill all the fileds first!');
    }
    
    const variables = {
      writer: user.userData._id,
      title: body.title,
      price: body.price,
      image: Images,
      continents: body.continents
    }

    Axios.post('/api/product/uploadProduct', variables)
    .then(response => {
      if (response.data.success) {
        alert('Product Successfully Uploaded');
        props.history.push('/');
      } else {
        alert("Failed to upload Product");
      }
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin:'2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Upload Travel Product</h2>
      </div>

      <Form onFinish={onSubmit} hideRequiredMark labelCol={{span:24}}>

        {/* DropZone */}
        <FileUpload refreshFunction={(newImages) => setImages(newImages)}/>

        <Form.Item name="title" required label="Title" hasFeedback>
          <Input
            id="title"
            placeholder="Enter Title"
            type="text"
          />
        </Form.Item>

        <Form.Item name="description" required label="Description" labelAlign="left" hasFeedback>
          <Input.TextArea/>
        </Form.Item>

        <Form.Item name="price" required label="Price($)" labelAlign="left" hasFeedback>
          <Input
            id="price"
            placeholder="Enter Price"
            type="number"
          />
        </Form.Item>

        <Form.Item name="continent" required label="Continent" labelAlign="left" hasFeedback>
          <Select>
            {Continents.map(item=>
              <Select.Option key={item.key} value={item.value}>{item.value}</Select.Option>
            )}
          </Select>
        </Form.Item>

        <Button 
          style={{ minWidth: '100%' }} type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(UploadProductPage);
