import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const CheckBox = (props) => {

    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value); // 배열에 없을 시, -1 반환
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }
  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
          <Collapse.Panel header="Continents" key="1">
            {props.list.map((value, index) => (
                <React.Fragment key={index}>
                    <Checkbox
                        onChange={() => handleToggle(value._id)}
                        type="checkbox"
                        checked={Checked.indexOf(value._id) === -1 ? false : true}
                    />
                    <span>{value.name}</span>
                </React.Fragment>
            ))}
          </Collapse.Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
