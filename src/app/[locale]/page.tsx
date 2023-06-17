"use client";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { OpenAIClient } from "@/clients/openai";
import { CoinCanvas, State as CoinCanvasState } from "@/components/CoinCanvas";
import Hexagram from "@/components/Hexagram";
import { Input } from "@/components/Input";
import { TurtleShell } from "@/components/TurtleShell";
import {
  animationStarted,
  askQuestion,
  preloaded,
  restart,
} from "@/redux/appReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { loadImage, randRange } from "@/utils";
import { Hint } from "@/components/Hint";
import { MAX_INPUT_LENGTH, loadingText } from "@/constants";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { device } from "@/devices";

export default function Home() {
  const dispatch = useAppDispatch();
  const t = useTranslations("Home");
  const locale = useLocale();

  const [paused, setPaused] = useState(false);
  const [question, setQuestion] = useState("");
  const [coinCanvas, setCoinCanvas] = useState<CoinCanvas | null>(null);
  const [hint, setHint] = useState(t("hints.default"));

  const canvasRef = React.createRef<HTMLCanvasElement>();
  const inputRef = useRef<HTMLInputElement>(null); // uncontrolled input, stop re-render children

  const app = useAppSelector((state: RootState) => state.app);

  // todo:
  // fade in result
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (app.rounds.length >= 6) {
      setPaused(true);
      coinCanvas?.stopAnimation();
      dispatch(askQuestion(question, locale));
    } else if (app.rounds.length > 0) {
      const result = [...(app.rounds[0].coinTossResult as number[])];
      const key = result.sort().join("");
      setHint(t(`round.${app.rounds.length}`));
      timeoutId = setTimeout(() => setHint(t(`coinTossResult.${key}`)), 1500);
    } else {
      // length 0
      setHint(t("hints.default"));
    }

    return () => clearTimeout(timeoutId);
  }, [app.rounds.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined = undefined;
    if (app.loading) {
      setHint(loadingText[locale][0]);
      intervalId = setInterval(() => {
        setHint(
          loadingText[locale][randRange(0, loadingText[locale].length - 1)]
        );
      }, 5000);
    } else {
      if (app.divinationResult) setHint(question);
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [app.loading]);

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
    if (value.length >= MAX_INPUT_LENGTH) {
      setHint(t("hints.inputLengthError"));
      setPaused(true);
      return;
    }

    if (paused) setPaused(false);

    if (!value.length) {
      setHint(t("hints.default"));
      return;
    }

    setHint(t("hints.typing"));
    setQuestion(value);
  };

  const restartDivination = () => {
    setQuestion("");
    setPaused(false);
    dispatch(restart());
  };

  return (
    <PageContainer>
      <TitleContainer>
        <ImageContainer>
          <Image src="/zhou.png" alt="zhou" fill />
        </ImageContainer>
        <ImageContainer>
          <Image src="/yi.png" alt="yi" fill />
        </ImageContainer>
      </TitleContainer>
      <LocaleSwitcher />
      <MainContainer>
        {!app.loading && !app.divinationResult ? (
          <DivinationBoard>
            <canvas id="coin-canvas" ref={canvasRef}></canvas>

            <TurtleShell
              tossCoins={() => {
                coinCanvas?.startToss();
                dispatch(animationStarted());
              }}
              paused={paused || app.animating}
              onMouseEnter={() => {
                if (!paused && !app.animating) setHint(t("hints.hover"));
              }}
              onMouseLeave={() => {
                if (!paused && !app.animating) setHint(t("hints.default"));
              }}
            />
          </DivinationBoard>
        ) : null}
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

        <Hint hint={hint} />
        <InputContainer>
          {!app.loading && !app.divinationResult ? (
            <Input onChange={(e) => updateQuestion(e)} reff={inputRef} />
          ) : null}
        </InputContainer>

        {app.divinationResult ? (
          <>
            <Result>{app.divinationResult}</Result>
            <Button onClick={() => restartDivination()}>{t("restart")}</Button>
          </>
        ) : null}
        {app.loading && !app.divinationResult ? (
          <LoadingContainer>
            <Image src="/loading.gif" alt="loading" fill />
          </LoadingContainer>
        ) : null}
      </MainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
   {
    :lang(en) {
      font-family: jimNightshadeRegular;
      font-size: calc(25px + 0.7vw);
    }

    :lang(ch) {
      font-family: guFengLiShu;
      font-size: calc(30px + 0.7vw);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 55px;
  height: 105px;
`;

const LoadingContainer = styled.div`
  position: relative;
  width: 256px;
  height: 256px;

  @media ${device.mobile} {
    width: 128px;
    height: 128px;
  }
`;

const TitleContainer = styled.div`
  position: absolute;
  width: 75px;
  height: 250px;
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
  background: url("/border.png");
  background-size: 100% 100%;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    justify-content: flex-start;

    :lang(en) {
      font-size: calc(15px + 0.7vw);
    }

    :lang(ch) {
      font-size: calc(20px + 0.7vw);
    }
  }
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
  width: 50%;
  text-align: center;

  @media ${device.mobile} {
    width: 100%;
  }

  @media ${device.tablet} {
    width: 100%;
  }
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

  @media ${device.mobile} {
    position: static;
    margin: 40% 0 0 0;
  }

  @media ${device.tablet} {
    position: static;
    margin: 40% 0 0 0;
  }
`;

const Result = styled.div`
  position: relative;
  max-height: 400px;
  overflow: scroll;
  background: url("/stain.png");
  background-size: 100% 100%;
  width: 50%;
  z-index: 99;

  @media ${device.mobile} {
    padding: 0 10px;
    width: 100%;
  }
`;

const Button = styled.div`
  margin: 20px;
  padding: 5px 20px;
  border: none;
  background: none;
  filter: invert(9%) sepia(58%) saturate(5515%) hue-rotate(5deg) brightness(91%)
    contrast(106%);

  &:hover {
    cursor: pointer;
  }

  background: url("/border-horizontal.png");
  background-size: 100% 100%;
`;
