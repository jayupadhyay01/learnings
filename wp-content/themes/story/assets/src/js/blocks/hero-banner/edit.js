/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { storyfulColors } from '../common';

import { Fragment } from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
	RangeControl,
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
		textAlignment,
		title,
		titleColor,
		titleVisiblity,
		description,
		descriptionColor,
		descriptionVisiblity,
		bgImage,
		btnVisiblity,
		btnText,
		showBgOverlay,
		bgOverlayColor,
		bgOverlayOpacity,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const bgOverlayStyle = {
		backgroundColor: bgOverlayColor || undefined,
		opacity: bgOverlayOpacity || undefined,
	};

	const colorSettings = [];

	if ( titleVisiblity ) {
		colorSettings.push( {
			value: titleColor,
			onChange: ( value ) => {
				setAttributes( {
					titleColor: value,
				} );
			},
			label: __( 'Title Color' ),
		} );
	}

	if ( descriptionVisiblity ) {
		colorSettings.push( {
			value: descriptionColor,
			onChange: ( value ) => {
				setAttributes( {
					descriptionColor: value,
				} );
			},
			label: __( 'Description Color' ),
		} );
	}

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
						<ToggleControl
							label={ __( 'Show Overlay', 'storyful' ) }
							checked={ showBgOverlay }
							onChange={ () => {
								setAttributes( {
									showBgOverlay: ! showBgOverlay,
								} );
							} }
						/>
						{ showBgOverlay && (
							<Fragment>
								<div className="setting-row">
									<label htmlFor="background-overlay">
										{ __(
											'Background Overlay Color',
											'storyful'
										) }
									</label>
									<ColorPalette
										value={ bgOverlayColor }
										onChange={ () => {
											setAttributes( {
												bgOverlayColor: bgOverlayColor
													? bgOverlayColor
													: 'transparent',
											} );
										} }
										colors={ storyfulColors }
									/>
								</div>
								<div className="setting-row">
									<label htmlFor="background-overlay">
										{ __(
											'Background Overlay Opacity',
											'storyful'
										) }
									</label>
									<RangeControl
										min={ 0 }
										max={ 1 }
										step={ 0.1 }
										value={ bgOverlayOpacity }
										onChange={ () =>
											setAttributes( {
												bgOverlayOpacity,
											} )
										}
									/>
								</div>
							</Fragment>
						) }
					</PanelBody>
					{ colorSettings.length > 0 && (
						<PanelBody
							title={ __( 'Color Settings' ) }
							initialOpen={ false }
						>
							<div className="setting-row">
								<PanelColorSettings
									colorSettings={ colorSettings }
									colors={ storyfulColors }
								/>
							</div>
						</PanelBody>
					) }
					<PanelBody
						title={ __( 'Hide/Show Options' ) }
						initialOpen={ false }
						className="hideshow-block-setting"
					>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Title Visiblity' ) }
								checked={ titleVisiblity }
								onChange={ () =>
									setAttributes( {
										titleVisiblity: ! titleVisiblity,
									} )
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Description Visiblity' ) }
								checked={ descriptionVisiblity }
								onChange={ () =>
									setAttributes( {
										descriptionVisiblity:
											! descriptionVisiblity,
									} )
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Button Visiblity' ) }
								checked={ btnVisiblity }
								onChange={ () =>
									setAttributes( {
										btnVisiblity: ! btnVisiblity,
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
			<div className={ `storyful-hero-banner` }>
				<div
					className={ `hero-banner__background-image` }
					style={ sectionBgStyle }
				>
					{ showBgOverlay && (
						<span
							className="hero-banner__overlay"
							style={ bgOverlayStyle }
						></span>
					) }
					<div className="hero-banner__content-inner">
						<div
							className="hero-banner__content-inner-main"
							style={ alignStyle }
						>
							{ titleVisiblity && (
								<RichText
									tagName="h2"
									placeholder={ __( 'Title' ) }
									value={ title }
									onChange={ ( newTitle ) =>
										setAttributes( { title: newTitle } )
									}
									className="title-text"
									style={ titleStyle }
								/>
							) }
							{ descriptionVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Description' ) }
									value={ description }
									onChange={ ( newDescription ) =>
										setAttributes( {
											description: newDescription,
										} )
									}
									className="description-text"
									style={ descriptionStyle }
								/>
							) }
							{ btnVisiblity && (
								<div className="btn btn-arrow">
									<RichText
										tagName="p"
										className={ 'btn-main btn-primary' }
										placeholder={ __( 'Button Text' ) }
										value={ btnText }
										onChange={ ( newBtnText ) =>
											setAttributes( {
												btnText: newBtnText,
											} )
										}
									/>
								</div>
							) }
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
