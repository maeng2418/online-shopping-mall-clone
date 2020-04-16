import React, { useState } from 'react';
import { Radio, Collapse } from 'antd';

const RadioBox = (props) => {

    const [Value, setValue] = useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleFilters(event.target.value);
    };

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Collapse.Panel header="Price" key="1">
                        <Radio.Group onChange={handleChange} value buttonStyle="solid">
                            {props.list.map((value) => (
                                <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
                            ))}
                        </Radio.Group>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
}

export default RadioBox;
