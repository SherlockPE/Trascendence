import {Connect} from "../data/Connect";

export class User {
    username: string;
    contacts?: Connect[];
	constructor(username: string, contacts?: Connect[]) {
		this.username = username;
		this.contacts = contacts;
	}

}