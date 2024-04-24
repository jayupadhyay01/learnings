import { __ } from "@wordpress/i18n";
import {
  RichText,
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";

import {
  PanelBody,
  Tooltip,
  ToggleControl,
  Button,
} from "@wordpress/components";

import { useEffect, Fragment } from "@wordpress/element";
import { leftAlign, centerAlign, rightAlign } from "../icons";
import classnames from "classnames";
import { storyfulColors } from "../common";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
  attributes,
  setAttributes,
  clientId,
  className,
}) {
  const {
    blockID,
    heading,
    description,
    listItems,
    headingColor,
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
  setAttributes({ blockID: `counter-${clientId}` });

  useEffect(() => {
    if (0 === listItems.length) {
      initList();
    }
  }, []);

  const initList = () => {
    setAttributes({
      listItems: [
        ...listItems,
        {
          index: 0,
          num: "",
          sign: "",
          description: "",
          button: "",
        },
      ],
    });
  };

  const addNewItem = () => {
    if (listItems.length > 5) {
      alert("Maximum 6 statistics allowed.");
    } else {
      const attr = {
        index: listItems.length,
        num: "",
        sign: "",
        description: "",
        button: "",
      };
      setAttributes({
        listItems: [...listItems, attr],
      });
    }
  };

  const moveItem = (oldIndex, newIndex) => {
    const arrayCopy = [...listItems];
    arrayCopy[oldIndex] = listItems[newIndex];
    arrayCopy[newIndex] = listItems[oldIndex];

    setAttributes({
      listItems: arrayCopy,
    });
  };

  const classes = classnames(className, "conter-main");

  const newAlignment = {};
  textAlign && (newAlignment.textAlign = textAlign);

  const headingStyle = {};
  headingColor && (headingStyle.color = headingColor);

  const newHeadingAlignment = {};
  headingAlign && (newHeadingAlignment.textAlign = headingAlign);

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
    <Fragment>
      <InspectorControls>
        <div className="storyful-block-sidebar">
          <PanelBody title={__("Background Settings")} initialOpen={false}>
            <div className="setting-row">
              <label htmlFor="bg image">
                {__("Image Overlay", "storyful")}
              </label>
              <div class="setting-row">
                {!bgImage.url ? (
                  <MediaUploadCheck>
                    <MediaUpload
                      allowedTypes={["image", "video"]}
                      onSelect={(image) => {
                        const newImage = {};
                        newImage.id = image.id;
                        newImage.url = image.url;
                        newImage.alt = image.alt;
                        newImage.width = image.width;
                        newImage.height = image.height;
                        newImage.mediaType = image.type;
                        newImage.mediaMime = image.mime;
                        setAttributes({
                          bgImage: newImage,
                        });
                      }}
                      value={bgImage.id}
                      render={({ open }) => (
                        <Button className="button" onClick={open}>
                          {__("Select Image", "storyful")}
                        </Button>
                      )}
                    />
                  </MediaUploadCheck>
                ) : (
                  <>
                    <div
                      className={`${
                        "video" === bgImage.mediaType
                          ? "image-preview vid-wrapper"
                          : "image-preview"
                      }`}
                    >
                      {"video" === bgImage.mediaType ? (
                        <Fragment>
                          <video
                            id={"video-ss"}
                            width={1920}
                            height={800}
                            autoPlay={true}
                            controls={false}
                            loop={videoLoop}
                            muted={videoMuted}
                            playsinline
                            preload="none"
                          >
                            <source
                              src={bgImage.url}
                              type={bgImage.mediaMime}
                            ></source>
                          </video>
                        </Fragment>
                      ) : (
                        <img src={bgImage.url} alt="Preview" />
                      )}
                    </div>
                    <MediaUploadCheck>
                      <MediaUpload
                        title={__("Replace image", "storyful")}
                        value={bgImage.id}
                        onSelect={(image) => {
                          const newImage = {};
                          newImage.id = image.id;
                          newImage.url = image.url;
                          newImage.alt = image.alt;
                          newImage.width = image.width;
                          newImage.height = image.height;
                          newImage.mediaType = image.type;
                          newImage.mediaMime = image.mime;
                          setAttributes({
                            bgImage: newImage,
                          });
                        }}
                        allowedTypes={["image", "video"]}
                        render={({ open }) => (
                          <Button className="button" onClick={open}>
                            {`${
                              "video" === bgImage.mediaType
                                ? "Replace Video"
                                : "Replace image"
                            }`}
                          </Button>
                        )}
                      />
                      <Button
                        className="button"
                        onClick={() => {
                          setAttributes({
                            bgImage: "",
                          });
                        }}
                      >
                        {`${
                          "video" === bgImage.mediaType
                            ? "Remove Video"
                            : "Remove image"
                        }`}
                      </Button>
                    </MediaUploadCheck>
                  </>
                )}
              </div>
            </div>
          </PanelBody>
          <PanelBody
            title={__("Color Settings", "storyful")}
            initialOpen={false}
          >
            <div className="setting-row">
              <PanelColorSettings
                colorSettings={[
                  {
                    value: titleColor,
                    onChange: (value) => {
                      setAttributes({ titleColor: value });
                    },
                    label: __("Title Color", "storyful"),
                  },
                  {
                    value: descColor,
                    onChange: (color) => setAttributes({ descColor: color }),
                    label: __("Description Color", "storyful"),
                  },
                  {
                    value: headingColor,
                    onChange: (value) => {
                      setAttributes({ headingColor: value });
                    },
                    label: __("Heading Color", "storyful"),
                  },
                  {
                    value: subHeadingColor,
                    onChange: (value) => {
                      setAttributes({ subHeadingColor: value });
                    },
                    label: __("Subheading Color", "storyful"),
                  },
                  {
                    value: BgColor,
                    onChange: (value) => {
                      setAttributes({ BgColor: value });
                    },
                    label: __("Background Color", "storyful"),
                  },
                ]}
                initialOpen={false}
                colors={storyfulColors}
              />
            </div>
          </PanelBody>
          <PanelBody
            title={__("Show/Hide Settings", "storyful")}
            initialOpen={false}
          >
            <ToggleControl
              label={__("Title Visibility", "storyful")}
              checked={showTitle}
              onChange={() => setAttributes({ showTitle: !showTitle })}
            />
            <ToggleControl
              label={__("Description Visibility", "storyful")}
              checked={showDesc}
              onChange={(showDesc) => setAttributes({ showDesc })}
            />
          </PanelBody>

          <PanelBody
            title={__("Font Alignment", "storyful")}
            initialOpen={false}
          >
            <div className="setting-row inspector-field inspector-field-alignment">
              <label className="inspector-mb-0">Alignment</label>
              <div className="inspector-field-button-list inspector-field-button-list-fluid">
                <button
                  className={
                    "left" === textAlign
                      ? "active inspector-button"
                      : " inspector-button"
                  }
                  onClick={() => setAttributes({ textAlign: "left" })}
                >
                  {leftAlign}
                </button>
                <button
                  className={
                    "center" === textAlign
                      ? "active inspector-button"
                      : " inspector-button"
                  }
                  onClick={() => setAttributes({ textAlign: "center" })}
                >
                  {centerAlign}
                </button>
                <button
                  className={
                    "right" === textAlign
                      ? "active inspector-button"
                      : " inspector-button"
                  }
                  onClick={() => setAttributes({ textAlign: "right" })}
                >
                  {rightAlign}
                </button>
              </div>
            </div>
          </PanelBody>
        </div>
      </InspectorControls>
      <div
        className={classes}
        id={blockID}
        style={{ ...BgStyle, ...sectionBgStyle }}
      >
        <div className="conter-main-inner conter-onelayout">
          <div className="conter-onelayout__inner-section">
            <div className="conter-onelayout__wrap" style={newAlignment}>
              <div className="conter-onelayout__title-section">
                {showTitle && (
                  <RichText
                    tagName="h2"
                    placeholder={__("Enter Heading", "storyful")}
                    value={heading}
                    onChange={(heading) => setAttributes({ heading })}
                    style={headingStyle}
                  />
                )}
              </div>
              <div className="conter-onelayout__description-section">
                {showDesc && (
                  <RichText
                    tagName="p"
                    placeholder={__("Enter Description", "storyful")}
                    value={description}
                    onChange={(description) => setAttributes({ description })}
                    style={subHeadingStyle}
                  />
                )}
              </div>
            </div>

            <div className="conter-onelayout__counter-section">
              {0 < listItems.length && (
                <div className={"conter-onelayout__counter-boxes"}>
                  {listItems.map((data, index) => {
                    return (
                      <div
                        data-key={index}
                        className="conter-onelayout__counter-box show-items-hover-wrap"
                      >
                        <div className="item-action-wrap show-items-hover pos-abs">
                          <div className="move-item">
                            {0 < index && (
                              <Tooltip text={__("Move Left", "storyful")}>
                                <span
                                  className="dashicons dashicons-arrow-left-alt move-left"
                                  aria-hidden="true"
                                  onClick={() => moveItem(index, index - 1)}
                                ></span>
                              </Tooltip>
                            )}
                            {index + 1 < listItems.length && (
                              <Tooltip text={__("Move Right", "storyful")}>
                                <span
                                  className="dashicons dashicons-arrow-right-alt move-right"
                                  onClick={() => moveItem(index, index + 1)}
                                ></span>
                              </Tooltip>
                            )}
                          </div>
                          {1 < listItems.length && (
                            <Tooltip text={__("Remove Item", "storyful")}>
                              <i
                                className="remove-item dashicons dashicons-no-alt"
                                onClick={() => {
                                  let toDelete = confirm(
                                    __(
                                      "Are you sure you want to delete this item?",
                                      "storyful"
                                    )
                                  );
                                  if (true === toDelete) {
                                    const updatedArray = listItems
                                      .filter(
                                        (item) => item.index != data.index
                                      )
                                      .map((updatedItems) => {
                                        if (updatedItems.index > data.index) {
                                          updatedItems.index -= 1;
                                        }
                                        return updatedItems;
                                      });
                                    setAttributes({
                                      listItems: updatedArray,
                                    });
                                  }
                                }}
                              ></i>
                            </Tooltip>
                          )}
                        </div>
                        <div className={`conter-onelayout__counter-content`}>
                          <div className="conter-onelayout__counter-title">
                            <RichText
                              tagName="span"
                              placeholder={__("Sign", "storyful")}
                              value={data.sign1}
                              onChange={(value) => {
                                let arrayCopy = [...listItems];
                                arrayCopy[index].sign1 = value;
                                setAttributes({ listItems: arrayCopy });
                              }}
                              style={titleStyle}
                              className="counter_sign"
                            />
                            <RichText
                              tagName="span"
                              placeholder={__("Number", "storyful")}
                              value={data.num}
                              onChange={(value) => {
                                let arrayCopy = [...listItems];
                                arrayCopy[index].num = value;
                                setAttributes({ listItems: arrayCopy });
                              }}
                              style={titleStyle}
                              className="counter_num"
                            />
                            <RichText
                              tagName="span"
                              placeholder={__("Sign", "storyful")}
                              value={data.sign}
                              onChange={(value) => {
                                let arrayCopy = [...listItems];
                                arrayCopy[index].sign = value;
                                setAttributes({ listItems: arrayCopy });
                              }}
                              style={titleStyle}
                              className="counter_sign"
                            />
                          </div>
                          <RichText
                            tagName="p"
                            placeholder={__("Enter Description", "storyful")}
                            className="conter-onelayout__counter-description"
                            value={data.description}
                            onChange={(value) => {
                              let arrayCopy = [...listItems];
                              arrayCopy[index].description = value;
                              setAttributes({ listItems: arrayCopy });
                            }}
                            style={descStyle}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                className="add-item-wrap"
                onClick={() => {
                  addNewItem();
                }}
              >
                <Tooltip text={__("Add New Item", "storyful")}>
                  <i
                    className="add-new-item dashicons dashicons-plus"
                    aria-hidden="true"
                  ></i>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
