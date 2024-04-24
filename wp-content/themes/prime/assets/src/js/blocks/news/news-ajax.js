jQuery('.sort-category').change(function(e) {
	jQuery('.news-loding').show();
			var postPerPage = jQuery(this).find(':selected').attr('post-per-page');
			var buttonLabel = jQuery(this).find(':selected').attr('button-label');
			var select = jQuery('.sort-category');
            var category = select.val();  
			
            jQuery.ajax({
                    type: "GET",
                    url: siteConfig.ajaxUrl,
                    dataType:"html",
                    data: { 
                        action: 'data_custom_ajax',
                        category: category,
						postPerPage: postPerPage,
						buttonLabel: buttonLabel,
                    },
                    success: function(response){
                        response = JSON.parse(response);
                        if(response.success == true){
                            jQuery('.row').css('display','block');
                            jQuery('.news-loding').hide();
                            if(response.result.posts.length > 0){
                                var innerHtml = "";
                                response.result.posts.forEach(function callback(value, index) {
                                    let thumbnailUrl =  value.thumbnail_url ? value.thumbnail_url : response.result.static_img_url;
                                        innerHtml += `<div class='news_wrapper' data-sort-id='${value.id}'>
                                                        <div class='news_img'>
                                                            <a href='${value.permalink}'><img alt='news' src='${thumbnailUrl}'></a>
                                                        </div>

                                                        <div class="news_column">
                                                            <div class="news_title">
                                                            ${value.title}
                                                            </div>
                                                    
                                                            <div class="news_content">
                                                                ${value.content}
                                                            </div>
                                            
                                                        <div class="news-button-link wp-block-button">
                                                            <a class="wp-block-button__link news_url" rel="noopener" href='${value.permalink}'>
                                                                ${response.result.button_label}
                                                            </a>
                                                        </div>
                                                    </div>
                                            </div>`;
                                            if((index+1)%3 == 0){
                                                innerHtml += '<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide">';
                                              }
                                  });
                                  jQuery('.row').empty();
                                  jQuery('.row').append(innerHtml);
                            } else {
                                jQuery('.row').empty();
                                jQuery('.row').append('<p class="result-not-found">No any news found</p>');
                            }
                        } else {
                            jQuery('.row').hide();
                            jQuery('.news-loding').hide();  
                        }
                    }
            });
        });

//Back Button page reset value of News Category Dropdown
window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
    ( typeof window.performance != "undefined" && 
        window.performance.navigation.type === 2 );                        
    if ( historyTraversal ) {
        var currentUrl = window.location.href; // phpcs:ignore
        var newUrl = siteConfig.siteUrl+'/news';
        var newUrl2 = siteConfig.siteUrl+'/news/';
        if (currentUrl == newUrl || currentUrl == newUrl2) {
            jQuery('#sort-category').prop('selectedIndex',0);
        }
    }
});