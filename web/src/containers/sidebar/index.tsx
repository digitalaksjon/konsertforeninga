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
  InstagramWrapper,
  InstagramPhoto
} from './style';

type SidebarProps = {};

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
          
      site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
        keywords
        siteUrl
        author {
          name
        }
      }

        posts: allSanityPost (
          limit: 5
          sort: { fields: [publishedAt], order: DESC }
        ) {
          totalCount
          edges {
            node {       
              id
              tags
              publishedAt
              featuredImage {
                asset {
                
                    fluid(maxWidth: 62, maxHeight: 52) {
                      ...GatsbySanityImageFluid
                    }
                }
              }
              title
              _rawExcerpt
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


  const Posts = Data.posts.edges;



  return (
    <SidebarWrapper>
      <SidebarWidget>
        <div className="promoImage">
          <img src={PromotionImage} alt="Bli medlem i Konsertforeninga" />

        </div>
      </SidebarWidget>

      <SidebarWidget>
        <WidgetTitle>Nytt fra foreninga</WidgetTitle>
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

          console.log(node.slug.current)

          return (
            <FeaturePost
              key={node.slug.current}
              title={title}
              image={
                node.featuredImage == null
                  ? null
                  : node.featuredImage.asset.fluid
              }
              url={"/" + node.slug.current}
              tags={node.tags}
              placeholderBG={setColor}
            />
          );
        })}
      </SidebarWidget>


    </SidebarWrapper>
  );
};

export default Sidebar;
