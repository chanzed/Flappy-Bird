class ZedAnimation {
    constructor(game) {
        this.game = game
        this.animations = {
            idle: [],
            run: [],
        }
        for (let i = 1; i < 4; i++) {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        for (let i = 1; i < 4; i++) {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 10
        //
        this.flipX = false
        // 重力和加速度
        this.gy = config.gravity.value
        this.vy = 0

        this.rotation = 0
        this.alpha = 1
        this.jumping = false
    }

    jump() {
        this.jumping = true
        this.vy = config.bird_vy.value
        this.rotation = -45
    }
    quitJump() {
        this.jumping = false
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        // 更新受力
        this.y -= this.vy
        this.vy -= this.gy * 0.1
        if (this.alpha > 0) {
            this.alpha -= 0.02
        }

        let h = 475
        if (this.y > h) {
            this.y = h
        }

        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount -= 1
        if (this.frameCount === 0) {
            this.frameCount = 10
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        let context = this.game.context
        context.save()

        let w2 = this.w / 2
        let h2 = this.h / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)
        context.globalAlpha = this.alpha
        context.drawImage(this.texture, 0, 0)
        context.restore()
        // context.drawImage(this.texture, this.x, this.y)

    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // log('keyStatus', keyStatus, this.flipX)
        let animationName = {
            down: 'run',
            up: 'idle',
        }
        let n = animationName[keyStatus]
        this.changeAnimationName(n)
    }
    changeAnimationName(name) {
        this.animationName = name
    }
    reactIntersects(a, b) {
        if (b.y + b.h > a.y && b.y < a.y + a.h) {
            if (b.x + b.w > a.x && b.x < a.x + a.w) {
                return true
            }
        }
        return false
    }
    collide(img) {
        return (this.reactIntersects(this, img) || this.reactIntersects(img, this))
    }
    debug() {
        this.gy = config.gravity.value
        if (this.jumping) {
            this.vy = config.bird_vy.value
        }
    }
}