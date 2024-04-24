<?php

// Display External Shipping Fields on Checkout Page
add_action( 'woocommerce_checkout_before_order_review', 'woo_add_display_external_shipping_fields_on_checkout_page' );
function woo_add_display_external_shipping_fields_on_checkout_page() {
    // Nonce field for form submission verification
    wp_nonce_field( 'external_shipping_form', 'external_shipping_nonce' );

    // Loop through cart items
    foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
        // Get the quantity of the current item in the cart
        $quantity = $cart_item['quantity'];

        // Display external shipping fields for each item based on its quantity
        for ( $i = 1; $i <= $quantity; $i++ ) {
            echo '<div class="external-shipping-fields">';

            // Get product name
            $product_name = $cart_item['data']->get_name();

            echo '<p>';
            woocommerce_form_field(
                'external_shipping_checkbox_' . $cart_item_key . '_' . $i,
                array(
                    'type'  => 'checkbox',
                    'class' => array( 'form-row-wide', 'external-shipping-checkbox' ),
                    'label' => sprintf( __( 'Add external address for %s %d', 'woocommerce' ), $product_name, $i ),
                ),
                ''
            );

            // Display WooCommerce default country field
            woocommerce_form_field(
                'external_shipping_country_' . $cart_item_key . '_' . $i,
                array(
                    'type'        => 'country',
                    'class'       => array( 'form-row-wide', 'hidden', 'external-shipping-country' ),
                    'label'       => __( 'Country / Region', 'woocommerce' ),
                    'placeholder' => __( 'Select a country', 'woocommerce' ),
                    'required'    => true,
                    'default'     => WC()->customer->get_shipping_country(),
                ),
                ''
            );

            // Display WooCommerce default state field
            woocommerce_form_field(
                'external_shipping_state_' . $cart_item_key . '_' . $i,
                array(
                    'type'        => 'state',
                    'class'       => array( 'form-row-wide', 'hidden', 'external-shipping-state' ),
                    'label'       => __( 'State', 'woocommerce' ),
                    'placeholder' => __( 'Select a state', 'woocommerce' ),
                    'required'    => true,
                    'default'     => WC()->customer->get_shipping_state(),
                ),
                ''
            );

            woocommerce_form_field(
                'external_shipping_address_1_' . $cart_item_key . '_' . $i,
                array(
                    'type'        => 'text',
                    'class'       => array( 'form-row-wide', 'hidden' ),
                    'label'       => __( 'Street address', 'woocommerce' ),
                    'placeholder' => __( 'House number and street name', 'woocommerce' ),
                    'required'    => true,
                ),
                ''
            );

            woocommerce_form_field(
                'external_shipping_city_' . $cart_item_key . '_' . $i,
                array(
                    'type'        => 'text',
                    'class'       => array( 'form-row-wide', 'hidden' ),
                    'label'       => __( 'Town / City', 'woocommerce' ),
                    'placeholder' => '',
                    'required'    => true,
                ),
                ''
            );

            woocommerce_form_field(
                'external_shipping_postcode_' . $cart_item_key . '_' . $i,
                array(
                    'type'        => 'text',
                    'class'       => array( 'form-row-wide', 'hidden' ),
                    'label'       => __( 'ZIP / Postal code', 'woocommerce' ),
                    'placeholder' => '',
                    'required'    => true,
                ),
                ''
            );

            echo '</div>';
        }
    }
}

// Save custom field data to order with nonce verification
add_action( 'woocommerce_add_order_item_meta', 'woo_add_save_custom_field_to_order', 10, 3 );

