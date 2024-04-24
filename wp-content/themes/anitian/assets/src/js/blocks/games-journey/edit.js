/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { anitianColors } from '../common';
import { Fragment } from '@wordpress/element';
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/blockEditor';
import {
	PanelBody,
	ToggleControl,
	GradientPicker,
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
		textAlignment,
		Heading,
		HeadingColor,
		headingVisiblity,
		buttonText,
		buttonTextColor,
		buttonBgColor,
		buttonVisiblity,
		BgGradientColor,
		bgImage,
		description,
		descriptionColor,
		descriptionVisiblity,
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		button2Text,
		button2TextColor,
		button2BgColor,
		button2Visiblity,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const subHeadingStyle = {
		color: subHeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || undefined,
		background: buttonBgColor || undefined,
	};
	const button2Style = {
		color: button2TextColor || undefined,
		background: button2BgColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: BgGradientColor || undefined,
	};
	const sectionImgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};

	const colorSettings = [];
	if ( headingVisiblity ) {
		colorSettings.push( {
			value: HeadingColor,
			onChange: ( value ) => {
				setAttributes( {
					HeadingColor: value,
				} );
			},
			label: __( 'Heading Color' ),
		} );
	}
	if ( subHeadingVisiblity ) {
		colorSettings.push( {
			value: subHeadingColor,
			onChange: ( value ) => {
				setAttributes( {
					subHeadingColor: value,
				} );
			},
			label: __( 'SubHeading Color' ),
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
	if ( buttonVisiblity ) {
		colorSettings.push( {
			value: buttonTextColor,
			onChange: ( value ) => {
				setAttributes( {
					buttonTextColor: value,
				} );
			},
			label: __( 'Button Text Color' ),
		} );
	}
	if ( button2Visiblity ) {
		colorSettings.push( {
			value: button2TextColor,
			onChange: ( value ) => {
				setAttributes( {
					button2TextColor: value,
				} );
			},
			label: __( 'Second Button Text Color' ),
		} );
	}
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Gradient Settings', 'anitian' ) }
					initialOpen={ true }
				>
					<div className="setting-row">
						<label htmlFor="background-gradient">
							<strong>
								{ __( 'Background Gradient Color', 'anitian' ) }
							</strong>
						</label>
						<GradientPicker
							value={ BgGradientColor }
							onChange={ ( currentGradient ) => {
								setAttributes( {
									BgGradientColor: currentGradient,
								} );
							} }
							gradients={ [
								{
									name: 'Black Radial',
									gradient:
										'radial-gradient(circle, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(231,171,61,1) 100%)',
									slug: 'moonlit-asteroid',
								},
								{
									name: 'Yellow',
									gradient:
										'linear-gradient(106deg, rgba(248,187,55,1) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 48%, rgba(0,0,0,1) 85%, rgba(248,187,55,1) 100%)',
									slug: 'moonlit-asteroid',
								},
								{
									name: 'Yellow Linear',
									gradient:
										'linear-gradient(85deg, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 19%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
									slug: 'moonlit-asteroid',
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
						{ buttonVisiblity && (
							<>
								<label htmlFor="background-gradient">
									<strong>
										{ __(
											'First Button Gradient Color',
											'anitian'
										) }
									</strong>
								</label>
								<GradientPicker
									value={ buttonBgColor }
									onChange={ ( buttonGradient ) => {
										setAttributes( {
											buttonBgColor: buttonGradient,
										} );
									} }
									gradients={ [
										{
											name: 'Yellow',
											gradient:
												'linear-gradient(106deg, rgba(252,228,99,1) 0%, rgba(248,187,55,1) 65%)',
											slug: 'moonlit-asteroid',
										},
										{
											name: 'Yellow Linear',
											gradient:
												'linear-gradient(85deg, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 19%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
											slug: 'moonlit-asteroid',
										},
										{
											name: 'Black Radial',
											gradient:
												'radial-gradient(circle, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(231,171,61,1) 100%)',
											slug: 'moonlit-asteroid',
										},
									] }
								/>
							</>
						) }
						{ button2Visiblity && (
							<>
								<label htmlFor="background-gradient">
									<strong>
										{ __(
											'Second Button Gradient Color',
											'anitian'
										) }
									</strong>
								</label>
								<GradientPicker
									value={ button2BgColor }
									onChange={ ( button2Gradient ) => {
										setAttributes( {
											button2BgColor: button2Gradient,
										} );
									} }
									gradients={ [
										{
											name: 'Black Radial',
											gradient:
												'radial-gradient(circle, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(231,171,61,1) 100%)',
											slug: 'moonlit-asteroid',
										},
										{
											name: 'Yellow Radial',
											gradient:
												'radial-gradient(circle, rgba(231,171,61,1) 4%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
											slug: 'moonlit-asteroid',
										},
										{
											name: 'Yellow Linear',
											gradient:
												'linear-gradient(85deg, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 19%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
											slug: 'moonlit-asteroid',
										},
									] }
								/>
							</>
						) }
					</div>
					<div className="setting-row">
						<label htmlFor="bg image">
							{ __( 'Block Background Image', 'anitian' ) }
						</label>
						<div className="setting-row">
							{ ! bgImage.url ? (
								<MediaUploadCheck>
									<MediaUpload
										allowedTypes={ [ 'image' ] }
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
													'anitian'
												) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							) : (
								<>
									<div className={ 'image-preview' }>
										{ bgImage.url && (
											<img
												src={ bgImage.url }
												alt="Preview"
											/>
										) }
									</div>
									<MediaUploadCheck>
										<MediaUpload
											title={ __(
												'Replace image',
												'anitian'
											) }
											value={ bgImage.id }
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
											allowedTypes={ [ 'image' ] }
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
				{ colorSettings.length > 0 && (
					<PanelBody
						title={ __( 'Color Settings' ) }
						initialOpen={ false }
					>
						<div className="setting-row">
							<PanelColorSettings
								colorSettings={ colorSettings }
								colors={ anitianColors }
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
							label={ __( 'Heading Visiblity' ) }
							checked={ headingVisiblity }
							onChange={ () =>
								setAttributes( {
									headingVisiblity: ! headingVisiblity,
								} )
							}
						/>
					</div>
					<div className="setting-row">
						<ToggleControl
							label={ __( 'SubHeading Visiblity' ) }
							checked={ subHeadingVisiblity }
							onChange={ () =>
								setAttributes( {
									subHeadingVisiblity: ! subHeadingVisiblity,
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
							checked={ buttonVisiblity }
							onChange={ () =>
								setAttributes( {
									buttonVisiblity: ! buttonVisiblity,
								} )
							}
						/>
					</div>
					<div className="setting-row">
						<ToggleControl
							label={ __( 'Second Button Visiblity' ) }
							checked={ button2Visiblity }
							onChange={ () =>
								setAttributes( {
									button2Visiblity: ! button2Visiblity,
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
										'left' === textAlignment ? 'active' : ''
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
			</InspectorControls>
			<div
				className="wp-block-anitian-games-journey"
				style={ sectionBgStyle }
			>
				<div
					className="games-journey-bgimage"
					style={ sectionImgStyle }
				>
					<div className="block-container">
						<div
							className="games-journey-section"
							style={ alignStyle }
						>
							{ subHeadingVisiblity && (
								<RichText
									tagName="h3"
									placeholder={ __( 'SubHeading' ) }
									value={ subHeading }
									onChange={ ( newsubHeading ) =>
										setAttributes( {
											subHeading: newsubHeading,
										} )
									}
									className="subheading-text"
									style={ subHeadingStyle }
								/>
							) }
							{ headingVisiblity && (
								<RichText
									tagName="h2"
									placeholder={ __( 'Heading' ) }
									value={ Heading }
									onChange={ ( newHeading ) =>
										setAttributes( { Heading: newHeading } )
									}
									className="heading-text"
									style={ headingStyle }
								/>
							) }
							{ descriptionVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Description' ) }
									value={ description }
									onChange={ ( newdescription ) =>
										setAttributes( {
											description: newdescription,
										} )
									}
									className="description-text"
									style={ descriptionStyle }
								/>
							) }
						</div>
						<div className="games-journey-btn-section">
							{ buttonVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Button First' ) }
									value={ buttonText }
									onChange={ ( newbuttonText ) =>
										setAttributes( {
											buttonText: newbuttonText,
										} )
									}
									className="games-journey-button"
									style={ buttonStyle }
								/>
							) }
							{ button2Visiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Button Second' ) }
									value={ button2Text }
									onChange={ ( newbutton2Text ) =>
										setAttributes( {
											button2Text: newbutton2Text,
										} )
									}
									className="games-journey-button2"
									style={ button2Style }
								/>
							) }
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
