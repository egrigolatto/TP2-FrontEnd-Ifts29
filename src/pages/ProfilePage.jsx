import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import AlbumModal from '../components/AlbumModal.jsx'
import { teamMembers } from '../data/teamMembers.js'

function ProfilePage() {
  const { memberId } = useParams()
  const member = teamMembers.find((teamMember) => teamMember.id === memberId)
  const [highlightedSkill, setHighlightedSkill] = useState(0)
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  useEffect(() => {
    setHighlightedSkill(0)
    setSelectedAlbum(null)
  }, [memberId])

  if (!member) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <header className="page-header">
        <p className="kicker">FICHA DE PERSONAJE</p>
      </header>

      <section className="profile-hero window">
        <img
          className="profile-avatar"
          src={member.avatar}
          alt={`Avatar de ${member.name}`}
          width="160"
          height="160"
        />
        <div className="profile-hero-text">
          <p className="kicker">{member.className}</p>
          <h1>{member.name}</h1>
          <p className="subtitle">
            {member.city} | {member.age ? `${member.age} años` : 'Edad pendiente'}
          </p>
          <a className="back-link" href={member.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </section>

      <div className="profile-grid">
        <section className="window profile-panel">
          <h2 className="window-title">Habilidades</h2>
          <ul className="skills-list">
            {member.skills.map((skill, index) => (
              <li key={skill.name}>
                <button
                  className={`skill-item skill-button${
                    index === highlightedSkill ? ' is-highlighted' : ''
                  }`}
                  type="button"
                  aria-pressed={index === highlightedSkill}
                  onClick={() => setHighlightedSkill(index)}
                >
                  <span className="skill-name">{skill.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="description-text">{member.skills[highlightedSkill]?.description}</p>
        </section>

        <section className="window profile-panel">
          <h2 className="window-title">Películas favoritas</h2>
          <ul className="skills-list">
            {member.movies.map((movie) => (
              <li className="skill-item" key={movie}>
                <p className="skill-name">{movie}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="window profile-panel">
          <h2 className="window-title">Discos favoritos</h2>
          <ul className="skills-list">
            {member.albums.map((album) => (
              <li className="skill-item album-item" key={album.name}>
                <p className="skill-name">{album.name}</p>
                <button
                  className="album-trigger"
                  type="button"
                  onClick={() => setSelectedAlbum(album)}
                  aria-label={`Reproducir ${album.name}`}
                >
                  <img
                    className="album-cover is-clickable"
                    src={`/${album.portada}`}
                    alt={`Portada de ${album.name}`}
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {selectedAlbum && <AlbumModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />}
    </>
  )
}

export default ProfilePage
