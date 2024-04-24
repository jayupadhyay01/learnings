/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param  props
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( props ) {
	const { attributes } = props;
	const {
		textAlignment,
		Heading,
		HeadingColor,
		headingVisiblity,
		buttonText,
		buttonTextColor,
		buttonBgColor,
		buttonVisiblity,
		BgGradientColor,
		bgImage,
		description,
		descriptionColor,
		descriptionVisiblity,
		Image,
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		cardHeading,
		cardHeadingColor,
		cardHeadingVisiblity,
		cardSubHeading,
		cardSubHeadingColor,
		cardSubHeadingVisiblity,
		cardDescription,
		cardDescriptionColor,
		cardDescriptionVisiblity,
		cardImage,
		bgColor,
		cardBgColor,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const subHeadingStyle = {
		color: subHeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const cardSubHeadingStyle = {
		color: cardSubHeadingColor || undefined,
	};
	const cardHeadingStyle = {
		color: cardHeadingColor || undefined,
	};
	const cardDescriptionStyle = {
		color: cardDescriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || undefined,
		background: buttonBgColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const blockBgStyle = {
		background: bgColor || undefined,
	};
	const cardBgStyle = {
		background: cardBgColor || undefined,
	};
	const cardGradStyle = {
		background: BgGradientColor || undefined,
	};
	const cardBgImgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ blockBgStyle }>
			<div className="games-trader-section block-container">
				<div className="games-trader-text-section" style={ alignStyle }>
					{ subHeadingVisiblity && subHeading && (
						<RichText.Content
							tagName="p"
							value={ subHeading }
							className="subheading-text"
							style={ subHeadingStyle }
						/>
					) }
					{ headingVisiblity && Heading && (
						<RichText.Content
							tagName="h2"
							value={ Heading }
							className="heading-text"
							style={ headingStyle }
						/>
					) }
					{ descriptionVisiblity && description && (
						<RichText.Content
							tagName="p"
							value={ description }
							className="description-text"
							style={ descriptionStyle }
						/>
					) }
				</div>
				<div className="games-trader-img">
					<div className="games-trader-img-wrap">
						{ Image.url !== '' && (
							<img
								src={ Image.url }
								height={ Image.height }
								width={ Image.width }
								alt={ Image.alt }
								loading="lazy"
							/>
						) }
					</div>
				</div>
			</div>
			<div
				className="games-trader-card-section block-container"
				style={ cardGradStyle }
			>
				<div
					className="games-trader-card-bgimage"
					style={ cardBgImgStyle }
				>
					<div
						className="games-trader-card-wrapper"
						style={ cardBgStyle }
					>
						<div
							className="games-trader-card-text-section"
							style={ alignStyle }
						>
							{ cardSubHeadingVisiblity && cardSubHeading && (
								<RichText.Content
									tagName="p"
									value={ cardSubHeading }
									className="card-subheading-text"
									style={ cardSubHeadingStyle }
								/>
							) }
							{ cardHeadingVisiblity && cardHeading && (
								<RichText.Content
									tagName="h2"
									value={ cardHeading }
									className="card-heading-text"
									style={ cardHeadingStyle }
								/>
							) }
							{ cardDescriptionVisiblity && cardDescription && (
								<RichText.Content
									tagName="p"
									value={ cardDescription }
									className="card-description-text"
									style={ cardDescriptionStyle }
								/>
							) }
							{ buttonVisiblity && buttonText && (
								<RichText.Content
									tagName="p"
									value={ buttonText }
									className="games-trader-button"
									style={ buttonStyle }
								/>
							) }
						</div>
						<div className="games-trader-card-img">
							<div className="games-trader-img-wrap">
								{ cardImage.url !== '' && (
									<img
										src={ cardImage.url }
										height={ cardImage.height }
										width={ cardImage.width }
										alt={ cardImage.alt }
										loading="lazy"
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
