import * as React from 'jsx-dom';

export interface TypeHeadingProps {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  text: string;
}

export const TypeHeading = ({
  tag = 'h1',
  text = 'The quick brown fox jumps over the lazy dog'
}: TypeHeadingProps) => {
  return React.createElement(tag, {}, text);
};
