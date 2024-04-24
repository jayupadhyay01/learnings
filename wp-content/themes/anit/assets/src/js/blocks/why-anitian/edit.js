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
		heading,
		HeadingColor,
		titleColor,
		descriptionColor,
		bgColor,
		boxColor,
		headingVisiblity,
		listItems,
	} = attributes;

	const headingStyle = {
		color: HeadingColor,
	};
	const titleStyle = {
		color: titleColor,
	};
	const descStyle = {
		color: descriptionColor,
	};
	const boxStyle = {
		background: boxColor,
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
	const addNewLItem = () => {
		const attr = {
			index: listItems.length,
			title: '',
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

	return (
		<Fragment>
			<InspectorControls>
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
							value: HeadingColor,
							onChange: ( value ) => {
								setAttributes( {
									HeadingColor: value,
								} );
							},
							label: __( 'Heading Color' ),
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
							value: boxColor,
							onChange: ( value ) => {
								setAttributes( {
									boxColor: value,
								} );
							},
							label: __( 'Box Color' ),
						},
					] }
					colors={ anitianColors }
				/>
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
				className="wp-block-anitian-why-anitian"
				style={ sectionBgStyle }
			>
				<div className="why-anitian-container">
					<div className="why-anitian-heading">
						{ headingVisiblity && (
							<RichText
								tagName="h2"
								placeholder={ __( 'Heading' ) }
								value={ heading }
								onChange={ ( newHeading ) =>
									setAttributes( { heading: newHeading } )
								}
								className="heading-text"
								style={ headingStyle }
							/>
						) }
					</div>

					{ 0 < listItems.length && (
						<div className="why-anitian-boxes">
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
												className="why-anitian-box"
												data-key={ index }
											>
												<div className="why-anitian-box-image">
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
												<div
													className="why-anitian-box-content"
													style={ boxStyle }
												>
													<div
														className="why-anitian-box-content-wrapper"
														style={ alignStyle }
													>
														<div className="why-anitian-box-title-wrapper">
															<i className="arrow">
																▼
															</i>
															<div className="why-anitian-box-title">
																<RichText
																	tagName="h3"
																	placeholder={ __(
																		'Enter Title Text',
																		'anitian'
																	) }
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
																		].title =
																			value;
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
																	className="why-anitian-box-title"
																/>
															</div>
														</div>
														<RichText
															tagName="p"
															placeholder={ __(
																'Enter Description Text',
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
															style={ descStyle }
															className="why-anitian-box-para"
														/>
													</div>
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
							addNewLItem();
						} }
					>
						<Tooltip text={ __( 'Add New Item', 'anitian' ) }>
							<i
								className="add-new-item dashicons dashicons-plus"
								aria-hidden="true"
							></i>
						</Tooltip>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
