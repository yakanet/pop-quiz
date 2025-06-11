import { error, type Handle } from '@sveltejs/kit';
import * as auth              from '$lib/server/auth';
import { redirectLoginPage }  from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {

	if (!event.route.id) {
		return resolve(event);
	}

	const sessionToken = event.cookies.get(auth.sessionCookieName);
	if (event.route.id.startsWith('/(authenticated)/')) {
		if (!sessionToken) {
			redirectLoginPage();
		}
		const { session, user } = await auth.validateSessionToken(sessionToken);
		if (session) {
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} else {
			auth.deleteSessionTokenCookie(event);
		}
		if (!user) {
			redirectLoginPage();
		}
		if (!user.enabled) {
			error(403, 'Forbidden');
		}
		event.locals.user = user;
		event.locals.session = session;
	}

	if (event.route.id.startsWith('/(public)/')) {
		if (sessionToken) {
			const { session, user } = await auth.validateSessionToken(sessionToken);
			if (session) {
				auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
				event.locals.session = session;
				event.locals.user = user;
			} else {
				auth.deleteSessionTokenCookie(event);
			}
		}
	}

	return resolve(event);
};

export const handle: Handle = handleAuth;
