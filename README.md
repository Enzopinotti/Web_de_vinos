# La Casa del Vino

Sitio estático histórico en HTML/SCSS creado en 2023 para practicar maquetado multipágina, estilos responsivos y organización de estilos con Sass.

## Provenance

El baseline histórico del proyecto está fijado en:

```text
c95ca4bad1b11f0c946a3c04764c63ca18e6d7c6
```

Ese commit fue realizado por **Nicodadario / Nicolas Dadario**, y el propio footer original acredita a Nicolas Dadario como creador de la página. La modernización 2026 se realiza dentro del portfolio de Enzo Pinotti, pero **no reescribe ni se apropia de esa autoría histórica**.

## Qué contiene el proyecto

- sitio estático multipágina;
- HTML semántico básico;
- SCSS modular;
- CSS compilado versionado para que el sitio pueda servirse sin build en runtime;
- imágenes locales;
- páginas de inicio, tipos de vino, contenido educativo, contacto y suscripción.

## Autoridad mantenida 2026

La modernización conserva el sitio como HTML/SCSS. No introduce React, Vite, backend, base de datos ni autenticación.

Los objetivos de la autoridad actual son:

- usar Dart Sass mantenido en lugar de `node-sass`;
- mantener `css/style.css` reproducible desde `scss/style.scss`;
- evitar `node_modules/` versionado;
- hacer rutas/assets portables para hosting en subpaths;
- corregir HTML claramente inválido o no semántico sin rediseñar la identidad visual;
- dejar explícito que los formularios de contacto/suscripción son demostrativos y no envían datos;
- validar assets y estructura en CI.

## Desarrollo local

Instalación reproducible:

```bash
npm ci
```

Compilar SCSS:

```bash
npm run build-css
```

Observar cambios SCSS:

```bash
npm run watch-css
```

Validar el sitio:

```bash
npm test
```

El sitio puede servirse con cualquier servidor estático desde la raíz del repositorio.

## Fuente y artefactos

```text
scss/          fuente de estilos
css/style.css  artefacto compilado verificado por CI
pages/         páginas secundarias
fotos/         assets locales
scripts/       validaciones de mantenimiento
```

`node_modules/` es siempre generado y no forma parte de la autoridad Git.

## Formularios

Las páginas de contacto y suscripción no tienen backend asociado. En la autoridad 2026 están marcadas como **demos locales** y no transmiten ni almacenan datos.

## No-adopciones deliberadas

Esta modernización no agrega:

- React / Next / Vue;
- API o backend;
- base de datos;
- autenticación;
- analytics;
- servicios cloud.

Ninguno de esos componentes es necesario para preservar y mejorar este ejercicio estático.

## Seguimiento

- modernización 2026: [issue #2](https://github.com/Enzopinotti/Web_de_vinos/issues/2)
- programa central: [`Enzopinotti/Enzopinotti#19`](https://github.com/Enzopinotti/Enzopinotti/issues/19)

## Autoría

Proyecto histórico original: **Nicolas Dadario / Nicodadario**.  
Modernización, mantenimiento y documentación 2026 dentro del portfolio: **Enzo Pinotti**.
