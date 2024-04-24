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
		mainDesc,
		mainDescColor,
		descriptionColor,
		descriptionVisiblity,
		headingVisiblity,
		subHeadingVisiblity,
		bgColor,
		listItems,
	} = attributes;

	const headingStyle = {
		color: HeadingColor || undefined,
	};
	const SubHeadingStyle = {
		color: SubHeadingColor || undefined,
	};
	const titleStyle = {
		color: titleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const mainDescStyle = {
		color: mainDescColor || undefined,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || undefined,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="info-block-container">
				<div className="info-block-header" style={ alignStyle }>
					{ subHeadingVisiblity && SubHeading && (
						<RichText.Content
							tagName="p"
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
					{ mainDesc && (
						<RichText.Content
							tagName="p"
							value={ mainDesc }
							className="description-text"
							style={ mainDescStyle }
						/>
					) }
				</div>
				{ 0 < listItems.length && (
					<div className="info-with-icons-boxes">
						{ listItems.map( ( data, index ) => {
							return (
								<div
									className="info-with-icons-box"
									key={ index }
								>
									<div className="info-with-icons-image">
										{ data.imageURL && (
											<img
												src={ data.imageURL }
												alt={ data.imageAlt }
												width={ data.imageWidth }
												height={ data.imageHeight }
											/>
										) }
									</div>
									<div className="info-with-icons-box-content">
										{ data.title && titleVisiblity && (
											<RichText.Content
												tagName="h3"
												value={ data.title }
												style={ titleStyle }
												className="info-with-icons-title"
											/>
										) }
										{ data.description &&
											descriptionVisiblity && (
												<RichText.Content
													tagName="p"
													value={ data.description }
													style={ descriptionStyle }
													className="info-with-icons-description"
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
