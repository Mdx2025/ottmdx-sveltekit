import './loader'
import '../common/helpers'
import '../common/common';
import './audio'
import './hero'
import './vortex_main'
import initHeaderAnimation from '../custom-scripts/header-animation'
import initMenuAnimation from '../custom-scripts/menu-animation'
import './solutions'
import './revolutionize'
import './ready'
import './sponsors'
import './scroll_horizontal'
import './toform'
import './newform'

export default function initHome() {
  const cleanups = [initHeaderAnimation(), initMenuAnimation()].filter(Boolean)

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}
