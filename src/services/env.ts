import Constants from 'expo-constants';

type Extra = Record<string, string | undefined>;

const extra = (Constants.expoConfig?.extra ?? {}) as Extra;

/**
 * Gets an environment variable by its key.
 * If the variable is not defined, throws an error.
 *
 * @param {string} key - The key of the environment variable.
 * @returns {string} The value of the environment variable.
 * @throws {Error} If the environment variable is not defined.
 */
function getEnvVar(key: string): string {
	const value = extra[key];
	if (!value) {
		throw new Error(`Missing env variable: ${key}`);
	}
	return value;
}

// Proxy para acessar como env.API_URL etc.
export const env = new Proxy(extra, {
	get: (_, key: string) => getEnvVar(key),
}) as Record<string, string>;

export default env;
