import { useState } from 'react'

const componentTree = {
  id: 'root',
  label: 'ReactDOM.createRoot(#root)',
  children: [
    {
      id: 'strict-mode',
      label: 'React.StrictMode',
      children: [
        {
          id: 'browser-router',
          label: 'BrowserRouter',
          children: [
            {
              id: 'app',
              label: 'App',
              children: [
                {
                  id: 'routes',
                  label: 'Routes',
                  children: [
                    {
                      id: 'layout-route',
                      label: 'Route: AppLayout',
                      children: [
                        {
                          id: 'app-layout',
                          label: 'AppLayout',
                          children: [
                            {
                              id: 'mobile-menu-toggle',
                              label: 'button.mobile-menu-toggle (visible en móvil)',
                            },
                            {
                              id: 'sidebar-backdrop',
                              label: 'button.sidebar-backdrop (cuando el menú está abierto)',
                            },
                            { id: 'sidebar', label: 'Sidebar' },
                            {
                              id: 'app-main',
                              label: 'main.app-main',
                              children: [
                                {
                                  id: 'page-shell',
                                  label: 'div.page-shell',
                                  children: [
                                    {
                                      id: 'outlet',
                                      label: 'Outlet',
                                      children: [
                                        { id: 'home-page', label: 'HomePage (/)' },
                                        {
                                          id: 'bitacora-page',
                                          label: 'BitacoraPage (/bitacora)',
                                        },
                                        {
                                          id: 'component-tree-page',
                                          label: 'ComponentTreePage (/arbol)',
                                        },
                                        {
                                          id: 'resources-page',
                                          label: 'ResourcesPage (/recursos)',
                                        },
                                        { id: 'api-page', label: 'ApiPage (/api)' },
                                        {
                                          id: 'profile-page',
                                          label: 'ProfilePage (/perfil/:memberId)',
                                          children: [
                                            {
                                              id: 'album-modal',
                                              label: 'AlbumModal (cuando se selecciona un disco)',
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'fallback-route',
                      label: 'Route * → Navigate (/) (ruta no encontrada)',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

function collectExpandableIds(node) {
  if (!node.children) {
    return []
  }

  return [node.id, ...node.children.flatMap(collectExpandableIds)]
}

function TreeNode({ node, expandedIds, onToggle }) {
  const hasChildren = Boolean(node.children?.length)
  const isExpanded = expandedIds.has(node.id)

  return (
    <li
      className="component-tree-node"
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
    >
      {hasChildren ? (
        <>
          <button
            className="component-tree-toggle"
            type="button"
            aria-expanded={isExpanded}
            aria-controls={`tree-group-${node.id}`}
            onClick={() => onToggle(node.id)}
          >
            <span className="component-tree-indicator" aria-hidden="true">
              {isExpanded ? '−' : '+'}
            </span>
            <code>{node.label}</code>
          </button>
          <ul
            className="component-tree-children"
            id={`tree-group-${node.id}`}
            role="group"
            hidden={!isExpanded}
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} expandedIds={expandedIds} onToggle={onToggle} />
            ))}
          </ul>
        </>
      ) : (
        <span className="component-tree-leaf">
          <span className="component-tree-indicator" aria-hidden="true">
            •
          </span>
          <code>{node.label}</code>
        </span>
      )}
    </li>
  )
}

function ComponentTreePage() {
  const expandableIds = collectExpandableIds(componentTree)
  const [expandedIds, setExpandedIds] = useState(() => new Set(expandableIds))

  const toggleNode = (nodeId) => {
    setExpandedIds((currentIds) => {
      const nextIds = new Set(currentIds)

      if (nextIds.has(nodeId)) {
        nextIds.delete(nodeId)
      } else {
        nextIds.add(nodeId)
      }

      return nextIds
    })
  }

  return (
    <div>
      <header className="page-header">
        <p className="kicker">MAPA DEL PROYECTO</p>
        <h1>Árbol de renderizado</h1>
        <p className="subtitle component-tree-description">
          Explorá cómo se organizan los componentes de la aplicación. Las páginas dentro de{' '}
          <code>Outlet</code> se muestran según la ruta y <code>AlbumModal</code> aparece al
          seleccionar un disco en un perfil.
        </p>
      </header>

      <section className="window component-tree-panel" aria-label="Árbol de componentes React">
        <div className="component-tree-controls">
          <button
            className="resource-reset"
            type="button"
            onClick={() => setExpandedIds(new Set(expandableIds))}
            disabled={expandedIds.size === expandableIds.length}
          >
            Expandir todo
          </button>
          <button
            className="resource-reset"
            type="button"
            onClick={() => setExpandedIds(new Set())}
            disabled={expandedIds.size === 0}
          >
            Contraer todo
          </button>
        </div>
        <ul className="component-tree" role="tree" aria-label="Jerarquía de componentes">
          <TreeNode node={componentTree} expandedIds={expandedIds} onToggle={toggleNode} />
        </ul>
      </section>
    </div>
  )
}

export default ComponentTreePage
