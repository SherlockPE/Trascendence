import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Navigation } from '../../components/Navigation/Navigation';
import { Component } from '../../utils/component';


export class LogInPage extends Component {
  constructor() {
	super();
	this.template = `
	  <div class="container mx-auto">
		<h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
		<form id="login-form" class="space-y-4">
		  <div>
			<label for="username" class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
			<input type="text" id="username" name="username" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nombre de usuario">
		  </div>
		  <div>
			<label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
			<input type="password" id="password" name="password" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Contraseña">
		  </div>
		  <button type="submit" id="login-button" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Iniciar Sesión</button>
		</form>
	  </div>`;
  }

  protected initEvents(): void {
	if (!this.element) return;

	const loginForm = this.element.querySelector('#login-form') as HTMLFormElement;
	const loginButton = this.element.querySelector('#login-button') as HTMLButtonElement;

	if (loginForm && loginButton) {
	  loginForm.addEventListener('submit', this.handleLogin.bind(this));
	}
  }

  private async handleLogin(event: Event): Promise<void> {
	event.preventDefault(); // Prevenir el envío del formulario por defecto
	const formData = new FormData(event.target as HTMLFormElement);
	const username = formData.get('username') as string;
	const password = formData.get('password') as string;
	const loginData = { username, password };

	const response = await fetch('https://transcendence.42.fr/api/v1/auth/signin', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(loginData),
	  credentials: 'include', // Incluir cookies en la solicitud
	});
	if (response.ok) {
		const data = await response.json();
		console.log('Inicio de sesión exitoso:', data);
		//Todo: Redirigir a la página de inicio o chat
		window.location.hash = '#home';
		
	}
}
	
}