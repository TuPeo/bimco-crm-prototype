import * as React from 'jsx-dom';

export interface TypeBodyProps {
  text: string;
  style: 'regular' | 'large' | 'small' | 'tight';
}

export const TypeBody = ({
  text = 'The quick brown fox jumps over the lazy dog',
  style = 'regular',
}: TypeBodyProps) => {
  return (
    <p class={`body-text-${style}`}>
      {text}
    </p>
  )
};
