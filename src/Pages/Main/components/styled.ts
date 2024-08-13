import styled from "styled-components";

export const MainSection = styled.section`
  overflow: hidden;
  .observer {
    position: absolute;
    bottom: 300px;
  }
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: ${(props) => props.theme.contentWrapperWidth};
    position: relative;
    h3 {
      font-weight: 700;
      font-size: 26px;
      margin-bottom: 20px;
    }
  }
`;
