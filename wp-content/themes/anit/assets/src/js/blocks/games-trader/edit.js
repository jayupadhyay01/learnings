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
	Tooltip,
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
		Image,
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		cardHeading,
		cardHeadingColor,
		cardHeadingVisiblity,
		cardSubHeading,
		cardSubHeadingColor,
		cardSubHeadingVisiblity,
		cardDescription,
		cardDescriptionColor,
		cardDescriptionVisiblity,
		cardImage,
		bgColor,
		cardBgColor,
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
	const cardSubHeadingStyle = {
		color: cardSubHeadingColor || undefined,
	};
	const cardHeadingStyle = {
		color: cardHeadingColor || undefined,
	};
	const cardDescriptionStyle = {
		color: cardDescriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || undefined,
		background: buttonBgColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const blockBgStyle = {
		background: bgColor || undefined,
	};
	const cardBgStyle = {
		background: cardBgColor || undefined,
	};
	const cardGradStyle = {
		background: BgGradientColor || undefined,
	};
	const cardBgImgStyle = {
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
	if ( cardHeadingVisiblity ) {
		colorSettings.push( {
			value: cardHeadingColor,
			onChange: ( value ) => {
				setAttributes( {
					cardHeadingColor: value,
				} );
			},
			label: __( 'Card Heading Color' ),
		} );
	}
	if ( cardSubHeadingVisiblity ) {
		colorSettings.push( {
			value: cardSubHeadingColor,
			onChange: ( value ) => {
				setAttributes( {
					cardSubHeadingColor: value,
				} );
			},
			label: __( ' Card SubHeading Color' ),
		} );
	}
	if ( cardDescriptionVisiblity ) {
		colorSettings.push( {
			value: cardDescriptionColor,
			onChange: ( value ) => {
				setAttributes( {
					cardDescriptionColor: value,
				} );
			},
			label: __( 'Card Description Color' ),
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
		colorSettings.push( {
			value: buttonBgColor,
			onChange: ( value ) => {
				setAttributes( {
					buttonBgColor: value,
				} );
			},
			label: __( 'Button Background Color' ),
		} );
	}
	colorSettings.push( {
		value: cardBgColor,
		onChange: ( value ) => {
			setAttributes( {
				cardBgColor: value,
			} );
		},
		label: __( 'Card Background Color' ),
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background Settings', 'anitian' ) }
					initialOpen={ true }
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
							] }
							colors={ anitianColors }
						/>
					</div>
					<div className="setting-row">
						<label htmlFor="background-gradient">
							{ __(
								'Card Background Gradient Color',
								'anitian'
							) }
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
						<label htmlFor="bg image">
							{ __( 'Card Background Image', 'anitian' ) }
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
				className="wp-block-anitian-games-trader"
				style={ blockBgStyle }
			>
				<div className="games-trader-section block-container">
					<div
						className="games-trader-text-section"
						style={ alignStyle }
					>
						{ subHeadingVisiblity && (
							<RichText
								tagName="p"
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
									setAttributes( {
										Heading: newHeading,
									} )
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
					<div className="games-trader-img">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( e ) => {
									const newImageArr = {};
									newImageArr.url = e.url;
									newImageArr.id = e.id;
									newImageArr.alt = e.alt;
									newImageArr.height = e.height;
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
													text={ __( 'Edit Image' ) }
													position="top center"
												>
													<i
														onClick={ open }
														className="dashicons dashicons-edit edit-image"
													></i>
												</Tooltip>
												<Tooltip
													text={ __(
														'Remove Image',
														'anitian'
													) }
												>
													<i
														className="dashicons dashicons-no-alt remove-image"
														onClick={ () => {
															const newImageArr =
																{};
															newImageArr.url =
																'';
															newImageArr.id = '';
															newImageArr.alt =
																'';
															newImageArr.height =
																'';
															newImageArr.width =
																'';
															setAttributes( {
																Image: newImageArr,
															} );
														} }
													></i>
												</Tooltip>
											</div>
											<div className="games-trader-img-wrap">
												{ Image.url !== '' && (
													<img
														src={ Image.url }
														height={ Image.height }
														width={ Image.width }
														alt={ Image.alt }
														loading="lazy"
													/>
												) }
											</div>
										</div>
									) : (
										<div className="add-item-wrap">
											<Tooltip
												text={ __( 'Add Image' ) }
												position="top center"
											>
												<Button
													onClick={ open }
													className="upload-img-btn button button-large"
												>
													{ __( 'Upload Image' ) }
												</Button>
											</Tooltip>
										</div>
									)
								}
							/>
						</MediaUploadCheck>
					</div>
				</div>
				<div
					className="games-trader-card-section block-container"
					style={ cardGradStyle }
				>
					<div
						className="games-trader-card-bgimage"
						style={ cardBgImgStyle }
					>
						<div
							className="games-trader-card-wrapper"
							style={ cardBgStyle }
						>
							<div
								className="games-trader-card-text-section"
								style={ alignStyle }
							>
								{ cardSubHeadingVisiblity && (
									<RichText
										tagName="p"
										placeholder={ __( 'Card SubHeading' ) }
										value={ cardSubHeading }
										onChange={ ( newcardSubHeading ) =>
											setAttributes( {
												cardSubHeading:
													newcardSubHeading,
											} )
										}
										className="card-subheading-text"
										style={ cardSubHeadingStyle }
									/>
								) }
								{ cardHeadingVisiblity && (
									<RichText
										tagName="h2"
										placeholder={ __( 'Card Heading' ) }
										value={ cardHeading }
										onChange={ ( newcardHeading ) =>
											setAttributes( {
												cardHeading: newcardHeading,
											} )
										}
										className="card-heading-text"
										style={ cardHeadingStyle }
									/>
								) }
								{ cardDescriptionVisiblity && (
									<RichText
										tagName="p"
										placeholder={ __( 'Card Description' ) }
										value={ cardDescription }
										onChange={ ( newcardDescription ) =>
											setAttributes( {
												cardDescription:
													newcardDescription,
											} )
										}
										className="card-description-text"
										style={ cardDescriptionStyle }
									/>
								) }
								{ buttonVisiblity && (
									<RichText
										tagName="p"
										placeholder={ __( 'Button' ) }
										value={ buttonText }
										onChange={ ( newbuttonText ) =>
											setAttributes( {
												buttonText: newbuttonText,
											} )
										}
										className="games-trader-button"
										style={ buttonStyle }
									/>
								) }
							</div>
							<div className="games-trader-card-img">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( e ) => {
											const newImageArr = {};
											newImageArr.url = e.url;
											newImageArr.id = e.id;
											newImageArr.alt = e.alt;
											newImageArr.height = e.height;
											newImageArr.width = e.width;
											setAttributes( {
												cardImage: newImageArr,
											} );
										} }
										allowedTypes={ 'image' }
										value={ cardImage.id }
										render={ ( { open } ) =>
											cardImage.url !== '' ? (
												<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
													<div className="image-controls small-icons">
														<Tooltip
															text={ __(
																'Edit Image'
															) }
															position="top center"
														>
															<i
																onClick={ open }
																className="dashicons dashicons-edit edit-image"
															></i>
														</Tooltip>
														<Tooltip
															text={ __(
																'Remove Image',
																'anitian'
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
																			cardImage:
																				newImageArr,
																		}
																	);
																} }
															></i>
														</Tooltip>
													</div>
													<div className="games-trader-img-wrap">
														{ cardImage.url !==
															'' && (
															<img
																src={
																	cardImage.url
																}
																height={
																	cardImage.height
																}
																width={
																	cardImage.width
																}
																alt={
																	cardImage.alt
																}
																loading="lazy"
															/>
														) }
													</div>
												</div>
											) : (
												<div className="add-item-wrap">
													<Tooltip
														text={ __(
															'Add Card Image'
														) }
														position="top center"
													>
														<Button
															onClick={ open }
															className="upload-img-btn button button-large"
														>
															{ __(
																'Upload Card Image'
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
		</Fragment>
	);
}
