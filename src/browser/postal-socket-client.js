// import("VersionHeader.js");
(function( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "underscore", "machina", "postal" ], function( _, machina, postal ) {
			return factory( _, machina, postal, root, doc );
		});
	} else {
		// Browser globals
		factory( root._, root.machina, root.postal, root, doc );
	}
}(this, document, function( _, machina, postal, global, document, undefined ) {

	// import("config-mods.js");
	// import("socket-connection.js");
	// import("socket-channel.js");

}));