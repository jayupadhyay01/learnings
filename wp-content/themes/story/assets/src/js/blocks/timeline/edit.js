/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-alert */
/* eslint-disable no-unused-expressions */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { storyfulColors } from '../common';
import { Fragment, useEffect } from '@wordpress/element';
import {
	PanelBody,
	Button,
	Tooltip,
	ToggleControl,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

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
		bgImage,
		titleColor,
		subtitleColor,
		textAlignment,
		descriptionColor,
		titleVisiblity,
		subtitleVisiblity,
		navTitleColor,
		listItems,
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
	const subtitleStyle = {
		color: subtitleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const navTitleStyle = {
		color: navTitleColor || undefined,
	};
	useEffect( () => {
		if ( 0 === listItems.length ) {
			initList();
		}
	}, [ listItems ] );

	const initList = () => {
		setAttributes( {
			listItems: [
				...listItems,
				{
					index: 0,
					year: '',
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
		if ( listItems.length > 5 ) {
			alert( 'Maximum 6 statistics allowed.' );
		} else {
			const attr = {
				index: listItems.length,
				year: '',
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
			reloadSlider();
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

	useEffect( () => {
		reloadSlider();
		initslider();
	}, [] );

	const initslider = () => {
		if ( ! jQuery( '.wrapper' ).hasClass( 'slick-initialized' ) ) {
			setTimeout( () => {
				jQuery( '.wrapper' ).slick( {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.year-nav',
					touchMove: false,
					swipe: false,
				} );
			}, 1000 );
		}
		if ( ! jQuery( '.year-nav' ).hasClass( 'slick-initialized' ) ) {
			setTimeout( () => {
				jQuery( '.year-nav' ).slick( {
					slidesToShow: 6,
					slidesToScroll: 1,
					asNavFor: '.wrapper',
					dots: false,
					centerMode: true,
					focusOnSelect: true,
					touchMove: false,
					swipe: false,
				} );
			}, 1000 );
		}
	};

	const reloadSlider = () => {
		const sliderFor = jQuery( '.wrapper' );
		if ( sliderFor.hasClass( 'slick-initialized' ) ) {
			sliderFor.slick( 'unslick' );
			setTimeout( () => {
				initslider();
			}, 500 );
		}
		const sliderNav = jQuery( '.year-nav' );
		if ( sliderNav.hasClass( 'slick-initialized' ) ) {
			sliderNav.slick( 'unslick' );
			setTimeout( () => {
				initslider();
			}, 500 );
		}
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
											reloadSlider();
										},
										label: __( 'Background Color' ),
									},
									...( titleVisiblity
										? [
												{
													value: titleColor,
													onChange: ( value ) => {
														setAttributes( {
															titleColor: value,
														} );
														reloadSlider();
													},
													label: __( 'Title Color' ),
												},
										  ]
										: [] ),
									...( subtitleVisiblity
										? [
												{
													value: subtitleColor,
													onChange: ( value ) => {
														setAttributes( {
															subtitleColor:
																value,
														} );
													},
													label: __(
														'Subtitle Color'
													),
												},
										  ]
										: [] ),
									{
										value: descriptionColor,
										onChange: ( value ) => {
											setAttributes( {
												descriptionColor: value,
											} );
											reloadSlider();
										},
										label: __( 'Description Color' ),
									},
									{
										value: navTitleColor,
										onChange: ( value ) => {
											setAttributes( {
												navTitleColor: value,
											} );
											reloadSlider();
										},
										label: __( 'Nav Title Color' ),
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
								label={ __( 'Subtitle Visiblity' ) }
								checked={ subtitleVisiblity }
								onChange={ () =>
									setAttributes( {
										subtitleVisiblity: ! subtitleVisiblity,
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
			<section
				className="wp-block-storyful-timeline"
				style={ sectionBgStyle }
			>
				<div className="container">
					{ 0 < listItems.length && (
						<div className="wrapper">
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
																'storyful'
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
																'storyful'
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
																'storyful'
															) }
														>
															<i
																className="remove-item dashicons dashicons-no-alt"
																onClick={ () => {
																	const toDelete =
																		confirm(
																			__(
																				'Are you sure you want to delete this item?',
																				'storyful'
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
												className="wrapper__item"
												key={ index }
											>
												<div className="wrapper__box-inner">
													<div className="timeline-item-img">
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
																								'storyful'
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
																				'storyful'
																			) }
																		>
																			<i
																				className="remove-item dashicons dashicons-no-alt"
																				onClick={ () => {
																					const imgDelete =
																						confirm(
																							__(
																								'Are you sure you want to delete this item?',
																								'storyful'
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
																						'storyful'
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
														className="timeline-details-wrapper"
														style={ alignStyle }
													>
														{ titleVisiblity && (
															<RichText
																tagName="h3"
																placeholder={ __(
																	'Enter Title',
																	'storyful'
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
																className="timeline-item-title"
															/>
														) }
														{ subtitleVisiblity && (
															<RichText
																tagName="h4"
																placeholder={ __(
																	'Enter Subtitle',
																	'storyful'
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
																	].subtitle =
																		value;
																	setAttributes(
																		{
																			listItems:
																				arrayCopy,
																		}
																	);
																} }
																style={
																	subtitleStyle
																}
																className="timeline-item-subtitle"
															/>
														) }
														<RichText
															tagName="p"
															placeholder={ __(
																'Enter Description',
																'storyful'
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
															className="timeline-item-desc"
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
					{ 0 < listItems.length && (
						<div className="year-nav">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<div
											className="year-nav__item"
											key={ index }
										>
											<RichText
												tagName="h4"
												placeholder={ __(
													'Enter Year',
													'storyful'
												) }
												value={ data.year }
												onChange={ ( value ) => {
													const arrayCopy = [
														...listItems,
													];
													arrayCopy[ index ].year =
														value;
													setAttributes( {
														listItems: arrayCopy,
													} );
												} }
												style={ navTitleStyle }
												className="timeline-year"
											/>
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
						<Tooltip text={ __( 'Add New Item', 'storyful' ) }>
							<i
								className="add-new-item dashicons dashicons-plus"
								aria-hidden="true"
							></i>
						</Tooltip>
					</div>
				</div>
			</section>
		</Fragment>
	);
}
