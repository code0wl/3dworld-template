import { World } from '../world/world.class';
export class DataFetch {

    public world: World;
    public canvas: HTMLCanvasElement = document.createElement('canvas');

    public constructor(world, url) {
        this.world = world;
    }

    private fetchJSONFile(path, callback) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange =  () => {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) {
                    callback(data);
                }
            }
        };

        httpRequest.open('GET', path);
        httpRequest.send();

        setInterval(() => {
            httpRequest.open('GET', path);
            httpRequest.send();
        }, this.world.properties.pollingInterval);
    };

    //TODO simplify in higherorder
    public addCanvas() {

        this.canvas.width = 4096;
        this.canvas.height = 2048;

        //TODO: extract to canvas class
        const context = this.canvas.getContext('2d');

        this.fetchJSONFile(this.world.properties.dataURL, (data) => {

            const container: any = document.querySelector('.data-countries');
            container.style.height = this.world.properties.height;
            container.style.overflow = 'auto';

            var html = '<details> <ul>',
                x,
                y;

            Object.keys(data.earth).map((key) => {

                html += '<li> <h3>' + key + '<span class="total-rev">' + data.earth[key].TotalRevenue + '</h3></span></li>';

                if (data.earth[key].Sales.length > 0) {
                    html += '<ul>';

                    data.earth[key].Sales.map((key) => {
                        html += '<li>' + key.city + ' <span class="total-rev">' + key.orderValue + '</span><p> Lat: ' + key.lat + ', Long:' + key.lng + '</p></li>';

                        x = ( (this.canvas.width / 360) * ( 180 + parseFloat(key.lng) ) );
                        y = ( (this.canvas.height / 180) * ( 90 - parseFloat(key.lat) ) );

                        context.rect(x, y, this.world.properties.data_size_width, this.world.properties.data_size_height);
                        context.fillStyle = 'orange';
                        context.fill();

                    });

                    html += '</ul>';
                }

            });

            html += '</ul></details>';
            container.innerHTML = html;

        });

        return this.canvas;
    };
}