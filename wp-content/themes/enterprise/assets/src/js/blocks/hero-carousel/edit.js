import { __ } from "@wordpress/i18n";
import "./editor.scss";
import {
  RichText,
  InspectorControls,
  ColorPalette,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
} from "@wordpress/block-editor";

import {
  PanelBody,
  Button,
  RangeControl,
  ToggleControl,
  Tooltip,
} from "@wordpress/components";

import { Fragment } from "@wordpress/element";
import { AnaEnterpriseColors } from "../common";
import Slider from "react-slick";
import { useRef } from "react";

export default function Edit({ attributes, setAttributes, clientId }) {

  const sliderRef = useRef(null);

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
    bgMediaID,
    bgMediaURL,
    bgVideoPoster,
    bgVideoAutoplay,
    bgVideoLoop,
    bgVideoMuted,
    showBgOverlay,
    bgOverlayColor,
    bgOverlayOpacity,
  } = attributes;

  const moveItem = (oldIndex, newIndex) => {
    const arrayCopy = [...repeatItems];
    arrayCopy[oldIndex] = repeatItems[newIndex];
    arrayCopy[newIndex] = repeatItems[oldIndex];

    setAttributes({ repeatItems: arrayCopy });
  };

  const settings = {
    dots,
    autoplay,
    arrows,
    infinite: slideInfinite,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  setAttributes({ blockID: `hero-carousel-${clientId}` });

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
    <Fragment>
      <InspectorControls>
        <div className="ana-enterprise-block-sidebar">
          <PanelBody
            title={__("Background Settings", "ana-enterprise")}
            initialOpen={false}
          >
            <div className="setting-row">
              <label>{__("Background Media", "ana-enterprise")}</label>
              <div>
                {!bgMediaURL ? (
                  <MediaUploadCheck>
                    <MediaUpload
                      onSelect={(item) => {
                        setAttributes({
                          bgMediaID: item.id,
                          bgMediaURL: item.url,
                          bgMediaAlt: item.alt,
                          bgMediaWidth: item.width,
                          bgMediaHeight: item.height,
                          bgMediaType: item.type,
                          bgMediaMime: item.mime,
                        });
                      }}
                      allowedTypes={["image", "video"]}
                      value={bgMediaURL}
                      render={({ open }) => {
                        return (
                          <Button
                            onClick={open}
                            className="button button-large"
                          >
                            {__("Upload Media", "ana-enterprise")}
                          </Button>
                        );
                      }}
                    />
                  </MediaUploadCheck>
                ) : (
                  <Fragment>
                    <div className={`image-preview`}>
                      {"video" === bgMediaType ? (
                        <Fragment>
                          <video
                            id={"video-" + blockID}
                            autoPlay={bgVideoAutoplay}
                            controls={false}
                            loop={bgVideoLoop}
                            muted={true}
                            poster={bgVideoPoster ? bgVideoPoster : false}
                          >
                            <source
                              src={bgMediaURL}
                              type={bgMediaMime}
                            ></source>
                          </video>
                        </Fragment>
                      ) : (
                        <img src={bgMediaURL} alt="Thumbnail" />
                      )}
                    </div>
                    <MediaUploadCheck>
                      <MediaUpload
                        onSelect={(item) => {
                          setAttributes({
                            bgMediaID: item.id,
                            bgMediaURL: item.url,
                            bgMediaAlt: item.alt,
                            bgMediaWidth: item.width,
                            bgMediaHeight: item.height,
                            bgMediaType: item.type,
                            bgMediaMime: item.mime,
                          });
                        }}
                        allowedTypes={["image", "video"]}
                        value={bgMediaID}
                        render={({ open }) => {
                          return (
                            <Button
                              onClick={open}
                              className="button is-secondary"
                            >
                              {__("Edit Media", "ana-enterprise")}
                            </Button>
                          );
                        }}
                      />
                    </MediaUploadCheck>
                    <Button
                      onClick={() => {
                        setAttributes({
                          bgMediaID: "",
                          bgMediaURL: "",
                          bgMediaAlt: "",
                          bgMediaWidth: "",
                          bgMediaHeight: "",
                          bgMediaType: "",
                          bgMediaMime: "",
                        });
                      }}
                      className="is-link is-destructive"
                    >
                      {__("Remove Media", "ana-enterprise")}
                    </Button>
                  </Fragment>
                )}
              </div>
            </div>
            <ToggleControl
              label={__("Show Overlay", "ana-enterprise")}
              checked={showBgOverlay}
              onChange={(showBgOverlay) => {
                setAttributes({ showBgOverlay });
              }}
            />
            {showBgOverlay && (
              <Fragment>
                <div className="setting-row">
                  <label>
                    {__("Background Overlay Color", "ana-enterprise")}
                  </label>
                  <ColorPalette
                    value={bgOverlayColor}
                    onChange={(bgOverlayColor) => {
                      setAttributes({
                        bgOverlayColor: bgOverlayColor
                          ? bgOverlayColor
                          : "transparent",
                      });
                    }}
                    colors={AnaEnterpriseColors}
                  />
                </div>
                <div className="setting-row">
                  <label>
                    {__("Background Overlay Opacity", "ana-enterprise")}
                  </label>
                  <RangeControl
                    min={0}
                    max={1}
                    step={0.1}
                    value={bgOverlayOpacity}
                    onChange={(bgOverlayOpacity) =>
                      setAttributes({
                        bgOverlayOpacity,
                      })
                    }
                  />
                </div>
              </Fragment>
            )}
            {"video" === bgMediaType && (
              <PanelBody
                title={__("Video Settings", "ana-enterprise")}
                initialOpen={false}
              >
                <div className="setting-row">
                  <label>{__("Poster Image", "ana-enterprise")}</label>
                  <div>
                    {!bgVideoPoster ? (
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={(item) => {
                            setAttributes({
                              bgVideoPoster: item.url,
                            });
                          }}
                          type="image"
                          value={bgVideoPoster}
                          render={({ open }) => (
                            <Button
                              onClick={open}
                              className="button button-large"
                            >
                              {__("Upload Image", "ana-enterprise")}
                            </Button>
                          )}
                        />
                      </MediaUploadCheck>
                    ) : (
                      <Fragment>
                        <div className="image-preview">
                          <img src={bgVideoPoster} alt="video cover" />
                        </div>
                        <Button
                          onClick={() => {
                            setAttributes({
                              bgVideoPoster: "",
                            });
                          }}
                          className="is-link is-destructive"
                        >
                          {__("Remove Image", "ana-enterprise")}
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </div>
                <ToggleControl
                  label={__("Autoplay", "ana-enterprise")}
                  checked={bgVideoAutoplay}
                  onChange={(bgVideoAutoplay) => {
                    setAttributes({
                      bgVideoAutoplay,
                    });
                  }}
                />
                <ToggleControl
                  label={__("Loop", "ana-enterprise")}
                  checked={bgVideoLoop}
                  onChange={(bgVideoLoop) => {
                    setAttributes({ bgVideoLoop });
                  }}
                />
                <ToggleControl
                  label={__("Muted", "ana-enterprise")}
                  checked={bgVideoMuted}
                  onChange={(bgVideoMuted) => {
                    setAttributes({ bgVideoMuted });
                  }}
                />
              </PanelBody>
            )}
          </PanelBody>
          <PanelBody title={__("Hide/Show Options")} initialOpen={false}>
            <ToggleControl
              label={__("Title Visiblity")}
              checked={titleVisiblity}
              onChange={() =>
                setAttributes({
                  titleVisiblity: !titleVisiblity,
                })
              }
            />
            <ToggleControl
              label={__("Description Visiblity")}
              checked={descriptionVisiblity}
              onChange={() =>
                setAttributes({
                  descriptionVisiblity: !descriptionVisiblity,
                })
              }
            />
            <ToggleControl
              label={__("Button Visiblity")}
              checked={BtnVisiblity}
              onChange={() =>
                setAttributes({
                  BtnVisiblity: !BtnVisiblity,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Slider Settings", "ana-enterprise")}
            initialOpen={false}
          >
            <ToggleControl
              label={__("Autoplay", "ana-enterprise")}
              checked={autoplay}
              onChange={() =>
                setAttributes({
                  autoplay: !autoplay,
                })
              }
            />
            <ToggleControl
              label={__("Show Arrows", "ana-enterprise")}
              checked={arrows}
              onChange={() =>
                setAttributes({
                  arrows: !arrows,
                })
              }
            />
            <ToggleControl
              label={__("Show Dots", "ana-enterprise")}
              checked={dots}
              onChange={() =>
                setAttributes({
                  dots: !dots,
                })
              }
            />
            <ToggleControl
              label={__("Loop", "ana-enterprise")}
              checked={slideInfinite}
              onChange={() =>
                setAttributes({
                  slideInfinite: !slideInfinite,
                })
              }
            />
          </PanelBody>
          <PanelBody
            title={__("Color Settings", "ana-enterprise")}
            initialOpen={false}
          >
            <PanelColorSettings
              colorSettings={[
                {
                  value: bgColor,
                  onChange: (value) => {
                    setAttributes({ bgColor: value });
                  },
                  label: __("Background Color", "ana-enterprise"),
                },
                {
                  value: headingColor,
                  onChange: (value) => {
                    setAttributes({
                      headingColor: value,
                    });
                  },
                  label: __("Heading Color", "ana-enterprise"),
                },
                {
                  value: decColor,
                  onChange: (value) => {
                    setAttributes({
                      decColor: value,
                    });
                  },
                  label: __("Description Color", "ana-enterprise"),
                },
                {
                  value: BtnColor,
                  onChange: (value) => {
                    setAttributes({
                      BtnColor: value,
                    });
                  },
                  label: __("Button Color", "ana-enterprise"),
                },
              ]}
              initialOpen={false}
              colors={AnaEnterpriseColors}
            />
          </PanelBody>
        </div>
      </InspectorControls>
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
              >
                <source src={bgMediaURL} type={bgMediaMime}></source>
              </video>
            ) : (
              <img
                width={1400}
                height={600}
                src={bgMediaURL}
                alt={"Thumbnail"}
              />
            ))}
          {showBgOverlay && (
            <div className="slider-bg-overlay" style={bgOverlayStyle}></div>
          )}
        </div>
        <div className="carousel-container">
          <div className={`hero-carousel-inner`}>
            <div className={`hero-carousel-body`}>
              <Slider {...settings} ref={sliderRef}>
                {0 < repeatItems.length &&
                  repeatItems.map((slideItems, index) => {
                    return (
                      <div slide-index={index} className={`hero-slide-item show-items-hover-wrap`}>
                        <div className="item-action-wrap show-items-hover small-icons">
                          <div className="move-item">
                            {0 < index && (
                              <Tooltip text={__("Move Up", "ana-enterprise")}>
                                <span
                                  className="dashicons dashicons-arrow-left-alt move-up"
                                  aria-hidden="true"
                                  onClick={() => moveItem(index, index - 1)}
                                ></span>
                              </Tooltip>
                            )}
                            {index + 1 < repeatItems.length && (
                              <Tooltip text={__("Move Down", "ana-enterprise")}>
                                <span
                                  className="dashicons dashicons-arrow-right-alt move-down"
                                  onClick={() => moveItem(index, index + 1)}
                                ></span>
                              </Tooltip>
                            )}
                          </div>
                          {1 < repeatItems.length && (
                            <Tooltip text={__("Remove Item", "ana-enterprise")}>
                              <i
                                className="remove-item dashicons dashicons-no-alt"
                                onClick={() => {
                                  const confirmRemove = window.confirm(
                                    "Are you sure you want to remove this item?"
                                  );
                                  if (confirmRemove) {
                                    const slideObject = [...repeatItems];
                                    slideObject.splice(index, 1);
                                    setAttributes({
                                      repeatItems: slideObject,
                                    });
                                  }
                                }}
                              ></i>
                            </Tooltip>
                          )}
                        </div>
                        <div className={`hero-slide-inner`}>
                          <div className={`hero-slide-info`}>
                            {titleVisiblity && (
                              <RichText
                                className="hero-carousel-slide-title"
                                value={slideItems.title}
                                onChange={(title) => {
                                  const slideObject = Object.assign(
                                    {},
                                    slideItems,
                                    {
                                      title,
                                    }
                                  );
                                  const repeatItemsArr = [...repeatItems];
                                  repeatItemsArr[index] = slideObject;
                                  setAttributes({
                                    repeatItems: repeatItemsArr,
                                  });
                                }}
                                tagName="h3"
                                placeholder="Slide Title"
                                style={headingStyle}
                              />
                            )}
                            {descriptionVisiblity && (
                              <RichText
                                value={slideItems.description}
                                onChange={(description) => {
                                  const slideObject = Object.assign(
                                    {},
                                    slideItems,
                                    {
                                      description,
                                    }
                                  );
                                  const repeatItemsArr = [...repeatItems];
                                  repeatItemsArr[index] = slideObject;
                                  setAttributes({
                                    repeatItems: repeatItemsArr,
                                  });
                                }}
                                tagName="p"
                                className="hero-carousel-slide-desc"
                                placeholder="Slide Description"
                                style={decStyle}
                              />
                            )}
                            {BtnVisiblity && (
                              <RichText
                                value={slideItems.btn}
                                onChange={(btn) => {
                                  const slideObject = Object.assign(
                                    {},
                                    slideItems,
                                    {
                                      btn,
                                    }
                                  );
                                  const repeatItemsArr = [...repeatItems];
                                  repeatItemsArr[index] = slideObject;
                                  setAttributes({
                                    repeatItems: repeatItemsArr,
                                  });
                                }}
                                tagName="p"
                                className="hero-carousel-slide-button"
                                placeholder="Slide Button"
                                style={btnStyle}
                              />
                            )}
                          </div>
                          <div className="hero-slide-img">
                            {!slideItems.slideImageURL ? (
                              <div className="ana-enterprise-upload-wrap">
                                <MediaUpload
                                  onSelect={(item) => {
                                    const slideObject = Object.assign(
                                      {},
                                      slideItems,
                                      {
                                        slideImageID: item.id,
                                        slideImageURL: item.url,
                                        slideImageAlt: item.alt,
                                      }
                                    );
                                    const repeatItemsArr = [...repeatItems];
                                    repeatItemsArr[index] = slideObject;
                                    setAttributes({
                                      repeatItems: repeatItemsArr,
                                    });
                                  }}
                                  type="image"
                                  value={slideItems.slideImageURL}
                                  render={({ open }) => (
                                    <div className="ana-enterprise-upload-wrap">
                                      <Button
                                        className={"button button-large"}
                                        onClick={open}
                                      >
                                        {__("Upload Image", "ana-enterprise")}
                                      </Button>
                                    </div>
                                  )}
                                />
                              </div>
                            ) : (
                              <div className="ana-enterprise-image image-preview image-controle-visible-hover">
                                <div className="item-action-wrap image-controls small-icons icon-center-fixed">
                                  <MediaUploadCheck>
                                    <MediaUpload
                                      onSelect={(item) => {
                                        const slideObject = Object.assign(
                                          {},
                                          slideItems,
                                          {
                                            slideImageID: item.id,
                                            slideImageURL: item.url,
                                            slideImageAlt: item.alt,
                                          }
                                        );
                                        const repeatItemsArr = [...repeatItems];
                                        repeatItemsArr[index] = slideObject;
                                        setAttributes({
                                          repeatItems: repeatItemsArr,
                                        });
                                      }}
                                      type="image"
                                      value={slideItems.slideImageID}
                                      render={({ open }) => {
                                        return (
                                          <Tooltip
                                            text={__(
                                              "Edit Image",
                                              "ana-enterprise"
                                            )}
                                          >
                                            <i
                                              className="dashicons dashicons-edit edit-image"
                                              onClick={open}
                                            ></i>
                                          </Tooltip>
                                        );
                                      }}
                                    />
                                  </MediaUploadCheck>
                                  <Tooltip
                                    text={__("Remove Image", "ana-enterprise")}
                                  >
                                    <i
                                      className="dashicons dashicons-no-alt remove-image"
                                      onClick={() => {
                                        const slideObject = Object.assign(
                                          {},
                                          slideItems,
                                          {
                                            slideImageID: "",
                                            slideImageURL: "",
                                            slideImageAlt: "",
                                          }
                                        );
                                        const repeatItemsArr = [...repeatItems];
                                        repeatItemsArr[index] = slideObject;
                                        setAttributes({
                                          repeatItems: repeatItemsArr,
                                        });
                                      }}
                                    ></i>
                                  </Tooltip>
                                </div>
                                <img
                                  src={slideItems.slideImageURL}
                                  alt={slideItems.slideImageAlt}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
              <div className="add-item-wrap">
                <i
                  onClick={() => {
                    let repeatItemsArr = repeatItems;
                    const slideObject = [
                      ...repeatItems,
                      {
                        title: "",
                        btn: "",
                        slideImageID: "",
                        slideImageURL: "",
                        slideImageAlt: "",
                        description: "",
                      },
                    ];
                    repeatItemsArr = slideObject;
                    setAttributes({
                      repeatItems: repeatItemsArr,
                    });
                    if (sliderRef.current) {
                      const newIndex = repeatItemsArr.length - 1;
                      sliderRef.current.slickGoTo(newIndex);
                    }
                  }}
                  className="dashicons dashicons-plus add-new-item"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
