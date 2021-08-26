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
import { date } from 'yup';

const ConcertTemplate = (props: any) => {

  const post = props.data.sanityConcert;
  const { edges } = props.data.concerts;
  const title = post.title;


  const slug = post.slug.current;
  const siteUrl = props.data.site.siteUrl;
  const shareUrl = urljoin(siteUrl, slug);
  const date = post.concertDateTime;

  Date.prototype.getMonthName = function () {
    var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[this.getMonth()];
  }

  const dateObject = new Date(date);

  var concertDate = dateObject.getDate();
  var concertMonth = dateObject.getMonthName(dateObject.getMonth());


  var newDate
  if (date != "NaN") {
    newDate = concertDate + `<br><span>` + concertMonth + `</span>`
  } else {
    newDate = date
  }


  Date.prototype.getFullMinutes = function () {
    if (this.getMinutes() < 10) {
      return '0' + this.getMinutes();
    }
    return this.getMinutes();
  };

  Date.prototype.getFullDate = function (dateObject) {

    const newDate = new Date(dateObject)
    return newDate.getDate() + ". " + newDate.getMonthName(newDate.getMonth());
  };


  const concertTime = new Date(post.concertDateTime);
  var readableTime = "";

  if (concertTime.getFullYear() < 2021) {
    readableTime = concertTime.getFullDate(date) + " - " + concertTime.getHours() + "." + concertTime.getFullMinutes() + " <span>// " + concertTime.getFullYear() + " </span>";

  } else {
    readableTime = concertTime.getFullDate(date) + " - " + concertTime.getHours() + "." + concertTime.getFullMinutes();
  }





  return (
    <Layout>
      <SEO
        title={title}
        description={toPlainText(post._rawExcerpt)}
        metaImage={post.mainImage.asset.url}
      />
      <BlogPostDetailsWrapper>
        <BlogDetailsContent>
          <PostDetails
            title={post.title}
            date={post.concertDateTime}
            venue={post.venue}
            tickets={post.ticketURL}
            price={post.price}
            series={post.series[0].title ? post.series[0].title : ""}
            concertDateTime={readableTime}
            preview={
              post.mainImage == null
                ? null
                : post.mainImage.asset.fluid
            }
            description={post._rawBody}
          />

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
              <span>Del denne konserten:</span>
              <FacebookShareButton url={shareUrl} quote={post._rawExcerpt}>
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
                    date={node.concertDateTime}
                    image={
                      node.mainImage == null
                        ? null
                        : node.mainImage.asset.fluid
                    }
                    tags={node.tags}
                    series={node.series[0].title}
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
  query ConcertBySlug($slug: String!, $tag: [String!]) {
    
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      siteUrl
      author {
        name
      }
    }

      
    sanityConcert(slug: { current: { eq: $slug } }){
        id
        tags
        publishedAt
        mainImage {
          asset {
          
              fluid(maxWidth: 570, maxHeight: 370) {
                ...GatsbySanityImageFluid
              }
              url
          }
        }
        title
        _rawExcerpt
        _rawBody
        venue
        price
        concertDateTime
        series {
          title
        }
        slug {
          current
        }
        ticketURL
    }

    
    concerts: allSanityConcert (
      limit: 3
      sort: { fields: concertDateTime, order: ASC }
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
          mainImage {
            asset {
            
                fluid(maxWidth: 570, maxHeight: 370) {
                  ...GatsbySanityImageFluid
                }
            }
          }
          title
          _rawExcerpt
          series {
            title
          }
          concertDateTime
          slug {
            current
          }
        }
      }
    }
  }
`;



function toPlainText(blocks = []) {
  return blocks
    // loop through each block
    .map(block => {
      // if it's not a text block with children, 
      // return nothing
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      // loop through the children spans, and join the
      // text strings
      return block.children.map(child => child.text).join('')
    })
    // join the paragraphs leaving split by two linebreaks
    .join('\n\n')
}