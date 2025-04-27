import { HandleException } from "../../domain/exception/HandleException";
import { User } from "../../domain/entities/User";
import { SessionRepositoryPort } from "../ports/SessionRepositoryPort";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";
import { WebSocketUser } from "./ListenMessage";

export default class VerifyConnection {
	private userRepository: UserRepositoryPort;
	private sessionRepository: SessionRepositoryPort;
	constructor( userRepository: UserRepositoryPort, sessionRepository: SessionRepositoryPort) {
		this.userRepository = userRepository;
		this.sessionRepository = sessionRepository;
	}
	
	async execute(connection:any, req:any) {
        const decoded:{ user:string, roles: string[] } =  await req.jwtVerify();
		let userId = decoded.user;
		userId = req.headers['x-user-id']? req.headers['x-user-id'] : userId;
		if (!decoded.user) {
			connection.close();
			throw new HandleException("No estas autorizado para conectarte, create una cuenta", 401, "Unauthorized");
		}
		const user:User | undefined = await this.userRepository.getUserById(userId);
		if (!user) {
			console.log("No estas autorizado para conectarte, create una cuenta");
			connection.close();
			throw Error("No se tiene permiso para la conexion");
		}
		const wsUser:WebSocketUser = ({ user: user, websocket: connection });
		this.sessionRepository.saveSession(userId, wsUser);
		connection.send(JSON.stringify({ message: `Conexión establecida, userId: ${user.id}`}));
	}
}