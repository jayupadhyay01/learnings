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
	Tooltip,
} = wp.components;
export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		headingColor,
		showHeading,
		listItems,
		bgImage,
		bgColor,
		descriptionColor,
		textAlignment,
	} = attributes;

	const headingStyle = {
		color: headingColor,
	};

	const descriptionStyle = {
		color: descriptionColor,
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
	const addNewLItem = () => {
		const attr = {
			index: listItems.length,
			title: "",
			description: "",
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
								{__("Background Image", "ana-enterprise")}
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
			<div className='wp-block-ana-enterprise-impact' style={sectionBgStyle}>
				<div className="impact-main-container">
					{showHeading && (
						<RichText
							tagName="h2"
							placeholder={__("Heading")}
							value={heading}
							onChange={(newHeading) => setAttributes({ heading: newHeading })}
							style={headingStyle}
							className="heading-text"
						/>
					)}
					{0 < listItems.length && (
						<div className="impact-main-inner">
							{listItems.map((data, index) => {
								const itemClasses = `impact-items show-items-hover-wrap ${index % 2 === 0 ? 'left-thumbnail' : 'right-thumbnail'}`;
								return (
									<div data-key={index} className={itemClasses}>
										<div className="item-action-wrap show-items-hover">
											<div className="move-item">
												{0 < index && (
													<Tooltip text={__("Move Up", "ana-enterprise")}>
														<span
															className="move-left dashicons dashicons-arrow-up-alt"
															aria-hidden="true"
															onClick={() => moveItem(index, index - 1)}
														></span>
													</Tooltip>
												)}
												{index + 1 < listItems.length && (
													<Tooltip text={__("Move Down", "ana-enterprise")}>
														<span
															className="move-right dashicons dashicons-arrow-down-alt"
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
										<div className="impact-item-img">
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
										</div>
										<div className="impact-item-text" style={alignStyle}>
											<RichText
												tagName="p"
												placeholder={__("Enter Description", "ana-enterprise")}
												value={data.description}
												onChange={(value) => {
													let arrayCopy = [...listItems];
													arrayCopy[index].description = value;
													setAttributes({ listItems: arrayCopy });
												}}
												style={descriptionStyle}
												className="description-text"
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
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
			</div>
		</Fragment>
	);
}
