!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var r in t)("object"==typeof exports?exports:e)[r]=t[r]}}(this,function(){return function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n,t){"use strict";function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(t(1)),u=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}return function(e,n,t){n&&r(e.prototype,n),t&&r(e,t)}(e,null,[{key:"getRandomIntInclusive",value:function(e,n){return e=Math.ceil(e),n=Math.floor(n),Math.floor(Math.random()*(n-e+1))+e}},{key:"getAdjacentCoords",value:function(n){return[[n[0]-1,n[1]-1],[n[0]-1,n[1]],[n[0]-1,n[1]+1],[n[0],n[1]-1],[n[0],n[1]+1],[n[0]+1,n[1]-1],[n[0]+1,n[1]],[n[0]+1,n[1]+1]].filter(function(n){return n.every(function(e){return e>=0})&&n[0]<=e.rows()-1&&n[1]<=e.columns()-1})}},{key:"init",value:function(n,t){e.nRows=n,e.nColumns=n,e.nMines=t.mines||Math.floor(n+Math.pow(n,1.4)/4)-3;var r=new Array(e.nColumns).fill(void 0).map(function(n,t){return function(n){return new Array(e.nRows).fill(void 0).map(function(e,t){return{coordinate:[t,n],isMined:!1,neighbouringMines:0}})}(t)}),i=e.nMines;do{for(var u=0;u<e.nRows;u++)for(var a=0;a<e.nColumns;a++)10===e.getRandomIntInclusive(1,10)&&!r[u][a].isMined&&i>0&&(r[u][a].isMined=!0,i--)}while(i>0);for(var l=0;l<e.nRows;l++)for(var f=0;f<e.nColumns;f++){var c=e.getAdjacentCoords([l,f]).map(function(e){var n=e[0],t=e[1];return r[n][t].isMined?1:0}).reduce(function(e,n){return e+n},0);r[l][f].neighbouringMines=c}return e._Cells=r.map(function(e){return e.map(function(e){return new o.default(e)})}),e.Cells}},{key:"getCell",value:function(n){return e._Cells[n[0]][n[1]]}},{key:"uncoverRemainingMines",value:function(){var n=e._Cells.flat(1).filter(function(e){return e.isMined});return n.map(function(e){return e.cellUncover()}),n}},{key:"rows",value:function(){return this.nRows}},{key:"columns",value:function(){return this.nColumns}},{key:"Cells",get:function(){return e._Cells}},{key:"mines",get:function(){return this.nMines}}]),e}();n.default=u},function(e,n,t){"use strict";function r(e){return function(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var u=o(t(0)),a=function(){function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.coordinate=n.coordinate,this.mined=n.isMined,this.neighbouringMines=n.neighbouringMines,this.flagged=!1,this.covered=!0}return function(e,n,t){n&&i(e.prototype,n),t&&i(e,t)}(e,[{key:"toggleFlag",value:function(){return this.flagged=!this.flagged,this}},{key:"isEmpty",value:function(){return!this.isFlagged&&0===this.neighbouringMines}},{key:"getAdjacentUncoveredCoords",value:function(){return u.default.getAdjacentCoords(this.coordinate).filter(function(e){var n=u.default.getCell(e);return!n.isFlagged&&n.isCovered})}},{key:"getAdjacentCells",value:function(){return u.default.getAdjacentCoords(this.coordinate).map(function(e){return u.default.getCell(e)})}},{key:"shouldChainUncover",value:function(){var e=this.getAdjacentCells().some(function(e){return e.isEmpty()}),n=!e&&this.isEmpty();return e||n}},{key:"chainUncover",value:function(){if(this.covered=!1,this.isEmpty()){var e=this.getAdjacentCells().filter(function(e){return e.isCovered&&e.shouldChainUncover()});if(e.length>0)return e.map(function(e){return e.chainUncover(),e})}return[this]}},{key:"cellUncover",value:function(){var e={this:this,adjacent:[]};if(this.isFlagged)e.this=this.toggleFlag();else{var n=this.chainUncover().flat(1);if(this.adjacentMines>0){var t=n.indexOf(this);e.adjacent=[].concat(r(n.slice(0,t)),r(n.slice(t+1)))}else e.adjacent=n}return e}},{key:"isFlagged",get:function(){return this.flagged}},{key:"isCovered",get:function(){return this.covered}},{key:"isMined",get:function(){return this.mined}},{key:"adjacentMines",get:function(){return this.neighbouringMines}}]),e}();n.default=a},function(e,n,t){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var i=r(t(0)),o=r(t(1));n.Cell=o.default;n.default=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return i.default.init(e,n),i.default}}])});