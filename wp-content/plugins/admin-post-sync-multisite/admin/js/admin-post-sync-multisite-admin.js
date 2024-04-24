(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

})( jQuery );

jQuery(document).ready(function ($) {

    $('#meta_categories').select2();
    $('#meta_tags').select2();

    $(document).on('change', '#meta_subsites', function (e) {
        
        e.preventDefault();
        nonce = ajaxObject.ajax_nonce;
        ajax_url = ajaxObject.ajax_url;
      
        var sub_site = $(this).val();
        jQuery.ajax({
            type: "GET",
            url: ajax_url,
            data: ({
                action: 'admin_post_sync_multisite_subsites_data_callback',
                sub_site: sub_site,
                nonce: nonce
            }),
            success: function (response) {
                responseArray = JSON.parse(response);
                cats = responseArray.cats;
                $('#meta_categories').find('option').remove().end();
                $.each(cats,function(key, value)
                {   
                    $("#meta_categories").append('<option value=' + value.term_id + '>' + value.name + '</option>');
                });

                tags = responseArray.tags;
                $('#meta_tags').find('option').remove().end();
                $.each(tags,function(key, value)
                {   
                    $("#meta_tags").append('<option value=' + value.term_id + '>' + value.name + '</option>');
                });
                
            }
        })
        e.stopImmediatePropagation();
        return false;
    });
})