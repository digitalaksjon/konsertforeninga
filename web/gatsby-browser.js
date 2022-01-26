// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
require('prismjs/themes/prism.css')
require('katex/dist/katex.min.css')

// trigger an immediate page refresh when an update is found
export const onServiceWorkerUpdateReady = () => window.location.reload();
