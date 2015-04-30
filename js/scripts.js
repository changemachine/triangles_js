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
        triangleType = 'EQUILATERAL!';
        triangleBio = "From Latin aequus latus (even sides), all sides match on equilateral triangles, possibly because you were lazy and just typed the same number 3 times.";
    }
    else if (Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) {
      if ( a === b) {
          triangleType = 'The very rare Right-Isosceles Triangle!';
          triangleBio = "You, my friend, are a triangle wizard!  The very rare Right-Isosceles Triangle is hard to find since it is never an integer-triangle (based on whole-number-sides.  From Greek isos (equal) and skelos (leg). Nice legs, isosceles! Nice and matching!";
      } else {
          triangleType = 'A Right-Triangle!';
          triangleBio = "So named because if you toss one up in the air, it will always come down pointing towards the right.  Bonus points if you can figure out how to score an Isosceles Right Triangle.  I'm not sure they really exist.";
        }
    }
    else if (a === b || a === c || b === c) {
        triangleType = 'ISOSCELES! Very sensible!';
        triangleBio = "From Greek isos (equal) and skelos (leg). Nice legs, isosceles! Nice and matching!";
    }

    else  {
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

    var canvas = document.getElementById('canvas'); //$('#canvas')[0];
    var canvasContext = canvas.getContext('2d');

    $("#triangle-sides").submit(function(event) {
      //clear canvas
      canvasContext.clearRect ( 0 , 0 , canvas.width, canvas.height );
      var sides_input = document.getElementsByClassName( 'sides' ),
          sides  = [].map.call(sides_input, function( input ) {
              return input.value;
      });
      var properties = triangulize(sides);
      $(".triangleType").html("<h4 class='well'>"+properties[0]+"</h4>");//TYPE
      $("#triangleSpec").html("<p>&#x25B5; Perimeter: " + properties[1] + "<p>&#x25B5; Area: " + properties[2] + "</p>");//glyphs + Area
      $("#triangleBio").html(properties[3]);//Description


    // ========== SET UP TRIANGLE VERTS
      var A = properties[4];
      var B = properties[5];
      var C = properties[6];

      // var H = (2 * Area)/C; WRONG
      // Area = 1/2 base * H
      //Area = C/2 * H
      var H = Area/(C/2);
      console.log('H = '+ H);


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
      var subCsq = Math.pow(B, 2) - Math.pow(H, 2);
      var subC = Math.sqrt(subCsq);
      abX = 100 - subC; //POSITION FROM CENTER
      // console.log('subC = '+ subC);
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
