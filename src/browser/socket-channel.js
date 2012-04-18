var SocketChannel = postal.channelTypes.websocket = function( channelName, defaultTopic ) {
	var channel = postal.channel( channelName, defaultTopic ),
		localSubscribe = channel.subscribe,
		localPublish = channel.publish,
		localTopic = channel.topic;

	channel.publish = function() {
		postalSocket.publish( localPublish.apply( channel, arguments) );
	};

	channel.subscribe = function() {
		var sub = localSubscribe.apply( channel, arguments),
			origUnsubscribe;
		origUnsubscribe = sub.unsubscribe;
		sub.unsubscribe = function() {
			origUnsubscribe.call(sub);
			postalSocket.unsubscribe({ channel: sub.channel, topic: sub.topic });
		};
		postalSocket.subscribe({ channel: sub.channel, topic: sub.topic });
		return sub;
	};

	channel.topic = function( topic ) {
		if(topic === channel._topic) {
			return this;
		}
		return new SocketChannel(this.channel, topic);
	};

	return channel;
};