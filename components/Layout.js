// import Link from 'next/link';
// import Footer from './Footer';
// import Nav from './Nav';
// import BackToTopLink from './BackToTopLink';


export default props => (
  <>
    <div className="site-container">
      <header className="site-header">
        <h1><a href="">pixelsnob.com</a></h1>
      </header>
      <section className="site-content-container">
        {/* {% unless page.exclude %}
          <h2>{{ page.title }}</h2>
        {% endunless %}
        <div class="site-content">
          {{ content }}
        </div> */}
      </section>
      <footer>
        
      </footer>
    </div>
    {props.children}
    {/* <style jsx>{`
      
    `}</style> */}
  </> 
)