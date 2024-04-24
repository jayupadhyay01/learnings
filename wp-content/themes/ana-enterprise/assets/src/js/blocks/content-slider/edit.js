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
		bgColor,
		heading,
		headingColor,
		showHeading,
		TitleColor,
		DescColor,
		autoplay,
		arrows,
		dots,
		slideInfinite,
		showTitle,
		showDesc,
		repeatItems
	} = attributes;

	const headingStyle = {
		color: headingColor,
	};

	const TitleStyle = {
		color: TitleColor,
	};

	const DescStyle = {
		color: DescColor,
	};

	const alignStyle = {};
	textAlignment && (alignStyle.textAlign = textAlignment);

	const sectionBgStyle = {};
	bgColor && (sectionBgStyle.background = bgColor);

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
					title1: "",
					description1: "",
					title2: "",
					description2: "",
					title3: "",
					description3: "",
					slideImageID1: "",
					slideImageURL1: "",
					slideImageAlt1: "",
					slideImageID2: "",
					slideImageURL2: "",
					slideImageAlt2: "",
					slideImageID3: "",
					slideImageURL3: "",
					slideImageAlt3: ""
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
								Remove Content Slide
							</button>
						</Tooltip>
					</div>
				)}
				<div className="content-slider-inner">
					<div className="content-box-column1 box-columns">
						<div className="content-section" style={alignStyle}>
							{showTitle && (
								<RichText
									tagName="h3"
									placeholder={__("Enter Title", "ana-enterprise")}
									value={data.title1}
									onChange={(title1) => {
										const newObj = Object.assign({}, data, {
											title1,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={TitleStyle}
									className="content-slider-title c1"
								/>
							)}
							{showDesc && (
								<RichText
									tagName="p"
									placeholder={__("Enter Description", "ana-enterprise")}
									value={data.description1}
									onChange={(description1) => {
										const newObj = Object.assign({}, data, {
											description1,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={DescStyle}
									className="content-slider-description c1"
								/>
							)}
						</div>
						<div className="img-section">
							{data.slideImageURL1 ? (
								<Fragment>
									<div className="image-preview">
										<div className="image-controls small-icons image-action-wrap">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(item1) => {
														const arrayCopy = [...repeatItems];
														arrayCopy[index].slideImageID1 = item1.id;
														arrayCopy[index].slideImageURL1 = item1.url;
														arrayCopy[index].slideImageAlt1 = item1.alt;
														arrayCopy[index].imageWidth1 = item1.width;
														arrayCopy[index].imageHeight1 = item1.height;
														setAttributes({ repeatItems: arrayCopy });
													}}
													allowedTypes={['image']}
													value={data.slideImageID1}
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
															arrayCopy[index].slideImageID1 = '';
															arrayCopy[index].slideImageURL1 = '';
															arrayCopy[index].slideImageAlt1 = '';
															arrayCopy[index].imageWidth1 = '';
															arrayCopy[index].imageHeight1 = '';
															setAttributes({ repeatItems: arrayCopy });
														}
													}}
												></i>
											</Tooltip>
										</div>
										<img src={data.slideImageURL1} alt={data.slideImageAlt1} width={data.imageWidth1} height={data.imageHeight1} />
									</div>
								</Fragment>
							) : (
								<div className="upload-image">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={(item1) => {
												const arrayCopy = [...repeatItems];
												arrayCopy[index].slideImageID1 = item1.id;
												arrayCopy[index].slideImageURL1 = item1.url;
												arrayCopy[index].slideImageAlt1 = item1.alt;
												arrayCopy[index].imageWidth1 = item1.width;
												arrayCopy[index].imageHeight1 = item1.height;
												setAttributes({ repeatItems: arrayCopy });
											}}
											allowedTypes={['image']}
											value={data.slideImageURL1}
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
					</div>
					<div className="content-box-column2 box-columns">
						<div className="img-section">
							{data.slideImageURL2 ? (
								<Fragment>
									<div className="image-preview">
										<div className="image-controls small-icons image-action-wrap">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(item2) => {
														const arrayCopy = [...repeatItems];
														arrayCopy[index].slideImageID2 = item2.id;
														arrayCopy[index].slideImageURL2 = item2.url;
														arrayCopy[index].slideImageAlt2 = item2.alt;
														arrayCopy[index].imageWidth2 = item2.width;
														arrayCopy[index].imageHeight2 = item2.height;
														setAttributes({ repeatItems: arrayCopy });
													}}
													allowedTypes={['image']}
													value={data.slideImageID2}
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
															arrayCopy[index].slideImageID2 = '';
															arrayCopy[index].slideImageURL2 = '';
															arrayCopy[index].slideImageAlt2 = '';
															arrayCopy[index].imageWidth2 = '';
															arrayCopy[index].imageHeight2 = '';
															setAttributes({ repeatItems: arrayCopy });
														}
													}}
												></i>
											</Tooltip>
										</div>
										<img src={data.slideImageURL2} alt={data.slideImageAlt2} width={data.imageWidth2} height={data.imageHeight2} />
									</div>
								</Fragment>
							) : (
								<div className="upload-image">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={(item2) => {
												const arrayCopy = [...repeatItems];
												arrayCopy[index].slideImageID2 = item2.id;
												arrayCopy[index].slideImageURL2 = item2.url;
												arrayCopy[index].slideImageAlt2 = item2.alt;
												arrayCopy[index].imageWidth2 = item2.width;
												arrayCopy[index].imageHeight2 = item2.height;
												setAttributes({ repeatItems: arrayCopy });
											}}
											allowedTypes={['image']}
											value={data.slideImageURL2}
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
						<div className="content-section" style={alignStyle}>
							{showTitle && (
								<RichText
									tagName="h3"
									placeholder={__("Enter Title", "ana-enterprise")}
									value={data.title2}
									onChange={(title2) => {
										const newObj = Object.assign({}, data, {
											title2,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={TitleStyle}
									className="content-slider-title c2"
								/>
							)}
							{showDesc && (
								<RichText
									tagName="p"
									placeholder={__("Enter Description", "ana-enterprise")}
									value={data.description2}
									onChange={(description2) => {
										const newObj = Object.assign({}, data, {
											description2,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={DescStyle}
									className="content-slider-description c2"
								/>
							)}
						</div>
					</div>
					<div className="content-box-column3 box-columns">
						<div className="content-section" style={alignStyle}>
							{showTitle && (
								<RichText
									tagName="h3"
									placeholder={__("Enter Title", "ana-enterprise")}
									value={data.title3}
									onChange={(title3) => {
										const newObj = Object.assign({}, data, {
											title3,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={TitleStyle}
									className="content-slider-title c3"
								/>
							)}
							{showDesc && (
								<RichText
									tagName="p"
									placeholder={__("Enter Description", "ana-enterprise")}
									value={data.description3}
									onChange={(description3) => {
										const newObj = Object.assign({}, data, {
											description3,
										});
										const slideInfo = [...repeatItems];
										slideInfo[index] = newObj;
										setAttributes({
											repeatItems: slideInfo,
										});
									}}
									style={DescStyle}
									className="content-slider-description c3"
								/>
							)}
						</div>
						<div className="img-section">
							{data.slideImageURL3 ? (
								<Fragment>
									<div className="image-preview">
										<div className="image-controls small-icons image-action-wrap">
											<MediaUploadCheck>
												<MediaUpload
													onSelect={(item3) => {
														const arrayCopy = [...repeatItems];
														arrayCopy[index].slideImageID3 = item3.id;
														arrayCopy[index].slideImageURL3 = item3.url;
														arrayCopy[index].slideImageAlt3 = item3.alt;
														arrayCopy[index].imageWidth3 = item3.width;
														arrayCopy[index].imageHeight3 = item3.height;
														setAttributes({ repeatItems: arrayCopy });
													}}
													allowedTypes={['image']}
													value={data.slideImageID3}
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
															arrayCopy[index].slideImageID3 = '';
															arrayCopy[index].slideImageURL3 = '';
															arrayCopy[index].slideImageAlt3 = '';
															arrayCopy[index].imageWidth3 = '';
															arrayCopy[index].imageHeight3 = '';
															setAttributes({ repeatItems: arrayCopy });
														}
													}}
												></i>
											</Tooltip>
										</div>
										<img src={data.slideImageURL3} alt={data.slideImageAlt3} width={data.imageWidth3} height={data.imageHeight3} />
									</div>
								</Fragment>
							) : (
								<div className="upload-image">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={(item3) => {
												const arrayCopy = [...repeatItems];
												arrayCopy[index].slideImageID3 = item3.id;
												arrayCopy[index].slideImageURL3 = item3.url;
												arrayCopy[index].slideImageAlt3 = item3.alt;
												arrayCopy[index].imageWidth3 = item3.width;
												arrayCopy[index].imageHeight3 = item3.height;
												setAttributes({ repeatItems: arrayCopy });
											}}
											allowedTypes={['image']}
											value={data.slideImageURL3}
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
					</div>
				</div>
			</>
		);
	}
	return (
		<Fragment>
			<InspectorControls>
				<div className="ana-enterprise-block-sidebar">
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
										value: TitleColor,
										onChange: (value) => {
											setAttributes({
												TitleColor: value,
											});
										},
										label: __("Title Color"),
									},
									{
										value: DescColor,
										onChange: (value) => {
											setAttributes({
												DescColor: value,
											});
										},
										label: __("Description Color"),
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
								label={__("Slider Title Visiblity")}
								checked={showTitle}
								onChange={() =>
									setAttributes({
										showTitle: !showTitle,
									})
								}
							/>
						</div>
						<div className="setting-row">
							<ToggleControl
								label={__("Slider Description Visiblity")}
								checked={showDesc}
								onChange={() =>
									setAttributes({
										showDesc: !showDesc,
									})
								}
							/>
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
			<div className="wp-block-ana-enterprise-content-slider" style={sectionBgStyle}>
				{showHeading && (
					<RichText
						tagName="h2"
						placeholder={__("Enter Heading", "ana-enterprise")}
						value={heading}
						onChange={(newHeading) => setAttributes({ heading: newHeading })}
						style={headingStyle}
						className="content-slider-heading"
					/>
				)}
				<Slider {...settings}>
					{repeatItems.map((data, index) => (
						<div className={"content-slider-wrapper"} data-key={index}>
							{repeatItemsList(data, index)}
						</div>
					))}
				</Slider>
				<div className="content-wrapped">
					<Tooltip text="Add item">
						<button
							className="add-new-item"
							onClick={() => {
								setAttributes({
									repeatItems: [
										{
											index: 0,
											title1: "",
											description1: "",
											title2: "",
											description2: "",
											title3: "",
											description3: "",
											slideImageID1: "",
											slideImageURL1: "",
											slideImageAlt1: "",
											slideImageID2: "",
											slideImageURL2: "",
											slideImageAlt2: "",
											slideImageID3: "",
											slideImageURL3: "",
											slideImageAlt3: ""
										},
										...repeatItems,
									],
								});
							}}
						>
							<i className="add-new-item dashicons dashicons-plus"></i> Add New Content Slide
						</button>
					</Tooltip>
				</div>
			</div>
		</Fragment>
	);
}
