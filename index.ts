class Drawer {

    private svg: any;
    private ns: string;
    constructor(id: string) {
        this.ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(this.ns, 'svg');
        var container = document.getElementById(id);
        var x = container.clientWidth;
        var y = container.clientHeight;
        svg.setAttributeNS(null, 'viewBox', `0 0 ${x} ${y}`);
        this.svg = svg;
        container.appendChild(svg);
    }

    point(x: number, y: number) {
        const r = 5;
        var ce = document.createElementNS(this.ns, 'circle');
        ce.setAttributeNS(null, 'cx', x.toString());
        ce.setAttributeNS(null, 'cy', y.toString());
        ce.setAttributeNS(null, 'r', r.toString());
        this.svg.appendChild(ce);
    }

    line(x1: number,
        y1: number,
        x2: number,
        y2: number) {
        var le = document.createElementNS(this.ns, 'line');
        le.setAttributeNS(null, 'x1', x1.toString());
        le.setAttributeNS(null, 'y1', y1.toString());
        le.setAttributeNS(null, 'x2', x2.toString());
        le.setAttributeNS(null, 'y2', y2.toString());
        this.svg.appendChild(le);
    }
}

window.onload = () => {
    const dr = new Drawer('container');
    dr.point(50, 10);
    dr.point(50, 20);
    dr.point(50, 30);
    dr.point(50, 40);
    dr.line(50, 10, 50, 20);
}

