
import { __ } from '@wordpress/i18n';
import Select from "react-select";
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, RichText } from "@wordpress/block-editor";
import {
  PanelBody,
  __experimentalNumberControl as NumberControl,
  SelectControl,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";

import metadata from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param root0
 * @param root0.attributes
 * @param root0.attributes.heading
 * @param root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes: { heading, selectedPosts, numberOfPosts, postOrderBy, postOrder }, setAttributes, className, }) {
	const [allPosts, setPosts] = useState([]);
	useEffect(() => {
		const postList = [];
		wp.apiFetch({ path: "storyful_api/request/case_studies" }).then((items) => {
		items.forEach(function (item) {
			postList.push({
        label: __(item.title, "storyful"),
        value: __(item.id, "storyful"),
      });
		});
		setPosts(postList);
		});
	}, []);

  return (
    <>
      <InspectorControls>
        <div className="inspector-field">
          <PanelBody title={__("Block Settings", "storyful")}>
            <p>
              <strong>Heading</strong>
            </p>
            <RichText
              tagName="p"
              placeholder={__("Enter Heading", "storyful")}
              value={heading}
              onChange={(newTitle) => setAttributes({ heading: newTitle })}
			  style={{border: '1px solid #000',padding: '5px 10px'}}
            />
          </PanelBody>
        </div>
        <div className="inspector-field">
          <Select
            className="storyful-select-control"
            name="posttype"
            value={selectedPosts}
            onChange={(newSelect) => {
              setAttributes({ selectedPosts: newSelect });
            }}
            options={allPosts}
            isMulti="true"
          />
        </div>
        <div className="inspector-field">
          <span className="dotstore-control-label">Show Number of Posts</span>
          <NumberControl
            isShiftStepEnabled={true}
            onChange={(newVal) => {
              setAttributes({ numberOfPosts: newVal });
            }}
            shiftStep={1}
            value={numberOfPosts}
          />
        </div>
        <div className="inspector-field">
          <SelectControl
            label={__("Order", "storyful")}
            value={postOrder}
            options={[
              {
                label: __("Descending", "storyful"),
                value: "DESC",
              },
              {
                label: __("Ascending", "storyful"),
                value: "ASC",
              },
            ]}
            onChange={(newVal) => {
              setAttributes({ postOrder: newVal });
            }}
          />
        </div>
      </InspectorControls>
      <ServerSideRender
        block={metadata.name}
        className={className}
        attributes={{
          heading,
          selectedPosts,
          numberOfPosts,
          postOrderBy,
          postOrder,
        }}
      />
    </>
  );
}
