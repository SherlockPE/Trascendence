import { Chat } from "../../data/Chat";
import { Component, ComponentProps } from "../../utils/component";

interface ItemChatProps extends ComponentProps {
	name: string;
	lastMessage: string;
	avatar?: string;
	online?: boolean;
	onClick: () => void;
}

class ChatItemComponent extends Component {
	protected props: ItemChatProps;
  constructor(props: ItemChatProps) {
	super(props);
	this.props = props;
	this.template = this.renderTemplate();
  }

  renderTemplate() {
	const statusClass = this.props.online ? 'bg-green-500' : 'bg-red-500';

	return `
	<div class="flex justify-center w-full"> 
      <div class="flex w-full max-w-md overflow-hidden min-w-0 items-center space-x-3 py-3 px-4 hover:bg-white hover:bg-opacity-5 cursor-pointer">
      <div class="flex-shrink-0">
        <img src="${this.props.avatar}" alt="${this.props.name}" class="w-7 h-7 rounded-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-white font-regular text-sm">${this.props.name}</p>
        <p 
		class="text-gray-400 text-xs font-ligth truncate"
		>${this.props.lastMessage}</p>
      </div>
      <div class="flex-shrink-0 self-center">
        <div class="w-1.5 h-1.5 aspect-square rounded-full ${statusClass}"></div>
      </div>
    </div></div>
	`;
	}

	protected initEvents(): void {
		if (!this.element) return;
		

		this.element.addEventListener("click", () => {
			this.props.onClick();
		});
	}
}

interface FloatingChatListProps extends ComponentProps {
  chats?: Chat[];
  owner?: string;
  onClick?: (chatId: string) => void;
}
export default class FloatingChatListComponent extends Component{
	protected props: FloatingChatListProps;
  constructor(props: FloatingChatListProps) {
	super(props);
	this.props = props;
	this.template = this.renderTemplate();
  }

  renderTemplate() {
	return `
<div class="backdrop-blur-3xl bg-opacity-15 shadow-black shadow-xl bg-[#1D1F2B] bottom-4 right-4 w-[18rem] min-h-[33rem] border border-white border-opacity-15 rounded-2xl  flex flex-col overflow-hidden z-50">
  <!-- Encabezado -->
  <div class="relative flex p-4 border-b border-white items-center border-opacity-10">
		<div> 
			<h2 class="text-white text-sm font-ligth">Mensajes</h2>

		</div>
		<div id="chat-close" class="absolute center right-2 cursor-pointer text-sm text-gray-400 hover:text-gray-200">
			
		</div>
  </div>
  
  <!-- Barra de búsqueda -->
  <div class="px-5 py-3">
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-400 text-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input type="text" placeholder="Search..." class="w-full bg-[#1D1F2B] bg-opacity-10 text-sm text-gray-200 rounded-lg py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-gray-500">
    </div>
  </div>
  
  <!-- Lista de mensajes -->
  <div class="items-center px-5 pb-3"> 
  <div id="chat-list" class="h-fit w-full overflow-y-auto mb-4 rounded-2xl bg-white bg-opacity-10">
</div>
</div>
	`;
  }

	protected initEvents(): void {
		if (!this.element) return;
		const chatList = this.element.querySelector('#chat-list') as HTMLElement;
		const chatLength = this.props.chats?.length || 0;
		this.props.chats?.forEach((chat, index) => {
			const chatItem = new ChatItemComponent({
				name: chat.titleGroup,//TODO: get name from user id
				lastMessage: chat.messages[chat.messages.length - 1].content.text,
				avatar: `/api/placeholder/40/40`,
				online: true,
				onClick: () => {
					this.props.onClick?.(chat.id);
				},
			});
			chatList.appendChild(chatItem.render());
			if (index < chatLength - 1) {
				const hr = document.createElement('hr') as HTMLElement;
				hr.classList.add('border-t', 'border-white', 'border-opacity-15');
				chatList.appendChild(hr);
			}
		});
	}
}