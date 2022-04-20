import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.div`
  text-align: left;
  div {
    span {
      color: var(--red);
    }
  }
`;

export const InputContainer = styled.div`
  background: var(--white);
  border-radius: 10px;
  border: 2px solid var(--grey);
  color: var(--grey);
  padding: 1rem;
  width: 100%;
  display: flex;
  transition: 0.4s;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--red);
      svg {
        color: var(--red);
      }
    `}

  input {
    background: transparent;
    align-items: center;
    flex: 1;
    border: 0;
    color: var(--black);
    &::placeholder {
      color: var(--grey);
    }
  }
  svg {
    margin-right: 16px;
  }
`;
