"use client";

import { OpenAIClient } from "@/clients/openai";
import { CoinCanvas, State as CoinCanvasState } from "@/components/CoinCanvas";
import { Hexagram } from "@/components/Hexagram";
import { TurtleShell } from "@/components/TurtleShell";
import { askQuestion, preloaded } from "@/redux/appReducer";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { loadImage } from "@/utils";
import React, { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const [paused, setPaused] = useState(false);
  const [question, setQuestion] = useState("");
  const [coinCanvas, setCoinCanvas] = useState<CoinCanvas | null>(null);
  const canvasRef = React.createRef<HTMLCanvasElement>();

  const app = useAppSelector((state: RootState) => state.app);

  useEffect(() => {
    if (app.rounds.length >= 6) {
      setPaused(true);
      coinCanvas?.stopAnimation();
      dispatch(askQuestion(question));
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

  return (
    <main>
      <canvas
        id="coin-canvas"
        width="1200"
        height="600"
        ref={canvasRef}
      ></canvas>
      <div>
        What would you like to know about?
        <input type="text" onChange={(e) => setQuestion(e.target.value)} />
        <div>{app.divinationResult}</div>
      </div>
      <Hexagram results={app.rounds.map((r) => r.iChingResult.current)} />
      <Hexagram results={app.rounds.map((r) => r.iChingResult.future)} />
      <TurtleShell tossCoins={() => coinCanvas?.startToss()} paused={paused} />
    </main>
  );
}
