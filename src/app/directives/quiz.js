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

					scope.counts = {
						"total": 0,
						"correct": 0
					};

					// ---

					scope.choosen =
						function( choice )
						{
							choice.choosen = true;
							scope.showAnswer = true;
							scope.comment = choice.correct ? "Die Antwort war richtig!" : "Die Antwort war leider falsch!";

							scope.counts.total++;
							if ( choice.correct ) scope.counts.correct++;
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
