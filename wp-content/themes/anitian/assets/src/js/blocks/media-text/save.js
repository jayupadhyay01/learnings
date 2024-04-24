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
		description,
		descriptionColor,
		descriptionVisiblity,
		buttonVisiblity,
		buttonText,
		buttonTextColor,
		buttonBgColor,
		Image,
		bgColor,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || undefined,
		background: buttonBgColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgImgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const sectionBgColorStyle = {
		background: bgColor || undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgColorStyle }>
			<div
				className="media-text-v3__image__background"
				style={ sectionBgImgStyle }
			></div>
			<div className="container">
				<div className="media-text-v3__wrapper content-is-center text-left">
					<div className="media-text-v3__image">
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

					<div
						className="media-text-v3__content"
						style={ alignStyle }
					>
						{ headingVisiblity && Heading && (
							<RichText.Content
								tagName="h2"
								value={ Heading }
								className="media-text-v3__title"
								style={ headingStyle }
							/>
						) }
						{ descriptionVisiblity && description && (
							<RichText.Content
								tagName="p"
								value={ description }
								className="media-text-v3__desc"
								style={ descriptionStyle }
							/>
						) }

						{ buttonVisiblity && buttonText && (
							<div className="hubspot-btn">
								<RichText.Content
									tagName="p"
									value={ buttonText }
									className="cta_button animated-button-orange thar-three"
									style={ buttonStyle }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
