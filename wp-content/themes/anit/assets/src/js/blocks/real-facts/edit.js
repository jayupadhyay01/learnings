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
	PanelRow,
	FormToggle,
	TextControl,
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
		repeatItems,
		slideTitleColor,
		slideDescColor,
		description,
		descriptionColor,
		descriptionVisiblity,
		btnVisiblity,
		btnText,
		btnBgColor,
		btnTxtColor,
		sliderItems,
		autoplay,
		arrows,
		dots,
		infinite,
		mainSliderColor,
		headingColor,
		mainDescVisiblity,
		mainDescColor,
		headingVisiblity,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const headingStyle = {
		color: headingColor || undefined,
	};
	const mainDescStyle = {
		color: mainDescColor || undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const slideTitleStyle = {
		color: slideTitleColor || undefined,
	};
	const slideDescStyle = {
		color: slideDescColor || undefined,
	};
	const btnStyle = {
		background: btnBgColor || undefined,
		color: btnTxtColor || undefined,
	};
	const mainSliderStyle = {
		color: mainSliderColor || undefined,
	};

	const colorSettings = [];

	if ( headingVisiblity ) {
		colorSettings.push( {
			value: headingColor,
			onChange: ( value ) => {
				setAttributes( {
					headingColor: value,
				} );
			},
			label: __( 'Block Heading Color' ),
		} );
	}
	if ( mainDescVisiblity ) {
		colorSettings.push( {
			value: mainDescColor,
			onChange: ( value ) => {
				setAttributes( {
					mainDescColor: value,
				} );
			},
			label: __( 'Block Description Color' ),
		} );
	}
	if ( titleVisiblity ) {
		colorSettings.push( {
			value: titleColor,
			onChange: ( value ) => {
				setAttributes( {
					titleColor: value,
				} );
			},
			label: __( 'Section Title Color' ),
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
			label: __( 'Section Description Color' ),
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
		value: mainSliderColor,
		onChange: ( value ) => {
			setAttributes( {
				mainSliderColor: value,
			} );
		},
		label: __( 'Main Slider Text Color' ),
	} );

	colorSettings.push( {
		value: btnTxtColor,
		onChange: ( value ) => {
			setAttributes( {
				btnTxtColor: value,
			} );
		},
		label: __( 'Button Text Color' ),
	} );
	colorSettings.push( {
		value: btnBgColor,
		onChange: ( value ) => {
			setAttributes( {
				btnBgColor: value,
			} );
		},
		label: __( 'Button Background Color' ),
	} );

	const [ selectedOption, setSelectedOption ] = useState( 'one-col-click' );
	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: false,
		adaptiveHeight: false,
		arrows: false,
		dots: false,
		speed: 500,
	};
	const mainSliderSettings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: false,
		adaptiveHeight: false,
		autoplay,
		arrows,
		dots,
		infinite,
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
				<option value="one-col-click">One Col. Click Slider</option>
				<option value="two-col-click">Two Col. Click Slider</option>
				<option value="slider-main">Slider</option>
				<option value="video-integration">Video Integration</option>
			</select>
		);
	};
	const renderDataByOption = ( data, index ) => {
		switch ( data.selectedOption ) {
			case 'two-col-click':
				return twoColSliderData( data, index );
			case 'slider-main':
				return sliderData( data, index );
			case 'video-integration':
				return videoData( data, index );
			case 'one-col-click':
			default:
				return oneColSliderData( data, index );
		}
	};
	useEffect( () => {
		if ( 0 === repeatItems.length ) {
			initList();
		}
	}, [ repeatItems, selectedOption ] );

	const initList = () => {
		let initialData;
		if ( selectedOption === 'two-col-click' ) {
			initialData = twoColSliderData();
		} else if ( selectedOption === 'slider-main' ) {
			initialData = sliderData();
		} else if ( selectedOption === 'video-integration' ) {
			initialData = videoData();
		} else {
			initialData = oneColSliderData();
		}

		setAttributes( {
			repeatItems: [
				...repeatItems,
				{
					index: repeatItems.length,
					repeatIndex: repeatItems.length,
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
	const videoData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="real-facts-item" key={ index }>
					<div className="real-facts__video">
						<div className="real-facts__video-img">
							{ data.videoImageURL ? (
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
														].videoImageURL =
															item.url;
														arrayCopy[
															index
														].videoImageAlt =
															item.alt;
														arrayCopy[
															index
														].videoImageWidth =
															item.width;
														arrayCopy[
															index
														].videoImageHeight =
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
															].videoImageURL =
																'';
															arrayCopy[
																index
															].videoImageAlt =
																'';
															arrayCopy[
																index
															].videoImageWidth =
																'';
															arrayCopy[
																index
															].videoImageHeight =
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
											src={ data.videoImageURL }
											alt={ data.videoImageAlt }
											width={ data.videoImageWidth }
											height={ data.videoImageHeight }
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
												].videoImageURL = item.url;
												arrayCopy[
													index
												].videoImageAlt = item.alt;
												arrayCopy[
													index
												].videoImageWidth = item.width;
												arrayCopy[
													index
												].videoImageHeight =
													item.height;
												setAttributes( {
													repeatItems: arrayCopy,
												} );
											} }
											allowedTypes={ [ 'image' ] }
											value={ data.videoImageURL }
											render={ ( { open } ) => (
												<div className="upload-wrap">
													<Button
														onClick={ open }
														className="button"
													>
														{ __(
															'Select Video Icon Image',
															'anitian'
														) }
													</Button>
												</div>
											) }
										/>
									</MediaUploadCheck>
								</div>
							) }
							<RichText
								tagName="p"
								placeholder={ __(
									'Video Button Text',
									'anitian'
								) }
								value={ data.videoBtnText }
								onChange={ ( videoBtnText ) => {
									const newObj = Object.assign( {}, data, {
										videoBtnText,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								className="video-text"
							/>
						</div>
						<TextControl
							label="Video URL"
							value={ data.videoURL }
							onChange={ ( videoURL ) => {
								const newObj = { ...data, videoURL };
								const slideInfo = [ ...repeatItems ];
								slideInfo[ index ] = newObj;
								setAttributes( {
									repeatItems: slideInfo,
								} );
							} }
						/>
						<div className="real-facts__video-modal">
							<div className="real-facts__video-modal-content">
								<div className="real-facts__video-modal-wrap">
									<span className="close-modal"></span>
									<iframe
										title="Video PopUp"
										loading="lazy"
										className="video"
										height="200"
										width="300"
										allowfullscreen=""
										src={ data.videoURL }
										data-src={ data.videoURL }
									></iframe>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const oneColSliderData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="real-facts-item" key={ index }>
					<div className="slider-1-col">
						{ titleVisiblity && (
							<RichText
								tagName="h2"
								placeholder={ __(
									'Enter Section Heading',
									'anitian'
								) }
								value={ data.title1ColSlider }
								onChange={ ( title1ColSlider ) => {
									const newObj = Object.assign( {}, data, {
										title1ColSlider,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ titleStyle }
								className="real-facts-item-title"
							/>
						) }
						{ descriptionVisiblity && (
							<RichText
								tagName="p"
								placeholder={ __(
									'Enter Section Description',
									'anitian'
								) }
								value={ data.desc1ColSlider }
								onChange={ ( desc1ColSlider ) => {
									const newObj = Object.assign( {}, data, {
										desc1ColSlider,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ descriptionStyle }
								className="real-facts-item-desc"
							/>
						) }
						<div className="real-facts-slider-wrap click_slider one-col-click-wrap">
							<Slider { ...settings }>
								<div className="real-facts-slide-1-wrap">
									<div className="real-facts-slider-image">
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
																	setAttributes(
																		{
																			repeatItems:
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
														src={
															data.slideImageURL
														}
														alt={
															data.slideImageAlt
														}
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
														allowedTypes={ [
															'image',
														] }
														value={
															data.slideImageURL
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
									<div className="real-facts-slide-1-content">
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
											className="real-facts-slide-1-heading"
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
											className="real-facts-slide-1-description"
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
									<span className="real-facts-slide-icon elg-icon elg-icon_plus_alt"></span>
								</div>
								<div className="real-facts-slide-2-wrap">
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
											const slideInfo = [
												...repeatItems,
											];
											slideInfo[ index ] = newObj;
											setAttributes( {
												repeatItems: slideInfo,
											} );
										} }
										style={ slideTitleStyle }
										className="real-facts-slide-2-heading"
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
											const slideInfo = [
												...repeatItems,
											];
											slideInfo[ index ] = newObj;
											setAttributes( {
												repeatItems: slideInfo,
											} );
										} }
										style={ slideDescStyle }
										className="real-facts-slide-2-description"
									/>
									<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</>
		);
	};
	const twoColSliderData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="real-facts-item two-col-click" key={ index }>
					<div className="slider-2-col">
						{ titleVisiblity && (
							<RichText
								tagName="h2"
								placeholder={ __(
									'Enter Section Heading',
									'anitian'
								) }
								value={ data.title2ColSlider }
								onChange={ ( title2ColSlider ) => {
									const newObj = Object.assign( {}, data, {
										title2ColSlider,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ titleStyle }
								className="real-facts-item-title"
							/>
						) }
						{ descriptionVisiblity && (
							<RichText
								tagName="p"
								placeholder={ __(
									'Enter Section Description',
									'anitian'
								) }
								value={ data.desc2ColSlider }
								onChange={ ( desc2ColSlider ) => {
									const newObj = Object.assign( {}, data, {
										desc2ColSlider,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ descriptionStyle }
								className="real-facts-item-desc"
							/>
						) }
						<div className="real-facts-slider-wrap  two-col-click-wrap">
							<div className="click_slider slider-1">
								<Slider { ...settings }>
									<div className="real-facts-slide-1">
										<div className="real-facts__slide-1-wrap">
											<RichText
												tagName="h3"
												placeholder={ __(
													'Enter Slide1 Heading',
													'anitian'
												) }
												value={ data.titleS1Col2 }
												onChange={ ( titleS1Col2 ) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																titleS1Col2,
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
												className="real-facts-slide-1-heading"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide1 Description',
													'anitian'
												) }
												value={ data.descriptionS1Col2 }
												onChange={ (
													descriptionS1Col2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																descriptionS1Col2,
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
												className="real-facts-slide-1-description"
											/>
										</div>
									</div>
									<div className="real-facts-slide-2">
										<div className="real-facts__slide-2-wrap">
											<RichText
												tagName="h3"
												placeholder={ __(
													'Enter Slide2 Heading',
													'anitian'
												) }
												value={ data.titleS2Col2 }
												onChange={ ( titleS2Col2 ) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																titleS2Col2,
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
												className="real-facts-slide-2-heading"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide2 Description',
													'anitian'
												) }
												value={ data.descriptionS2Col2 }
												onChange={ (
													descriptionS2Col2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																descriptionS2Col2,
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
												className="real-facts-slide-2-description"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide2 Quote',
													'anitian'
												) }
												value={ data.quoteS2Col2 }
												onChange={ ( quoteS2Col2 ) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																quoteS2Col2,
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
												className="real-facts-quote"
											/>
											<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
										</div>
									</div>
								</Slider>
							</div>
							<div className="click_slider slider-2">
								<Slider { ...settings }>
									<div className="real-facts-slide-1">
										<div className="real-facts__slide-1-wrap">
											<div className="real-facts-slider-image">
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
																			setAttributes(
																				{
																					repeatItems:
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
																src={
																	data.slideImageURL
																}
																alt={
																	data.slideImageAlt
																}
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
																	setAttributes(
																		{
																			repeatItems:
																				arrayCopy,
																		}
																	);
																} }
																allowedTypes={ [
																	'image',
																] }
																value={
																	data.slideImageURL
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
											<RichText
												tagName="h3"
												placeholder={ __(
													'Enter Slide1 Heading',
													'anitian'
												) }
												value={ data.titleS1Slider2 }
												onChange={ (
													titleS1Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																titleS1Slider2,
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
												className="real-facts-slide-1-heading"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide1 Description',
													'anitian'
												) }
												value={
													data.descriptionS1Slider2
												}
												onChange={ (
													descriptionS1Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																descriptionS1Slider2,
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
												className="real-facts-slide-1-description"
											/>
											<span className="real-facts-slide-icon elg-icon elg-icon_plus_alt"></span>
										</div>
									</div>
									<div className="real-facts-slide-2">
										<div className="real-facts__slide-2-wrap">
											<RichText
												tagName="h3"
												placeholder={ __(
													'Enter Slide2 Heading',
													'anitian'
												) }
												value={ data.titleS2Slider2 }
												onChange={ (
													titleS2Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																titleS2Slider2,
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
												className="real-facts-slide-2-heading"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide2 Description',
													'anitian'
												) }
												value={
													data.descriptionS2Slider2
												}
												onChange={ (
													descriptionS2Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																descriptionS2Slider2,
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
												className="real-facts-slide-2-description"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide2 Quote',
													'anitian'
												) }
												value={ data.quoteS2Slider2 }
												onChange={ (
													quoteS2Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																quoteS2Slider2,
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
												className="real-facts-quote"
											/>
											<RichText
												tagName="p"
												placeholder={ __(
													'Enter Slide2 Hint',
													'anitian'
												) }
												value={ data.hintS2Slider2 }
												onChange={ (
													hintS2Slider2
												) => {
													const newObj =
														Object.assign(
															{},
															data,
															{
																hintS2Slider2,
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
												className="real-facts-hint"
											/>
											<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
										</div>
									</div>
								</Slider>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	};

	const sliderData = ( data, index ) => {
		if ( ! data ) {
			data = {};
		}
		return (
			<>
				<div className="real-facts-item" key={ index }>
					{ titleVisiblity && (
						<RichText
							tagName="h2"
							placeholder={ __(
								'Enter Section Heading',
								'anitian'
							) }
							value={ data.titleMainSlider }
							onChange={ ( titleMainSlider ) => {
								const newObj = Object.assign( {}, data, {
									titleMainSlider,
								} );
								const slideInfo = [ ...repeatItems ];
								slideInfo[ index ] = newObj;
								setAttributes( {
									repeatItems: slideInfo,
								} );
							} }
							style={ titleStyle }
							className="real-facts-item-title"
						/>
					) }
					{ descriptionVisiblity && (
						<RichText
							tagName="p"
							placeholder={ __(
								'Enter Section Description',
								'anitian'
							) }
							value={ data.descMainSlider }
							onChange={ ( descMainSlider ) => {
								const newObj = Object.assign( {}, data, {
									descMainSlider,
								} );
								const slideInfo = [ ...repeatItems ];
								slideInfo[ index ] = newObj;
								setAttributes( {
									repeatItems: slideInfo,
								} );
							} }
							style={ descriptionStyle }
							className="real-facts-item-desc"
						/>
					) }
					<div className="real-facts-slider-wrap  main-slider-wrap">
						<Slider { ...mainSliderSettings }>
							{ sliderItems.map( ( slideData, slideMapIndex ) => {
								if (
									data.repeatIndex === slideData.slideIndex
								) {
									return (
										<>
											{ sliderItems.length > 0 && (
												<div className="slide-edit">
													<Tooltip text="Remove item">
														<button
															className="remove-btn"
															onClick={ () => {
																const confirmRemove =
																	window.confirm(
																		'Are you sure you want to remove this item?'
																	);

																if (
																	confirmRemove
																) {
																	const newObj =
																		[
																			...sliderItems,
																		];
																	newObj.splice(
																		slideData,
																		1
																	);
																	setAttributes(
																		{
																			sliderItems:
																				newObj,
																		}
																	);
																}
															} }
														>
															<i
																className="dashicons dashicons-no-alt remove-image"
																aria-hidden="true"
															></i>
															{ 'Remove Slide' }
														</button>
													</Tooltip>
												</div>
											) }
											<div className="real-fact-slides">
												<RichText
													tagName="h4"
													placeholder={ __(
														'Enter Slide SubHeading',
														'anitian'
													) }
													value={
														slideData.slideSubTitle
													}
													onChange={ (
														slideSubTitle
													) => {
														const newObj =
															Object.assign(
																{},
																slideData,
																{
																	slideSubTitle,
																}
															);
														const slideInfo = [
															...sliderItems,
														];
														slideInfo[
															slideMapIndex
														] = newObj;
														setAttributes( {
															sliderItems:
																slideInfo,
														} );
													} }
													style={ mainSliderStyle }
													className="real-facts-main-slider-subheading"
												/>
												<RichText
													tagName="h3"
													placeholder={ __(
														'Enter Slide Heading',
														'anitian'
													) }
													value={
														slideData.slideTitle
													}
													onChange={ (
														slideTitle
													) => {
														const newObj =
															Object.assign(
																{},
																slideData,
																{
																	slideTitle,
																}
															);
														const slideInfo = [
															...sliderItems,
														];
														slideInfo[
															slideMapIndex
														] = newObj;
														setAttributes( {
															sliderItems:
																slideInfo,
														} );
													} }
													style={ mainSliderStyle }
													className="real-facts-main-slider-heading"
												/>
												<RichText
													tagName="p"
													placeholder={ __(
														'Enter Slide Description',
														'anitian'
													) }
													value={
														slideData.slideDescription
													}
													onChange={ (
														slideDescription
													) => {
														const newObj =
															Object.assign(
																{},
																slideData,
																{
																	slideDescription,
																}
															);
														const slideInfo = [
															...sliderItems,
														];
														slideInfo[
															slideMapIndex
														] = newObj;
														setAttributes( {
															sliderItems:
																slideInfo,
														} );
													} }
													style={ mainSliderStyle }
													className="real-facts-main-slider-description"
												/>
											</div>
										</>
									);
								}
							} ) }
						</Slider>
						<div className="content-wrapped">
							<Tooltip text="Add item">
								<button
									className="add-new-item"
									onClick={ () => {
										setAttributes( {
											sliderItems: [
												{
													slideIndex:
														data.repeatIndex,
													slideTitle: '',
													slideSubTitle: '',
													slideDescription: '',
												},
												...sliderItems,
											],
										} );
									} }
								>
									<i className="add-new-item dashicons dashicons-plus"></i>
									{ 'Add New Slide' }
								</button>
							</Tooltip>
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
						title={ __( 'Main Slider Settings', 'anitian' ) }
						initialOpen={ false }
					>
						<PanelRow>
							<label htmlFor="Display Mode">
								{ __( 'Autoslide', 'anitian' ) }
							</label>
							<FormToggle
								label="auto"
								checked={ autoplay }
								onChange={ () =>
									setAttributes( {
										autoplay: ! autoplay,
									} )
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Display Mode">
								{ __( 'Dots Visibility', 'anitian' ) }
							</label>
							<FormToggle
								checked={ dots }
								onChange={ () =>
									setAttributes( {
										dots: ! dots,
									} )
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Display Mode">
								{ __( 'Arrows Visibility', 'anitian' ) }
							</label>
							<FormToggle
								checked={ arrows }
								onChange={ () =>
									setAttributes( {
										arrows: ! arrows,
									} )
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Infinite Mode">
								{ __( 'Infinite Mode', 'anitian' ) }
							</label>
							<FormToggle
								checked={ infinite }
								onChange={ () =>
									setAttributes( {
										infinite: ! infinite,
									} )
								}
							/>
						</PanelRow>
					</PanelBody>
					<PanelBody
						title={ __( 'Hide/Show Options' ) }
						initialOpen={ false }
						className="hideshow-block-setting"
					>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Block Heading Visiblity' ) }
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
								label={ __( 'Block Description Visiblity' ) }
								checked={ mainDescVisiblity }
								onChange={ () =>
									setAttributes( {
										mainDescVisiblity: ! mainDescVisiblity,
									} )
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={ __( 'Section Title Visiblity' ) }
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
								label={ __( 'Section Description Visiblity' ) }
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
			<div className="wp-block-anitian-real-facts">
				<div
					className="real-facts-background-image"
					style={ sectionBgStyle }
				>
					<div
						className="real-facts-content-inner block-container"
						style={ alignStyle }
					>
						<div className="real-facts-line"></div>
						<div className="real-facts-header" style={ alignStyle }>
							{ headingVisiblity && (
								<RichText
									tagName="h2"
									placeholder={ __( 'Block Heading' ) }
									value={ title }
									onChange={ ( newTitle ) =>
										setAttributes( { title: newTitle } )
									}
									className="real-facts-heading"
									style={ headingStyle }
								/>
							) }
							{ mainDescVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Block Description' ) }
									value={ description }
									onChange={ ( newdescription ) =>
										setAttributes( {
											description: newdescription,
										} )
									}
									className="real-facts-desc"
									style={ mainDescStyle }
								/>
							) }
							{ btnVisiblity && (
								<RichText
									tagName="p"
									placeholder={ __( 'Button Text' ) }
									value={ btnText }
									onChange={ ( newbtnText ) =>
										setAttributes( {
											btnText: newbtnText,
										} )
									}
									className="real-facts btn-main"
									style={ btnStyle }
								/>
							) }
						</div>
						<div
							className={ `real-facts-item-content ${ selectedOption }` }
						>
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
																	setAttributes(
																		{
																			repeatItems:
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
										{ renderDataByOption(
											data,
											index,
											selectedOption
										) }
									</div>
								</>
							) ) }
						</div>
						<div className="content-wrapped">
							{ renderDropdown() }
							<Tooltip text="Add item">
								<button
									className="add-new-item"
									onClick={ () => {
										initList( selectedOption );
									} }
								>
									<i className="add-new-item dashicons dashicons-plus"></i>
									{ 'Add New Item' }
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
