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
		bgLeftColor,
		bgRightColor,
		textAlignment,
		leftTitle,
		rightTitle,
		leftDescription,
		rightDescription,
		rightTitleColor,
		leftTitleColor,
		leftDescriptionColor,
		rightDescriptionColor,
		leftButtonText,
		rightButtonText,
		ButtonBgColor,
		ButtonTextColor,
		leftBtnVisiblity,
		rightBtnVisiblity,
		leftImage,
		rightImage,
	} = attributes;

	const alignStyle = {
		textAlign: textAlignment,
	};
	const leftSectionBgStyle = {};
	bgLeftColor && ( leftSectionBgStyle.background = bgLeftColor );

	const rightSectionBgStyle = {};
	bgRightColor && ( rightSectionBgStyle.background = bgRightColor );

	const leftTitleStyle = {
		color: leftTitleColor || undefined,
	};
	const rightTitleStyle = {
		color: rightTitleColor || undefined,
	};
	const leftDescriptionStyle = {
		color: leftDescriptionColor || undefined,
	};
	const rightDescriptionStyle = {
		color: rightDescriptionColor || undefined,
	};
	const buttonStyle = {
		color: ButtonTextColor || undefined,
		background: ButtonBgColor || undefined,
	};

	return (
		<>
			<section { ...useBlockProps.save() }>
				<div className="container-fluid">
					<div
						className="cta-section__right"
						style={ leftSectionBgStyle }
					>
						<div className="intelligence-section">
							<div
								className="intelligence-section__details"
								style={ alignStyle }
							>
								{ leftTitle && (
									<RichText.Content
										tagName="h2"
										value={ leftTitle }
										className="section-title h1 with-darkbg"
										style={ leftTitleStyle }
									/>
								) }
								{ leftDescription && (
									<RichText.Content
										tagName="p"
										value={ leftDescription }
										className="cta-section-desc"
										style={ leftDescriptionStyle }
									/>
								) }
								{ leftButtonText && leftBtnVisiblity && (
									<div
										className="sbtn sbtn-arrow-primary-v2"
										style={ buttonStyle }
									>
										<RichText.Content
											tagName="p"
											value={ leftButtonText }
											className="btn-text"
										/>
									</div>
								) }
							</div>
							<div className="intelligence-section__media">
								<div className="media-image-wrapper">
									<figure id="img-two">
										{ leftImage.url !== '' && (
											<img
												src={ leftImage.url }
												height={ leftImage.height }
												width={ leftImage.width }
												alt={ leftImage.alt }
												loading="lazy"
												className="self-media"
											/>
										) }
									</figure>
								</div>
							</div>
						</div>
					</div>
					<div
						className="cta-section__left"
						style={ rightSectionBgStyle }
					>
						<div className="cta-news-section">
							<div
								className="cta-news-section__details"
								style={ alignStyle }
							>
								{ rightTitle && (
									<RichText.Content
										tagName="h2"
										value={ rightTitle }
										className="section-title"
										style={ rightTitleStyle }
									/>
								) }
								{ rightDescription && (
									<RichText.Content
										tagName="p"
										value={ rightDescription }
										className="cta-section-desc"
										style={ rightDescriptionStyle }
									/>
								) }
								{ rightButtonText && rightBtnVisiblity && (
									<div
										className="sbtn sbtn-arrow-primary-v2"
										style={ buttonStyle }
									>
										<RichText.Content
											tagName="p"
											value={ rightButtonText }
											className="btn-text"
										/>
									</div>
								) }
							</div>
							<div className="cta-news-section__media">
								<div className="media-image-wrapper">
									<figure id="img-one">
										{ rightImage.url !== '' && (
											<img
												src={ rightImage.url }
												height={ rightImage.height }
												width={ rightImage.width }
												alt={ rightImage.alt }
												loading="lazy"
												className="self-media"
											/>
										) }
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
