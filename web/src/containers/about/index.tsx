import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import SocialProfile from '../../components/social-profile/social-profile';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from 'react-icons/io';
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from './style';

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: 'https://www.facebook.com/redqinc/',
    tooltip: 'Facebook',
  },
  {
    icon: <IoLogoInstagram />,
    url: 'https://www.instagram.com/redqinc/',
    tooltip: 'Instagram',
  },
  {
    icon: <IoLogoTwitter />,
    url: 'https://twitter.com/redqinc',
    tooltip: 'Twitter',
  },
  {
    icon: <IoLogoLinkedin />,
    url: 'https://www.linkedin.com/company/redqinc/',
    tooltip: 'Linked In',
  },
];

interface AboutProps {}

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
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `);

  return (
    <AboutWrapper>
      <AboutPageTitle>
        
        <h2>Om Konsertforeninga</h2>
        <p>

        Konsertforeninga er en helårsarrangør som står for rundt 70 konserter med ny og levende musikk hvert år.
        </p>
      </AboutPageTitle>

      <AboutImage>
        <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />
      </AboutImage>

      <AboutDetails>


        <p>
        Konsertforeninga har gjennom over 23 års virke opparbeida seg en enestående erfaring som kulturformidler i Oslo by. Fram til inngangen av 2007 holdt vi hus på en adresse ved Akerselva, men har siden den gang levd en nomadisk tilværelse som konsertarrangør ved flere ulike scener i hovedstaden. Vårt credo om å bringe til torgs banebrytende og bra musikk i alle sjangre – og stadig med et skråblikk til jazzen – holdes fortsatt høyt i hevd. Og inntil vi får etablert oss med fast bopæl inviterer vi godtfolk til å danse med oss rundt i Oslo. Konsertforeninga står for konsertseriene Blow Out!, FemmeBrutal!, Blårollinger, Death Jazz, Gutvik Ukentlig og Ladyfest i tillegg til flere andre konserter.
        </p>
        <h2>Kontakt oss</h2>
        <p>
          kontakt(at)konsertforeninga.no<br />
          eller<br />
          Konsertforeninga<br />
          C/O Østnorsk jazzsenter<br />
          Dronningens Gate 16<br />
          0152 Oslo<br />
        </p>
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles> 

        <hr />

        <h2>Fakturainformasjon</h2>
        <p>
          Vi foretrekker faktura i EHF-format. Registrer oss som kunde med org.nr 879 602 432. Alternativt legg inn konsertforeninga@ebilag.com
          <br /><br />
          …navn på konsertserie eller festival…<br />
          Konsertforeninga<br />
          Dronningens gate 16<br />
          0152 Oslo<br />
          Org nr 879 602 432<br />
          <br />          
        <h2>INVOICE / Message to foreign artists</h2>
      
          Please send your invoice to (specifying the appropriate concert series) :<br />
          Blow Out / Blow Out festival / Femme Brutal / Femme Brutal festival / Gutvik ukentlig / etc.<br />
          Konsertforeninga<br />
          Dronningens gate 16<br />
          N-0152 Oslo<br />
          Norway<br />
          konsertforeninga@ebilag.com (we prefer invoices in PDF)<br />
          <br />
          Along with your invoice, please make sure to email us:<br />
          IBAN and SWIFT<br />
          as well as:<br />
          Your full name<br />
          Date of birth<br />
          Residential address<br />
          Nationality<br />
        </p>
      </AboutDetails>
    </AboutWrapper>
  );
};

export default About;
