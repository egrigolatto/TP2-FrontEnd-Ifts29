import { Link } from 'react-router-dom'
import { teamMembers } from '../data/teamMembers.js'

function HomePage() {
  return (
    <div>
      <header className="page-header">
        <p className="kicker">RPG MAKER STYLE</p>
        <h1>Grupo 28 - Menú de Equipo</h1>
        <p className="subtitle">
          Presentamos al equipo de Desarrollo Front-End: un party de cinco integrantes listos para
          construir interfaces claras, responsivas y con estilo de juego. Elegí un personaje para
          conocer su perfil.
        </p>
      </header>

      <section className="party-section" aria-label="Integrantes del equipo">
        <div className="window panel-main">
          <div className="party-list">
            {teamMembers.map((member) => (
              <Link
                className="party-row party-link selectable"
                to={`/perfil/${member.id}`}
                key={member.id}
              >
                <div className="party-avatar" aria-hidden="true">
                  <img src={member.avatar} alt="" className="avatar-img" width="56" height="56" />
                </div>
                <div>
                  <p className="party-name">{member.name}</p>
                  <p className="party-meta">
                    {member.city} | {member.age} años
                  </p>
                </div>
                <p className="party-class">{member.className}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
