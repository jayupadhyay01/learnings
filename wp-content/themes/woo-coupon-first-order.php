<?php
/**
 * Functions for first-order coupons.
 *
 * @package WordPress
 */

/**
 * Function to generate or retrieve the first-order coupon code
 *
 * @return string Coupon code
 */
function get_first_order_coupon_code() {
    // Coupon code for first order
    $coupon_code = 'FIRSTORDER';

    // Check if the coupon already exists, if not create it
    $coupon_id = wc_get_coupon_id_by_code( $coupon_code );

    if ( ! $coupon_id ) {
        $coupon_amount      = 5; // 5% discount
        $coupon_type        = 'percent';
        $coupon_description = '5% Discount on First Order';

        // Create coupon.
        $coupon = array(
            'post_title'   => $coupon_code,
            'post_content' => '',
            'post_excerpt' => $coupon_description,
            'post_status'  => 'publish',
            'post_author'  => 1,
            'post_type'    => 'shop_coupon',
        );

        $coupon_id = wp_insert_post( $coupon );

        if ( $coupon_id ) {
            update_post_meta( $coupon_id, 'discount_type', $coupon_type );
            update_post_meta( $coupon_id, 'coupon_amount', $coupon_amount );
            update_post_meta( $coupon_id, 'usage_limit', 0 );
            update_post_meta( $coupon_id, 'individual_use', 'yes' );
            update_post_meta( $coupon_id, 'usage_limit_per_user', 1 ); // One usage per user
        }
    }

    return $coupon_code;
}

/**
 * Function to check if the user has already used the first-order coupon.
 *
 * @param string $email User's email address.
 * @return bool True if the user has already used the coupon, false otherwise.
 */
function user_has_used_first_order_coupon( $email ) {
    // Get the coupon code applied to the user's previous orders.
    $first_order_coupon_code = get_option( 'first_order_coupon_code_' . $email );

    return ! empty( $first_order_coupon_code );
}

/**
 * Function to apply the first-order coupon before checkout.
 *
 * This function applies a first-order coupon to the order if it is user's first order.
 */
function apply_first_order_coupon_before_checkout() {
    // Check if user is logged in.
    if ( is_user_logged_in() ) {
        $user_id = get_current_user_id();
        $email = get_the_author_meta( 'email', $user_id );

        // Check if the user has any previous completed orders and has not used the coupon yet.
        if ( ! user_has_used_first_order_coupon( $email ) ) {
            // Get the first order coupon code.
            $coupon_code = get_first_order_coupon_code();

            // Apply coupon at user's cart.
            WC()->cart->apply_coupon( $coupon_code );
            update_option( 'first_order_coupon_code_' . $email, $coupon_code );
        }
    }
}
add_action( 'woocommerce_before_checkout_form', 'apply_first_order_coupon_before_checkout' );
