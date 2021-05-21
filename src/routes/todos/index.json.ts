import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET blog posts
export const get: RequestHandler<Locals> = async (req) => {
	const res = await api(req, `blog/v1/`);

	if (res.status === 404) {
		return { body: [] };
	}

	console.log(res.body)

	return res;
};

// POST /todos.json
export const post: RequestHandler<Locals, FormData> = async (request) => {
	const response = await api(request, `todos/${request.locals.userid}`, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		text: request.body.get('text')
	});

	return response;
};
