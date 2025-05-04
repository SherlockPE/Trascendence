import { FloatingChatComponent } from './components/Floating/FloatingChatComponent';
import { Navigation } from './components/Navigation/Navigation';
import { ChatPage } from './pages/chat/chat';
import ChatView from './pages/chat/ChatView';
import { HomePage } from './pages/home/home';
import { LogInPage } from './pages/login/login';
import { mount } from './utils/component';
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute); // Ejecutar al cargar también

async function handleRoute() {
  const hash = window.location.hash;
  const env = await fetch('/env').then(res => res.json());
  if (env.env === 'production') {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated && hash !== '#login') {
      loadLoginPage();
      return;
    }
  }

  const chatContainer: HTMLElement = document.querySelector('#chat-container') as HTMLElement;
  if (chatContainer.childElementCount === 0) {
    loadChatContainer();
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

async function verifySession() {
  try {
    const response = await fetch('https://transcendence.42.fr/api/v1/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });

    return response.ok;
  } catch (error) {
    console.error('Error verifying session:', error);
    return false;
  }
}

function loadChatContainer() {

  const chatView = new ChatView();

  mount(chatView, '#chat-container');
}

function loadLoginPage() {
  const targetContainer:HTMLElement = document.querySelector('#header') as HTMLElement;
	while (targetContainer.firstChild) {
    targetContainer.removeChild(targetContainer.firstChild);
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