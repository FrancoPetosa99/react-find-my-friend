# 🐾 Find My Friend - API REST

| <h1>UTN-FRLP</h1> | <img src="./logo.png" alt="Logo del Proyecto" width="100"> |
|-------------------|----------------------------------|

Proyecto **Find My Friend** desarrollado para la materia Administración de Sistemas de Información de la carrera Ingeniería en Sistema de Información de la Universidad Tecnológica Nacional - Regional La Plata

## Descripción
Find my friend es una aplicación pensada para que los usuarios publiquen mascotas perdidas y ayuden a encontrar a sus dueños contactandolos a través de la plataforma.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Bootstrap** - Componentes de Bootstrap para React
- **React Router** - Enrutamiento para aplicaciones React
- **Vite** - Herramienta de construcción rápida

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)

### Instalación de Node.js

1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión LTS (Long Term Support)
3. Sigue las instrucciones de instalación para tu sistema operativo

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd find_my_friend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

### 4. Construir para producción

```bash
npm run build
```

## 🐳 Ejecutar con Docker

Si no tienes Node.js instalado, puedes usar Docker:

### 1. Construir la imagen

```bash
docker build -t find-my-friend .
```

### 2. Ejecutar el contenedor

```bash
docker run -p 3000:3000 find-my-friend
```

### 3. Acceder a la aplicación

Abre tu navegador en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
find_my_friend/
├── public/                 # Archivos públicos
│   └── images/            # Imágenes del proyecto
│       └── pets/          # Imágenes de mascotas
│           ├── README.md   # Documentación de imágenes
│           └── default-pet.jpg # Imagen por defecto
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Sidebar.tsx    # Barra lateral/navegación
│   │   └── PetImage.tsx   # Componente de imagen optimizada
│   ├── data/              # Datos mock
│   │   └── mockData.ts    # Datos de mascotas y usuarios
│   ├── pages/             # Páginas de la aplicación
│   │   ├── Home.tsx       # Página principal
│   │   ├── Login.tsx      # Página de login
│   │   ├── Register.tsx   # Página de registro
│   │   ├── PetForm.tsx    # Formulario de publicación
│   │   └── PetDetail.tsx  # Detalle de mascota
│   ├── services/          # Servicios de datos
│   │   └── petService.ts  # Servicio para operaciones de mascotas
│   ├── types/             # Definiciones de tipos TypeScript
│   │   └── index.ts       # Interfaces y tipos
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos del componente App
│   ├── main.tsx           # Punto de entrada
│   ├── index.css          # Estilos globales
│   └── vite-env.d.ts      # Tipos de variables de entorno
├── package.json           # Dependencias y scripts
├── tsconfig.json          # Configuración de TypeScript
├── vite.config.ts         # Configuración de Vite
├── Dockerfile             # Configuración de Docker
├── env.example            # Ejemplo de variables de entorno
└── README.md              # Este archivo
```

## 🎯 Funcionalidades

### Página Principal (Home)
- Listado de mascotas perdidas
- Filtros por tipo, raza y ciudad
- Búsqueda por nombre
- Diseño de tarjetas responsivo

### Formulario de Publicación
- Campos para información de la mascota
- Validación de formularios
- Información de contacto del dueño
- Subida de imágenes (URL)

### Página de Detalle
- Información completa de la mascota
- Información de contacto
- Botones para llamar y enviar WhatsApp
- Consejos para ayudar a encontrar la mascota

### Autenticación
- Login de usuarios
- Registro de nuevos usuarios
- Validación de formularios

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción

## 🌍 Variables de Entorno

La aplicación utiliza variables de entorno para configurar el comportamiento según el ambiente:

### Producción
Crea un archivo `.env` basado en `env.example`:

```bash
cp env.example .env
```

Y configura las variables:

```env
VITE_API_BASE_URL=https://tu-api.com/api
```

### Variables Disponibles
- `VITE_API_BASE_URL` - URL base de la API (solo para producción)

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:
- 📱 Dispositivos móviles
- 📱 Tablets
- 💻 Computadoras de escritorio

