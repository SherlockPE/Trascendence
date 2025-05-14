//mirar esto y modificarlo

import { buildApp } from '../../../src/app';
import { UserRepository } from '../../../src/infrastructure/rest/UserRepository';
import { UserDto } from '../../../src/domain/dto/User';
import { User } from '../../../src/domain/entities/User';
import authRoutes from '../../../src/interface/routes/AuthRoutes';
import { afterEach, beforeEach, describe, expect, it } from '../../../test/builder/test.builder';
import { FastifyInstance } from 'fastify';
import { HandleException } from '../../../src/domain/exception/HandleException';


class MockUserRepository implements UserRepository {
	fetchHashById(userID: string): Promise<string> {
		if (userID === '1')
			return Promise.resolve('$2a$12$N4H9M.e1h/bP.xxhvHXYu.hpCqOzcJqQBlH61MvDdW9yHdcTt7OOq' as unknown as string);
		return null;
	}

	getUserById(userId: string): Promise<User> {
		if (userId === '1')
			return Promise.resolve({
				id: "1",
				name: "string",
				contacts: [
					{
						sender_id: "string",
						receiver_id: "string"
					}
				]
			});
		return null;
	}
	getAllUsers(): Promise<User[]> {
		throw new Error('Method not implemented.');
	}
	addUser(user: User): Promise<UserDto> {
		return Promise.resolve({
			username: user.id,
			contacts: user.contacts
		} as unknown as UserDto);
	}
	updateUser(userId: string, updatedUser: User): Promise<void> {
		throw new Error('Method not implemented.');
	}
}

 
describe('auth signIn test', async () => {
	let app: FastifyInstance = null;

	await beforeEach(async () =>{
		app = await buildApp();
		
		app.register(authRoutes, new MockUserRepository());
		await app.ready();
	});

	await it('should return 401 for wrong password', async () => {

		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signin',
			payload: { username: '1', password: '12345' },
		});
		expect(response.statusCode).toBe(401);
		expect(response.json()).toEqual({
			error: 'Unauthorized',
			message: 'Password not match',
		});
	});
	await it('should return 200 for valid password', async () => {

		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signin',
			payload: { username: '1', password: '123456' },
		});
		expect(response.statusCode).toBe(200);
		expect(response.json().jwt).any(String)
	});
	await it('should return 401 for wrong username', async () => {

		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signin',
			payload: { username: 'oo20', password: '123456' },
		});
		expect(response.statusCode).toBe(401);
		console.log(response.json())
		expect(response.json()).toEqual({
			error: 'Unauthorized',
			message: 'User not found'
		})
	});
	await it("should return 500 for wrong body", async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signin',
			payload: { },
		});

		expect(response.statusCode).toBe(500);
		expect(response.json()).toEqual({
			error: 'Internal Server Error',
			message: 'body must have required property \'username\'',
		});

	});



	await afterEach(async ()=> {
		await app.close();
	});

});


describe('auth signUp test', async () => {
	let app: FastifyInstance = null;

	await beforeEach(async () =>{
		app = await buildApp();
		app.register(authRoutes, new MockUserRepository());
		await app.ready();
	});

	await it('should return 401 for exist username', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signup',
			payload: { username: '1', password: '12345' },
		});
		expect(response.statusCode).toBe(400);
		expect(response.json()).toEqual({
			error: "Bad Request",
			message: "User already exists"
		  });
	});

	await it('should return 200 for valid request', async () => {

		const response = await app.inject({
			method: 'POST',
			url: '/api/v1/auth/signup',
			payload: { username: 'non', password: 'non' },
		});
		console.log(response.json())
		expect(response.statusCode).toBe(200);
	});




	await afterEach(async ()=> {
		await app.close();
	});

});


