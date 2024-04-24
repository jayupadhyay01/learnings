/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { RichText, useBlockProps } from '@wordpress/blockEditor';
/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param  root0
 * @param  root0.attributes
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function Save( { attributes } ) {
	const {
		textAlignment,
		title,
		titleColor,
		titleVisiblity,
		description,
		descriptionColor,
		descriptionVisiblity,
		bgImage,
		bgColor,
		Image,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};

	const sectionBgStyle = {
		background: bgColor || undefined,
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};

	return (
		<>
			<div { ...useBlockProps.save() }>
				<div
					className="multipurpose__background-image"
					style={ sectionBgStyle }
				>
					<div className="multipurpose__content-inner block-container">
						<div
							className="multipurpose__content-inner-main"
							style={ alignStyle }
						>
							{ titleVisiblity && title && (
								<RichText.Content
									tagName="h2"
									value={ title }
									className="title-text"
									style={ titleStyle }
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
							<figure className="multipurpose-wp-block-image">
								{ Image.url !== '' && (
									<img
										src={ Image.url }
										height={ Image.height }
										width={ Image.width }
										alt={ Image.alt }
										loading="lazy"
									/>
								) }
							</figure>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
