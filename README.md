# ToDo List App (SPA)

Este proyecto es una aplicación de “Todo List” (Lista de Tareas) desarrollada como una SPA (Single Page Application) utilizando React para el frontend y una API basada en Node.js/Express para el backend. La aplicación permite a los usuarios gestionar sus tareas, subtareas, comentarios y realizar operaciones como crear, editar, eliminar y cambiar el estado de las tareas. La autenticación de usuarios se maneja con JWT (JSON Web Tokens).

## Características

-	 Gestión de Tareas: Crear, editar, eliminar y cambiar el estado de las tareas entre “pendiente” y “completada”.
-	 Subtareas: Gestionar subtareas que dependen del estado de las tareas principales.
-	 Comentarios: Agregar, editar y eliminar comentarios en las tareas.
-	 Autenticación JWT: Registro e inicio de sesión de usuarios con autenticación mediante JWT.


## Tecnologías Usadas

-   Frontend: React.js, CSS
-   Backend: Node.js, Express
-   Base de Datos: MongoDB (MongoDB Atlas)
-   Autenticación: JWT (JSON Web Tokens)


## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

	•	Node.js (versión 18 o superior)
	•	MongoDB Atlas o una instancia local de MongoDB


## Intalacion

Clonar el repositorio

```{.bash}
git clone https://github.com/EnriqueGarciaB/toDoList.git
```

```{.bash}
cd toDoList
```

### Backend (API)

Entrar a la carpeta backend

```{.bash}
cd backend
```

Instalar dependencias

```{.bash}
npm i
```

Ejecutar el servidor

```{.bash}
npm run dev
```

El backend se ejecutará en http://localhost:5001


### Frontend (React)

Entrar a la carpeta frontend

```{.bash}
cd frontend
```

Instalar dependencias

```{.bash}
npm i
```

Ejecutar el cliente

```{.bash}
npm start
```

El frontend se ejecutará en http://localhost:3000

## Uso

	1.	Registro de Usuario: Al abrir la aplicación, regístrate con un nuevo usuario.
	2.	Gestión de Tareas: Agrega tareas, subtareas, y comentarios. Cambia su estado y edítalos según sea necesario.
	3.	Filtrado: Filtra las tareas por estado (pendiente o completada).
	4.	Autenticación: Solo los usuarios autenticados podrán gestionar tareas.

## Base de Datos

La base de datos se aloja en MongoDB Atlas. Si deseas ejecutarlo localmente, asegúrate de tener MongoDB instalado y ajusta la variable MONGO_URI en el archivo .env del backend.



















