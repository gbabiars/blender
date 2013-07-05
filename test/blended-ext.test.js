(function () {
    'use strict';
    module('Blended Backbone View Extension');

    test('should be able to mixin views', function() {
        var DrinkView, view, mixin;
        mixin = {
            mix: function() {
                return 'mix';
            }
        };
        DrinkView = Backbone.View.extendAndBlend({
            drink: function() {
                return 'drink';
            }
        }, mixin);
        view = new DrinkView();

        equal(view.mix(), 'mix');
        equal(view.drink(), 'drink');
    });
}());