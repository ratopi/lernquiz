
angular

.module( "lernquiz", [ "ngRoute" ] )

.config(
	[ "$routeProvider", "$httpProvider",
	function ($routeProvider, $httpProvider)
	{
		$routeProvider

			.when( "/start", { "templateUrl": "views/start.html" } )
			.when( "/quiz", { "templateUrl": "views/quiz.html" } )

			// Default ...
			.otherwise( { "redirectTo": "/start" } );
	}
	]
);
