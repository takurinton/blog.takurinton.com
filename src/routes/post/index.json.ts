import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET blog posts
export const get: RequestHandler<Locals> = async (req) => {
	const res = await api(req, `/blog/v1/`);

	if (res.status === 404) {
		return { body: [] };
	}

	console.log(res.body)

	return res;
};