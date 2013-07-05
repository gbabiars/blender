(function () {
    'use strict';

    var Blender = window.Blender = {};

    function combineEvents(viewEvents, mixinEvents) {
        var result, prop;

        result = {};

        for(prop in mixinEvents) {
            result[prop] = mixinEvents[prop];
        }
        for(prop in viewEvents) {
            result[prop] = viewEvents[prop];
        }

        return result;
    }

    function combine(view, mixins) {
        var mixin = mixins[0];

        for(var prop in mixin) {
            if(mixin.hasOwnProperty(prop)) {
                if(view[prop]) {
                    if(prop === 'className') {
                        view[prop] = mixin[prop] + ' ' + view[prop];
                    }
                    if(prop === 'events') {
                        view[prop] = combineEvents(view[prop], mixin[prop]);
                    }
                } else {
                    view[prop] = mixin[prop];
                }
            }
        }

        if(mixins.length <= 1) {
            return view;
        }

        return combine(view, mixins.slice(1));
    }

    Blender.blend = function() {
        var view, mixins;

        view = arguments[0];
        mixins = Array.prototype.slice.call(arguments, 1);

        if(mixins[0] instanceof Array) {
            mixins = mixins[0];
        }

        return combine(view, mixins);
    };

}());