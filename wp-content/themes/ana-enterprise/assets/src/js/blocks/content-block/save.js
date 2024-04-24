/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { useBlockProps } from "@wordpress/block-editor";
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
      bgColor,
      textAlignment,
      title,
      titleColor,
      titleVisiblity,
      subTitle,
      subTitleVisiblity,
      description,
      descriptionVisiblity,
      subTitleColor,
      descriptionColor,
    } = attributes;

    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyle = {
      color: titleColor,
    };
    const subTitleStyle = {
      color: subTitleColor,
    };
    const descriptionStyle = {
      color: descriptionColor,
    };

    return (
      <>
        <div {...useBlockProps.save()} style={sectionBgStyle}>
          <div className="content-block-container">
            <div className="content-block-inner" style={alignStyle}>
              {titleVisiblity && title &&(
                <RichText.Content
                  tagName="h2"
                  className="content-title-text"
                  value={title}
                  style={titleStyle}
                />
              )}
              {subTitleVisiblity && subTitle &&(
                <RichText.Content
                  tagName="h5"
                  className="content-subtitle-text"
                  value={subTitle}
                  style={subTitleStyle}
                />
              )}
              {descriptionVisiblity && description &&(
                <RichText.Content
                  tagName="p"
                  className="content-description-text"
                  value={description}
                  style={descriptionStyle}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
