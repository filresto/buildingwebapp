import { useState } from 'react'

/**
 * Componente per gestire liste dinamiche (es. specs)
 */
function DynamicList({ items = [], onChange, placeholder = "Inserisci un elemento", label = "Elementi" }) {
  const [newItem, setNewItem] = useState('')

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const handleRemove = (indexToRemove) => {
    onChange(items.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="dynamic-list">
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
        {label}
      </label>

      {items.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          {items.map((item, index) => (
            <div key={index} className="list-item">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...items]
                  newItems[index] = e.target.value
                  onChange(newItems)
                }}
                placeholder={placeholder}
              />
              <button
                type="button"
                className="list-item-remove"
                onClick={() => handleRemove(index)}
                title="Rimuovi"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="list-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
        />
        <button
          type="button"
          className="list-add-btn"
          onClick={handleAdd}
          disabled={!newItem.trim()}
        >
          + Aggiungi
        </button>
      </div>
    </div>
  )
}

export default DynamicList

