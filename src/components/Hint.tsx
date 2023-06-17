import { device } from "@/devices";
import styled from "styled-components";

export const Hint = ({ hint }: { hint: string }) => {
  // somehow changing key will trigger fadeIn animation
  return (
    <Container className={"fadeIn"} key={hint}>
      {hint}
    </Container>
  );
};

const Container = styled.div`
  margin: 10px;
  z-index: 99;
  width: 50%;
  text-align: center;

  @media ${device.mobile} {
    margin: 20px 10px;
  }

  @media ${device.tablet} {
    margin: 20px 10px;
  }
`;
