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
					scope.startAllowed = false;

					quizService.getAvailableQuizes(
						function( data )
						{
							scope.quizes = data;
						}
					);


					var setStartAllowed =
						function()
						{
							scope.startAllowed = false;
							for ( var idx in scope.quizes )
							{
                                if ( scope.quizes[ idx ].active )
                                {
                                    scope.startAllowed = true;
                                    break;
                                }
							}
						};

					// ---

					scope.toggle =
						function( quiz )
						{
							quiz.active = ! quiz.active;
							setStartAllowed();
						};

					// ---

					setStartAllowed();
				}
		};
	}
]
);
