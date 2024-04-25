<?php
/**
 * Plugin Name: Custom Theme Options
 * Description: Adds custom theme options functionality for WordPress Multisite.
 */

// Enqueue JavaScript
add_action('admin_enqueue_scripts', 'enqueue_theme_options_scripts');

function enqueue_theme_options_scripts($hook) {
    if ($hook === 'settings_page_theme-options') {
        wp_enqueue_script('theme-options', plugin_dir_url(__FILE__) . 'js/theme-options.js', array('jquery'), '', true);
        wp_localize_script('theme-options', 'themeOptionsAjax', array(
            'ajaxUrl' => admin_url('admin-ajax.php')
        ));
    }
}

// AJAX handler to get theme options for selected site
add_action('wp_ajax_get_theme_options', 'get_theme_options_ajax_callback');

function get_theme_options_ajax_callback() {
    // Verify nonce
    if (!isset($_POST['theme_options_nonce_field']) || !wp_verify_nonce(sanitize_text_field($_POST['theme_options_nonce_field']), 'theme_options_nonce')) {
        wp_send_json_error('Nonce verification failed');
    }
    
    $selected_site = isset($_POST['selected_site']) ? sanitize_text_field($_POST['selected_site']) : 'all';

    if ($selected_site === 'all') {
        // Get options for all sites
        $sites = get_sites();
        $all_options = array();
        foreach ($sites as $site) {
            switch_to_blog($site->blog_id);
            $site_options = get_option('theme_options');
            $all_options[$site->blog_id] = $site_options;
            restore_current_blog();
        }
        wp_send_json($all_options);
    } else {
        // Get options for specific site
        switch_to_blog($selected_site);
        $site_options = get_option('theme_options');
        wp_send_json($site_options);
    }
}

// Create Admin Page with Theme in Network Admin
add_action('network_admin_menu', 'create_theme_options_page');

function create_theme_options_page() {
    add_submenu_page(
        'settings.php', // Parent menu slug
        'Theme Options', // Page title
        'Theme Options', // Menu title
        'manage_network_options', // Capability required
        'theme-options', // Menu slug
        'render_theme_options_page' // Callback function
    );
}

// Theme Options
function render_theme_options_page() {
    ?>
    <div class="wrap">
        <h2>Theme Options</h2>
        <form method="post" action="">
            <?php
            wp_nonce_field('theme_options_nonce', 'theme_options_nonce_field');
            settings_fields('theme_options');
            $selected_site = isset($_POST['subsite']) ? $_POST['subsite'] : 'all';
            render_subsites_dropdown($selected_site);
            do_settings_sections('theme_options');
            submit_button('Save Options');
            ?>
        </form>
    </div>
    <div id="theme-options-preview"></div>
    <?php
}

add_action('admin_init', 'register_theme_options');

function register_theme_options() {
    // Register settings
    register_setting('theme_options', 'theme_options', 'sanitize_theme_options');

    // Add sections and fields
    add_settings_section('general_section', 'General Settings', 'general_section_callback', 'theme_options');

    // Fields for various theme options
    add_settings_field('site_logo', 'Site Logo', 'site_logo_callback', 'theme_options', 'general_section');
    add_settings_field('site_title', 'Site Title', 'site_title_callback', 'theme_options', 'general_section');
    add_settings_field('custom_css', 'Custom CSS', 'custom_css_callback', 'theme_options', 'general_section');
    add_settings_field('custom_scripts', 'Custom Scripts', 'custom_scripts_callback', 'theme_options', 'general_section');
    add_settings_field('custom_html', 'Custom HTML', 'custom_html_callback', 'theme_options', 'general_section');
    add_settings_field('radio_options', 'Radio Options', 'radio_options_callback', 'theme_options', 'general_section');
    add_settings_field('checkbox_options', 'Checkbox Options', 'checkbox_options_callback', 'theme_options', 'general_section');
    add_settings_field('multi_select_options', 'Multi Select Options', 'multi_select_options_callback', 'theme_options', 'general_section');
}

function sanitize_theme_options($input) {
    $output = array();

    if (isset($input['site_logo'])) {
        $output['site_logo'] = sanitize_text_field($input['site_logo']);
    }

    if (isset($input['site_title'])) {
        $output['site_title'] = sanitize_text_field($input['site_title']);
    }

    if (isset($input['custom_css'])) {
        $output['custom_css'] = wp_kses_post($input['custom_css']);
    }

    if (isset($input['custom_scripts'])) {
        // Remove additional escaping added by WordPress
        $output['custom_scripts'] = wp_unslash($input['custom_scripts']);
    }

    if (isset($input['custom_html'])) {
        $output['custom_html'] = wp_kses_post($input['custom_html']);
    }

    if (isset($input['radio_options'])) {
        $output['radio_options'] = sanitize_text_field($input['radio_options']);
    }

    if (isset($input['checkbox_options'])) {
        $output['checkbox_options'] = array_map('sanitize_text_field', $input['checkbox_options']);
    }

    if (isset($input['multi_select_options'])) {
        $output['multi_select_options'] = array_map('sanitize_text_field', $input['multi_select_options']);
    }

    return $output;
}

