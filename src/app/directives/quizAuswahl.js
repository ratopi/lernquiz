angular.module( "lernquiz" )
	.directive(
	"quizAuswahl",
	[
		"quizService",
		function ( quizService )
		{
			return {
				"restrict": "AE",
				"templateUrl": "app/dviews/quizAuswahl.html",
				"scope": {},
				"link": function ( scope, elem, attr )
				{
					scope.quizes = [];
					scope.startAllowed = false;
					scope.loading = true;

					var setStartAllowed =
						function ()
						{
							scope.loading = false;
							scope.startAllowed = false;
							for ( var idx in scope.quizes )
							{
								if ( scope.quizes.hasOwnProperty( idx ) && scope.quizes[ idx ].active )
								{
									scope.startAllowed = true;
									break;
								}
							}
						};

					// ---

					quizService.getAvailableQuizes(
						function ( quizes, levels, level )
						{
							scope.quizes = quizes;
							scope.levels = levels;
							scope.level = level;

							setStartAllowed();
						}
					);

					// ---

					scope.toggle =
						function ( quiz )
						{
							quiz.active = ! quiz.active;
							setStartAllowed();
						};

					// ---

					scope.setLevel =
						function ()
						{
							quizService.setLevel( scope.level );
						}
				}
			};
		}
	]
);
