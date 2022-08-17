const apiRoute = "https://chat-nation.herokuapp.com/api";

export const getRequest = async (route: string) => {
	const res: Response = await fetch(`${apiRoute}${route}`, {
		method: "GET",
		credentials: "include",
	});
	const data: any = await res.json();

	return data;
};

export const postRequest = async (route: string, bodyObject: any) => {
	const res: Response = await fetch(`${apiRoute}${route}`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(bodyObject),
	});
	const data: any = await res.json();

	return data;
};

export const putRequest = async (route: string, bodyObject: any) => {
	const res: Response = await fetch(`${apiRoute}${route}`, {
		method: "PUT",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(bodyObject),
	});
	const data: any = await res.json();

	return data;
};

export const deleteRequest = async (route: string, bodyObject: any) => {
	const res: Response = await fetch(`${apiRoute}${route}`, {
		method: "DELETE",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(bodyObject),
	});
	const data: any = await res.json();

	return data;
};
