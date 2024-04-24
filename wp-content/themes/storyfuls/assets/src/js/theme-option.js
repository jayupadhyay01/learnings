// Styles
import '../sass/theme-option.scss';

jQuery(document).ready(function ($) {
	//upload logo button
	$(document).on('click', '.storyful_img_upload', function (e) {
		e.preventDefault();
		const currentParent = $(this);
		const customUploader = wp
			.media({
				title: 'Select Image',
				button: {
					text: 'Use This Image',
				},
				multiple: false, // Set this to true to allow multiple files to be selected
			})
			.on('select', function () {
				const attachment = customUploader
					.state()
					.get('selection')
					.first()
					.toJSON();
				currentParent
					.siblings('.storyful_img')
					.attr('src', attachment.url);
				currentParent.siblings('.storyful_img').attr('width', '250');
				currentParent.siblings('.storyful_img').attr('height', '140');
				currentParent.siblings('.storyful_img_url').val(attachment.url);
			})
			.open();
	});

	//remove logo button
	$(document).on('click', '.storyful_img_remove', function (e) {
		e.preventDefault();
		const currentParent = $(this);
		currentParent.siblings('.storyful_img').removeAttr('src');
		currentParent.siblings('.storyful_img').removeAttr('width');
		currentParent.siblings('.storyful_img').removeAttr('height');
		currentParent.siblings('.storyful_img_url').removeAttr('value');
	});

	//color picker custom js.
	$('[class="color-picker"]').wpColorPicker({
		hide: false,
	});
});
