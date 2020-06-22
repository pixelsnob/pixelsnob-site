
export default props => (
  <>
    <div className="main-container">
      
      <section className="main-content-container">
        <header className="main-header">
          <h1 className="">
            <span className="rainbow-shadowbox">
              <a href="/" className="main-home-link rainbow">pixelsnob.com</a>
            </span>
          </h1>
        </header>
        {/* {% unless page.exclude %}
          <h2>{{ page.title }}</h2>
        {% endunless %}
        <div class="site-content">
          {{ content }}
        </div> */}
        <div className="main-content">{props.children}</div>
      </section>
      <footer>
        
      </footer>
    </div>
    
    {/* <style jsx>{`
      
    `}</style> */}
  </> 
)