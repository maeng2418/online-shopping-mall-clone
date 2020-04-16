import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const continents = [
    {
        "_id" : 1,
        "name" : "Africa"
    },
    {
        "_id" : 2,
        "name" : "Europe"
    },
    {
        "_id" : 3,
        "name" : "Asia"
    },
    {
        "_id" : 4,
        "name" : "North America"
    },
    {
        "_id" : 5,
        "name" : "South America"
    },
    {
        "_id" : 6,
        "name" : "Australia"
    },
    {
        "_id" : 7,
        "name" : "Antarctica"
    },
];

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
            {continents.map((value, index) => (
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
