
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { ActionsMixin } from 'include/mixins/actions-mixin';

    

let internalLocalizeMixin = (base) => 
         

    class extends ActionsMixin(base) {

        constructor() {
            super();
        }


        static get properties() {
            return {
                
            };
        }


        connectedCallback() {
            super.connectedCallback();
        }
    }

        
export const LocalizeMixin = dedupingMixin(internalLocalizeMixin);
       