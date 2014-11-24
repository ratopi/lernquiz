angular.module( "lernquiz" )
.directive(
"quizAuswahl",
[
	"quizService",
	function ( quizService )
	{
		return {
			"restrict": "AE",
			"templateUrl": "dviews/quizAuswahl.html",
			"scope": {},
			"link":
				function (scope, elem, attr)
				{
					scope.quizes = [];

					quizService.getAvailableQuizes(
						function( data )
						{
							scope.quizes = data;
						}
					);

					// ---

					scope.toggle =
						function( quiz )
						{
							console.log( quiz );
							quiz.active = ! quiz.active;
						};
				}
		};
	}
]
);
