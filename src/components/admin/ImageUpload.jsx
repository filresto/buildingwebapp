import { useState } from 'react'
import { uploadImage, deleteImageFromStorage } from '../../lib/supabase'

/**
 * Componente per upload singola immagine
 */
function ImageUpload({ value, onChange, label = "Immagine" }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Valida il file
    if (!file.type.startsWith('image/')) {
      setError('Per favore seleziona un file immagine')
      return
    }

    // Limite dimensione: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'immagine è troppo grande. Massimo 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const imageUrl = await uploadImage(file)
      onChange(imageUrl)
    } catch (err) {
      console.error('Errore upload:', err)
      setError('Errore durante l\'upload dell\'immagine')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (value) {
      try {
        await deleteImageFromStorage(value)
      } catch (err) {
        console.error('Errore rimozione immagine:', err)
      }
      onChange(null)
    }
  }

  return (
    <div className="image-upload">
      {value ? (
        <div className="image-preview">
          <img src={value} alt={label} />
          <button
            type="button"
            className="image-remove-btn"
            onClick={handleRemove}
            title="Rimuovi immagine"
          >
            ×
          </button>
        </div>
      ) : (
        <label className="upload-button">
          {uploading ? 'Caricamento...' : `Carica ${label}`}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>
      )}

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
    </div>
  )
}

export default ImageUpload

