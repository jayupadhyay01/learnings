// Styles
import '../sass/theme-option.scss';

jQuery(document).ready(function ($) {
	//upload logo button
	$(document).on('click', '.anitian_img_upload', function (e) {
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
					.siblings('.anitian_img')
					.attr('src', attachment.url);
				currentParent.siblings('.anitian_img').attr('width', '250');
				currentParent.siblings('.anitian_img').attr('height', '140');
				currentParent.siblings('.anitian_img_url').val(attachment.url);
			})
			.open();
	});

	//remove logo button
	$(document).on('click', '.anitian_img_remove', function (e) {
		e.preventDefault();
		const currentParent = $(this);
		currentParent.siblings('.anitian_img').removeAttr('src');
		currentParent.siblings('.anitian_img').removeAttr('width');
		currentParent.siblings('.anitian_img').removeAttr('height');
		currentParent.siblings('.anitian_img_url').removeAttr('value');
	});

	//color picker custom js.
	$('[class="color-picker"]').wpColorPicker({
		hide: false,
	});
});
