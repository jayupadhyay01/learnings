import { RichText } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save(props) {
  const { attributes } = props;
  const {
    blockID,
    autoplay,
    arrows,
    dots,
    slideInfinite,
    repeatItems,
    titleVisiblity,
    descriptionVisiblity,
    bgColor,
    BtnColor,
    BtnVisiblity,
    headingColor,
    decColor,
    bgMediaType,
    bgMediaMime,
    bgMediaURL,
    bgVideoPoster,
    bgVideoAutoplay,
    bgVideoLoop,
    bgVideoMuted,
    showBgOverlay,
    bgOverlayColor,
    bgOverlayOpacity,
  } = attributes;

  const blockStyle = {};
  bgColor && (blockStyle.backgroundColor = bgColor);

  const decStyle = {};
  decColor && (decStyle.color = decColor);

  const btnStyle = {};
  BtnColor && (btnStyle.color = BtnColor);

  const headingStyle = {};
  headingColor && (headingStyle.color = headingColor);

  const bgOverlayStyle = {};
  bgOverlayColor && (bgOverlayStyle.backgroundColor = bgOverlayColor);
  bgOverlayOpacity && (bgOverlayStyle.opacity = bgOverlayOpacity);

  return (
    <div className={"hero-carousel"} id={blockID} style={blockStyle}>
      <div className={"slider-bg"}>
        {bgMediaURL &&
          ("video" === bgMediaType ? (
            <video
              width={1920}
              height={600}
              id={"video-" + blockID}
              autoPlay={bgVideoAutoplay}
              controls={false}
              loop={bgVideoLoop}
              muted={bgVideoMuted}
              poster={bgVideoPoster ? bgVideoPoster : false}
              playsinline
              preload="none"
            >
              <source src={bgMediaURL} type={bgMediaMime}></source>
            </video>
          ) : (
            <img width={1400} height={600} src={bgMediaURL} alt={"Thumbnail"} />
          ))}
        {showBgOverlay && (
          <div className="slider-bg-overlay" style={bgOverlayStyle}></div>
        )}
      </div>
      <div className="carousel-container">
        <div className={`hero-carousel-inner`}>
          <div className={`hero-carousel-body`}>
            <div
              className={`hero-carousel-main`}
              data-slide-autoplay={autoplay}
              data-slide-arrows={arrows}
              data-slide-dots={dots}
              data-slide-infinite={slideInfinite}
            >
              {0 < repeatItems.length &&
                repeatItems.map((slideItems, index) => {
                  return (
                    <div slide-index={index} className={`hero-slide-item`}>
                      <div className={`hero-slide-inner`}>
                        <div className={`hero-slide-info`}>
                          {slideItems.title && titleVisiblity && (
                            <RichText.Content
                              className="hero-carousel-slide-title"
                              value={slideItems.title}
                              tagName="h3"
                              style={headingStyle}
                            />
                          )}
                          {slideItems.description && descriptionVisiblity && (
                            <RichText.Content
                              value={slideItems.description}
                              tagName="p"
                              className="hero-carousel-slide-desc"
                              style={decStyle}
                            />
                          )}
                          {slideItems.btn && BtnVisiblity && (
                            <RichText.Content
                              value={slideItems.btn}
                              tagName="p"
                              className="hero-carousel-slide-button"
                              style={btnStyle}
                            />
                          )}
                        </div>
                        {slideItems.slideImageURL && (
                          <div className="hero-slide-img">
                            <img
                              src={slideItems.slideImageURL}
                              alt={
                                slideItems.slideImageAlt
                                  ? slideItems.slideImageAlt
                                  : false
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
