import { useMemo, useState } from 'react'
import frontendResources from '../data/frontendResources.json'

function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = useMemo(
    () => [...new Set(frontendResources.map((resource) => resource.category))].sort(),
    [],
  )

  const filteredResources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es')

    return frontendResources.filter((resource) => {
      const matchesSearch = [resource.name, resource.category, resource.description].some((value) =>
        value.toLocaleLowerCase('es').includes(normalizedSearch),
      )
      const matchesCategory = !selectedCategory || resource.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
  }

  return (
    <div>
      <header className="page-header">
        <p className="kicker">INVENTARIO DEL PARTY</p>
        <h1>Recursos de desarrollo web</h1>
        <p className="subtitle">
          Un catálogo local de herramientas y referencias útiles para crear, probar y publicar
          proyectos web. Buscá por nombre o descripción, o filtrá por categoría.
        </p>
      </header>

      <section className="window resources-panel" aria-label="Catálogo de recursos">
        <div className="resource-controls">
          <label className="resource-field">
            <span>Buscar recursos</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ej.: React, accesibilidad..."
            />
          </label>
          <label className="resource-field">
            <span>Filtrar por categoría</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <button
            className="resource-reset"
            type="button"
            onClick={resetFilters}
            disabled={!searchTerm && !selectedCategory}
          >
            Restablecer
          </button>
        </div>

        <p className="resource-count" aria-live="polite">
          {filteredResources.length} de {frontendResources.length} recursos
        </p>

        {filteredResources.length > 0 ? (
          <ul className="resource-grid">
            {filteredResources.map((resource) => (
              <li key={resource.id}>
                <article className="resource-card">
                  <p className="resource-category">{resource.category}</p>
                  <h2>{resource.name}</h2>
                  <p>{resource.description}</p>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    Visitar recurso
                  </a>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="resource-empty" role="status">
            <p>No se encontraron recursos con esos criterios.</p>
            <button className="resource-reset" type="button" onClick={resetFilters}>
              Mostrar todos los recursos
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default ResourcesPage
