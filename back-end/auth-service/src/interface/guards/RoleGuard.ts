import { FastifyReply, FastifyRequest } from "fastify";



export default function roleGuard(allowedRoles: string[]) {
	return async function (req: FastifyRequest, reply: FastifyReply) {
	  try {
		await req.jwtVerify();
		const user = req.user as { roles: string[] };
  
		if (!user.roles.some((r) => allowedRoles.includes(r))) {
		  return reply.code(403).send({ error: "Forbidden: Role required" });
		}
	  } catch (err) {
		return reply.code(401).send({ error: "Unauthorized" });
	  }
	};
}