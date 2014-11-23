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

			{
				"question": "Welches Bundesland ist markiert?",
				"questions": [
					{ "answer": "Baden-Württemberg", "image": "images/baden-wuerttemberg.png" },
					{ "answer": "Bayern", "image": "images/bayern.png" },
					{ "answer": "Berlin", "image": "images/berlin.png" },
					{ "answer": "Brandenburg", "image": "images/brandenburg.png" },
					{ "answer": "Bremen", "image": "images/bremen.png" },
					{ "answer": "Hamburg", "image": "images/hamburg.png" },
					{ "answer": "Hessen", "image": "images/hessen.png" },
					{ "answer": "Mecklenburg-Vorpommern", "image": "images/mecklenburg-vorpommern.png" },
					{ "answer": "Niedersachsen", "image": "images/niedersachsen.png" },
					{ "answer": "Nordrhein-Westfalen", "image": "images/nordrhein-westfalen.png" },
					{ "answer": "Rheinland-Pfalz", "image": "images/rheinland-pfalz.png" },
					{ "answer": "Saarland", "image": "images/saarland.png" },
					{ "answer": "Sachsen", "image": "images/sachsen.png" },
					{ "answer": "Sachsen-Anhalt", "image": "images/sachsen-anhalt.png" },
					{ "answer": "Schleswig-Holstein", "image": "images/schleswig-holstein.png" },
					{ "answer": "Thüringen", "image": "images/thueringen.png" },
				]
			},

		];


		// ---

		var last = {
			quizIndex: -1,
			questionIndex: -1
		};

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

				var quiz, question;
				var quizIndex, questionIndex;

				do
				{
					quizIndex = Math.floor( Math.random() * quizDef.length );
					quiz = quizDef[ quizIndex ];
					questionIndex = Math.floor( Math.random() * quiz.questions.length );
					question = quiz.questions[ questionIndex ];
				}
				while ( quizIndex === last.quizIndex &&  questionIndex === last.questionIndex );

                last.quizIndex = quizIndex;
                last.questionIndex = questionIndex;

				// --- add correct answer at beginnig

				var choices = [
					{ "text": question.answer, "correct": true }
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
