var Area = 0;
function triangulize(sides_input) {
    var triangleType = '';
    var triangleBio = '';
    var sides = [];

    // ========= GET, FILTER AND LOAD FORM INPUTS
    for(var i in sides_input) {
        sides.push(parseInt(sides_input[i]));
    }
    sides.sort(function(a, b){ return a-b; });
    var a = sides[0];
    var b = sides[1];
    var c = sides[2];

    // ========== EVALUATE TRIANGLE TYPE
    if (a + b <= c) {
        triangleType = 'INCOMPATIBLE SIDES! TRI AGAIN!';
    } else if (a === b && a === c) {
        triangleType = 'EQUILATERAL! The lazy triangle!';
        triangleBio = "From Latin aequus latus (even sides), all sides match on equilateral triangle, possibly due to laziness.";
    } else if (a === b || a === c || b === c) {
        triangleType = 'ISOSCELES! Very sensible!';
        triangleBio = "From Greek isos (equal) and skelos (leg). Nice legs, isosceles! Nice and matching!";

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
        triangleBio = "Your triangle personna is Scalene!  You are very unstable and may even be obtuse at times.  At other times, you can be very acute. But you are always unpredictable!  Rock on, Scalene!";
    }

//============ BONUS OUTPUT
    var properties =[];
    var perim = a + b + c;
    var p = (a + b + c)/2;
    var area = Math.round(Math.sqrt(p*((p-a)*(p-b)*(p-c)))*1000)/1000;
    Area = area;
    properties.push(triangleType, perim, area, triangleBio, a, b, c);
    // *1000 /1000 is like lossy compression. End digits are rounded away.
    return properties;
}


//============
jQuery(document).ready(function() {
    $("#side1").focus();

    var canvas = $('#canvas')[0]; // or document.getElementById('canvas');

    $("#triangle-sides").submit(function(event) {
        var sides_input = document.getElementsByClassName( 'sides' ),
            sides  = [].map.call(sides_input, function( input ) {
                return input.value;
        });
        var properties = triangulize(sides);
        $(".triangleType").html(properties[0]);//TYPE
        $("#triangleSpec").html("<p>&#x25B5; Perimeter: " + properties[1] + "<p>&#x25B5; Area: " + properties[2] + "</p>");//glyphs + Area
        $("#triangleBio").html(properties[3]);//Description


    // ========== SET UP TRIANGLE VERTS
        var A = properties[4];
        var B = properties[5];
        var C = properties[6];


        var H = (2 * Area)/C;
        console.log(H);
        /*
        I THINK THIS IS THE PROBLEM
        Math.pow(base, 2) + Math.pow(height, 2) = Math.pow(hypot, 2);
        */





    // ==========SCALE TRIANGLE SIDES TO ~100
        if (C <= 100) {
            while (C < 100) {
                A *= 1.10;
                B *= 1.10;
                C *= 1.10;
                H *= 1.10;
            }
        } else if (C > 100) {
            while (C >100) {
                A /= 1.10;
                B /= 1.10;
                C /= 1.10;
                H /= 1.10;
            }
        }
    // =========== BOTTOM VERTICES
        var caX = 100 - Math.floor(C)/2;
        var caY = 125;
        //btm right
        var cbX = 100 + Math.floor(C)/2;
        var cbY = 125;

    // =========  PEAK
        /*  If the triangle is bisected at the peak, A/B & h are now known sides of a right triangle with sub-base c, which represents the horizontal distance from peak to the end of C.
        To determine sub-base c:  */
        var abX = 'mathy numbers';
        var abY = 125 - Math.floor(H); //'bottom' - height;

        if (B === C) {
          abX = 100;
        }
        else {
        // Pythag with B as hypot (B>A due to sorting):
        // H^2+C^2=B^2  = = = B^2-H^2=C^2
        var Csq = Math.pow(B, 2) - Math.pow(H, 2);
        var subC = Math.sqrt(Csq);
        abX = 100 - subC; // center - sub-base
        console.log(subC);

        }

    // ========== DRAW TRIANGLE ============
        if (canvas.getContext){
          var triPic = canvas.getContext('2d');
          triPic.beginPath();
          triPic.moveTo(caX, caY);// LEFT
          //SIDE C
          triPic.lineTo(cbX, cbY);// RIGHT
          //SIDE B
          triPic.lineTo(abX, abY);// TOP
          triPic.fillStyle="orange";
          triPic.fill();
        }


        $("#result").show();
        event.preventDefault();
    });
        // CSS SHAPE MEASUREMENTS (CSS OUTPUT INACCURATE
        // var sideA = Math.floor(A) + "px solid transparent";
        // var sideB = Math.floor(B) + "px solid transparent";
        // var sideC = Math.floor(C) + "px solid red";
        // $("#triangle-down").css({"width": 0, "height": 0, "border-left": sideA, "border-right": sideB, "border-bottom": sideC });
});
