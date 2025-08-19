import * as React from "jsx-dom";

export interface NumberedListProps {
  bulletPoints: string[]
}

export const NumberedList = ({
  bulletPoints = [
    "bullet1",
    "bullet2",
    "bullet3"
  ]
}: NumberedListProps) => {
  return (
    <ol>
      {bulletPoints.map((bulletPoint, index) => (
        <li key={index}>
          {bulletPoint}
        </li>
      ))}
    </ol>
  )
}