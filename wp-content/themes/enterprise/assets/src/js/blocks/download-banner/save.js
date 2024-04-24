import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const { attributes } = props;
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

	return (
		<div {...useBlockProps.save()} style={sectionBgStyle}>
			<div className="download-banner-container">
				<div className="content-section" style={alignStyle}>
					{showHeading && heading && (
						<RichText.Content
							tagName="h2"
							value={heading}
							style={headingStyle}
							className="download-banner-heading"
						/>
					)}
					{showDescription && description && (
						<RichText.Content
							tagName="p"
							value={description}
							style={descriptionStyle}
							className="download-banner-description"
						/>
					)}
				</div>
				{0 < listItems.length && (
					<div className="btn-section">
						{listItems.map((data, index) => {
							return (
								<div className="btn-main btn-grp" data-key={index}>
									{data.imageURL && (
										<img src={data.imageURL} alt={data.imageAlt} width={data.imageWidth} height={data.imageHeight} />
									)}
									{data.btnText && (
										<RichText.Content
											tagName="p"
											value={data.btnText}
											style={btnStyle}
											className="download-banner-btn"
										/>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
