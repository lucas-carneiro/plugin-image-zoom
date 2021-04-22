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

  setTimeout(() => {
    mediumZoom(selector, options);
  }, 1000);


  return {
    onRouteUpdate({ location }) {

      if( location && location.hash && location.hash.length ) {
        return;
      }

      setTimeout(() => {
        mediumZoom(selector, options);
      }, 1000);

    },
  };
})();
