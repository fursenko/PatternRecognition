// <circle cx="50" cy="80" r="0.5" />
// <circle cx="50" cy="20" r="0.5" />
// <line x1="50" y1="80" x2="50" y2="20" />
// class Line {
//     constructor(public x1: number, public y1: number, public x2: number, public y2: number) {
//     }
// }
var Drawer = /** @class */ (function () {
    function Drawer(id) {
        this.ns = 'http://www.w3.org/2000/svg';
        // this.field = document.getElementById(field);
        var svg = document.createElementNS(this.ns, 'svg');
        // viewBox="0 0 100 100"
        var container = document.getElementById(id);
        var x = container.clientWidth;
        var y = container.clientHeight;
        svg.setAttributeNS(null, 'viewBox', "0 0 " + x + " " + y);
        this.svg = svg;
        container.appendChild(svg);
    }
    Drawer.prototype.point = function (x, y) {
        var r = 5;
        var ce = document.createElementNS(this.ns, 'circle');
        ce.setAttributeNS(null, 'cx', x.toString());
        ce.setAttributeNS(null, 'cy', y.toString());
        ce.setAttributeNS(null, 'r', r.toString());
        this.svg.appendChild(ce);
    };
    Drawer.prototype.line = function (x1, y1, x2, y2) {
        var le = document.createElementNS(this.ns, 'line');
        le.setAttributeNS(null, 'x1', x1.toString());
        le.setAttributeNS(null, 'y1', y1.toString());
        le.setAttributeNS(null, 'x2', x2.toString());
        le.setAttributeNS(null, 'y2', y2.toString());
        this.svg.appendChild(le);
    };
    return Drawer;
}());
window.onload = function () {
    var dr = new Drawer('container');
    dr.point(50, 10);
    dr.point(50, 20);
    dr.point(50, 30);
    dr.point(50, 40);
    dr.line(50, 10, 50, 20);
};
