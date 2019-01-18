import { PolymerElement, html } from '@polymer/polymer';


import { LocalizeMixin } from 'include/mixins/localize-mixin.js';
import 'include/app-shell/app-shell-base-style.js';

export class AppShellBase extends LocalizeMixin(PolymerElement) {

    constructor() {
        super();
        
    }

    static get template() {
        return html` <style>

        p{
            color:white;
        }

      </style>
        <p>Hello world!</p>
        `;
    }
  
    static get is() { return 'app-shell-base'; }
  
    static get properties() {
        return {
           
        }
    }

  }
window.customElements.define('app-shell-base', AppShellBase);

