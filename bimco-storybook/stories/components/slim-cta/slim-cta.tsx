import * as React from 'jsx-dom';
import './slim-cta.scss'
import { Button } from '../../elements/button/button';
import { ButtonGroup } from '../../elements/button-group/button-group';

interface SlimCtaArgs {
  text: string;
  theme: ['' | 'white' | 'light' | 'brand' | 'dark'];
}

export const SlimCta = ({
  text,
  theme
}: SlimCtaArgs) => {
  const themeClasses = theme && `theme-zone theme--${theme}`;

  return (
    <div class={`slim-cta ${themeClasses}`}>
      <div class="slim-cta__inner theme-inverse">
        <div class='bimco-container'>
          <div class='row'>
            <div class='offset-md-1 col-md-10'>
              <div class='slim-cta__content'>
                <div class='slim-cta__text' innerHTML={text}></div>
                <div class='slim-cta__links'>
                  <ButtonGroup>
                    <Button type="primary" label='Sign up'></Button>
                    <Button type="secondary" label='Learn more'></Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
