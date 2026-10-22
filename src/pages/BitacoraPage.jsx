const entries = [
  {
    title: "01 · Organización inicial",
    text: (
      <>
        Acordamos roles y un estilo visual inspirado en RPG Maker. Definimos
        estructura de carpetas: HTML en la raíz, CSS en <code>css/</code>, JS en{" "}
        <code>js/</code> e imágenes en <code>img/</code>.
      </>
    )
  },
  {
    title: "02 · Decisiones de diseño",
    text: (
      <>
        Elegimos tipografías Google Fonts (Press Start 2P + Rajdhani), paleta de
        colores oscuros con detalles dorados y azules, y avatares 8-bit en lugar
        de fotos personales generados por IA.
      </>
    )
  },
  {
    title: "03 · Dificultades",
    text: (
      <>
        Mantener navegación interna sin depender del botón Atrás del navegador.
        Unificar datos de integrantes en un solo archivo para reutilizarlos en
        portada y perfiles.
      </>
    )
  },
  {
    title: "04 · Cambios relevantes",
    text: (
      <>
        Se centralizó la información de cada integrante en su perfil
        (habilidades, películas y discos). Ciudad, edad y gustos quedaron como
        placeholders para completar.
      </>
    )
  },
  {
    title: "05 · Próximos pasos",
    text: (
      <>
        Cada integrante completa su ficha personal, se ven detalles de diseño y
        se prueban todas las funcionalidades, se enlazan perfiles de GitHub
        pendientes y se publica el sitio en Vercel documentando la URL en el
        README.
      </>
    )
  },
  {
    title: "06 · Cierre y actualización",
    text: (
      <>
        Se completaron los datos personales, las habilidades y los gustos de
        todos los integrantes. También se revisaron los detalles de diseño y
        las funcionalidades. Se actualizó la documentación del README.
      </>
    )
  }
];

function BitacoraPage() {
  return (
    <div>
      <header className="page-header">
        <p className="kicker">REGISTRO DE QUEST</p>
        <h1>Bitácora del Grupo 28</h1>
        <p className="subtitle">
          Decisiones, dificultades y cambios del proceso de desarrollo del TP1.
        </p>
      </header>

      <section className="bitacora-layout" aria-label="Entradas de bitácora">
        {entries.map((entry) => (
          <article className="window bitacora-entry" key={entry.title}>
            <h2 className="window-title">{entry.title}</h2>
            <p>{entry.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default BitacoraPage;
