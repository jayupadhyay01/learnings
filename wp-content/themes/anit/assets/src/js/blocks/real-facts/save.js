/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { RichText, useBlockProps } from '@wordpress/blockEditor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.repeatItems
 * @param  root0.selectedOption
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( { attributes } ) {
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
		backgroundImage: `url(${ bgImage.url })`,
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
	return (
		<>
			<div { ...useBlockProps.save() }>
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
							{ headingVisiblity && title && (
								<RichText.Content
									tagName="h2"
									value={ title }
									className="title-text"
									style={ headingStyle }
								/>
							) }
							{ mainDescVisiblity && description && (
								<RichText.Content
									tagName="p"
									value={ description }
									className="real-facts-desc"
									style={ mainDescStyle }
								/>
							) }
							{ btnVisiblity && btnText && (
								<RichText.Content
									tagName="p"
									value={ btnText }
									className="real-facts btn-main"
									style={ btnStyle }
								/>
							) }
						</div>
						<div className={ `real-facts-item-content` }>
							{ repeatItems.map( ( data, index ) => (
								<div
									className={ `real-facts-item ${ data.selectedOption }` }
									key={ index }
								>
									{ data.selectedOption ===
										'one-col-click' && (
										<>
											<div className="slider-1-col">
												{ data.title1ColSlider &&
													titleVisiblity && (
														<RichText.Content
															tagName="h2"
															value={
																data.title1ColSlider
															}
															style={ titleStyle }
															className="real-facts-item-title"
														/>
													) }
												{ data.desc1ColSlider &&
													descriptionVisiblity && (
														<RichText.Content
															tagName="p"
															value={
																data.desc1ColSlider
															}
															style={
																descriptionStyle
															}
															className="real-facts-item-desc"
														/>
													) }
												<div className="real-facts-slider-wrap click_slider one-col-click-wrap">
													<div className="real-facts-slide-1-wrap">
														<div className="real-facts-slider-image">
															{ data.slideImageURL !==
																'' && (
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
																	loading="lazy"
																/>
															) }
														</div>
														<div className="real-facts-slide-1-content">
															{ data.titleS1 && (
																<RichText.Content
																	tagName="h3"
																	value={
																		data.titleS1
																	}
																	className="real-facts-slide-1-heading"
																	style={
																		slideTitleStyle
																	}
																/>
															) }
															{ data.descriptionS1 && (
																<RichText.Content
																	tagName="p"
																	value={
																		data.descriptionS1
																	}
																	style={
																		slideDescStyle
																	}
																	className="real-facts-slide-1-description"
																/>
															) }
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
														{ data.titleS2 && (
															<RichText.Content
																tagName="h3"
																value={
																	data.titleS2
																}
																style={
																	slideTitleStyle
																}
																className="real-facts-slide-2-heading"
															/>
														) }
														{ data.descriptionS2 && (
															<RichText.Content
																tagName="p"
																value={
																	data.descriptionS2
																}
																style={
																	slideDescStyle
																}
																className="real-facts-slide-2-description"
															/>
														) }
														<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
													</div>
												</div>
											</div>
										</>
									) }
									{ data.selectedOption ===
										'two-col-click' && (
										<>
											<div className="slider-2-col">
												{ data.title2ColSlider &&
													titleVisiblity && (
														<RichText.Content
															tagName="h2"
															value={
																data.title2ColSlider
															}
															style={ titleStyle }
															className="real-facts-item-title"
														/>
													) }
												{ data.desc2ColSlider &&
													descriptionVisiblity && (
														<RichText.Content
															tagName="p"
															value={
																data.desc2ColSlider
															}
															style={
																descriptionStyle
															}
															className="real-facts-item-desc"
														/>
													) }
												<div className="real-facts-slider-wrap  two-col-click-wrap">
													<div className="click_slider slider-1">
														<div className="real-facts-slide-1">
															<div className="real-facts__slide-1-wrap">
																{ data.titleS1Col2 && (
																	<RichText.Content
																		tagName="h3"
																		value={
																			data.titleS1Col2
																		}
																		style={
																			slideTitleStyle
																		}
																		className="real-facts-slide-1-heading"
																	/>
																) }
																{ data.descriptionS1Col2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.descriptionS1Col2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-slide-1-description"
																	/>
																) }
															</div>
														</div>
														<div className="real-facts-slide-2">
															<div className="real-facts__slide-2-wrap">
																{ data.titleS2Col2 && (
																	<RichText.Content
																		tagName="h3"
																		value={
																			data.titleS2Col2
																		}
																		style={
																			slideTitleStyle
																		}
																		className="real-facts-slide-1-heading"
																	/>
																) }
																{ data.descriptionS2Col2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.descriptionS2Col2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-slide-2-description"
																	/>
																) }
																{ data.quoteS2Col2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.quoteS2Col2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-quote"
																	/>
																) }
																<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
															</div>
														</div>
													</div>
													<div className="click_slider slider-2">
														<div className="real-facts-slide-1">
															<div className="real-facts__slide-1-wrap">
																<div className="real-facts-slider-image">
																	{ data.slideImageURL !==
																		'' && (
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
																			loading="lazy"
																		/>
																	) }
																</div>
																{ data.titleS2Slider2 && (
																	<RichText.Content
																		tagName="h3"
																		value={
																			data.titleS2Slider2
																		}
																		style={
																			slideTitleStyle
																		}
																		className="real-facts-slide-1-heading"
																	/>
																) }
																{ data.descriptionS2Slider2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.descriptionS2Slider2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-slide-1-description"
																	/>
																) }
																<span className="real-facts-slide-icon elg-icon elg-icon_plus_alt"></span>
															</div>
														</div>
														<div className="real-facts-slide-2">
															<div className="real-facts__slide-2-wrap">
																{ data.titleS2Slider2 && (
																	<RichText.Content
																		tagName="h3"
																		value={
																			data.titleS2Slider2
																		}
																		style={
																			slideTitleStyle
																		}
																		className="real-facts-slide-2-heading"
																	/>
																) }
																{ data.descriptionS2Slider2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.descriptionS2Slider2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-slide-2-description"
																	/>
																) }
																{ data.quoteS2Slider2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.quoteS2Slider2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-quote"
																	/>
																) }
																{ data.hintS2Slider2 && (
																	<RichText.Content
																		tagName="p"
																		value={
																			data.hintS2Slider2
																		}
																		style={
																			slideDescStyle
																		}
																		className="real-facts-hint"
																	/>
																) }
																<span className="real-facts-slide-icon elg-icon elg-icon_close_alt"></span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</>
									) }
									{ data.selectedOption === 'slider-main' && (
										<>
											<div
												className="real-facts-slider-attr"
												data-slide-autoplay={ autoplay }
												data-slide-arrows={ arrows }
												data-slide-dots={ dots }
												data-slide-infinite={ infinite }
											></div>
											{ data.titleMainSlider &&
												titleVisiblity && (
													<RichText.Content
														tagName="h2"
														value={
															data.titleMainSlider
														}
														style={ titleStyle }
														className="real-facts-item-title"
													/>
												) }
											{ data.descMainSlider &&
												descriptionVisiblity && (
													<RichText.Content
														tagName="p"
														value={
															data.descMainSlider
														}
														style={
															descriptionStyle
														}
														className="real-facts-item-desc"
													/>
												) }
											<div className="real-facts-slider-wrap  main-slider-wrap">
												{ sliderItems.map(
													(
														slideData,
														slideMapIndex
													) => {
														if (
															data.repeatIndex ===
															slideData.slideIndex
														) {
															return (
																<>
																	<div
																		className="real-fact-slides"
																		key={
																			slideMapIndex
																		}
																	>
																		{ slideData.slideSubTitle && (
																			<RichText.Content
																				tagName="h4"
																				value={
																					slideData.slideSubTitle
																				}
																				style={
																					mainSliderStyle
																				}
																				className="real-facts-main-slider-subheading"
																			/>
																		) }
																		{ slideData.slideTitle && (
																			<RichText.Content
																				tagName="h3"
																				value={
																					slideData.slideTitle
																				}
																				style={
																					mainSliderStyle
																				}
																				className="real-facts-main-slider-heading"
																			/>
																		) }
																		{ slideData.slideDescription && (
																			<RichText.Content
																				tagName="p"
																				value={
																					slideData.slideDescription
																				}
																				style={
																					mainSliderStyle
																				}
																				className="real-facts-main-slider-description"
																			/>
																		) }
																	</div>
																</>
															);
														}
													}
												) }
											</div>
										</>
									) }
									{ data.selectedOption ===
										'video-integration' && (
										<>
											<div className="real-facts__video">
												<div className="real-facts__video-img">
													{ data.videoImageURL && (
														<img
															src={
																data.videoImageURL
															}
															alt={
																data.videoImageAlt
															}
															width={
																data.videoImageWidth
															}
															height={
																data.videoImageHeight
															}
														/>
													) }
													<RichText.Content
														tagName="p"
														value={
															data.videoBtnText
														}
														className="video-text"
													/>
												</div>
												<div className="real-facts__video-modal">
													<div className="real-facts__video-modal-content">
														<div className="real-facts__video-modal-wrap">
															<span className="close-modal"></span>
															<iframe
																title="Video PopUp"
																loading="lazy"
																className="video"
																height="440"
																width="782"
																allowfullscreen=""
																src={
																	data.videoURL
																}
																data-src={
																	data.videoURL
																}
															></iframe>
														</div>
													</div>
												</div>
											</div>
										</>
									) }
								</div>
							) ) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
