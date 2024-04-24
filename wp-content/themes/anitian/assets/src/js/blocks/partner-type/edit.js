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
		titleColor,
		descriptionColor,
		buttonVisiblity,
		buttonTextColor,
		listItems,
		bgColor,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const titleStyle = {
		color: titleColor || '#333',
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || '#000',
	};

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || '#ffffff',
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
					btnText: '',
					imageID: '',
					imageURL: '',
					imageAlt: '',
					imageWidth: '',
					imageHeight: '',
				},
			],
		} );
	};

	const addNewItem = () => {
		if ( listItems.length > 8 ) {
			alert( 'Maximum 9 list item allowed.' );
		} else {
			const attr = {
				index: listItems.length,
				title: '',
				description: '',
				btnText: 'LEARN MORE',
				imageID: '',
				imageURL: '',
				imageAlt: '',
				imageWidth: '',
				imageHeight: '',
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
		value: descriptionColor,
		onChange: ( value ) => {
			setAttributes( {
				descriptionColor: value,
			} );
		},
		label: __( 'Description Color' ),
	} );

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
				className="wp-block-anitian-partner-type partner-type"
				style={ sectionBgStyle }
			>
				<div className="container">
					<div className="partner-type__head">
						{ headingVisiblity && (
							<RichText
								tagName="h2"
								placeholder={ __( 'Heading' ) }
								value={ Heading }
								onChange={ ( newHeading ) =>
									setAttributes( { Heading: newHeading } )
								}
								className="partner-type__heading"
								style={ headingStyle }
							/>
						) }
					</div>
					{ 0 < listItems.length && (
						<div className="partner-type__boxes has-3-columns">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<div className="show-items-hover-wrap">
											<div className="item-action-wrap show-items-hover">
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

												{ 1 < listItems.length && (
													<div className="image-controls small-icons">
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
													</div>
												) }
											</div>
											<div
												className={ `partner-type__box-wrap partner-type__box-${ index }` }
												key={ index }
												style={ alignStyle }
											>
												<div className="partner-type__box">
													<div className="partner-type__inner">
														<RichText
															tagName="h3"
															placeholder={ __(
																'Enter Title',
																'anitian'
															) }
															value={ data.title }
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
																setAttributes( {
																	listItems:
																		arrayCopy,
																} );
															} }
															style={ titleStyle }
															className="partner-type__box_title"
														/>
														<RichText
															tagName="p"
															placeholder={ __(
																'Enter Description',
																'anitian'
															) }
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
																descriptionStyle
															}
															className="partner-type__box_description"
														/>
													</div>
													<div className="btn-wrap">
														<RichText
															tagName="p"
															placeholder={ __(
																'Enter Button Text',
																'anitian'
															) }
															value={
																data.btnText
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
																].btnText = value;
																setAttributes( {
																	listItems:
																		arrayCopy,
																} );
															} }
															style={
																buttonStyle
															}
															className="partner-type__link"
														/>
													</div>
												</div>
												<div className="partner-type__image">
													{ data.imageURL ? (
														<Fragment>
															<div className="image-preview">
																<div className="image-controls small-icons image-action-wrap">
																	<MediaUploadCheck>
																		<MediaUpload
																			onSelect={ (
																				item
																			) => {
																				const arrayCopy =
																					[
																						...listItems,
																					];
																				arrayCopy[
																					index
																				].imageID =
																					item.id;
																				arrayCopy[
																					index
																				].imageURL =
																					item.url;
																				arrayCopy[
																					index
																				].imageAlt =
																					item.alt;
																				arrayCopy[
																					index
																				].imageWidth =
																					item.width;
																				arrayCopy[
																					index
																				].imageHeight =
																					item.height;
																				setAttributes(
																					{
																						listItems:
																							arrayCopy,
																					}
																				);
																			} }
																			allowedTypes={ [
																				'image',
																			] }
																			value={
																				data.imageID
																			}
																			render={ ( {
																				open,
																			} ) => {
																				return (
																					<Tooltip
																						text={ __(
																							'Edit Image',
																							'anitian'
																						) }
																					>
																						<i
																							className="dashicons dashicons-edit edit-image"
																							onClick={
																								open
																							}
																						></i>
																					</Tooltip>
																				);
																			} }
																		/>
																	</MediaUploadCheck>
																	<Tooltip
																		text={ __(
																			'Remove Image',
																			'anitian'
																		) }
																	>
																		<i
																			className="remove-item dashicons dashicons-no-alt"
																			onClick={ () => {
																				const imgDelete =
																					confirm(
																						__(
																							'Are you sure you want to delete this item?',
																							'anitian'
																						)
																					);
																				if (
																					true ===
																					imgDelete
																				) {
																					const arrayCopy =
																						[
																							...listItems,
																						];
																					arrayCopy[
																						index
																					].imageID =
																						'';
																					arrayCopy[
																						index
																					].imageURL =
																						'';
																					arrayCopy[
																						index
																					].imageAlt =
																						'';
																					arrayCopy[
																						index
																					].imageWidth =
																						'';
																					arrayCopy[
																						index
																					].imageHeight =
																						'';
																					setAttributes(
																						{
																							listItems:
																								arrayCopy,
																						}
																					);
																				}
																			} }
																		></i>
																	</Tooltip>
																</div>
																<img
																	src={
																		data.imageURL
																	}
																	alt={
																		data.imageAlt
																	}
																	width={
																		data.imageWidth
																	}
																	height={
																		data.imageHeight
																	}
																/>
															</div>
														</Fragment>
													) : (
														<div className="upload-image">
															<MediaUploadCheck>
																<MediaUpload
																	onSelect={ (
																		item
																	) => {
																		const arrayCopy =
																			[
																				...listItems,
																			];
																		arrayCopy[
																			index
																		].imageID =
																			item.id;
																		arrayCopy[
																			index
																		].imageURL =
																			item.url;
																		arrayCopy[
																			index
																		].imageAlt =
																			item.alt;
																		arrayCopy[
																			index
																		].imageWidth =
																			item.width;
																		arrayCopy[
																			index
																		].imageHeight =
																			item.height;
																		setAttributes(
																			{
																				listItems:
																					arrayCopy,
																			}
																		);
																	} }
																	allowedTypes={ [
																		'image',
																	] }
																	value={
																		data.imageURL
																	}
																	render={ ( {
																		open,
																	} ) => (
																		<div className="upload-wrap">
																			<Button
																				onClick={
																					open
																				}
																				className="button"
																			>
																				{ __(
																					'Select Image',
																					'anitian'
																				) }
																			</Button>
																		</div>
																	) }
																/>
															</MediaUploadCheck>
														</div>
													) }
												</div>
											</div>
										</div>
									</>
								);
							} ) }
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
					) }
				</div>
			</div>
		</Fragment>
	);
}
