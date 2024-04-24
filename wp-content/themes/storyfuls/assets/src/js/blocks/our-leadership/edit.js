/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import ServerSideRender from '@wordpress/server-side-render';
import { storyfulColors } from '../common';
import {
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import metadata from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.attributes.heading
 * @param  root0.setAttributes
 * @param  root0.attributes.selectedPosts
 * @param  root0.attributes.numberOfPosts
 * @param  root0.attributes.postOrderBy
 * @param  root0.attributes.postOrder
 * @param  root0.attributes.dots
 * @param  root0.attributes.arrows
 * @param  root0.attributes.autoplay
 * @param  root0.attributes.slideInfinite
 * @param  root0.attributes.bgImage
 * @param  root0.attributes.BgColor
 * @param  root0.attributes.titleColor
 * @param  root0.attributes.subtitleColor
 * @param  root0.attributes.descColor
 * @param  root0.className
 * @param  root0.attributes.bannerTitle
 * @param  root0.attributes.bannerTitleColor
 * @param  root0.attributes.buttonText
 * @param  root0.attributes.buttonLink
 * @param  root0.attributes.headingColor
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes: {
		heading,
		headingColor,
		bannerTitle,
		bannerTitleColor,
		buttonText,
		buttonLink,
		selectedPosts,
		numberOfPosts,
		postOrderBy,
		postOrder,
		bgImage,
		BgColor,
		titleColor,
		subtitleColor,
		descColor,
	},
	setAttributes,
	className,
} ) {
	const [ allPosts, setPosts ] = useState( [] );

	useEffect( () => {
		const postList = [];
		wp.apiFetch( { path: 'storyful_api/request/testimonial' } ).then(
			( items ) => {
				items.forEach( function ( item ) {
					postList.push( {
						label: item.title,
						value: item.id,
					} );
				} );
				setPosts( postList );
			}
		);
	}, [] );

	return (
		<>
			<InspectorControls>
				<div className="inspector-field">
					<PanelBody title={ __( 'Block Settings', 'storyful' ) }>
						<p>
							<strong>Heading</strong>
						</p>
						<RichText
							tagName="p"
							placeholder={ __( 'Enter Heading', 'storyful' ) }
							value={ heading }
							onChange={ ( newTitle ) => {
								setAttributes( { heading: newTitle } );
							} }
							style={ {
								border: '1px solid #000',
								padding: '5px 10px',
							} }
						/>
						<div className="inspector-field">
							<span className="storyful-control-label">
								Select Testimonials
							</span>
							<Select
								className="storyful-select-control"
								name="posttype"
								value={ selectedPosts }
								onChange={ ( newSelect ) => {
									setAttributes( {
										selectedPosts: newSelect,
									} );
								} }
								options={ allPosts }
								isMulti="true"
							/>
						</div>
						<div className="inspector-field">
							<span className="storyful-control-label">
								Show Number of Posts
							</span>
							<NumberControl
								isShiftStepEnabled={ true }
								onChange={ ( newVal ) => {
									setAttributes( { numberOfPosts: newVal } );
								} }
								shiftStep={ 1 }
								value={ numberOfPosts }
							/>
						</div>
						<div className="inspector-field">
							<SelectControl
								label={ __( 'Order', 'storyful' ) }
								value={ postOrder }
								options={ [
									{
										label: __( 'Descending', 'storyful' ),
										value: 'DESC',
									},
									{
										label: __( 'Ascending', 'storyful' ),
										value: 'ASC',
									},
								] }
								onChange={ ( newVal ) => {
									setAttributes( { postOrder: newVal } );
								} }
							/>
						</div>
						<div className="inspector-field">
							<p>
								<strong>Banner Title</strong>
							</p>
							<RichText
								tagName="p"
								placeholder={ __(
									'Enter Banner Title',
									'storyful'
								) }
								value={ bannerTitle }
								onChange={ ( newBannerTitle ) => {
									setAttributes( {
										bannerTitle: newBannerTitle,
									} );
								} }
								style={ {
									border: '1px solid #000',
									padding: '5px 10px',
								} }
							/>
						</div>
						<div className="inspector-field">
							<p>
								<strong>Button Text</strong>
							</p>
							<RichText
								tagName="p"
								placeholder={ __(
									'Enter Button Text',
									'storyful'
								) }
								value={ buttonText }
								onChange={ ( newbuttonText ) => {
									setAttributes( {
										buttonText: newbuttonText,
									} );
								} }
								style={ {
									border: '1px solid #000',
									padding: '5px 10px',
								} }
							/>
						</div>
						<div className="inspector-field">
							<p>
								<strong>Button Link</strong>
							</p>
							<RichText
								tagName="p"
								placeholder={ __(
									'Enter Button Link',
									'storyful'
								) }
								value={ buttonLink }
								onChange={ ( newbuttonLink ) => {
									setAttributes( {
										buttonLink: newbuttonLink,
									} );
								} }
								style={ {
									border: '1px solid #000',
									padding: '5px 10px',
								} }
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
					>
						<PanelColorSettings
							colorSettings={ [
								{
									value: BgColor,
									onChange: ( value ) => {
										setAttributes( {
											BgColor: value,
										} );
									},
									label: __( 'Background Color' ),
								},
							] }
							colors={ storyfulColors }
						/>
						<div className="setting-row">
							<label htmlFor="bg image">
								{ __( 'Block Background Image', 'storyful' ) }
							</label>
							<div className="setting-row">
								{ ! bgImage.url ? (
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={ [
												'image',
												'video',
											] }
											onSelect={ ( image ) => {
												const newImage = {};
												newImage.id = image.id;
												newImage.url = image.url;
												newImage.alt = image.alt;
												newImage.width = image.width;
												newImage.height = image.height;
												newImage.mediaType = image.type;
												newImage.mediaMime = image.mime;
												setAttributes( {
													bgImage: newImage,
												} );
											} }
											value={ bgImage.id }
											render={ ( { open } ) => (
												<Button
													className="button"
													onClick={ open }
												>
													{ __(
														'Select Image',
														'storyful'
													) }
												</Button>
											) }
										/>
									</MediaUploadCheck>
								) : (
									<>
										<div className={ 'image-preview' }>
											<img
												src={ bgImage.url }
												alt="Preview"
											/>
										</div>
										<MediaUploadCheck>
											<MediaUpload
												title={ __(
													'Replace image',
													'storyful'
												) }
												value={ bgImage.id }
												onSelect={ ( image ) => {
													const newImage = {};
													newImage.id = image.id;
													newImage.url = image.url;
													newImage.alt = image.alt;
													newImage.width =
														image.width;
													newImage.height =
														image.height;
													newImage.mediaType =
														image.type;
													newImage.mediaMime =
														image.mime;
													setAttributes( {
														bgImage: newImage,
													} );
												} }
												allowedTypes={ [
													'image',
													'video',
												] }
												render={ ( { open } ) => (
													<Button
														className="button"
														onClick={ open }
													>
														{ 'Replace image' }
													</Button>
												) }
											/>
											<Button
												className="button"
												onClick={ () => {
													setAttributes( {
														bgImage: '',
													} );
												} }
											>
												{ 'Remove image' }
											</Button>
										</MediaUploadCheck>
									</>
								) }
							</div>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
					>
						<div className="setting-row">
							<PanelColorSettings
								colorSettings={ [
									{
										value: headingColor,
										onChange: ( value ) => {
											setAttributes( {
												headingColor: value,
											} );
										},
										label: __( 'Heading Color' ),
									},
									{
										value: titleColor,
										onChange: ( value ) => {
											setAttributes( {
												titleColor: value,
											} );
										},
										label: __( 'Title Color' ),
									},
									{
										value: subtitleColor,
										onChange: ( value ) => {
											setAttributes( {
												subtitleColor: value,
											} );
										},
										label: __( 'Subtitle Color' ),
									},
									{
										value: descColor,
										onChange: ( value ) => {
											setAttributes( {
												descColor: value,
											} );
										},
										label: __( 'Description Color' ),
									},
									{
										value: bannerTitleColor,
										onChange: ( value ) => {
											setAttributes( {
												bannerTitleColor: value,
											} );
										},
										label: __( 'Banner Title Color' ),
									},
								] }
								colors={ storyfulColors }
							/>
						</div>
					</PanelBody>
				</div>
			</InspectorControls>
			<ServerSideRender
				block={ metadata.name }
				className={ className }
				attributes={ {
					heading,
					headingColor,
					bannerTitle,
					bannerTitleColor,
					buttonText,
					buttonLink,
					selectedPosts,
					numberOfPosts,
					postOrderBy,
					postOrder,
					bgImage,
					BgColor,
					titleColor,
					subtitleColor,
					descColor,
				} }
			/>
		</>
	);
}
