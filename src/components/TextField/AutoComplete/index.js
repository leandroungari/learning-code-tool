import React, {
  useState, 
  useEffect
} from 'react';
import styled from 'styled-components';

import { Container } from '../../../components';

const Box = styled(Container)`
  position: absolute;
  top: 30px;
  left: 0;
  background-color: #fff;
  border: 1px solid #dedede;
  z-index: 100;
  box-shadow: 0 0 8px #ccc;
`;

const ItemBox = styled.div`
  padding: 10px 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-bottom: 1px solid #dedede;
  &:last-child {
    border: 0;
  }
`;

function Item({
  children,
  onClick
}) {

  return (
    <ItemBox 
      onClick={() => onClick()}
    >
      {children}
    </ItemBox>
  );
}

function AutoComplete({
  width = 150,
  options = [],
  filter,
  maxResults = 7,
  optionsEvent
}) {

  const [results, setResults] = useState([]);
  
  useEffect(() => {
    
    if(filter.length === 0 ||
       options.includes(filter)
    ) {
      setResults([]);
    }
    else {
      const result = options
      .filter((item) => item.includes(filter))
      .filter((_,index) => index < maxResults);
      setResults(result);
    }

  }, [filter, maxResults, options]);

  return (
    results.length === 0 ?
    null :
    <Box
      padding="5px"
      {...{ width }}
    >
      {
        results
        .map((item, index) => (
          <Item 
            key={index}
            onClick={() => {
              optionsEvent(item);

            }}
          >
            {item}
          </Item>
        ))
      }
    </Box>
  );
}

export default AutoComplete;