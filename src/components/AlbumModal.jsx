import { useEffect } from 'react'

function AlbumModal({ album, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  return (
    <div
      className="album-modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        className="album-modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={`Reproductor de ${album.name}`}
      >
        <button
          className="album-modal-close"
          type="button"
          aria-label="Cerrar reproductor"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe
          src={album.youtubeUrl}
          title={`Reproductor de ${album.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default AlbumModal
