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

    $("#triangle-sides").submit(function(event) {
        var sides_input = document.getElementsByClassName( 'sides' ),
            sides  = [].map.call(sides_input, function( input ) {
                return input.value;
        });
        var properties = triangulize(sides);
        $(".triangleType").html(properties[0]);//TYPE
        $("#triangleSpec").html("<p>&#x25B5; Perimeter: " + properties[1] + "<p>&#x25B5; Area: " + properties[2] + "</p>");//glyphs + Area
        $("#triangleBio").html(properties[3]);//Description


        var canvas = $('#canvas')[0]; // or document.getElementById('canvas');
        // canvas.width = canvas.width;
    // ==========SCALE TRIANGLE TO ~100
        var A = properties[4];
        var B = properties[5];
        var C = properties[6];
        var h = Area / (C/2);

        if (C <= 100) {
            while (C < 100) {
                A *= 1.10;
                B *= 1.10;
                C *= 1.10;
                h *= 1.10;
            }
        } else if (C > 100) {
            while (C >100) {
                A /= 1.10;
                B /= 1.10;
                C /= 1.10;
                h /= 1.10;
            }
        }

    // ========== DRAW TRIANGLE ============
        var acx = 150 - Math.floor(C)/2;
        console.log(acx);
        var acy = 175;
        var bcx = 150 + Math.floor(C)/2;
        console.log(bcx);
        var bcy = 175;
        var abx = 150;
        var aby = 150 - Math.floor(h); //bottom - height;
        console.log(aby);

        if (canvas.getContext){
          var triPic = canvas.getContext('2d');
          triPic.beginPath();
          triPic.moveTo(acx, acy);
          triPic.lineTo(bcx, bcy);
          triPic.lineTo(abx, aby);
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
