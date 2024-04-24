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
		BgGradientColor,
		bgImage,
		description,
		descriptionColor,
		descriptionVisiblity,
		subHeading,
		subHeadingColor,
		subHeadingVisiblity,
		listItems,
		cardSubTitleColor,
		cardSubTitleVisiblity,
		cardTitleColor,
		cardTitleVisiblity,
		cardDescriptionColor,
		cardDescriptionVisiblity,
		cardBgColor,
		cardActiveBgColor,
		cardButtonVisiblity,
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
	const cardActiveBgStyle = {
		background: cardActiveBgColor || undefined,
	};
	const cardBgStyle = {
		background: cardBgColor || undefined,
	};
	const cardTitleStyle = {
		color: cardTitleColor || undefined,
	};
	const cardSubTitleStyle = {
		color: cardSubTitleColor || undefined,
	};
	const cardDescStyle = {
		color: cardDescriptionColor || undefined,
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
			<div className="games-steps-bgimage" style={ sectionImgStyle }>
				<div className="block-container">
					<div className="games-steps-section" style={ alignStyle }>
						{ subHeadingVisiblity && subHeading && (
							<RichText.Content
								tagName="p"
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
					{ 0 < listItems.length && (
						<div className="games-steps-cards-section">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<div
											className={
												'games-steps-card-item'
											}
											key={ index }
											style={
												data.cardActive
													? cardActiveBgStyle
													: cardBgStyle
											}
										>
											{ cardSubTitleVisiblity &&
												data.carSubTitle && (
													<RichText.Content
														tagName="p"
														className="games-steps-card-Subtitle"
														value={
															data.carSubTitle
														}
														style={
															cardSubTitleStyle
														}
													/>
												) }
											{ cardTitleVisiblity &&
												data.cardTitle && (
													<RichText.Content
														tagName="h3"
														className="games-steps-card-title"
														value={ data.cardTitle }
														style={ cardTitleStyle }
													/>
												) }
											{ cardDescriptionVisiblity &&
												data.cardDescription && (
													<RichText.Content
														tagName="p"
														className="games-steps-card-description"
														value={
															data.cardDescription
														}
														style={ cardDescStyle }
													/>
												) }
											{ cardButtonVisiblity &&
												data.cardButton && (
													<RichText.Content
														tagName="p"
														className="games-steps-card-button"
														value={
															data.cardButton
														}
														style={ buttonStyle }
													/>
												) }
										</div>
									</>
								);
							} ) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
