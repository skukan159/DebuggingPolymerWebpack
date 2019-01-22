import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

//maybe throw out - polymer 2
let internalMixinA = (superClass) =>
    class extends superClass { 
        constructor() {
            super();
            console.log('Mixin A constructed');
        }

    }

export const mixinA = dedupingMixin(internalMixinA);

