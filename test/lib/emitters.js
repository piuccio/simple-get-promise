import EventEmitter from 'events';

class BaseEmitter extends EventEmitter {
	constructor () {
		super();
		this.setEncoding = () => {};
	}
}
export class EmitterError extends BaseEmitter {
	constructor () {
		super();
		process.nextTick(() => this.emit('error', 'Stream error'));
	}
}
export class EmitterNotFound extends BaseEmitter {
	constructor () {
		super();
		this.statusCode = 404;
		process.nextTick(() => {
			this.emit('data', 'Not Found');
			this.emit('end');
		});
	}
}
export class EmitterTextResponse extends BaseEmitter {
	constructor (text) {
		super();
		this.statusCode = 200;
		process.nextTick(() => {
			this.emit('data', text);
			this.emit('end');
		});
	}
}
export class EmitterJsonResponse extends BaseEmitter {
	constructor (json) {
		super();
		this.statusCode = 200;
		process.nextTick(() => {
			const response = JSON.stringify(json);
			this.emit('data', response.slice(0, 2));
			this.emit('data', response.slice(2));
			this.emit('end');
		});
	}
}
