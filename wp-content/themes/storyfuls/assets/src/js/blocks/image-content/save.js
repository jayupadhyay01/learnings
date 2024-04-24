/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { useBlockProps } from "@wordpress/block-editor";
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
export default function Save({ attributes }) { 
    const {
      bgColor,
      textAlignment,
      titleColor,
      titleVisiblity,
      descriptionColor,
      descriptionVisiblity,
      listItems,
      Image,
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
    return (
      <div {...useBlockProps.save()}>
        <div className="image-content-container" style={sectionBgStyle}>
          <div className="image-content-img">
            <div className="image-content-inner-img">
              {Image.url != "" && (
                <img
                  src={Image.url}
                  height={Image.height}
                  width={Image.width}
                  alt={Image.alt}
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div className="image-content-cntnt" style={alignStyle}>
            {0 < listItems.length && (
              <div className="image-content-cntnt-inner">
                {listItems.map((data, index) => {
                  return (
                    <div data-key={index} className="content-box">
                      {data.title && titleVisiblity && (
                        <RichText.Content
                          tagName="h3"
                          className="title-item"
                          value={data.title}
                          style={titleStyle}
                        />
                      )}
                      {data.description && descriptionVisiblity && (
                        <RichText.Content
                          tagName="p"
                          className="description-item"
                          value={data.description}
                          style={descriptionStyle}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

