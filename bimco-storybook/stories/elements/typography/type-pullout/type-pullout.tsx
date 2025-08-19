import * as React from 'jsx-dom';

export interface TypePulloutProps {
  text: string;
}

export const TypePullout = ({
  text = 'The quick brown fox jumps over the lazy dog',
}: TypePulloutProps) => {
  return (
    <p class='pull-out'>
      {text}
    </p>
  )
};
