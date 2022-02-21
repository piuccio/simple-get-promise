import http from 'http';
import https from 'https';
import url from 'url';

export function get (path, module) {
	return request(normalize(path, 'get'), module);
}
export function post (path, module) {
	return request(normalize(path, 'post'), module);
}
export function put (path, module) {
	return request(normalize(path, 'put'), module);
}
export function patch (path, module) {
	return request(normalize(path, 'patch'), module);
}
export function head (path, module) {
	return request(normalize(path, 'head'), module);
}
export function del (path, module) {
	return request(normalize(path, 'delete'), module);
}

function normalize (path, defaultMethod) {
	let request = typeof path === 'string' ? url.parse(path) : path;
	if (request.url) {
		const originalUrl = request.url;
		delete request.url;
		request = Object.assign(url.parse(originalUrl), request);
	}
	request.method = (request.method || defaultMethod).toUpperCase();
	return request;
}

function request (obj, module = moduleFromProtocol(obj.protocol)) {
	return new Promise((resolve, reject) => {
		const body = obj.body;
		delete obj.body;

		const req = module.request(obj, res => {
			if (obj.encoding !== false) {
				res.setEncoding(obj.encoding || 'utf8');
			}
			const chunks = [];

			res.on('error', msg => {
				const error = new Error('Invalid request');
				error.responseText = msg;
				reject(error);
			});
			res.on('data', chunk => chunks.push(Buffer.from(chunk)));
			res.on('end', () => {
				const buffer = Buffer.concat(chunks);
				const responseText = buffer.toString();
				if (res.statusCode >= 200 && res.statusCode <= 299) {
					resolve(Object.assign({responseText, buffer}, res));
				} else {
					const error = new Error('Response error');
					error.responseCode = res.statusCode;
					error.responseText = responseText;
					reject(error);
				}
			});
		});

		if (body) {
			req.write(body);
		}
		req.end();
	});
}

function moduleFromProtocol (protocol) {
	return protocol === 'https:' ? https : http;
}

export function asJson (response) {
	try {
		return Promise.resolve(JSON.parse(response.responseText));
	} catch (ex) {
		const error = new Error('Invalid JSON response');
		error.responseText = response.responseText;
		return Promise.reject(error);
	}
}
