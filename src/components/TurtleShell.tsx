import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { State as CoinCanvasState } from "./CoinCanvas";

export const TurtleShell = ({
  setCoinCanvasState,
}: {
  setCoinCanvasState: (state: CoinCanvasState) => void;
}) => {
  const [shaking, setShaking] = useState(false);

  const tossCoins = () => {
    setShaking(false);
    setCoinCanvasState(CoinCanvasState.THROW);
  };

  return (
    <Container>
      <Image
        src="/turtle-shell.jpeg"
        alt="turtle shell"
        width={100}
        height={100}
        onMouseDown={() => setShaking(true)}
        onMouseUp={tossCoins}
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
