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
		listItems,
		bgColor,
		Image,
		bgImage,
		titleColor,
		listDescColor,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const listDescStyle = {
		color: listDescColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || undefined,
		backgroundImage:
			bgImage && bgImage.url ? `url(${ bgImage.url })` : undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="container">
				<div className="partner-level__wrap">
					<div className="partner-level__left" style={ alignStyle }>
						{ headingVisiblity && (
							<RichText.Content
								tagName="h2"
								value={ Heading }
								className="partner-level__heading"
								style={ headingStyle }
							/>
						) }
						{ descriptionVisiblity && (
							<RichText.Content
								tagName="p"
								value={ description }
								className="partner-level__main-desc"
								style={ descriptionStyle }
							/>
						) }
						{ 0 < listItems.length && (
							<div className="partner-level__items">
								{ listItems.map( ( data, index ) => {
									const iconClasses = [
										'partner-level__item-icon',
									];
									if ( index % 2 === 0 ) {
										iconClasses.push( 'icon-orange' );
									} else {
										iconClasses.push( 'icon-blue' );
									}
									if ( index === 2 ) {
										iconClasses.push(
											'icon-orange-and-blue'
										);
									}
									const iconClassName =
										iconClasses.join( ' ' );
									return (
										<>
											<div
												className="partner-level__item"
												key={ index }
											>
												<div className="partner-level__item-heading-icon">
													<div
														className={
															iconClassName
														}
													></div>
													<RichText.Content
														tagName="h3"
														className="partner-level__item_title"
														value={ data.title }
														style={ titleStyle }
													/>
												</div>
												<RichText.Content
													tagName="p"
													className="partner-level__item_desc"
													value={ data.description }
													style={ listDescStyle }
												/>
											</div>
										</>
									);
								} ) }
							</div>
						) }
					</div>
					<div className="partner-level__right">
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
	);
}
