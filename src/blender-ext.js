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
