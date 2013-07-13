(function () {
    'use strict';
    module('Blended Backbone View Extension');

    test('should be able to mixin views', function() {
        var DrinkView, view, mixin;
        mixin = {
            mix: function() {
                return 'mix';
            },
            drink: function() {
                return 'mixinDrink';
            }
        };
        DrinkView = Backbone.View.extendWithMixin(mixin, {
            drink: function() {
                return 'drink';
            }
        });
        view = new DrinkView();

        equal(view.mix(), 'mix');
        equal(view.drink(), 'drink');
    });

    test('class names of extended view should be included in child view', function() {
        var BaseView, MixedView, view, mixin;
        mixin = {
            className: 'mixin'
        };
        BaseView = Backbone.View.extend({
            className: 'baseView'
        });
        MixedView = BaseView.extendWithMixin(mixin, {
            className: 'mixedView'
        });

        view = new MixedView();

        equal(view.className, 'baseView mixin mixedView');
    });

    test('events of extended view should be included in child view', function() {
        var BaseView, MixedView, view, mixin;
        mixin = {
            events: {
                'event1': 'handler1'
            }
        };
        BaseView = Backbone.View.extend({
            events: {
                'event2': 'handler2'
            }
        });
        MixedView = BaseView.extendWithMixin(mixin, {
            events: {
                'event3': 'handler3'
            }
        });

        view = new MixedView();

        equal(view.events.event1, 'handler1');
        equal(view.events.event2, 'handler2');
        equal(view.events.event3, 'handler3');
    });
}());