import React, {useState} from 'react';
import { Input } from 'antd';

const SearchFeature = (props) => {

    const [SearchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Input.Search
        value={SearchTerm}
        onChange={(event) => { 
            setSearchTerm(event.target.value);
            props.refreshFunction(event.target.value);
        }}
        placeholder="Serach By Typing"
        />
    </div>
  );
}

export default SearchFeature;
