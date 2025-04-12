import SessionDto from "../../domain/dto/SessionDto";
import { User } from "../../domain/entities/User";
import UserRepositoryPort from "../ports/UserRepositoryPort";


export default class LogIn {
	private userRepositoryPort: UserRepositoryPort;
	constructor(userRepositoryPort: UserRepositoryPort) {
		this.userRepositoryPort = userRepositoryPort;
	}
	
	async execute(session: SessionDto): Promise<{jwt: string;}> {
		const user:User = await this.userRepositoryPort.getUserById(session.username);
		if (user != null)
		{
			//TODO validar con BCrypt la contraseña
			session.password; 
			//TODO: notificar por sendEmail();

			//TODO genero un JWT y lo devuelvo
			return {jwt:"JWT"}
		} else {
			//En caso de que no exista devolver un error especifico para 400
			throw Error("No existe el usuario");
		}
	}
}