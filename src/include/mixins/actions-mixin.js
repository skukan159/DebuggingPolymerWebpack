import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

//maybe throw out - polymer 2
let internalActionsMixin = (superClass) =>
    class extends superClass { 
        constructor() {
            super();
            console.log('Internal actions mixin constructed');
        }

    }

export const ActionsMixin = dedupingMixin(internalActionsMixin);

