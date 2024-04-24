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
      textAlignmentLeft,
      textAlignmentRight,
      bgColor,
      titleLeft,
      titleColorLeft,
      titleVisiblityLeft,
      descriptionLeft,
      descriptionColorLeft,
      descriptionVisiblityLeft,
      btnVisiblityLeft,
      btnTextLeft,
      listItemsLeft,
      titleRight,
      titleColorRight,
      titleVisiblityRight,
      descriptionRight,
      descriptionColorRight,
      descriptionVisiblityRight,
      btnVisiblityRight,
      btnTextRight,
      listItemsRight,
      listVisiblityLeft,
      listVisiblityRight,
    } = attributes;

    const alignStyleLeft = {};
    textAlignmentLeft && (alignStyleLeft.textAlign = textAlignmentLeft);
    const alignStyleRight = {};
    textAlignmentRight && (alignStyleRight.textAlign = textAlignmentRight);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyleLeft = {
      color: titleColorLeft,
    };
    const titleStyleRight = {
      color: titleColorRight,
    };

    const descriptionStyleLeft = {
      color: descriptionColorLeft,
    };
    const descriptionStyleRight = {
      color: descriptionColorRight,
    };
    return (
      <>
        <div className={`storyful-social`}>
          <div className="social-container" style={sectionBgStyle}>
            <div className="social-left" style={alignStyleLeft}>
              {titleVisiblityLeft && (
                <div className="main-title" style={titleStyleLeft}>
                  <RichText.Content
                    tagName="h1"
                    value={titleLeft}
                    className="title-text"
                  />
                </div>
              )}
              {descriptionVisiblityLeft && descriptionLeft &&(
                <RichText.Content
                  tagName="p"
                  value={descriptionLeft}
                  className="description-text"
                  style={descriptionStyleLeft}
                />
              )}
              {btnVisiblityLeft && btnTextLeft &&(
                <div className="btn btn-arrow">
                  <RichText.Content
                    tagName="p"
                    className={"btn-main btn-primary"}
                    value={btnTextLeft}
                  />
                </div>
              )}
              {listVisiblityLeft && (
                <div className="social-listings">
                  {0 < listItemsLeft.length && (
                    <div className="social-listings-inner">
                      {listItemsLeft.map((data, index) => {
                        return (
                          <ul data-key={index} className="listing-items">
                            {data.listLeft && (
                              <RichText.Content
                                tagName="li"
                                className="social-listing-item"
                                value={data.listLeft}
                              />
                            )}
                          </ul>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="social-right" style={alignStyleRight}>
              {titleVisiblityRight && titleRight && (
                <div className="main-title" style={titleStyleRight}>
                  <RichText.Content
                    tagName="h1"
                    value={titleRight}
                    className="title-text"
                  />
                </div>
              )}
              {descriptionVisiblityRight && descriptionRight &&(
                <RichText.Content
                  tagName="p"
                  value={descriptionRight}
                  className="description-text"
                  style={descriptionStyleRight}
                />
              )}
              {btnVisiblityRight && btnTextRight &&(
                <div className="btn btn-arrow">
                  <RichText.Content
                    tagName="p"
                    className={"btn-main btn-primary"}
                    value={btnTextRight}
                  />
                </div>
              )}
              {listVisiblityRight && (
                <div className="social-listings">
                  {0 < listItemsRight.length && (
                    <div className="social-listings-inner">
                      {listItemsRight.map((data, index) => {
                        return (
                          <ul data-key={index} className="listing-items">
                            {data.listRight && (
                              <RichText.Content
                                tagName="li"
                                className="social-listing-item"
                                value={data.listRight}
                              />
                            )}
                          </ul>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
