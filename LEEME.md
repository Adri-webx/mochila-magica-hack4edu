# Mochila Mágica – PWA

## Cómo publicarla (necesario para poder instalarla)
Una PWA solo se instala si se sirve por **HTTPS** (abrir el archivo con doble clic no sirve).
Sube la carpeta completa, tal cual, a cualquiera de estos servicios gratuitos:

- **Netlify Drop**: arrastra la carpeta a https://app.netlify.com/drop
- **Cloudflare Pages** o **GitHub Pages**: sube el contenido de la carpeta a la raíz del sitio.

Para probar en tu computadora: `python -m http.server 8000` y abre http://localhost:8000

## Cómo se instala en cada dispositivo
- **Android (Chrome)**: aparece el aviso "Instalar" dentro de la app, o menú ⋮ → *Instalar app*.
- **iPhone / iPad (Safari)**: botón Compartir → *Agregar a pantalla de inicio*.
- **Windows / Mac / Chromebook (Chrome o Edge)**: icono de instalar en la barra de direcciones.

Después de abrirla una vez con internet, funciona **sin conexión**.

## Qué incluye
- `index.html` – la app (765 preguntas; el avance se guarda en el dispositivo).
- `PITCH_HACK4EDU.md` – texto y guion de demo para presentar el proyecto.
- `manifest.json`, `sw.js`, `js/pwa.js` – instalación y modo sin conexión.
- `icons/` – iconos 192, 512, maskable, iOS y favicon.
- `_headers` – evita que el service worker quede viejo en Netlify/Cloudflare.
- `legacy/` – archivos antiguos (app.js, bancos.js, style.css) que no se usaban. Se pueden borrar.

## Al actualizar la app
Cambia `VERSION` en `sw.js` (por ejemplo `v3`). Los usuarios verán el aviso "Hay una versión nueva".
