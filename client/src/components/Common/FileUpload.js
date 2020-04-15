import React, { useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Axios from 'axios';

const FileUpload = (props) => {

    const [Images, setImages] = useState([]);

    const onDrop = (info) => {
        if (info.file.status === 'done') {

            let formData = new FormData();

            // 파일 전송시 오류 안나게 헤더 추가
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }

            formData.append("file", info.file.originFileObj);

            Axios.post('/api/product/uploadImage', formData, config)
                .then(response => {

                    if (response.data.success) {
                        setImages([...Images, response.data.filePath])
                        props.refreshFunction([...Images, response.data.filePath])
                    } else {
                        alert("Failed to save the Image in Server")
                    }

                })
        }
    }

    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images];
        newImages.splice(currentIndex, 1);

        setImages(newImages);
        props.refreshFunction(newImages);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <Upload.Dragger
                name="files"
                onChange={onDrop}
                action="/api/product/uploadImage"
                multiple={true}
                showUploadList={false}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'auto' }}>
            {
                Images.map((image, index) => (
                    <div key={index} onClick={() => onDelete(image)}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}} src={`/${image}`} alt={`peoductImg-${index}`} />
                    </div>
                ))
            }
            </div>

        </div>
    );
}

export default FileUpload;
