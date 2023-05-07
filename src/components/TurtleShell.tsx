import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export const TurtleShell = ({ tossCoins }: { tossCoins: () => void }) => {
  const [shaking, setShaking] = useState(false);

  const toss = () => {
    setShaking(false);
    tossCoins();
  };

  return (
    <Container>
      <Image
        src="/turtle-shell.jpeg"
        alt="turtle shell"
        width={100}
        height={100}
        onMouseDown={() => setShaking(true)}
        onMouseUp={toss}
        className={shaking ? "shaking" : ""}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 100px;
`;
