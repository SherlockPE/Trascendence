import { fetchUser } from './auth';
import { FloatingChatComponent } from './components/Floating/FloatingChatComponent';
import { Navigation } from './components/Navigation/Navigation';
import { User } from './data/User';
import { UserJwt } from './data/UserJwt';
import { ChatPage } from './pages/chat/chat';
import ChatView from './pages/chat/ChatView';
import { HomePage } from './pages/home/home';
import { LogInPage } from './pages/login/login';
import { mount } from './utils/component';
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute); // Ejecutar al cargar también

async function handleRoute() {
  let user: UserJwt | null = {
    user: '3'
  };
  
  const hash = window.location.hash;
  const env = await fetch('/env').then(res => res.json());
  if (env.env === 'production') {
    user = await fetchUser();
    console.log('user', user);
    if (!user && hash !== '#login') {
      loadLoginPage();
      return;
    }
  }

  const chatContainer: HTMLElement = document.querySelector('#chat-container') as HTMLElement;
  if (chatContainer.childElementCount === 0) {
    loadChatContainer(user?.user || '3');
  }
  switch (hash) {
    case '#game':
    case '#stats':
    case '#prfile':
    default:
      loadHomePage();
      break;
  }
}

function loadChatContainer(userId: string) {

  const chatView = new ChatView(userId);

  mount(chatView, '#chat-container');
}

function loadLoginPage() {
  const headerContainer:HTMLElement = document.querySelector('#header') as HTMLElement;
	while (headerContainer.firstChild) {
    headerContainer.removeChild(headerContainer.firstChild);
  }
  const chatContainer:HTMLElement = document.querySelector('#chat-container') as HTMLElement;
	while (chatContainer.firstChild) {
    chatContainer.removeChild(chatContainer.firstChild);
  }
  const loginPage = new LogInPage();
  mount(loginPage, '#app');
  
}
function loadHomePage() {
  const homePage = new HomePage();
  const navbar = new Navigation(
    {
      items: [
        { text: 'Home', url: '#home', active: true },
        { text: 'Game', url: '#game' },
        { text: 'Stats', url: '#stats' },
        { text: 'Profile', url: '#profile' }
      ],
    }
  );

  mount(navbar, '#header');
  const targetContainer:HTMLElement = document.querySelector('#app') as HTMLElement;
	while (targetContainer.firstChild) {
    targetContainer.removeChild(targetContainer.firstChild);
  }
}