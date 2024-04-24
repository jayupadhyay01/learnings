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
		description,
		descriptionColor,
		descriptionVisiblity,
		listItems,
		bgColor,
		Image,
		bgImage,
		titleColor,
		listDescColor,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const listDescStyle = {
		color: listDescColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || undefined,
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
					title: '',
					description: '',
				},
			],
		} );
	};

	const addNewItem = () => {
		if ( listItems.length > 9 ) {
			alert( 'Maximum 10 list item allowed.' );
		} else {
			const attr = {
				index: listItems.length,
				title: '',
				description: '',
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

	colorSettings.push( {
		value: titleColor,
		onChange: ( value ) => {
			setAttributes( {
				titleColor: value,
			} );
		},
		label: __( 'Title Color' ),
	} );

	colorSettings.push( {
		value: listDescColor,
		onChange: ( value ) => {
			setAttributes( {
				listDescColor: value,
			} );
		},
		label: __( 'Description List Color' ),
	} );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background Settings', 'anitian' ) }
					initialOpen={ true }
				>
					<div className="setting-row">
						<label htmlFor="bg">
							{ __( 'Background', 'anitian' ) }
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
				className="wp-block-anitian-partner-level"
				style={ sectionBgStyle }
			>
				<div className="container">
					<div className="partner-level__wrap">
						<div
							className="partner-level__left"
							style={ alignStyle }
						>
							{ headingVisiblity && (
								<RichText
									tagName="h2"
									placeholder={ __( 'Heading' ) }
									value={ Heading }
									onChange={ ( newHeading ) =>
										setAttributes( { Heading: newHeading } )
									}
									className="partner-level__heading"
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
									className="partner-level__main-desc"
									style={ descriptionStyle }
								/>
							) }
							{ 0 < listItems.length && (
								<div className="partner-level__items">
									{ listItems.map( ( data, index ) => {
										const iconClasses = [
											'partner-level__item-icon',
										];
										if ( index % 2 === 0 ) {
											iconClasses.push( 'icon-orange' );
										} else {
											iconClasses.push( 'icon-blue' );
										}
										if ( index === 2 ) {
											iconClasses.push(
												'icon-orange-and-blue'
											);
										}
										const iconClassName =
											iconClasses.join( ' ' );
										return (
											<>
												<div className="show-items-hover-wrap">
													<div className="item-action-wrap show-items-hover pos-abs">
														<div className="move-item">
															{ 0 < index && (
																<Tooltip
																	text={ __(
																		'Move Up',
																		'anitian'
																	) }
																>
																	<span
																		className="move-left dashicons dashicons-arrow-up-alt"
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
																		'Move Down',
																		'anitian'
																	) }
																>
																	<span
																		className="move-right dashicons dashicons-arrow-down-alt"
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
													<div className="partner-level__item">
														<div className="partner-level__item-heading-icon">
															<div
																className={
																	iconClassName
																}
															></div>
															<RichText
																tagName="h3"
																placeholder={ __(
																	'Enter Title',
																	'anitian'
																) }
																className="partner-level__item_title"
																value={
																	data.title
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
																	].title = value;
																	setAttributes(
																		{
																			listItems:
																				arrayCopy,
																		}
																	);
																} }
																style={
																	titleStyle
																}
															/>
														</div>
														<RichText
															tagName="p"
															placeholder={ __(
																'Enter Description',
																'anitian'
															) }
															className="partner-level__item_desc"
															value={
																data.description
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
																].description =
																	value;
																setAttributes( {
																	listItems:
																		arrayCopy,
																} );
															} }
															style={
																listDescStyle
															}
														/>
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
						<div className="partner-level__right">
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
																setAttributes( {
																	Image: newImageArr,
																} );
															} }
														></i>
													</Tooltip>
												</div>
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
				</div>
			</div>
		</Fragment>
	);
}
