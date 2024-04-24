<?php
// Add Checkbox and Address Fields to Product Page
add_action('woocommerce_before_add_to_cart_button', 'add_external_shipping_fields_to_product_page');
function add_external_shipping_fields_to_product_page() {
    echo '<div class="external-shipping-fields">';
    echo '<h3 class="form-row form-row-wide hidden">External Address</h3>';

    woocommerce_form_field('external_shipping_checkbox', array(
        'type' => 'checkbox',
        'class' => array('form-row-wide'),
        'label' => __('Is this product for external shipping address?', 'woocommerce'),
    ), false);

    // Use WooCommerce default country field
    woocommerce_form_field('external_shipping_country', array(
        'type' => 'country',
        'class' => array('form-row-wide', 'hidden'),
        'label' => __('Country / Region', 'woocommerce'),
        'placeholder' => __('Select a country&hellip;', 'woocommerce'),
        'required' => true,
    ), '');

    // Use WooCommerce default state field
    woocommerce_form_field('external_shipping_state', array(
        'type' => 'state',
        'class' => array('form-row-wide', 'hidden'),
        'label' => __('State', 'woocommerce'),
        'placeholder' => __('Select a state&hellip;', 'woocommerce'),
        'required' => true,
    ), '');

    woocommerce_form_field('external_shipping_address_1', array(
        'type' => 'text',
        'class' => array('form-row-wide', 'hidden'),
        'label' => __('Street address', 'woocommerce'),
        'placeholder' => __('House number and street name', 'woocommerce'),
        'required' => true,
    ), '');

    woocommerce_form_field('external_shipping_city', array(
        'type' => 'text',
        'class' => array('form-row-wide', 'hidden'),
        'label' => __('Town / City', 'woocommerce'),
        'placeholder' => '',
        'required' => true,
    ), '');

    woocommerce_form_field('external_shipping_postcode', array(
        'type' => 'text',
        'class' => array('form-row-wide', 'hidden'),
        'label' => __('ZIP / Postal code', 'woocommerce'),
        'placeholder' => '',
        'required' => true,
    ), '');

    echo '</div>';
}

// Store Address Data in Session When Product is Added to Cart
add_action('woocommerce_add_to_cart', 'store_external_shipping_data_in_session', 10, 6);
function store_external_shipping_data_in_session($cart_item_key, $product_id, $quantity, $variation_id, $variation, $cart_item_data) {
    if (isset($_POST['external_shipping_checkbox']) && $_POST['external_shipping_checkbox'] == '1') {
        foreach (array('country', 'state', 'address_1', 'city', 'postcode') as $key) {
            if (isset($_POST['external_shipping_' . $key])) {
                WC()->session->set('external_shipping_' . $cart_item_key . '_' . $key, sanitize_text_field($_POST['external_shipping_' . $key]));
            }
        }
    }

     // Validation
    // Check if the checkbox is checked
    if (isset($_POST['external_shipping_checkbox']) && $_POST['external_shipping_checkbox'] == '1') {
        // Validate the address fields only if the checkbox is checked
        $valid = true;
        foreach (array('country', 'address_1', 'city', 'postcode') as $key) {
            if (empty($_POST['external_shipping_' . $key])) {
                $valid = false;
                break;
            }
        }

        // Check if the state field is visible before validating it
        if (isset($_POST['external_shipping_state_field']) && $_POST['external_shipping_state_field'] == 'visible') {
            if (empty($_POST['external_shipping_state'])) {
                $valid = false;
            }
        }

        if (!$valid) {
            // Display error message and prevent product from being added to the cart
            wc_add_notice(__('Please fill in all required fields for external shipping.', 'woocommerce'), 'error');
            // Remove the product from the cart
            WC()->cart->remove_cart_item($cart_item_key);
        } else {
            // Address fields are valid, store them in session
            foreach (array('country', 'state', 'address_1', 'city', 'postcode') as $key) {
                if (isset($_POST['external_shipping_' . $key])) {
                    WC()->session->set('external_shipping_' . $cart_item_key . '_' . $key, sanitize_text_field($_POST['external_shipping_' . $key]));
                }
            }
        }
    }

    if (isset($_POST['external_shipping_checkbox']) && $_POST['external_shipping_checkbox'] == '1') {
        foreach (array('country', 'state', 'address_1', 'city', 'postcode') as $key) {
            if (isset($_POST['external_shipping_' . $key])) {
                WC()->session->set('external_shipping_' . $cart_item_key . '_' . $key, sanitize_text_field($_POST['external_shipping_' . $key]));
            }
        }
        // Set a flag indicating the checkbox was checked
        WC()->session->set('external_shipping_checkbox_checked_' . $cart_item_key, true);
    } else {
        // If checkbox was not checked, remove any previously stored data and set the flag accordingly
        foreach (array('country', 'state', 'address_1', 'city', 'postcode') as $key) {
            WC()->session->__unset('external_shipping_' . $cart_item_key . '_' . $key);
        }
        WC()->session->set('external_shipping_checkbox_checked_' . $cart_item_key, false);
    }
}

