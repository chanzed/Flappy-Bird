class ZedGame {
    constructor(fps, images, runCallback) {
        config.fps.value = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.height = this.canvas.clientHeight
        this.width = this.canvas.clientWidth
        window.addEventListener('keydown', (event) => {
            let k = event.key
            this.keydowns[k] = 'down'
        })
        window.addEventListener('keyup', (event) => {
            let k = event.key
            this.keydowns[k] = 'up'
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        // img是一个 ZedImage
        this.context.drawImage(img.texture, img.x, img.y)
    }
    draw() {
        this.scene.draw()
    }
    update() {
        if (window.paused) {
            return
        }
        this.scene.update()
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {

        let g = this
        let keys = Object.keys(g.actions)
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let status = g.keydowns[key]
            if (status === 'down') {
                g.actions[key]('down')
            } else if (status === 'up') {
                g.actions[key]('up')
                g.keydowns[key] = null
            }
        }
        g.update()
        g.context.clearRect(0, 0, g.canvas.clientWidth, g.canvas.clientHeight)
        g.draw()

        setTimeout(function() {
            g.runloop()
        }, 1000 / config.fps.value)
    }
    init() {
        let g = this
        let loads = []
        // 预先载入所有图片
        let names = Object.keys(g.images)
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            let path = g.images[name]
            let img = new Image()
            img.src = path
            g.images[name] = img
            img.onload = function() {
                loads.push(1)
                if (loads.length === names.length) {
                    g.__start()
                }
                // 所有图片载入成功之后调用 run
            }
        }
    }
    textureByName(name) {
        let img = this.images[name]
        return img
    }

    runWithScene(scene) {
        this.scene = scene
        // 开始运行程序
        setTimeout(() => {
            this.runloop()
        }, 1000 / config.fps.value)
    }
    replaceScene(scene, ...args) {
        this.scene = scene
        if (args.length > 0) {
           args.forEach(el => this.scene.unshiftElement(el))
        }
    }
    __start() {
        this.runCallback(this)
    }
}