function general_section_callback() {
    // Section description
    echo '<p>General theme options.</p>';
}

function site_logo_callback() {
    $theme_options = get_option('theme_options');
    $site_logo = isset($theme_options['site_logo']) ? $theme_options['site_logo'] : '';

    echo '<input type="text" name="theme_options[site_logo]" value="' . esc_attr($site_logo) . '" />';
}

function site_title_callback() {
    $theme_options = get_option('theme_options');
    $site_title = isset($theme_options['site_title']) ? $theme_options['site_title'] : '';

    echo '<input type="text" name="theme_options[site_title]" value="' . esc_attr($site_title) . '" />';
}

function custom_css_callback() {
    $theme_options = get_option('theme_options');
    $custom_css = isset($theme_options['custom_css']) ? $theme_options['custom_css'] : '';

    echo '<textarea name="theme_options[custom_css]" rows="5" cols="50">' . esc_textarea($custom_css) . '</textarea>';
}

function custom_scripts_callback() {
    $theme_options = get_option('theme_options');
    $custom_scripts = isset($theme_options['custom_scripts']) ? $theme_options['custom_scripts'] : '';

    echo '<textarea name="theme_options[custom_scripts]" rows="5" cols="50">' . esc_textarea($custom_scripts) . '</textarea>';
}

function custom_html_callback() {
    $theme_options = get_option('theme_options');
    $custom_html = isset($theme_options['custom_html']) ? $theme_options['custom_html'] : '';

    wp_editor($custom_html, 'custom_html_editor', array(
        'textarea_name' => 'theme_options[custom_html]',
        'textarea_rows' => 10,
    ));
}

function radio_options_callback() {
    $theme_options = get_option('theme_options');
    $selected_option = isset($theme_options['radio_options']) ? $theme_options['radio_options'] : '';

    echo '<label><input type="radio" name="theme_options[radio_options]" value="option1" ' . checked($selected_option, 'option1', false) . '> Option 1</label><br>';
    echo '<label><input type="radio" name="theme_options[radio_options]" value="option2" ' . checked($selected_option, 'option2', false) . '> Option 2</label>';
}

function checkbox_options_callback() {
    $theme_options = get_option('theme_options');
    $selected_options = isset($theme_options['checkbox_options']) ? (array) $theme_options['checkbox_options'] : array();

    $options = array(
        'option1' => 'Option 1',
        'option2' => 'Option 2',
        'option3' => 'Option 3',
    );

    foreach ($options as $value => $label) {
        echo '<label><input type="checkbox" name="theme_options[checkbox_options][' . esc_attr($value) . ']" value="' . esc_attr($value) . '" ' . checked(in_array($value, $selected_options), true, false) . '> ' . $label . '</label><br>';
    }
}

function multi_select_options_callback() {
    $theme_options = get_option('theme_options');
    $selected_options = isset($theme_options['multi_select_options']) ? (array) $theme_options['multi_select_options'] : array();

    $options = array(
        'Pizza' => 'Pizza',
        'Pasta' => 'Pasta',
        'Maggie' => 'Maggie',
        'PavBhaji' => 'Pav Bhaji',
    );

    echo '<select multiple name="theme_options[multi_select_options][]">';
    foreach ($options as $value => $label) {
        echo '<option value="' . esc_attr($value) . '" ' . selected(in_array($value, $selected_options), true, false) . '>' . esc_html($label) . '</option>';
    }
    echo '</select>';
}

// Dropdown to Render Subsites List
function render_subsites_dropdown($selected_site) {
    $sites = get_sites();
    ?>
    <select name="subsite" id="subsite">
        <option value="all" <?php selected($selected_site, 'all'); ?>>All Sites</option>
        <?php foreach ($sites as $site) : ?>
            <option value="<?php echo esc_attr($site->blog_id); ?>" <?php selected($selected_site, $site->blog_id); ?>><?php echo esc_html($site->blogname); ?></option>
        <?php endforeach; ?>
    </select>
    <?php
}

// Updating Theme Options
add_action('init', 'update_theme_options');

function update_theme_options() {
   // Verify nonce
   $nonce = isset($_POST['theme_options_nonce_field']) ? sanitize_text_field($_POST['theme_options_nonce_field']) : '';
   if (!isset($nonce) || !wp_verify_nonce($nonce, 'theme_options_nonce')) {
       return;
   }

    if (isset($_POST['subsite'])) {
        $selected_site = sanitize_text_field($_POST['subsite']);

        // Update theme options based on selection
        if ($selected_site === 'all') {
            // Update options for all sites
            $sites = get_sites();
            foreach ($sites as $site) {
                switch_to_blog($site->blog_id);
                $updated_options = isset($_POST['theme_options']) ? $_POST['theme_options'] : array();
                $updated_options = sanitize_theme_options($updated_options);
                update_option('theme_options', $updated_options);
                restore_current_blog();
            }
        } else {
            // Update options for specific subsite
            switch_to_blog($selected_site);
            $updated_options = isset($_POST['theme_options']) ? $_POST['theme_options'] : array();
            $updated_options = sanitize_theme_options($updated_options);
            update_option('theme_options', $updated_options);
            restore_current_blog();
        }
    }
}