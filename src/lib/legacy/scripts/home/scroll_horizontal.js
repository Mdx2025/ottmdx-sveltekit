import { gsap } from 'gsap';
import { isMobile } from '../common/ismobile';
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import '@splidejs/splide/css/core';
import { Intersection } from '@splidejs/splide-extension-intersection';

const container = gsap.utils.toArray('#scroll-horizontal')[0];
const descriptions = gsap.utils.toArray('.scroll-wrapper > .description > .description-slide');
const slides = gsap.utils.toArray('.scroll-horizontal > .splide__slide');
const duration = 1 / slides.length;


if (!isMobile()) {
    gsap.set(container, {
        height: `${slides.length * 100}vh`
    })

    let scrollHorizontal = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: '.scroll-wrapper',
            pinSpacing: true,
        },
        defaults: {
            duration: 1,
        }
    })
        .to('.scroll-horizontal', {
            xPercent: -100 + 100 * duration,
        })

    const indexCheck = (index) => index == slides.length - 1;

    slides.forEach((slide, index) => {

        scrollHorizontal.add(gsap.timeline()
            .to(slide, {
                scale: indexCheck(index) ? 1 : 0.5,
                duration,
            }, index == 0 ? "<" : ">")
            .to(descriptions[index], {
                opacity: indexCheck(index) ? 1 : 0,
                duration,
            }, "<")
            .from(slides[index + 1], {
                scale: 0.5,
                duration,
            }, "<")
            .from(descriptions[index + 1], {
                opacity: 0,
                duration,
            }, "<")

            , index == 0 ? "<" : ">")
    })

} else {

    const slider = new Splide('#brands-slider', {
        type: 'loop',
        rewind: true,
        autoScroll: {
            speed: 1,
            pauseOnFocus: false,
            pauseOnHover: false,
        },
        arrows: false,
        pagination: false,
        drag: false,
        autoWidth: true,
        gap: '10vw',
        intersection: {
            inView: {
                autoScroll: {
                    speed: 1,
                    pauseOnFocus: false,
                    pauseOnHover: false,
                },
            },
            outView: {
                autoScroll: false,
            },
        },
    })
        .mount({ AutoScroll, Intersection })

    gsap.set(descriptions, {
        opacity: 0,
    })
    gsap.to(descriptions[0], {
        opacity: 1,
    })

    slider.on('active', () => {
        gsap.set(descriptions, {
            opacity: 0,
        })
        gsap.to(descriptions[slider.index], {
            opacity: 1,
            duration: 0.75
        })
    })

}