Package.describe({
	summary: 'A Meteor wrapper for oDesk API'
});

Package.on_use( function ( api ) {

	api.use( 'oauth1', 'server' );

	api.add_files( 'lib/server/odesk-api.js', 'server' );

	api.add_files( 'lib/client/odesk-api.js', 'client' );

	if ( api.export ) {
		api.export( 'oDesk', ['server', 'client'] );
	}
});
