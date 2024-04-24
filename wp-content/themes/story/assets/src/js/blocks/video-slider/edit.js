import { __ } from "@wordpress/i18n";
import React from 'react';
import "./editor.scss";
import jQuery from 'jquery';
import { Component, Fragment } from "@wordpress/element";
import { storyfulColors } from "../common";
import {
  Tooltip,
  Button,
  TextControl,
  PanelBody,
  FormToggle,
  PanelRow,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { MediaUpload, InspectorControls } from "@wordpress/block-editor";
import Slider from "react-slick";

const { RichText, PanelColorSettings } = wp.blockEditor;

class BlockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slickObj: {},
    };
  }

  initList() {
    const { ArrayData } = this.props.attributes;
    const { setAttributes } = this.props;
    setAttributes({
      ArrayData: [
        ...ArrayData,
        {
          index: ArrayData.length,
          mediaurl: "",
          embedurl: "",
          videotype: "media-upload",
          media: "",
          mediaId: "",
          mediaAlt: "",
        },
      ],
    });
  }

  render() {
    const { attributes, setAttributes } = this.props;
    const { title, titleColor, bgColor, titleVisiblity, textAlignment, ArrayData, slideAuto, showDots, showArrows } =
      attributes;
    const titleStyle = {
      color: titleColor,
    };
    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);
    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);

    const colorSettings = [];

    colorSettings.push({
      value: bgColor,
      onChange: (value) => {
        setAttributes({
          bgColor: value,
        });
      },
      label: __("Background Color"),
    });


    if (titleVisiblity) {
      colorSettings.push({
        value: titleColor,
        onChange: (value) => {
          setAttributes({
            titleColor: value,
          });
        },
        label: __("Title Color"),
      });
    }

    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: showDots,
      arrows: showArrows,
      autoplay: slideAuto,
      centerMode: true,
      centerPadding: "10px",
      speed: 1000,
    };

    const ArrayDataList = (media, index) => {
      return (
        <>
          <div className={"video-wrapped"} key={index}>
            {ArrayData.length > 0 && (
              <div className="video-edit">
                <Tooltip text="Remove item">
                  <button
                    className="remove-btn"
                    onClick={() => {
                      const confirmRemove = window.confirm(
                        "Are you sure you want to remove this item?"
                      );

                      if (confirmRemove) {
                        const newObj = [...ArrayData];
                        newObj.splice(index, 1);
                        setAttributes({ ArrayData: newObj });
                      }
                    }}
                  >
                    <i
                      className="dashicons dashicons-no-alt remove-image"
                      aria-hidden="true"
                    ></i>{" "}
                    Remove Item
                  </button>
                </Tooltip>
              </div>
            )}
            <div className="video-inner">
              <div className="detail-video" style={{ textAlign: "center" }}>
                <div className="video-edit-components">
                  <SelectControl
                    label={__("Select Video Type", "storyful")}
                    value={media.videotype}
                    options={[
                      {
                        label: "Embed Video",
                        value: "embed",
                      },
                      {
                        label: "Media Upload Video",
                        value: "media-upload",
                      },
                    ]}
                    onChange={(videotype) => {
                      const newObj = Object.assign({}, media, {
                        videotype,
                      });
                      const blkDetails = [...ArrayData];
                      blkDetails[index] = newObj;
                      setAttributes({
                        ArrayData: blkDetails,
                      });
                    }}
                  />
                  {media.videotype === "embed" && (
                    <>
                      <TextControl
                        placeholder="Enter embed video URL"
                        value={media.embedurl}
                        className="video-item-url"
                        onChange={(embedurl) => {
                          const newObj = Object.assign({}, media, {
                            embedurl,
                          });
                          const blkDetails = [...ArrayData];
                          blkDetails[index] = newObj;
                          setAttributes({
                            ArrayData: blkDetails,
                          });
                        }}
                      />
                      {media.embedurl && (
                        <iframe
                          src={media.embedurl + "?controls=0"}
                          title="video"
                        ></iframe>
                      )}
                    </>
                  )}
                </div>

                {media.videotype === "media-upload" && media.mediaurl && (
                  <video
                    autoPlay=""
                    muted=""
                    loop=""
                    className="edit-media-vdo"
                  >
                    <source src={media.mediaurl} type="video/mp4" />
                  </video>
                )}
                {media.videotype === "media-upload" && !media.mediaurl && (
                  <>
                    <MediaUpload
                      onSelect={(newmedia) => {
                        const newObj = Object.assign({}, media, {
                          mediaurl: newmedia.url,
                        });
                        const blkDetails = [...ArrayData];
                        blkDetails[index] = newObj;
                        setAttributes({
                          ArrayData: blkDetails,
                        });
                      }}
                      type="video"
                      value={media.mediaurl}
                      render={({ open }) => (
                        <Button
                          onClick={open}
                          className="components-button upload-btn"
                        >
                          <i className="fa fa-upload" aria-hidden="true"></i>{" "}
                          Upload video
                        </Button>
                      )}
                    />
                  </>
                )}
                {media.videotype === "media-upload" && media.mediaurl && (
                  <Button
                    onClick={() => {
                      const newObj = Object.assign({}, media, {
                        mediaurl: "",
                      });
                      const blkDetails = [...ArrayData];
                      blkDetails[index] = newObj;
                      setAttributes({
                        ArrayData: blkDetails,
                      });
                    }}
                    className="btn-remove"
                  >
                    <i
                      className="dashicons dashicons-no-alt remove-image"
                      aria-hidden="true"
                    ></i>{" "}
                    Remove video
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      );
    }

    return [
      <Fragment>
        <InspectorControls>
          {colorSettings.length > 0 && (
            <PanelBody title={__("Color Settings")} initialOpen={false}>
              <div className="setting-row">
                <PanelColorSettings
                  colorSettings={colorSettings}
                  colors={storyfulColors}
                />
              </div>
            </PanelBody>
          )}
          <PanelBody
            title={__("Hide/Show Options")}
            initialOpen={false}
            className="hideshow-block-setting"
          >
            <div className="setting-row">
              <ToggleControl
                label={__("Title Visiblity")}
                checked={titleVisiblity}
                onChange={() =>
                  setAttributes({
                    titleVisiblity: !titleVisiblity,
                  })
                }
              />
            </div>
          </PanelBody>
          <PanelBody
            title={__("Slider Settings", "storyful")}
            initialOpen={false}
          >
            <PanelRow>
              <label htmlFor="Display Mode">
                {__("Autoslide", "storyful")}
              </label>
              <FormToggle
                label="auto"
                checked={slideAuto}
                onChange={() =>
                  setAttributes({
                    slideAuto: !slideAuto,
                  })
                }
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="Display Mode">
                {__("Dots Visibility", "storyful")}
              </label>
              <FormToggle
                checked={showDots}
                onChange={() =>
                  setAttributes({
                    showDots: !showDots,
                  })
                }
              />
            </PanelRow>
            <PanelRow>
              <label htmlFor="Display Mode">
                {__("Arrows Visibility", "storyful")}
              </label>
              <FormToggle
                checked={showArrows}
                onChange={() =>
                  setAttributes({
                    showArrows: !showArrows,
                  })
                }
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title={__("Font Alignment")} initialOpen={false}>
            <div className="setting-row">
              <div className="inspector-field-alignment inspector-field inspector-responsive">
                <div className="inspector-field-button-list inspector-field-button-list-fluid">
                  <button
                    className={`inspector-button ${
                      "left" === textAlignment ? "active" : ""
                    }`}
                    onClick={() =>
                      setAttributes({
                        textAlignment: "left",
                      })
                    }
                  >
                    {leftAlign}
                  </button>
                  <button
                    className={`inspector-button ${
                      "center" === textAlignment ? "active" : ""
                    }`}
                    onClick={() =>
                      setAttributes({
                        textAlignment: "center",
                      })
                    }
                  >
                    {centerAlign}
                  </button>
                  <button
                    className={`inspector-button ${
                      "right" === textAlignment ? "active" : ""
                    }`}
                    onClick={() =>
                      setAttributes({
                        textAlignment: "right",
                      })
                    }
                  >
                    {rightAlign}
                  </button>
                </div>
              </div>
            </div>
          </PanelBody>
        </InspectorControls>
        <div className="video-slider-block" style={sectionBgStyle}>
          {titleVisiblity && (
            <div className="main-title" style={alignStyle}>
              <RichText
                tagName="h2"
                placeholder={__("Title")}
                value={title}
                onChange={(newTitle) => setAttributes({ title: newTitle })}
                className="video-block-title"
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
          <Slider {...settings}>
            {ArrayData.map((media, index) => (
              <div className="wrapper-video-section" key={index}>
                {ArrayDataList(media, index)}
              </div>
            ))}
          </Slider>
            <div className="video-wrapped">
              <Tooltip text="Add item">
                <button
                  className="add-new-item"
                  onClick={() => {
                    setAttributes({
                      ArrayData: [
                        {
                          index: 0,
                          mediaurl: "",
                          embedurl: "",
                          videotype: "media-upload",
                          media: "",
                          mediaId: "",
                          mediaAlt: "",
                        },
                        ...ArrayData,
                      ],
                    });
                    jQuery(".wrapper-video-section").slick("unslick");
                  }}
                >
                  <i className="add-new-item dashicons dashicons-plus"></i> Add
                  new Video
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Fragment>,
    ];
  }
}
export default BlockComponent;