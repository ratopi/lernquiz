angular.module( "lernquiz" )
.directive(
"quiz",
[
	"quizService",
	function ( quizService )
	{
		return {
			"restrict": "AE",
			"templateUrl": "dviews/quiz.html",
			"scope": {},
			"link":
				function (scope, elem, attr)
				{
					scope.question = "";
					scope.choices = [];
					scope.showAnswer = false;
					scope.comment = "";

					// ---

					scope.choosen =
						function( choice )
						{
							choice.choosen = true;
							scope.showAnswer = true;
							scope.comment = choice.correct ? "Die Antwort war richtig!" : "Die Antwort war leider falsch!";
						};

					// ---

					scope.next =
						function()
						{
							quizService.nextQuestion(
								function( data )
								{
									scope.showAnswer = false;
									scope.comment = "";
									scope.question = data.question;
									scope.choices = data.choices;
								}
							);
						};

					// ---

					scope.next();
				}
		};
	}
]
);
