
import { __ } from '@wordpress/i18n';
import Select from "react-select";
import ServerSideRender from '@wordpress/server-side-render';
import { AnaEnterpriseColors } from "../common";
import { InspectorControls, RichText, MediaUpload, MediaUploadCheck, PanelColorSettings } from "@wordpress/block-editor";
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	PanelRow,
	FormToggle,
	Button,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";

import metadata from './block.json';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param root0
 * @param root0.attributes
 * @param root0.attributes.heading
 * @param root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes: { heading, selectedPosts, numberOfPosts, postOrderBy, postOrder, dots, arrows, autoplay, slideInfinite, bgImage, sliderBgColor, titleColor, subtitleColor, descColor }, setAttributes, className }) {
	const [allPosts, setPosts] = useState([]);

	useEffect(() => {
		const postList = [];
		wp.apiFetch({ path: "ana_api/request/testimonial" }).then((items) => {
			items.forEach(function (item) {
				postList.push({
					label: __(item.title, "ana-enterprise"),
					value: __(item.id, "ana-enterprise"),
				});
			});
			setPosts(postList);
		});
	}, []);

	useEffect(() => {
		reloadSlider();
		initslider();
	}, [dots, arrows, autoplay, slideInfinite]);

	const initslider = () => {
		if (!jQuery('.slider-for-testimonials').hasClass('slick-initialized')) {
		  setTimeout(() => {
			jQuery('.slider-for-testimonials').slick({
			  autoplay: autoplay,
			  infinite: slideInfinite,
			  dots: dots,
			  slidesToShow: 1,
			  slidesToScroll: 1,
			  arrows: arrows,
			});
		  }, 1000);
		}
	  };

	const reloadSlider = () => {
		const slider = jQuery('.slider-for-testimonials');
		if (slider.hasClass('slick-initialized')) {
			slider.slick('unslick');
			setTimeout(() => {
				initslider();
			}, 500);
		}
	};

	return (
		<>
			<InspectorControls>
				<div className="inspector-field">
					<PanelBody title={__("Block Settings", "ana-enterprise")}>
						<p>
							<strong>Heading</strong>
						</p>
						<RichText
							tagName="p"
							placeholder={__("Enter Heading", "ana-enterprise")}
							value={heading}
							onChange={(newTitle) => {
								setAttributes({ heading: newTitle })
								reloadSlider();
							}}
							style={{ border: '1px solid #000', padding: '5px 10px' }}
						/>
						<div className="inspector-field">
							<span className="ana-enterprise-control-label">Select Testimonials</span>
							<Select
								className="ana-enterprise-select-control"
								name="posttype"
								value={selectedPosts}
								onChange={(newSelect) => {
									setAttributes({ selectedPosts: newSelect });
									reloadSlider();
								}}
								options={allPosts}
								isMulti="true"
							/>
						</div>
						<div className="inspector-field">
							<span className="ana-enterprise-control-label">Show Number of Posts</span>
							<NumberControl
								isShiftStepEnabled={true}
								onChange={(newVal) => {
									setAttributes({ numberOfPosts: newVal });
									reloadSlider();
								}}
								shiftStep={1}
								value={numberOfPosts}
							/>
						</div>
						<div className="inspector-field">
							<SelectControl
								label={__("Order", "ana-enterprise")}
								value={postOrder}
								options={[
									{
										label: __("Descending", "ana-enterprise"),
										value: "DESC",
									},
									{
										label: __("Ascending", "ana-enterprise"),
										value: "ASC",
									},
								]}
								onChange={(newVal) => {
									setAttributes({ postOrder: newVal });
									reloadSlider();
								}}
							/>
						</div>
					</PanelBody>
					<PanelBody title={__("Background Settings")} initialOpen={false}>
						<div className="setting-row">
							<label htmlFor="bg image">
								{__("Block Background Image", "ana-enterprise")}
							</label>
							<div className="setting-row">
								{!bgImage.url ? (
									<MediaUploadCheck>
										<MediaUpload
											allowedTypes={["image", "video"]}
											onSelect={(image) => {
												const newImage = {};
												newImage.id = image.id;
												newImage.url = image.url;
												newImage.alt = image.alt;
												newImage.width = image.width;
												newImage.height = image.height;
												newImage.mediaType = image.type;
												newImage.mediaMime = image.mime;
												setAttributes({
													bgImage: newImage,
												});
												reloadSlider();
											}}
											value={bgImage.id}
											render={({ open }) => (
												<Button className="button" onClick={open}>
													{__("Select Image", "ana-enterprise")}
												</Button>
											)}
										/>
									</MediaUploadCheck>
								) : (
									<>
										<div
											className={`${"video" === bgImage.mediaType
												? "image-preview vid-wrapper"
												: "image-preview"
												}`}
										>
											{"video" === bgImage.mediaType ? (
												<Fragment>
													<video
														id={"video-ss"}
														width={1920}
														height={800}
														autoPlay={true}
														controls={false}
														loop={videoLoop}
														muted={videoMuted}
														playsinline
														preload="none"
													>
														<source
															src={bgImage.url}
															type={bgImage.mediaMime}
														></source>
													</video>
												</Fragment>
											) : (
												<img src={bgImage.url} alt="Preview" />
											)}
										</div>
										<MediaUploadCheck>
											<MediaUpload
												title={__("Replace image", "ana-enterprise")}
												value={bgImage.id}
												onSelect={(image) => {
													const newImage = {};
													newImage.id = image.id;
													newImage.url = image.url;
													newImage.alt = image.alt;
													newImage.width = image.width;
													newImage.height = image.height;
													newImage.mediaType = image.type;
													newImage.mediaMime = image.mime;
													setAttributes({
														bgImage: newImage,
													});
													reloadSlider();
												}}
												allowedTypes={["image", "video"]}
												render={({ open }) => (
													<Button className="button" onClick={open}>
														{`${"video" === bgImage.mediaType
															? "Replace Video"
															: "Replace image"
															}`}
													</Button>
												)}
											/>
											<Button
												className="button"
												onClick={() => {
													setAttributes({
														bgImage: "",
													});
													reloadSlider();
												}}
											>
												{`${"video" === bgImage.mediaType
													? "Remove Video"
													: "Remove image"
													}`}
											</Button>
										</MediaUploadCheck>
									</>
								)}
							</div>
						</div>
					</PanelBody>
					<PanelBody title={__("Color Settings")} initialOpen={false}>
						<div className="setting-row">
							<PanelColorSettings
								colorSettings={[
									{
										value: sliderBgColor,
										onChange: (value) => {
											setAttributes({
												sliderBgColor: value,
											});
											reloadSlider();
										},
										label: __("Slide/Tile Background Color"),
									},
									{
										value: titleColor,
										onChange: (value) => {
											setAttributes({
												titleColor: value,
											});
											reloadSlider();
										},
										label: __("Title Color"),
									},
									{
										value: subtitleColor,
										onChange: (value) => {
											setAttributes({
												subtitleColor: value,
											});
											reloadSlider();
										},
										label: __("Subtitle Color"),
									},
									{
										value: descColor,
										onChange: (value) => {
											setAttributes({
												descColor: value,
											});
											reloadSlider();
										},
										label: __("Description Color"),
									},
								]}
								colors={AnaEnterpriseColors}
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={__("Slider Settings", "ana-enterprise")}
						initialOpen={false}
					>
						<PanelRow>
							<label htmlFor="Display Mode">
								{__("Autoslide", "ana-enterprise")}
							</label>
							<FormToggle
								label="auto"
								checked={autoplay}
								onChange={() =>
									setAttributes({
										autoplay: !autoplay,
									})
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Display Mode">
								{__("Dots Visibility", "ana-enterprise")}
							</label>
							<FormToggle
								checked={dots}
								onChange={() =>
									setAttributes({
										dots: !dots,
									})
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Display Mode">
								{__("Arrows Visibility", "ana-enterprise")}
							</label>
							<FormToggle
								checked={arrows}
								onChange={() =>
									setAttributes({
										arrows: !arrows,
									})
								}
							/>
						</PanelRow>
						<PanelRow>
							<label htmlFor="Infinite Mode">
								{__("Infinite Mode", "ana-enterprise")}
							</label>
							<FormToggle
								checked={slideInfinite}
								onChange={() =>
									setAttributes({
										slideInfinite: !slideInfinite,
									})
								}
							/>
						</PanelRow>
					</PanelBody>
				</div>

			</InspectorControls>
			<ServerSideRender
				block={metadata.name}
				className={className}
				attributes={{
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
					titleColor,
					subtitleColor,
					descColor,
				}}
			/>
		</>
	);
}
