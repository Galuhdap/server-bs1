import { Response } from "express";

export function success  (payload:any, message:any, res:Response) {
	const datas = {
		success: true,
		statusCode: res.statusCode,
		message,
		payload,
	};
	res.json(datas);
	res.end();
};

export function statusTrue  (message:any, res:Response) {
	const datas = {
		success: true,
		statusCode: res.statusCode,
		message,
	};
	res.json(datas);
	res.end();
};

export function statusFalse  (message:any, res:Response) {
	const datas = {
		success: false,
		statusCode: res.statusCode,
		message,
	};
	res.json(datas);
	res.end();
};

function error (message:any, uri:any, statusCode:any, res:Response) {
	const data = {
		success: false,
		statusCode: statusCode,
		error: {
			message,
			uri,
		},
	};
	res.json(data);
	res.end();
};

export default error;

