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
	const sectionBgStyle = {
		background: bgColor || undefined,
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="media-and-text-section-two__top-wave"></div>
			<div className="container">
				<div className="media-and-text-section-two__left">
					<div
						className="media-and-text-section-two__left-wrapper"
						style={ alignStyle }
					>
						{ headingVisiblity && (
							<RichText.Content
								tagName="h4"
								value={ Heading }
								className="heading"
								style={ headingStyle }
							/>
						) }
						{ descriptionVisiblity && (
							<RichText.Content
								tagName="p"
								value={ description }
								className="description"
								style={ descriptionStyle }
							/>
						) }
						{ buttonVisiblity && (
							<RichText.Content
								tagName="p"
								value={ buttonText }
								className="media-and-text-section-two__link btn-main"
								style={ buttonStyle }
							/>
						) }
					</div>
				</div>
				<div className="media-and-text-section-two__right">
					<div className="media-and-text-section-two__image">
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
		</div>
	);
}
