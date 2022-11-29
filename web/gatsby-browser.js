// custom typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
require('prismjs/themes/prism.css')
require('katex/dist/katex.min.css')

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    "This website has been updated. Reload to display the latest version?"
  );
  if (answer === true) {
    window.location.reload();
  }
};
