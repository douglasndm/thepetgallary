function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	} as const;

	const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(
		date
	);

	return formattedDate;
}

export { formatDate };
