import tap from 'tap';
import { get, asJson } from '../src/index';
import { EmitterJsonResponse, EmitterTextResponse } from './lib/emitters';

tap.test('Returns JSON as text', test => {
	test.plan(2);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterJsonResponse({ json: true }));
				}
			};
		}
	};

	return get('any', mock)
	.then(res => {
		test.equal(res.statusCode, 200);
		test.equal(res.responseText, '{"json":true}');
	});
});

tap.test('Fails if the response is not JSON', test => {
	test.plan(3);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterTextResponse('invalid json'));
				}
			};
		}
	};

	return get('any', mock)
	.then(asJson)
	.catch(error => {
		test.type(error, Error);
		test.match(error.message, /invalid json response/i);
		test.match(error.responseText, 'invalid json');
	});
});

tap.test('Convert plain text to valid JSON', test => {
	test.plan(1);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterJsonResponse({ json: true }));
				}
			};
		}
	};

	return get('any', mock)
	.then(asJson)
	.then(res => {
		test.deepEqual(res, { json: true });
	});
});
