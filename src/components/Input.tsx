import { ChangeEvent } from "react";
import styled from "styled-components";

export const Input = ({
  onChange,
  ref,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ref: unknown;
}) => {
  return (
    <InputContainer>
      <input
        style={{ zIndex: "999" }}
        type="text"
        onChange={(e) => onChange(e)}
        autoFocus
        ref={ref}
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
    padding: 0 20px;
    text-align: center;
    font-size: calc(25px + 0.5vw);
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
