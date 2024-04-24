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
		title,
		titleColor,
		titleVisiblity,
		description,
		descriptionColor,
		descriptionVisiblity,
		Image,
		bgColor,
		layout,
		subTitleVisibility,
		subtitleColor,
		listItems,
	} = attributes;
	const titleStyle = {
		color: titleColor,
	};
	const descriptionStyle = {
		color: descriptionColor,
	};
	const subtitleStyle = {
		color: subtitleColor,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			{ layout === 'layout1' && (
				<div className="media-content-container media-content-layout1">
					<div className="media-content-text" style={ alignStyle }>
						{ titleVisiblity && title && (
							<RichText.Content
								tagName="h2"
								value={ title }
								style={ titleStyle }
								className="heading-text"
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
					<div className="media-content-image">
						{ Image.url && (
							<img
								src={ Image.url }
								alt={ Image.alt }
								width={ Image.width }
								height={ Image.height }
							/>
						) }
					</div>
				</div>
			) }
			{ layout === 'layout2' && (
				<>
					{ 0 < listItems.length && (
						<div className="media-content-container media-content-layout2">
							{ listItems.map( ( data, index ) => {
								const itemClasses = `media-content-item ${
									index % 2 === 0
										? 'right-thumbnail'
										: 'left-thumbnail'
								}`;
								return (
									<div
										className={ itemClasses }
										data-key={ index }
									>
										<div
											className="media-content-text"
											style={ alignStyle }
										>
											{ subTitleVisibility &&
												data.subtitle && (
													<RichText.Content
														tagName="p"
														value={ data.subtitle }
														className="subtitletitle-text"
														style={ subtitleStyle }
													/>
												) }
											{ titleVisiblity && data.title && (
												<RichText.Content
													tagName="h2"
													value={ data.title }
													className="title-text"
													style={ titleStyle }
												/>
											) }
											{ descriptionVisiblity &&
												data.description && (
													<RichText.Content
														tagName="p"
														value={
															data.description
														}
														className="description-text"
														style={
															descriptionStyle
														}
													/>
												) }
										</div>
										<div className="media-content-image">
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
								);
							} ) }
						</div>
					) }
				</>
			) }
		</div>
	);
}
