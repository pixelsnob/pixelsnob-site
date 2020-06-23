
export default props => (

  <div className="main-container">

    <section className="main-content-container">
      <header className="main-header">
        <h1 className="">
          <span className="rainbow-shadowbox">
            <a href="/" className="main-home-link rainbow">pixelsnob.com</a>
          </span>
        </h1>
      </header>

      <div className="main-content">{props.children}</div>
    </section>
    <footer>

    </footer>
  </div>

)