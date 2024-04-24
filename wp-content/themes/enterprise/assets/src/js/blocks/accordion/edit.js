/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { AnaEnterpriseColors } from "../common";
import Slider from "react-slick";

import "./editor.scss";
const { Fragment, useEffect } = wp.element;
const {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} = wp.blockEditor;
const {
	PanelBody,
	ToggleControl,
	Button,
	Tooltip,
	PanelRow,
	FormToggle
} = wp.components;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	const {
		textAlignment,
		heading,
		headingColor,
		showHeading,
		showAccordion,
		showSlider,
		accordionTitle,
		accordionTitleColor,
		accordionDescription,
		accordionDesColor,
		testimonialTitleColor,
		testimonialDescColor,
		bgColor,
		bgImage,
		repeatItems,
		dots,
		arrows,
		autoplay,
		slideInfinite,
		layoutOption
	} = attributes;

	const layoutOptionClass =
		layoutOption === "layout1" ? "left-thumbnail" : "right-thumbnail";

	const headingStyle = {
		color: headingColor,
	};

	const accordionTitleStyle = {
		color: accordionTitleColor,
	};

	const accordionDescStyle = {
		color: accordionDesColor,
	};

	const testimonialTitleStyle = {
		color: testimonialTitleColor,
	};
	const testimonialDescStyle = {
		color: testimonialDescColor,
	};
	const alignStyle = {};
	textAlignment && (alignStyle.textAlign = textAlignment);

	const sectionBgStyle = {};
	bgColor && (sectionBgStyle.background = bgColor);
	bgImage && bgImage.url && (sectionBgStyle.backgroundImage = `url(${bgImage.url})`);

	const sectionBgColor = {};
	bgColor && (sectionBgColor.background = bgColor);

	const settings = {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: dots,
		arrows: arrows,
		autoplay: autoplay,
		centerMode: true,
		centerPadding: "10px",
		speed: 1000,
	};
	useEffect(() => {
		if (0 === repeatItems.length) {
			initList();
		}
	}, []);

	const initList = () => {
		const { repeatItems } = attributes;
		setAttributes({
			repeatItems: [
				...repeatItems,
				{
					index: repeatItems.length,
					title: "",
					description: "",
					imageID: '',
					imageURL: '',
					imageAlt: '',
					imageWidth: '',
					imageHeight: '',
				},
			],
		});
	};
	const repeatItemsList = (data, index) => {
		return (
			<>
				{repeatItems.length > 0 && (
					<div className="slide-edit">
						<Tooltip text="Remove item">
							<button
								className="remove-btn"
								onClick={() => {
									const confirmRemove = window.confirm(
										"Are you sure you want to remove this item?"
									);

									if (confirmRemove) {
										const newObj = [...repeatItems];
										newObj.splice(index, 1);
										setAttributes({ repeatItems: newObj });
									}
								}}
							>
								<i
									className="dashicons dashicons-no-alt remove-image"
									aria-hidden="true"
								></i>{" "}
								Remove Testimonial
							</button>
						</Tooltip>
					</div>
				)}
				<div className="slide-testimonial-inner">
					<div className="testimonial-thumbnail">
						{data.imageURL ? (
							<Fragment>
								<div className="image-preview">
									<div className="image-controls small-icons image-action-wrap">
										<MediaUploadCheck>
											<MediaUpload
												onSelect={(item) => {
													const arrayCopy = [...repeatItems];
													arrayCopy[index].imageID = item.id;
													arrayCopy[index].imageURL = item.url;
													arrayCopy[index].imageAlt = item.alt;
													arrayCopy[index].imageWidth = item.width;
													arrayCopy[index].imageHeight = item.height;
													setAttributes({ repeatItems: arrayCopy });
												}}
												allowedTypes={['image']}
												value={data.imageID}
												render={({ open }) => {
													return (
														<Tooltip text={__('Edit Image', 'ana-enterprise')}>
															<i
																className="dashicons dashicons-edit edit-image"
																onClick={open}
															></i>
														</Tooltip>
													);
												}}
											/>
										</MediaUploadCheck>
										<Tooltip text={__('Remove Image', 'ana-enterprise')}>
											<i
												className="remove-item dashicons dashicons-no-alt"
												onClick={() => {
													let imgDelete = confirm(
														__(
															"Are you sure you want to delete this item?",
															"ana-enterprise"
														)
													);
													if (true === imgDelete) {
														const arrayCopy = [...repeatItems];
														arrayCopy[index].imageID = '';
														arrayCopy[index].imageURL = '';
														arrayCopy[index].imageAlt = '';
														arrayCopy[index].imageWidth = '';
														arrayCopy[index].imageHeight = '';
														setAttributes({ repeatItems: arrayCopy });
													}
												}}
											></i>
										</Tooltip>
									</div>
									<img src={data.imageURL} alt={data.imageAlt} width={data.imageWidth} height={data.imageHeight} />
								</div>
							</Fragment>
						) : (
							<div className="upload-image">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(item) => {
											const arrayCopy = [...repeatItems];
											arrayCopy[index].imageID = item.id;
											arrayCopy[index].imageURL = item.url;
											arrayCopy[index].imageAlt = item.alt;
											arrayCopy[index].imageWidth = item.width;
											arrayCopy[index].imageHeight = item.height;
											setAttributes({ repeatItems: arrayCopy });
										}}
										allowedTypes={['image']}
										value={data.imageURL}
										render={({ open }) => (
											<div className="upload-wrap">
												<Button onClick={open} className="button">
													{__('Select Image', 'ana-enterprise')}
												</Button>
											</div>
										)}
									/>
								</MediaUploadCheck>
							</div>
						)}
					</div>
					<div className="testimonial-content">
						<RichText
							tagName="h4"
							placeholder={__("Enter Testimonial Title", "ana-enterprise")}
							value={data.title}
							onChange={(title) => {
								const newObj = Object.assign({}, data, {
									title,
								});
								const slideInfo = [...repeatItems];
								slideInfo[index] = newObj;
								setAttributes({
									repeatItems: slideInfo,
								});
							}}
							style={testimonialTitleStyle}
							className="testimonial-title"
						/>
						<RichText
							tagName="p"
							placeholder={__("Enter Testimonial Description", "ana-enterprise")}
							value={data.description}
							onChange={(description) => {
								const newObj = Object.assign({}, data, {
									description,
								});
								const slideInfo = [...repeatItems];
								slideInfo[index] = newObj;
								setAttributes({
									repeatItems: slideInfo,
								});
							}}
							style={testimonialDescStyle}
							className="testimonial-description"
						/>
					</div>
				</div>
			</>
		);
	}
	return (
		<Fragment>
			<InspectorControls>
				<div className="ana-enterprise-block-sidebar">
					<PanelBody title={__("Background Settings")} initialOpen={false}>
						<div className="setting-row">
							<label htmlFor="bg image">
								{__("Slider Background Image", "ana-enterprise")}
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
					<PanelBody title={__("Color Settings")} initialOpen={false}>
						<div className="setting-row">
							<PanelColorSettings
								colorSettings={[
									{
										value: bgColor,
										onChange: (value) => {
											setAttributes({
												bgColor: value,
											});
										},
										label: __("Background Color"),
									},
									{
										value: headingColor,
										onChange: (value) => {
											setAttributes({
												headingColor: value,
											});
										},
										label: __("Heading Color"),
									},
									{
										value: accordionTitleColor,
										onChange: (value) => {
											setAttributes({
												accordionTitleColor: value,
											});
										},
										label: __("Accordion Title Color"),
									},
									{
										value: accordionDesColor,
										onChange: (value) => {
											setAttributes({
												accordionDesColor: value,
											});
										},
										label: __("Accordion Description Color"),
									},
									{
										value: testimonialTitleColor,
										onChange: (value) => {
											setAttributes({
												testimonialTitleColor: value,
											});
										},
										label: __("Testimonial Title Color"),
									},
									{
										value: testimonialDescColor,
										onChange: (value) => {
											setAttributes({
												testimonialDescColor: value,
											});
										},
										label: __("Testimonial Description Color"),
									},
								]}
								colors={AnaEnterpriseColors}
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={__("Hide/Show Options")}
						initialOpen={false}
						className="hideshow-block-setting"
					>
						<div className="setting-row">
							<ToggleControl
								label={__("Heading Visiblity")}
								checked={showHeading}
								onChange={() =>
									setAttributes({
										showHeading: !showHeading,
									})
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={__("Testimonial Slider Visiblity")}
								checked={showSlider}
								onChange={() =>
									setAttributes({
										showSlider: !showSlider,
									})
								}
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={__("Slider Layout Settings", "ana-enterprise")}
						initialOpen={true}
					>
						<div className="block-style-group block-style-group-full">
							<Button
								className={
									"layout1" === layoutOption ? "button active" : "button"
								}
								onClick={() => {
									setAttributes({
										layoutOption: "layout1",
									});
								}}
								value="layout1"
							>
								<div
									style={{
										backgroundImage: `url('/wp-content/themes/ana-enterprise/assets/src/images/accordion-layout2.png')`,
										backgroundSize: "100%",
										backgroundPosition: "center",
									}}
								></div>
								<label htmlFor="layout 1 settings">
									{__("Layout 1", "ana-enterprise")}
								</label>
							</Button>
							<Button
								className={
									"layout2" === layoutOption ? "button active" : "button"
								}
								onClick={() => {
									setAttributes({
										layoutOption: "layout2",
									});
								}}
								value="layout2"
							>
								<div
									style={{
										backgroundImage: `url('/wp-content/themes/ana-enterprise/assets/src/images/accordion-layout1.png')`,
										backgroundSize: "100%",
										backgroundPosition: "center",
									}}
								></div>
								<label htmlFor="layout 2 settings">
									{__("Layout 2", "ana-enterprise")}
								</label>
							</Button>
						</div>
					</PanelBody>
					<PanelBody title={__("Font Alignment")} initialOpen={false}>
						<div className="setting-row">
							<div className="inspector-field-alignment inspector-field inspector-responsive">
								<div className="inspector-field-button-list inspector-field-button-list-fluid">
									<button
										className={`inspector-button ${"left" === textAlignment ? "active" : ""
											}`}
										onClick={() =>
											setAttributes({
												textAlignment: "left",
											})
										}
									>
										{leftAlign}
									</button>
									<button
										className={`inspector-button ${"center" === textAlignment ? "active" : ""
											}`}
										onClick={() =>
											setAttributes({
												textAlignment: "center",
											})
										}
									>
										{centerAlign}
									</button>
									<button
										className={`inspector-button ${"right" === textAlignment ? "active" : ""
											}`}
										onClick={() =>
											setAttributes({
												textAlignment: "right",
											})
										}
									>
										{rightAlign}
									</button>
								</div>
							</div>
						</div>
					</PanelBody>
				</div>
			</InspectorControls>
			<div className="wp-block-ana-enterprise-accordion" style={sectionBgColor}>
				<div className="accordion-block-container">
					{showHeading && (
						<RichText
							tagName="h2"
							placeholder={__("Enter Heading", "ana-enterprise")}
							value={heading}
							onChange={(newHeading) => setAttributes({ heading: newHeading })}
							style={headingStyle}
							className="accordion-heading"
						/>
					)}
					{showAccordion && (
						<div className="accordion-block-heading">
							<RichText
								tagName="h3"
								placeholder={__("Enter Accordion Title", "ana-enterprise")}
								value={accordionTitle}
								onChange={(newAccordionTitle) => setAttributes({ accordionTitle: newAccordionTitle })}
								style={accordionTitleStyle}
								className="accordion-title"
							/>
							<RichText
								tagName="p"
								placeholder={__("Enter Accordion Description", "ana-enterprise")}
								value={accordionDescription}
								onChange={(newAccordionDescription) => setAttributes({ accordionDescription: newAccordionDescription })}
								style={accordionDescStyle}
								className="accordion-description"
							/>
						</div>
					)}
					{showSlider && (
						<>
							<Slider {...settings}>
								{repeatItems.map((data, index) => (
									<div className={`testimonial-slider-wrapper ${layoutOptionClass}`} data-key={index} style={sectionBgStyle}>
										{repeatItemsList(data, index)}
									</div>
								))}
							</Slider>

							<div className="video-wrapped">
								<Tooltip text="Add item">
									<button
										className="add-new-item"
										onClick={() => {
											setAttributes({
												repeatItems: [
													{
														index: 0,
														title: "",
														description: "",
														slideImageID: "",
														slideImageURL: "",
														slideImageAlt: ""
													},
													...repeatItems,
												],
											});
										}}
									>
										<i className="add-new-item dashicons dashicons-plus"></i> Add New Testimonial
									</button>
								</Tooltip>
							</div>
						</>
					)}

				</div>
			</div>
		</Fragment>
	);
}
