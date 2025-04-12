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
		let { userId } = req.query;
		if (!req.headers['x-user-id'] && !userId) {
			console.log("No estas autorizado para conectarte, create una cuenta");
			connection.close();
			throw Error("No se tiene permiso para la conexion");
		}
		userId = req.headers['x-user-id']? req.headers['x-user-id'] : userId;
		console.log(userId);
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