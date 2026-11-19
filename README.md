# Cynnk · Prototipo navegable

Prototipo HTML de Cynnk exportado desde Figma, con dos flujos conectados:

| Flujo | Carpeta | Pantallas | Modo |
|---|---|---|---|
| Portal de empresas (web) | `empresa/` | 16 | Claro |
| App de estudiantes (móvil) | `estudiante/` | 19 | Oscuro |

`index.html` es la portada para elegir el flujo. Todos los enlaces del prototipo de Figma están replicados como zonas clicables.

## Cómo verlo en local

Abre `index.html` en el navegador. También puedes servir la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

1. Crea un repositorio y sube el contenido de esta carpeta (en la raíz).
2. En **Settings → Pages**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
3. En un par de minutos el sitio queda en `https://<usuario>.github.io/<repositorio>/`.

## Estructura

```
index.html               portada
empresa/*.html           pantallas web (index.html = Ingreso)
estudiante/*.html        pantallas app (index.html = 01 Ingreso)
assets/screens/*.webp    renders de Figma
assets/ui/*.png          capas fijas (menú lateral, barra de navegación, modal)
assets/css, assets/js    estilos y lógica (escala, zonas clicables, menú del prototipo)

```

## Uso

- Clic en un área vacía: resalta las zonas clicables, como en Figma.
- Tecla **H** o botón flotante: deja las zonas resaltadas.
- Botón flotante: lista de pantallas y salto al otro flujo.
