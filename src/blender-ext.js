(function () {
    'use strict';

    Backbone.View.extendAndBlend = function() {
        var blended = Blender.blend.apply(null, arguments);
        return Backbone.View.extend.call(this, blended);
    };
}());