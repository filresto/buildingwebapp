import { useState } from 'react'
import { uploadMultipleImages, deleteImageFromStorage } from '../../lib/supabase'

/**
 * Componente per upload multiplo di immagini (gallery)
 */
function GalleryUpload({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFilesSelect = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Valida i file
    const invalidFiles = files.filter(f => !f.type.startsWith('image/'))
    if (invalidFiles.length > 0) {
      setError('Alcuni file non sono immagini valide')
      return
    }

    // Controlla dimensione (5MB per file)
    const largeFiles = files.filter(f => f.size > 5 * 1024 * 1024)
    if (largeFiles.length > 0) {
      setError('Alcune immagini sono troppo grandi. Massimo 5MB per immagine')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const newUrls = await uploadMultipleImages(files)
      onChange([...images, ...newUrls])
    } catch (err) {
      console.error('Errore upload:', err)
      setError('Errore durante l\'upload delle immagini')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async (indexToRemove) => {
    const imageToRemove = images[indexToRemove]
    
    try {
      await deleteImageFromStorage(imageToRemove)
    } catch (err) {
      console.error('Errore rimozione immagine:', err)
    }
    
    const newImages = images.filter((_, index) => index !== indexToRemove)
    onChange(newImages)
  }

  return (
    <div className="gallery-upload">
      {images.length > 0 && (
        <div className="gallery-grid">
          {images.map((imageUrl, index) => (
            <div key={index} className="gallery-item">
              <img src={imageUrl} alt={`Gallery ${index + 1}`} />
              <button
                type="button"
                className="gallery-item-remove"
                onClick={() => handleRemove(index)}
                title="Rimuovi immagine"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="upload-button">
        {uploading ? 'Caricamento...' : images.length > 0 ? 'Aggiungi altre immagini' : 'Carica immagini gallery'}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelect}
          disabled={uploading}
        />
      </label>

      {error && (
        <div className="error-message" style={{ marginTop: '0.5rem' }}>
          {error}
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          Upload in corso...
        </div>
      )}

      {images.length === 0 && !uploading && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#7f8c8d' }}>
          Puoi selezionare più immagini contemporaneamente
        </p>
      )}
    </div>
  )
}

export default GalleryUpload

