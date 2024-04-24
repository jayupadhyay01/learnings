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
		titleColor,
		descriptionColor,
		buttonVisiblity,
		buttonTextColor,
		listItems,
		bgColor,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const titleStyle = {
		color: titleColor || '#333',
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || '#000',
	};

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || '#ffffff',
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="container">
				<div className="partner-type__head">
					{ headingVisiblity && (
						<RichText.Content
							tagName="h2"
							value={ Heading }
							className="partner-type__heading"
							style={ headingStyle }
						/>
					) }
				</div>
				{ 0 < listItems.length && (
					<div className="partner-type__boxes has-3-columns">
						{ listItems.map( ( data, index ) => {
							return (
								<>
									<div
										className={ `partner-type__box-wrap partner-type__box-${ index }` }
										key={ index }
										style={ alignStyle }
									>
										<div className="partner-type__box">
											<div className="partner-type__inner">
												{ data.title && (
													<RichText.Content
														tagName="h3"
														value={ data.title }
														style={ titleStyle }
														className="partner-type__box_title"
													/>
												) }
												{ data.description && (
													<RichText.Content
														tagName="p"
														value={
															data.description
														}
														style={
															descriptionStyle
														}
														className="partner-type__box_description"
													/>
												) }
											</div>
											{ data.btnText && buttonVisiblity && (
												<div className="btn-wrap">
													<RichText.Content
														tagName="p"
														value={ data.btnText }
														style={ buttonStyle }
														className="partner-type__link"
													/>
												</div>
											) }
										</div>
										<div className="partner-type__image">
											{ data.imageURL && (
												<img
													src={ data.imageURL }
													alt={ data.imageAlt }
													width={ data.imageWidth }
													height={ data.imageHeight }
												/>
											) }
										</div>
									</div>
								</>
							);
						} ) }
					</div>
				) }
			</div>
		</div>
	);
}
