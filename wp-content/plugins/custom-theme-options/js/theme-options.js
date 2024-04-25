// AJAX request to get theme options based on selected site
jQuery(document).ready(function($) {
    $('#subsite').on('change', function() {
        var selectedSite = $(this).val();
        $.ajax({
            type: 'POST',
            url: themeOptionsAjax.ajaxUrl,
            data: {
                action: 'get_theme_options',
                selected_site: selectedSite
            },
            success: function(response) {
                // Update form fields with the received data
                updateFormFields(response);
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    });
    
    // Function to update form fields
    function updateFormFields(data) {
        // Update site logo field
        $('input[name="theme_options[site_logo]"]').val(data.site_logo);
        
        // Update site title field
        $('input[name="theme_options[site_title]"]').val(data.site_title);
        
        // Update custom CSS field
        $('textarea[name="theme_options[custom_css]"]').val(data.custom_css);
        
        // Update custom scripts field
        $('textarea[name="theme_options[custom_scripts]"]').val(data.custom_scripts);
        
        // Update custom HTML field
        $('#custom_html_editor').val(data.custom_html);
        // Refresh WordPress editor if present
        if (typeof tinyMCE !== 'undefined') {
            tinyMCE.get('custom_html_editor').setContent(data.custom_html);
        }
        
        // Update radio options field
        $('input[name="theme_options[radio_options]"][value="' + data.radio_options + '"]').prop('checked', true);
        
        // Update checkbox options field
        $('input[name^="theme_options[checkbox_options]"]').prop('checked', false); // Uncheck all checkboxes first
        $.each(data.checkbox_options, function(key, value) {
            $('input[name="theme_options[checkbox_options][' + key + ']"]').prop('checked', value); // Set the checked state based on the received data
        });
        
        // Update multi select options field
        $('select[name="theme_options[multi_select_options][]"]').val(data.multi_select_options);
    }
});