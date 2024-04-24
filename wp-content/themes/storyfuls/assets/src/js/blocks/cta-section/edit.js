/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { storyfulColors } from '../common';
import { Fragment } from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	Tooltip,
	ToggleControl,
	GradientPicker,
} from '@wordpress/components';

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
		bgLeftColor,
		bgRightColor,
		textAlignment,
		leftTitle,
		rightTitle,
		leftDescription,
		rightDescription,
		rightTitleColor,
		leftTitleColor,
		leftDescriptionColor,
		rightDescriptionColor,
		leftButtonText,
		rightButtonText,
		ButtonBgColor,
		ButtonTextColor,
		leftBtnVisiblity,
		rightBtnVisiblity,
		leftImage,
		rightImage,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const leftSectionBgStyle = {};
	bgLeftColor && ( leftSectionBgStyle.background = bgLeftColor );

	const rightSectionBgStyle = {};
	bgRightColor && ( rightSectionBgStyle.background = bgRightColor );

	const leftTitleStyle = {
		color: leftTitleColor || undefined,
	};
	const rightTitleStyle = {
		color: rightTitleColor || undefined,
	};
	const leftDescriptionStyle = {
		color: leftDescriptionColor || undefined,
	};
	const rightDescriptionStyle = {
		color: rightDescriptionColor || undefined,
	};
	const buttonStyle = {
		color: ButtonTextColor || undefined,
		background: ButtonBgColor || undefined,
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
							<label htmlFor="background-gradient">
								<strong>
									{ __(
										'Left CTA Background Color',
										'storyful'
									) }
								</strong>
							</label>
							<GradientPicker
								value={ bgLeftColor }
								onChange={ ( leftBgGradient ) => {
									setAttributes( {
										bgLeftColor: leftBgGradient,
									} );
								} }
								gradients={ [
									{
										name: 'Blue',
										gradient:
											'linear-gradient(90.9deg,#11152c .77%,#145980 130.71%)',
										slug: 'blue-linear',
									},
									{
										name: 'White',
										gradient:
											'linear-gradient(90deg, rgba(255,255,255,1) 18%, rgba(255,255,255,1) 130%)',
										slug: 'white-linear',
									},
									{
										name: 'JShine',
										gradient:
											'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
										slug: 'jshine',
									},
									{
										name: 'Rastafarie',
										gradient:
											'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
										slug: 'rastafari',
									},
								] }
							/>
						</div>
						<div className="setting-row">
							<label htmlFor="background-gradient">
								<strong>
									{ __(
										'Left CTA Background Color',
										'storyful'
									) }
								</strong>
							</label>
							<GradientPicker
								value={ bgRightColor }
								onChange={ ( rightBgGradient ) => {
									setAttributes( {
										bgRightColor: rightBgGradient,
									} );
								} }
								gradients={ [
									{
										name: 'Blue',
										gradient:
											'linear-gradient(90.9deg,#11152c .77%,#145980 130.71%)',
										slug: 'blue-linear',
									},
									{
										name: 'White',
										gradient:
											'linear-gradient(90deg, rgba(255,255,255,1) 18%, rgba(255,255,255,1) 130%)',
										slug: 'white-linear',
									},
									{
										name: 'JShine',
										gradient:
											'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
										slug: 'jshine',
									},
									{
										name: 'Rastafarie',
										gradient:
											'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
										slug: 'rastafari',
									},
								] }
							/>
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
										value: rightTitleColor,
										onChange: ( value ) => {
											setAttributes( {
												rightTitleColor: value,
											} );
										},
										label: __( 'Right Title Color' ),
									},
									{
										value: leftTitleColor,
										onChange: ( value ) => {
											setAttributes( {
												leftTitleColor: value,
											} );
										},
										label: __( 'Left Title Color' ),
									},
									{
										value: rightDescriptionColor,
										onChange: ( value ) => {
											setAttributes( {
												rightDescriptionColor: value,
											} );
										},
										label: __( 'Right Description Color' ),
									},
									{
										value: leftDescriptionColor,
										onChange: ( value ) => {
											setAttributes( {
												leftDescriptionColor: value,
											} );
										},
										label: __( 'Left Description Color' ),
									},
									...( leftBtnVisiblity || rightBtnVisiblity
										? [
												{
													value: ButtonBgColor,
													onChange: ( value ) => {
														setAttributes( {
															ButtonBgColor:
																value,
														} );
													},
													label: __(
														'Button Background Color'
													),
												},
												{
													value: ButtonTextColor,
													onChange: ( value ) => {
														setAttributes( {
															ButtonTextColor:
																value,
														} );
													},
													label: __(
														'Button Text Color'
													),
												},
										  ]
										: [] ),
								] }
								colors={ storyfulColors }
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Hide/Show Options' ) }
						initialOpen={ false }
						className="hideshow-block-setting"
					>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Left Button Visiblity' ) }
								checked={ leftBtnVisiblity }
								onChange={ () =>
									setAttributes( {
										leftBtnVisiblity: ! leftBtnVisiblity,
									} )
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Right Button Visiblity' ) }
								checked={ rightBtnVisiblity }
								onChange={ () =>
									setAttributes( {
										rightBtnVisiblity: ! rightBtnVisiblity,
									} )
								}
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
			<section className="wp-block-storyful-cta-section">
				<div className="container-fluid">
					<div
						className="cta-section__right"
						style={ leftSectionBgStyle }
					>
						<div className="intelligence-section">
							<div
								className="intelligence-section__details"
								style={ alignStyle }
							>
								<RichText
									tagName="h2"
									placeholder={ __( 'Left Title' ) }
									value={ leftTitle }
									onChange={ ( newleftTitle ) =>
										setAttributes( {
											leftTitle: newleftTitle,
										} )
									}
									className="section-title h1 with-darkbg"
									style={ leftTitleStyle }
								/>
								<RichText
									tagName="p"
									placeholder={ __( 'Left Description' ) }
									value={ leftDescription }
									onChange={ ( newleftDescription ) =>
										setAttributes( {
											leftDescription: newleftDescription,
										} )
									}
									className="cta-section-desc"
									style={ leftDescriptionStyle }
								/>
								<div
									className="sbtn sbtn-arrow-primary-v2"
									style={ buttonStyle }
								>
									<RichText
										tagName="p"
										placeholder={ __( 'Left Button' ) }
										value={ leftButtonText }
										onChange={ ( newleftButtonText ) =>
											setAttributes( {
												leftButtonText:
													newleftButtonText,
											} )
										}
										className="btn-text"
									/>
								</div>
							</div>
							<div className="intelligence-section__media">
								<div className="media-image-wrapper">
									<figure id="img-two">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( e ) => {
													const newLeftImageArr = {};
													newLeftImageArr.url = e.url;
													newLeftImageArr.id = e.id;
													newLeftImageArr.alt = e.alt;
													newLeftImageArr.height =
														e.height;
													newLeftImageArr.width =
														e.width;
													setAttributes( {
														leftImage:
															newLeftImageArr,
													} );
												} }
												allowedTypes={ 'image' }
												value={ leftImage.id }
												render={ ( { open } ) =>
													leftImage.url !== '' ? (
														<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
															<div className="image-controls small-icons">
																<Tooltip
																	text={ __(
																		'Edit Left Image'
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
																		'Remove Left Image',
																		'storyful'
																	) }
																>
																	<i
																		className="dashicons dashicons-no-alt remove-image"
																		onClick={ () => {
																			const newLeftImageArr =
																				{};
																			newLeftImageArr.url =
																				'';
																			newLeftImageArr.id =
																				'';
																			newLeftImageArr.alt =
																				'';
																			newLeftImageArr.height =
																				'';
																			newLeftImageArr.width =
																				'';
																			setAttributes(
																				{
																					Image: newLeftImageArr,
																				}
																			);
																		} }
																	></i>
																</Tooltip>
															</div>
															{ leftImage.url !==
																'' && (
																<img
																	src={
																		leftImage.url
																	}
																	height={
																		leftImage.height
																	}
																	width={
																		leftImage.width
																	}
																	alt={
																		leftImage.alt
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
																	'Add Left Image'
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
																		'Upload Left Image'
																	) }
																</Button>
															</Tooltip>
														</div>
													)
												}
											/>
										</MediaUploadCheck>
									</figure>
								</div>
							</div>
						</div>
					</div>
					<div
						className="cta-section__left"
						style={ rightSectionBgStyle }
					>
						<div className="cta-news-section">
							<div
								className="cta-news-section__details"
								style={ alignStyle }
							>
								<RichText
									tagName="h2"
									placeholder={ __( 'Right Title' ) }
									value={ rightTitle }
									onChange={ ( newrightTitle ) =>
										setAttributes( {
											rightTitle: newrightTitle,
										} )
									}
									className="section-title"
									style={ rightTitleStyle }
								/>
								<RichText
									tagName="p"
									placeholder={ __( 'Right Description' ) }
									value={ rightDescription }
									onChange={ ( newrightDescription ) =>
										setAttributes( {
											rightDescription:
												newrightDescription,
										} )
									}
									className="cta-section-desc"
									style={ rightDescriptionStyle }
								/>
								<div
									className="sbtn sbtn-arrow-primary-v2"
									style={ buttonStyle }
								>
									<RichText
										tagName="p"
										placeholder={ __( 'Left Button' ) }
										value={ rightButtonText }
										onChange={ ( newrightButtonText ) =>
											setAttributes( {
												rightButtonText:
													newrightButtonText,
											} )
										}
										className="btn-text"
									/>
								</div>
							</div>
							<div className="cta-news-section__media">
								<div className="media-image-wrapper">
									<figure id="img-one">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( e ) => {
													const newRightImageArr = {};
													newRightImageArr.url =
														e.url;
													newRightImageArr.id = e.id;
													newRightImageArr.alt =
														e.alt;
													newRightImageArr.height =
														e.height;
													newRightImageArr.width =
														e.width;
													setAttributes( {
														rightImage:
															newRightImageArr,
													} );
												} }
												allowedTypes={ 'image' }
												value={ rightImage.id }
												render={ ( { open } ) =>
													rightImage.url !== '' ? (
														<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
															<div className="image-controls small-icons">
																<Tooltip
																	text={ __(
																		'Edit Right Image'
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
																		'Remove Right Image',
																		'storyful'
																	) }
																>
																	<i
																		className="dashicons dashicons-no-alt remove-image"
																		onClick={ () => {
																			const newRightImageArr =
																				{};
																			newRightImageArr.url =
																				'';
																			newRightImageArr.id =
																				'';
																			newRightImageArr.alt =
																				'';
																			newRightImageArr.height =
																				'';
																			newRightImageArr.width =
																				'';
																			setAttributes(
																				{
																					Image: newRightImageArr,
																				}
																			);
																		} }
																	></i>
																</Tooltip>
															</div>
															{ rightImage.url !==
																'' && (
																<img
																	src={
																		rightImage.url
																	}
																	height={
																		rightImage.height
																	}
																	width={
																		rightImage.width
																	}
																	alt={
																		rightImage.alt
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
																	'Add Right Image'
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
																		'Upload Right Image'
																	) }
																</Button>
															</Tooltip>
														</div>
													)
												}
											/>
										</MediaUploadCheck>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
