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
		title,
		titleColor,
		titleVisiblity,
		description,
		descriptionColor,
		descriptionVisiblity,
		Image,
		bgImage,
		btnVisiblity,
		btnText,
		btn2Text,
		btn1BgColor,
		btn2BgColor,
		btn1TxtColor,
		btn2TxtColor,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		backgroundImage:
			bgImage && bgImage.url
				? `linear-gradient(100deg,rgba(11,51,84,0.9) 0%,rgba(0,13,255,0.9) 100%), url(${ bgImage.url })`
				: `linear-gradient(100deg,rgba(11,51,84,0.9) 0%,rgba(0,13,255,0.9) 100%)`,
	};
	const titleStyle = {
		color: titleColor,
	};
	const descriptionStyle = {
		color: descriptionColor,
	};
	const btn1Style = {
		background: btn1BgColor || '#ff6900',
		color: btn1TxtColor || '#FFFFFF',
	};
	const btn2Style = {
		background: btn2BgColor || '#ff6900',
		color: btn2TxtColor || '#FFFFFF',
	};
	return (
		<>
			<div { ...useBlockProps.save() }>
				<div
					className={ `hero-banner__background-image` }
					style={ sectionBgStyle }
				>
					<div className="hero-banner__content-inner">
						<div
							className="hero-banner__content-inner-main"
							style={ alignStyle }
						>
							<div className="hero-banner__logo">
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
											style={ btn1Style }
										/>
									</div>
								) }
								{ btnVisiblity && btn2Text && (
									<div className="btn btn2">
										<RichText.Content
											tagName="p"
											className={ 'btn-main btn-primary' }
											value={ btn2Text }
											style={ btn2Style }
										/>
									</div>
								) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
