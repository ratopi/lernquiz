
angular

.module( "lernquiz", [ "ngRoute" ] )

.value(
	"config",
	{
		"root": window.location.href.replace( /\/_design\/.*/, "" ),
		"idlen": 8
	}
)

.run(
	[ "$rootScope",
	function ($rootScope)
	{
		$rootScope.$on(
			"$locationChangeSuccess",
			function (event, next, current)
			{
			}
		);
	}
	]
)

.config(
	[ "$routeProvider", "$httpProvider",
	function ($routeProvider, $httpProvider)
	{
		$routeProvider

			.when( "/start", { "templateUrl": "views/start.html" } )

			// Default ...
			.otherwise( { "redirectTo": "/start" } );
	}
	]
);
