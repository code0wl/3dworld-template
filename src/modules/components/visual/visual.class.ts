declare const dat: any;

export class Visual {
    
    public stats: any;
    
    constructor() {
        
    }
    
    public flight() {
        var FizzyText = function () {
            this.message = 'dat.gui';
            this.speed = 0.8;
            this.displayOutline = false;
        };
        
        var text = new FizzyText();
        var gui = new dat.GUI();
        gui.add(text, 'message');
        gui.add(text, 'speed', -5, 5);
        gui.add(text, 'displayOutline');
        
    }
    
}