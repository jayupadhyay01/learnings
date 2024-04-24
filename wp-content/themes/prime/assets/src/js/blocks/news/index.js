/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('md-prime/news2', {
	title: __('News', 'md-prime'),
	icon: 'welcome-widgets-menus',
	description: __('News Rendering block.', 'md-prime'),
	category: 'jay',
	keywords: [__('News', 'md-prime'), __('block', 'md-prime')],
	attributes: {
		postPerPage: {
			type: 'number',
			default: 6,
		},
		title: {
			type: 'string',
			default: 'News',
		},
		buttonLabel: {
			type: 'string',
			default: 'Learn More',
		},
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
});
