
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { mixinA } from './mixin-a';

    

let internalMixinB = (base) => 
         

    class extends mixinA(base) {

        constructor() {
            super();
            console.log('Mixin B contructed');
        }


        static get properties() {
            return {
                
            };
        }


        connectedCallback() {
            super.connectedCallback();
        }
    }

        
export const mixinB = dedupingMixin(internalMixinB);
       