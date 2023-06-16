"use client";

import Image from "next/image";
import { randRange } from "@/utils";
import styled from "styled-components";
import { memo } from "react";
import { getHexagramName } from "@/utils/iching";
import { useLocale, useTranslations } from "next-intl";
import { device } from "@/devices";

const Yao = ({ result }: { result: number }) => {
  const strokeNumber = randRange(1, 3);
  const src = `/brush-stroke-${strokeNumber}.svg`;
  if (result === -1) {
    return (
      <YaoContainer>
        <ImageContainer>
          <Image src={src} alt="yao" fill style={{ visibility: "hidden" }} />
        </ImageContainer>
      </YaoContainer>
    );
  } else if (result === 0) {
    return (
      <YaoContainer className="fadeIn">
        <ImageContainer>
          <Image src={src} alt="yao" fill half />
        </ImageContainer>
        <ImageContainer>
          <Image src={src} alt="yao" fill half />
        </ImageContainer>
      </YaoContainer>
    );
  } else {
    // result === 1
    return (
      <YaoContainer className="fadeIn">
        <ImageContainer>
          <Image src={src} alt="yao" fill />
        </ImageContainer>
      </YaoContainer>
    );
  }
};

const Hexagram = ({
  results,
  isCurrent,
}: {
  results: (0 | 1)[];
  isCurrent: boolean;
}) => {
  const t = useTranslations("Hexagram");
  const locale = useLocale();
  // starting bottom to top
  const remaining = 6 - results.length;
  const items = [...Array(remaining).fill(-1), ...results];
  return (
    <Container>
      <HexagramContainer>
        {items.map((result, i) => (
          <Yao key={i} result={result} />
        ))}
      </HexagramContainer>

      {results.length ? (
        <div>{isCurrent ? t("currentHexagram") : t("futureHexagram")}</div>
      ) : null}
      {results.length === 6 ? (
        <div>({getHexagramName(results, locale)})</div>
      ) : null}
    </Container>
  );
};

export default memo(
  Hexagram,
  (prevProps, nextProps) =>
    prevProps.results.length === nextProps.results.length
);

const Container = styled.div`
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${device.mobile} {
    margin 10px 0;
  }
`;

const HexagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  height: 150px;

  @media ${device.mobile} {
    width: 120px;
    height: 120px;
  }
`;

const YaoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ImageContainer = styled.div<{ half: boolean }>`
  position: relative;
  width: ${(props) => (props.half ? "40%" : "100%")};
  height: 100%;
`;
