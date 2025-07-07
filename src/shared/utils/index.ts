export const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split(';')
	for (let cookie of cookies) {
		const [key, value] = cookie.trim().split('=')
		if (key === name) {
			return decodeURIComponent(value)
		}
	}
	return null
}

export const deleteCookie = (name: string) => {
	document.cookie = `${name}=; Max-Age=0; path=/`
}
