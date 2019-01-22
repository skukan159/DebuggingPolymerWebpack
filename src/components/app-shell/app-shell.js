import { PolymerElement, html } from '@polymer/polymer';


import { mixinB } from 'components/mixins/mixin-b.js';
import 'components/app-shell/app-shell-style.js';

export class AppShellBase extends mixinB(PolymerElement) {

    constructor() {
        super();
        console.log('App shell contructor');
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
  
    static get is() { return 'app-shell'; }
  
    static get properties() {
        return {
           
        }
    }

  }
window.customElements.define(AppShellBase.is, AppShellBase);

