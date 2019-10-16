import React from 'react';

import {
  TopBar,
  TextFieldHeader
} from '../../components';

import { 
  ReactComponent as Code 
} from '../../assets/code-solid.svg'; 

function Header({
  searchOptions = [],
  optionAction = () => {}
}) {

  return (
    <>
      <TopBar>
        <Code 
          width={25} 
          height={25} 
          fill='#fff' 
        />
        <TextFieldHeader
          placeholder="Search here ..."
          list={searchOptions}
          onClickItem={optionAction}
        />
      </TopBar>
    </>
  );
}


export default Header;