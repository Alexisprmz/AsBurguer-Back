

# AS Burger - Sistema de Comandas (Backend)

API REST y servidor WebSocket para el sistema de gestión de comandas de restaurante de hamburguesas, desarrollado con Node.js, Express y TypeScript.

## Descripción

Este proyecto es el **Backend** del sistema "AS Burger", resultado de un proceso de **reingeniería de software** aplicado al sistema original. Proporciona todos los servicios necesarios para la gestión de pedidos, autenticación de usuarios, menú y estadísticas de ventas.

### Proceso de Reingeniería Aplicado

Este sistema fue sometido a un proceso completo de reingeniería que incluyó:

1. **Ingeniería Inversa**: Análisis y comprensión del sistema existente, extracción de la lógica de negocio y documentación del código fuente original.

2. **Reestructuración de Documentos**: Reorganización de la estructura de archivos y carpetas para mejorar la mantenibilidad y escalabilidad del proyecto.

3. **Reestructuración de Código**: Refactorización del código existente aplicando mejores prácticas, patrones de diseño (MVC) y optimización del rendimiento.

4. **Ingeniería Progresiva**: Integración de nuevos requerimientos y funcionalidades al sistema existente, incluyendo:
   - Nuevos endpoints para funcionalidades adicionales
   - Mejoras en la gestión de errores
   - Optimización de consultas a base de datos
   - Implementación de nuevas características solicitadas

5. **Creación de Nuevos Diagramas**: Documentación visual actualizada del sistema incluyendo diagramas de arquitectura, flujo de datos y casos de uso.

## Créditos

- **Sistema Original**: Desarrollado por **Lizeth Abril González Vázquez**
- **Reingeniería**: Aplicada como parte del proyecto de la materia de Reingeniería de Software

## Repositorios

### Repositorios Originales
| Proyecto | Enlace |
|----------|--------|
| Frontend Original | [project-front](https://github.com/LizethVqz/project-front.git) |
| Backend Original | [project-ws](https://github.com/LizethVqz/project-ws.git) |

### Repositorios con Reingeniería
| Proyecto | Enlace |
|----------|--------|
| Frontend | [Front-ASBurger-Reingenieria](https://github.com/bum-spark/Front-ASBurger-Reingenieria.git) |
| Backend (este repo) | [Back-ASBurger-Reingenieria](https://github.com/bum-spark/Back-ASBurger-Reingenieria.git) |

## Tecnologías Utilizadas

- **Node.js** (Runtime de JavaScript)
- **Express** 4.16.4 (Framework web)
- **TypeScript** (Tipado estático)
- **MySQL / MySQL2** (Base de datos)
- **Socket.IO** 4.0.2 (Comunicación en tiempo real)
- **JWT** (Autenticación con JSON Web Tokens)
- **bcrypt** (Encriptación de contraseñas)

## Instalación y Ejecución

### Prerrequisitos

- **Node.js** (versión 18.x o superior recomendada)
- **npm** (incluido con Node.js)
- **TypeScript** instalado globalmente
- **nodemon** (opcional, para desarrollo)
- **MySQL** (base de datos)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/bum-spark/Back-ASBurger-Reingenieria.git
   cd Back-ASBurger-Reingenieria
   ```

2. **Instalar dependencias del proyecto**
   ```bash
   npm install
   ```

3. **Instalar TypeScript globalmente** (si no lo tienes)
   ```bash
   npm install -g typescript
   ```

4. **Instalar nodemon globalmente** (recomendado para desarrollo)
   ```bash
   npm install -g nodemon
   ```

5. **Configurar la base de datos**
   
   Asegúrate de tener MySQL corriendo y configura las credenciales en el archivo de entorno correspondiente.

### Ejecución del Servidor

Para ejecutar el servidor necesitas **dos terminales** corriendo simultáneamente:

**Terminal 1 - Compilar TypeScript (modo watch)**
```bash
tsc -w
```
> Este comando compila los archivos `.ts` a JavaScript y observa cambios automáticamente.

**Terminal 2 - Levantar el servidor**
```bash
nodemon dist/
```
> O alternativamente sin nodemon:
```bash
node dist/
```

### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm install` | Instala todas las dependencias |
| `tsc -w` | Compila TypeScript en modo watch |
| `nodemon dist/` | Inicia el servidor con auto-reload |
| `node dist/` | Inicia el servidor (sin auto-reload) |

## Estructura del Proyecto

```
project-ws/
├── index.ts               # Punto de entrada de la aplicación
├── package.json           # Dependencias y configuración
├── tsconfig.json          # Configuración de TypeScript
├── app/
│   ├── controllers/       # Controladores (lógica de endpoints)
│   │   ├── AuthController.ts
│   │   ├── GraphicsController.ts
│   │   ├── MenuController.ts
│   │   ├── OrderController.ts
│   │   └── UserController.ts
│   ├── models/            # Modelos (estructura de datos)
│   │   ├── AuthModel.ts
│   │   ├── GraphicsModel.ts
│   │   ├── MenuModel.ts
│   │   ├── OrderModel.ts
│   │   └── UserModel.ts
│   └── services/          # Servicios (lógica de negocio)
│       ├── AuthService.ts
│       ├── GraphicsService.ts
│       ├── MenuService.ts
│       ├── OrderService.ts
│       └── UserService.ts
├── config/
│   ├── database/          # Configuración de base de datos
│   │   ├── DatabaseConnection.ts
│   │   └── DatabaseMethods.ts
│   ├── server/            # Configuración del servidor
│   │   ├── Middleware.ts
│   │   └── ServerConfig.ts
│   └── tools/             # Utilidades
│       ├── CustomExceptions.ts
│       ├── Jwt.ts
│       └── Utils.ts
├── global/
│   └── Environment.ts     # Variables de entorno
└── routes/                # Definición de rutas
    ├── AuthRouter.ts
    ├── GraphicsRouter.ts
    ├── MenuRouter.ts
    ├── OrderRouter.ts
    ├── SocketRouter.ts
    └── UserRouter.ts
```

## API Endpoints

El servidor expone los siguientes grupos de endpoints:

| Ruta Base | Descripción |
|-----------|-------------|
| `/auth` | Autenticación (login, registro) |
| `/user` | Gestión de usuarios |
| `/menu` | Gestión del menú (productos, ingredientes) |
| `/order` | Gestión de órdenes/pedidos |
| `/graphics` | Estadísticas y gráficas |

## Nota Importante

Este es únicamente el **Backend** del sistema. Para el funcionamiento completo de la aplicación, es necesario tener corriendo también el **Frontend** disponible en el repositorio correspondiente.

## Licencia

Este proyecto fue desarrollado con fines educativos como parte de la materia de Reingeniería de Software.
"# AsBurguer-Back" 
