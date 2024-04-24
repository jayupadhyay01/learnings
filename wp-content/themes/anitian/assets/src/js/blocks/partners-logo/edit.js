import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import ServerSideRender from '@wordpress/server-side-render';
import { anitianColors } from '../common';
import jQuery from 'jquery';

import {
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	PanelRow,
	FormToggle,
	Button,
	TextControl,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import metadata from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.attributes.heading
 * @param  root0.setAttributes
 * @param  root0.attributes.selectedPosts
 * @param  root0.attributes.numberOfPosts
 * @param  root0.attributes.postOrderBy
 * @param  root0.attributes.postOrder
 * @param  root0.attributes.dots
 * @param  root0.attributes.arrows
 * @param  root0.attributes.autoplay
 * @param  root0.attributes.slideInfinite
 * @param  root0.attributes.bgImage
 * @param  root0.attributes.sliderBgColor
 * @param  root0.attributes.HeadingColor
 * @param  root0.attributes.buttonLink
 * @param  root0.attributes.buttonText
 * @param  root0.attributes.TitleColor
 * @param  root0.className
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes: {
		heading,
		selectedPosts,
		numberOfPosts,
		postOrderBy,
		postOrder,
		dots,
		arrows,
		autoplay,
		slideInfinite,
		bgImage,
		sliderBgColor,
		HeadingColor,
		buttonLink,
		buttonText,
	},
	setAttributes,
	className,
} ) {
	const [ allPosts, setPosts ] = useState( [] );
	useEffect( () => {
		const postList = [];
		wp.apiFetch( { path: 'anitian_api/request/partners' } ).then(
			( items ) => {
				items.forEach( function ( item ) {
					postList.push( {
						label: item.title,
						value: item.id,
					} );
				} );
				setPosts( postList );
			}
		);
	}, [] );

	useEffect( () => {
		reloadSlider();
		initslider();
	}, [ dots, arrows, autoplay, slideInfinite ] );

	const initslider = () => {
		if (
			! jQuery( '.slider-for-partners' ).hasClass( 'slick-initialized' )
		) {
			setTimeout( () => {
				jQuery( '.slider-for-partners' ).slick( {
					autoplay,
					infinite: slideInfinite,
					dots,
					slidesToShow: 6,
					slidesToScroll: 1,
					arrows,
				} );
			}, 1000 );
		}
	};

	const reloadSlider = () => {
		const slider = jQuery( '.slider-for-partners' );
		if ( slider.hasClass( 'slick-initialized' ) ) {
			slider.slick( 'unslick' );
			setTimeout( () => {
				initslider();
			}, 500 );
		}
	};

	return (
		<>
			<InspectorControls>
				<div className="inspector-field">
					<PanelBody title={ __( 'Block Settings', 'anitian' ) }>
						<p>
							<strong>{ __( 'Heading', 'anitian' ) }</strong>
						</p>
						<RichText
							tagName="p"
							placeholder={ __( 'Enter Heading', 'anitian' ) }
							value={ heading }
							onChange={ ( newTitle ) => {
								setAttributes( { heading: newTitle } );
								reloadSlider();
							} }
							style={ {
								border: '1px solid #000',
								padding: '5px 10px',
							} }
						/>
						<div className="inspector-field">
							<span className="anitian-control-label">
								{ __( 'Select Partners Logo', 'anitian' ) }
							</span>
							<Select
								className="anitian-select-control"
								name="posttype"
								value={ selectedPosts }
								onChange={ ( newSelect ) => {
									setAttributes( {
										selectedPosts: newSelect,
									} );
									reloadSlider();
								} }
								options={ allPosts }
								isMulti="true"
							/>
						</div>
						<div className="inspector-field">
							<span className="anitian-control-label">
								{ __(
									'Select Partners LogoShow Number of Posts',
									'anitian'
								) }
							</span>
							<NumberControl
								isShiftStepEnabled={ true }
								onChange={ ( newVal ) => {
									setAttributes( { numberOfPosts: newVal } );
									reloadSlider();
								} }
								shiftStep={ 1 }
								value={ numberOfPosts }
							/>
						</div>
						<div className="inspector-field">
							<SelectControl
								label={ __( 'Order', 'anitian' ) }
								value={ postOrder }
								options={ [
									{
										label: __( 'Descending', 'anitian' ),
										value: 'DESC',
									},
									{
										label: __( 'Ascending', 'anitian' ),
										value: 'ASC',
									},
								] }
								onChange={ ( newVal ) => {
									setAttributes( { postOrder: newVal } );
									reloadSlider();
								} }
							/>
						</div>
						<div className="inspector-field">
							<p>
								<strong>
									{ __( 'Button Text', 'anitian' ) }
								</strong>
							</p>
							<TextControl
								label={ __( 'Enter Button Text', 'anitian' ) }
								value={ buttonText }
								onChange={ ( newButtonText ) => {
									setAttributes( {
										buttonText: newButtonText,
									} );
									reloadSlider();
								} }
							/>
						</div>
						<div className="inspector-field">
							<p>
								<strong>
									{ __( 'Button Link', 'anitian' ) }
								</strong>
							</p>
							<TextControl
								label={ __( 'Enter Button Link', 'anitian' ) }
								value={ buttonLink }
								onChange={ ( newbuttonLink ) => {
									setAttributes( {
										buttonLink: newbuttonLink,
									} );
									reloadSlider();
								} }
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Background Settings' ) }
						initialOpen={ false }
					>
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
												reloadSlider();
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
													reloadSlider();
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
													reloadSlider();
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
										value: sliderBgColor,
										onChange: ( value ) => {
											setAttributes( {
												sliderBgColor: value,
											} );
											reloadSlider();
										},
										label: __(
											'Slide/Tile Background Color'
										),
									},
									{
										value: HeadingColor,
										onChange: ( value ) => {
											setAttributes( {
												HeadingColor: value,
											} );
											reloadSlider();
										},
										label: __( 'Heading Color' ),
									},
								] }
								colors={ anitianColors }
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={ __( 'Slider Settings', 'anitian' ) }
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
								checked={ slideInfinite }
								onChange={ () =>
									setAttributes( {
										slideInfinite: ! slideInfinite,
									} )
								}
							/>
						</PanelRow>
					</PanelBody>
				</div>
			</InspectorControls>
			<ServerSideRender
				block={ metadata.name }
				className={ className }
				attributes={ {
					heading,
					selectedPosts,
					numberOfPosts,
					postOrderBy,
					postOrder,
					dots,
					arrows,
					autoplay,
					slideInfinite,
					bgImage,
					sliderBgColor,
					HeadingColor,
					buttonLink,
					buttonText,
				} }
			/>
		</>
	);
}
