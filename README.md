# postal.socket

## Version 0.1.0 UNSTABLE!
Seriously - this thing is so unstable it should have a negative version number.  Feel free to play with it, but keep tabs on this repo as I stabilize it.

## What is it?
postal.socket is a plugin for postal.js.  It wraps socket.io both in the browser and in node.js to connect two instances of postal - a client/browser instance and a server/node instance. The 'websocket' bridge can then be used by browser clients to subscribe to server-side postal channels, as well as publish remotely (publish on client, forward over the socket to the server).

## Dependencies
<table>
	<tr>
		<td style="padding-right:25px;">
			Browser
            <ul>
				<li>underscore.js</li>
				<li>socket.io</li>
				<li>postal.js</li>
				<li>machina.js</li>
			</ul>
		</td>
		<td>
			Node
			<ul>
				<li>underscore.js</li>
				<li>socket.io</li>
				<li>postal.js</li>
				<li>machina.js</li>
			</ul>
		</td>
	</tr>
</table>

## Quick and Dirty API
```javascript
// get a handle to a remote channel
// third arg with { type: "websocket" } tells postal to use the SocketChannel
// which the plugin registers under postal.channelTypes (normal default is LocalChannel)
var remoteChannel = postal.channel( "SomeChannel", "Some.Topic", { type: "websocket" });

// subscribe to the remote channel
var sub = remoteChannel.subscribe( function( data, env ) { console.log( JSON.stringify( env ) ); });

// publish locally and remotely
remoteChannel.publish({ greeting: "Oh, hai", moar: "This will get published locally and remotely" });
```

Currently postal.socket only enables remote channel functionality if you use an actual channel object (via `postal.channel`).  You cannot publish or subscribe over the socket using the shortcut `postal.subscribe` or `postal.publish` methods.  You *can*, however, publish to the socket connection directly by calling `postal.connections.socket.publish()`, passing in a valid postal envelope.  This will not publish locally, but only to the remote socket listener(s).  Hey, I *did* say it was experimental, didn't I?


## Roadmap
This plugin is proof-of-concept.  The focus has been on clients subscribing to server-side channels, with the ability to publish remotely as well.  However, no infrastructure is in place for
the server to subscribe to remote-client channels.  Now that I've proven the concept, this plugin will probably get a ground-up-rewrite to support two way subscription proxying and publishing.