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
import { Fragment, useEffect } from '@wordpress/element';
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
		BgGradientColor,
		bgImage,
		description,
		descriptionColor,
		descriptionVisiblity,
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		listItems,
		cardSubTitleColor,
		cardSubTitleVisiblity,
		cardTitleColor,
		cardTitleVisiblity,
		cardDescriptionColor,
		cardDescriptionVisiblity,
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
	const cardBgStyle = {
		background: cardBgColor || undefined,
	};
	const cardTitleStyle = {
		color: cardTitleColor || undefined,
	};
	const cardSubTitleStyle = {
		color: cardSubTitleColor || undefined,
	};
	const cardDescStyle = {
		color: cardDescriptionColor || undefined,
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
	useEffect( () => {
		if ( 0 === listItems.length ) {
			initList();
		}
	}, [] );

	const initList = () => {
		setAttributes( {
			listItems: [
				...listItems,
				{
					index: 0,
					cardTitle: '',
					carSubTitle: '',
					cardDescription: '',
					cardActive: '',
				},
			],
		} );
	};

	const addNewItem = () => {
		if ( listItems.length > 6 ) {
			alert( 'Maximum 7 statistics allowed.' );
		} else {
			const attr = {
				index: listItems.length,
				cardTitle: '',
				carSubTitle: '',
				cardDescription: '',
			};
			setAttributes( {
				listItems: [ ...listItems, attr ],
			} );
		}
	};

	const moveItem = ( oldIndex, newIndex ) => {
		const arrayCopy = [ ...listItems ];
		arrayCopy[ oldIndex ] = listItems[ newIndex ];
		arrayCopy[ newIndex ] = listItems[ oldIndex ];

		setAttributes( {
			listItems: arrayCopy,
		} );
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
	if ( cardTitleVisiblity ) {
		colorSettings.push( {
			value: cardTitleColor,
			onChange: ( value ) => {
				setAttributes( {
					cardTitleColor: value,
				} );
			},
			label: __( 'Card Title Color' ),
		} );
	}
	if ( cardSubTitleVisiblity ) {
		colorSettings.push( {
			value: cardSubTitleColor,
			onChange: ( value ) => {
				setAttributes( {
					cardSubTitleColor: value,
				} );
			},
			label: __( 'Card Subtitle Color' ),
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
									slug: 'black-radial',
								},
								{
									name: 'Yellow Radial',
									gradient:
										'radial-gradient(circle, rgba(231,171,61,1) 4%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
									slug: 'yellow-radial',
								},
								{
									name: 'Yellow Linear',
									gradient:
										'linear-gradient(85deg, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 19%, rgba(0,0,0,1) 79%, rgba(231,171,61,1) 100%)',
									slug: 'yellow-linear',
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
									'Prize Card Background Gradient',
									'anitian'
								) }
							</strong>
						</label>
						<GradientPicker
							value={ cardBgColor }
							onChange={ ( currentGradient ) => {
								setAttributes( {
									cardBgColor: currentGradient,
								} );
							} }
							gradients={ [
								{
									name: 'Yellow',
									gradient:
										'linear-gradient(50deg,rgba(226,167,72,1) 25%,rgba(252,232,103,1) 50%,rgba(226,167,72,1) 75%)',
									slug: 'yellow-asteroid',
								},
								{
									name: 'Yellow Active',
									gradient:
										'linear-gradient(106deg, rgba(252,228,99,1) 0%, rgba(248,187,55,1) 65%)',
									slug: 'yellow-active',
								},
								{
									name: 'Black Radial',
									gradient:
										'radial-gradient(circle, rgba(231,171,61,1) 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%, rgba(231,171,61,1) 100%)',
									slug: 'black-radial',
								},
							] }
						/>
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
							label={ __( 'Card Title Visiblity' ) }
							checked={ cardTitleVisiblity }
							onChange={ () =>
								setAttributes( {
									cardTitleVisiblity: ! cardTitleVisiblity,
								} )
							}
						/>
					</div>
					<div className="setting-row">
						<ToggleControl
							label={ __( 'Card Subtitle Visiblity' ) }
							checked={ cardSubTitleVisiblity }
							onChange={ () =>
								setAttributes( {
									cardSubTitleVisiblity:
										! cardSubTitleVisiblity,
								} )
							}
						/>
					</div>
					<div className="setting-row">
						<ToggleControl
							label={ __( 'Card Description Visiblity' ) }
							checked={ cardDescriptionVisiblity }
							onChange={ () =>
								setAttributes( {
									cardDescriptionVisiblity:
										! cardDescriptionVisiblity,
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
				className="wp-block-anitian-games-prize"
				style={ sectionBgStyle }
			>
				<div className="games-prize-bgimage" style={ sectionImgStyle }>
					<div className="block-container">
						<div
							className="games-prize-section"
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
						<div>
							{ 0 < listItems.length && (
								<div className="games-prize-cards-section">
									{ listItems.map( ( data, index ) => {
										return (
											<>
												<div className="show-items-hover-wrap">
													<div className="item-action-wrap show-items-hover pos-abs">
														<div className="move-item">
															{ 0 < index && (
																<Tooltip
																	text={ __(
																		'Move Left',
																		'anitian'
																	) }
																>
																	<span
																		className="dashicons dashicons-arrow-left-alt move-left"
																		aria-hidden="true"
																		onClick={ () =>
																			moveItem(
																				index,
																				index -
																					1
																			)
																		}
																	></span>
																</Tooltip>
															) }
															{ index + 1 <
																listItems.length && (
																<Tooltip
																	text={ __(
																		'Move Right',
																		'anitian'
																	) }
																>
																	<span
																		className="dashicons dashicons-arrow-right-alt move-right"
																		onClick={ () =>
																			moveItem(
																				index,
																				index +
																					1
																			)
																		}
																	></span>
																</Tooltip>
															) }
														</div>
														{ 1 <
															listItems.length && (
															<Tooltip
																text={ __(
																	'Remove Item',
																	'anitian'
																) }
															>
																<i
																	className="remove-item dashicons dashicons-no-alt"
																	onClick={ () => {
																		const toDelete =
																			confirm(
																				__(
																					'Are you sure you want to delete this item?',
																					'anitian'
																				)
																			);
																		if (
																			true ===
																			toDelete
																		) {
																			const updatedArray =
																				listItems
																					.filter(
																						(
																							item
																						) =>
																							item.index !==
																							data.index
																					)
																					.map(
																						(
																							updatedItems
																						) => {
																							if (
																								updatedItems.index >
																								data.index
																							) {
																								updatedItems.index -= 1;
																							}
																							return updatedItems;
																						}
																					);
																			setAttributes(
																				{
																					listItems:
																						updatedArray,
																				}
																			);
																		}
																	} }
																></i>
															</Tooltip>
														) }
													</div>
													<div
														className={ `games-prize-card-wrap ${
															index === 0
																? 'long-active'
																: ''
														}` }
													>
														<div
															className="games-prize-card-item"
															key={ index }
															style={
																cardBgStyle
															}
														>
															{ cardSubTitleVisiblity && (
																<RichText
																	tagName="p"
																	placeholder={ __(
																		'Enter Subtitle',
																		'anitian'
																	) }
																	className="games-prize-card-Subtitle"
																	value={
																		data.carSubTitle
																	}
																	onChange={ (
																		value
																	) => {
																		const arrayCopy =
																			[
																				...listItems,
																			];
																		arrayCopy[
																			index
																		].carSubTitle =
																			value;
																		setAttributes(
																			{
																				listItems:
																					arrayCopy,
																			}
																		);
																	} }
																	style={
																		cardSubTitleStyle
																	}
																/>
															) }
															{ cardTitleVisiblity && (
																<RichText
																	tagName="h3"
																	placeholder={ __(
																		'Enter Card Title',
																		'anitian'
																	) }
																	className="games-prize-card-title"
																	value={
																		data.cardTitle
																	}
																	onChange={ (
																		value
																	) => {
																		const arrayCopy =
																			[
																				...listItems,
																			];
																		arrayCopy[
																			index
																		].cardTitle =
																			value;
																		setAttributes(
																			{
																				listItems:
																					arrayCopy,
																			}
																		);
																	} }
																	style={
																		cardTitleStyle
																	}
																/>
															) }
															{ cardDescriptionVisiblity && (
																<RichText
																	tagName="p"
																	placeholder={ __(
																		'Enter Description',
																		'anitian'
																	) }
																	className="games-prize-card-description"
																	value={
																		data.cardDescription
																	}
																	onChange={ (
																		value
																	) => {
																		const arrayCopy =
																			[
																				...listItems,
																			];
																		arrayCopy[
																			index
																		].cardDescription =
																			value;
																		setAttributes(
																			{
																				listItems:
																					arrayCopy,
																			}
																		);
																	} }
																	style={
																		cardDescStyle
																	}
																/>
															) }
														</div>
													</div>
												</div>
											</>
										);
									} ) }
								</div>
							) }
							<div
								className="add-item-wrap"
								onClick={ () => {
									addNewItem();
								} }
							>
								<Tooltip
									text={ __( 'Add New Item', 'anitian' ) }
								>
									<i
										className="add-new-item dashicons dashicons-plus"
										aria-hidden="true"
									></i>
								</Tooltip>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
