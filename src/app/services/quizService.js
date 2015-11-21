angular.module( "lernquiz" )
.service(
"quizService",
[
	"$http",
	function ( $http )
	{
		var levels = [
			{ "name": "simpel", "choiceCount": 3 },
			{ "name": "leicht", "choiceCount": 4 },
			{ "name": "moderat", "choiceCount": 5 },
			{ "name": "schwierig", "choiceCount": 7 },
		];

		var level = levels[ 2 ];

		var quizDef = [];

		var loadCount = 10000;

		var readyCallbacks = [];

		$http
			.get( "quiz/0.json" )
			.success(
				function( data )
				{
					loadCount = data.quizes.length;

					for ( var idx in data.quizes )
					{
						quizDef.push( { "loading": true } );

						(
							function( idx )
							{
								$http
									.get( "quiz/" + data.quizes[ idx ] )
									.success(
										function( data )
										{
											data.active = false;
											quizDef[ idx ] = data;
											loadCount--;
											if ( loadCount === 0 )
											{
												for ( var j in readyCallbacks ) readyCallbacks[ j ]();
												readyCallbacks = null;
											}
										}
									);
							}
						)( idx );
					}
				}
			);

		var registerReadyCallback =
			function( fn )
			{
				loadCount === 0 ? fn() : readyCallbacks.push( fn );
			};

		var noQuizIsActive =
			function()
			{
				for ( var idx in quizDef )
				{
					if ( quizDef[ idx ].active )
					{
						return false;
					}
				}

				return true;
			};

		// ---

		var last = {
			quizIndex: -1,
			questionIndex: -1
		};

		// ---

		var q = {};

		// ---

		q.getLevelsOfDifficulty =
			function()
			{
				return difficultyLevels;
			};

		q.setLevelOfDifficulty =
			function( n )
			{
			};

		// ---

		q.getAvailableQuizes =
			function( fn )
			{
				if ( loadCount > 0 )
				{
					registerReadyCallback( function() { q.getAvailableQuizes( fn ); } );
				}
				else
				{
					fn( quizDef ); // TODO
				}
			};

		// ---

		q.nextQuestion =
			function( fn )
			{
				if ( loadCount > 0 )
				{
					registerReadyCallback( function() { q.nextQuestion( fn ); } );
					return;
				}


				// ---

				if ( noQuizIsActive() )
				{
					fn( null );
					return;
				}

				// ---

				var isIn =
					function( array, item )
					{
						for ( var idx in array ) { if ( item === array[ idx ].text ) return true; }
						return false;
					};

				var quiz, question;
				var quizIndex, questionIndex;

				do
				{
					quizIndex = Math.floor( Math.random() * quizDef.length );
					quiz = quizDef[ quizIndex ];
					questionIndex = Math.floor( Math.random() * quiz.questions.length );
					question = quiz.questions[ questionIndex ];
				}
				while ( ! quiz.active  || ( quizIndex === last.quizIndex  &&  questionIndex === last.questionIndex ) );

				last.quizIndex = quizIndex;
				last.questionIndex = questionIndex;

				// --- add correct answer at beginnig

				var choices = [
					{ "text": question.answer, "correct": true }
				];

				// --- add some different random answers

				for ( var i = 1; i < level.choiceCount; i++ )
				{
					var answer;
					do
					{
						answer = quiz.questions[ Math.floor( Math.random() * quiz.questions.length ) ].answer;
					}
					while ( isIn( choices, answer ) );

					choices.push(
						{ "text": answer, "correct": false }
					);
				}

				// --- now shuffle correct answer to random position

				var changeIndex = Math.floor( Math.random() * level.choiceCount );
				if ( changeIndex > 0 )
				{
					var a = choices[ changeIndex ];
					choices[ changeIndex ] = choices[ 0 ];
					choices[ 0 ] = a;
				}

				// ---

				var o =
					{
						"question": quiz.question.replace( /%/, question.text ),
						"image": question.image,
						"choices": choices
					};

				fn( o );
			};

		return q;
	}
]
);
