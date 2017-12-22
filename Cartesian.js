//=============================================================================
function Cartesian(aCanvas) {
  var canvas = aCanvas;
  var maxX = canvas.width / 2;
  var maxY = canvas.height / 2;
  var scale = maxX / 12;
  var ctx = canvas.getContext("2d");

  ctx.setTransform(1, 0, 0, 1, maxX, maxY);

  //-----------------------------------------------------------------------------
  _pointAt = function (x, y) {
    ctx.fillRect(x * scale -1, -y * scale -1, 3, 3);
  };

  //-----------------------------------------------------------------------------
  _moveTo = function (x, y) {
    ctx.moveTo(x * scale, -y * scale);
  };

  //-----------------------------------------------------------------------------
  _lineTo = function (x, y) {
    ctx.lineTo(x * scale, -y * scale);
  };

  //-----------------------------------------------------------------------------
  function _letterFor(point, prev, next) {
    if (!point.l)
      return;
    var xShift = 0;
    var yShift = 0;
    if (point.x < prev.x && point.x < next.x)
        xShift = -20;
    else if (point.x > prev.x && point.x > next.x)
      xShift = 3;
    else if (point.y < prev.y && point.y < next.y)
      yShift = 20;
    else if (point.y > prev.y && point.y > next.y)
      yShift = -3;

    // ctx.setTransform(1, 0, 0, 1, maxX, maxY);
    ctx.fillText(point.l, point.x * scale +xShift, -point.y * scale + yShift);
    // ctx.setTransform(1, 0, 0, -1, maxX, maxY);
  }

  //-----------------------------------------------------------------------------
  Cartesian.prototype.drawPlan = function() {
    // ctx.setTransform(1, 0, 0, -1, maxX, maxY);
    // ctx.setTransform(1, 0, 0, 1, maxX, maxY);
    ctx.lineWidth=0.2;
    ctx.moveTo(-maxX,0);
    ctx.lineTo(maxX,0);
    ctx.moveTo(0,maxY);
    ctx.lineTo(0,-maxY);
    ctx.stroke();
    _pointAt(0,0);
    ctx.font="18px Verdana";
    ctx.fillText("O",-20,20);
  };

  //-----------------------------------------------------------------------------
  Cartesian.prototype.drawMarks = function() {
    ctx.lineWidth=0.2;
    for (x = -(maxX / scale); x <= maxX / scale; x++ ) {
      _moveTo(x, 0.2);
      _lineTo(x,-0.2);
    }
    for (y = -(maxY / scale); y <= maxY / scale; y++ ) {
      _moveTo(0.2, y);
      _lineTo(-0.2, y);
    }
    ctx.stroke();
  };

  //-----------------------------------------------------------------------------
  Cartesian.prototype.drawPoint = _pointAt;

  // points = [ {x:x, y:y}, ...]
  //-----------------------------------------------------------------------------
  Cartesian.prototype.drawPolygon = function(points) {
    if (points.length < 3)
      return;
    ctx.lineWidth=1;
    ctx.beginPath();
    _moveTo(points[points.length - 1].x, points[points.length - 1].y);
    for (p = 0; p < points.length; p++) {
      _lineTo(points[p].x, points[p].y);
      var n = (p - 1) % (points.length - 1);
      _letterFor(points[p], points[(p + points.length - 1 - 1) % (points.length - 1)], points[(p + 1) % (points.length - 1)]);
    }
    _lineTo(points[0].x, points[0].y);
    ctx.stroke();
  };
}
