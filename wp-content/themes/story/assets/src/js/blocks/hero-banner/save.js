import { RichText } from '@wordpress/block-editor';
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
		bgImage,
		btnVisiblity,
		btnText,
		showBgOverlay,
		bgOverlayColor,
		bgOverlayOpacity,
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
	const bgOverlayStyle = {
		backgroundColor: bgOverlayColor || undefined,
		opacity: bgOverlayOpacity || undefined,
	};
	return (
		<>
			<div className="storyful-hero-banner">
				<div
					className="hero-banner__background-image"
					style={ sectionBgStyle }
				>
					{ showBgOverlay && (
						<span
							className="hero-banner__overlay"
							style={ bgOverlayStyle }
						></span>
					) }
					<div className="hero-banner__content-inner">
						<div
							className="hero-banner__content-inner-main"
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
							{ btnVisiblity && btnText && (
								<div className="btn btn-arrow">
									<RichText.Content
										tagName="p"
										className={ 'btn-main btn-primary' }
										value={ btnText }
									/>
								</div>
							) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
