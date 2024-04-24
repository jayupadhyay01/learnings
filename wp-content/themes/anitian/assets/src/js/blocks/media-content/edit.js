/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { anitianColors } from '../common';
const { Fragment, useEffect } = wp.element;

const {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} = wp.blockEditor;
const { PanelBody, ToggleControl, Button, Tooltip } = wp.components;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
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
		Image,
		bgColor,
		layout,
		subTitleVisibility,
		subtitleColor,
		listItems,
	} = attributes;

	const titleStyle = {
		color: titleColor,
	};
	const descriptionStyle = {
		color: descriptionColor,
	};
	const subtitleStyle = {
		color: subtitleColor,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor,
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
					subtitle: '',
					description: '',
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
		const attr = {
			index: listItems.length,
			title: '',
			subtitle: '',
			description: '',
			imageID: '',
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
		};
		setAttributes( {
			listItems: [ ...listItems, attr ],
		} );
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

	if ( subTitleVisibility && layout === 'layout2' ) {
		colorSettings.push( {
			value: subtitleColor,
			onChange: ( value ) => {
				setAttributes( {
					subtitleColor: value,
				} );
			},
			label: __( 'Subtitle Color' ),
		} );
	}
	colorSettings.push( {
		value: bgColor,
		onChange: ( value ) => {
			setAttributes( {
				bgColor: value,
			} );
		},
		label: __( 'Background Color' ),
	} );
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Settings', 'anitian-resources' ) }
				>
					<div className="setting-row">
						<div className="block-style-group">
							<Button
								className={
									'layout1' === layout
										? 'button active'
										: 'button'
								}
								onClick={ () => {
									setAttributes( {
										layout: 'layout1',
									} );
								} }
								value="layout1"
							>
								<label htmlFor="layout 1 settings">
									{ __( 'Layout 1', 'anitian-resources' ) }
								</label>
							</Button>
							<Button
								className={
									'layout2' === layout
										? 'button active'
										: 'button'
								}
								onClick={ () => {
									setAttributes( {
										layout: 'layout2',
									} );
								} }
								value="layout2"
							>
								<label htmlFor="layout 2 settings">
									{ __( 'Layout 2', 'anitian-resources' ) }
								</label>
							</Button>
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
					{ layout === 'layout2' && (
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Subtitle Visiblity' ) }
								checked={ subTitleVisibility }
								onChange={ () =>
									setAttributes( {
										subTitleVisibility:
											! subTitleVisibility,
									} )
								}
							/>
						</div>
					) }
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
				className="wp-block-anitian-media-content"
				style={ sectionBgStyle }
			>
				{ layout === 'layout1' && (
					<>
						<div className="media-content-container media-content-layout1">
							<div
								className="media-content-text"
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
							</div>
							<div className="media-content-image">
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
											Image.url != '' ? (
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
																			Image: newImageArr,
																		}
																	);
																} }
															></i>
														</Tooltip>
													</div>
													<div className="image-content-inner-img">
														{ Image.url != '' && (
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
															/>
														) }
													</div>
												</div>
											) : (
												<div className="add-item-wrap">
													<Tooltip
														text={ __(
															'Add Image'
														) }
														position="top center"
													>
														<Button
															onClick={ open }
															className="upload-img-btn button button-large"
														>
															{ __(
																'Upload Image'
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
					</>
				) }
				{ layout === 'layout2' && (
					<>
						{ 0 < listItems.length && (
							<div className="media-content-container media-content-layout2">
								{ listItems.map( ( data, index ) => {
									const itemClasses = `media-content-item show-items-hover-wrap ${
										index % 2 === 0
											? 'right-thumbnail'
											: 'left-thumbnail'
									}`;
									return (
										<>
											<div
												className={ itemClasses }
												data-key={ index }
											>
												<div className="item-action-wrap show-items-hover">
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
																							item.index !=
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
													className="media-content-text"
													style={ alignStyle }
												>
													{ subTitleVisibility && (
														<RichText
															tagName="p"
															placeholder={ __(
																'Subtitle'
															) }
															value={
																data.subtitle
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
																].subtitle = value;
																setAttributes( {
																	listItems:
																		arrayCopy,
																} );
															} }
															className="subtitletitle-text"
															style={
																subtitleStyle
															}
														/>
													) }
													{ titleVisiblity && (
														<RichText
															tagName="h2"
															placeholder={ __(
																'Title'
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
															className="title-text"
															style={ titleStyle }
														/>
													) }
													{ descriptionVisiblity && (
														<RichText
															tagName="p"
															placeholder={ __(
																'Description'
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
															className="description-text"
															style={
																descriptionStyle
															}
														/>
													) }
												</div>
												<div className="media-content-image">
													{ data.imageURL ? (
														<Fragment>
															<div className="image-preview image-controle-visible-hover show-items-hover-wrap">
																<div className="image-controls small-icons">
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
																			className="dashicons dashicons-no-alt remove-image"
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
							<Tooltip text={ __( 'Add New Item', 'anitian' ) }>
								<i
									className="add-new-item dashicons dashicons-plus"
									aria-hidden="true"
								></i>
							</Tooltip>
						</div>
					</>
				) }
			</div>
		</Fragment>
	);
}
