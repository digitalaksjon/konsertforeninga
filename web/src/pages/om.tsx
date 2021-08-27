import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import About from '../containers/about';

type AboutPageProps = {};

const AboutPage: React.FunctionComponent<AboutPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="Om Konsertforeninga"
        description="Konsertforeninga er en helårsarrangør som står for rundt 100 konserter med ny og levende musikk hvert år."
      />

      <About />
    </Layout>
  );
};

export default AboutPage;
