import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
  flex-direction: ${props => props.flexDirection || 'column'};
  margin-top: ${props => props.marginTop || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;

`;  

export default Container;

