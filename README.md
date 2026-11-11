# MUJER MAGNÉTICA™ — versión inicial GitHub Pages

Miniapp de 21 días de crecimiento personal, con diario guardado localmente y siete audios originales de Valentina. Diseño crema y bordó.

## Publicación en GitHub Pages (cuando decidas lanzar)

1. Crear un repositorio llamado `mujer-magnetica-app` y cargar el contenido **de esta carpeta** en su raíz (no el ZIP entero como único archivo).
2. Mantener la rama principal con nombre `main`.
3. En GitHub > Settings > Pages > Build and deployment seleccionar **Source: GitHub Actions**.
4. Al subir los archivos, la acción `.github/workflows/deploy-pages.yml` instala dependencias, prueba el contenido, construye el sitio y publica la web.
5. La URL esperada tiene formato `https://USUARIO.github.io/mujer-magnetica-app/` (el usuario real de GitHub determina el enlace exacto).
6. Abrir la web y probar los 21 días, las reproducciones y el diario en celular y escritorio.
7. Solo cuando esté comprobado, poner **esa URL real** dentro del PDF que se entrega después del pago en Hotmart.

## Desarrollo local

Requiere Node.js 22. En esta carpeta: `npm install`, `npm run check`, `npm run dev` y, para publicación, `npm run build`.

## LIMITACIONES IMPORTANTES DE ESTA PRUEBA

- **GitHub Pages es público**: cualquiera que conozca o descubra la URL puede entrar y escuchar los audios. El PDF de Hotmart no limita el acceso. No se debe presentar como una app de acceso exclusivo técnicamente protegido.
- El diario se guarda en `localStorage` del navegador: se puede perder al borrar datos, cambiar de dispositivo o usar navegación privada. Incluye una opción para exportar las respuestas en JSON. No almacenar datos médicos u otra información sensible.
- Los MP3 incluidos en `public/demo-audio/` son públicos. La voz y el contenido deben contar con autorización comercial antes del lanzamiento de pago.
- No hay integración con Hotmart ni autenticación. Las carpetas `api/` y `supabase/` pertenecen a un prototipo de acceso privado futuro y NO se usan con GitHub Pages.
- El archivo `.env.example` es ilustrativo; no se deben subir claves ni tokens secretos.
- El audio 01 dura ~23 segundos y es una introducción breve.

## Verificación

`npm run check` valida la estructura del contenido, los 7 archivos MP3 y los tests de webhook legado. `npm run build` produce `dist/`, que se publica automáticamente desde GitHub Actions. Antes de crear el repositorio, confirmar compilación y reproducción con acceso a dependencias.
