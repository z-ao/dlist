var template = require('art-template/lib/runtime');
var pullupRender = require('./template/pullup.art');
var tombstoneRender = require('./template/tomb_stone.art');
require('./template/tombstone.less');

const mlist = {
  init: function (dom) {
    this._dom = dom || document.body;

    this.appendTonbstone();
  },
  appendTonbstone: function () {
    const el = document.createElement('div');

    el.innerHTML = tombstoneRender();
    this._dom.appendChild(el);
  }
}

mlist.init();
module.exports = mlist;
