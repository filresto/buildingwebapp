import './Contact.css'

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert('Grazie per averci contattato! Ti risponderemo presto.')
  }

  return (
    <div className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contact</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h3>Informazioni</h3>
              <p><strong>Indirizzo:</strong><br />Via Example 123<br />00100 Roma, Italia</p>
              <p><strong>Telefono:</strong><br />+39 06 1234567</p>
              <p><strong>Email:</strong><br />info@studioingegneria.it</p>
              <p><strong>Orari:</strong><br />Lun-Ven: 9:00 - 18:00</p>
            </div>

            
          </div>

          <div className="contact-form-container">
            <h3>Inviaci un messaggio</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Nome *" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email *" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="Telefono" 
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  placeholder="Messaggio *" 
                  rows="6" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Invia Messaggio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

