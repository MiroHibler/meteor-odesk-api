oDesk = function() {};


oDesk.prototype.call = function( method, url, params, asyncCallback ) {
	Meteor.call( 'oDesk', method, url, params, function ( error, result ) {
		asyncCallback( error, result );
	});
}


oDesk.prototype.get = function( url, params, asyncCallback ) {
	this.call( 'GET', url, params, asyncCallback );
}

oDesk.prototype.post = function( url, params, asyncCallback ) {
	this.call( 'POST', url, params, asyncCallback );
}

oDesk.prototype.put = function( url, params, asyncCallback ) {
	this.call( 'PUT', url, params, asyncCallback );
}

oDesk.prototype.del = function( url, params, asyncCallback ) {
	this.call( 'DELETE', url, params, asyncCallback );
}
