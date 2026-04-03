import { gsap } from 'gsap';

export function performanceON(element, property) {
    gsap.set(element, {
        willChange: property,
    })
}
export function performanceOFF(element) {
    gsap.set(element, {
        willChange: 'auto'
    })
}