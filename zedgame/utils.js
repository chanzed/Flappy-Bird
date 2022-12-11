const log = console.log.bind(console)
const e = (s) => document.querySelector(s)

const es = sel => document.querySelectorAll(sel)

const imageFromPath = (path) => {
    let img = new Image()
    img.src = path
    return img
}

const reactIntersects = function(a, b) {
    if (b.y + b.image.height > a.y && b.y < a.y + a.image.height) {
        if (b.x + b.image.width > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    let n = Math.random() * (end - start + 1) + start
    return Math.floor(n)
}