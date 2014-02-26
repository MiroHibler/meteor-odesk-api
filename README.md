# meteor-odesk-api

A Meteor wrapper for the oDesk API.


## Dependencies

 * Meteor v0.7.1+


## TL;DR;

_meteor-odesk-api_ exposes the oDesk API to your Meteor application.

Further information on the oDesk API and its features is available at [http://developers.odesk.com/API-Documentation](http://developers.odesk.com/API-Documentation).


## Installation

Install using [Meteorite](https://github.com/oortcloud/meteorite) - Installer & smart package manager for Meteor:

```sh
$ mrt add odesk-api
```


## API

_oDesk_ exposes the following methods **both on the server and the client**:

### `call( method, url, params, asyncCallback )`
**Perform an outbound HTTP request**

### `get( url, params, asyncCallback )`
**Send an HTTP GET request**

### `post( url, params, asyncCallback )`
**Send an HTTP POST request**

### `put( url, params, asyncCallback )`
**Send an HTTP PUT request**

### `del( url, params, asyncCallback )`
**Send an HTTP DELETE request**

 * `method` The HTTP method to use: "GET", "POST", "PUT", or "DELETE"
 * `url` The URL to retrieve
 * `params` Parameters to pass to the API method
 * `asyncCallback` Callback function for returned data or errors with two parameters. The first one being an error object which is null when no error occured, the second one an object with all information retrieved as long as no error occured.


Example:

```javascript
try {
	var odesk = new oDesk();
} catch ( error ) {
	console.log( error.message );
}

odesk.get( 'https://www.odesk.com/api/profiles/v2/search/jobs.json', { q: 'meteor' }, function ( error, result ) {
	if ( error )
		console.log( error.message );
	else
		console.log( JSON.stringify( result ) ); // Do something with your data!
});
```

## Changelog

### v0.1.0
 * Initial release

## Copyright and license

Copyright © 2014 [Miroslav Hibler](http://miro.hibler.me)

_meteor-odesk-api_ is licensed under the [**MIT**](http://miro.mit-license.org) license.
