"use client";

import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

export const TurtleShell = ({
  tossCoins,
  paused,
}: {
  tossCoins: () => void;
  paused: boolean;
}) => {
  const [shaking, setShaking] = useState(false);

  const toss = () => {
    setShaking(false);

    if (paused) return;
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
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;
  height: 130px;
`;
