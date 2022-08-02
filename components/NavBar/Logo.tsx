import React from "react";

type InputProps = {
  fontSize?: string;
};

export default function Logo({ fontSize = "text-xl" }: InputProps) {
  return <h1 className={`font-bold ${fontSize}`}>LAZY CLUB</h1>;
}
