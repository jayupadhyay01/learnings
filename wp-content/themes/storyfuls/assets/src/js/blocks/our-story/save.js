/* eslint-disable no-unused-expressions */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { playbtn } from '../icons';
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
		Image,
		Video,
		titleColor,
		description,
		descriptionColor,
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
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};

	return (
		<>
			<section { ...useBlockProps.save() }>
				<div className="our-story-section" style={ sectionBgStyle }>
					<div className="container" style={ alignStyle }>
						<div className="our-story-section__left">
							<div className="text-section">
								{ description && (
									<RichText.Content
										tagName="p"
										value={ description }
										className="text-section__para"
										style={ descriptionStyle }
									/>
								) }
							</div>
						</div>
						<div className="our-story-section__right">
							<div className="media-section">
								<div className="our-story-text-wrapper">
									{ title && (
										<RichText.Content
											tagName="h3"
											value={ title }
											className="story-title"
											style={ titleStyle }
										/>
									) }
								</div>
								<div className="media-video-wrapper">
									<div className="media-video">
										<button className="media-video__playbtn">
											{ playbtn }
										</button>

										{ Image.url !== '' && (
											<img
												src={ Image.url }
												height={ Image.height }
												width={ Image.width }
												alt={ Image.alt }
												loading="lazy"
												className="self-media"
											/>
										) }
									</div>
								</div>
							</div>
						</div>
					</div>
					{ Video.url !== '' && (
						<div className="video-popups-wrap">
							<div className="video-popup">
								<div className="close-popup-section">
									<div className="close-btn">Close</div>
								</div>
								<video
									controls=""
									autoPlay=""
									muted=""
									loop=""
									className="video-one hidden video-div"
								>
									<source
										src={ Video.url }
										type={ Video.mediaMime }
									/>
								</video>
							</div>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
