var Drawer = /** @class */ (function () {
    function Drawer(id) {
        this.ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(this.ns, 'svg');
        var container = document.getElementById(id);
        this.x = container.clientWidth;
        this.y = container.clientHeight;
        svg.setAttributeNS(null, 'width', this.x + "px");
        svg.setAttributeNS(null, 'height', this.y + "px");
        svg.setAttributeNS(null, 'viewBox', "0 0 " + this.x + " " + this.y);
        this.svg = svg;
        container.appendChild(svg);
    }
    Drawer.prototype.point = function (x, y, style) {
        if (style === void 0) { style = null; }
        var r = 5;
        var ce = document.createElementNS(this.ns, 'circle');
        ce.setAttributeNS(null, 'cx', x.toString());
        ce.setAttributeNS(null, 'cy', y.toString());
        ce.setAttributeNS(null, 'r', r.toString());
        if (style != null)
            ce.classList.add(style);
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
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.random = function (n, x, y) {
        var url = "http://localhost:28846/Point/random?n=" + n + "&x=" + x + "&y=" + y;
        return fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    };
    Service.run = function (n, x, y, data) {
        var url = "http://localhost:28846/Point/run";
        var request = { n: n, x: x, y: y, data: data };
        return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    };
    return Service;
}());
window.onload = function () {
    var dr = new Drawer('container');
    document.getElementById('noise').addEventListener('click', function () { noise(dr); });
    document.getElementById('run').addEventListener('click', function () { run(dr); });
};
// {
//     "n": 1,
//     "x": 31,
//     "y": 65456,
//     "data": [
//       {
//         "x": 654,
//         "y": 654
//       }
//     ]
//   }
function run(dr) {
    Service.run(100, dr.x, dr.y, [{ x: 10, y: 10 }]).then(function (response) {
        response.json().then(function (data) {
            showResults(dr, data);
        });
    });
}
function showResults(dr, data) {
    data.forEach(function (el) {
        dr.point(el.x, el.y, 'result');
    });
}
function noise(dr) {
    Service.random(100, dr.x, dr.y)
        .then(function (response) { return response.json().then((function (data) {
        data.forEach(function (el) {
            dr.point(el.x, el.y);
        });
    })); });
}
