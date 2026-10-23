import { useEffect, useState } from 'react'

function ApiPage() {
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [request, setRequest] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const loadFilms = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch('https://swapi.dev/api/films/', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`La API respondió con el estado ${response.status}.`)
        }

        const data = await response.json()

        if (!Array.isArray(data.results)) {
          throw new Error('La respuesta de SWAPI no tiene el formato esperado.')
        }

        setFilms(data.results)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Ocurrió un error inesperado al consultar SWAPI.',
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadFilms()

    return () => controller.abort()
  }, [request])

  return (
    <div>
      <header className="page-header">
        <p className="kicker">API PÚBLICA</p>
        <h1>Películas de Star Wars</h1>
        <p className="subtitle">
          SWAPI ofrece información pública del universo de Star Wars. Consultamos sus películas para
          mostrar el episodio, la dirección y el año de estreno.
        </p>
      </header>

      <section className="window resources-panel" aria-label="Películas obtenidas desde SWAPI">
        {isLoading ? (
          <p className="resource-count" role="status">
            Cargando películas desde SWAPI...
          </p>
        ) : error ? (
          <div className="resource-empty" role="alert">
            <p>No se pudieron cargar las películas. {error}</p>
            <button
              className="resource-reset"
              type="button"
              onClick={() => setRequest((currentRequest) => currentRequest + 1)}
            >
              Reintentar
            </button>
          </div>
        ) : (
          <ul className="resource-grid">
            {films.map((film) => (
              <li key={film.episode_id}>
                <article className="resource-card">
                  <p className="resource-category">Episodio {film.episode_id}</p>
                  <h2>{film.title}</h2>
                  <p>Dirección: {film.director}</p>
                  <p>Estreno: {new Date(film.release_date).getFullYear()}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default ApiPage