// Display External Shipping Fields on Cart Page if Missing
add_action('woocommerce_before_cart', 'display_external_shipping_fields_on_cart_page');
function display_external_shipping_fields_on_cart_page() {
    // Loop through cart items
    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
        // Check if external shipping data is missing
        $missing_data = false;
        foreach (array('country', 'address_1', 'city', 'postcode') as $key) {
            if (empty(WC()->session->get('external_shipping_' . $cart_item_key . '_' . $key))) {
                $missing_data = true;
                break;
            }
        }
        
        // Check if state data is missing (only if the country has states)
        $country_code = WC()->session->get('external_shipping_' . $cart_item_key . '_country');
        $has_states = WC()->countries->get_states($country_code);
        if ($has_states) {
            if (empty(WC()->session->get('external_shipping_' . $cart_item_key . '_state'))) {
                $missing_data = true;
            }
        }

        // If external shipping data is missing, display the fields
        if ($missing_data) {
            echo '<div class="external-shipping-fields">';
            
            // Get product name
            $product_name = $cart_item['data']->get_name();

            echo '<p>';
            woocommerce_form_field('external_shipping_add_address_' . $cart_item_key, array(
                'type' => 'checkbox',
                'class' => array('form-row-wide', 'external-shipping-checkbox'),
                'label' => sprintf(__('Add external address for %s', 'woocommerce'), $product_name),
            ), '');

            // Display WooCommerce default country field
            woocommerce_form_field('external_shipping_country_' . $cart_item_key, array(
                'type' => 'country',
                'class' => array('form-row-wide', 'hidden', 'external-shipping-country'),
                'label' => __('Country / Region', 'woocommerce'),
                'placeholder' => __('Select a country', 'woocommerce'),
                'required' => true,
                'default' => WC()->customer->get_shipping_country(), // Set default value to the customer's shipping country
            ), '');

            // Display WooCommerce default state field
            woocommerce_form_field('external_shipping_state_' . $cart_item_key, array(
                'type' => 'state',
                'class' => array('form-row-wide', 'hidden', 'external-shipping-state'),
                'label' => __('State', 'woocommerce'),
                'placeholder' => __('Select a state', 'woocommerce'),
                'required' => true,
                'default' => WC()->customer->get_shipping_state(), // Set default value to the customer's shipping state
            ), '');

            woocommerce_form_field('external_shipping_address_1_' . $cart_item_key, array(
                'type' => 'text',
                'class' => array('form-row-wide', 'hidden'),
                'label' => __('Street address', 'woocommerce'),
                'placeholder' => __('House number and street name', 'woocommerce'),
                'required' => true,
            ), '');

            woocommerce_form_field('external_shipping_city_' . $cart_item_key, array(
                'type' => 'text',
                'class' => array('form-row-wide', 'hidden'),
                'label' => __('Town / City', 'woocommerce'),
                'placeholder' => '',
                'required' => true,
            ), '');

            woocommerce_form_field('external_shipping_postcode_' . $cart_item_key, array(
                'type' => 'text',
                'class' => array('form-row-wide', 'hidden'),
                'label' => __('ZIP / Postal code', 'woocommerce'),
                'placeholder' => '',
                'required' => true,
            ), '');

            echo '</div>';
        }
    }
}

// Step 4: Store Address Data in Order Meta
add_action('woocommerce_checkout_create_order_line_item', 'store_external_shipping_data_in_order_meta', 10, 4);
function store_external_shipping_data_in_order_meta($item, $cart_item_key, $values, $order) {
    $address_data = '';

    foreach (array('country', 'state', 'address_1', 'city', 'postcode') as $key) {
        $value = WC()->session->get('external_shipping_' . $cart_item_key . '_' . $key);
        if (!empty($value)) {
            $address_data .= $key . ': ' . $value . "\n";
        }
    }

    // Add address data to order meta
    $item->add_meta_data('External Address', $address_data);
}

// Ajax to remove external address field sets if product removes from cart
add_action('wp_ajax_remove_cart_item', 'remove_cart_item_callback');
add_action('wp_ajax_nopriv_remove_cart_item', 'remove_cart_item_callback');

function remove_cart_item_callback() {
    if (isset($_POST['cart_item_key'])) {
        $cart_item_key = sanitize_text_field($_POST['cart_item_key']);
        WC()->cart->remove_cart_item($cart_item_key);
        die();
    }
}

// Enqueue script
add_action('wp_enqueue_scripts', 'external_shipping_dynamic_state_dropdown');
function external_shipping_dynamic_state_dropdown() {
	wp_enqueue_script(
		'external-shipping-script',
		get_template_directory_uri() . '/assets/src/js/external-shipping.js',
		array( 'jquery' ),
		wp_get_theme()->get( 'Version' ),
		true
	);
}

add_action('wp_enqueue_scripts', 'enqueue_woocommerce_scripts');
function enqueue_woocommerce_scripts() {
    // Enqueue WooCommerce scripts
    if (function_exists('is_product') && is_product()) {
        // Enqueue on product page
        wp_enqueue_script('wc-country-select');
    } elseif (function_exists('is_cart') && is_cart()) {
        // Enqueue on cart page
        wp_enqueue_script('wc-country-select');
    }
}
