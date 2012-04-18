// Default implementation passes back undefined, which means
// the socket.io socket sessionid will be used....
postal.configuration.getSessionIdentifier = function( callback ) {
	callback( undefined );
};

postal.configuration.lastSessionId = null;

postal.getSubscribersFor = function() {
	var channel = arguments[ 0 ],
		tpc = arguments[ 1 ],
		result = [];
	if( arguments.length === 1 ) {
		if( Object.prototype.toString.call( channel ) === "[object String]" ) {
			channel = postal.configuration.DEFAULT_CHANNEL;
			tpc = arguments[ 0 ];
		}
		else {
			channel = arguments[ 0 ].channel || postal.configuration.DEFAULT_CHANNEL;
			tpc = arguments[ 0 ].topic;
		}
	}
	if( postal.configuration.bus.subscriptions[ channel ] &&
		postal.configuration.bus.subscriptions[ channel ].hasOwnProperty( tpc )) {
		result = postal.configuration.bus.subscriptions[ channel ][ tpc ];
	}
	return result;
};