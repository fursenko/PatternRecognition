var data: any = null;

class Drawer {

    private svg: any;
    private ns: string;
    public x: number;
    public y: number;
    constructor(id: string) {
        this.ns = 'http://www.w3.org/2000/svg';
        var svg = document.createElementNS(this.ns, 'svg');
        var container = document.getElementById(id);
        this.x = container.clientHeight;
        // console.log(this.x);
        this.y = container.clientHeight;
        // console.log(this.y);
        svg.setAttributeNS(null, 'width', `${this.x}px`);
        svg.setAttributeNS(null, 'height', `${this.y}px`);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.x} ${this.y}`);
        this.svg = svg;
        container.appendChild(svg);
    }

    point(x: number, y: number, style: string = null) {
        const r = 5;
        var ce = document.createElementNS(this.ns, 'circle');
        ce.setAttributeNS(null, 'cx', x.toString());
        ce.setAttributeNS(null, 'cy', y.toString());
        ce.setAttributeNS(null, 'r', r.toString());
        if (style != null)
            ce.classList.add(style);
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

class Service {
    public static random(n: number, x: number, y: number): Promise<any> {
        const url = `http://localhost:28846/Point/random?n=${n}&x=${x}&y=${y}`;
        return fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    }

    public static run(n: number, x: number, y: number, data: Array<{ x: number, y: number }>): Promise<any> {
        const url = `http://localhost:28846/Point/run`;
        const request = { n: n, x: x, y: y, data: data };
        return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request) });
    }
}

window.onload = () => {
    const dr = new Drawer('container');
    document.getElementById('noise').addEventListener('click', () => { noise(dr) });
    document.getElementById('run').addEventListener('click', () => { run(dr) });
}

function run(dr: Drawer) {
    Service.run(100, dr.x, dr.y, data).then((response) => {
        response.json().then((data) => {
            showResults(dr, data);
            // console.log(data);
        })
    })
}

function showResults(dr: Drawer, data: Array<any>) {
    data.forEach(
        di => {
            for (let i = 1; i < di.data.length; i++) {
                const a = di.data[i - 1];
                const b = di.data[i];
                dr.point(a.x as number, a.y as number)
                dr.point(b.x as number, b.y as number)
                dr.line(a.x as number
                    , a.y as number
                    , b.x as number
                    , b.y as number)
            }
        }
    )

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

function noise(dr: Drawer) {
    Service.random(1000, dr.x, dr.y)
        .then((response) => response.json().then((dt => {
            data = dt;
            dt.forEach(el => {
                dr.point(el.x as number, el.y as number);
            });
        })))
}

