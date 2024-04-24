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
export default function save( props ) {
	const { attributes } = props;
	const {
		textAlignment,
		heading,
		HeadingColor,
		titleColor,
		descriptionColor,
		bgColor,
		boxColor,
		headingVisiblity,
		listItems,
	} = attributes;

	const headingStyle = {
		color: HeadingColor,
	};
	const titleStyle = {
		color: titleColor,
	};
	const descStyle = {
		color: descriptionColor,
	};
	const boxStyle = {
		background: boxColor,
	};
	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor,
	};
	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="why-anitian-container">
				<div className="why-anitian-heading">
					{ headingVisiblity && heading && (
						<RichText.Content
							tagName="h2"
							value={ heading }
							className="heading-text"
							style={ headingStyle }
						/>
					) }
				</div>

				{ 0 < listItems.length && (
					<div className="why-anitian-boxes">
						{ listItems.map( ( data, index ) => {
							return (
								<div className="why-anitian-box" key={ index }>
									<div className="why-anitian-box-image">
										{ data.imageURL && (
											<img
												src={ data.imageURL }
												alt={ data.imageAlt }
												width={ data.imageWidth }
												height={ data.imageHeight }
											/>
										) }
									</div>
									<div
										className="why-anitian-box-content"
										style={ boxStyle }
									>
										<div
											className="why-anitian-box-content-wrapper"
											style={ alignStyle }
										>
											<div className="why-anitian-box-title-wrapper">
												<i className="arrow">▼</i>
												<div className="why-anitian-box-title">
													{ data.title && (
														<RichText.Content
															tagName="h3"
															value={ data.title }
															style={ titleStyle }
															className="why-anitian-box-title"
														/>
													) }
												</div>
											</div>
											{ data.description && (
												<RichText.Content
													tagName="p"
													value={ data.description }
													style={ descStyle }
													className="why-anitian-box-para"
												/>
											) }
										</div>
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
