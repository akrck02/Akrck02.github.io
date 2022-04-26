export class Window {
    static setEvents() {
        window.onresize = () => this.setZoomLevel();
    }
    static setZoomLevel() {
        const width = window.innerWidth;
        if (width < this.FULLHD_WIDTH / 2 + 100) {
            document.body.style['zoom'] = this.DEFAULT_ZOOM * ((width / this.FULLHD_WIDTH) * 1.8);
        }
        else {
            document.body.style['zoom'] = this.DEFAULT_ZOOM;
        }
    }
}
Window.FULLHD_WIDTH = 1920;
Window.FULLHD_HEIGHT = 1080;
Window.DEFAULT_ZOOM = 1;
