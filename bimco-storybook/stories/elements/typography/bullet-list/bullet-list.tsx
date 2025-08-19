import * as React from "jsx-dom";

export interface BulletListProps {
  bulletPoints: string[]
}

export const BulletList = ({
  bulletPoints = [
    "bullet1",
    "bullet2",
    "bullet3"
  ]
}: BulletListProps) => {
  return (
    <ul>
      {bulletPoints.map((bulletPoint, index) => (
        <li key={index}>
          {bulletPoint}
        </li>
      ))}
    </ul>
  )
}