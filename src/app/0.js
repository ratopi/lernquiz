angular
	.module( "lernquiz", [ "ngRoute" ] )
	.config(
	[
		"$routeProvider", "$httpProvider",
		function ( $routeProvider, $httpProvider )
		{
			$routeProvider

				.when( "/", { "templateUrl": "app/views/start.html" } )
				.when( "/quiz", { "templateUrl": "app/views/quiz.html" } )

				// Default ...
				.otherwise( { "redirectTo": "/" } );
		}
	]
);
