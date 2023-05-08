import Image from "next/image";
import { randRange } from "@/utils";

const Yao = ({ result }: { result: 0 | 1 }) => {
  const strokeNumber = randRange(1, 3);
  const src = `/brush-stroke-${strokeNumber}.svg`;
  if (result === 0) {
    return (
      <div>
        <Image src={src} alt="yao" width={50} height={20} />
        <Image src={src} alt="yao" width={50} height={20} />
      </div>
    );
  } else
    return (
      <div>
        <Image src={src} alt="yao" width={100} height={20} />
      </div>
    );
};

export const Hexagram = ({ results }: { results: (0 | 1)[] }) => {
  // starting bottom to top

  const sequences = results.reverse();
  return (
    <div>
      {sequences.map((result, i) => (
        <Yao key={i} result={result} />
      ))}
    </div>
  );
};
