# Trascendence

## Arquitectura de Directorios
La siguiente arquitecta esta basada en Puertos y Adaptados, haciendo que sea facil de mantener, extender y mantiene un orden modular haciendo uso de SOLID.
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
**application**

> **use-case**
>
>Los casos de usos espcificos que hara uso el controller para que lo consuma
> el endpoint


**domain**
**infrastructure**
**interfaces**


## Microservice
Se hace uso de la arquitectura microservicios para que el usuario pueda acceder libremente a Gateway y el mismo Authorizar y filtrar las peticiones a los servicios que incluimos.

El despliegue esta hecho en DockerCompose con los siguientes servicios
### Auth-Service
Se encarga de iniciar session y registrar usuarios, asi como asignar los roles, generar jwt, crear Hash Password y filtrar las peticiones
**Como iniciar**
```bash
cd back-end/auth-service
npm run dev
```
**Endpoint habilitados:**
- ``/api/v1/auth/signin``
- ``/api/v1/auth/verify``
- ``/api/v1/auth/signup``
**Swagger**
```http
http://localhost:3000/docs
```
### User-Service

```htpp
http://localhost:3010/docs
```

### Chat-Service
En chat se puede gestionar todos los chats que hay entre los usuarios y mantener un LiveChat con el servidor para enviar mensajes en tiempo real, esta capado por JWT y roles para restrigir el consumo de datos

**Como iniciar**
```bash
cd back-end/chat-service
npm run dev
```

**Endpoint habilitados:**

*Chats*
- ``/chats/:chatId/messages``
- ``/chats/:chatId``
- ``/chats/user/:userId``

*WebSocket*
- ``/chats/connect-ws``

**Swagger**
```http
http://localhost:3000/docs

```

## Ejecutar el proyecto
Se puede hacer uso de docker compose para iniciar el proyecto
```bash
docker compose up -d
```

---

## Chat useCase

![alt text](image-1.png)
## Licencia


```

```
