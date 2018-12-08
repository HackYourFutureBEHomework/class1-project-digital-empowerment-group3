const API_URL = 'http://localhost:4000';

export const logIn = (email, password) => {
	return fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),

		body: JSON.stringify({
			email: email,
			password: password
		})
	}).then((response) => response.json());
};
