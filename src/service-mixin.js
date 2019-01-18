import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { SingletonFactory } from 'include/data/client-initializer.js'


let internalServiceMixin = (superClass) =>
    class extends superClass {
        constructor() {
            super();
            this.userMgr = SingletonFactory.getInstance().userMgr;
            this.serviceReference = SingletonFactory.getInstance().services;

            //What is happening here
            this["JSON.stringify"] = function (obj) {
                return JSON.stringify(obj, null, '\t');
            };
        }

        get userManager() {
            return this.userMgr;
        }

        get services() {
            return this.serviceReference;
        }
    }

export const ServiceMixin = dedupingMixin(internalServiceMixin);
