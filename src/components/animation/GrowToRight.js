import { keyframes } from 'styled-components';

const growToRight = (init,final) => keyframes`
  from {
    width: ${init}px;
  }
  to {
    width: ${final}px;
  }
`;

export default growToRight;