function woo_add_save_custom_field_to_order( $item_id, $cart_item_key, $values ) {
    // Sanitize nonce
    $nonce = isset( $_POST['external_shipping_nonce'] ) ? sanitize_text_field( $_POST['external_shipping_nonce'] ) : '';

    // Verify sanitized nonce
    if ( $nonce && wp_verify_nonce( $nonce, 'external_shipping_form' ) ) {
        // Get the quantity of the current item in the cart
        $quantity = WC()->cart->get_cart()[ $cart_item_key['key'] ]['quantity'];

        // Check if any of the checkboxes for external shipping address is checked
        $external_shipping_checked = false;
        for ( $i = 1; $i <= $quantity; $i++ ) {
            if ( isset( $_POST[ 'external_shipping_checkbox_' . $cart_item_key['key'] . '_' . $i ] ) && $_POST[ 'external_shipping_checkbox_' . $cart_item_key['key'] . '_' . $i ] == '1' ) {
                $external_shipping_checked = true;
                break;
            }
        }

        // If any checkbox is checked, store the address data
        if ( $external_shipping_checked ) {
            // Initialize an array to store the address data for each quantity
            $address_data_array = array();

            // Add external address data from cart page to order meta
            for ( $i = 1; $i <= $quantity; $i++ ) {
                $address_data = '';

                foreach ( array( 'country', 'state', 'address_1', 'city', 'postcode' ) as $field ) {
                    if ( isset( $_POST[ 'external_shipping_' . $field . '_' . $cart_item_key['key'] . '_' . $i ] ) ) {
                        $address_data .= ucwords( str_replace( '_', ' ', $field ) ) . ': ' . sanitize_text_field( $_POST[ 'external_shipping_' . $field . '_' . $cart_item_key['key'] . '_' . $i ] ) . "\n";
                    }
                }

                // Add the address data for the current quantity to the address_data_array
                $address_data_array[] = $address_data;
            }

            // Add address data to order meta with separate meta keys for each quantity
            foreach ( $address_data_array as $index => $address_data ) {
                $meta_key = 'External Address ' . ( $index + 1 );
                wc_add_order_item_meta( $item_id, $meta_key, $address_data );
            }
        }
    }
}

// Validate External Shipping Fields on Checkout
add_action( 'woocommerce_checkout_process', 'woo_add_validate_external_shipping_fields_on_checkout' );
function woo_add_validate_external_shipping_fields_on_checkout() {
    // Verify nonce
    $nonce = isset( $_POST['external_shipping_nonce'] ) ? $_POST['external_shipping_nonce'] : '';
    if ( ! wp_verify_nonce( $nonce, 'external_shipping_form' ) ) {
        return;
    }

    // Flag to track if any validation error occurs
    $validation_error = false;

    // Loop through cart items
    foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
        // Get the quantity of the current item in the cart
        $quantity = $cart_item['quantity'];

        // Check if any of the checkboxes for external shipping address is checked for any quantity
        $external_shipping_checked = false;
        for ( $i = 1; $i <= $quantity; $i++ ) {
            if ( isset( $_POST[ 'external_shipping_checkbox_' . $cart_item_key . '_' . $i ] ) && $_POST[ 'external_shipping_checkbox_' . $cart_item_key . '_' . $i ] == '1' ) {
                $external_shipping_checked = true;
                break;
            }
        }

        // If external shipping checkbox is checked, validate the address fields
        if ( $external_shipping_checked ) {
            for ( $i = 1; $i <= $quantity; $i++ ) {
                // Check if the checkbox for the current quantity is checked
                if ( isset( $_POST[ 'external_shipping_checkbox_' . $cart_item_key . '_' . $i ] ) && $_POST[ 'external_shipping_checkbox_' . $cart_item_key . '_' . $i ] == '1' ) {
                    // Validate the address fields
                    $valid = true;
                    foreach ( array( 'country', 'address_1', 'city', 'postcode' ) as $key ) {
                        // Check if the field is empty
                        if ( empty( $_POST[ 'external_shipping_' . $key . '_' . $cart_item_key . '_' . $i ] ) ) {
                            $valid = false;
                            break;
                        }
                    }

                    // Check if the country has states
                    $country_code = $_POST[ 'external_shipping_country_' . $cart_item_key . '_' . $i ];
                    $has_states = ! empty( WC()->countries->get_states( $country_code ) );

                    // Validate the state field if the country has states
                    if ( $has_states && empty( $_POST[ 'external_shipping_state_' . $cart_item_key . '_' . $i ] ) ) {
                        $valid = false;
                    }

                    // If validation fails for any quantity, set the validation error flag and break the loop
                    if ( ! $valid ) {
                        $validation_error = true;
                        break 2; // Break both inner and outer loop
                    }
                }
            }
        }
    }

    // If validation error occurs, display error message and prevent checkout
    if ( $validation_error ) {
        wc_add_notice( __( 'Please fill in all required fields for external shipping.', 'woocommerce' ), 'error' );
    }
}


// Enqueue script
add_action( 'wp_enqueue_scripts', 'woo_add_js_for_shipping_address' );
function woo_add_js_for_shipping_address() {
	wp_enqueue_script(
		'external-shipping-script',
		get_template_directory_uri() . '/assets/src/js/external-shipping.js',
		array( 'jquery' ),
		wp_get_theme()->get( 'Version' ),
		true
	);
}