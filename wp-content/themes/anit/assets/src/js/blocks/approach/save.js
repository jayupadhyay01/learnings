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
		buttonVisiblity,
		buttonText,
		buttonTextColor,
		buttonBgColor,
		listItems,
		listColor,
		bgColor,
		bgImage,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const buttonStyle = {
		color: buttonTextColor || '#FFFFFF',
		background: buttonBgColor || '#ff6900',
	};
	const listStyle = {
		color: listColor || undefined,
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
			<div className="anitian-approach__left" style={ alignStyle }>
				<div className="anitian-approach__left__inner">
					{ headingVisiblity && (
						<RichText.Content
							tagName="h2"
							value={ Heading }
							className="anitian-approach__heading"
							style={ headingStyle }
						/>
					) }
					{ descriptionVisiblity && (
						<RichText.Content
							tagName="p"
							value={ description }
							className="anitian-approach__desc"
							style={ descriptionStyle }
						/>
					) }

					<div className="hubspot-btn">
						{ buttonVisiblity && (
							<RichText.Content
								tagName="p"
								value={ buttonText }
								className="btn-sm animated-button-orange thar-three"
								style={ buttonStyle }
							/>
						) }
					</div>
				</div>
			</div>
			<div className="anitian-approach__right" style={ alignStyle }>
				<div className="anitian-approach__right__inner">
					{ 0 < listItems.length && (
						<ul className="anitian-approach__items icon-is-center">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<li
											className="anitian-approach__item"
											key={ index }
										>
											<i
												className="anitian-approach__icon fa fa-check is-small"
												aria-hidden="true"
											></i>
											<RichText.Content
												tagName="span"
												className="anitian-approach__title"
												value={ data.list }
												style={ listStyle }
											/>
										</li>
									</>
								);
							} ) }
						</ul>
					) }
				</div>
			</div>
		</div>
	);
}
