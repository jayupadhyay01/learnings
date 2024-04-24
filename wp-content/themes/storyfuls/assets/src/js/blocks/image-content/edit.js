/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { useEffect } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { storyfulColors } from "../common";
const { Fragment } = wp.element;

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
        <PanelBody title={__("Color Settings")} initialOpen={false}>
          <div className="setting-row">
            <PanelColorSettings
              colorSettings={[
                {
                  value: bgColor,
                  onChange: (value) => {
                    setAttributes({
                      bgColor: value,
                    });
                  },
                  label: __("Background Color"),
                },
                {
                  value: titleColor,
                  onChange: (value) => {
                    setAttributes({
                      titleColor: value,
                    });
                  },
                  label: __("Title Color"),
                },
                {
                  value: descriptionColor,
                  onChange: (value) => {
                    setAttributes({
                      descriptionColor: value,
                    });
                  },
                  label: __("Description Color"),
                },
              ]}
              colors={storyfulColors}
            />
          </div>
        </PanelBody>
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
    <div {...useBlockProps()}>
      <div className="image-content-container" style={sectionBgStyle}>
        <div className="image-content-img">
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(e) => {
                const newImageArr = {};
                newImageArr.url = e.url;
                newImageArr.id = e.id;
                newImageArr.alt = e.alt;
                newImageArr.height = e.height;
                newImageArr.width = e.width;
                setAttributes({
                  Image: newImageArr,
                });
              }}
              allowedTypes={"image"}
              value={Image.id}
              render={({ open }) =>
                Image.url != "" ? (
                  <div className="image-preview image-controle-visible-hover show-items-hover-wrap">
                    <div className="image-controls small-icons">
                      <Tooltip text={__("Edit Image")} position="top center">
                        <i
                          onClick={open}
                          className="dashicons dashicons-edit edit-image"
                        ></i>
                      </Tooltip>
                      <Tooltip text={__("Remove Image", "storyful")}>
                        <i
                          className="dashicons dashicons-no-alt remove-image"
                          onClick={() => {
                            const newImageArr = {};
                            newImageArr.url = "";
                            newImageArr.id = "";
                            newImageArr.alt = "";
                            newImageArr.height = "";
                            newImageArr.width = "";
                            setAttributes({
                              Image: newImageArr,
                            });
                          }}
                        ></i>
                      </Tooltip>
                    </div>
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
        <div className="image-content-cntnt" style={alignStyle}>
          {0 < listItems.length && (
            <div className="image-content-cntnt-inner">
              {listItems.map((data, index) => {
                return (
                  <div
                    data-key={index}
                    className="content-box show-items-hover-wrap"
                  >
                    <div className="item-action-wrap show-items-hover">
                      <div className="move-item">
                        {0 < index && (
                          <Tooltip text={__("Move Up", "storyful")}>
                            <span
                              className="move-left dashicons dashicons-arrow-up-alt"
                              aria-hidden="true"
                              onClick={() => moveItem(index, index - 1)}
                            ></span>
                          </Tooltip>
                        )}
                        {index + 1 < listItems.length && (
                          <Tooltip text={__("Move Down", "storyful")}>
                            <span
                              className="move-right dashicons dashicons-arrow-down-alt"
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
                                    .filter((item) => item.index != data.index)
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
                        </div>
                      )}
                    </div>
                    {titleVisiblity && (
                      <RichText
                        tagName="h3"
                        placeholder={__("Enter Title", "storyful")}
                        className="title-item"
                        value={data.title}
                        onChange={(value) => {
                          let arrayCopy = [...listItems];
                          arrayCopy[index].title = value;
                          setAttributes({ listItems: arrayCopy });
                        }}
                        style={titleStyle}
                      />
                    )}
                    {descriptionVisiblity && (
                      <RichText
                        tagName="p"
                        placeholder={__("Enter Description", "storyful")}
                        className="description-item"
                        value={data.description}
                        onChange={(value) => {
                          let arrayCopy = [...listItems];
                          arrayCopy[index].description = value;
                          setAttributes({ listItems: arrayCopy });
                        }}
                        style={descriptionStyle}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
    </div>
  </Fragment>
);
}
