import * as React from "jsx-dom";
import ImageArgs from "../../types/image-args";
import { ThemeName } from "../../types/theme-name";
import { v4 as uuidV4 } from "uuid";

import "../parallax-bg-block/parallax-bg-block.scss";
import "./small-image-and-text.scss";

export interface SmallImageAndTextProps {
  image: ImageArgs;
  text: string;
  theme: ThemeName;
  backgroundImage?: ImageArgs;
  backgroundVideo?: ImageArgs;
}

export const SmallImageAndText = ({ 
  image, 
  text, 
  theme,
  backgroundImage,
  backgroundVideo
}: SmallImageAndTextProps) => {
  const classNames = ["small-image-and-text"];
  const themeClasses = theme && `theme-zone theme--${theme}`;

  classNames.push(themeClasses);

  let xData;
  let blockId;

  const hasBackgroundMedia = backgroundImage || backgroundVideo;
  if (hasBackgroundMedia) {
    classNames.push('parallax-bg-block');
    xData = 'parallaxBgBlock';
    blockId = uuidV4();
  }

  return (
    <div 
      class={classNames}
      x-load
      x-data={xData}
      data-scroll-trigger-block-id={blockId}>

      { hasBackgroundMedia &&
        <div class="parallax-bg-block__background" x-ref="parallaxBgBackground">
          { backgroundImage && 
            <picture>
              <img
                class="parallax-bg-block__background-media parallax-bg-block__background-media--image"
                src={backgroundImage.url}
                alt={backgroundImage.alt} />
            </picture>
          }
          { backgroundVideo &&
            <video
              class="parallax-bg-block__background-media"
              aria-hidden="true"
              disablePictureInPicture
              disableRemotePlayback
              playsInline
              loop
              muted
              x-ref="parallaxBgVideo">
              <source src={backgroundVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
        </div>
      }
      { hasBackgroundMedia &&
        <div class="parallax-bg-block__content-backdrop" x-ref="parallaxBgContentBackdrop"></div>
      }

      <div class={`small-image-and-text__content ${hasBackgroundMedia ? 'parallax-bg-block__content' : ''}`} x-ref="parallaxBgContent">
        <div class="bimco-container bimco-container--inset-xxxl">
          <picture class="small-image-and-text__image-wrapper">
            <img class="small-image-and-text__image" src={image.url} alt={image.alt} />
          </picture>
          <p class="small-image-and-text__text">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}