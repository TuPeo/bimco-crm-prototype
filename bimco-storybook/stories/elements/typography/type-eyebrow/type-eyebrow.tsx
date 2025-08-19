import * as React from 'jsx-dom';

export interface TypeEyebrowProps {
  text: string;
  style: 'regular' | 'small';
}

export const TypeEyebrow = ({
  text = 'The quick brown fox jumps over the lazy dog',
  style = 'regular',
}: TypeEyebrowProps) => {
  return (
    <p class={`eyebrow-${style}`}>
      {text}
    </p>
  )
};
