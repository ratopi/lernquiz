angular.module( "lernquiz" )
	.directive(
	"navigation",
	[
		function ()
		{
			return {
				"restrict": "E",
				"templateUrl": "app/dviews/navigation.html",
				"scope": {},
				"link": function ( scope, elem, attr )
				{
					scope.appInfo = {
						"shortname": "LernQuiz",
						"release": "0.9-pre"
					};
				}
			};
		}
	]
);
