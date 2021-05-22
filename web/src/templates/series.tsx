import React from 'react';
import { graphql, Link } from 'gatsby';
import _ from 'lodash';
import urljoin from 'url-join';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostCard from '../components/post-card/post-card';
import PostDetails from '../components/post-details/post-details';
import Sidebar from '../containers/sidebar';



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

const ConcertTemplate = (props: any) => {
  
  const post = props.data.sanitySeries;
  const { edges } = props.data.concerts;
  const title = post.title;


  const slug = post.slug.current;
  const siteUrl = props.data.site.siteUrl;
  const shareUrl = urljoin(siteUrl, slug);


  

  return (
    <Layout>
      <SEO
        title={title}
        description="En serie fra Konsertforeninga"
        metaImage={post.mainImage}
      />
      <BlogPostDetailsWrapper>
        <BlogDetailsContent>
          <PostDetails
            title={post.title}
            preview={
              post.mainImage == null
                ? null
                : post.mainImage.asset.fluid
            }
            description={post._rawDescription}
            date="NaN"
          />

          <BlogPostFooter>
          
            <PostShare>
              <span>Share This:</span>
              <FacebookShareButton url={shareUrl} quote={post.title}>
                <IoLogoFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <IoLogoTwitter />
              </TwitterShareButton>
              <PinterestShareButton
                url={shareUrl}
                media={urljoin(siteUrl, post.mainImage.asset.url)}
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

      {edges.length !== 0 && (
        <RelatedPostWrapper>
          <RelatedPostTitle>Relaterte Konserter</RelatedPostTitle>
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
                    date={post.concertDateTime}
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
      )}
    </Layout>
  );
};

export default ConcertTemplate;



export const pageQuery = graphql`
  query SeriesBySlug($slug: String!) {
    
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      siteUrl
      author {
        name
      }
    }

      
    sanitySeries(slug: { current: { eq: $slug } }){
        id
        mainImage {
          asset {
          
              fluid(maxWidth: 570, maxHeight: 370) {
                ...GatsbySanityImageFluid
              }
              url
          }
        }
        title
        _rawDescription
        slug {
          current
        }
    }

    
    concerts: allSanityConcert(filter: {series: {elemMatch: {slug: {current: {eq: $slug}}}}}) {
      totalCount
      edges {
        node {       
          id
          tags
          publishedAt
          mainImage {
            asset {
            
                fluid(maxWidth: 570, maxHeight: 370) {
                  ...GatsbySanityImageFluid
                }
            }
          }
          title
          _rawExcerpt
          concertDateTime
          series {
            slug {
              current
            }
          }
          slug {
            current
          }
        }
      }
    }
  }
`;
