"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = (function () {
    function Canvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.style.overflow = 'hidden';
        this.renderCanvas();
    }
    Canvas.prototype.renderCanvas = function () {
        document.body.appendChild(this.canvas);
    };
    return Canvas;
}());
exports.Canvas = Canvas;
//# sourceMappingURL=canvas.class.js.map