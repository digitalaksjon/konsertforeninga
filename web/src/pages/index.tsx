import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PersonalBlog from '../containers/home';
import SEO from '../components/seo';
import ogImage from '../images/ogimage.jpg';

const HomePage = (props: any) => {
  const { data } = props;

  return (
    <Layout>
      <SEO
        title="Konsertforeninga"
        metaImage={ogImage}
        description="Konsertforeninga er en helårsarrangør som står for rundt 70 konserter med ny og levende musikk hvert år."
      />

      <PersonalBlog />
    </Layout>
  );
};

export default HomePage;






