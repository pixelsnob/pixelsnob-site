
import Layout from '../../components/Layout';
import ImageContainer from '../../components/ImageContainer';
import Head from '../../components/Head';

export default () => (
  <Layout>
    <Head>
      <title key="site-title">My Best Friend Maya | Luis A. Echeverria | pixelsnob.com</title>
      <meta name="description" content={`Maya, my wonderful dog, passed away in March 2020 after living a long life of almost 14 years.`}/>
    </Head>

    <h2>My Best Friend Maya</h2>
    <p>Luis A. Echeverria</p>
    <p>June 25, 2020</p>

    <p>Maya, my wonderful dog, passed away in March 2020 after living a long life of almost 14 years.</p>

    <ImageContainer src="maya-memorial-card.jpg" caption=""/>

    <p>To say that I miss her is an understatement.</p>

    
  </Layout>
);