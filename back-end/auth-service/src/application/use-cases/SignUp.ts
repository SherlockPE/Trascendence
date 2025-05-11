import { HandleException } from "../../domain/exception/HandleException";
import SessionDto from "../../domain/dto/SessionDto";
import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";
import UserRepositoryPort from "../ports/UserRepositoryPort";
import { FastifyInstance } from "fastify";


export default class SignUp {
	private userRepositoryPort: UserRepositoryPort;
	constructor(userRepositoryPort: UserRepositoryPort) {
		this.userRepositoryPort = userRepositoryPort;
	}

	async execute(fastify: FastifyInstance, newUser: SessionDto): Promise<UserDto> {

		const user = await this.userRepositoryPort.getUserById(newUser.username);
		if (user == null)
		{
			const hashedPsw = await fastify.bcrypt.hash(newUser.password);

			const userRegistered:UserDto = await this.userRepositoryPort.saveUser({
				id: newUser.username,
				name: newUser.name,
				password: hashedPsw,
				contacts: []
			});
			//TODO: notificar por sendEmail(); la validacion de email

			//TODO genero un JWT y lo devuelvo
			return userRegistered;
		} else {
			//En caso de que no exista devolver un error especifico para 400
			console.log("Ya existe el usuario");
			throw new HandleException("User already exists", 400, "Bad Request");
		}
	}
}