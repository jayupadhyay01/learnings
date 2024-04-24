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
		textAlignment,
		title,
		bgImage,
		titleColor,
		description,
		descriptionColor,
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
	const descriptionStyle = {
		color: descriptionColor || undefined,
	};

	return (
		<>
			<section { ...useBlockProps.save() }>
				<div className="our-mission" style={ sectionBgStyle }>
					<div className="container" style={ alignStyle }>
						<div className="our-mission__title">
							{ title && (
								<RichText.Content
									tagName="h2"
									value={ title }
									className="section-title"
									style={ titleStyle }
								/>
							) }
						</div>
						<div className="our-mission__description">
							{ description && (
								<RichText.Content
									tagName="p"
									value={ description }
									className="description"
									style={ descriptionStyle }
								/>
							) }
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
