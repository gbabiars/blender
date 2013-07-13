define(['backbone'], function(Backbone) {

var blend = (function () {
    'use strict';

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
        var mixin = mixins.pop();

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

        if(mixins.length <= 0) {
            return view;
        }

        return combine(view, mixins);
    }

    function blend() {
        var view, mixins, mixinArray;

        view = {};
        mixins = Array.prototype.slice.call(arguments, 0);

        if(mixins[0] instanceof Array) {
            mixinArray = mixins.shift();
            mixinArray.forEach(function(mixin) {
                mixins.unshift(mixin);
            });
        }

        return combine(view, mixins);
    }

    return blend;

}());

Backbone.View.extendWithMixin = function() {
    var argsArray, blended, baseProperties;

    argsArray = Array.prototype.slice.call(arguments, 0);

    baseProperties = {
        className: this.prototype.className,
        events: this.prototype.events
    };

    argsArray.unshift(baseProperties);

    blended = blend.apply(null, argsArray);
    return Backbone.View.extend.call(this, blended);
};

return Backbone.View.extendWithMixin;

});