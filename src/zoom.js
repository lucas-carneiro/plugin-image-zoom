/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';
import mediumZoom from 'medium-zoom';

export default (() => {

  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const {selector = '.markdown img', options = null} = siteConfig.themeConfig.zoomConfig || {};

  setZoom(selector, options);

  return {
    onRouteUpdate({ location }) {

      if(location && location.hash && location.hash.length) {
        return;
      }

      setZoom(selector, options);
    },
  };
})();

function setZoom(selector, options) {
  // We need to delay it because onRouteUpdate event fires before the content of the new page is rendered.
  // For more information, read issues #3793 and #3399:

  // https://github.com/facebook/docusaurus/issues/3793#issuecomment-732237665
  // https://github.com/facebook/docusaurus/issues/3399

  // When #3399 gets closed, we will finally have a better option than this hack below.

  setTimeout(() => {
    if (options)
      mediumZoom(selector, options);
    else
      mediumZoom(selector);
  }, 1000);
}
