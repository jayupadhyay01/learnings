// const { withSelect } = wp.data;
const { InspectorControls } = wp.editor;
const { Component, Fragment } = wp.element;
const { PanelBody, TextControl, RangeControl } = wp.components;
import ServerSideRender from '@wordpress/server-side-render';
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
//  class Display_News extends Component {
export default class Display_News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editingFlag: false,
		};
	}
	render() {
		const { attributes, setAttributes } = this.props;
		const { title, postPerPage, buttonLabel } = attributes;
		return (
			<>
				<InspectorControls>
					<PanelBody title={"Settings"} initialOpen={true}>
						<RangeControl
							label="Number Of Post"
							value={ postPerPage ? postPerPage : 6}
							onChange={  postPerPage => setAttributes( {postPerPage} ) }
							min={ 3 }
							max={ 20 }
						/>
						<Fragment>
							<TextControl
								label={"Enter Title"}
								value={title}
								onChange={title=>setAttributes({title})}
							/>
						</Fragment>
						<TextControl
							label={"Enter Button Label"}
							value={buttonLabel}
							onChange={buttonLabel=>setAttributes({buttonLabel})}
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block="md-prime/news2"
					attributes={{
						postPerPage: postPerPage,
						title: title,
						buttonLabel: buttonLabel
					}}
				/>
			</>
		);
	}
}
