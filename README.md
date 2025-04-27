# Trascendence

# Arquitectura de Directorios
La siguiente arquitecta esta basada en Puertos y Adaptados, haciendo que sea facil de mantener, extender y contine un orden modular, se hace uso de principios SOLID, FIRST y POO.
```
src/
├── app.config.ts
├── application/
│   ├── ports/
│   │   ├── ChatRepositoryPort.ts
│   │   ├── SessionRepositoryPort.ts
│   │   └── UserRepositoryPort.ts
│   └── use-cases/
│       ├── CloseSession.ts
│       ├── ListenMessage.ts
│       ├── LoadChat.ts
│       ├── LoadChatByUserId.ts
│       ├── LoadMessage.ts
│       └── VerifyConnection.ts
├── domain/
│   ├── entities/
│   │   ├── Chat.ts
│   │   ├── Message.ts
│   │   └── User.ts
│   └── exception/
│       └── HandleException.ts
├── infrastructure/
│   ├── db/
│   │   ├── ChatSingleton.ts
│   │   └── SessionSingleton.ts
│   ├── repositories/
│   │   ├── ChatRepositoryAdapter.ts
│   │   ├── SessionRepositoryAdapter.ts
│   │   └── UserRepositoryAdapter.ts
│   └── rest/
│       ├── UserRepositoryStore.ts
│       └── UserTemplate.ts
├── interfaces/
│   ├── controllers/
│   │   ├── ChatController.ts
│   │   └── ChatWebSocketController.ts
│   ├── guards/
│   │   └── RoleGuard.ts
│   └── routes/
│       ├── chatRoutes.ts
│       └── chatWebSocketRoutes.ts
└── server.ts
```
## Application

> **use-case**:Los casos de usos espcificos que hara uso el controller para que lo consuma

>**ports**: Los puertos son interface que contienen las funciones de los fuentes de datos, la implementan los Adapter. Port no conoce a Adapter


## Domain
>**entities**: Las entities son clases iguales a las que estan en base de datos, contienen todos los datos necesarios para la clase, contraseña, email, stats, etc.

>**dto**: Data Transfer Object, son clases resumidas de Entities, que se utilizan para no comprometer toda la Entidad y contienen datos relevantes al caso de uso, ejemplo UserDto contiene solo Id, email, LastUpdate, etc.

>**exception**:Contiene las clases adecuadas a la gestion de ecepciones, y su usabilidad, extienden de Error.

## Infrastructure
>**repository**: Aqui iran los Adapters que implementan Port, Contienen la implementacion de utilidad para Applicacion ya sea la base de datos, Recursos cache(Singleton), RestTemplate asi como otras fuentes de datos.

>**db**: Aqui ira la conexion a la Base de datos y la implementacion de ORM para su uso

>**rest**: Aqui iran encargadas las funciones fetch que se utilizaran para llamar ApiRest de otros servicios.

## Interfaces
>**controllers**: Aqui se gestiona la entrada y salida del endpoint, nos ayudan a gestionar como devolveremos el dato y que datos obtendremos de la request para enviar a resolverlo en el Caso de Uso(Application)

>**guards**: Aqui va toda las funciones y clases que contengan la seguridad del endpoin, ejemplo verificar JWT, filtrar por roles, ver si continen headers necesarios tratar las cookies, etc. 

>**routes**: Aqui esta la configuracion del Endpoint, el tipo de metodo, el tipo de protocolo, capa de seguridad jwt y roles, tipo de request y response que necesita asi como la configuracion de Swagger.

# Microservice
Se hace uso de la arquitectura microservicios para que el usuario pueda acceder libremente a Gateway y el mismo Authorizar y filtrar las peticiones a los servicios que incluimos.

El despliegue esta hecho en DockerCompose con los siguientes servicios
## Auth-Service
Se encarga de iniciar session y registrar usuarios, asi como asignar los roles, generar jwt, crear Hash Password y filtrar las peticiones.

**Como iniciar**
```bash
cd back-end/auth-service
npm run dev
```

**Swagger**
Estos son los endpoint habilitados por el momento en swgger para hacer uso en tiempo real. 
- ``/api/v1/auth/signin``
- ``/api/v1/auth/verify``
- ``/api/v1/auth/signup``

Link:
```http
http://localhost:3000/docs
```
**documentacion**

```bash
npm run docs
```

## User-Service
Servicio encargado de gestionar los Usuarios y obtener sus estadisticas.

```bash
cd back-end/auth-service
npm run dev
```

**Swagger**
Estos son los endpoint habilitados por el momento en swgger para hacer uso en tiempo real. 



```htpp
http://localhost:3010/docs
```

**documentacion**

```bash
npm run docs
```

## Chat-Service
En chat se puede gestionar todos los chats que hay entre los usuarios y mantener un LiveChat con el servidor para enviar mensajes en tiempo real, esta capado por JWT y roles para restrigir el consumo de datos

**Como iniciar**
```bash
cd back-end/chat-service
npm run dev
```

**Swagger**

Estos son los endpoint habilitados por el momento en swgger para hacer uso en tiempo real.

*Chats*
- ``/api/v1/chats/:chatId/messages``
- ``/api/v1/chats/:chatId``
- ``/api/v1/chats/user/:userId``

*WebSocket*
- ``/chats/connect-ws``

```http
http://localhost:3000/docs

```

# Ejecutar el proyecto
Se puede hacer uso de docker compose para iniciar el proyecto
```bash
docker compose up -d
```
# Casos de uso
Para conocer los caso de uso y las funciones que se utilizan en el proyecto:

> Registro

> Inicio de session

> Iniciar un Chat

> Enviar un mensaje

> Recibir un mensaje

![alt text](image-2.png)

# Recursos
Tecnologias: 
- TypeScript
- Html
- CSS

Dependencias:
- Fastify: Es una libreria para crar apis de forma rapida y elegante
	- jwt: Extencion para registrar Json web Token y verificarlo
	- bcrypt: Util para crear HashPassword y guardarlas en DB y no comprometer la contraseña real
	- swagger: Se utiliza para documentar y probar las Apis creadas
	- cors: Para restringir las apis solo direcciones especificas
	- static: Nos ayuda a enviar HTML y CSS estatica.
	- websocket: Para mantener una comunicacion Abierta y no bloqueante entre Srvidor y Cliente 
- dotenv: Abstrae las variables de entorno al programa.
- tailwind: Para generar CSS robusto y facil para el visual.

# Licencia
```

```
