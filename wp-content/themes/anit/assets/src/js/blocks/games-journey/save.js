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
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		button2Text,
		button2TextColor,
		button2BgColor,
		button2Visiblity,
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
	const buttonStyle = {
		color: buttonTextColor || undefined,
		background: buttonBgColor || undefined,
	};
	const button2Style = {
		color: button2TextColor || undefined,
		background: button2BgColor || undefined,
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
			<div className="games-journey-bgimage" style={ sectionImgStyle }>
				<div className="block-container">
					<div className="games-journey-section" style={ alignStyle }>
						{ subHeadingVisiblity && subHeading && (
							<RichText.Content
								tagName="h3"
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
					<div className="games-journey-btn-section">
						{ buttonVisiblity && buttonText && (
							<RichText.Content
								tagName="p"
								value={ buttonText }
								className="games-journey-button"
								style={ buttonStyle }
							/>
						) }
						{ button2Visiblity && button2Text && (
							<RichText.Content
								tagName="p"
								value={ button2Text }
								className="games-journey-button2"
								style={ button2Style }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
