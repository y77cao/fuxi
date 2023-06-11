"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { OpenAIClient } from "@/clients/openai";
import { CoinCanvas, State as CoinCanvasState } from "@/components/CoinCanvas";
import Hexagram from "@/components/Hexagram";
import { Input } from "@/components/Input";
import { TurtleShell } from "@/components/TurtleShell";
import { askQuestion, preloaded } from "@/redux/appReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { loadImage } from "@/utils";
import { MAX_INTPUT_LENGTH, hints } from "@/constants";
import { Hint } from "@/components/Hint";

export default function Home() {
  const dispatch = useAppDispatch();
  const [paused, setPaused] = useState(false);
  const [question, setQuestion] = useState("");
  const [coinCanvas, setCoinCanvas] = useState<CoinCanvas | null>(null);
  const [hint, setHint] = useState(hints.DEFAULT);

  const canvasRef = React.createRef<HTMLCanvasElement>();
  const inputRef = useRef(); // uncontrolled input, stop re-render children

  const app = useAppSelector((state: RootState) => state.app);

  useEffect(() => {
    if (app.rounds.length >= 6) {
      setPaused(true);
      coinCanvas?.stopAnimation();
      dispatch(askQuestion(question));
    } else if (app.rounds.length > 0) {
      setHint(hints.ROUND_END(app.rounds.length));
      setTimeout(() => setHint(hints.KEEP_GOING), 1500);
    }
  }, [app.rounds.length]);

  useEffect(() => {
    const preload = async () => {
      const coinFront = `/coin-front.png`;
      const coinBack = `/coin-back.png`;
      const coinImageFront = await loadImage(coinFront);
      const coinImageBack = await loadImage(coinBack);

      const openAIClient = new OpenAIClient();

      dispatch(
        preloaded({
          animationAssets: [
            { name: "coinFront", image: coinImageFront },
            { name: "coinBack", image: coinImageBack },
          ],
          openAIClient,
        })
      );

      const canvas = canvasRef.current as HTMLCanvasElement;
      const coinCanvas = new CoinCanvas(canvas);
      setCoinCanvas(coinCanvas);
    };
    preload();
  }, []);

  const updateQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= MAX_INTPUT_LENGTH) {
      setHint(hints.INPUT_LENGTH_ERROR);
      return;
    }

    if (!value.length) {
      setHint(hints.DEFAULT);
      return;
    }

    setHint(hints.TYPING);
    setQuestion(value);
  };

  return (
    <main>
      <TitleContainer>
        <Image src="/zhou.png" alt="zhou" width={100} height={140} />
        <Image src="/yi.png" alt="yi" width={100} height={140} />
      </TitleContainer>
      <MainContainer>
        <DivinationBoard>
          <canvas id="coin-canvas" ref={canvasRef}></canvas>
          <TurtleShell
            tossCoins={() => coinCanvas?.startToss()}
            paused={paused}
            onMouseEnter={() => setHint(hints.HOVER)}
            onMouseLeave={() => setHint(hints.DEFAULT)}
          />
        </DivinationBoard>

        <InputContainer>
          <Hint hint={hint} />
          <Input onChange={(e) => updateQuestion(e)} ref={inputRef} />
          <Result>{app.divinationResult}</Result>
        </InputContainer>
        <HexagramContainer>
          <Hexagram
            isCurrent={true}
            results={app.rounds.map((r) => r.iChingResult.current)}
          />
          <Hexagram
            isCurrent={false}
            results={app.rounds.map((r) => r.iChingResult.future)}
          />
        </HexagramContainer>
      </MainContainer>
    </main>
  );
}

const TitleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: invert(9%) sepia(58%) saturate(5515%) hue-rotate(5deg) brightness(91%)
    contrast(106%);
  opacity: 0.9;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivinationBoard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  font-size: 1.4rem;
  width: 50%;
  text-align: center;
`;

const HexagramContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

const Result = styled.div`
  font-size: 0.5rem;
  max-height: 500px;
  overflow: scroll;
`;
