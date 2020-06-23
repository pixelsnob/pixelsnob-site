
import NextHead from 'next/head';
import { withRouter } from 'next/router';

const Head = (props) => (
  <NextHead>
    <title key="site-title">Luis A. Echeverria | pixelsnob.com</title>
    {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
    {/* <link href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan%7CMontserrat:400,700&display=swap" rel="stylesheet"></link> */}
    {/* <link rel="canonical" href={`https://friendsofosorniopark.org${props.router.pathname}`} /> */}


    {props.children}
  </NextHead>
);

export default withRouter(Head);
