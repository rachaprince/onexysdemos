$( document ).ready(function() {

function init() {
 Draw() ;
}

var Canvas = document.getElementById('graph');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;

function MaxX() {
  return 10 ;
}

function MinX() {
  return -10 ;
}

function MaxY() {
  return MaxX() * Height / Width;
}

function MinY() {
   return MinX() * Height / Width;
}

function XC(x) {
  return (x - MinX()) / (MaxX() - MinX()) * Width ;
}

function YC(y) {
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height ;
}

function XTickDelta() {
  return 1 ;
}

function YTickDelta() {
  return 1 ;
}

 function Draw() {

 // Evaluate the user-supplied code, which must bind a value to F.
 var F = function(x) {
  return x*x ;
} ;
 
 if (Canvas.getContext) {
  
   // Set up the canvas:
   Ctx = Canvas.getContext('2d');
   Ctx.clearRect(0,0,Width,Height) ;

   // Draw:
   DrawAxes() ;
   RenderFunction(F) ;
  
  } else {
    // Do nothing.
  }
}

function DrawAxes() {
 Ctx.save() ;
 Ctx.lineWidth = 2 ;
 // +Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MaxY())) ;
 Ctx.stroke() ;

 // -Y axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(0),YC(MinY())) ;
 Ctx.stroke() ;

 // Y axis tick marks
 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) < MaxY() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;  
 }

 var delta = YTickDelta() ;
 for (var i = 1; (i * delta) > MinY() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
  Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
  Ctx.stroke() ;  
 }  

 // +X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MaxX()),YC(0)) ;
 Ctx.stroke() ;

 // -X axis
 Ctx.beginPath() ;
 Ctx.moveTo(XC(0),YC(0)) ;
 Ctx.lineTo(XC(MinX()),YC(0)) ;
 Ctx.stroke() ;

 // X tick marks
 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) < MaxX() ; ++i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;  
 }

 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) > MinX() ; --i) {
  Ctx.beginPath() ;
  Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  Ctx.stroke() ;  
 }
 Ctx.restore() ;
}

var XSTEP = (MaxX()-MinX())/Width ;

function RenderFunction(f) {
  var first = true;

  Ctx.beginPath() ;
  for (var x = MinX(); x <= MaxX(); x += XSTEP) {
   var y = f(x) ;
   if (first) {
    Ctx.moveTo(XC(x),YC(y)) ;
    first = false ;
   } else {
    Ctx.lineTo(XC(x),YC(y)) ;
   }
  }
  Ctx.stroke() ;
}

init();
});