import React, {
  useState, useEffect
} from 'react';
import styled from 'styled-components';

import { Container } from '../../../components';

const Box = styled(Container)`
  position: absolute;
  top: 27px;
  left: 0;
`;

const Item = styled.div`
  padding: 4px 6px;
  font-size: 14px;
`;

function AutoComplete({
  width = 150,
  options = [],
  filter,
  maxResults = 7
}) {

  const [results, setResults] = useState([]);
  
  useEffect(() => {
    
    if(filter.length > 0) {
      const result = options
      .filter((item) => item.includes(filter))
      .filter((_,index) => index < maxResults);
      setResults(result);
    }
    else {
      setResults([]);
    }

  }, [filter, maxResults, options]);

  return (
    <Box
      {...{ width }}
    >
      {
        results
        .map((item, index) => (
          <Item key={index}>{item}</Item>
        ))
      }
    </Box>
  );
}

export default AutoComplete;