import { ChangeEvent, MutableRefObject } from "react";
import styled from "styled-components";

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
