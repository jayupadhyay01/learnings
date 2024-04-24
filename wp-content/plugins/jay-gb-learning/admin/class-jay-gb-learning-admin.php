<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @package Jay_gb_learning
 * @author  Jay Upadhyay
 */
class Jay_gb_learning_Admin
{

    private $plugin_name;
    private $version;
    
    /**
     * __construct
     *
     * @param  string $plugin_name
     * @param  int    $version
     * @return void
     */
    public function __construct( $plugin_name, $version )
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Stylesheets Registration for the admin side.
     */
    public function enqueue_styles()
    {

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/jay-gb-learning-admin.css', array(), $this->version, 'all');

    }

    /**
     * JavaScript Register the for the admin side.
     */
    public function enqueue_scripts()
    {
        wp_enqueue_script('jy-gb-post-listing', plugin_dir_url(__FILE__) . 'js/jay-gb-blocks/block/block.build.js', array( 'jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-core-data', 'wp-api-fetch' ), $this->version, false);
        wp_localize_script('jy-gb-post-listing', 'ajaxObject', array ('ajaxurl' => admin_url('admin-ajax.php'), 'data_nonce' => wp_create_nonce("my_gb_nonce")));

    }

    /**
     * Custom Rest API Function to get all the PostType Name, Taxonomies, Terms, Posts Data
     */
    public function rest_api_callback()
    {
            
        // API registeration to fetch all PostType, through GET method.
        register_rest_route(
            'post_type/v1', '/myapi/', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_all_posttype')
            ) 
        );

        // API registeration to fetch all Taxonomy, through GET method.
        register_rest_route(
            'post_taxonomy', 'myapi', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_all_taxonomy')
            ) 
        );

        // API registeration to fetch all Term, through GET method.
        register_rest_route(
            'post_taxonomy_term', 'myapi', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_all_taxonomy_term')
            ) 
        );

        // API registeration to fetch all Posts, through GET method.
        register_rest_route(
            'posts_data', 'myapi', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_all_post_list')
            ) 
        );
        
    }

    public function get_all_posttype()
    {
        $post_types = get_post_types([], 'objects');
        $exclude_post_type = array("attachment", "wp_block", "revision", "oembed_cache", "user_request",  "wp_global_styles", "customize_changeset", "custom_css", "nav_menu_item", "wp_template", "wp_template_part", "wp_navigation");

        foreach ($post_types as $post) { 
            if (!in_array($post->name, $exclude_post_type) ) {
                $myapi_array[] = array( 'name' => $post->labels->singular_name, 'values' => $post->name);
            }
        }        
        return $myapi_array;
    }

    public function get_all_taxonomy()
    {
        $myapi_array = array();
        if (isset($_GET['post_slug']) ) {
            $slugOfPost = explode(',',  filter_input(INPUT_GET, 'post_slug', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
            $taxonomies  = get_object_taxonomies($slugOfPost, 'objects');
            if ($taxonomies ) {
                foreach ( $taxonomies as $taxonomy ) {
                    $myapi_array[] = array( 'name' => $taxonomy->name );
                }
            }
        }

        return $myapi_array;
    }

    public function get_all_taxonomy_term()
    {
        $myapi_array = array();
        if (isset($_GET['taxonomy_slug']) ) {
            $taxonomy_slug   = explode(',', filter_input(INPUT_GET, 'taxonomy_slug', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
            $taxonomies_term = get_terms(array( 'taxonomy' => $taxonomy_slug ));
            if ($taxonomies_term ) {
                foreach ( $taxonomies_term as $term ) {
                    $myapi_array[] = array( 'name' => $term->name);
                }
            }
        }

        return $myapi_array;
    }

    public function get_all_post_list()
    {  
        $my_nonce = filter_input(INPUT_GET, 'nonce', FILTER_SANITIZE_STRING);
        // if (!empty($_REQUEST['nonce']) && wp_verify_nonce($my_nonce, "my_gb_nonce") ) {
              $post_type = (!empty($_GET['post_type'])) ? explode(',', filter_input(INPUT_GET, 'post_type', FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
              $taxonomy  = (!empty($_GET['taxonomy'])) ? explode(',', filter_input(INPUT_GET, 'taxonomy', FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
              $terms     = (!empty($_GET['terms'])) ? explode(',', filter_input(INPUT_GET, 'terms', FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
              $taxonomiesArray = array('relation' => 'OR');
		// }
            if (!empty($taxonomy) ) {
                foreach( $taxonomy as $value ) {
                    if (!empty($terms) ) {
                        $termsList = get_terms($value);
                        $terms_slug = array();
                        foreach ( $termsList as $key => $val ) {
                            if (in_array($termsList[$key]->name, $terms, true)) {
                                $terms_slug[] = $termsList[$key]->slug;
                            }
                        }
                        if (!empty($terms_slug)) {
                            $taxonomiesArray[] = array('taxonomy' => $value, 'field' => 'slug', 'terms'=> $terms_slug, 'operator' => 'IN' );
                        } else {
                            $taxonomiesArray[] = array('taxonomy' => $value );
                        }
                    }
                }
            } 
            $args = array();
            if (!empty($post_type) && !empty($taxonomy) && !empty($terms) ) {
                $args = array(
                'post_type' => $post_type, 
                'post_status' => 'publish', 
                'posts_per_page' => -1, 
                'tax_query' => $taxonomiesArray
                );
            } else if (!empty($post_type) && !empty($taxonomy)) {
                $args = array(
                'post_type' => $post_type, 
                'post_status' => 'publish', 
                'posts_per_page' => -1, 
                'tax_query' => $taxonomiesArray
                );
            } else if (!empty($post_type)) {
                $args = array(
                'post_type' => $post_type, 
                'post_status' => 'publish', 
                'posts_per_page' => -1, 
                );
            } 
        
            $postslist = new WP_Query($args);
            ob_start();
            if ($args ) { ?>
<section class="blog">
    <div class="container">
                        <?php
                
                        while ( $postslist->have_posts() ) {
                            $postslist->the_post();
                            $post_thumbnail_id = get_post_thumbnail_id(get_the_ID());
                            $thumbnail_url = wp_get_attachment_image_url($post_thumbnail_id, 'post-thumbnail');
                    
                            ?>
        <div class="col-sm-4 post-lists">
            <h3><a href="<?php echo esc_url(get_permalink());?>"><?php esc_html(the_title()); ?></a></h3>
                            <?php if (!empty($thumbnail_url) ) { ?>
            <img src="<?php echo esc_url($thumbnail_url);?>" alt="My Image" />
                            <?php } ?>
            <div class="post-content-list">
                <div class="title">
                    <p><?php esc_html(the_excerpt());?></p>
                </div>
            </div>
            <div class="read-more-dynamic"><a href="<?php echo esc_url(get_permalink());?>">Read More</a></div>
        </div>
                            <?php
                        } ?>
    </div>
</section>
            <?php } else {
                ?><span>No Record Found!</span><?php
            }
        
                    $html = ob_get_contents();
                    ob_clean();
                    return $html;

    }

}