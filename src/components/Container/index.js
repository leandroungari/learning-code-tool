import styled from 'styled-components';

const Container = styled.div`
  ${({position}) => position ? `position: ${position};` : ''}
  ${({active = true}) => active ? `display: flex;` : `display: none;`}
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
  flex-direction: ${props => props.flexDirection || 'column'};
  ${({width}) => width ? `width: ${width}px;` : ''}
  ${({height}) => height ? `height: ${height}px;` : ''}
  ${props => props.margin ? `margin: ${props.margin};` : ''}
  ${props => props.marginTop ? `margin-top: ${props.marginTop}px;` : ''}
  ${props => props.marginRight ? `margin-right: ${props.marginRight}px;` : ''}
  ${props => props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : ''}
  ${props => props.marginLeft ? `margin-left: ${props.marginLeft}px;` : ''}
  ${props => props.padding ? `padding: ${props.padding}` : ''};
  ${({backgroundColor}) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({cursor}) => cursor && `cursor: ${cursor};`}
  ${({opacity}) => opacity && `cursor: ${opacity};`}
  
`;  

export default Container;

