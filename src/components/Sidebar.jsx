import { NavLink } from 'react-router-dom'
import { teamMembers } from '../data/teamMembers.js'

function Sidebar({ isOpen, onNavigate }) {
  const linkClassName = ({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}`

  return (
    <aside
      className={`team-sidebar${isOpen ? ' is-open' : ''}`}
      id="team-sidebar"
      aria-label="Navegación del equipo"
    >
      <div className="sidebar-identity">
        <p className="kicker">RPG MAKER STYLE</p>
        <p className="sidebar-title">Grupo 28</p>
        <p className="sidebar-caption">Menú de equipo</p>
      </div>

      <nav className="sidebar-navigation" aria-label="Secciones">
        <NavLink to="/" end className={linkClassName} onClick={onNavigate}>
          Inicio
        </NavLink>
        <NavLink to="/bitacora" className={linkClassName} onClick={onNavigate}>
          Bitácora
        </NavLink>
        <NavLink to="/arbol" className={linkClassName} onClick={onNavigate}>
          Árbol de renderizado
        </NavLink>
        <NavLink to="/recursos" className={linkClassName} onClick={onNavigate}>
          Recursos
        </NavLink>
        <NavLink to="/api" className={linkClassName} onClick={onNavigate}>
          API de Star Wars
        </NavLink>
      </nav>

      <div className="sidebar-members">
        <p className="sidebar-section-title">Integrantes</p>
        <nav aria-label="Perfiles de integrantes">
          {teamMembers.map((member) => (
            <NavLink
              key={member.id}
              to={`/perfil/${member.id}`}
              className={linkClassName}
              onClick={onNavigate}
            >
              <img src={member.avatar} alt="" width="32" height="32" />
              <span>{member.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
