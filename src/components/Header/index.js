import React, {
  useCallback
} from 'react';

import { 
  ReactComponent as Code 
} from '../../assets/code-solid.svg'; 

import {
  useLocation
} from 'react-router-dom';

import { 
  AutoComplete, 
  Menu,
  Layout
} from 'antd';

import { 
  currentRepository
} from '../../action';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

const { Header } = Layout;


function HeaderBar() {

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFilterRepository = useCallback((input, option) => (
    option.props.children.toUpperCase().includes(input.toUpperCase())
  ), []);

  const repositories = useSelector(
    ({ repositories }) => repositories.listOfRepositories
  );

  return (
    <Header style={{display: 'flex', alignItems: 'center'}}>
      <Code 
        width={28} 
        height={28}
        color="#fff"  
        onClick={() => {
          history.push("/");
        }}
        style={{cursor: "pointer"}}
      />
      <AutoComplete 
        style={{
          margin: "0 20px", 
          width: 200,
          backgroundColor: "#222"
        }}
        dataSource={repositories}
        placeholder="Search repository here ..."
        filterOption={handleFilterRepository}
        onSelect={(value) => {
          dispatch(currentRepository(value));
          history.push(`/repository`);
        }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
      >
        {
          location.pathname !== '/' &&
          [
            <Menu.Item key="1">Plots</Menu.Item>,
            <Menu.Item key="2">Analysis</Menu.Item>
          ]
        }
      </Menu>
    </Header>
  );
}


export default HeaderBar;