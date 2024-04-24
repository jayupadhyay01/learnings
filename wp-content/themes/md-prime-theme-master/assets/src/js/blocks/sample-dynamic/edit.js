/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the server side render element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
 */
import ServerSideRender from '@wordpress/server-side-render';

/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/
 */
import { RichText, InspectorControls } from '@wordpress/block-editor';

/**
 * React hook that is used to mark the components element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { PanelBody } from '@wordpress/components';

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
export default function Edit({ attributes: { heading }, setAttributes }) {
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'md-prime')}>
					<RichText
						tagName="h2"
						placeholder={__('Enter Heading', 'md-prime')}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div>
				<ServerSideRender
					block="md-prime/sample-dynamic"
					attributes={{
						heading,
					}}
				/>
			</div>
		</>
	);
}
