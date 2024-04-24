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
export default function Save(props) {
	const { attributes } = props;
	const {
		heading,
		headingColor,
		showHeading,
		listItems,
		bgImage,
		bgColor,
		descriptionColor,
		textAlignment
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

	return (
		<div {...useBlockProps.save()} style={sectionBgStyle}>
			<div className="impact-main-container">
				{showHeading && heading && (
					<RichText.Content
						tagName="h2"
						value={heading}
						style={headingStyle}
						className="heading-text"
					/>
				)}
				{0 < listItems.length && (
					<div className="impact-main-inner">
						{listItems.map((data, index) => {
							const itemClasses = `impact-items ${index % 2 === 0 ? 'left-thumbnail' : 'right-thumbnail'}`;
							return (
								<div data-key={index} className={itemClasses}>
									<div className="impact-item-img">
										{data.imageURL && (
											<img src={data.imageURL} alt={data.imageAlt} width={data.imageWidth} height={data.imageHeight} />
										)}
									</div>
									<div className="impact-item-text" style={alignStyle}>
										{data.description && (
											<RichText.Content
												tagName="p"
												value={data.description}
												style={descriptionStyle}
												className="description-text"
											/>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}