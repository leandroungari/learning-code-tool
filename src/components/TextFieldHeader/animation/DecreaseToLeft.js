import { keyframes } from 'styled-components';

const decreaseToLeft = (init, final) => keyframes`
  from {
    width: ${init}px;
  }
  to {
    width: ${final}px;
  }
`;

export default decreaseToLeft;