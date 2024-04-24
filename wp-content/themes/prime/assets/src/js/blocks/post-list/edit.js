/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * React hook that is used to mark the components element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import {
	SelectControl,
	RangeControl,
	PanelBody,
} from '@wordpress/components';

/**
 * React hook that is used to mark the packages element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { Component, Fragment } from '@wordpress/element';

/**
 * React hook that is used to mark the server side render element.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
 */
 import ServerSideRender from '@wordpress/server-side-render';

//  import classnames from "classnames";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default class postListEdit extends Component {
    // state = {postTypeList:[]};
    constructor(props) {
        super(props);
        this.state = {
            postTypeList: [],
        };
    }

    componentDidMount(){
       // Fetch all post types

        wp.apiFetch({ path: '/wp/v2/types' }).then(postTypeItems => {
            let postTypeItemKey;
            let postTypeOptions = [];
            let excludePostTypes = ['attachment', 'wp_block', 'nav_menu_item', 'wp_navigation', 'wp_template', 'wp_template_part', 'page'];

            postTypeItemKey = Object.keys(postTypeItems).filter(
                postTypeItems => !excludePostTypes.includes(postTypeItems)
            );

            postTypeItemKey.forEach(function (item) {
                postTypeOptions.push({
                    label: postTypeItems[item].name,
                    value: postTypeItems[item].slug
                });
            });
            this.setState({ postTypeList: postTypeOptions });
        });

		// Fetch all post categories
		wp.apiFetch({ path: "/wp/v2/categories" }).then((items) => {
			CategoryKey.push({
				label: __( 'All Categories', 'jay' ),
				value: ''
			});
			items.map((item, index) => {
				CategoryKey.push({
					label: item.name,
					value: item.id,
				});
			});
			setAttributes({ categoryList: CategoryKey });
		});

    }

	render() {
		const { attributes, setAttributes } = this.props;
        const { postTypeList } = this.state;
		const { postLimit, selectPostType } = attributes;

		return (
    
			<Fragment>
				<InspectorControls>
				<div className="postlist-block-sidebar">
					<PanelBody title={__( 'Settings', 'jay' )} initialOpen={true}>
						<RangeControl
							label="Number Of Post"
							value={postLimit ? postLimit : 6}
							onChange={(postLimit) => setAttributes({ postLimit })}
							min={3}
							max={20}
						/>
						<SelectControl
							label={__('Post Type', 'jay')}
							value={selectPostType}
							options={postTypeList}
							onChange={(selectPostType) =>
								setAttributes({ selectPostType: selectPostType })
							}
						/>
					</PanelBody>
				</div>
				</InspectorControls>

                 <ServerSideRender
					block="jay/postlist"
					attributes={{
                        postLimit: postLimit,
                        selectPostType: selectPostType,
					}}
				/>
			</Fragment>
		);
	}
}
