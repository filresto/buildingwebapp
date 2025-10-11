import './About.css'

function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h2 className="about-title">About</h2>
        
        <div className="about-content">
          <section className="about-section">
            <h3>Chi Siamo</h3>
            <p>
              Il nostro studio di ingegneria edile nasce dalla passione per l'architettura 
              e l'ingegneria strutturale. Con oltre 20 anni di esperienza, ci dedichiamo 
              alla realizzazione di progetti innovativi e sostenibili.
            </p>
          </section>

          <section className="about-section">
            <h3>Cosa Facciamo</h3>
            <p>
              Offriamo consulenza completa per progetti residenziali, commerciali e industriali, 
              dalla progettazione alla direzione lavori. Il nostro approccio integra tecnologia 
              avanzata e attenzione ai dettagli.
            </p>
          </section>

          <section className="about-section">
            <h3>I Nostri Servizi</h3>
            <ul className="services-list">
              <li>Progettazione strutturale</li>
              <li>Direzione lavori</li>
              <li>Consulenza tecnica</li>
              <li>Certificazioni energetiche</li>
              <li>Ristrutturazioni</li>
              <li>Valutazioni di vulnerabilità sismica</li>
              <li>Pratiche edilizie</li>
              <li>Sicurezza cantieri</li>
            </ul>
          </section>

          <section className="about-section">
            <h3>Dove Siamo</h3>
            <div className="location-info">
              <p>Via Example 123, 00100 Roma</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.5633378875767!2d12.496365615520107!3d41.90277997922144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseo!5e0!3m2!1sit!2sit!4v1628516827644!5m2!1sit!2sit"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About

