import * as React from 'jsx-dom';
import './home-page-hero.scss'
import { Button } from '../../elements/button/button';
import { ButtonGroup } from '../../elements/button-group/button-group';
import ImageArgs from '../../types/image-args';

export interface HomePageHeroArgs {
  title: string;
  description: string;
  background: ImageArgs;
}

export const HomePageHero = ({
  title,
  description: blurb,
  background
}: HomePageHeroArgs) => {
  return (
    <div class='home-page-hero'>
      <div class='home-page-hero__background'>
        <picture>
          <img class='home-page-hero__background-image' src={background.url} alt={background.alt}/>
        </picture>
      </div>
      <div class='home-page-hero__container bimco-container'>
        <div class='home-page-hero__row row'>
          <div class='col-md-10 col-lg-7'>
            <h1 class='home-page-hero__title'>{title}</h1>
          </div>
          <div class='col-md-10 col-lg-4 offset-lg-1'>
            <div class='home-page-hero__description rich-text'>
              {blurb}
            </div>
            <ButtonGroup>
              <Button type="secondary" label='Explore Resources'></Button>
              <Button type="link" label='Join Bimco'></Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
