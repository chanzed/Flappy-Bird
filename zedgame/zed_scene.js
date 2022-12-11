class ZedScene {
    constructor(game) {
        this.game = game
        this.debugModeEnable = true
        this.elements = []
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    unshiftElement(img) {
        img.scene = this
        this.elements.unshift(img)
    }

    running() {
        return this.game.scene === this
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnable) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }
    }
}

