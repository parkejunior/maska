/*!
 * maska v1.1.6
 * (c) 2019-2020 Alexander Shabunevich
 * Released under the MIT License.
 */
function t(t,a,s,r=!0){return e(a).length>1?function(t){const a=e(t).sort((t,e)=>t.length-e.length);return function(t,e,s,r=!0){let o=0;for(;o<a.length;){const e=a[o];o++;const i=a[o];if(!(i&&n(t,i,s,!0).length>e.length))return n(t,e,s,r)}return""}}(a)(t,a,s,r):n(t,a,s,r)}function e(t){try{return JSON.parse(t)}catch{return[t]}}function n(t,e,n,s=!0){let r=0,o=0,i="",u="";for(;r<e.length&&o<t.length;){let u=e[r];const l=t[o],c=n[u];if(c&&c.pattern)c.pattern.test(l)&&(i+=a(l,c),r++),o++;else if(c&&c.repeat){const t=n[e[r-1]];t&&!t.pattern.test(l)?r++:r--}else c&&c.escape&&(r++,u=e[r]),s&&(i+=u),l===u&&o++,r++}for(;s&&r<e.length;){const t=e[r];if(n[t]){u="";break}u+=t,r++}return i+u}function a(t,e){return e.uppercase?t.toLocaleUpperCase():e.lowercase?t.toLocaleLowerCase():t}var s={"#":{pattern:/[0-9]/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,uppercase:!0},a:{pattern:/[a-zA-Z]/,lowercase:!0},"!":{escape:!0},"*":{repeat:!0}};function r(t){return t instanceof HTMLInputElement?t:t.querySelector("input")||t}function o(t){return"[object String]"===Object.prototype.toString.call(t)}class i{constructor(t,e={}){if(!t)throw new Error("Maska: no element for mask");if(e.tokens)for(const t in e.tokens)e.tokens[t]={...e.tokens[t]},e.tokens[t].pattern&&o(e.tokens[t].pattern)&&(e.tokens[t].pattern=new RegExp(e.tokens[t].pattern));this._opts={mask:e.mask,tokens:{...s,...e.tokens}},this._el=o(t)?document.querySelectorAll(t):t.length?t:[t],this.init()}init(){for(let t=0;t<this._el.length;t++){const e=r(this._el[t]);!this._opts.mask||e.dataset.mask&&e.dataset.mask===this._opts.mask||(e.dataset.mask=this._opts.mask),this.updateValue(e),e.dataset.maskInited||(e.dataset.maskInited=!0,e.addEventListener("input",t=>this.updateValue(t.target)),e.addEventListener("beforeinput",t=>this.beforeInput(t)))}}destroy(){for(let t=0;t<this._el.length;t++){const e=r(this._el[t]);e.removeEventListener("input",t=>this.updateValue(t.target)),e.removeEventListener("beforeinput",t=>this.beforeInput(t)),delete e.dataset.mask,delete e.dataset.maskInited}}updateValue(e){const n=e.type.match(/^number$/i)&&e.validity.badInput;if(!e.value&&!n||!e.dataset.mask)return;const a=e.selectionEnd,s=e.value,r=s[a-1];e.value=t(e.value,e.dataset.mask,this._opts.tokens),function(t,e,n){for(;e&&e<t.value.length&&t.value.charAt(e-1)!==n;)e++;(t.type&&t.type.match(/^(text|search|password|tel|url)$/i)||!t.type)&&t===document.activeElement&&(t.setSelectionRange(e,e),setTimeout((function(){t.setSelectionRange(e,e)}),0))}(e,a,r),e.value!==s&&e.dispatchEvent(function(t){const e=document.createEvent("Event");return e.initEvent(t,!0,!0),e}("input"))}beforeInput(t){t.target.type.match(/^number$/i)&&t.data&&isNaN(t.target.value+t.data)&&t.preventDefault()}}function u(t,e){if(e.value)return e.value&&function(t){return!(o(t.value)&&t.value===t.oldValue||Array.isArray(t.value)&&JSON.stringify(t.value)===JSON.stringify(t.oldValue)||t.value&&t.value.mask&&t.oldValue&&t.oldValue.mask&&t.value.mask===t.oldValue.mask)}(e)?new i(t,function(t){const e={};return t.mask?(e.mask=Array.isArray(t.mask)?JSON.stringify(t.mask):t.mask,e.tokens=t.tokens?{...t.tokens}:{}):e.mask=Array.isArray(t)?JSON.stringify(t):t,e}(e.value)):void 0}function l(t){t.directive("maska",u)}function c(t,e){return new i(t,e)}"undefined"!=typeof window&&window.Vue&&window.Vue.use(l);export default l;export{c as create,t as mask,u as maska,s as tokens};