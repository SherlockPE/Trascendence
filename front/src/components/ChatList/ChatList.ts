import { Component, ComponentProps } from '../../utils/component';
import { ChatItem } from '../ChatItem/ChatItem';

interface Chat {
  id: string;
  isGroupChat: boolean;
  titleGroup?: string;
  users: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  avatarUrl?: string;
}

interface ChatListProps extends ComponentProps {
  chats: Chat[];
  userId: string;
  activeChat?: string;
  onChatSelect: (chatId: string) => void;
}

export class ChatList extends Component {
  protected props: ChatListProps;
  private chatItems: ChatItem[] = [];

  constructor(props: ChatListProps) {
    super(props);
    this.props = props;
    
    this.template = `<div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-xl font-bold mb-4">Chats</h2>
      <ul id="chat-list" class="space-y-2"></ul>
    </div>`;
  }

  protected initEvents(): void {
    if (!this.element) return;
    
    const chatListElement = this.element.querySelector('#chat-list');
    if (!chatListElement) return;
    
    // Limpiar la lista primero
    chatListElement.innerHTML = '';
    this.chatItems = [];
    
    // Para cada chat, crear un componente ChatItem
    this.props.chats.forEach(chat => {
      // Determinar el título para mostrar
      const chatTitle = chat.isGroupChat 
        ? chat.titleGroup || 'Grupo sin nombre'
        : chat.users.filter((userId: string) => userId !== this.props.userId).join(', ');
      
      // Crear el ítem del chat
      const chatItem = new ChatItem({
        id: chat.id,
        title: chatTitle,
        isActive: this.props.activeChat === chat.id,
        isGroupChat: chat.isGroupChat,
        lastMessage: chat.lastMessage,
        lastMessageTime: chat.lastMessageTime,
        unreadCount: chat.unreadCount,
        avatarUrl: chat.avatarUrl,
        onClick: (id) => {
          // Actualizar el chat activo
          this.props.onChatSelect(id);
          
          // Actualizar visualmente qué chat está activo
          this.chatItems.forEach((item: ChatItem) => {
            item.update({ isActive: false });
          });
        }
      });
      
      // Guardar referencia al componente para actualizaciones posteriores
      this.chatItems.push(chatItem);
      
      // Crear un elemento de lista y agregar el componente renderizado
      const listItem = document.createElement('li');
      listItem.appendChild(chatItem.render());
      chatListElement.appendChild(listItem);
    });
  }
  
  // Actualizar toda la lista de chats
  public updateChats(chats: Chat[], activeChat?: string): void {
    this.update({
      chats,
      activeChat: activeChat || this.props.activeChat
    });
  }
}

