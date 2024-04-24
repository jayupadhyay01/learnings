/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import "./editor.scss";
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { storyfulColors } from "../common";
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
      content,
      name,
      titleVisiblity,
      titleColor,
      nameColor,
      contentColor,
    } = attributes;
  
    const alignStyle = {};
    textAlignment && (alignStyle.textAlign = textAlignment);

    const sectionBgStyle = {};
    bgColor && (sectionBgStyle.background = bgColor);

    const titleStyle = {
      color: titleColor,
    };
    const contentStyle = {
      color: contentColor,
    };
    const nameStyle = {
      color: nameColor,
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
                      value: contentColor,
                      onChange: (value) => {
                        setAttributes({
                          contentColor: value,
                        });
                      },
                      label: __("Content Color"),
                    },
                    {
                      value: nameColor,
                      onChange: (value) => {
                        setAttributes({
                          nameColor: value,
                        });
                      },
                      label: __("Name Color"),
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
        <div className="testimonial-block">
          <div className="testimonial-container" style={sectionBgStyle}>
            <div className="testimonial-content-inner" style={alignStyle}>
              {titleVisiblity && (
                <RichText
                  tagName="h1"
                  placeholder={__("Title")}
                  value={title}
                  onChange={(newTitle) => setAttributes({ title: newTitle })}
                  className="testimonial-title-text"
                  style={titleStyle}
                />
              )}
              <RichText
                tagName="p"
                placeholder={__("Testimonial Content")}
                value={content}
                onChange={(newContent) =>
                  setAttributes({ content: newContent })
                }
                className="testimonial-content-text"
                style={contentStyle}
              />
              <RichText
                tagName="p"
                placeholder={__("Name Content")}
                value={name}
                onChange={(newName) => setAttributes({ name: newName })}
                className="testimonial-name-text"
                style={nameStyle}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
