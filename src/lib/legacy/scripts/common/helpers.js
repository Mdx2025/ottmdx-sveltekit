import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { refreshVideo } from '../home/revolutionize'

window.addEventListener('orientationchange', () => window.location.reload())


const inputs = Array.from(document.querySelectorAll('input'));

const refreshScrollTrigger = () => {
    ScrollTrigger.refresh()
    ScrollTrigger.update()

}

inputs.forEach(input => {
    input.addEventListener('focus', refreshVideo)
    input.addEventListener('blur', refreshVideo)
})