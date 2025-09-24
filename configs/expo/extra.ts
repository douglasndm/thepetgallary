interface extra {
	[k: string]: any;
}

const configs: extra = {
	API_URL_DOG: process.env.API_URL_DOG ?? '',
	API_URL_CAT: process.env.API_URL_CAT ?? '',

	SENTRY_DSN: process.env.SENTRY_DSN ?? '',

	// Android
	ANDROID_UPLOAD_STORE_PASSWORD:
		process.env.ANDROID_UPLOAD_STORE_PASSWORD ?? '',
	ANDROID_UPLOAD_KEY_PASSWORD: process.env.ANDROID_UPLOAD_KEY_PASSWORD ?? '',

	APPCHECK_DEBUG_TOKEN_ANDROID:
		process.env.APPCHECK_DEBUG_TOKEN_ANDROID ?? '',
	APPCHECK_DEBUG_TOKEN_IOS: process.env.APPCHECK_DEBUG_TOKEN_IOS ?? '',

	GOOGLE_CLIENT_ID_ANDROID: process.env.GOOGLE_CLIENT_ID_ANDROID ?? '',
	GOOGLE_REVERSED_CLIENT_ID_IOS:
		process.env.GOOGLE_REVERSED_CLIENT_ID_IOS ?? '',
};

export default configs;
