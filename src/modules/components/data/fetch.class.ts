import { World } from '../world/world.class';
import 'whatwg-fetch';

export class DataFetch {

    public world: World;
    public canvas: HTMLCanvasElement = document.createElement('canvas');
    private context: CanvasRenderingContext2D = this.canvas.getContext('2d');

    public constructor(world, url) {
        this.world = world;
    }

    public addCanvas() {
        this.canvas.width = 4096;
        this.canvas.height = 2048;

        fetch(this.world.properties.dataURL)
            .then(data => {
                return data.json();
            })
            .then((data) => {
                const container: any = document.querySelector('.detailed-view');

                let html = '<ul>',
                    x,
                    y;

                Object.keys(data.earth).map(key => {

                    html += `<li> <h3> ${key} <span class="total-rev"> ${data.earth[key].TotalRevenue} </h3></span></li>`;

                    if (data.earth[key].Sales.length > 0) {
                        html += `<ul>`;

                        data.earth[key].Sales.map((key) => {
                            html += `<li> ${key.city} <span class="total-rev"> ${key.orderValue} </span><p> Lat: ${key.lat}, Long: ${key.lng} </p></li>`;

                            x = ( (this.canvas.width / 360) * ( 180 + parseFloat(key.lng) ) );
                            y = ( (this.canvas.height / 180) * ( 90 - parseFloat(key.lat) ) );

                            this.context.rect(x, y, this.world.properties.data_size_width, this.world.properties.data_size_height);
                            this.context.fillStyle = 'orange';
                            this.context.fill();
                        });

                        html += '</ul>';
                    }

                });

                html += '</ul>';
                container.innerHTML = html;

            });
        return this.canvas;
    };
}