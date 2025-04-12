import { WebSocketUser } from "../../application/use-cases/ListenMessage";

class SessionSingleton  {
	private static instance: SessionSingleton = null;
	private sessions: Map<string, WebSocketUser> = new Map();

	private constructor() {}

	public static  getInstance(): SessionSingleton {
		if (!this.instance) {
			this.instance = new SessionSingleton();
		}
		return this.instance;
	}
	public async addSession(userId: string, wsUser: WebSocketUser): Promise<WebSocketUser> {
		this.sessions.set(userId, wsUser);
		console.log("Session UserId: "+ this.sessions.get(userId).user.id);
		return wsUser;
	}

	public async deleteSessionByUserId(userId: string) {
		this.sessions.delete(userId);
		return ;
	}
	public async getWSUserById(userId: string): Promise<WebSocketUser> {
		const wsUser:WebSocketUser = this.sessions.get(userId);
		if (wsUser)
			return wsUser;
		throw Error("No existe el usuario "+userId+" en la conexion");
	}

	 async getAllSession(): Promise<WebSocketUser[]> {
		let response:WebSocketUser[] = []; 
		this.sessions.forEach((session: WebSocketUser) => {
			response.push(session);
		});
		return response;
	}

}

export default SessionSingleton;
