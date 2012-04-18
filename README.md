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

## Roadmap
This plugin is proof-of-concept.  The focus has been on clients subscribing to server-side channels, with the ability to publish remotely as well.  However, no infrastructure is in place for
the server to subscribe to remote-client channels.  Now that I've proven the concept, this plugin will probably get a ground-up-rewrite to support two way subscription proxying and publishing.