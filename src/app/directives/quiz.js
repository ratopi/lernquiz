angular.module( "lernquiz" )
	.directive(
	"quiz",
	[
		"quizService", "$location",
		function ( quizService, $location )
		{
			return {
				"restrict": "AE",
				"templateUrl": "app/dviews/quiz.html",
				"scope": {},
				"link": function ( scope, elem, attr )
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
						function ( choice )
						{
							choice.choosen = true;
							scope.showAnswer = true;
							scope.comment = choice.correct ? "Die Antwort war richtig!" : "Die Antwort war leider falsch!";
							scope.answerCorrect = choice.correct;

							scope.counts.total ++;
							if ( choice.correct ) scope.counts.correct ++;
						};

					// ---

					scope.next =
						function ()
						{
							quizService.nextQuestion(
								function ( data )
								{
									if ( data === null )
									{
										$location.url( "/" );
									}
									else
									{
										scope.showAnswer = false;
										scope.comment = "";
										scope.question = data.question;
										scope.image = data.image;
										scope.choices = data.choices;
									}
								}
							);
						};

					// --- start quiz by calling 'next'-function, when quizService is ready

					scope.next();
				}
			};
		}
	]
);
