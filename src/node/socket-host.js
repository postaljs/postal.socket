var PostalSocketHost = function( postal, socketProvider ) {
	var self = this;

	// if enableMigration === true, then clients are allowed to migrate
	// from an older session id to a new one.  This can happen when the
	// client's connection is lost, but the old session id is kept around
	// in memory or local storage, etc.  When the client reconnects, it
	// will transmit the current and previous (if applicable) session ids.
	// If this is set to true, then the migration will take place - which
	// includes transferring existing subscriptions, as well as the delivery
	// of messages sent to the old session id proxy after the client lost
	// connection.
	self.enableMigration = true;


	self.channel = postal.channel("postal.socket", "client.connect");

	// array of clients - confirmed or not
	self.clients = [];

	// once a client has been marked as "identified", they are added to
	// this object, with the session id as the key.
	self.clientMap = {};

	// how to clean up a client
	self.removeClient = function( id ) {
		if( self.clientMap[ id ] ) {
			_.each( self.clientMap[ id ].subscriptions, function( channel ){
				_.each( channel, function( sub ){
					console.log("unsubscribing: " + sub.channel + " - " + sub.topic);
					sub.unsubscribe();
				});
			});
			delete self.clientMap[ id ];
		}
		self.clients = _.filter(self.clients, function( item ) {
			return item.sessionId !== id;
		});
	};


	self.provider = socketProvider;

	// when our provider indicates a new socket has connected, we pass
	// the socket wrapper to an fsm (RemoteClientProxy) to be managed by it.
	self.provider.on( "connect", function( socket ) {
		self.clients.push( new RemoteClientProxy( postal, socket, self ) );
	});

	// when a client disconnects, if enableMigration is true, we don't delete
	// the old session until it has been used in a migration
	self.channel.subscribe("client.disconnect", function ( data, envelope ){
		if( !self.enableMigration ) {
			self.removeClient( data.sessionId );
		}
	});

	// if a session has been used in a migration and is no longer needed, remove it
	self.channel.subscribe("client.migrated", function ( data, envelope ){
		self.removeClient( data.lastSessionId );
	});
};