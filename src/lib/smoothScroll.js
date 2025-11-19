export function smoothScrollTo(elementId, duration = 1000) {
    const target = document.getElementById(elementId)
    if (!target) return
    const startY = window.scrollY
    const targetY = target.getBoundingClientRect().top + window.scrollY
    const diff = targetY - startY
    let start
    function step(ts){
        if(!start) start = ts
        const t = ts - start
        const p = Math.min(t / duration, 1)
        window.scrollTo(0, startY + diff * p)
        if (t < duration) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}
