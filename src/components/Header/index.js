import React, {
  useCallback
} from 'react';


import { 
  ReactComponent as Code 
} from '../../assets/code-solid.svg'; 

import { 
  AutoComplete, 
  Menu,
  Layout
} from 'antd';

const { Header } = Layout;

function HeaderBar({
  searchOptions = [],
  optionAction = () => {},
  homeAction = () => {}
}) {

  const handleFilterRepository = useCallback((input, option) => (
    option.props.children.toUpperCase().includes(input.toUpperCase())
  ), []);

  return (
    <Header style={{display: 'flex', alignItems: 'center'}}>
      <Code 
        width={28} 
        height={28}
        color="#fff"  
        onClick={homeAction}
        style={{cursor: "pointer"}}
      />
      <AutoComplete 
        style={{
          margin: "0 20px", 
          width: 200,
          backgroundColor: "#222"
        }}
        dataSource={searchOptions}
        placeholder="Search repository here ..."
        filterOption={handleFilterRepository}
        onSelect={optionAction}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{lineHeight: 64}}
      >
      </Menu>
    </Header>
  );
}


export default HeaderBar;