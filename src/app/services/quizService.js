angular.module( "lernquiz" )
.service(
"quizService",
[
	"$http",
	function ( $http )
	{
		var choiceCount = 5;

		var quizDef = [

			{
				"question": "Was ist die Hauptstadt von %?",
				"questions": [
					{ "text": "Baden-Württemberg", "answer": "Stuttgart" },
					{ "text": "Bayern", "answer": "München" },
					{ "text": "Berlin", "answer": "Berlin" },
					{ "text": "Brandenburg", "answer": "Potsdam" },
					{ "text": "Bremen", "answer": "Bremen" },
					{ "text": "Hamburg", "answer": "Hamburg" },
					{ "text": "Hessen", "answer": "Wiesbaden" },
					{ "text": "Mecklenburg-Vorpommern", "answer": "Schwerin" },
					{ "text": "Niedersachsen", "answer": "Hannover" },
					{ "text": "Nordrhein-Westfalen", "answer": "Düsseldorf" },
					{ "text": "Rheinland-Pfalz", "answer": "Mainz" },
					{ "text": "Saarland", "answer": "Saarbrücken" },
					{ "text": "Sachsen", "answer": "Dresden" },
					{ "text": "Sachsen-Anhalt", "answer": "Magdeburg" },
					{ "text": "Schleswig-Holstein", "answer": "Kiel" },
					{ "text": "Thüringen", "answer": "Erfurt" },
				]
			},

			{
				"question": "Von welchem Bundesland ist % die Hauptstadt?",
				"questions": [
					{ "answer": "Baden-Württemberg", "text": "Stuttgart" },
					{ "answer": "Bayern", "text": "München" },
					{ "answer": "Berlin", "text": "Berlin" },
					{ "answer": "Brandenburg", "text": "Potsdam" },
					{ "answer": "Bremen", "text": "Bremen" },
					{ "answer": "Hamburg", "text": "Hamburg" },
					{ "answer": "Hessen", "text": "Wiesbaden" },
					{ "answer": "Mecklenburg-Vorpommern", "text": "Schwerin" },
					{ "answer": "Niedersachsen", "text": "Hannover" },
					{ "answer": "Nordrhein-Westfalen", "text": "Düsseldorf" },
					{ "answer": "Rheinland-Pfalz", "text": "Mainz" },
					{ "answer": "Saarland", "text": "Saarbrücken" },
					{ "answer": "Sachsen", "text": "Dresden" },
					{ "answer": "Sachsen-Anhalt", "text": "Magdeburg" },
					{ "answer": "Schleswig-Holstein", "text": "Kiel" },
					{ "answer": "Thüringen", "text": "Erfurt" },
				]
			},

		];


		// ---

		var q = {};

		q.bundeslaenderUndHauptstaedte =
			function( fn )
			{
				var isIn =
					function( array, item )
					{
						for ( var idx in array ) { if ( item === array[ idx ].text ) return true; }
						return false;
					};


				var quiz = quizDef[ Math.floor( Math.random() * quizDef.length ) ];
				var n = Math.floor( Math.random() * quiz.questions.length );
				var q = quiz.questions[ n ];

				// --- add correct answer at beginnig

				var choices = [
					{ "text": q.answer, "correct": true }
				];

				// --- add some different random answers

				for ( var i = 1; i < choiceCount; i++ )
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

				var changeIndex = Math.floor( Math.random() * choiceCount );
				if ( changeIndex > 0 )
				{
                    var a = choices[ changeIndex ];
                    choices[ changeIndex ] = choices[ 0 ];
                    choices[ 0 ] = a;
				}

				// ---

				var o =
					{
						"question": quiz.question.replace( /%/, q.text ),
						"choices": choices
					};

				fn( o );
			};

		return q;
	}
]
);
