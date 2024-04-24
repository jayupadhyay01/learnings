/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss';
import { leftAlign, rightAlign, centerAlign } from '../icons';
import { anitianColors } from '../common';
import Slider from 'react-slick';
import { useRef } from 'react';

const { Fragment, useEffect } = wp.element;
const {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} = wp.blockEditor;
const { PanelBody, ToggleControl, Button, Tooltip, PanelRow, FormToggle } =
	wp.components;

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
	const sliderRef = useRef( null );
	const {
		textAlignment,
		heading,
		HeadingColor,
		Subheading,
		subheadingColor,
		bgColor,
		buttonColor,
		headingVisiblity,
		subheadingVisiblity,
		titleColor,
		autoplay,
		arrows,
		dots,
		slideInfinite,
		repeatItems,
		buttonTextColor,
	} = attributes;

	const headingStyle = {
		color: HeadingColor,
	};
	const subheadingStyle = {
		color: subheadingColor,
	};
	const titleStyle = {
		color: titleColor,
	};
	const buttonStyle = {
		background: buttonColor,
		color: buttonTextColor,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || undefined,
	};

	const settings = {
		slidesToShow: 3,
		slidesToScroll: 1,
		dots,
		arrows,
		autoplay,
		infinite: false,
		centerMode: false,
		centerPadding: '10px',
		speed: 500,
	};

	useEffect( () => {
		if ( 0 === repeatItems.length ) {
			initList();
		}
	}, [ repeatItems ] );
	const initList = () => {
		setAttributes( {
			repeatItems: [
				...repeatItems,
				{
					index: repeatItems.length,
					title: '',
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

	const repeatItemsList = ( data, index ) => {
		return (
			<>
				{ repeatItems.length > 0 && (
					<div className="slide-edit">
						<Tooltip text="Remove item">
							<button
								className="remove-btn"
								onClick={ () => {
									const confirmRemove = window.confirm(
										'Are you sure you want to remove this item?'
									);

									if ( confirmRemove ) {
										const newObj = [ ...repeatItems ];
										newObj.splice( index, 1 );
										setAttributes( {
											repeatItems: newObj,
										} );
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
				<div className="resources-slider-content">
					<div className="resources-slider-image">
						{ data.imageURL ? (
							<Fragment>
								<div className="image-preview">
									<div className="image-controls small-icons image-action-wrap">
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
													].imageURL = item.url;
													arrayCopy[
														index
													].imageAlt = item.alt;
													arrayCopy[
														index
													].imageWidth = item.width;
													arrayCopy[
														index
													].imageHeight = item.height;
													setAttributes( {
														repeatItems: arrayCopy,
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
																onClick={ open }
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
													const imgDelete = confirm(
														__(
															'Are you sure you want to delete this item?',
															'anitian'
														)
													);
													if ( true === imgDelete ) {
														const arrayCopy = [
															...repeatItems,
														];
														arrayCopy[
															index
														].imageID = '';
														arrayCopy[
															index
														].imageURL = '';
														arrayCopy[
															index
														].imageAlt = '';
														arrayCopy[
															index
														].imageWidth = '';
														arrayCopy[
															index
														].imageHeight = '';
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
										src={ data.imageURL }
										alt={ data.imageAlt }
										width={ data.imageWidth }
										height={ data.imageHeight }
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
											arrayCopy[ index ].imageURL =
												item.url;
											arrayCopy[ index ].imageAlt =
												item.alt;
											arrayCopy[ index ].imageWidth =
												item.width;
											arrayCopy[ index ].imageHeight =
												item.height;
											setAttributes( {
												repeatItems: arrayCopy,
											} );
										} }
										allowedTypes={ [ 'image' ] }
										value={ data.imageURL }
										render={ ( { open } ) => (
											<div className="upload-wrap">
												<Button
													onClick={ open }
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
					<div className="resources-slider-text">
						<div className="resources-slider-title">
							<RichText
								tagName="h3"
								placeholder={ __( 'Enter Title', 'anitian' ) }
								value={ data.title }
								onChange={ ( title ) => {
									const newObj = Object.assign( {}, data, {
										title,
									} );
									const slideInfo = [ ...repeatItems ];
									slideInfo[ index ] = newObj;
									setAttributes( {
										repeatItems: slideInfo,
									} );
								} }
								style={ titleStyle }
								className="content-slider-title"
							/>
						</div>
						<RichText
							tagName="p"
							placeholder={ __( 'Enter Button', 'anitian' ) }
							value={ data.btnText }
							onChange={ ( btnText ) => {
								const newObj = Object.assign( {}, data, {
									btnText,
								} );
								const slideInfo = [ ...repeatItems ];
								slideInfo[ index ] = newObj;
								setAttributes( {
									repeatItems: slideInfo,
								} );
							} }
							style={ buttonStyle }
							className="content-slider-button btn"
						/>
					</div>
				</div>
			</>
		);
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
							value: subheadingColor,
							onChange: ( value ) => {
								setAttributes( {
									subheadingColor: value,
								} );
							},
							label: __( 'SubHeading Color' ),
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
							value: buttonColor,
							onChange: ( value ) => {
								setAttributes( {
									buttonColor: value,
								} );
							},
							label: __( 'Button Color' ),
						},
						{
							value: buttonTextColor,
							onChange: ( value ) => {
								setAttributes( {
									buttonTextColor: value,
								} );
							},
							label: __( 'Button Text Color' ),
						},
					] }
					colors={ anitianColors }
				/>
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
							label={ __( 'SubHeading Visiblity' ) }
							checked={ subheadingVisiblity }
							onChange={ () =>
								setAttributes( {
									subheadingVisiblity: ! subheadingVisiblity,
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
				className="wp-block-anitian-anitian-resources"
				style={ sectionBgStyle }
			>
				<div
					className="anitian-resources-container"
					style={ alignStyle }
				>
					<div className="anitian-resources-heading">
						<div className="container">
							<div className="anitian-resources-ttl">
								{ subheadingVisiblity && (
									<RichText
										tagName="p"
										placeholder={ __( 'SubHeading' ) }
										value={ Subheading }
										onChange={ ( newSubheading ) =>
											setAttributes( {
												Subheading: newSubheading,
											} )
										}
										className="subheading-text"
										style={ subheadingStyle }
									/>
								) }
								{ headingVisiblity && (
									<RichText
										tagName="h2"
										placeholder={ __( 'Heading' ) }
										value={ heading }
										onChange={ ( newHeading ) =>
											setAttributes( {
												heading: newHeading,
											} )
										}
										className="heading-text"
										style={ headingStyle }
									/>
								) }
							</div>
						</div>
					</div>
					<div className="anitian-resources-slider">
						<Slider { ...settings } ref={ sliderRef }>
							{ repeatItems.map( ( data, index ) => (
								<div
									className={ 'resources-slider-item' }
									key={ index }
								>
									{ repeatItemsList( data, index ) }
								</div>
							) ) }
						</Slider>
						<div className="content-wrapped">
							<Tooltip text="Add item">
								<button
									className="add-new-item"
									onClick={ () => {
										const newIndex = repeatItems.length;
										setAttributes( {
											repeatItems: [
												...repeatItems,
												{
													index: newIndex,
													title: '',
													btnText: '',
													imageID: '',
													imageURL: '',
													imageAlt: '',
													imageWidth: '',
													imageHeight: '',
												},
											],
										} );
										if ( sliderRef.current ) {
											sliderRef.current.slickGoTo(
												newIndex
											);
										}
									} }
								>
									<i className="add-new-item dashicons dashicons-plus"></i>{ ' ' }
									Add New Slide
								</button>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
