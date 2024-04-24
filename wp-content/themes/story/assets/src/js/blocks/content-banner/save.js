/* eslint-disable no-unused-expressions */
import { useBlockProps, RichText } from '@wordpress/block-editor';
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
		bgColor,
		textAlignment,
		title,
		bgImage,
		titleColor,
		buttonText,
		buttonVisiblity,
		showBgOverlay,
		bgOverlayColor,
		bgOverlayOpacity,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};

	const sectionBgStyle = {};
	bgColor && ( sectionBgStyle.background = bgColor );
	bgImage &&
		bgImage.url &&
		( sectionBgStyle.backgroundImage = `url(${ bgImage.url })` );

	const titleStyle = {
		color: titleColor || undefined,
	};
	const bgOverlayStyle = {
		backgroundColor: bgOverlayColor || undefined,
		opacity: bgOverlayOpacity || undefined,
	};
	return (
		<>
			<div { ...useBlockProps.save() }>
				{ showBgOverlay && (
					<span
						className="storyful__overlay"
						style={ bgOverlayStyle }
					></span>
				) }
				<div
					className="content-banner-container"
					style={ sectionBgStyle }
				>
					<div className="content-banner-inner" style={ alignStyle }>
						{ title && (
							<RichText.Content
								tagName="h2"
								className="content-title-text"
								value={ title }
								style={ titleStyle }
							/>
						) }
						{ buttonVisiblity && buttonText && (
							<div className="content-banner-btn">
								<RichText.Content
									tagName="p"
									className="btn-banner"
									value={ buttonText }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
