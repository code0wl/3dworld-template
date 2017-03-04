"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Benchmark = (function () {
    function Benchmark() {
        this.addStatsObject();
    }
    Benchmark.prototype.addStatsObject = function () {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.top = 0;
        document.body.appendChild(this.stats.domElement);
    };
    return Benchmark;
}());
exports.Benchmark = Benchmark;
//# sourceMappingURL=benchmark.js.map