import { useEffect, useState } from "react";
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
`;
