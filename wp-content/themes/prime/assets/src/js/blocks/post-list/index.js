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
 
 import postListEdit from './edit';
 
 /**
  * Every block starts by registering a new block type definition.
  *
  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
  */
 
 registerBlockType('jay/postlist', {
     title: __( 'Post List', 'md-prime' ),
     description: __( 'The Post List block shows the list of the Blog.', 'md-prime' ),
     icon: 'dashicons dashicons-admin-post fs-block-icon',
     category: 'jay',
     attributes: {
         postLimit: {
             type: 'number',
             default: 6
         },
         selectPostType: {
             type: 'string',
             default: 'post'
         }
     },
     keywords: [__( 'blog', 'jay' ), __( 'list', 'jay' ), __( 'md-prime', 'jay' ), __( 'block', 'jay' )],
     edit: postListEdit,
     save() {
         return null;
     },
 });
 