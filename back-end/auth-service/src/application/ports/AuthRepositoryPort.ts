import SessionDto from "../../domain/dto/SessionDto";


export default interface AuthRepositoryPort {
	saveLogin(session:SessionDto): SessionDto;
}