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
