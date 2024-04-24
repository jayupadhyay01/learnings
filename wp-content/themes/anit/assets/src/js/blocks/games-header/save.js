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
		videoURL,
		videoVisiblity,
		BgGradientColor,
		Image,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};

	const descriptionStyle = {
		color: descriptionColor || undefined,
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
			<div
				className="wp-block-anitian-games-header-bgimage"
				style={ sectionImgStyle }
			>
				<div className="block-container">
					<div className="games-header-section" style={ alignStyle }>
						<div className="games-header-image">
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
						{ headingVisiblity && Heading && (
							<RichText.Content
								tagName="h1"
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
				</div>
				{ videoVisiblity && videoURL && (
					<div className="games-video-section">
						<div className="games-video-ifram-section">
							<iframe
								title="Trader Game Header Video"
								className="video"
								height="440"
								width="782"
								allowfullscreen=""
								src={ videoURL }
								data-src={ videoURL }
							></iframe>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}
