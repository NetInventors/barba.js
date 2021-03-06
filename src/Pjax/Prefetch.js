var Utils = require('../Utils/Utils');
var Pjax = require('./Pjax');

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {Object}
 */
var Prefetch = {
  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  init: function() {
    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
  },

  /**
   * Callback for the mousehover/touchstart
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {Object} evt
   */
  onLinkEnter: function(evt) {
    var el = evt.target;

    while (el && !el.href) {
      el = el.parentNode;
    }

    if (!el) {
      return;
    }

    var url = el.href;

    //Check if the link is elegible for Pjax
    if (Pjax.preventCheck(evt, el) && !Pjax.Cache.get(url)) {
      var xhr = Utils.xhr(url);
      Pjax.Cache.set(url, xhr);
    }
  }
};

module.exports = Prefetch;
