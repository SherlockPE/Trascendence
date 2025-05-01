import { ChatPage } from './pages/chat/chat';
import { HomePage } from './pages/home/home';
import { LogInPage } from './pages/login/login';
import { mount } from './utils/component';

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute); // Ejecutar al cargar también

async function handleRoute() {
  const hash = window.location.hash;
  const isAuthenticated = await verifySession();
  if (!isAuthenticated && hash !== '#login') {
    loadLoginPage();
    return;
  }

  switch (hash) {
    case '#chat':
      loadChatPage();
      break;
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
function loadChatPage() {
  const app = document.querySelector('#app');
  const chatPage = new ChatPage();
  mount(chatPage, '#app');
}

function loadLoginPage() {
  const app = document.querySelector('#app');
  const loginPage = new LogInPage();
  mount(loginPage, '#app');
}
function loadHomePage() {
  const app = document.querySelector('#app');
  const homePage = new HomePage();
  mount(homePage, '#app');
}