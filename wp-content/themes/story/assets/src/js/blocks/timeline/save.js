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
		bgColor,
		bgImage,
		titleColor,
		subtitleColor,
		textAlignment,
		descriptionColor,
		titleVisiblity,
		subtitleVisiblity,
		navTitleColor,
		listItems,
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
	const subtitleStyle = {
		color: subtitleColor || undefined,
	};
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};
	const navTitleStyle = {
		color: navTitleColor || undefined,
	};

	return (
		<>
			<section { ...useBlockProps.save() } style={ sectionBgStyle }>
				<div className="container">
					{ 0 < listItems.length && (
						<div className="wrapper">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<div
											className="wrapper__item"
											key={ index }
										>
											<div
												className="wrapper__box-inner"
												style={ alignStyle }
											>
												<div className="timeline-item-img">
													{ data.imageURL && (
														<img
															src={
																data.imageURL
															}
															alt={
																data.imageAlt
															}
															width={
																data.imageWidth
															}
															height={
																data.imageHeight
															}
														/>
													) }
												</div>
												<div className="timeline-details-wrapper">
													{ data.title &&
														titleVisiblity && (
															<RichText.Content
																tagName="h3"
																value={
																	data.title
																}
																style={
																	titleStyle
																}
																className="timeline-item-title"
															/>
														) }
													{ data.subtitle &&
														subtitleVisiblity && (
															<RichText.Content
																tagName="h4"
																value={
																	data.subtitle
																}
																style={
																	subtitleStyle
																}
																className="timeline-item-subtitle"
															/>
														) }
													{ data.description &&
														subtitleVisiblity && (
															<RichText.Content
																tagName="h4"
																value={
																	data.description
																}
																style={
																	descriptionStyle
																}
																className="timeline-item-desc"
															/>
														) }
												</div>
											</div>
										</div>
									</>
								);
							} ) }
						</div>
					) }
					{ 0 < listItems.length && (
						<div className="year-nav">
							{ listItems.map( ( data, index ) => {
								return (
									<>
										<div
											className="year-nav__item"
											key={ index }
										>
											{ data.year && (
												<RichText.Content
													tagName="h4"
													value={ data.year }
													style={ navTitleStyle }
													className="timeline-year"
												/>
											) }
										</div>
									</>
								);
							} ) }
						</div>
					) }
				</div>
			</section>
		</>
	);
}
