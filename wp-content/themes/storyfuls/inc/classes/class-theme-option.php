<?php
/**
 * Theme Theme Options.
 *
 * @package storyful
 */

namespace STORYFUL\Inc;

use STORYFUL\Inc\Traits\Singleton;

/**
 * Class Theme Options.
 */
class Theme_Option {

	use Singleton;

	/**
	 * Construct method.
	 */
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * To register action/filter.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	protected function setup_hooks() {

		/**
		 * Actions
		 */
		add_action( 'admin_menu', array( $this, 'add_option_menu' ) );
		add_action( 'admin_init', array( $this, 'option_settings_init' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'theme_option_assets' ) );

	}

	/**
	 * Added option Menu.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function add_option_menu() {
		add_menu_page( 'Theme Options', 'Theme Options', 'manage_options', 'storyful', array( $this, 'option_form' ), '', 50 );
	}

	/**
	 * Generate Option form.
	 * Added enctype="multipart/form-data" to allow media upload.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function option_form() {
		?>
		<div class="wrap">
			<div class="storyful-theme-options">
				<div class="storyful-theme-options-header">
					<h1>storyful Theme Options</h1>
					<?php
					$get_tab    = filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
					$active_tab = isset( $get_tab ) ? $get_tab : 'general_options';
					?>
					<h2 class="nav-tab-wrapper">
						<a href="?page=storyful&tab=general_options" class="nav-tab <?php echo esc_attr( 'general_options' === $active_tab ? 'nav-tab-active' : '' ); ?>"><?php echo esc_html__( 'General Settings', 'storyful' ); ?></a>
					</h2>
					<span><?php settings_errors(); ?></span>
				</div>
				<form action='options.php' enctype="multipart/form-data" method='post'> 
					<?php
					settings_fields( 'storyful-setting' );
					do_settings_sections( 'storyful' );
					submit_button();
					?>
				</form>
			</div>
		</div>
		<?php
	}

	/**
	 * Add Setting fields.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function option_settings_init() {
		register_setting( 'storyful-setting', 'storyful_settings' );
		add_settings_section( 'storyful-section', __( 'General Settings', 'storyful' ), '__return_empty_string', 'storyful' );
		add_settings_field(
			'storyful_logo',
			__( 'Site Logo:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'file',
				'name'  => 'storyful_settings[storyful_img]',
				'value' => 'storyful_img',
			)
		);
		add_settings_field(
			'storyful_favicon',
			__( 'Site Favicon:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'file',
				'name'  => 'storyful_settings[storyful_favicon]',
				'value' => 'storyful_favicon',
			)
		);
		add_settings_field(
			'storyful_tagline',
			__( 'Site Tagline:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'text',
				'name'  => 'storyful_settings[storyful_tagline]',
				'value' => 'storyful_tagline',
			)
		);
		add_settings_field(
			'storyful_google_analytic',
			__( 'Google Analytic:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'textarea',
				'name'  => 'storyful_settings[storyful_google_analytic]',
				'value' => 'storyful_google_analytic',
			)
		);
		add_settings_field(
			'storyful_css_code',
			__( 'Additional CSS:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'textarea',
				'name'  => 'storyful_settings[storyful_css_code]',
				'value' => 'storyful_css_code',
			)
		);
		add_settings_field(
			'storyful_html_code',
			__( 'Additional html:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'textarea',
				'name'  => 'storyful_settings[storyful_html_code]',
				'value' => 'storyful_html_code',
			)
		);
		add_settings_field(
			'storyful_color_picker',
			__( 'Color:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'color-picker',
				'name'  => 'storyful_settings[storyful_color_picker]',
				'value' => 'storyful_color_picker',
			)
		);
		add_settings_field(
			'storyful_wysiwyg',
			__( 'Text Editor:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'wysiwyg',
				'name'  => 'storyful_settings[storyful_wysiwyg]',
				'value' => 'storyful_wysiwyg',
			)
		);
		add_settings_field(
			'storyful_password',
			__( 'Manage Password:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'password',
				'name'  => 'storyful_settings[storyful_password]',
				'id'    => 'password',
				'value' => 'storyful_password',
			)
		);
		add_settings_field(
			'storyful_selectbox',
			__( 'Select Option:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'    => 'select',
				'name'    => 'storyful_settings[storyful_selectbox]',
				'value'   => 'storyful_selectbox',
				'options' => array(
					'0' => '0',
					'1' => '1',
					'2' => '2',
					'3' => '3',
				),
			)
		);
		add_settings_field(
			'storyful_multiselect',
			__( 'Select Multiple Option:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'    => 'multicheck',
				'name'    => 'storyful_settings[storyful_multiselect]',
				'id'      => 'multicheck',
				'value'   => 'storyful_multiselect',
				'options' => array(
					'0' => 'pizza',
					'1' => 'biryani',
					'2' => 'burger',
					'3' => 'pav bhaji',
				),
			)
		);
		add_settings_field(
			'storyful_radio',
			__( 'Select Radio Option:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'    => 'radio',
				'name'    => 'storyful_settings[storyful_radio]',
				'value'   => 'storyful_radio',
				'options' => array(
					'0' => 'HTML',
					'1' => 'CSS',
					'2' => 'JS',
					'3' => 'PHP',
				),
			)
		);
		add_settings_field(
			'storyful_checkbox',
			__( 'Select Checkbox Option:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'checkbox',
				'id'    => 'checkbox',
				'name'  => 'storyful_settings[storyful_checkbox]',
				'value' => 'storyful_checkbox',
				'task'  => 'Enable Transparent Header ?',
			)
		);
		add_settings_field(
			'storyful_number',
			__( 'Number:', 'storyful' ),
			array( $this, 'add_field' ),
			'storyful',
			'storyful-section',
			array(
				'type'  => 'number',
				'name'  => 'storyful_settings[storyful_number]',
				'value' => 'storyful_number',
			)
		);
	}

	/**
	 * Generate Fields.
	 *
	 * @param  array $args Field argument.
	 * @return void
	 * @since 1.0.0
	 */
	public function add_field( array $args ) {
		$options = get_option( 'storyful_settings' );
		switch ( $args['type'] ) {
			case 'text':
				$this->text_callback( $args, $options );
				break;
			case 'textarea':
				$this->textarea_callback( $args, $options );
				break;
			case 'file':
				$this->file_callback( $args, $options );
				break;
			case 'checkbox':
				$this->checkbox_callback( $args, $options );
				break;
			case 'multicheck':
				$this->multiselect_callback( $args, $options );
				break;
			case 'color-picker':
				$this->color_picker_callback( $args, $options );
				break;
			case 'wysiwyg':
				$this->wysiwyg_callback( $args, $options );
				break;
			case 'password':
				$this->password_callback( $args, $options );
				break;
			case 'select':
				$this->selectbox_callback( $args, $options );
				break;
			case 'radio':
				$this->radio_button_callback( $args, $options );
				break;
			case 'number':
				$this->number_callback( $args, $options );
				break;
		}
	}

