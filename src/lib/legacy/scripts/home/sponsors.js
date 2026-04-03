import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';


new Splide('#sponsors', {
    type: 'loop',
    arrows: false,
    pagination: false,
    drag: false,
    keyboard: false,
    gap: '2.5vw',
    autoScroll: {
        speed: 0.5,
        pauseOnHover: false,
        pauseOnFocus: false,
    },
    autoWidth: true,
    breakpoints: {
        480: {
            gap: '5vw',
            autoScroll: {
                speed: 1,
                pauseOnHover: false,
                pauseOnFocus: false,
            },
        },
        1080: {
            gap: '7vw',
            autoScroll: {
                speed: 1,
                pauseOnHover: false,
                pauseOnFocus: false,
            },
        }
    },
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
}).mount({ AutoScroll, Intersection })