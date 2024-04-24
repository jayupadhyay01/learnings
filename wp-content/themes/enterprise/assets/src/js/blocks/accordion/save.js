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
	
	return (
		<div {...useBlockProps.save()} style={sectionBgColor}>
			<div className="accordion-block-container">
				{showHeading && heading &&(
					<RichText.Content
						tagName="h2"
						value={heading}
						style={headingStyle}
						className="accordion-heading"
					/>
				)}
				{showAccordion && (
				<div className="accordion-block-heading">
					{showAccordion && accordionTitle && (
						<RichText.Content
							tagName="h3"
							value={accordionTitle}
							style={accordionTitleStyle}
							className="accordion-title"
						/>
					)}
					{showAccordion && accordionDescription &&(
						<RichText.Content
							tagName="p"
							value={accordionDescription}
							style={accordionDescStyle}
							className="accordion-description"
						/>
					)}
				</div>
				)}
				{showSlider && (
					<div
						className="testimonial-section"
						data-slide-autoplay={autoplay}
						data-slide-arrows={arrows}
						data-slide-dots={dots}
						data-slide-infinite={slideInfinite}
					>
					{repeatItems.map((data, index) => (
						<div className={`testimonial-slider-wrapper ${layoutOptionClass}`} data-key={index} style={sectionBgStyle}>
							<div className="slide-testimonial-inner">
								<div className="testimonial-thumbnail">
								{data.imageURL && (
									<img src={data.imageURL} alt={data.imageAlt} width={data.imageWidth} height={data.imageHeight} />
								)}
								</div>
								<div className="testimonial-content">
								{data.title && (
								<RichText.Content
									tagName="h4"
									style={testimonialTitleStyle}
									className="testimonial-title"
									value={data.title}
								/>
								)}
								{data.description && (
								<RichText.Content
									tagName="p"
									style={testimonialDescStyle}
									className="testimonial-description"
									value={data.description}
								/>
								)}
								</div>
							</div>
						</div>
					))}
					</div>
				)}
			</div>
		</div>
	);
}
