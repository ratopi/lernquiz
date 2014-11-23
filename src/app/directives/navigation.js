angular.module( "lernquiz" )
.directive(
"navigation",
[
	function ()
	{
		return {
			"restrict": "E",
			"templateUrl": "dviews/navigation.html",
			"scope": {},
			"link":
				function (scope, elem, attr)
				{
					scope.appInfo = {
						"shortname": "LernQuiz",
						"release": "0.1",
					};
				}
		};
	}
]
);
