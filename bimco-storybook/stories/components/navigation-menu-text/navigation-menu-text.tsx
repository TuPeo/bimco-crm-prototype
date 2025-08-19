import * as React from 'jsx-dom';
import './navigation-menu-text.scss';
import '../text-box/text-box.scss';

export interface NavigationMenuTextBoxProps {
  text: string;
}

export const NavigationMenuTextBox = ({
  text
}: NavigationMenuTextBoxProps) => {
  return (
    <div class="navigation-menu-text">
      <div class="text-box">
        <div class="rich-text" innerHTML={text}></div>
      </div>
    </div>
  );
};
