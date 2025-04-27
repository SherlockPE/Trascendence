import UserRepositoryAdapter from "./infrastructure/repositories/UserRepositoryAdapter";
import UserTemplate from "./infrastructure/rest/UserTemplate";
import authRoutes from "./interface/routes/AuthRoutes";
import { buildApp } from "./app";

async function main() {
  const fastify = await buildApp();
  
  fastify.register(authRoutes, new UserTemplate());

  fastify.listen({ port: 3020, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`🚀 Servidor Web corriendo en ${address}`);
  });
}

main();
