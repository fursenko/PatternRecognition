var data = null;
var Drawer = /** @class */ (function () {
    function Drawer(id) {
        this.ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(this.ns, 'svg');
        var container = document.getElementById(id);
        this.x = container.clientHeight;
        this.y = container.clientHeight;
        svg.setAttributeNS(null, 'width', this.x + "px");
        svg.setAttributeNS(null, 'height', this.y + "px");
        svg.setAttributeNS(null, 'viewBox', "0 0 " + this.x + " " + this.y);
        this.svg = svg;
        container.appendChild(svg);
    }
    Drawer.prototype.point = function (x, y, style) {
        if (style === void 0) { style = null; }
        var r = 3;
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
    Service.run = function (data) {
        var url = "http://localhost:28846/Point/run";
        var request = { data: data };
        return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    };
    return Service;
}());
window.onload = function () {
    var dr = new Drawer('container');
    document.getElementById('noise').addEventListener('click', function () { noise(dr); });
    document.getElementById('run').addEventListener('click', function () { run(dr); });
};
function run(dr) {
    Service.run(data).then(function (response) {
        response.json().then(function (data) {
            showResults(dr, data);
            // console.log(data);
        });
    });
}
function showResults(dr, data) {
    data.forEach(function (di) {
        for (var i = 1; i < di.data.length; i++) {
            var a = di.data[i - 1];
            var b = di.data[i];
            dr.point(a.x, a.y);
            dr.point(b.x, b.y);
            dr.line(a.x, a.y, b.x, b.y);
        }
    });
    // data.forEach(di => {
    //     // di.data.forEach(el => {
    //     //     dr.point(el.v.x, el.v.y);
    //     //     dr.point(el.w.x, el.w.y);
    //     //     dr.line(el.v.x as number
    //     //         , el.v.y as number
    //     //         , el.w.x as number
    //     //         , el.w.y as number);
    //     // });
    //     dr.point(di.data[0].x as number, di.data[0].y as number)
    //     for (let index = 1; index < di.data.length; index++) {
    //         const element = di.data[index];
    //         dr.point(di.data[index].x as number, di.data[index].y as number)
    //         dr.line(di.data[index - 1].x as number
    //             , di.data[index - 1].y as number
    //             , di.data[index].x as number
    //             , di.data[index].y as number)
    //     }
    // });
    // console.log(data);
}
function noise(dr) {
    Service.random(1000, dr.x, dr.y)
        .then(function (response) { return response.json().then((function (dt) {
        data = dt;
        dt.forEach(function (el) {
            dr.point(el.x, el.y);
        });
    })); });
}
