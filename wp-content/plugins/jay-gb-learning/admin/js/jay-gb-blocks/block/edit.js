const { __ } = wp.i18n;
const {Fragment, Component, RawHTML } = wp.element;
const { InspectorControls, PanelColorSettings, MediaUpload, RichText} = wp.editor;
const { PanelBody, TextControl, Button, FontSizePicker, RadioControl, Dashicon } = wp.components;

import Select from 'react-select';

class CustomPostData extends Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            listPostTypes: [],
            listTaxonomies: [],
            listTerms: [],
            postData: [],
            loader:'<span class="post-loader"></span>'
        };
        this.onPostTypesChange = this.onPostTypesChange.bind(this);
        this.onTaxonomyChange = this.onTaxonomyChange.bind(this);
        this.onTermChange = this.onTermChange.bind(this);
        this.onPostListingChange = this.onPostListingChange.bind(this);

        // Fetch all custom post types
        let otherPostsOptions = [];
        wp.apiFetch({path: "post_type/v1/myapi/"}).then(postTypes => {
			if ( postTypes != '' ) {
                postTypes.forEach(function (key) {
					otherPostsOptions.push({
						label: __(key.name),
						value: __(key.values)
					});
				});
			}
			this.setState({listPostTypes: otherPostsOptions});
        });
        
    }

    componentWillMount() {
		const {attributes: {post_type, taxonomies, terms, default_open, post_list, taxonomy, term_lists}, setAttributes} = this.props;
        this.onPostTypesChange(post_type);
        this.onTaxonomyChange(taxonomies);
        this.onTermChange(terms);
        this.onPostListingChange(post_list, taxonomy, term_lists);
    }

    // Get all Taxonomy List!
    onPostTypesChange(newPostType) { 
		const {attributes: {post_type, taxonomies, taxonomy, term_lists, terms, post_list}, setAttributes} = this.props;
        let postList = [];
        if ( newPostType.length !== 0 ) {
            newPostType.forEach(function (key) {
                postList.push(key.value);
            });	
        }
        setAttributes({post_type: newPostType, post_list: postList});
        let postTaxonomyOptions = [];
        let selectedTaxonomy = [];
        wp.apiFetch({path: "post_taxonomy/myapi/?post_slug=" + postList.toString()}).then(postTypes => {
            if ( postTypes != '' ) {
				postTypes.forEach(function (key) {
					postTaxonomyOptions.push({
						label: __(key.name),
						value: __(key.name)
					});
                    if (taxonomy.includes(key.name)) {
                        selectedTaxonomy.push({
                            label: __(key.name),
                            value: __(key.name)
                        });
                    }
				});	
                
			}
            this.setState({listTaxonomies: postTaxonomyOptions});
            this.onTaxonomyChange(selectedTaxonomy);
            
        });
    }

    
    onTaxonomyChange(taxonomyNew) {
		const {attributes: {taxonomies, taxonomy, terms, term_lists, post_list}, setAttributes} = this.props;
        let listTaxonomy = [];
        if ( taxonomyNew != '' ) {
            taxonomyNew.forEach(function (key) {listTaxonomy.push(key.value); });	
        }
        setAttributes({taxonomies: taxonomyNew, taxonomy: listTaxonomy});
        let optionsPostTaxonomyTerms = [];
        let selectedTerms = [];
        wp.apiFetch({path: "post_taxonomy_term/myapi/?taxonomy_slug=" + listTaxonomy.toString()}).then(postTypes => {
            if ( postTypes != '' ) {
				postTypes.forEach(function (key) {
                    if(key.name){
                        optionsPostTaxonomyTerms.push({
                            label: __(key.name),
                            value: __(key.name)
                        });
                        if (term_lists.includes(key.name)) {
                            selectedTerms.push({
                                label: __(key.name),
                                value: __(key.name)
                            });
                        }
                    }
					
				});	
			}
            this.setState({listTerms: optionsPostTaxonomyTerms});
            this.onTermChange(selectedTerms);
        });
    }

    
    onTermChange(termsNew) {
		const {attributes: {post_type, taxonomies, terms, contentOfPost, term_lists, post_list, taxonomy}, setAttributes} = this.props;
        let listTerms = [];
        if ( termsNew != '' ) {
            termsNew.forEach(function (key) {
                listTerms.push(key.value);
            });
        }
        setAttributes({terms: termsNew, term_lists: listTerms});
        this.onPostListingChange(post_list, taxonomy, listTerms);
    }

    onPostListingChange(post_list, taxonomy, listTerms){
        const {attributes: {blockType}, setAttributes} = this.props;
        if ( post_list !== '' ){
            wp.apiFetch({path: "posts_data/myapi/?post_type=" + post_list.toString() +"&taxonomy=" + taxonomy.toString() +"&terms=" + listTerms.toString()}).then(postTypes => {
                 if ( postTypes != '' ) {
                     this.setState({postData: postTypes, loader:''});
                 }
             });
        }
        
    }

    render() {
        const { customFiledList } = this.state;
        const { attributes:{post_type, layoutType, typeDynamicLayout, dynamicTitleColor, fontsDynamicTitle, colorDynamicDesc, fontsDynamicDesc, fontsStaticTitle, colorStaticDesc, fontsStaticDesc, staticPostList, colorStaticTitle, taxonomies, blockType, contentOfPost, terms}, setAttributes } = this.props;
        setAttributes({contentOfPost: this.state.postData});
        const handleClick = (event) => {
            setAttributes({blockType:event.target.value})
        }
        const fontSizes = [
            {
                name: __('Small', 'post-listing'),
                slug: 'small',
                size: '12px',
            },
            {
                name: __('Normal', 'post-listing'),
                slug: 'normal',
                size: '16px',
            },
            {
                name: __('Big', 'post-listing'),
                slug: 'big',
                size: '18px',
            },
            {
                name: __('Extra big', 'post-listing'),
                slug: 'extra-big',
                size: '21px',
            },
        ];
        const fallbackFontSize = 21;
        const descFallbackFontSize = 16;
        const fallbackDynamicFontSize = 21;
        const descFallbackDynamicFontSize = 16;
        return [
            <div className="parent-section">
                <InspectorControls>              
                {
                    blockType === 'static' && (
                    <Fragment>
                        <PanelColorSettings 
                            title={__('Color Settings')}
                            colorSettings={[
                                {
                                    label: __('Title'),
                                    value: colorStaticTitle,
                                    onChange: (value) => setAttributes({ colorStaticTitle: value })
                                },
                                {
                                    label: __('Description'),
                                    value: colorStaticDesc,
                                    onChange: (value) => setAttributes({ colorStaticDesc: value })
                                }
                            ]}
                        />
                        <PanelBody title={__('General Settings')} initialOpen={true} className="post-setting">
                            <RadioControl
                                label="Layout type"
                                selected={ layoutType }
                                options={ [
                                    { label: 'List', value: 'post-list' },
                                    { label: 'Grid', value: 'post-grid' },
                                ] }
                                onChange={ ( value ) => setAttributes({layoutType: value }) }
                            />
                            <label className="post-title"><b>Title Fonts</b></label>
                            <br/>
                            <FontSizePicker
                                fontSizes={fontSizes}
                                value={fontsStaticTitle}
                                fallbackFontSize={fallbackFontSize}
                                withSlider={false}
                                onChange={(newVal) => setAttributes({ fontsStaticTitle: newVal })}
                            />
                            
                            <label className="post-title"><b>Description Fonts</b></label>
                            <br/>
                            <FontSizePicker
                                fontSizes={ fontSizes }
                                value={ fontsStaticDesc }
                                fallbackFontSize={ descFallbackFontSize }
                                onChange={(newVal) => setAttributes({ fontsStaticDesc: newVal })}
                            />

                        </PanelBody>
                    </Fragment>
                    )     
                },
                {
                    blockType === 'dynamic' && (
                    <Fragment>
                        <PanelColorSettings 
                            title={__('Color Settings')}
                            colorSettings={[
                                {
                                    label: __('Title'),
                                    value: dynamicTitleColor,
                                    onChange: (value) => setAttributes({ dynamicTitleColor: value })
                                },
                                {
                                    label: __('Description'),
                                    value: colorDynamicDesc,
                                    onChange: (value) => setAttributes({ colorDynamicDesc: value })
                                },
                            ]}
                        />
                        <PanelBody title={__('General Settings')} initialOpen={true} className="post-setting"> 
                            <label className="post-title"><b>Title Font Setting</b></label>
                            <br/>
                            <FontSizePicker
                                fontSizes={fontSizes}
                                value={fontsDynamicTitle}
                                fallbackFontSize={fallbackDynamicFontSize}
                                withSlider={false}
                                onChange={(newVal) => setAttributes({ fontsDynamicTitle: newVal })}
                            />
                            
                            <label className="post-title"><b>Description Font Setting</b></label>
                            <br/>
                            <FontSizePicker
                                fontSizes={ fontSizes }
                                value={ fontsDynamicDesc }
                                fallbackFontSize={ descFallbackDynamicFontSize }
                                onChange={(newVal) => setAttributes({ fontsDynamicDesc: newVal })}
                            />
                            <RadioControl
                                label="Layout type"
                                selected={ typeDynamicLayout }
                                options={ [
                                    { label: 'List', value: 'post-list' },
                                    { label: 'Grid', value: 'post-grid' },
                                ] }
                                onChange={ ( value ) => setAttributes({typeDynamicLayout: value }) }
                            />
                        </PanelBody>
                    </Fragment>
                    )       
                }
                </InspectorControls>
                <div className="jay-gb-post-listing-wrap">
                    {
                        blockType === '' ? (
                            <div className='md-post-listing-main'>
                               <h3>Select a block type:</h3>
                                <div className='md-post-listing-inner'>
                                    <button onClick={handleClick} value='static'> {'Static Listing'}</button>
                                    <button onClick={handleClick} value='dynamic'> {'Dynamic Listing'}</button>
                                </div>
                            </div>
                        )
                        : 
                        (    
                            blockType == 'static' ? (
                                <Fragment>
                                    <div className={"jay-gb-post-static-listing "+layoutType}>
                                        {staticPostList.map(( post, index) => (
                                            <Fragment key={ index }>
                                                <div id={`step-`+(index+1)} className="step">	
                                                    <div className="jy-post-container">
                                                        <div className="post-title">
                                                            <RichText
                                                                tagName="h4"
                                                                value={post.postTitle}
                                                                onChange={(title) => {
                                                                    const newObject = Object.assign({}, post, {
                                                                        postTitle: title,
                                                                    });
                                                                    let postDetailsArr = [
                                                                        ...staticPostList,
                                                                    ];
                                                                    postDetailsArr[index] = newObject;
                                                                    setAttributes({
                                                                        staticPostList: postDetailsArr,
                                                                    });
                                                                }}
                                                                style={{color:colorStaticTitle,fontSize:fontsStaticTitle}}
                                                                placeholder ={ __('Title') }
                                                            />
                                                        </div>
                                                        <div className="post-image">
                                                            {
                                                                post.postImg !== '' ? <img src={post.postImg} alt='post-featured-img' /> :''
                                                            }

                                                            <MediaUpload
                                                                onSelect={(stepImage) => {
                                                                    const postImage = stepImage.url ? stepImage.url : "";
                                                                    const newObject = Object.assign({}, post, {
                                                                        postImg: postImage
                                                                    });
                                                                    let postDetailsArr = [
                                                                        ...staticPostList,
                                                                    ];
                                                                    postDetailsArr[index] = newObject;
                                                                    setAttributes({
                                                                        staticPostList: postDetailsArr,
                                                                    });
                                                                }}
                                                                type="image"
                                                                value={post.postImg}
                                                                render={({ open }) => (
                                                                    <div className="media-button">
                                                                        <Button
                                                                            onClick={open}
                                                                            className={!post.postImg ? "image-btn button button-large upload-btn" : "image-btn button button-large edit-img-btn"}>
                                                                            {!post.postImg ? __("Add Image") : __("Edit Image", "jay")}
                                                                        </Button>
                                                                        {post.postImg && (
                                                                            <Button
                                                                                className="image-btn button button-large remove-image"
                                                                                onClick={() => {
                                                                                    const newObject = Object.assign({}, post, { postImg: "" });
                                                                                    let postDetailsArr = [
                                                                                        ...staticPostList,
                                                                                    ];
                                                                                    postDetailsArr[index] = newObject;
                                                                                    setAttributes({
                                                                                        staticPostList: postDetailsArr,
                                                                                    });
                                                                                }}
                                                                            >
                                                                                {__("Remove Image", "jay")}
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="content-steps">
                                                            <RichText
                                                                tagName="p"
                                                                value={post.postText}
                                                                style={{color:colorStaticDesc,fontSize:fontsStaticDesc}}
                                                                onChange={(content) => {
                                                                    const newObject = Object.assign({}, post, {
                                                                        postText: content,
                                                                    });
                                                                    let postDetailsArr = [
                                                                        ...staticPostList,
                                                                    ];
                                                                    postDetailsArr[index] = newObject;
                                                                    setAttributes({
                                                                        staticPostList: postDetailsArr,
                                                                    });
                                                                }}
                                                                placeholder ={ __('Description') }
                                                            />
                                                        </div>
                                                        <div className="step-url">
                                                            <RichText
                                                                tagName="a"
                                                                className="view-more"
                                                                value={post.postURL}
                                                                onChange={(content) => {
                                                                    const newObject = Object.assign({}, post, {
                                                                        postURL: content,
                                                                    });
                                                                    let postDetailsArr = [
                                                                        ...staticPostList,
                                                                    ];
                                                                    postDetailsArr[index] = newObject;
                                                                    setAttributes({
                                                                        staticPostList: postDetailsArr,
                                                                    });
                                                                }}
                                                                placeholder ={ __('Add Read More link') }
                                                            />
                                                        </div>
                                                    </div>   
                                                    {
                                                        ( index !== 0 ) && (
                                                            <div className="remove-post">
                                                                <span onClick={ (e) => {
                                                                        let postArray =[
                                                                            ...staticPostList,
                                                                        ];
                                                                    
                                                                        let newitemsArr = postArray.splice(index,1);
                                                                        setAttributes({staticPostList: postArray });
                                                                    }
                                                                }>
                                                                    <Dashicon icon="no-alt"/>
                                                                </span>
                                                            </div>
                                                        )
                                                    }	
                                                                
                                                </div>
                                            </Fragment>
                                        )) }
                                    </div>
                                    <div className="add-step">
                                            <button 
                                                className="button button-large button-primary " 
                                                onClick={ () => setAttributes({
                                                    staticPostList: [
                                                        ...staticPostList,
                                                        {	
                                                            postImg: '',
                                                            postText: '',
                                                            postTitle: '',
                                                            postURL: 'Read More',
                                                        }
                                                    ]
                                                })
                                            }>
                                                { __('Add New Post') }
                                            </button>
                                        </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                <div className="block-settings" style={{marginBottom:'10px'}}>
                                    <label className="post-title">Select PostType</label>
                                    <Select className="post-type select-dp"
                                        isMulti
                                        value={post_type}
                                        options={this.state.listPostTypes}
                                        onChange={this.onPostTypesChange}
                                        defaultValue={post_type}
                                    />
                                    <label className="post-taxonomy">Select Taxonomy</label>
                                    <Select className="post-type select-dp"
                                        isMulti
                                        value={taxonomies}
                                        options={this.state.listTaxonomies}
                                        onChange={this.onTaxonomyChange}
                                    />
                                    <label className="post-term">Select Term</label>
                                    <Select className="post-type select-dp"
                                        isMulti
                                        value={terms}
                                        options={this.state.listTerms}
                                        onChange={this.onTermChange}
                                    />
                                </div>
                                <div className={"jay-gb-dynamic-post-listing "+typeDynamicLayout}><RawHTML> {this.state.loader + contentOfPost} </RawHTML></div> 
                                </Fragment>
                            )
                        ) 
                        
                    }
                </div>
                <style>
                    {
                        `
                        .jay-gb-dynamic-post-listing .blog .container .post-lists h3 a{
                            color:`+dynamicTitleColor+`;
                            font-size:`+fontsDynamicTitle+`;
                        }
                        .jay-gb-dynamic-post-listing .blog .container .post-lists p{
                            color:`+colorDynamicDesc+`;
                            font-size:`+fontsDynamicDesc+`!important;
                        }
                        `
                    }
                </style>
            </div>
        ];
    }
}

export default CustomPostData;