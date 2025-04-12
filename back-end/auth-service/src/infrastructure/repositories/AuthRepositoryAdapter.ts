import AuthRepositoryPort from "../../application/ports/AuthRepositoryPort";
import SessionDto from "../../domain/dto/SessionDto";


export default class AuthRepositoryAdapter implements AuthRepositoryPort {

	login(session: SessionDto): SessionDto {
		
		throw new Error("Method not implemented.");
	}
	logout(session: SessionDto): SessionDto {
		throw new Error("Method not implemented.");
	}
} 