/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import "./editor.scss";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { storyfulColors } from "../common";
const { Fragment, useEffect } = wp.element;

const {
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
} = wp.blockEditor;
const {
  PanelBody,
  ToggleControl,
  Button,
  Tooltip,
} = wp.components;
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
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
  const sectionBgStyle = {};
  bgColor && (sectionBgStyle.background = bgColor);

    const colorSettings = [];

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
    colorSettings.push({
      value: bgColor,
      onChange: (value) => {
        setAttributes({
          bgColor: value,
        });
      },
      label: __("Background Color"),
    });
    colorSettings.push({
      value: btnTextColor,
      onChange: (value) => {
        setAttributes({
          btnTextColor: value,
        });
      },
      label: __("Button Text Color"),
    });

    if (descriptionVisiblity) {
      colorSettings.push({
        value: descriptionColor,
        onChange: (value) => {
          setAttributes({
            descriptionColor: value,
          });
        },
        label: __("Description Color"),
      });
    }

    if (boxVisiblity) {
      colorSettings.push({
        value: boxTitleColor,
        onChange: (value) => {
          setAttributes({
            boxTitleColor: value,
          });
        },
        label: __("Box Title Color"),
      });
      colorSettings.push({
        value: boxDescColor,
        onChange: (value) => {
          setAttributes({
            boxDescColor: value,
          });
        },
        label: __("Box Description Color"),
      });
    }

  useEffect(() => {
    if (0 === listItems.length) {
      initLList();
    }
  }, []);

  const initLList = () => {
    setAttributes({
      listItems: [
        ...listItems,
        {
          title: "",
          description: "",
        },
      ],
    });
  };

  const addNewLItem = () => {
    const attr = {
      index: listItems.length,
      title: "",
      description: "",
    };
    setAttributes({
      listItems: [...listItems, attr],
    });
  };

  const moveItem = (oldIndex, newIndex) => {
    const arrayCopy = [...listItems];
    arrayCopy[oldIndex] = listItems[newIndex];
    arrayCopy[newIndex] = listItems[oldIndex];

    setAttributes({
      listItems: arrayCopy,
    });
  };

  return (
    <Fragment>
      <InspectorControls>
        <div className="storyful-block-sidebar">
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
            <div className="setting-row">
              <ToggleControl
                label={__("Description Visiblity")}
                checked={descriptionVisiblity}
                onChange={() =>
                  setAttributes({
                    descriptionVisiblity: !descriptionVisiblity,
                  })
                }
              />
            </div>
            <div className="setting-row">
              <ToggleControl
                label={__("Box Visiblity")}
                checked={boxVisiblity}
                onChange={() =>
                  setAttributes({
                    boxVisiblity: !boxVisiblity,
                  })
                }
              />
            </div>
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
        </div>
      </InspectorControls>
      <div className={`storyful-newswire`} style={sectionBgStyle}>
        <div className="newswire-container">
          <div className="newswire-upper-section">
            <div className="newswire-upper-left" style={alignStyle}>
              {titleVisiblity && (
                <div className="main-title" style={titleStyle}>
                  <RichText
                    tagName="h1"
                    placeholder={__("Title")}
                    value={title}
                    onChange={(newTitle) => setAttributes({ title: newTitle })}
                    className="title-text"
                  />
                </div>
              )}
              {descriptionVisiblity && (
                <RichText
                  tagName="p"
                  placeholder={__("Title")}
                  value={description}
                  onChange={(newDescription) =>
                    setAttributes({ description: newDescription })
                  }
                  className="description-text"
                  style={descriptionStyle}
                />
              )}
              {btnVisiblity && (
                <div className="btn btn-arrow">
                  <RichText
                    tagName="p"
                    className={"btn-main btn-primary"}
                    placeholder={__("Button Text")}
                    value={btnText}
                    onChange={(newBtnText) =>
                      setAttributes({ btnText: newBtnText })
                    }
                    style={btnStyle}
                  />
                </div>
              )}
            </div>
            <div className="newswire-upper-right">
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(e) => {
                    const newLeftImageArr = {};
                    newLeftImageArr.url = e.url;
                    newLeftImageArr.id = e.id;
                    newLeftImageArr.alt = e.alt;
                    newLeftImageArr.height = e.height;
                    newLeftImageArr.width = e.width;
                    setAttributes({
                      Image: newLeftImageArr,
                    });
                  }}
                  allowedTypes={"image"}
                  value={Image.id}
                  render={({ open }) =>
                    Image.url != "" ? (
                      <div className="image-preview image-controle-visible-hover show-items-hover-wrap">
                        <div className="image-controls small-icons">
                          <Tooltip
                            text={__("Edit Image")}
                            position="top center"
                          >
                            <i
                              onClick={open}
                              className="dashicons dashicons-edit edit-image"
                            ></i>
                          </Tooltip>
                          <Tooltip text={__("Remove Image", "storyful")}>
                            <i
                              className="dashicons dashicons-no-alt remove-image"
                              onClick={() => {
                                const newLeftImageArr = {};
                                newLeftImageArr.url = "";
                                newLeftImageArr.id = "";
                                newLeftImageArr.alt = "";
                                newLeftImageArr.height = "";
                                newLeftImageArr.width = "";
                                setAttributes({
                                  Image: newLeftImageArr,
                                });
                              }}
                            ></i>
                          </Tooltip>
                        </div>
                        <div className="newswire-inner-img">
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
                    ) : (
                      <div className="add-item-wrap">
                        <Tooltip text={__("Add Image")} position="top center">
                          <Button
                            onClick={open}
                            className="upload-img-btn button button-large"
                          >
                            {__("Upload Image")}
                          </Button>
                        </Tooltip>
                      </div>
                    )
                  }
                />
              </MediaUploadCheck>
            </div>
          </div>
          {boxVisiblity && (
            <div className="newswire-lower-section">
              {0 < listItems.length && (
                <div class="newswire-tab-section-main">
                  {listItems.map((data, index) => {
                    return (
                      <div data-key={index} className="newswire-tab-box">
                        <div className="accordian-text-title show-items-hover-wrap">
                          <div className="item-action-wrap show-items-hover">
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
                              <div className="image-controls small-icons">
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
                                            if (
                                              updatedItems.index > data.index
                                            ) {
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
                              </div>
                            )}
                          </div>
                          <RichText
                            tagName="h3"
                            placeholder={__("Enter Title", "storyful")}
                            className="newswire-inner-title"
                            value={data.title}
                            onChange={(value) => {
                              let arrayCopy = [...listItems];
                              arrayCopy[index].title = value;
                              setAttributes({ listItems: arrayCopy });
                            }}
                            style={boxTitleStyle}
                          />
                          <RichText
                            tagName="p"
                            placeholder={__("Enter Description", "storyful")}
                            className="newswire-tab-descriptions"
                            value={data.description}
                            onChange={(value) => {
                              let arrayCopy = [...listItems];
                              arrayCopy[index].description = value;
                              setAttributes({ listItems: arrayCopy });
                            }}
                            style={boxDescStyle}
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
                  addNewLItem();
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
          )}
        </div>
      </div>
    </Fragment>
  );
}

