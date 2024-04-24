/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { anitianColors } from '../common';
import { Fragment, useEffect, useState } from '@wordpress/element';
import Slider from 'react-slick';
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
		title,
		titleColor,
		titleVisiblity,
		bgImage,
		Image,
		repeatItems,
		finishTitle,
		finishSubTitle,
		finishTitleColor,
		finishSubTitleColor,
		slideTitleColor,
		slideDescColor,
		boxTitleColor,
		boxDescColor,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const slideTitleStyle = {
		color: slideTitleColor || undefined,
	};
	const slideDescStyle = {
		color: slideDescColor || undefined,
	};
	const boxTitleStyle = {
		color: boxTitleColor || undefined,
	};
	const boxDescStyle = {
		color: boxDescColor || undefined,
	};
	const finishTitleStyle = {
		color: finishTitleColor || undefined,
	};
	const finishSubTitleStyle = {
		color: finishSubTitleColor || undefined,
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
	colorSettings.push( {
		value: slideTitleColor,
		onChange: ( value ) => {
			setAttributes( {
				slideTitleColor: value,
			} );
		},
		label: __( 'Slide Title Color' ),
	} );
	colorSettings.push( {
		value: slideDescColor,
		onChange: ( value ) => {
			setAttributes( {
				slideDescColor: value,
			} );
		},
		label: __( 'Slide Description Color' ),
	} );
	colorSettings.push( {
		value: boxTitleColor,
		onChange: ( value ) => {
			setAttributes( {
				boxTitleColor: value,
			} );
		},
		label: __( 'Box Title Color' ),
	} );
	colorSettings.push( {
		value: boxDescColor,
		onChange: ( value ) => {
			setAttributes( {
				boxDescColor: value,
			} );
		},
		label: __( 'Box Description Color' ),
	} );

	colorSettings.push( {
		value: finishTitleColor,
		onChange: ( value ) => {
			setAttributes( {
				finishTitleColor: value,
			} );
		},
		label: __( 'Finish Title Color' ),
	} );
	colorSettings.push( {
		value: finishSubTitleColor,
		onChange: ( value ) => {
			setAttributes( {
				finishSubTitleColor: value,
			} );
		},
		label: __( 'Finish SubTitle Color' ),
	} );

	const [ selectedOption, setSelectedOption ] = useState( 'slider' );
	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: false,
		adaptiveHeight: false,
		speed: 500,
	};
	const renderDropdown = () => {
		return (
			<select
				value={ selectedOption }
				onChange={ ( e ) => {
					setSelectedOption( e.target.value );
				} }
			>
				<option value="slider">Slider</option>
				<option value="ahed">Ahed</option>
				<option value="behind">Behind</option>
			</select>
		);
	};
	const renderDataByOption = ( data, index ) => {
		switch ( data.selectedOption ) {
			case 'ahed':
				return ahedData( data, index );
			case 'behind':
				return behindData( data, index );
			case 'slider':
			default:
				return sliderData( data, index );
		}
	};
	useEffect( () => {
		if ( 0 === repeatItems.length ) {
			initList();
		}
	}, [ repeatItems, selectedOption ] );

	const initList = () => {
		let initialData;
		if ( selectedOption === 'ahed' ) {
			initialData = ahedData();
		} else if ( selectedOption === 'behind' ) {
			initialData = behindData();
		} else {
			initialData = sliderData();
		}

		setAttributes( {
			repeatItems: [
				...repeatItems,
				{
					index: repeatItems.length,
					selectedOption,
					...initialData,
				},
			],
		} );
	};
	const moveItem = ( oldIndex, newIndex ) => {
		const arrayCopy = [ ...repeatItems ];
		arrayCopy[ oldIndex ] = repeatItems[ newIndex ];
		arrayCopy[ newIndex ] = repeatItems[ oldIndex ];

		setAttributes( {
			repeatItems: arrayCopy,
		} );
	};
	const sliderData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="timeline-repeat-item slider" key={ index }>
					<div className="timeline-slider">
						<Slider { ...settings }>
							<div className="timeline-slide-1-wrap">
								<div className="timeline-slider-image">
									{ data.slideImageURL ? (
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
																		...repeatItems,
																	];
																arrayCopy[
																	index
																].imageID =
																	item.id;
																arrayCopy[
																	index
																].slideImageURL =
																	item.url;
																arrayCopy[
																	index
																].slideImageAlt =
																	item.alt;
																arrayCopy[
																	index
																].slideImageWidth =
																	item.width;
																arrayCopy[
																	index
																].slideImageHeight =
																	item.height;
																setAttributes( {
																	repeatItems:
																		arrayCopy,
																} );
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
																			...repeatItems,
																		];
																	arrayCopy[
																		index
																	].imageID =
																		'';
																	arrayCopy[
																		index
																	].slideImageURL =
																		'';
																	arrayCopy[
																		index
																	].slideImageAlt =
																		'';
																	arrayCopy[
																		index
																	].slideImageWidth =
																		'';
																	arrayCopy[
																		index
																	].slideImageHeight =
																		'';
																	setAttributes(
																		{
																			repeatItems:
																				arrayCopy,
																		}
																	);
																}
															} }
														></i>
													</Tooltip>
												</div>
												<img
													src={ data.slideImageURL }
													alt={ data.slideImageAlt }
													width={
														data.slideImageWidth
													}
													height={
														data.slideImageHeight
													}
												/>
											</div>
										</Fragment>
									) : (
										<div className="upload-image">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( item ) => {
														const arrayCopy = [
															...repeatItems,
														];
														arrayCopy[
															index
														].imageID = item.id;
														arrayCopy[
															index
														].slideImageURL =
															item.url;
														arrayCopy[
															index
														].slideImageAlt =
															item.alt;
														arrayCopy[
															index
														].slideImageWidth =
															item.width;
														arrayCopy[
															index
														].slideImageHeight =
															item.height;
														setAttributes( {
															repeatItems:
																arrayCopy,
														} );
													} }
													allowedTypes={ [ 'image' ] }
													value={ data.slideImageURL }
													render={ ( { open } ) => (
														<div className="upload-wrap">
															<Button
																onClick={ open }
																className="button"
															>
																{ __(
																	'Select Slider Image',
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
								<div className="timeline-slide-1-content">
									<RichText
										tagName="h3"
										placeholder={ __(
											'Enter Slide1 Heading',
											'anitian'
										) }
										value={ data.titleS1 }
										onChange={ ( titleS1 ) => {
											const newObj = Object.assign(
												{},
												data,
												{
													titleS1,
												}
											);
											const slideInfo = [
												...repeatItems,
											];
											slideInfo[ index ] = newObj;
											setAttributes( {
												repeatItems: slideInfo,
											} );
										} }
										style={ slideTitleStyle }
										className="timeline-slide-1-heading"
									/>
									<RichText
										tagName="p"
										placeholder={ __(
											'Enter Slide1 Description',
											'anitian'
										) }
										value={ data.descriptionS1 }
										onChange={ ( descriptionS1 ) => {
											const newObj = Object.assign(
												{},
												data,
												{
													descriptionS1,
												}
											);
											const slideInfo = [
												...repeatItems,
											];
											slideInfo[ index ] = newObj;
											setAttributes( {
												repeatItems: slideInfo,
											} );
										} }
										style={ slideDescStyle }
										className="timeline-slide-1-description"
									/>
								</div>
								<div className="click-here">
									<svg
										version="1.0"
										xmlns="http://www.w3.org/2000/svg"
										width="305.000000pt"
										height="144.000000pt"
										viewBox="0 0 305.000000 144.000000"
										preserveAspectRatio="xMidYMid meet"
									>
										<g
											transform="translate(0.000000,144.000000) scale(0.100000,-0.100000)"
											fill="currentColor"
											stroke="none"
										>
											<path d="M1251 1097 c-5 -12 -15 -58 -22 -102 -7 -44 -19 -90 -26 -102 -8 -12 -12 -30 -9 -41 5 -15 -5 -22 -55 -40 -47 -17 -65 -19 -75 -11 -23 19 -16 47 21 75 40 30 45 54 12 54 -52 0 -108 -98 -86 -152 15 -36 48 -42 111 -18 63 24 68 24 68 6 0 -18 30 -29 35 -13 2 6 6 24 9 40 4 15 11 27 16 27 6 0 38 -14 71 -31 48 -24 64 -28 75 -18 21 17 9 28 -74 66 -87 39 -86 50 11 77 55 16 71 31 44 42 -8 3 -35 -2 -61 -11 -26 -9 -50 -14 -53 -11 -3 2 0 28 6 56 14 64 14 130 1 130 -6 0 -14 -10 -19 -23z"></path>
											<path d="M594 1086 c-72 -32 -154 -130 -169 -202 -9 -45 16 -99 57 -120 72 -39 183 -15 281 60 l47 36 0 -49 c0 -30 5 -53 14 -60 23 -19 36 17 36 96 0 37 7 103 15 145 14 74 12 108 -5 108 -17 0 -30 -30 -41 -98 -12 -72 -12 -73 -73 -121 -84 -66 -116 -81 -179 -81 -44 0 -59 5 -81 25 -31 29 -32 44 -6 95 24 47 66 81 144 115 42 19 57 30 54 43 -4 22 -53 26 -94 8z"></path>
											<path d="M1674 1054 c-17 -41 -54 -228 -54 -275 0 -15 6 -29 14 -32 16 -6 32 10 67 68 l24 40 7 -43 c9 -55 14 -62 44 -62 27 0 29 3 12 33 -6 12 -14 51 -17 87 -5 56 -9 65 -26 65 -13 0 -28 -15 -45 -45 -34 -62 -38 -33 -10 87 16 68 19 98 11 106 -7 7 -15 -1 -27 -29z"></path>
											<path d="M953 1023 c-23 -9 -15 -35 10 -31 12 2 22 9 22 17 0 16 -14 22 -32 14z"></path>
											<path d="M937 933 c-12 -21 -30 -174 -21 -183 18 -18 35 7 44 66 14 86 13 124 -4 124 -8 0 -17 -3 -19 -7z"></path>
											<path d="M1873 930 c-29 -12 -43 -40 -43 -87 0 -51 44 -97 93 -97 39 0 91 34 117 77 l18 30 7 -46 c11 -74 29 -78 60 -13 15 31 45 72 71 94 24 22 44 42 44 46 0 3 -12 6 -27 6 -18 0 -38 -13 -64 -40 l-39 -40 -6 25 c-8 31 -30 33 -38 3 -9 -30 -104 -108 -132 -108 -12 0 -27 6 -33 14 -10 12 -7 18 18 30 35 19 46 47 30 78 -20 38 -36 44 -76 28z m43 -45 c7 -18 -12 -45 -32 -45 -14 0 -20 41 -7 53 11 12 33 7 39 -8z"></path>
											<path d="M2293 930 c-29 -12 -43 -40 -43 -87 0 -52 44 -97 94 -97 40 0 99 41 121 85 21 39 12 37 -42 -11 -48 -42 -82 -50 -102 -26 -10 12 -7 18 18 30 35 19 46 47 30 78 -20 38 -36 44 -76 28z m43 -45 c7 -18 -12 -45 -32 -45 -14 0 -20 41 -7 53 11 12 33 7 39 -8z"></path>
											<path d="M2088 609 c-14 -6 -29 -16 -32 -24 -10 -27 21 -42 101 -49 91 -7 142 -19 126 -29 -18 -11 -250 -64 -343 -79 -113 -17 -526 -17 -640 0 -141 22 -307 61 -454 108 -141 45 -184 47 -131 6 60 -47 310 -124 530 -163 301 -53 768 -28 1028 54 42 14 77 23 77 21 0 -14 -355 -204 -381 -204 -23 0 -31 -26 -13 -41 22 -18 70 -6 177 44 123 58 357 196 364 215 10 24 -10 45 -71 75 -104 51 -284 86 -338 66z"></path>
										</g>
									</svg>
								</div>
								<span className="timeline-slide-icon elg-icon elg-icon_plus_alt"></span>
							</div>
							<div className="timeline-slide-2-wrap">
								<RichText
									tagName="h3"
									placeholder={ __(
										'Enter Slide2 Heading',
										'anitian'
									) }
									value={ data.titleS2 }
									onChange={ ( titleS2 ) => {
										const newObj = Object.assign(
											{},
											data,
											{
												titleS2,
											}
										);
										const slideInfo = [ ...repeatItems ];
										slideInfo[ index ] = newObj;
										setAttributes( {
											repeatItems: slideInfo,
										} );
									} }
									style={ slideTitleStyle }
									className="timeline-slide-2-heading"
								/>
								<RichText
									tagName="p"
									placeholder={ __(
										'Enter Slide2 Description',
										'anitian'
									) }
									value={ data.descriptionS2 }
									onChange={ ( descriptionS2 ) => {
										const newObj = Object.assign(
											{},
											data,
											{
												descriptionS2,
											}
										);
										const slideInfo = [ ...repeatItems ];
										slideInfo[ index ] = newObj;
										setAttributes( {
											repeatItems: slideInfo,
										} );
									} }
									style={ slideDescStyle }
									className="timeline-slide-2-description"
								/>
								<span className="timeline-slide-icon elg-icon elg-icon_close_alt"></span>
							</div>
						</Slider>
					</div>
				</div>
			</>
		);
	};
	const ahedData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="timeline-repeat-item ahed" key={ index }>
					<div className="timeline-phase-wrapper">
						<div className="timeline-phase-icon">
							{ data.phaseImageURL ? (
								<Fragment>
									<div className="image-preview">
										<div className="image-controls small-icons image-action-wrap">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( item ) => {
														const arrayCopy = [
															...repeatItems,
														];
														arrayCopy[
															index
														].imageID = item.id;
														arrayCopy[
															index
														].phaseImageURL =
															item.url;
														arrayCopy[
															index
														].phaseImageAlt =
															item.alt;
														arrayCopy[
															index
														].phaseImageWidth =
															item.width;
														arrayCopy[
															index
														].phaseImageHeight =
															item.height;
														setAttributes( {
															repeatItems:
																arrayCopy,
														} );
													} }
													allowedTypes={ [ 'image' ] }
													value={ data.imageID }
													render={ ( { open } ) => {
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
															true === imgDelete
														) {
															const arrayCopy = [
																...repeatItems,
															];
															arrayCopy[
																index
															].imageID = '';
															arrayCopy[
																index
															].phaseImageURL =
																'';
															arrayCopy[
																index
															].phaseImageAlt =
																'';
															arrayCopy[
																index
															].phaseImageWidth =
																'';
															arrayCopy[
																index
															].phaseImageHeight =
																'';
															setAttributes( {
																repeatItems:
																	arrayCopy,
															} );
														}
													} }
												></i>
											</Tooltip>
										</div>
										<img
											src={ data.phaseImageURL }
											alt={ data.phaseImageAlt }
											width={ data.phaseImageWidth }
											height={ data.phaseImageHeight }
										/>
									</div>
								</Fragment>
							) : (
								<div className="upload-image">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( item ) => {
												const arrayCopy = [
													...repeatItems,
												];
												arrayCopy[ index ].imageID =
													item.id;
												arrayCopy[
													index
												].phaseImageURL = item.url;
												arrayCopy[
													index
												].phaseImageAlt = item.alt;
												arrayCopy[
													index
												].phaseImageWidth = item.width;
												arrayCopy[
													index
												].phaseImageHeight =
													item.height;
												setAttributes( {
													repeatItems: arrayCopy,
												} );
											} }
											allowedTypes={ [ 'image' ] }
											value={ data.phaseImageURL }
											render={ ( { open } ) => (
												<div className="upload-wrap">
													<Button
														onClick={ open }
														className="button"
													>
														{ __(
															'Select Phase Icon Image',
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
						<div className="timeline-phase-content">
							<div className="timeline-phase-card">
								<RichText
									tagName="h4"
									placeholder={ __(
										'Ahed Card Heading',
										'anitian'
									) }
									value={ data.headingAhed }
									onChange={ ( headingAhed ) => {
										const newObj = Object.assign(
											{},
											data,
											{
												headingAhed,
											}
										);
										const slideInfo = [ ...repeatItems ];
										slideInfo[ index ] = newObj;
										setAttributes( {
											repeatItems: slideInfo,
										} );
									} }
									style={ boxTitleStyle }
									className="timeline-phase-heading-ahed"
								/>
								<div className="timeline-phase-image">
									{ data.logoURL ? (
										<Fragment>
											<div className="image-preview">
												<div className="image-controls small-icons image-action-wrap">
													<MediaUploadCheck>
														<MediaUpload
															onSelect={ (
																logoAhed
															) => {
																const arrayCopy =
																	[
																		...repeatItems,
																	];
																arrayCopy[
																	index
																].imageID =
																	logoAhed.id;
																arrayCopy[
																	index
																].logoURL =
																	logoAhed.url;
																arrayCopy[
																	index
																].logoAlt =
																	logoAhed.alt;
																arrayCopy[
																	index
																].logoWidth =
																	logoAhed.width;
																arrayCopy[
																	index
																].logoHeight =
																	logoAhed.height;
																setAttributes( {
																	repeatItems:
																		arrayCopy,
																} );
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
																			...repeatItems,
																		];
																	arrayCopy[
																		index
																	].imageID =
																		'';
																	arrayCopy[
																		index
																	].logoURL =
																		'';
																	arrayCopy[
																		index
																	].logoAlt =
																		'';
																	arrayCopy[
																		index
																	].logoWidth =
																		'';
																	arrayCopy[
																		index
																	].logoHeight =
																		'';
																	setAttributes(
																		{
																			repeatItems:
																				arrayCopy,
																		}
																	);
																}
															} }
														></i>
													</Tooltip>
												</div>
												<img
													src={ data.logoURL }
													alt={ data.logoAlt }
													width={ data.logoWidth }
													height={ data.logoHeight }
												/>
											</div>
										</Fragment>
									) : (
										<div className="upload-image">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( logoAhed ) => {
														const arrayCopy = [
															...repeatItems,
														];
														arrayCopy[
															index
														].imageID = logoAhed.id;
														arrayCopy[
															index
														].logoURL =
															logoAhed.url;
														arrayCopy[
															index
														].logoAlt =
															logoAhed.alt;
														arrayCopy[
															index
														].logoWidth =
															logoAhed.width;
														arrayCopy[
															index
														].logoHeight =
															logoAhed.height;
														setAttributes( {
															repeatItems:
																arrayCopy,
														} );
													} }
													allowedTypes={ [ 'image' ] }
													value={ data.logoURL }
													render={ ( { open } ) => (
														<div className="upload-wrap">
															<Button
																onClick={ open }
																className="button"
															>
																{ __(
																	'Select Phase Card Logo',
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
							<RichText
								tagName="p"
								placeholder={ __(
									'Ahed Card Description',
									'anitian'
								) }
								value={ data.descriptionAhed }
								onChange={ ( descriptionAhed ) => {
									const newObj = Object.assign( {}, data, {
										descriptionAhed,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ boxDescStyle }
								className="timeline-phase-description-ahed"
							/>
						</div>
					</div>
				</div>
			</>
		);
	};

	const behindData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="timeline-repeat-item behind" key={ index }>
					<div className="timeline-phase-wrapper">
						<div className="timeline-phase-icon">
							<div className="timeline-phase-caution"></div>
						</div>
						<div className="timeline-phase-content">
							<div className="timeline-phase-card">
								<RichText
									tagName="h4"
									placeholder={ __(
										'Behind Card Heading',
										'anitian'
									) }
									value={ data.headingBehind }
									style={ boxTitleStyle }
									onChange={ ( headingBehind ) => {
										const newObj = Object.assign(
											{},
											data,
											{
												headingBehind,
											}
										);
										const slideInfo = [ ...repeatItems ];
										slideInfo[ index ] = newObj;
										setAttributes( {
											repeatItems: slideInfo,
										} );
									} }
									className="timeline-phase-heading-behind"
								/>
								<div className="timeline-phase-image">
									{ data.behindLogoURL ? (
										<Fragment>
											<div className="image-preview">
												<div className="image-controls small-icons image-action-wrap">
													<MediaUploadCheck>
														<MediaUpload
															onSelect={ (
																logoAhed
															) => {
																const arrayCopy =
																	[
																		...repeatItems,
																	];
																arrayCopy[
																	index
																].imageID =
																	logoAhed.id;
																arrayCopy[
																	index
																].behindLogoURL =
																	logoAhed.url;
																arrayCopy[
																	index
																].behindLogoAlt =
																	logoAhed.alt;
																arrayCopy[
																	index
																].behindLogoWidth =
																	logoAhed.width;
																arrayCopy[
																	index
																].behindLogoHeight =
																	logoAhed.height;
																setAttributes( {
																	repeatItems:
																		arrayCopy,
																} );
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
																			...repeatItems,
																		];
																	arrayCopy[
																		index
																	].imageID =
																		'';
																	arrayCopy[
																		index
																	].behindLogoURL =
																		'';
																	arrayCopy[
																		index
																	].behindLogoAlt =
																		'';
																	arrayCopy[
																		index
																	].behindLogoWidth =
																		'';
																	arrayCopy[
																		index
																	].behindLogoHeight =
																		'';
																	setAttributes(
																		{
																			repeatItems:
																				arrayCopy,
																		}
																	);
																}
															} }
														></i>
													</Tooltip>
												</div>
												<img
													src={ data.behindLogoURL }
													alt={ data.behindLogoAlt }
													width={
														data.behindLogoWidth
													}
													height={
														data.behindLogoHeight
													}
												/>
											</div>
										</Fragment>
									) : (
										<div className="upload-image">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( logoAhed ) => {
														const arrayCopy = [
															...repeatItems,
														];
														arrayCopy[
															index
														].imageID = logoAhed.id;
														arrayCopy[
															index
														].behindLogoURL =
															logoAhed.url;
														arrayCopy[
															index
														].behindLogoAlt =
															logoAhed.alt;
														arrayCopy[
															index
														].behindLogoWidth =
															logoAhed.width;
														arrayCopy[
															index
														].behindLogoHeight =
															logoAhed.height;
														setAttributes( {
															repeatItems:
																arrayCopy,
														} );
													} }
													allowedTypes={ [ 'image' ] }
													value={ data.behindLogoURL }
													render={ ( { open } ) => (
														<div className="upload-wrap">
															<Button
																onClick={ open }
																className="button"
															>
																{ __(
																	'Select Behind Logo',
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
							<RichText
								tagName="p"
								placeholder={ __(
									'Behind Card Description',
									'anitian'
								) }
								value={ data.descriptionBehind }
								onChange={ ( descriptionBehind ) => {
									const newObj = Object.assign( {}, data, {
										descriptionBehind,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ boxDescStyle }
								className="timeline-phase-description-behind"
							/>
						</div>
					</div>
				</div>
			</>
		);
	};
	return (
		<Fragment>
			<InspectorControls>
				<div className="anitian-block-sidebar">
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
					>
						<div className="setting-row">
							<label htmlFor="bg image">
								{ __( 'Select Backgroung Image', 'anitian' ) }
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
										<div className="image-preview">
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
								label={ __( 'Title Visiblity' ) }
								checked={ titleVisiblity }
								onChange={ () =>
									setAttributes( {
										titleVisiblity: ! titleVisiblity,
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
			<div className="wp-block-anitian-timeline">
				<div
					className="timeline-background-image"
					style={ sectionBgStyle }
				>
					<div className="timeline-content-inner block-container">
						<div className="timeline-line">
							<div className="timeline-line-inner"></div>
						</div>
						<div className="timeline-heading" style={ alignStyle }>
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
						</div>
						{ repeatItems.map( ( data, index ) => (
							<>
								<div className="media-content-item show-items-hover-wrap">
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
																index - 1
															)
														}
													></span>
												</Tooltip>
											) }
											{ index + 1 <
												repeatItems.length && (
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
																index + 1
															)
														}
													></span>
												</Tooltip>
											) }
										</div>
										{ 1 < repeatItems.length && (
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
																	repeatItems
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
																setAttributes( {
																	repeatItems:
																		updatedArray,
																} );
															}
														} }
													></i>
												</Tooltip>
											</div>
										) }
									</div>
									{ renderDataByOption(
										data,
										index,
										selectedOption
									) }
								</div>
							</>
						) ) }
						<div className="content-wrapped">
							{ renderDropdown() }
							<Tooltip text="Add item">
								<button
									className="add-new-item"
									onClick={ () => {
										initList( selectedOption );
									} }
								>
									<i className="add-new-item dashicons dashicons-plus"></i>{ ' ' }
									Add New Item
								</button>
							</Tooltip>
						</div>
						<div className="timeline-finish">
							<div className="timeline-finish-image">
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
																'Edit Finish Image'
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
																'Remove Finish Image',
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
													<figure className="multipurpose-wp-block-image">
														{ Image.url !== '' && (
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
													</figure>
												</div>
											) : (
												<div className="add-item-wrap">
													<Tooltip
														text={ __(
															'Add Finish Image'
														) }
														position="top center"
													>
														<Button
															onClick={ open }
															className="upload-img-btn button button-large"
														>
															{ __(
																'Upload Finish Image'
															) }
														</Button>
													</Tooltip>
												</div>
											)
										}
									/>
								</MediaUploadCheck>
							</div>
							<div className="timeline-finish-content">
								<RichText
									tagName="h4"
									placeholder={ __( 'Finish SubTitle' ) }
									value={ finishSubTitle }
									onChange={ ( newfinishSubTitle ) =>
										setAttributes( {
											finishSubTitle: newfinishSubTitle,
										} )
									}
									className="finish-subtitle-text"
									style={ finishSubTitleStyle }
								/>

								<RichText
									tagName="h2"
									placeholder={ __( 'Finish Title' ) }
									value={ finishTitle }
									onChange={ ( newfinishTitle ) =>
										setAttributes( {
											finishTitle: newfinishTitle,
										} )
									}
									className="finish-title-text"
									style={ finishTitleStyle }
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
