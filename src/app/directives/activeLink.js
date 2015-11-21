angular.module( "lernquiz" ).
	directive(
	"activeLink",
	[
		"$location",
		function ( location )
		{
			return {
				"restrict": "A",
				"link": function ( scope, element, attrs, controller )
				{
					var cssClass = attrs.activeLink;

					var path = attrs.href.substring( 1 ); // remove "#"; location is provided without "#"

					scope.location = location;

					scope.$watch(
						"location.path()",
						function ( newPath )
						{
							if ( path === newPath )
							{
								element.addClass( cssClass );
							}
							else
							{
								element.removeClass( cssClass );
							}
						}
					);
				}
			};
		}
	]
);
