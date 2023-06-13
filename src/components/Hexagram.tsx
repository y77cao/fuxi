import Image from "next/image";
import { randRange } from "@/utils";
import styled from "styled-components";
import { memo } from "react";
import { getHexagramName } from "@/utils/iching";
import { useLocale, useTranslations } from "next-intl";

const Yao = ({ result }: { result: number }) => {
  const strokeNumber = randRange(1, 3);
  const src = `/brush-stroke-${strokeNumber}.svg`;
  if (result === -1) {
    return (
      <YaoContainer>
        <Image
          src={src}
          alt="yao"
          width={200}
          height={30}
          style={{ visibility: "hidden" }}
        />
      </YaoContainer>
    );
  } else if (result === 0) {
    return (
      <YaoContainer className="fadeIn">
        <Image src={src} alt="yao" width={100} height={30} />
        <Image src={src} alt="yao" width={100} height={30} />
      </YaoContainer>
    );
  } else {
    // result === 1
    return (
      <YaoContainer className="fadeIn">
        <Image src={src} alt="yao" width={200} height={30} />
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
      {items.map((result, i) => (
        <Yao key={i} result={result} />
      ))}
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
  justify-content: space-between;
`;

const YaoContainer = styled.div``;
