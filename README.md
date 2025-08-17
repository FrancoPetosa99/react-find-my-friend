# 🐾 Find My Friend - API REST

| <h1>UTN-FRLP</h1> | <img src="./logo.png" alt="Logo del Proyecto" width="100"> |
|-------------------|----------------------------------|

Proyecto **Find My Friend** desarrollado para la materia Administración de Sistemas de Información de la carrera Ingeniería en Sistema de Información de la Universidad Tecnológica Nacional - Regional La Plata

## Descripción
Find my friend es una aplicación pensada para que los usuarios publiquen mascotas perdidas y ayuden a encontrar a sus dueños contactandolos a través de la plataforma.

## 🚀 Características

- **Página principal** con listado de mascotas perdidas
- **Sistema de filtros** por tipo, raza y ciudad
- **Formulario de publicación** para mascotas perdidas
- **Página de detalle** con información completa de la mascota
- **Sistema de autenticación** (login/registro)
- **Diseño responsivo** con Bootstrap
- **Interfaz moderna** y fácil de usar

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

### Desarrollo (Automático)
- Usa datos mock automáticamente
- No requiere configuración adicional

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

## 🖼️ Sistema de Imágenes

La aplicación incluye un sistema de imágenes optimizado:

### Componente PetImage
- **Manejo de errores** - Si una imagen falla, muestra una imagen por defecto
- **Lazy loading** - Las imágenes se cargan solo cuando son visibles
- **Optimización** - Usa imágenes de Unsplash con parámetros de optimización

### Estructura de Imágenes
```
public/images/pets/
├── README.md           # Documentación de imágenes
├── default-pet.jpg     # Imagen por defecto
└── [mascota].jpg      # Imágenes específicas (opcional)
```

### URLs de Imágenes
- **Desarrollo**: Usa imágenes de Unsplash optimizadas
- **Producción**: Puede usar imágenes locales o URLs de CDN
- **Fallback**: Si una imagen falla, usa `/images/pets/default-pet.jpg`

### Agregar Nuevas Imágenes
1. Coloca la imagen en `public/images/pets/`
2. Actualiza `src/data/mockData.ts` con la nueva URL
3. El componente PetImage manejará automáticamente los errores

## 🎨 Personalización

### Colores y Estilos
Los estilos principales se encuentran en:
- `src/index.css` - Estilos globales
- `src/App.css` - Estilos del componente App

### Componentes
Los componentes están organizados en:
- `src/components/` - Componentes reutilizables
- `src/pages/` - Páginas principales

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:
- 📱 Dispositivos móviles
- 📱 Tablets
- 💻 Computadoras de escritorio

## 🔮 Próximas Funcionalidades

- [ ] Integración con backend
- [ ] Sistema de notificaciones
- [ ] Mapa para ubicaciones
- [ ] Subida de imágenes real
- [ ] Sistema de mensajería
- [ ] Filtros avanzados
- [ ] Página de perfil de usuario

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.

---

¡Gracias por usar Find My Friend! 🐾 
