import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import FeaturePost from '../../components/feature-post/feature-post';
import PromotionImage from '../../images/ad.png';
import {
  SidebarWrapper,
  SidebarWidget,
  WidgetTitle,
  TagItem,
} from './style';

type SidebarProps = {};

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      
      concerts: allSanityConcert (
        limit: 5
        sort: { fields: [publishedAt], order: DESC }
      ) {
        totalCount
        edges {
          node {       
            id
            tags
            publishedAt
            mainImage {
              asset {
              
                  fluid(maxWidth: 62, maxHeight: 52) {
                    ...GatsbySanityImageFluid
                  }
              }
            }
            title
            _rawExcerpt
            concertDateTime
            slug {
              current
            }
          }
        }
        group(field: tags) {
          totalCount
          fieldValue
        }
    }

    }
  `);

  const Posts = Data.concerts.edges;
  const Tags = Data.concerts.group;

  return (
    <SidebarWrapper>
      <SidebarWidget>
        <a
          href="https://1.envato.market/r1jdv"
          aria-label="Get StoryHub"
          target="_blank"
        >
          <img src={PromotionImage} alt="Get StoryHub" />
        </a>
      </SidebarWidget>

      <SidebarWidget>
        <WidgetTitle>Flere konserter</WidgetTitle>
        {Posts.map(({ node }: any) => {
          const title = node.title || node.slug.current;
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
            <FeaturePost
              key={node.slug.current}
              title={title}
              image={
                node.mainImage == null
                  ? null
                  : node.mainImage.asset.fluid
              }
              url={node.slug.current}
              tags={node.tags}
              placeholderBG={setColor}
            />
          );
        })}
      </SidebarWidget>

      <SidebarWidget>
        <WidgetTitle>Tags</WidgetTitle>
        {Tags.map((tag: any) => (
          <TagItem key={tag.fieldValue}>
            <span>#</span>
            <Link to={`/tags/${_.kebabCase(tag.fieldValue)}/`}>
              {tag.fieldValue} <span>({tag.totalCount})</span>
            </Link>
          </TagItem>
        ))}
      </SidebarWidget>

     
    </SidebarWrapper>
  );
};

export default Sidebar;
