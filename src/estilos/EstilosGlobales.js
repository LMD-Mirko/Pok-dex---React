import { createGlobalStyle } from 'styled-components';
import { tema } from './tema';

export const GlobalStyle = createGlobalStyle`
  @keyframes starFloat {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2000px);
    }
    100% {
      transform: translateY(-4000px);
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
    background: #000;
    color: ${tema.colores.texto};
    font-family: ${tema.fuentes.principal};
    overflow-x: hidden;
  }

  body {
    position: relative;

    &::before {
      content: '';
      position: fixed;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background-image:
        radial-gradient(1px 1px at 20px 30px, #fff 100%, transparent),
        radial-gradient(1px 1px at 40px 70px, #fff 100%, transparent),
        radial-gradient(1px 1px at 50px 160px, #fff 100%, transparent),
        radial-gradient(1px 1px at 90px 40px, #fff 100%, transparent),
        radial-gradient(1px 1px at 130px 80px, #fff 100%, transparent),
        radial-gradient(1px 1px at 160px 120px, #fff 100%, transparent);
      background-repeat: repeat;
      animation: starFloat 150s linear infinite;
      opacity: 0.3;
    }

    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at 50% 50%,
        rgba(111, 53, 252, 0.1),
        transparent 100%
      );
      pointer-events: none;
    }
  }

  #root {
    min-height: 100vh;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${tema.colores.primario}66;
    border-radius: 4px;

    &:hover {
      background: ${tema.colores.primario}99;
    }
  }
`;
