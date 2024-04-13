//@ts-ignore
const baseURL = import.meta.env.PROD
	? "https://diary-backend-957k.onrender.com"
	: "http://localhost:3333";

export const makeFetch = {
	async get(url: string) {
		try {
			const token = window.localStorage.getItem("token");

			const response = await fetch(baseURL + url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					...(!!token && { Authorization: `Bearer ${token}` }),
				},
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}
			if (!data) throw new Error("data is not defined");

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error("Fetch error:", error.message);
				throw new Error(error.message);
			}
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async post(url: string, body: { [key in string]: any }) {
		try {
			const token = window.localStorage.getItem("token");

			const response = await fetch(baseURL + url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...(!!token && { Authorization: `Bearer ${token}` }),
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error("Fetch error:", error.message);
				throw new Error(error.message);
			}
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async patch(url: string, body: { [key in string]: any }) {
		try {
			const token = window.localStorage.getItem("token");

			const response = await fetch(baseURL + url, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					...(!!token && { Authorization: `Bearer ${token}` }),
				},
				body: JSON.stringify(body),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message);
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				console.error("Fetch error:", error.message);
				throw new Error(error.message);
			}
		}
	},
};

// Использование
// makeFetch
// 	.get("/auth/getme", "your-token-here")
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error(error));

// makeFetch
// 	.post("/tasks/send", [1, 2, 4, 3], "your-token-here")
// 	.then((data) => console.log(data))
// 	.catch((error) => console.error(error));
