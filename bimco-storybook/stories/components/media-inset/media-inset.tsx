import * as React from "jsx-dom";
import "./media-inset.scss";
import ImageArgs from "../../types/image-args";

export interface ImageWithDescription {
  image: ImageArgs;
  description: string;
}

export interface MediaInsetProps {
  images: ImageWithDescription[];
  asymmetrical?: boolean;
  variant?: "left" | "right";
}

export const MediaInset = ({
  images,
  asymmetrical = false,
  variant = "left",
}: MediaInsetProps) => {
  const getImageClass = (imagesLength: number, isAsymmetrical?: boolean) => {
    const imageCountClass = `media-inset__images media-inset__images--${imagesLength}`;
    if (imagesLength === 2 && isAsymmetrical) {
      return `${imageCountClass}asymmetrical asymmetrical--${variant}`;
    } else if (imagesLength === 2) {
      return `${imageCountClass}`;
    }
    return `${imageCountClass}`;
  };

  const imageClass = getImageClass(images.length, asymmetrical);

  return (
    <div class={`media-inset`}>
      <div class="bimco-container media-inset__container">
        <div class={imageClass}>
          {images.map((item, index) => (
            <div key={index} class={`media-inset__image`}>
              <img src={item.image.url} alt={item.image.alt} />
              <p class="media-inset__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
