import { RichText } from "@wordpress/block-editor";
import classnames from "classnames";

export default function Save(props) {
  const { attributes, className } = props;
  const {
    blockID,
    heading,
    listItems,
    headingColor,
    description,
    titleColor,
    descColor,
    textAlign,
    subHeadingColor,
    showTitle,
    showDesc,
    BgColor,
    bgImage,
    headingAlign,
  } = attributes;

  const classes = classnames(className, "conter-main");

  const newAlignment = {};
  textAlign && (newAlignment.textAlign = textAlign);

  const newHeadingAlignment = {};
  headingAlign && (newHeadingAlignment.textAlign = headingAlign);

  const headingStyle = {};
  headingColor && (headingStyle.color = headingColor);

  const subHeadingStyle = {};
  subHeadingColor && (subHeadingStyle.color = subHeadingColor);

  const titleStyle = {};
  titleColor && (titleStyle.color = titleColor);

  const descStyle = {};
  descColor && (descStyle.color = descColor);

  const BgStyle = {};
  BgColor && (BgStyle.background = BgColor);
  
  const sectionBgStyle = {};
  bgImage &&
    bgImage.url &&
    (sectionBgStyle.backgroundImage = `url(${bgImage.url})`);

  return (
    <div
      className={classes}
      id={blockID}
      style={{ ...BgStyle, ...sectionBgStyle }}
    >
      <div className="conter-main-inner conter-onelayout">
        <div className="conter-onelayout__inner-section">
            <div className="conter-onelayout__wrap" style={newAlignment}>
              {showTitle && heading && (
                <div className="conter-onelayout__title-section">
                  <RichText.Content
                    tagName="h2"
                    value={heading}
                    style={headingStyle}
                  />
                </div>
              )}
              {showDesc && description && (
                <div className="conter-onelayout__description-section">
                  <RichText.Content
                    tagName="p"
                    value={description}
                    style={subHeadingStyle}
                  />
                </div>
              )}
            </div>
          <div className="conter-onelayout__counter-section">
            {0 < listItems.length && (
              <div className={"conter-onelayout__counter-boxes"}>
                {listItems.map((data, index) => {
                  return (
                    <>
                      <div
                        data-key={index}
                        className={`conter-onelayout__counter-box`}
                      >
                        <div className="conter-onelayout__counter-content">
                          <div className="conter-onelayout__counter-title">
                            {data.sign1 && (
                              <RichText.Content
                                tagName="span"
                                value={data.sign1}
                                style={titleStyle}
                                className="counter_sign"
                              />
                            )}
                            {data.num && (
                              <RichText.Content
                                tagName="span"
                                value={data.num}
                                style={titleStyle}
                                className="counter_num start"
                              />
                            )}
                            {data.sign && (
                              <RichText.Content
                                tagName="span"
                                value={data.sign}
                                style={titleStyle}
                                className="counter_sign"
                              />
                            )}
                          </div>
                          {!data.sign1 &&
                            !data.num &&
                            !data.sign &&
                            data.description && (
                              <RichText.Content
                                tagName="p"
                                className="conter-onelayout__counter-description large-desc"
                                value={data.description}
                                style={descStyle}
                              />
                            )}
                          {(data.sign1 || data.num || data.sign) &&
                            data.description && (
                              <RichText.Content
                                tagName="p"
                                className="conter-onelayout__counter-description"
                                value={data.description}
                                style={descStyle}
                              />
                            )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
