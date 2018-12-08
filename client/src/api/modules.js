const API_URL = 'http://localhost:4000';

export const getModules = () => {
	return fetch(`${API_URL}/module`).then((response) => response.json());
};

export const createModule = (
	learningPath,
	title,
	title2,
	title3,
	title4,
	explanation,
	exercise,
	evaluation,
	completed
) => {
	return fetch(`${API_URL}/path/${learningPath}/module`, {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),

		body: JSON.stringify({
			title: title,
			title2: title2,
			title3: title3,
			title4: title4,
			explanation: explanation,
			exercise: exercise,
			evaluation: evaluation,
			completed: completed
		})
	}).then((response) => response.json());
};

export const deleteModule = (id) => {
	return fetch(`${API_URL}/module/${id}`, {
		method: 'DELETE'
	}).then((response) => response.json());
};

export const updateModule = (id, title, title2, title3, title4, explanation, exercise, evaluation, completed) => {
	return fetch(`${API_URL}/module/${id}`, {
		method: 'PATCH',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			title: title,
			title2: title2,
			title3: title3,
			explanation: explanation,
			exercise: exercise,
			evaluation: evaluation,
			completed: completed
		})
	}).then((response) => response.json());
};
