import { SessionRepositoryPort } from "../ports/SessionRepositoryPort";


export default class CloseSession {
	private sessionRepository: SessionRepositoryPort;
		constructor(sessionRepository: SessionRepositoryPort) {
			this.sessionRepository = sessionRepository;
		}
	
		async execute(connection:any, req:any): Promise<void> {
			connection.on('close', () => {
				this.sessionRepository.deleteSessionById(req.headers['x-user-id']);
				connection.close();
			});
		};
}