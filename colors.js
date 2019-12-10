
function hslToRGB(hsl) {

  function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) { color = 0; }
    return color;
  }

  /*
      function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      }
      */

  var h = hsl.h,
    s = hsl.s,
    l = hsl.l,
    c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r, g, b;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  r = normalize_rgb_value(r, m);
  g = normalize_rgb_value(g, m);
  b = normalize_rgb_value(b, m);


  // console.log(rgbToHex(r,g,b));
  // return rgbToHex(r, g, b);
  // var rh = `00${Number(r).toString(16)}`.slice(-2);
  // var rg = `00${Number(h).toString(16)}`.slice(-2);
  // var rb = `00${Number(b).toString(16)}`.slice(-2);
  // var hex = `#${rh}${rg}${rb}`;
  // return hex; 
  return { r: r, g: g, b: b };
}

 

window.onload = function() {

  document.body.style.padding = 0;
  document.body.style.margin = 0;

  // var colors = [ 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'white' ];

  var table = document.createElement('table');
  table.style.border = 'none';
  table.style.width = '100%';
  table.style.height = '100%';
  document.body.appendChild(table);

  var rows = 24;
  var cols = 24;
  var cells = new Array(cols*rows);
  for(var i=0;i<rows;i++) {
    var row = document.createElement('tr');
    row.style.width = '100%';
    // row.style.height = `${100/rows}%`; // '10%';
    table.appendChild(row);
    for(var j=0;j<cols;j++) {
      var cell = document.createElement('td');
      cell.style.border = 'none';
      cell.style.backgroundColor = 'black';
      cell.style.width = `${Math.floor(100/cols)}%`; // '10%';
      cell.style.height = `${Math.floor(100/rows)}%`; // '10%';
      row.appendChild(cell);
      cells[rows*i+j] = cell;
    }
  }



  var a = 0;
  var beta = 50;
  var gamma = 10;

  function anim() {
    var hh = a;
    a = (a + 1) % 360;

    beta = Math.cos(a*Math.PI/180) * 30;
    gamma = Math.sin(a*Math.PI/180) * 60;
    // gamma = (gamma + 2) % 360;
    // var ss = 0.8;
    // var ll = 0.5;

    for(var i=0;i<rows;i++) {
      // hh = (hh + i) % 360:
      for(var j=0;j<cols;j++) {
        // hh = (hh+1) % 360;
        var ss = 0.5 + (i*360.0/rows)/180.0;
        var ll = 0.5; // (j*360.0/cols)/360.0;

        hh = (a + (i/rows)*beta + (j/cols)*gamma) % 360;
        // ss = ss * i/rows * j/cols;
        // console.log(hh);
        var col = hslToRGB({h:hh, l:ll, s:ss});
        var rgb = `rgb(${col.r},${col.g},${col.b})`;
        // console.log(rgb);
        cells[rows*i+j].style.backgroundColor = rgb;
      }
    }

    var af = requestAnimationFrame(anim);
  }
  anim();

  /*
  var a = 0;
  setInterval(function() {
    var hh = a;
    a = (a + 2) % 360;

    for(var i=0;i<rows;i++) {
      for(var j=0;j<cols;j++) {
        var ss = 0.5+ (i*360.0/rows)/180.0;
        var ll = (j*360.0/cols)/720.0;
        // hh = (hh+2) % 360;
        // console.log(hh);
        var col = hslToRGB({h:hh, l:ll, s:ss});
        var rgb = `rgb(${col.r},${col.g},${col.b})`;
        // console.log(rgb);
        cells[rows*i+j].style.backgroundColor = rgb;
      }
    }
  }, 300);
  */
}
