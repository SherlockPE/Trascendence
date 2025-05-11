import SessionDto from "../../domain/dto/SessionDto";
import UserRepositoryPort from "../ports/UserRepositoryPort";
import { FastifyInstance } from "fastify";
import { HandleException } from "../../domain/exception/HandleException";

export default class LogIn {
	private userRepositoryPort: UserRepositoryPort;
	constructor(userRepositoryPort: UserRepositoryPort) {
		this.userRepositoryPort = userRepositoryPort;
	}
	/**
	 * @author Adrian Herrera
	 * @description Executes the login process by verifying the user's credentials.
	 * @param fastify Fastify instance
	 * @param session SessionDto object containing username and password
	 * @returns JWT token if login is successful
	 * @throws HandleException if login fails
	 */
	async execute(fastify: FastifyInstance, session: SessionDto): Promise<{jwt: string;}> {
		const hash:string = await this.userRepositoryPort.getHashById(session.username);
		if (hash != null)
		{
			const isMatch = await fastify.bcrypt.compare(session.password, hash);
			if (!isMatch)
				throw new HandleException("Password not match", 401, "Unauthorized");
			return {jwt:"JWT"}
		} else {
			throw new HandleException("User not found", 401, "Unauthorized");
		}
	}
}