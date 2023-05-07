"use client";

import { OpenAIClient } from "@/clients/openai";
import { CoinCanvas, State as CoinCanvasState } from "@/components/CoinCanvas";
import { TurtleShell } from "@/components/TurtleShell";
import { preloaded } from "@/redux/appReducer";
import { loadImage } from "@/utils";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const [result, setResult] = useState([]);
  const [coinCanvas, setCoinCanvas] = useState<CoinCanvas | null>(null);

  const canvasRef = React.createRef<HTMLCanvasElement>();
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
      <TurtleShell tossCoins={() => coinCanvas?.startToss()} />
    </main>
  );
}
