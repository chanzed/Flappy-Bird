
const bindAll = (sel, eventName, callback) => {
    let l = es(sel)
    for (let i = 0; i < l.length; i++) {
        let input = l[i]
        input.addEventListener(eventName, (event) => {
            callback(event)
        })
    }
}
const templateControl = function(key, item) {
    let t = `
        <div class="">
            <label>
                <input class="zed-auto-slider" type="range"
                   value="${item.value}"
                   data-value="config.${key}"
                   min="${item.min}" max="${item.max}"
                >
                ${item._comment}：<span class="zed-label">${item.value}</span>
            </label>
        </div>
    `
    return t
}
const insertControls = function() {
    let div = e('.zed-controls')
    let keys = Object.keys(config)
    for (const k of keys) {
        let item = config[k]
        let html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}
const bindEvents = function() {
    bindAll('.zed-auto-slider', 'input', (event) => {
        let self = event.target
        let bindVar = self.dataset.value
        let v = self.value
        eval(bindVar + '.value =' + v)
        let label = self.closest('label').querySelector('.zed-label')
        label.innerText = v
    })
}
