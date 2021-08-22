import React, { useState } from 'react';
import { graphql, Link, withPrefix } from 'gatsby';
import _ from 'lodash';
import urljoin from 'url-join';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/post-card/post-card';
import PostDetails from '../components/post-details/post-details';
import Sidebar from '../containers/sidebar';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
} from 'react-share';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoPinterest,
  IoLogoReddit,
} from 'react-icons/io';
import {
  BlogPostDetailsWrapper,
  RelatedPostWrapper,
  RelatedPostItems,
  RelatedPostTitle,
  RelatedPostItem,
  BlogPostFooter,
  PostShare,
  PostTags,
  BlogDetailsContent,
} from './templates.style';


import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const BlogPostTemplate = (props: any) => {

  const post = props.data.sanityPost;
  const { edges } = props.data.posts;
  const title = post.title;


  const slug = post.slug.current;
  const siteUrl = props.data.site.siteUrl;
  const shareUrl = urljoin(siteUrl, slug);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Layout>
      <SEO
        title={title}
        description={post._rawExcerpt}
        metaImage={post.featuredImage}
      />
      <BlogPostDetailsWrapper>
        <BlogDetailsContent>
          <PostDetails
            title={post.title}
            date="NaN"


            preview={
              post.featuredImage == null
                ? null
                : post.featuredImage.asset.fluid
            }
            description={post._rawBody}
          />

          {post.filePDF &&
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <div
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '750px',
                }}
              >
                <Viewer fileUrl={post.filePDF.asset.url} plugins={[defaultLayoutPluginInstance]} />
              </div>
            </Worker>
          }

          <BlogPostFooter>
            {post.tags == null ? null : (
              <PostTags className="post_tags">
                {post.tags.map((tag: string, index: number) => (
                  <Link key={index} to={`/tags/${_.kebabCase(tag)}/`}>
                    {`#${tag}`}
                  </Link>
                ))}
              </PostTags>
            )}
            <PostShare>
              <span>Del dette:</span>
              <FacebookShareButton url={shareUrl} quote={post._rawExcerpt}>
                <IoLogoFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <IoLogoTwitter />
              </TwitterShareButton>
              <PinterestShareButton
                url={shareUrl}
                media={urljoin(siteUrl, post.featuredImage.asset.url)}
              >
                <IoLogoPinterest />
              </PinterestShareButton>
              <RedditShareButton
                url={shareUrl}
                title={`${post.title}`}
              >
                <IoLogoReddit />
              </RedditShareButton>
            </PostShare>
          </BlogPostFooter>

        </BlogDetailsContent>
        <Sidebar />
      </BlogPostDetailsWrapper>

      {
        edges.length !== 0 && (
          <RelatedPostWrapper>
            <RelatedPostTitle>Relaterte Nyheter</RelatedPostTitle>
            <RelatedPostItems>
              {edges.map(({ node }: any) => {
                // Random Placeholder Color
                const placeholderColors = [
                  '#55efc4',
                  '#81ecec',
                  '#74b9ff',
                  '#a29bfe',
                  '#ffeaa7',
                  '#fab1a0',
                  '#e17055',
                  '#0984e3',
                  '#badc58',
                  '#c7ecee',
                ];
                const setColor =
                  placeholderColors[
                  Math.floor(Math.random() * placeholderColors.length)
                  ];
                return (
                  <RelatedPostItem key={node.slug.current}>
                    <PostCard
                      title={node.title || node.slug.current}
                      url={node.slug.current}
                      date={node.publishedAt}
                      image={
                        node.mainImage == null
                          ? null
                          : node.mainImage.asset.fluid
                      }
                      tags={node.tags}
                      placeholderBG={setColor}
                    />
                  </RelatedPostItem>
                );
              })}
            </RelatedPostItems>
          </RelatedPostWrapper>
        )
      }
    </Layout >
  );
};

export default BlogPostTemplate;



export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $tag: [String!]) {
    
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      siteUrl
      author {
        name
      }
    }

      
    sanityPost(slug: { current: { eq: $slug } }){
        id
        tags
        publishedAt
        featuredImage {
          asset {
          
              fluid(maxWidth: 570, maxHeight: 370) {
                ...GatsbySanityImageFluid
              }
              url
          }
        }
        title
        filePDF {
          asset {
            url
          }
        }
        _rawExcerpt
        _rawBody
        slug {
          current
        }
        
    }

    
    posts: allSanityPost(
      limit: 3
      sort: { fields: publishedAt, order: ASC }
      filter: {
        tags: { in: $tag } 
        slug: { current: { ne: $slug } }
      }
     ) {
      totalCount
      edges {
        node {       
          id
          tags
          publishedAt
          filePDF {
            asset {
              url
            }
          }
          featuredImage {
            asset {
            
                fluid(maxWidth: 570, maxHeight: 370) {
                  ...GatsbySanityImageFluid
                }
            }
          }
          title
          _rawExcerpt
          _rawBody
          slug {
            current
          }
        }
      }
    }
  }
`;
