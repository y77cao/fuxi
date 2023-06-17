import { ChangeEvent, MutableRefObject } from "react";
import styled from "styled-components";

import { device } from "@/devices";

export const Input = ({
  onChange,
  reff,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  reff: MutableRefObject<HTMLInputElement | null>;
}) => {
  return (
    <InputContainer>
      <input
        style={{ zIndex: "999" }}
        type="text"
        onChange={(e) => onChange(e)}
        autoFocus
        ref={reff}
      />
      <Stain />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 100%;
    border: none;
    position: relative;
    background: transparent;
    padding: 5px 20px;
    text-align: center;
    font-size: calc(30px + 0.5vw);
    :lang(en) {
      font-family: jimNightshadeRegular;
      font-size: calc(25px + 0.7vw);
    }

    :lang(ch) {
      font-family: guFengLiShu;
      font-size: calc(30px + 0.7vw);
    }

    @media ${device.mobile} {
      justify-content: flex-start;

      :lang(en) {
        font-size: calc(15px + 0.7vw);
      }

      :lang(ch) {
        font-size: calc(20px + 0.7vw);
      }
    }
  }

  input:focus {
    outline: none;
  }
`;

const Stain = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("/stain.png");
  background-size: 100% 100%;
  z-index: 0;
`;
