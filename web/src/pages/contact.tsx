import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Contact from '../containers/contact';

type ContactPageProps = {};

const ContactPage: React.FunctionComponent<ContactPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="Kontakt oss"
        description="Ta kontakt med Konsertforeninga her"
      />

      <Contact />
    </Layout>
  );
};

export default ContactPage;
