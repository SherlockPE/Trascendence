import { log } from "console";
import LogIn from "../../application/use-cases/login";
import SessionDto from "../../domain/dto/SessionDto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import Register from "../../application/use-cases/SignUp";
import SignUp from "../../application/use-cases/SignUp";
import { FastifyJWTOptions } from "@fastify/jwt";


export default class AuthController {
	private logIn : LogIn;
	private register : SignUp;
	private fastify: FastifyJWTOptions & FastifyInstance;
	constructor(logIn: LogIn, fastify: FastifyJWTOptions & FastifyInstance, register: SignUp) {
		this.logIn = logIn;
		this.register= register;
		this.fastify = fastify;
	}

async initLogIn(req: FastifyRequest<{ Body: SessionDto }>, reply: FastifyReply) {
	try {
		log(req.body);
		const auth: SessionDto = req.body as SessionDto;
		const result = await this.logIn.execute(auth);
		
		const jwt = this.fastify.jwt.sign({ user: auth.username, roles: ["view"] }, { expiresIn: "1h" });
		reply.send({jwt: jwt});
	} catch (err) {
		log(err);
		reply.status(500).send({ error: "Error al obtener mensajes" });
	}
}

	async verify(req: any, reply: FastifyReply) {
		try {
			const decoded = await req.jwtVerify();
			console.log(decoded);
			reply.send({ valid: true, user: decoded.user });
		} catch (error) {
			reply.status(401).send({ message: "Unauthorized" });
		}
	}
	async initRegister(req: FastifyRequest, reply: FastifyReply) {
		try {
			const auth: SessionDto = JSON.parse(req.body.toString());
			const result = await this.register.execute(auth);
			reply.send(result);
		} catch (err) {
			reply.status(500).send({ error: "Error al obtener mensajes" });
		}
	}
}