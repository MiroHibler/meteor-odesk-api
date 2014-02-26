var Future = Npm.require( 'fibers/future' );

oDesk = function() {}


oDesk.prototype._handleData = function ( method, error, result, asyncCallback ) {
	if ( error ) {
		console.log( '[oDesk] ' + method + ' Error: ' + error.code + ' - ' + error.message );
	}
	if ( result.statusCode == 200 ) {
		asyncCallback( error, result.data );
	} else {
		console.log( '[oDesk] ' + method + ' Error: ' + result.headers['x-odesk-error-code'] + ' - ' + result.headers['x-odesk-error-message'] );
		asyncCallback( new Meteor.Error( result.headers['x-odesk-error-code'], result.headers['x-odesk-error-message'] ), undefined );
	}
}

oDesk.prototype._getOauthBinding = function() {
	var config = Accounts.loginServiceConfiguration.findOne({ service: 'odesk' });
	return new OAuth1Binding({
		consumerKey	: config.consumerKey,
		secret		: config.secret
	});
};

oDesk.prototype._getOauthBindingForCurrentUser = function() {
	var oauthBinding = this._getOauthBinding();

	var user = Meteor.user();
	oauthBinding.accessToken = user.services.odesk.accessToken;
	oauthBinding.accessTokenSecret = user.services.odesk.accessTokenSecret;

	return oauthBinding;
};


oDesk.prototype.call = function( method, url, params, asyncCallback ) {
	var _self = this;
	this._asyncAPI = this._getOauthBindingForCurrentUser();

	this._asyncAPI.call( method, url, params, function( error, result ) {
		_self._handleData( method, error, result, asyncCallback );
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
	this.call( 'DELETE', url, params, fasyncCallback );
}


Meteor.methods({
	'oDesk': function ( method, url, params, asyncCallback ) {
		try {
			var odesk = new oDesk();
		} catch ( error ) {
			throw new Meteor.Error( error.error, error.reason, error.details );
		}

		var future = new Future();
		odesk.call( method, url, params, function ( error, result ) {
			if ( error ) {
				// Pass the original oDeskAPI Error to the client
				future.throw( new Meteor.Error( error.code, error.message ) );
			} else {
				future.return( result );
			}
		});
		return future.wait();
	}
});
