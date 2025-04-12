import SessionDto from "../../domain/dto/SessionDto";
import { UserDto } from "../../domain/dto/User";
import { User } from "../../domain/entities/User";
import UserRepositoryPort from "../ports/UserRepositoryPort";


export default class SignUp {
	private userRepositoryPort: UserRepositoryPort;
	constructor(userRepositoryPort: UserRepositoryPort) {
		this.userRepositoryPort = userRepositoryPort;
	}
	
	async execute(newUser: SessionDto): Promise<UserDto> {
		const user:User = await this.userRepositoryPort.getUserById(newUser.username);
		if (user == null)
		{
			//TODO creo con BCrypt para la password
			newUser.password; 
			
			const userRegistered:User = await this.userRepositoryPort.saveUser({
				id:newUser.username,
				name:newUser.name,
				password: newUser.password,
				contacts: []
			});
			//TODO: notificar por sendEmail(); la validacion de email

			//TODO genero un JWT y lo devuelvo
			return userRegistered;
		} else {
			//En caso de que no exista devolver un error especifico para 400
			throw Error("No existe el usuario");
		}
	}
}