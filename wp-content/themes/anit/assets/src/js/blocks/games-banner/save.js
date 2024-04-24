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
		background: BgGradientColor || undefined,
	};

	const sectionImgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="games-banner-bgimage" style={ sectionImgStyle }>
				<div className="block-container">
					<div className="games-banner-section" style={ alignStyle }>
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
						{ buttonVisiblity && buttonText && (
							<RichText.Content
								tagName="p"
								value={ buttonText }
								className="games-banner-button"
								style={ buttonStyle }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
