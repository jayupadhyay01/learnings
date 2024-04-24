/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
const { Component } = wp.element;
const { RichText } = wp.blockEditor;
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default class Save extends Component {
  render() {
    const { attributes } = this.props;
    const {
      textAlignment,
      title,
      titleColor,
      titleVisiblity,
      description,
      descriptionColor,
      descriptionVisiblity,
      Image,
      btnTextColor,
      btnVisiblity,
      btnText,
      listItems,
      boxTitleColor,
      boxDescColor,
      boxVisiblity,
      bgColor,
    } = attributes;

    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);
    
    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyle = {
      color: titleColor,
    };
    const descriptionStyle = {
      color: descriptionColor,
    };
    const btnStyle = {
      color: btnTextColor,
    };
    const boxTitleStyle = {
      color: boxTitleColor,
    };
    const boxDescStyle = {
      color: boxDescColor,
    };
    return (
      <>
        <div className={`storyful-newswire`} style={sectionBgStyle}>
          <div className="newswire-container">
            <div className="newswire-upper-section">
              <div className="newswire-upper-left" style={alignStyle}>
                {titleVisiblity && title &&(
                  <div className="main-title" style={titleStyle}>
                    <RichText.Content
                      tagName="h1"
                      value={title}
                      className="title-text"
                    />
                  </div>
                )}
                {descriptionVisiblity && description &&(
                  <RichText.Content
                    tagName="p"
                    value={description}
                    className="description-text"
                    style={descriptionStyle}
                  />
                )}
                {btnVisiblity && btnText &&(
                  <div className="btn btn-arrow">
                    <RichText.Content
                      tagName="p"
                      className={"btn-main btn-primary"}
                      value={btnText}
                      style={btnStyle}
                    />
                  </div>
                )}
              </div>
              <div className="newswire-upper-right">
                {Image.url != "" && (
                  <img
                    src={Image.url}
                    height={Image.height}
                    width={Image.width}
                    alt={Image.alt}
                  />
                )}
              </div>
            </div>
            {boxVisiblity && (
              <div className="newswire-lower-section">
                {0 < listItems.length && (
                  <div className="newswire-tab-section-main">
                    {listItems.map((data, index) => {
                      return (
                        <div data-key={index} className="newswire-tab-box">
                          {data.title && (
                            <div className="newswire-tab-title">
                              <RichText.Content
                                tagName="h3"
                                className="newswire-inner-title"
                                value={data.title}
                                style={boxTitleStyle}
                              />
                            </div>
                          )}
                          {data.description && (
                            <div className="newswire-tab-descriptions">
                              <RichText.Content
                                tagName="p"
                                className="newswire-inner-description"
                                value={data.description}
                                style={boxDescStyle}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
