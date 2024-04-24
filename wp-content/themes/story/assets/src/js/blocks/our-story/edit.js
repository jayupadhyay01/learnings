/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign, playbtn } from '../icons';
import { storyfulColors } from '../common';
import { Fragment } from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button, Tooltip } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		bgColor,
		textAlignment,
		title,
		bgImage,
		Image,
		Video,
		titleColor,
		description,
		descriptionColor,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {};
	bgColor && ( sectionBgStyle.background = bgColor );
	bgImage &&
		bgImage.url &&
		( sectionBgStyle.backgroundImage = `url(${ bgImage.url })` );
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<div className="storyful-block-sidebar">
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
					>
						<div className="setting-row">
							<label htmlFor="bg image">
								{ __( 'Image Background', 'storyful' ) }
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
										<div className="image-preview">
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
										value: bgColor,
										onChange: ( value ) => {
											setAttributes( {
												bgColor: value,
											} );
										},
										label: __( 'Background Color' ),
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
										value: descriptionColor,
										onChange: ( value ) => {
											setAttributes( {
												descriptionColor: value,
											} );
										},
										label: __( 'Description Color' ),
									},
								] }
								colors={ storyfulColors }
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Font Alignment' ) }
						initialOpen={ false }
					>
						<div className="setting-row">
							<div className="inspector-field-alignment inspector-field inspector-responsive">
								<div className="inspector-field-button-list inspector-field-button-list-fluid">
									<button
										className={ `inspector-button ${
											'left' === textAlignment
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setAttributes( {
												textAlignment: 'left',
											} )
										}
									>
										{ leftAlign }
									</button>
									<button
										className={ `inspector-button ${
											'center' === textAlignment
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setAttributes( {
												textAlignment: 'center',
											} )
										}
									>
										{ centerAlign }
									</button>
									<button
										className={ `inspector-button ${
											'right' === textAlignment
												? 'active'
												: ''
										}` }
										onClick={ () =>
											setAttributes( {
												textAlignment: 'right',
											} )
										}
									>
										{ rightAlign }
									</button>
								</div>
							</div>
						</div>
					</PanelBody>
				</div>
			</InspectorControls>
			<section className="wp-block-storyful-our-story">
				<div className="our-story-section" style={ sectionBgStyle }>
					<div className="container" style={ alignStyle }>
						<div className="our-story-section__left">
							<div className="text-section">
								<RichText
									tagName="p"
									placeholder={ __( 'Description' ) }
									value={ description }
									onChange={ ( newdescription ) =>
										setAttributes( {
											description: newdescription,
										} )
									}
									className="text-section__para"
									style={ descriptionStyle }
								/>
							</div>
						</div>
						<div className="our-story-section__right">
							<div className="media-section">
								<div className="our-story-text-wrapper">
									<RichText
										tagName="h3"
										placeholder={ __( 'Title' ) }
										value={ title }
										onChange={ ( newTitle ) =>
											setAttributes( { title: newTitle } )
										}
										className="story-title"
										style={ titleStyle }
									/>
								</div>
								<div className="media-video-wrapper">
									<div className="media-video">
										<button className="media-video__playbtn">
											{ playbtn }
										</button>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( e ) => {
													const newImageArr = {};
													newImageArr.url = e.url;
													newImageArr.id = e.id;
													newImageArr.alt = e.alt;
													newImageArr.height =
														e.height;
													newImageArr.width = e.width;
													setAttributes( {
														Image: newImageArr,
													} );
												} }
												allowedTypes={ 'image' }
												value={ Image.id }
												render={ ( { open } ) =>
													Image.url !== '' ? (
														<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
															<div className="image-controls small-icons">
																<Tooltip
																	text={ __(
																		'Edit Video Thumbnail'
																	) }
																	position="top center"
																>
																	<i
																		onClick={
																			open
																		}
																		className="dashicons dashicons-edit edit-image"
																	></i>
																</Tooltip>
																<Tooltip
																	text={ __(
																		'Remove Video Thumbnail',
																		'storyful'
																	) }
																>
																	<i
																		className="dashicons dashicons-no-alt remove-image"
																		onClick={ () => {
																			const newImageArr =
																				{};
																			newImageArr.url =
																				'';
																			newImageArr.id =
																				'';
																			newImageArr.alt =
																				'';
																			newImageArr.height =
																				'';
																			newImageArr.width =
																				'';
																			setAttributes(
																				{
																					Image: newImageArr,
																				}
																			);
																		} }
																	></i>
																</Tooltip>
															</div>

															{ Image.url !==
																'' && (
																<img
																	src={
																		Image.url
																	}
																	height={
																		Image.height
																	}
																	width={
																		Image.width
																	}
																	alt={
																		Image.alt
																	}
																	loading="lazy"
																	className="self-media"
																/>
															) }
														</div>
													) : (
														<div className="add-item-wrap">
															<Tooltip
																text={ __(
																	'Add Video Thumbnail'
																) }
																position="top center"
															>
																<Button
																	onClick={
																		open
																	}
																	className="upload-img-btn button button-large"
																>
																	{ __(
																		'Upload Video Thumbnail'
																	) }
																</Button>
															</Tooltip>
														</div>
													)
												}
											/>
										</MediaUploadCheck>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( e ) => {
													const newVideoArr = {};
													newVideoArr.url = e.url;
													newVideoArr.id = e.id;
													newVideoArr.alt = e.alt;
													newVideoArr.height =
														e.height;
													newVideoArr.width = e.width;
													setAttributes( {
														Video: newVideoArr,
													} );
												} }
												allowedTypes={ 'video' }
												value={ Video.id }
												render={ ( { open } ) =>
													Video.url !== '' ? (
														<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
															<div className="image-controls small-icons">
																<Tooltip
																	text={ __(
																		'Edit Video'
																	) }
																	position="top center"
																>
																	<i
																		onClick={
																			open
																		}
																		className="dashicons dashicons-edit edit-image"
																	></i>
																</Tooltip>
																<Tooltip
																	text={ __(
																		'Remove Video',
																		'storyful'
																	) }
																>
																	<i
																		className="dashicons dashicons-no-alt remove-image"
																		onClick={ () => {
																			const newVideoArr =
																				{};
																			newVideoArr.url =
																				'';
																			newVideoArr.id =
																				'';
																			newVideoArr.alt =
																				'';
																			newVideoArr.height =
																				'';
																			newVideoArr.width =
																				'';
																			setAttributes(
																				{
																					Video: newVideoArr,
																				}
																			);
																		} }
																	></i>
																</Tooltip>
															</div>

															{ Video.url !==
																'' && (
																<video
																	width={
																		1920
																	}
																	height={
																		600
																	}
																	id={
																		Video.id
																	}
																	autoPlay=""
																	muted="muted"
																	controls={
																		false
																	}
																>
																	<source
																		src={
																			Video.url
																		}
																		type={
																			Video.mediaMime
																		}
																	></source>
																</video>
															) }
														</div>
													) : (
														<div className="add-item-wrap">
															<Tooltip
																text={ __(
																	'Add Video'
																) }
																position="top center"
															>
																<Button
																	onClick={
																		open
																	}
																	className="upload-img-btn button button-large"
																>
																	{ __(
																		'Upload Video'
																	) }
																</Button>
															</Tooltip>
														</div>
													)
												}
											/>
										</MediaUploadCheck>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