	/**
	 * Generate textbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function text_callback( $args, $options ) {
		?>
		<input type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>" />
		<?php
	}

	/**
	 * Generate textarea.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function textarea_callback( $args, $options ) {
		?>
		<textarea type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" rows="8" cols="40"><?php echo isset( $options[ $args['value'] ] ) ? esc_html( $options[ $args['value'] ] ) : ''; ?></textarea>
		<?php
	}

	/**
	 * Generate image.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function file_callback( $args, $options ) {
		?>
		<img class="storyful_img" 
			name="<?php echo esc_attr( $args['name'] ); ?>" 
			src="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>" 
			<?php
			if ( ! empty( $options[ $args['value'] ] ) ) {
				echo 'width="250px" height="150px"';
			}
			?>
		/>
		<input class="storyful_img_url" 
			type="hidden" 
			name="<?php echo esc_attr( $args['name'] ); ?>" 
			size="60" 
			value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>"
		>
		<a href="#" class="storyful_img_upload"><button>Upload</button></a>
		<a href="#" class="storyful_img_remove"><button>Remove</button></a>
		<?php
	}

	/**
	 * Generate Checkbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function checkbox_callback( $args, $options ) {
		?>
		<input id="<?php echo esc_attr( $args['id'] ); ?>" type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="true" <?php checked( 'true', isset( $options[ $args['value'] ] ) ? $options[ $args['value'] ] : '' ); ?>>
		<label for="<?php echo esc_attr( $args['id'] ); ?>"><?php echo esc_html( $args['task'] ); ?></label>
		<?php
	}

	/**
	 * Generate Multi Select.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function multiselect_callback( $args, $options ) {
		$multi_select_options = $args['options'];
		?>
		<select multiple id="<?php echo esc_attr( $args['id'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>[]">
			<?php
			foreach ( $multi_select_options as $key => $value ) :
				?>
				<option value="<?php echo esc_attr( $key ); ?>" 
						<?php
						if ( isset( $options[ $args['value'] ] ) ) {
							echo in_array( "$key", $options[ $args['value'] ], true ) ? 'selected' : ''; }
						?>
				>
					<?php echo esc_html( $value ); ?>
				</option>
				<?php
				endforeach;
			?>
		</select>
		<br />
		<span id="help-notice">hold command on MAC and control on Windows to select multiple options</span>
		<?php
	}

	/**
	 * Generate Color Picker.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function color_picker_callback( $args, $options ) {
		?>
		<input type="text" class="color-picker" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>" />
		<?php
	}

	/**
	 * Generate wysiwyg.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function wysiwyg_callback( $args, $options ) {
		$content = isset( $options[ $args['value'] ] ) ? $options[ $args['value'] ] : '';
		wp_editor( $content, 'wysiwyg', array( 'textarea_name' => esc_attr( $args['name'] ) ) );
	}


	/**
	 * Generate Password.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function password_callback( $args, $options ) {
		?>
		<input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" id="<?php echo esc_attr( $args['id'] ); ?>" type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>" />
		<div id="message">
			<h3>Password must contain the following:</h3>
			<p id="letter" class="invalid">A <b>lowercase</b> letter</p>
			<p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
			<p id="number" class="invalid">A <b>number</b></p>
			<p id="length" class="invalid">Minimum <b>8 characters</b></p>
		</div>
		<?php
	}

	/**
	 * Generate Select Box.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function selectbox_callback( $args, $options ) {
		$select_options = $args['options'];
		?>
		<select name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>">
			<?php
			foreach ( $select_options as $key => $value ) :
				?>
				<option value="<?php echo esc_attr( $key ); ?>" <?php selected( $options[ $args['value'] ], $key ); ?>><?php echo esc_html( $value ); ?></option>
				<?php
				endforeach;
			?>
		</select>
		<?php
	}

	/**
	 * Generate Radio Button.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function radio_button_callback( $args, $options ) {
		$radio_options = $args['options'];
		foreach ( $radio_options as $key => $value ) :
			?>
			<input id="val<?php echo esc_attr( $key ); ?>" type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo esc_attr( $key ); ?>" <?php checked( $options[ $args['value'] ], $key ); ?>>
			<label for="val<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $value ); ?></label><br>
			<?php
		endforeach;
	}

	/**
	 * Generate Number Textbox.
	 *
	 * @param  array $args Field argument.
	 * @param  array $options option values.
	 * @return void
	 * @since 1.0.0
	 */
	public function number_callback( $args, $options ) {
		?>
		<input type="<?php echo esc_attr( $args['type'] ); ?>" name="<?php echo esc_attr( $args['name'] ); ?>" value="<?php echo isset( $options[ $args['value'] ] ) ? esc_attr( $options[ $args['value'] ] ) : ''; ?>">
		<?php
	}

	/**
	 * Enqueue option js/css file.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function theme_option_assets() {

		// Register styles.
		wp_register_style( 'theme-option-css', STORYFUL_BUILD_URI . '/themeoption.css', array(), filemtime( STORYFUL_BUILD_PATH . '/themeoption.css' ), 'all' );

		// Enqueue Styles.
		wp_enqueue_style( 'theme-option-css' );

		wp_enqueue_style( 'wp-color-picker' );

		if ( ! did_action( 'wp_enqueue_media' ) ) {
			wp_enqueue_media();
		}

		wp_register_script( 'theme-option-js', STORYFUL_BUILD_URI . '/themeoption.js', array( 'jquery', 'wp-color-picker' ), filemtime( STORYFUL_BUILD_PATH . '/themeoption.js' ), true );
		wp_enqueue_script( 'theme-option-js' );
	}

}
