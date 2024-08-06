# Proyecto Base V2


### Contenido
- [Proyecto Base V2](#proyecto-base-v2)
    - [Contenido](#contenido)
    - [Instalación](#instalación)
    - [Estructura de directorios](#estructura-de-directorios)


### Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:
1. Abre una terminal en la raíz de tu partición principal o en tu directorio preferido.
2. Clona el repositorio del proyecto:
    ``` sh
    git clone https://github.com/serinformatico/proyecto-backend-ch-e1
    ```
3. Navega al directorio del proyecto:
    ``` sh
    cd proyecto-backend-ch-e1
    ```
4. Instala las dependencias del proyecto:
    ``` sh
    npm install
    ```
5. Inicia el servidor en modo desarrollo:
    ``` sh
    npm run dev
    ```
6. En caso de ser necesario, restaurar la base de datos:
    ``` sh
    mongorestore --uri="mongodb+srv://tuUsername:tuPassword@tuCluster/" --nsInclude="proyectoBaseV2.*" --drop --gzip ./backups
7. Abre el proyecto en Visual Studio Code:
    ``` sh
    code .
    ```


### Estructura de directorios
El proyecto tiene la siguiente estructura de directorios:
```
├── backups/
│   └── proyectoBackendChE1/   # Backup de la base de datos del proyecto.
└── src/
    ├── config/                # Archivos de configuración del proyecto.
    ├── constants/             # Constantes utilizadas en el proyecto.
    ├── managers/              # Gestión y lógica de negocios.
    ├── models/                # Modelos de datos y esquemas de Mongoose.
    ├── public/                # Archivos estáticos públicos.
    │   ├── css/               # Estilos empleados en el FrontEnd.
    │   ├── icons/             # Iconos utilizados en el FrontEnd.
    │   ├── images/            # Imágenes de los productos.
    │   └── js/                # Archivos de JavaScript para el FrontEnd.
    ├── routes/                # Rutas del FrontEnd y Backend.
    │   └── api/               # Rutas específicas de la API.
    ├── utils/                 # Utilidades y funciones auxiliares.
    └── views/                 # Vistas y plantillas para el FrontEnd.
        └── layouts/           # Plantilla base.

```