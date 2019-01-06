Simple modern way to make http requests. Supports HTTPS, ES6, JSON and Promises.

### Simple GET

```js
import { get } from 'simple-get-promise';

get('http://example.com')
.then(res => {
	// res contains
	// - res.statusCode
	// - res.responseText
})
.catch(error => {
	// Errors if connection fails or status code is not 2xx or 3xx
	// You can get the response in error.responseText
});
```

### POST, PUT, HEAD ...

```js
import { post, put, head } from 'simple-get-promise';

post({
	url: 'http://example.com',
	body: 'some body'
})
.then(res => {
	// res contains
	// - res.statusCode
	// - res.responseText
})
.catch(error => {
	// Errors if connection fails or status code is not 2xx or 3xx
	// You can get the response in error.responseText
});
```

Because `delete` is a reserved keyword, you can either use `del` or

```js
import { get, del } from 'simple-get-promise';

del('http://example.com');
// or
get({
	url: 'http://example.com',
	method: 'delete'
});
```

### Advanced requests

```js
import { get } from 'simple-get-promise';

get({
	url: 'http://example.com',
	headers: {
		'X-Random-Header': 'hello'
	}
})
.then(res => {
	// res contains
	// - res.statusCode
	// - res.responseText
})
.catch(error => {
	// Errors if connection fails or status code is not 2xx or 3xx
	// You can get the response in error.responseText
});
```

#### Basic Authentication

```js
import { get } from 'simple-get-promise';

get({
	url: 'http://example.com',
	auth: 'user:password'
})
```

#### Character encoding

By default responses are handled as UTF-8, if you're dealing with other types of encodings you can specify the value in the request object

```js
import { get } from 'simple-get-promise';

get({
	url: 'http://example.com',
	encoding: 'latin1',
});
```

Node.js supports only a [handful of encodings](https://github.com/nodejs/node/blob/master/lib/buffer.js), if the one you needed is not available you can set `encoding: false` and handle the response directly as binary.

```js
import { get } from 'simple-get-promise';
import iconv from 'iconv-lite';

const { buffer } = await get({
	url: 'http://example.com',
	encoding: false,
});
console.log(iconv.decode(buffer, 'Shift_JIS'));
```


### JSON

Extract the message and signature from the cookie.

```js
import { get, asJson } from 'simple-get-promise';

get('http://example.com')
.then(asJson)
.then(json => {
	// json is JSON object
})
.catch(error => {
	// Errors if connection fails or status code is not 2xx or 3xx or valid JSON
	// You can get the response in error.responseText
});
```
