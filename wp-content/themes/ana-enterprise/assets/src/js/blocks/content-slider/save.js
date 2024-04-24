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

	return (
		<div {...useBlockProps.save()} style={sectionBgStyle}>
			{showHeading && heading && (
				<RichText.Content
					tagName="h2"
					value={heading}
					style={headingStyle}
					className="content-slider-heading"
				/>
			)}
			<div
				className="content-slider-main"
				data-slide-autoplay={autoplay}
				data-slide-arrows={arrows}
				data-slide-dots={dots}
				data-slide-infinite={slideInfinite}
			>
				{repeatItems.map((data, index) => (
					<div className={"content-slider-wrapper"} data-key={index}>
						<div className="content-slider-inner">
							<div className="content-box-column1 box-columns">
								<div className="content-section" style={alignStyle}>
									{showTitle && data.title1 && (
										<RichText.Content
											tagName="h3"
											style={TitleStyle}
											className="content-slider-title c1"
											value={data.title1}
										/>
									)}
									{showDesc && data.description1 && (
										<RichText.Content
											tagName="p"
											style={DescStyle}
											className="content-slider-description c1"
											value={data.description1}
										/>
									)}
								</div>
								<div className="img-section">
									{data.slideImageURL1 && (
										<img src={data.slideImageURL1} alt={data.slideImageAlt1} width={data.imageWidth1} height={data.imageHeight1} />
									)}
								</div>
							</div>

							<div className="content-box-column2 box-columns">
								<div className="img-section">
									{data.slideImageURL2 && (
										<img src={data.slideImageURL2} alt={data.slideImageAlt2} width={data.imageWidth2} height={data.imageHeight2} />
									)}
								</div>
								<div className="content-section" style={alignStyle}>
									{showTitle && data.title2 && (
										<RichText.Content
											tagName="h3"
											style={TitleStyle}
											className="content-slider-title c2"
											value={data.title2}
										/>
									)}
									{showDesc && data.description2 && (
										<RichText.Content
											tagName="p"
											style={DescStyle}
											className="content-slider-description c2"
											value={data.description2}
										/>
									)}
								</div>
							</div>
							<div className="content-box-column3 box-columns">
								<div className="content-section" style={alignStyle}>
									{showTitle && data.title3 && (
										<RichText.Content
											tagName="h3"
											style={TitleStyle}
											className="content-slider-title c3"
											value={data.title3}
										/>
									)}
									{showDesc && data.description3 && (
										<RichText.Content
											tagName="p"
											style={DescStyle}
											className="content-slider-description c3"
											value={data.description3}
										/>
									)}
								</div>
								<div className="img-section">
									{data.slideImageURL3 && (
										<img src={data.slideImageURL3} alt={data.slideImageAlt3} width={data.imageWidth3} height={data.imageHeight3} />
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
