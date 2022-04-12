import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import SocialProfile from '../../components/social-profile/social-profile';
import {
  IoLogoFacebook,
  IoLogoInstagram
} from 'react-icons/io';
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from './style';

import PortableText from '../../components/portableText'

import FeaturePost from '../../components/feature-post/feature-post';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: 'https://www.facebook.com/Konsertforeninga',
    tooltip: 'Facebook',
  },
  {
    icon: <IoLogoInstagram />,
    url: 'https://www.instagram.com/konsertforeninga/',
    tooltip: 'Instagram',
  }
];

interface AboutProps { }

const About: React.FunctionComponent<AboutProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
        keywords
        _rawAboutKf
        _rawInvoiceInfo
        _rawInvoiceInfoEn
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
  const AboutKf = Data.site._rawAboutKf;
  const InvoiceNo = Data.site._rawInvoiceInfo;
  const InvoiceEn = Data.site._rawInvoiceInfoEn;
  console.log(Data.site)


  return (
    <AboutWrapper>
      <AboutPageTitle>

        <h2>Om Konsertforeninga</h2>
        <p>
          {Data.site.description}
          
        </p>
      </AboutPageTitle>

      <AboutImage>
        <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />
      </AboutImage>

      <AboutDetails>


        <Tabs>
          <TabList>
            <Tab>Om Konsertforeninga</Tab>
            <Tab>Siste nytt</Tab>
            <Tab>Fakturainformasjon</Tab>
            <Tab>Invoice (English)</Tab>
          </TabList>

          <TabPanel>
          <br />
          <h2>Om Konsertforeninga</h2>
          {AboutKf && <PortableText blocks={AboutKf} />}

            
          </TabPanel>
          <TabPanel>
            <br />
            <h2>Siste fra foreninga</h2>
            {Posts.map(({ node }: any) => {

              const title = node.title || node.slug.current;
      
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
           
                />
              );
            })}
          </TabPanel>
          <TabPanel>
            <br />
            <h2>Fakturainformasjon</h2>
            
            {InvoiceNo && <PortableText blocks={InvoiceNo} />}
          </TabPanel>
          <TabPanel>
            <br />
            <h2>INVOICE / Message to foreign artists</h2>
            {InvoiceEn && <PortableText blocks={InvoiceEn} />}

          </TabPanel>
        </Tabs>


        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>

        <hr />


      </AboutDetails>
    </AboutWrapper>
  );
};

export default About;
