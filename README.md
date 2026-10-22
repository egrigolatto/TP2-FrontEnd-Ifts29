# Grupo 28 | Proyecto React


## Integrantes

| Integrante | GitHub |
| --- | --- |
| Elián Bargaz | [Elibar19](https://github.com/Elibar19) |
| Juan Ignacio Solari | [LaWeaArgentina](https://github.com/LaWeaArgentina) |
| Eliana Gisele Navarro | [Eli-Navarr0](https://github.com/Eli-Navarr0) |
| María Fernanda Ortiz | [ortizgonzalezmariafer](https://github.com/ortizgonzalezmariafer) |
| Emanuel Andrés Grigolatto | [egrigolatto](https://github.com/egrigolatto) |

## Tecnologías y estructura

- React para construir las páginas con componentes reutilizables.
- React Router para navegar entre portada, bitácora y perfiles.
- Vite para desarrollo local y compilación.

```text
src/
  components/  # Layout, sidebar y modal de discos
  data/        # Datos de integrantes
  pages/       # Portada, perfiles y bitácora
  styles.css   # Estilos compartidos
public/img/    # Avatares y portadas de discos
```

## Ejecutar en local

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Rutas

- `/`: portada del equipo.
- `/bitacora`: bitácora del proceso.
- `/perfil/:memberId`: perfil de cada integrante.
