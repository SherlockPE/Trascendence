import { FloatingChatComponent } from "../../components/Floating/FloatingChatComponent";
import FloatingChatListComponent from "../../components/Floating/FloatingContactsComponent";
import { Chat } from "../../data/Chat";
import { Component, mount } from "../../utils/component";

export default class ChatView extends Component {
  private socket: WebSocket | undefined;
  private activeChat: string | null = null;
  private userId: number = 3;

  constructor() {
    super();
    this.template = this.renderTemplate();
  }

  renderTemplate() {
    return `
	<div class="fixed bottom-4 right-4 flex flex-row items-end gap-2 z-50">
	<!-- Cards de chat (máximo 3, horizontal) -->
		<div id="chats-floating" class="flex gap-2 items-end bottom-4 max-w-[calc(100vw-2rem)]  overflow-x-auto"></div>
		<div id="contacts-floating" >
		</div>

	</div>
		`;
  }
  protected initEvents(): void {
    if (!this.element) return;
    this.socket = new WebSocket(
      "wss://transcendence.42.fr/api/v1/chats/connect-ws?userId=3"
    );
    this.socket.addEventListener("open", () => {
      console.log("Conexión WebSocket abierta");
    });

    this.socket.addEventListener("message", this.handleMessage.bind(this));

    this.loadChats();
  }

  private handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (this.element === null) return;

    // Verificar si el mensaje pertenece al chat activo
    if (this.activeChat === data.chatId) {
      const chatBox = this.element.querySelector("#chat-box");
      if (chatBox) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = data.message;
        chatBox.appendChild(messageDiv);

        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar el chat hacia abajo
      }
    }
  }

  private async loadChats() {
    try {
      let chats: Chat[] = [
        {
          id: "1",
          active: true,
          titleGroup: "Chat 3",
          isGroupChat: true,
          users: ["1", "3", "2"],
          messages: [
            { chatId: "3", content: { text: "Hola" }, sender_id: "2" },
            {
              chatId: "3",
              content: { text: "Adrian! ¿Todavia estas en casa?" },
              sender_id: "3",
            },
          ],
        },
        {
          id: "2",
          active: false,
          titleGroup: "New Group",
          isGroupChat: false,
          users: ["1", "3"],
          messages: [
            {
              chatId: "2",
              content: { text: "Hola, ¿cómo estás?" },
              sender_id: "1",
            },
            {
              chatId: "2",
              content: { text: "Bien, desarrollando un proyecto, tu?" },
              sender_id: "3",
            },
          ],
        },
      ];
      let res: any;
      const env = await fetch("/env").then((res) => res.json());
      if (env.env === "prduction") {
        res = (await fetch("https://transcendence.42.fr/api/v1/chats/user/3", {
          method: "GET",
          credentials: "include",
        })) as Response;
        chats = await res.json();
      }
      if (env.env === "development" || res.status === 200) {
        if (chats.length > 0) {
          const chatContainer = this.element?.querySelector(
            "#chats-floating"
          ) as HTMLElement;
          for (let i = 0; i < chats.length; i++) {
            if (chats[i].active) {
              const chatItemComponent = new FloatingChatComponent({
				id: "chat-"+chats[i].id,
                title: "Chat",
                messages: chats[i].messages,
                owner: "3",
                onSendMessage: (message: string) => {},
              });
              chatContainer.appendChild(chatItemComponent.render());
            }
          }
        }
        const listContainer = this.element?.querySelector(
          "#contacts-floating"
        ) as HTMLElement;
        const listItemComponent = new FloatingChatListComponent({
          chats: chats,
          owner: "3",
          onClick: (id: string) => {
			const chatItem = chats.find((chat) => chat.id === id);
			if (!chatItem) return;
			if(this.element?.querySelector(`#chat-${id}`)) return;
            const chatItemComponent = new FloatingChatComponent({
				id: "chat-"+chatItem.id,
              title: chatItem?.titleGroup || "Chat",
              messages: chatItem?.messages,
              owner: "3",
              onSendMessage: (message: string) => {},
            });
            const chatContainer = this.element?.querySelector(
              "#chats-floating"
            ) as HTMLElement;
            chatContainer.appendChild(chatItemComponent.render());
          },
        });
        listContainer.appendChild(listItemComponent.render());
      }
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  }
}
