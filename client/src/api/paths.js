const API_URL = 'http://localhost:4000';

export const getPaths = () => {
	return fetch(`${API_URL}/path`).then((response) => response.json());
};
export const getPath = (id) => {
	return fetch(`${API_URL}/path/${id}`).then((response) => response.json());
};

export const createPaths = (pathTitle) => {
	return fetch(`${API_URL}/path`, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),

		body: JSON.stringify({
			pathTitle: pathTitle
		})
	}).then((response) => response.json());
};

export const deletePath = (id) => {
	return fetch(`${API_URL}/path/${id}`, {
		method: 'DELETE'
	}).then((response) => response.json());
};

export const updatePathTitle = (id, pathTitle) => {
	return fetch(`${API_URL}/path/${id}`, {
		method: 'PATCH',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			pathTitle: pathTitle
		})
	}).then((response) => response.json());
};