import * as React from "jsx-dom";
import "./text-block.scss";
import { ButtonGroup } from "../../elements/button-group/button-group";
import {
  Button,
  ButtonProps,
} from "../../elements/button/button";

interface ColumnProps {
  title?: string;
  content: string;
  buttons?: ButtonProps[];
}

export interface TextBlockComponentProps {
  headline?: string;
  eyebrow?: string;
  abstract?: string;
  headlineButtons?: ButtonProps[];
  columns?: ColumnProps[];
  asymmetrical?: boolean;
}

export const TextBlockComponent = ({
  headline,
  eyebrow,
  abstract,
  headlineButtons,
  columns,
  asymmetrical = false,
}: TextBlockComponentProps) => {
  const getHeadlineClass = (columnsLength?: number) => {
    const headlineClassBase = `text-block-component__header text-block-component__header`;
    switch (columnsLength) {
      case 1:
      case 2:
        return `${headlineClassBase} col-12 col-lg-6`;
      case 3:
      case 4:
        return `${headlineClassBase} col-12 col-lg-6 col-xl-5`;
    }
  };

  const getColumnClass = (columnsLength?: number, isAsymmetrical?: boolean, showHeadline?: boolean) => {
    const columnCountClass = `text-block-component__columns-section--${columnsLength}`;
    switch (columnsLength) {
      case 1:
        if (!showHeadline) {
          return columnCountClass + " col-12 col-md-10 offset-md-2";
        }
        else if (isAsymmetrical) {
          return columnCountClass + " asymmetrical col-12 col-lg-9 offset-lg-3";
        }
        return (
          columnCountClass + " col-12 col-md-10 offset-md-2 col-lg-6 offset-lg-0"
        );
      case 2:
        if (!showHeadline) {
          return columnCountClass + " col-12";
        }
        else if (isAsymmetrical) {
          return columnCountClass + " asymmetrical col-12 col-lg-9 offset-lg-3";
        }
        return (
          columnCountClass + " col-12 col-md-10 offset-md-2 col-lg-6 offset-lg-0"
        );
      case 3:
        if (isAsymmetrical && showHeadline) {
          return columnCountClass + " col-12 col-lg-9 offset-lg-3";
        }
        return columnCountClass + " col-12";
      case 4:
        return (
          columnCountClass +
          " col-12 col-md-10 offset-md-2 col-lg-12 offset-lg-0"
        );
    }
  };

  const showHeadline: boolean = (eyebrow != null && eyebrow != "") 
    || (headline != null && headline != "") 
    || (abstract != null && abstract != "");

  const headlineCountClass = getHeadlineClass(columns?.length);
  const columnCountClass = getColumnClass(columns?.length, asymmetrical, showHeadline);

  return (
    <div className="text-block-component">
      <div className="bimco-container text-block-component__container">
        <div className="text-block-component__row">

          { showHeadline && 
            <div className={headlineCountClass}>
              {eyebrow && (
                <span className="text-block-component__eyebrow">{eyebrow}</span>
              )}
              <h2 className="text-block-component__headline">{headline}</h2>
              <p className="text-block-component__abstract">{abstract}</p>

              {/* Headline Buttons (optional) */}
              {headlineButtons && headlineButtons.length > 0 && (
                <div className="text-block-component__buttons">
                  <ButtonGroup>
                    {headlineButtons.map((button, index) => (
                      <Button
                        key={index}
                        type={button.type}
                        label={button.label}
                      />
                    ))}
                  </ButtonGroup>
                </div>
              )}
            </div>
          }

          <div className={columnCountClass}>
            {columns?.map((column, index) => (
              <div key={index} className="text-block-component__column">
                {column.title && (
                  <h3 className="text-block-component__column-title">
                    {column.title}
                  </h3>
                )}
                <p className="text-block-component__column-content">
                  {column.content}
                </p>

                {/* Column Buttons (optional) */}
                {column.buttons && column.buttons.length > 0 && (
                  <div className="text-block-component__column-buttons">
                    <ButtonGroup>
                      {column.buttons.map((button, buttonIndex) => (
                        <Button
                          key={buttonIndex}
                          type={button.type}
                          label={button.label}
                        />
                      ))}
                    </ButtonGroup>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
