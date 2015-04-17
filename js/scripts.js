function triangulize(sides_input) {
    var triangleType = '';
    var triangleBio = '';
    var sides = [];
    for(var i in sides_input) {
        sides.push(parseInt(sides_input[i]));
    }
    sides.sort(function(a, b){
        return a-b;
    });

    var a = parseInt(sides[0]);
    var b = parseInt(sides[1]);
    var c = parseInt(sides[2]);

    if (a + b <= c) {
        triangleType = 'INCOMPATIBLE SIDES! TRI AGAIN!';
    } else if (a === b && a === c) {
        triangleType = 'EQUILATERAL! The lazy triangle!';
        // triangleBio = "From Latin aequus (even) and latus (side). In geometry an equilateral triangle is one in which all sides are equal in length, possibly due to laziness.";
        triangleBio = "You just entered the same number 3 times.  From Latin aequus (middle) and terra (earth), this triangle has elven origins!";
    } else if (a === b || a === c || b === c) {
        triangleType = 'ISOSCELES! Very sensible!';
        // triangleBio = "From Greek isos (equal) and skelos (leg). Nice legs, isosceles!";
        triangleBio = "Named after a Greek philosopher (Isos) and his legs (skelos). Nice legs, Isos! Nice and matching!";

    } else if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
        if (a !== b){
        triangleType = 'A Right-Triangle!';
        triangleBio = "So named because if you toss one up in the air, it will always come down pointing towards the right.";

        } else {
            triangleType = 'The very rare Right-Isosceles Triangle!';
            triangleBio = "From Greek isos (equal) and skelos (leg). Nice legs, isosceles! Nice and matching!";
        }
    } else  {
        triangleType = 'SCALENE!';
        // triangleBio = "From the Indo-European root skel- (to cut). The Greek skalenos originally meant 'stirred up, hoed up'. A scalene triangle is uneven in the sense that all three sides are of different lengths...";
        triangleBio = "Your triangle personna is Scalene!  You are very unstable and may even be obtuse at times.  At other times, you can be very acute. But you are always unpredictable!  Rock on, Scalene!";
    }

    var properties =[];
    var perim = a + b + c;
    var p = (a + b + c)/2;
    var area = Math.round(Math.sqrt(p*((p-a)*(p-b)*(p-c)))*1000)/1000;
    properties.push(triangleType, perim, area, triangleBio, a, b, c);
    // *1000 /1000 is like lossy compression. End digits are rounded away.
    return properties;
}


jQuery(document).ready(function() {
    $("#side1").focus();
    // $("#triangleType").text('');

    $("#triangle-sides").submit(function(event) {

        var sides_input = document.getElementsByClassName( 'sides' ),
            sides  = [].map.call(sides_input, function( input ) {
                return input.value;
        });
        var properties = triangulize(sides);

        $(".triangleType").html(properties[0]);//type
        $("#triangleSpec").html("<p>&#x25B5; Perimeter: " + properties[1] + "<p>&#x25B5; Area: " + properties[2] + "</p>");//triangle glyphs, etc
        $("#triangleBio").html(properties[3]);//area

        var A = properties[4];
        var B = properties[5];
        var C = properties[6];
        if (C <= 100) {
            while (C < 100) {
                A *= 1.10;
                B *= 1.10;
                C *= 1.10;
            }
        } else if (C > 100) {
            while (C >100) {
                A /= 1.10;
                B /= 1.10;
                C /= 1.10;
            }
        }
        var sideA = Math.floor(A) + "px solid transparent";
        var sideB = Math.floor(B) + "px solid transparent";
        var sideC = Math.floor(C) + "px solid red";

        $("#triangle-down").css({"width": 0, "height": 0, "border-left": sideA, "border-right": sideB, "border-bottom": sideC });



        $("#result").show();
        event.preventDefault();
    });
});
