/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { AnaEnterpriseColors } from "../common";
const { Component, Fragment } = wp.element;

const {
  RichText,
  InspectorControls,
  PanelColorSettings,
} = wp.blockEditor;
const {
  PanelBody,
  ToggleControl,
} = wp.components;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default class Edit extends Component {
  render() {
    const { attributes, setAttributes } = this.props;
    const {
      bgColor,
      textAlignment,
      title,
      titleColor,
      titleVisiblity,
      subTitle,
      subTitleVisiblity,
      description,
      descriptionVisiblity,
      subTitleColor,
      descriptionColor,
    } = attributes;

    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyle = {
      color: titleColor,
    };
    const subTitleStyle = {
      color: subTitleColor,
    };
    const descriptionStyle = {
      color: descriptionColor,
    };


    return (
      <Fragment>
        <InspectorControls>
          <div className="ana-enterprise-block-sidebar">
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
                      value: subTitleColor,
                      onChange: (value) => {
                        setAttributes({
                          subTitleColor: value,
                        });
                      },
                      label: __("Subtitle Color"),
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
                  colors={AnaEnterpriseColors}
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
                <ToggleControl
                  label={__("Subtitle Visiblity")}
                  checked={subTitleVisiblity}
                  onChange={() =>
                    setAttributes({
                      subTitleVisiblity: !subTitleVisiblity,
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
              </div>
            </PanelBody>
            <PanelBody title={__("Font Alignment")} initialOpen={false}>
              <div className="setting-row">
                <div className="inspector-field-alignment inspector-field inspector-responsive">
                  <div className="inspector-field-button-list inspector-field-button-list-fluid">
                    <button
                      className={`inspector-button ${"left" === textAlignment ? "active" : ""
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
                      className={`inspector-button ${"center" === textAlignment ? "active" : ""
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
                      className={`inspector-button ${"right" === textAlignment ? "active" : ""
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
        <div
          className="wp-block-ana-enterprise-content-block"
          style={sectionBgStyle}
        >
          <div className="content-block-container">
            <div className="content-block-inner" style={alignStyle}>
              {titleVisiblity && (
                <RichText
                  tagName="h2"
                  placeholder={__("Title")}
                  value={title}
                  onChange={(newTitle) => setAttributes({ title: newTitle })}
                  className="content-title-text"
                  style={titleStyle}
                />
              )}
              {subTitleVisiblity && (
                <RichText
                  tagName="h5"
                  placeholder={__("Sub Title")}
                  value={subTitle}
                  onChange={(newsubTitle) =>
                    setAttributes({ subTitle: newsubTitle })
                  }
                  className="content-subtitle-text"
                  style={subTitleStyle}
                />
              )}
              {descriptionVisiblity && (
                <RichText
                  tagName="p"
                  placeholder={__("Description Title")}
                  value={description}
                  onChange={(newdescription) =>
                    setAttributes({ description: newdescription })
                  }
                  className="content-description-text"
                  style={descriptionStyle}
                />
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
