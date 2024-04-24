/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { storyfulColors } from "../common";
const { useEffect, Fragment } = wp.element;
const {
  RichText,
  InspectorControls,
  PanelColorSettings,
} = wp.blockEditor;
const {
  PanelBody,
  ToggleControl,
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
// export default class Edit extends Component {
export default function Edit({ attributes, setAttributes }) {

    const {
      textAlignmentLeft,
      textAlignmentRight,
      bgColor,
      titleLeft,
      titleColorLeft,
      titleVisiblityLeft,
      descriptionLeft,
      descriptionColorLeft,
      descriptionVisiblityLeft,
      btnVisiblityLeft,
      btnTextLeft,
      listItemsLeft,
      titleRight,
      titleColorRight,
      titleVisiblityRight,
      descriptionRight,
      descriptionColorRight,
      descriptionVisiblityRight,
      btnVisiblityRight,
      btnTextRight,
      listItemsRight,
      listVisiblityLeft,
      listVisiblityRight
    } = attributes;

    const alignStyleLeft = {};
    textAlignmentLeft && (alignStyleLeft.textAlign = textAlignmentLeft);
    const alignStyleRight = {};
    textAlignmentRight && (alignStyleRight.textAlign = textAlignmentRight);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyleLeft = {
      color: titleColorLeft,
    };
    const titleStyleRight = {
      color: titleColorRight,
    };

    const descriptionStyleLeft = {
      color: descriptionColorLeft,
    };
    const descriptionStyleRight = {
      color: descriptionColorRight,
    };

    useEffect(() => {
      if (0 === listItemsLeft.length) {
        initListLeft();
      }
      if (0 === listItemsRight.length) {
        initListRight();
      }
    }, []);

    const initListLeft = () => {
      setAttributes({
        listItemsLeft: [
          ...listItemsLeft,
          {
            index: 0,
            listLeft: "",
          },
        ],
      });
    };
    const addNewLItemLeft = () => {
      const attrLeft = {
        index: listItemsLeft.length,
        listLeft: "",
      };
      setAttributes({
        listItemsLeft: [...listItemsLeft, attrLeft],
      });
    };
    const moveItemLeft = (oldIndexLeft, newIndexLeft) => {
      const arrayCopyLeft = [...listItemsLeft];
      arrayCopyLeft[oldIndexLeft] = listItemsLeft[newIndexLeft];
      arrayCopyLeft[newIndexLeft] = listItemsLeft[oldIndexLeft];

      setAttributes({
        listItemsLeft: arrayCopyLeft,
      });
    };

      const initListRight = () => {
        setAttributes({
          listItemsRight: [
            ...listItemsRight,
            {
              index: 0,
              listRight: "",
            },
          ],
        });
      };
     const addNewLItemRight = () => {
       const attrRight = {
         index: listItemsRight.length,
         listRight: "",
       };
       setAttributes({
         listItemsRight: [...listItemsRight, attrRight],
       });
     };

    const moveItemRight = (oldIndexRight, newIndexRight) => {
      const arrayCopyRight = [...listItemsRight];
      arrayCopyRight[oldIndexRight] = listItemsRight[newIndexRight];
      arrayCopyRight[newIndexRight] = listItemsRight[oldIndexRight];

      setAttributes({
        listItemsRight: arrayCopyRight,
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
                      value: titleColorLeft,
                      onChange: (value) => {
                        setAttributes({
                          titleColorLeft: value,
                        });
                      },
                      label: __("Left Title Color"),
                    },
                    {
                      value: titleColorRight,
                      onChange: (value) => {
                        setAttributes({
                          titleColorRight: value,
                        });
                      },
                      label: __("Right Title Color"),
                    },
                    {
                      value: descriptionColorLeft,
                      onChange: (value) => {
                        setAttributes({
                          descriptionColorLeft: value,
                        });
                      },
                      label: __("Left Description Color"),
                    },
                    {
                      value: descriptionColorRight,
                      onChange: (value) => {
                        setAttributes({
                          descriptionColorRight: value,
                        });
                      },
                      label: __("Right Description Color"),
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
                  label={__("Title Left Visiblity")}
                  checked={titleVisiblityLeft}
                  onChange={() =>
                    setAttributes({
                      titleVisiblityLeft: !titleVisiblityLeft,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Title Right Visiblity")}
                  checked={titleVisiblityRight}
                  onChange={() =>
                    setAttributes({
                      titleVisiblityRight: !titleVisiblityRight,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Description Left Visiblity")}
                  checked={descriptionVisiblityLeft}
                  onChange={() =>
                    setAttributes({
                      descriptionVisiblityLeft: !descriptionVisiblityLeft,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Description Right Visiblity")}
                  checked={descriptionVisiblityRight}
                  onChange={() =>
                    setAttributes({
                      descriptionVisiblityRight: !descriptionVisiblityRight,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Button Left Visiblity")}
                  checked={btnVisiblityLeft}
                  onChange={() =>
                    setAttributes({
                      btnVisiblityLeft: !btnVisiblityLeft,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Button Right Visiblity")}
                  checked={btnVisiblityRight}
                  onChange={() =>
                    setAttributes({
                      btnVisiblityRight: !btnVisiblityRight,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Listing Left Visiblity")}
                  checked={listVisiblityLeft}
                  onChange={() =>
                    setAttributes({
                      listVisiblityLeft: !listVisiblityLeft,
                    })
                  }
                />
              </div>
              <div className="setting-row">
                <ToggleControl
                  label={__("Listing Right Visiblity")}
                  checked={listVisiblityRight}
                  onChange={() =>
                    setAttributes({
                      listVisiblityRight: !listVisiblityRight,
                    })
                  }
                />
              </div>
            </PanelBody>
            <PanelBody title={__("Font Alignment")} initialOpen={false}>
              <div className="setting-row">
                <div className="inspector-field-alignment inspector-field inspector-responsive">
                  <label>Left Section Alignment</label>
                  <div className="inspector-field-button-list inspector-field-button-list-fluid">
                    <button
                      className={`inspector-button ${
                        "left" === textAlignmentLeft ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentLeft: "left",
                        })
                      }
                    >
                      {leftAlign}
                    </button>
                    <button
                      className={`inspector-button ${
                        "center" === textAlignmentLeft ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentLeft: "center",
                        })
                      }
                    >
                      {centerAlign}
                    </button>
                    <button
                      className={`inspector-button ${
                        "right" === textAlignmentLeft ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentLeft: "right",
                        })
                      }
                    >
                      {rightAlign}
                    </button>
                  </div>
                </div>
              </div>
              <div className="setting-row">
                <div className="inspector-field-alignment inspector-field inspector-responsive">
                  <label>Right Section Alignment</label>
                  <div className="inspector-field-button-list inspector-field-button-list-fluid">
                    <button
                      className={`inspector-button ${
                        "left" === textAlignmentRight ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentRight: "left",
                        })
                      }
                    >
                      {leftAlign}
                    </button>
                    <button
                      className={`inspector-button ${
                        "center" === textAlignmentRight ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentRight: "center",
                        })
                      }
                    >
                      {centerAlign}
                    </button>
                    <button
                      className={`inspector-button ${
                        "right" === textAlignmentRight ? "active" : ""
                      }`}
                      onClick={() =>
                        setAttributes({
                          textAlignmentRight: "right",
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
        <div className={`storyful-social`}>
          <div className="social-container" style={sectionBgStyle}>
            <div className="social-left" style={alignStyleLeft}>
              {titleVisiblityLeft && (
                <div className="main-title" style={titleStyleLeft}>
                  <RichText
                    tagName="h1"
                    placeholder={__("Title")}
                    value={titleLeft}
                    onChange={(newTitleLeft) =>
                      setAttributes({ titleLeft: newTitleLeft })
                    }
                    className="title-text"
                  />
                </div>
              )}
              {descriptionVisiblityLeft && (
                <RichText
                  tagName="p"
                  placeholder={__("Description")}
                  value={descriptionLeft}
                  onChange={(newDescriptionLeft) =>
                    setAttributes({ descriptionLeft: newDescriptionLeft })
                  }
                  className="description-text"
                  style={descriptionStyleLeft}
                />
              )}
              {btnVisiblityLeft && (
                <div className="btn btn-arrow">
                  <RichText
                    tagName="p"
                    className={"btn-main btn-primary"}
                    placeholder={__("Button Text")}
                    value={btnTextLeft}
                    onChange={(newBtnTextLeft) =>
                      setAttributes({ btnTextLeft: newBtnTextLeft })
                    }
                  />
                </div>
              )}
              {listVisiblityLeft && (
                <div className="social-listings">
                  {0 < listItemsLeft.length && (
                    <div className="social-listings-inner">
                      {listItemsLeft.map((data, index) => {
                        return (
                          <ul
                            data-key={index}
                            className="listing-items show-items-hover-wrap"
                          >
                            <div className="item-action-wrap show-items-hover">
                              <div className="move-item">
                                {0 < index && (
                                  <Tooltip text={__("Move Up", "storyful")}>
                                    <span
                                      className="move-left dashicons dashicons-arrow-up-alt"
                                      aria-hidden="true"
                                      onClick={() =>
                                        moveItemLeft(index, index - 1)
                                      }
                                    ></span>
                                  </Tooltip>
                                )}
                                {index + 1 < listItemsLeft.length && (
                                  <Tooltip text={__("Move Down", "storyful")}>
                                    <span
                                      className="move-right dashicons dashicons-arrow-down-alt"
                                      onClick={() =>
                                        moveItemLeft(index, index + 1)
                                      }
                                    ></span>
                                  </Tooltip>
                                )}
                              </div>
                              {1 < listItemsLeft.length && (
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
                                          const updatedArray = listItemsLeft
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
                                            listItemsLeft: updatedArray,
                                          });
                                        }
                                      }}
                                    ></i>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                            <RichText
                              tagName="li"
                              placeholder={__("Enter Listing", "storyful")}
                              className="social-listing-item"
                              value={data.listLeft}
                              onChange={(value) => {
                                let arrayCopy = [...listItemsLeft];
                                arrayCopy[index].listLeft = value;
                                setAttributes({ listItemsLeft: arrayCopy });
                              }}
                            />
                          </ul>
                        );
                      })}
                    </div>
                  )}
                  <div
                    className="add-item-wrap"
                    onClick={() => {
                      addNewLItemLeft();
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
            <div className="social-right" style={alignStyleRight}>
              {titleVisiblityRight && (
                <div className="main-title" style={titleStyleRight}>
                  <RichText
                    tagName="h1"
                    placeholder={__("Title")}
                    value={titleRight}
                    onChange={(newTitleRight) =>
                      setAttributes({ titleRight: newTitleRight })
                    }
                    className="title-text"
                  />
                </div>
              )}
              {descriptionVisiblityRight && (
                <RichText
                  tagName="p"
                  placeholder={__("Description")}
                  value={descriptionRight}
                  onChange={(newDescriptionRight) =>
                    setAttributes({ descriptionRight: newDescriptionRight })
                  }
                  className="description-text"
                  style={descriptionStyleRight}
                />
              )}
              {btnVisiblityRight && (
                <div className="btn btn-arrow">
                  <RichText
                    tagName="p"
                    className={"btn-main btn-primary"}
                    placeholder={__("Button Text")}
                    value={btnTextRight}
                    onChange={(newBtnTextRight) =>
                      setAttributes({ btnTextRight: newBtnTextRight })
                    }
                  />
                </div>
              )}
              {listVisiblityRight && (
                <div className="social-listings">
                  {0 < listItemsRight.length && (
                    <div className="social-listings-inner">
                      {listItemsRight.map((data, index) => {
                        return (
                          <ul className="listing-items show-items-hover-wrap">
                            <div className="item-action-wrap show-items-hover">
                              <div className="move-item">
                                {0 < index && (
                                  <Tooltip text={__("Move Up", "storyful")}>
                                    <span
                                      className="move-left dashicons dashicons-arrow-up-alt"
                                      aria-hidden="true"
                                      onClick={() =>
                                        moveItemRight(index, index - 1)
                                      }
                                    ></span>
                                  </Tooltip>
                                )}
                                {index + 1 < listItemsRight.length && (
                                  <Tooltip text={__("Move Down", "storyful")}>
                                    <span
                                      className="move-right dashicons dashicons-arrow-down-alt"
                                      onClick={() =>
                                        moveItemRight(index, index + 1)
                                      }
                                    ></span>
                                  </Tooltip>
                                )}
                              </div>
                              {1 < listItemsRight.length && (
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
                                          const updatedArray = listItemsRight
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
                                            listItemsRight: updatedArray,
                                          });
                                        }
                                      }}
                                    ></i>
                                  </Tooltip>
                                </div>
                              )}
                            </div>
                            <RichText
                              tagName="li"
                              placeholder={__("Enter Listing", "storyful")}
                              className="social-listing-item"
                              value={data.listRight}
                              onChange={(value) => {
                                let arrayCopy = [...listItemsRight];
                                arrayCopy[index].listRight = value;
                                setAttributes({ listItemsRight: arrayCopy });
                              }}
                            />
                          </ul>
                        );
                      })}
                    </div>
                  )}
                  <div
                    className="add-item-wrap"
                    onClick={() => {
                      addNewLItemRight();
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
        </div>
      </Fragment>
    );
}
