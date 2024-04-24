import { __ } from '@wordpress/i18n';
import { leftAlign, rightAlign, centerAlign } from "../icons";
import { AnaEnterpriseColors } from "../common";
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
	Tooltip
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
		bgColor,
		textAlignment,
		heading,
		headingColor,
		description,
		descriptionColor,
		btnColor,
		showHeading,
		showDescription,
		bgImage,
		listItems,
	} = attributes;

	const headingStyle = {
		color: headingColor,
	};

	const descriptionStyle = {
		color: descriptionColor,
	};

	const btnStyle = {
		color: btnColor,
	};

	const alignStyle = {};
	textAlignment && (alignStyle.textAlign = textAlignment);

	const sectionBgStyle = {};
	bgColor && (sectionBgStyle.background = bgColor);
	bgImage && bgImage.url && (sectionBgStyle.backgroundImage = `url(${bgImage.url})`);

	useEffect(() => {
		if (0 === listItems.length) {
			initList();
		}
	}, []);

	const initList = () => {
		setAttributes({
			listItems: [
				...listItems,
				{
					index: 0,
					btnText: "",
					imageID: '',
					imageURL: '',
					imageAlt: '',
					imageWidth: '',
					imageHeight: '',
				},
			],
		});
	};
	const addNewLItem = () => {
		const attr = {
			index: listItems.length,
			btnText: "",
			imageID: '',
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
		};
		setAttributes({
			listItems: [...listItems, attr],
		});
	};
	const moveItem = (oldIndex, newIndex) => {
		const arrayCopy = [...listItems];
		arrayCopy[oldIndex] = listItems[newIndex];
		arrayCopy[newIndex] = listItems[oldIndex];

		setAttributes({
			listItems: arrayCopy,
		});
	};
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
										value: descriptionColor,
										onChange: (value) => {
											setAttributes({
												descriptionColor: value,
											});
										},
										label: __("Description Color"),
									},
									{
										value: btnColor,
										onChange: (value) => {
											setAttributes({
												btnColor: value,
											});
										},
										label: __("Buttons Color"),
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
								label={__("Description Visiblity")}
								checked={showDescription}
								onChange={() =>
									setAttributes({
										showDescription: !showDescription,
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
			<div className="wp-block-ana-enterprise-download-banner" style={sectionBgStyle}>
				<div className="download-banner-container">
					<div className="content-section" style={alignStyle}>
						{showHeading && (
							<RichText
								tagName="h2"
								placeholder={__("Enter Heading", "ana-enterprise")}
								value={heading}
								onChange={(newHeading) => setAttributes({ heading: newHeading })}
								style={headingStyle}
								className="download-banner-heading"
							/>
						)}
						{showDescription && (
							<RichText
								tagName="p"
								placeholder={__("Enter Description", "ana-enterprise")}
								value={description}
								onChange={(newdescription) => setAttributes({ description: newdescription })}
								style={descriptionStyle}
								className="download-banner-description"
							/>
						)}
					</div>
					{0 < listItems.length && (
						<div className="btn-section">
							{listItems.map((data, index) => {
								return (
									<>
										<div className="show-items-hover-wrap">
											<div className="item-action-wrap show-items-hover">
												<div className="move-item">
													{0 < index && (
														<Tooltip text={__("Move Left", "ana-enterprise")}>
															<span
																className="dashicons dashicons-arrow-left-alt move-left"
																aria-hidden="true"
																onClick={() => moveItem(index, index - 1)}
															></span>
														</Tooltip>
													)}
													{index + 1 < listItems.length && (
														<Tooltip text={__("Move Right", "ana-enterprise")}>
															<span
																className="dashicons dashicons-arrow-right-alt move-right"
																onClick={() => moveItem(index, index + 1)}
															></span>
														</Tooltip>
													)}
												</div>

												{1 < listItems.length && (
													<div className="image-controls small-icons">
														<Tooltip text={__("Remove Item", "ana-enterprise")}>
															<i
																className="remove-item dashicons dashicons-no-alt"
																onClick={() => {
																	let toDelete = confirm(
																		__(
																			"Are you sure you want to delete this item?",
																			"ana-enterprise"
																		)
																	);
																	if (true === toDelete) {
																		const updatedArray = listItems
																			.filter(
																				(item) => item.index != data.index
																			)
																			.map((updatedItems) => {
																				if (
																					updatedItems.index > data.index
																				) {
																					updatedItems.index -= 1;
																				}
																				return updatedItems;
																			});
																		setAttributes({
																			listItems: updatedArray,
																		});
																	}
																}}
															></i>
														</Tooltip>
													</div>
												)}
											</div>
											<div className="btn-main btn-grp" data-key={index}>
												{data.imageURL ? (
													<Fragment>
														<div className="image-preview">
															<div className="image-controls small-icons image-action-wrap">
																<MediaUploadCheck>
																	<MediaUpload
																		onSelect={(item) => {
																			const arrayCopy = [...listItems];
																			arrayCopy[index].imageID = item.id;
																			arrayCopy[index].imageURL = item.url;
																			arrayCopy[index].imageAlt = item.alt;
																			arrayCopy[index].imageWidth = item.width;
																			arrayCopy[index].imageHeight = item.height;
																			setAttributes({ listItems: arrayCopy });
																		}}
																		allowedTypes={['image']}
																		value={data.imageID}
																		render={({ open }) => {
																			return (
																				<Tooltip text={__('Edit Image', 'sutherland')}>
																					<i
																						className="dashicons dashicons-edit edit-image"
																						onClick={open}
																					></i>
																				</Tooltip>
																			);
																		}}
																	/>
																</MediaUploadCheck>
																<Tooltip text={__('Remove Image', 'sutherland')}>
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
																				const arrayCopy = [...listItems];
																				arrayCopy[index].imageID = '';
																				arrayCopy[index].imageURL = '';
																				arrayCopy[index].imageAlt = '';
																				arrayCopy[index].imageWidth = '';
																				arrayCopy[index].imageHeight = '';
																				setAttributes({ listItems: arrayCopy });
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
																	const arrayCopy = [...listItems];
																	arrayCopy[index].imageID = item.id;
																	arrayCopy[index].imageURL = item.url;
																	arrayCopy[index].imageAlt = item.alt;
																	arrayCopy[index].imageWidth = item.width;
																	arrayCopy[index].imageHeight = item.height;
																	setAttributes({ listItems: arrayCopy });
																}}
																allowedTypes={['image']}
																value={data.imageURL}
																render={({ open }) => (
																	<div className="upload-wrap">
																		<Button onClick={open} className="button">
																			{__('Select Image', 'sutherland')}
																		</Button>
																	</div>
																)}
															/>
														</MediaUploadCheck>
													</div>
												)}
												<RichText
													tagName="p"
													placeholder={__("Enter Button Text", "ana-enterprise")}
													value={data.btnText}
													onChange={(value) => {
														let arrayCopy = [...listItems];
														arrayCopy[index].btnText = value;
														setAttributes({ listItems: arrayCopy });
													}}
													style={btnStyle}
													className="download-banner-btn"
												/>
											</div>
										</div>
									</>
								);
							})}
							<div
								className="add-item-wrap"
								onClick={() => {
									addNewLItem();
								}}
							>
								<Tooltip text={__("Add New Item", "ana-enterprise")}>
									<i
										className="add-new-item dashicons dashicons-plus"
										aria-hidden="true"
									></i>
								</Tooltip>
							</div>
						</div>
					)}
				</div>
			</div>
		</Fragment>
	);
}
