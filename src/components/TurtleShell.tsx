import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ASSET_RESIZE_HEIGHT } from "@/constants";

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

  // @ts-ignore event type
  const onClick = () => {
    // e.preventDefault();
    setShaking(true);
    setPrevClickTs(Date.now());
  };
  const toss = () => {
    // e.preventDefault();
    setShaking(false);
    if (Date.now() - prevClickTs < 500) return; // debounce

    if (paused) return;
    tossCoins();
  };

  return (
    <Container
      onMouseDown={onClick}
      onTouchStart={onClick}
      onTouchEnd={toss}
      onMouseUp={toss}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <ImgContainer className={shaking ? "shaking" : ""}></ImgContainer>
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
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
  -webkit-touch-callout: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  touch-action: none !important;

  &:hover {
    animation: shake 0.5s;
    animation-iteration-count: 1;
  }

  @media (max-height: ${ASSET_RESIZE_HEIGHT}px) {
    width: 160px;
    height: 210px;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;

  background: url("/turtle-shell.png") no-repeat;
  background-size: 100% 100%;s
`;
