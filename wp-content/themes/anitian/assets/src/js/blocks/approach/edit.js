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
		buttonVisiblity,
		buttonText,
		buttonTextColor,
		buttonBgColor,
		listItems,
		listColor,
		bgColor,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || '#FFFFFF',
		background: buttonBgColor || '#ff6900',
	};
	const listStyle = {
		color: listColor || undefined,
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
					list: '',
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
				list: '',
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
		value: listColor,
		onChange: ( value ) => {
			setAttributes( {
				listColor: value,
			} );
		},
		label: __( 'List Item Color' ),
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
			<div className="wp-block-anitian-approach" style={ sectionBgStyle }>
				<div className="anitian-approach__left" style={ alignStyle }>
					<div className="anitian-approach__left__inner">
						{ headingVisiblity && (
							<RichText
								tagName="h2"
								placeholder={ __( 'Heading' ) }
								value={ Heading }
								onChange={ ( newHeading ) =>
									setAttributes( { Heading: newHeading } )
								}
								className="anitian-approach__heading"
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
								className="anitian-approach__desc"
								style={ descriptionStyle }
							/>
						) }

						<div className="hubspot-btn">
							{ buttonVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Button Text' ) }
									value={ buttonText }
									onChange={ ( newbuttonText ) =>
										setAttributes( {
											buttonText: newbuttonText,
										} )
									}
									className="btn-sm animated-button-orange thar-three"
									style={ buttonStyle }
								/>
							) }
						</div>
					</div>
				</div>
				<div className="anitian-approach__right" style={ alignStyle }>
					<div className="anitian-approach__right__inner">
						{ 0 < listItems.length && (
							<ul className="anitian-approach__items icon-is-center">
								{ listItems.map( ( data, index ) => {
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
													{ 1 < listItems.length && (
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
												<li
													className="anitian-approach__item"
													key={ index }
												>
													<i
														className="anitian-approach__icon fa fa-check is-small"
														aria-hidden="true"
													></i>
													<RichText
														tagName="span"
														placeholder={ __(
															'Enter List',
															'anitian'
														) }
														className="anitian-approach__title"
														value={ data.list }
														onChange={ (
															value
														) => {
															const arrayCopy = [
																...listItems,
															];
															arrayCopy[
																index
															].list = value;
															setAttributes( {
																listItems:
																	arrayCopy,
															} );
														} }
														style={ listStyle }
													/>
												</li>
											</div>
										</>
									);
								} ) }
							</ul>
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
					</div>
				</div>
			</div>
		</Fragment>
	);
}
