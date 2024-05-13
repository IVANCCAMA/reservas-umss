# React + Vite

Estamos usando Vite + React para este proyecto
El proyecto tiene Booststrap 5.3.3 instalado.

## Instalar

Para instalar los paquetes de dependencia debemos correr:

```bash
npm install
```

## Correr

```bash
npm run dev
```

## Compilar

Los builds se compilan en la carpeta `dist`.

```bash
npm run build
```

## Configuración de ENV

Podemos crear archivo de variables de entorno `.env` en la raíz del proyecto para acceso a credenciales locales.

```bash
EXAMPLE_APP=XXXXXXXXXXXXXX
```

## Arquitectura Archivos Ejemplo

```text
src/
├── App.jsx
├── main.jsx
├── assets/
│   └── scss/
│       ├── stylesheet.scss
│       └── styles/
│           ├── style.scss
│           ├── typography.scss
│           └── variables.scss
├── components/
│   └── NavBar/
│       ├── NavBar.jsx
│       └── NavBarOptions.jsx
├── config/ (Para manejo de Apis)
│   └── site.config.js
├── components/
│   └── NavBar/
│       ├── NavBar.jsx
│       └── NavBarOptions.jsx
├── pages/
│   ├── Admin/
│   │   └── LoginPage
│   │       └── LoginPage.jsx
│   ├── HomePage/
│   │   └── HomePage.jsx
│   └── ReduxExamplesPage/
│       └── ReduxExamplesPage.jsx
├── redux/ (Averiguar)
└── services/ (Servicos Auth, PrivateRoutes, LocalSotorage)
```
