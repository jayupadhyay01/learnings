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
		SubHeading,
		SubHeadingColor,
		titleColor,
		titleVisiblity,
		buttonColor,
		buttonVisiblity,
		headingVisiblity,
		subHeadingVisiblity,
		bgColor,
		listItems,
	} = attributes;

	const headingStyle = {
		color: HeadingColor,
	};
	const SubHeadingStyle = {
		color: SubHeadingColor,
	};

	const titleStyle = {
		color: titleColor,
	};
	const buttonStyle = {
		color: buttonColor,
	};

	const alignStyle = {
		textAlign: textAlignment,
	};

	const sectionBgStyle = {
		background: bgColor || undefined,
	};

	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="certified-partners-container">
				<div className="certified-partners-header" style={ alignStyle }>
					{ subHeadingVisiblity && SubHeading && (
						<RichText.Content
							tagName="h3"
							value={ SubHeading }
							style={ SubHeadingStyle }
							className="subheading-text"
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
				</div>
				{ 0 < listItems.length && (
					<div className="certified-partners-boxes">
						{ listItems.map( ( data, index ) => {
							return (
								<div
									className="certified-partners-box-item"
									data-key={ index }
								>
									<div className="certified-partners-image">
										{ data.imageURL && (
											<img
												src={ data.imageURL }
												alt={ data.imageAlt }
												width={ data.imageWidth }
												height={ data.imageHeight }
											/>
										) }
									</div>
									<div className="certified-partners-box-content">
										{ data.title && titleVisiblity && (
											<RichText.Content
												tagName="h3"
												value={ data.title }
												style={ titleStyle }
												className="certified-partners-title"
											/>
										) }
										{ data.button && buttonVisiblity && (
											<RichText.Content
												tagName="p"
												value={ data.button }
												style={ buttonStyle }
												className="certified-partners-btn"
											/>
										) }
									</div>
								</div>
							);
						} ) }
					</div>
				) }
			</div>
		</div>
	);
}
