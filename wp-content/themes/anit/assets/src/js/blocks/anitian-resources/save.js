import { RichText, useBlockProps } from '@wordpress/block-editor';
export default function save( props ) {
	const { attributes } = props;
	const {
		textAlignment,
		heading,
		HeadingColor,
		Subheading,
		subheadingColor,
		bgColor,
		buttonColor,
		headingVisiblity,
		subheadingVisiblity,
		titleColor,
		autoplay,
		arrows,
		dots,
		slideInfinite,
		repeatItems,
		buttonTextColor,
	} = attributes;
	const headingStyle = {
		color: HeadingColor,
	};
	const subheadingStyle = {
		color: subheadingColor,
	};
	const titleStyle = {
		color: titleColor,
	};
	const buttonStyle = {
		background: buttonColor,
		color: buttonTextColor,
	};

	const alignStyle = {
		textAlign: textAlignment,
	};
	const sectionBgStyle = {
		background: bgColor || undefined,
	};

	return (
		<div { ...useBlockProps.save() } style={ sectionBgStyle }>
			<div className="anitian-resources-container" style={ alignStyle }>
				<div className="anitian-resources-heading">
					<div className="container">
						<div className="anitian-resources-ttl">
							{ subheadingVisiblity && Subheading && (
								<RichText.Content
									tagName="p"
									value={ Subheading }
									className="subheading-text"
									style={ subheadingStyle }
								/>
							) }
							{ headingVisiblity && heading && (
								<RichText.Content
									tagName="h2"
									value={ heading }
									className="heading-text"
									style={ headingStyle }
								/>
							) }
						</div>
					</div>
				</div>
				<div
					className="anitian-resources-slider"
					data-slide-autoplay={ autoplay }
					data-slide-arrows={ arrows }
					data-slide-dots={ dots }
					data-slide-infinite={ slideInfinite }
				>
					{ repeatItems.map( ( data, index ) => (
						<div
							className={ 'resources-slider-item' }
							key={ index }
						>
							<div className="resources-slider-content">
								<div className="resources-slider-image">
									{ data.imageURL && (
										<img
											src={ data.imageURL }
											alt={ data.imageAlt }
											width={ data.imageWidth }
											height={ data.imageHeight }
										/>
									) }
								</div>
								<div className="resources-slider-text">
									<div className="resources-slider-title">
										{ data.title && (
											<RichText.Content
												tagName="h3"
												style={ titleStyle }
												className="content-slider-title"
												value={ data.title }
											/>
										) }
										{ data.btnText && (
											<RichText.Content
												tagName="p"
												style={ buttonStyle }
												className="content-slider-button btn"
												value={ data.btnText }
											/>
										) }
									</div>
								</div>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</div>
	);
}
