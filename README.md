# Frontend Prueba - Spybee

Aplicación frontend construida con **Next.js 16** y **React 19** para la visualización y gestión de proyectos con mapeo interactivo usando **Mapbox GL**.

## Características principales

- 📊 **Vista de tabla**: Visualiza proyectos en formato tabla con paginación
- 🗺️ **Vista de mapa**: Integración con Mapbox GL para visualizar proyectos geográficamente
- 🔄 **Múltiples vistas**: Cambia entre vista lista, mapa o ambas simultáneamente
- 🎨 **Interfaz moderna**: Diseñada con Tailwind CSS
- 🔐 **Rutas protegidas**: Autenticación de usuarios implementada con ProtectedRoute
- 🔍 **Sistema de filtros**: Filtra proyectos según criterios específicos
- 💾 **Estado global**: Gestión de estado con Zustand
- 📱 **Componentes modulares**: Header, SubHeader, Sidebar, SearchBar, etc.
- 📄 **Datos mock**: Incluye datos de ejemplo para desarrollo

## Requisitos previos

- Node.js 18+
- npm, yarn, pnpm o bun

## Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

2. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aqui
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en acción.

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run start` - Inicia el servidor en modo producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## Estructura de carpetas

```
frontend-prueba/
├── app/
│   ├── layout.tsx              # Layout principal de la aplicación
│   ├── page.tsx                # Página principal con vistas de tabla y mapa
│   ├── globals.css             # Estilos globales
│   ├── components/             # Componentes de la aplicación
│   │   ├── Filter.jsx          # Sistema de filtros
│   │   ├── Header.jsx          # Encabezado principal
│   │   ├── Login.jsx           # Componente de login
│   │   ├── MapView.jsx         # Vista del mapa con Mapbox
│   │   ├── Pagination.jsx      # Paginación de resultados
│   │   ├── ProjectTable.jsx    # Tabla de proyectos
│   │   ├── ProtectedRoute.jsx  # Rutas protegidas
│   │   ├── SearchBar.jsx       # Barra de búsqueda
│   │   ├── Sidebar.jsx         # Panel lateral
│   │   └── SubHeader.jsx       # Encabezado secundario
│   ├── data/
│   │   └── mock_data.json      # Datos de ejemplo
│   ├── store/
│   │   ├── authStore.js        # Estado de autenticación
│   │   └── projectStore.js     # Estado de proyectos
│   └── styles/                 # Estilos modulares CSS
│       ├── filter.module.css
│       ├── header.module.css
│       ├── layaut.module.css
│       ├── login.module.css
│       ├── map.module.css
│       ├── mapView.module.css
│       ├── page.module.css
│       ├── pagination.module.css
│       ├── searchBar.module.css
│       ├── sidebar.module.css
│       ├── subheader.module.css
│       └── table.module.css
├── public/                     # Archivos estáticos
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── logoSpybee.png
│   ├── next.svg
│   ├── Spybee.png
│   ├── vercel.svg
│   └── window.svg
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración de TypeScript
├── next.config.ts              # Configuración de Next.js
├── postcss.config.mjs          # Configuración de PostCSS
├── eslint.config.mjs           # Configuración de ESLint
└── README.md                   # Este archivo
```

## Tecnologías utilizadas

- **Next.js 16**: Framework de React para producción
- **React 19**: Biblioteca para interfaces de usuario
- **TypeScript**: JavaScript con tipos
- **Tailwind CSS**: Framework de CSS utilitario
- **Mapbox GL**: Biblioteca para mapas interactivos
- **Zustand**: Gestión de estado simple y escalable
- **ESLint**: Linter para JavaScript/TypeScript

## Despliegue

La aplicación puede desplegarse en plataformas como Vercel, Netlify o cualquier servicio que soporte Next.js.

Para desplegar en Vercel:
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. Despliega automáticamente.


