/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
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
      content,
      name,
      titleVisiblity,
      titleColor,
      nameColor,
      contentColor,
    } = attributes;

    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyle = {
      color: titleColor,
    };
    const contentStyle = {
      color: contentColor,
    };
    const nameStyle = {
      color: nameColor,
    };

    return (
      <>
        <div {...useBlockProps.save()}>
          <div className="testimonial-container" style={sectionBgStyle}>
            <div className="testimonial-content-inner" style={alignStyle}>
              {titleVisiblity && (
                <RichText.Content
                  tagName="h1"
                  className="testimonial-title-text"
                  value={title}
                  style={titleStyle}
                />
              )}
              {content && (
              <RichText.Content
                tagName="p"
                className="testimonial-content-text"
                value={content}
                style={contentStyle}
              />
              )}
              {name && (
              <RichText.Content
                tagName="p"
                className="testimonial-name-text"
                value={name}
                style={nameStyle}
              />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
