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
		btnVisiblity,
		btnText,
		btnBgColor,
		btnTxtColor,
		Image,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const btnStyle = {
		background: btnBgColor || undefined,
		color: btnTxtColor || undefined,
	};

	return (
		<>
			<div { ...useBlockProps.save() }>
				<div
					className="realfact-hero__background-image"
					style={ sectionBgStyle }
				>
					<div className="realfact-hero__content-inner block-container">
						<div
							className="realfact-hero__content-inner-main"
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
							<div className="btn-wrap">
								{ btnVisiblity && btnText && (
									<div className="btn btn1">
										<RichText.Content
											tagName="p"
											className={ 'btn-main btn-primary' }
											value={ btnText }
											style={ btnStyle }
										/>
									</div>
								) }
							</div>
						</div>
						<div className="realfact-hero-image">
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
		</>
	);
}
