import Layout from '../components/Layout';
import React from 'react';

// list accomplishments

export default (props) => {
  return (
    <Layout>
      <h2>Recent Articles</h2>
      {/** add short intros  */}
      <ul>
        <li>
          <a href="/articles/my-best-friend-maya">My Best Friend Maya</a>
        </li>
        <li>
          <a href="/articles/when-one-soccer-team-owns-a-public-park">When One Soccer Team Owns a Public Park: A look at what’s been going on at Osornio Park over the last 10 years</a>
        </li>
      </ul>

      <h2>Code Samples</h2>
      <p>
        See my <a href="https://github.com/pixelsnob?tab=repositories" target="_blank" title="Link to pixelsnob on github">GitHub repositories</a> for code samples. Work samples available upon request.
        </p>
    </Layout>
  );

}

