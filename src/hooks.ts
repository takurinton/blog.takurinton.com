import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, render }) => {
	const response = await render(request);
	return response;
};
