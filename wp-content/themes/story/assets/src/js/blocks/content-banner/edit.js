/* eslint-disable no-unused-expressions */
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
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	Button,
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
		bgColor,
		textAlignment,
		title,
		bgImage,
		titleColor,
		buttonText,
		buttonVisiblity,
		showBgOverlay,
		bgOverlayColor,
		bgOverlayOpacity,
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
	const bgOverlayStyle = {
		backgroundColor: bgOverlayColor || undefined,
		opacity: bgOverlayOpacity || undefined,
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
										onChange={ ( newColor ) => {
											setAttributes( {
												bgOverlayColor:
													newColor || 'transparent',
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
										onChange={ ( newValue ) => {
											setAttributes( {
												bgOverlayOpacity: newValue,
											} );
										} }
									/>
								</div>
							</Fragment>
						) }
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
								label={ __( 'Button Visiblity' ) }
								checked={ buttonVisiblity }
								onChange={ () =>
									setAttributes( {
										buttonVisiblity: ! buttonVisiblity,
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
			<div className="wp-block-storyful-content-banner">
				{ showBgOverlay && (
					<span
						className="storyful__overlay"
						style={ bgOverlayStyle }
					></span>
				) }
				<div
					className="content-banner-container"
					style={ sectionBgStyle }
				>
					<div className="content-banner-inner" style={ alignStyle }>
						<RichText
							tagName="h2"
							placeholder={ __( 'Title' ) }
							value={ title }
							onChange={ ( newTitle ) =>
								setAttributes( { title: newTitle } )
							}
							className="content-title-text"
							style={ titleStyle }
						/>
						{ buttonVisiblity && (
							<div className="content-banner-btn">
								<RichText
									tagName="p"
									placeholder={ __( 'Button Text' ) }
									value={ buttonText }
									onChange={ ( newButtonText ) =>
										setAttributes( {
											buttonText: newButtonText,
										} )
									}
									className="btn-banner"
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</Fragment>
	);
}
