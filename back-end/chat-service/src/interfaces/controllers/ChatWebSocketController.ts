import { ListenMessage } from "../../application/use-cases/ListenMessage";
import VerifyConnection from "../../application/use-cases/VerifyConnection";
import CloseSession from "../../application/use-cases/CloseSession";

export class ChatWebSocketController {
    private listenMessage: ListenMessage;
    private closeSession: CloseSession;
    private verifyConnection: VerifyConnection;
    
    constructor(listenMessage :ListenMessage, closeSession: CloseSession, verifyConnection: VerifyConnection) {
        this.listenMessage = listenMessage;
        this.closeSession = closeSession;
        this.verifyConnection = verifyConnection;
    }

    async handleConnection(connection: any, req: any) {
        try {
            await this.verifyConnection.execute(connection, req);

            await this.listenMessage.execute(connection, req);

        } catch (error) {
            console.error("Error en la conexión WebSocket:", error);
            connection.send(JSON.stringify({ error: "Error al obtener mensajes" }));
            connection.close();
        } finally {
            this.closeSession.execute(connection, req);
        }
    }

}
