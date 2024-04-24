const { RichText } = wp.blockEditor;
export default function save(props) {
  const { attributes } = props;
  const {
    title,
    titleColor,
    titleVisiblity,
    bgColor,
    ArrayData,
    slideAuto,
    showArrows,
    showDots,
    textAlignment,
  } = attributes;
  const titleStyle = {
    color: titleColor,
  };
  const sectionBgStyle = {};
  bgColor && (sectionBgStyle.background = bgColor);
  const alignStyle = {};
  textAlignment && (alignStyle.textAlign = textAlignment);
  return (
    <div className="video-slider-block" style={sectionBgStyle}>
      {titleVisiblity && (
        <div className="main-title" style={alignStyle}>
          <RichText.Content
            tagName="h2"
            className="video-block-title"
            value={title}
            style={titleStyle}
          />
        </div>
      )}
      <div
        className="video-section"
        data-slide-autoplay={slideAuto}
        data-slide-arrows={showArrows}
        data-slide-dots={showDots}
      >
        <div className="video-slider-container">
          <div className="wrapper-video-section">
            {ArrayData.map((media, index) => (
              <div className="video-wrapped" key={index}>
                <div className="video-inner">
                  <div className="detail-video">
                    {media.mediaurl && media.videotype === "media-upload" && (
                      <video autoPlay muted loop className="hidden video-div">
                        <source src={media.mediaurl} type="video/mp4" />
                      </video>
                    )}
                    {media.embedurl && media.videotype === "embed" && (
                      <iframe
                        src={media.embedurl}
                        title="video"
                        allow="autoplay; encrypted-media"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
