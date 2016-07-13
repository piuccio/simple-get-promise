import tap from 'tap';
import { get } from '../src/index';
import { EmitterError, EmitterNotFound, EmitterTextResponse } from './lib/emitters';

tap.test('Fails if there is a stream error', test => {
	test.plan(3);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterError());
				}
			};
		}
	};

	return get('any', mock)
	.catch(error => {
		test.type(error, Error);
		test.match(error.message, /invalid request/i);
		test.match(error.responseText, /stream error/i);
	});
});

tap.test('Fails if the response is not 200', test => {
	test.plan(3);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterNotFound());
				}
			};
		}
	};

	return get('any', mock)
	.catch(error => {
		test.type(error, Error);
		test.match(error.message, /response error/i);
		test.match(error.responseText, /not found/i);
	});
});

tap.test('Returns response and response text correctly', test => {
	test.plan(2);

	const mock = {
		request (request, cb) {
			return {
				end () {
					cb(new EmitterTextResponse('my response'));
				}
			};
		}
	};

	return get('any', mock)
	.then(res => {
		test.equal(res.statusCode, 200);
		test.equal(res.responseText, 'my response');
	});
});
