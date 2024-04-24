const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, RawHTML, Component } = wp.element;
const { RichText } = wp.editor;

import React from 'react';
import Select from 'react-select';
import postList from './edit';

registerBlockType('md-prime/jay-gb-postlisting', {
    title: __('Jay Hybrid Post Listings'),
    icon: 'list-view',
    category: 'jay',
    attributes: {
        blockType:{
            type:'string',
            default: ''
        },
        post_list: {
            type: 'array',
			default: []
        },
        post_type: {
            type: 'array',
			default: [{label: 'Post', value: 'post'}]
        },
        taxonomy: {
            type: 'array',
            default: []
        },
        taxonomies: {
			type: 'array',
            default: []
        },
        term_lists: {
			type: 'array',
            default: []
        },
        terms: {
			type: 'array',
            default: []
        },
        contentOfPost:{
            type: 'string',
            default: ''
        },
        colorStaticTitle:{
            type:'string'
        },
        fontsStaticTitle:{
            type:'string'
        },
        colorStaticDesc:{
            type:'string'
        },
        fontsStaticDesc:{
            type:'string'
        },
        layoutType:{
            type:'string',
            default: 'post-list'
        },
        dynamicTitleColor:{
            type:'string'
        },
        fontsDynamicTitle:{
            type:'string'
        },
        colorDynamicDesc:{
            type:'string'
        },
        fontsDynamicDesc:{
            type:'string'
        },
        typeDynamicLayout:{
            type:'string',
            default: 'post-list'
        },
        staticPostList:{
            type: 'array',
            default: [
                {
                    postImg: '',
                    postText: '',
                    postTitle: '',
                    postURL: '',
                }
            ]
        }

    },
    edit: postList,
    save(props) {
        const {attributes: {post_type, layoutType, dynamicTitleColor, fontsDynamicTitle, colorDynamicDesc, fontsDynamicDesc, typeDynamicLayout, colorStaticTitle, fontsStaticTitle, colorStaticDesc, fontsStaticDesc, contentOfPost, blockType, staticPostList, taxonomies, term_lists}, setAttributes} = props;
        return (
            <div className="jay-gb-post-listing-wrap">
                {(    
                    blockType == 'static' ? (
                        <Fragment>
                            <div className={"jay-gb-post-static-listing "+layoutType}>
                                {staticPostList.map(( post, index) => (
                                    <Fragment key={ index }>
                                    <div id={`step-`+(index+1)} className="step">
                                        <div className="jy-post-container">
                                            <div className="image-with-title">
                                                <RichText.Content 
                                                    tagName="h2"
                                                    value={post.postTitle}
                                                    className="post-title"
                                                    style={{color:colorStaticTitle, fontSize: fontsStaticTitle}}
                                                />
                                            </div>
                                            <div className='post-image'>
                                                <img src={post.postImg} alt='post-featured-img' />
                                            </div>
                                            <div className="step-description">
                                                <RichText.Content 
                                                    tagName="p"
                                                    value={post.postText}
                                                    style={{color:colorStaticDesc,fontSize:fontsStaticDesc}}
                                                />
                                            </div>
                                            <div className='view-more'><RawHTML>{post.postURL}</RawHTML></div>
                                        </div>
                                    </div>
                                </Fragment>
                                )) }
                            </div>
                        </Fragment>
                    ) 
                    : 
                    (
                        <div className={"jay-gb-dynamic-post-listing "+typeDynamicLayout}><RawHTML>{contentOfPost}</RawHTML></div>
                    )) 
                } 
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
        );
    },
});