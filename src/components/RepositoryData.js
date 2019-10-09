import React from 'react';

import styled from 'styled-components';
import Container from './Container';



const Title = styled.h1`
  font-size: 24px;
  color: #000;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
`;


export default function RepositoryData({
  name, numBranches = 0, numCommits = 0
}) {

  return (
    <Container
      marginTop={50}
      marginLeft={50}
      marginRight={50}
      marginBottom={20}
    >
      <Title>#{name}</Title>
      <Description>
        This repository has <strong>{numBranches}</strong> with a total of <strong>{numCommits}</strong> commits.
      </Description>
    </Container> 
  );
}
