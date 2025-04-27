import { log } from "console";
import SessionDto from "../../domain/dto/SessionDto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import SignUp from "../../application/use-cases/SignUp";
import { FastifyJWTOptions } from "@fastify/jwt";
import LogIn from "../../application/use-cases/LogIn";


export default class AuthController {
	private logIn : LogIn;
	private register : SignUp;
	private fastify: FastifyInstance;
	constructor(logIn: LogIn, fastify: FastifyInstance, register: SignUp) {
		this.logIn = logIn;
		this.register= register;
		this.fastify = fastify;
	}

	async initLogIn(req: FastifyRequest<{ Body: SessionDto }>, reply: FastifyReply) {
		const auth: SessionDto = req.body as SessionDto;
		const result = await this.logIn.execute(this.fastify, auth);
		if (result === null) {
			reply.status(401).send({ error: "Usuario o contraseña incorrectos" });
			return;
		}
		//TODO:Add roles to the JWT token
		const jwt = this.fastify.jwt.sign({ user: auth.username, roles: ["view"] }, { expiresIn: "1h" });
		reply.send({jwt: jwt});
	}

	async verify(req: any, reply: FastifyReply) {
		const decoded = await req.jwtVerify();
		console.log(decoded);
		reply.send({ valid: true, user: decoded.user });
	}
	async initRegister(req: FastifyRequest<{Body:SessionDto}>, reply: FastifyReply) {
		const auth: SessionDto = req.body;
		const result = await this.register.execute(this.fastify, auth);
		reply.send(result);
	}
}