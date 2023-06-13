import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export const TurtleShell = ({
  tossCoins,
  onMouseEnter,
  onMouseLeave,
  paused,
}: {
  tossCoins: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  paused: boolean;
}) => {
  const [shaking, setShaking] = useState(false);
  const [prevClickTs, setPrevClickTs] = useState(0);

  const onClick = () => {
    setShaking(true);
    setPrevClickTs(Date.now());
  };
  const toss = () => {
    setShaking(false);
    if (Date.now() - prevClickTs < 500) return; // debounce

    if (paused) return;
    tossCoins();
  };

  return (
    <Container>
      <Image
        src="/turtle-shell.png"
        alt="turtle shell"
        width={320}
        height={420}
        onMouseDown={onClick}
        onMouseUp={toss}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={shaking ? "shaking" : ""}
      />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 320px;
  height: 420px;

  &:hover {
    animation: shake 0.5s;
    animation-iteration-count: 1;
  }
`;
