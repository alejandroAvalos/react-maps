import styled from "styled-components";
import { rotate } from "./KeyFrames";

export const NavContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

export const NavLink = styled.li`
  float: left;
`;

export const DropDownBtn = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropDownLink = styled(NavLink)`
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
  &:hover ${DropDownContent} {
    display: block;
  }
`;

export const Link = styled.a`
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;

export const SubLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    cursor: pointer;
  }
`;

export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export const Container = styled.section`
  display: grid;
  grid-auto-rows: 10px;
  grid-auto-rows: 2cm;
  grid-auto-rows: 5vmax;
  grid-auto-rows: inherit;
  grid-auto-rows: initial;
  grid-auto-rows: unset;
  padding-bottom: 10px;
`;
