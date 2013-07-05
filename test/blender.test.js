(function () {
    'use strict';

    var view, mixin, result;

    module('Blender', {
        setup: function() {
            view = {};
            mixin = {};
            result = null;
        }
    });

    test('combining two empty objects should return an empty object', function() {
        result = Blender.blend(view, mixin);

        ok(result);
    });

    test('function on mixin should be added to view', function() {
        mixin.another = function() {
            return 'another';
        };

        result = Blender.blend(view, mixin);

        equal(result.another(), 'another');
    });

    test('string on mixin should be added to view', function() {
        mixin.another = 'another';

        result = Blender.blend(view, mixin);

        equal(result.another, 'another');
    });

    test('function on both mixin and view should use the view', function() {
        view.something = function() {
            return 'view';
        };
        mixin.something = function() {
            return 'mixin';
        };

        result = Blender.blend(view, mixin);

        equal(result.something(), 'view');
    });

    test('className exists on both view and mixin, should concatenate them', function() {
        view.className = 'view-class';
        mixin.className = 'mixin-class';

        result = Blender.blend(view, mixin);

        equal(result.className, 'mixin-class view-class');
    });

    test('events on both objects should combine the two objects', function() {
        view.events = {
            'click .button': 'buttonClicked'
        };
        mixin.events = {
            'click .tab': 'tabClicked'
        };

        result = Blender.blend(view, mixin);

        equal(result.events['click .button'], 'buttonClicked');
        equal(result.events['click .tab'], 'tabClicked');
    });

    test('combining two mixins properly cascades onto view', function() {
        view.first = function() {
            return 'view';
        };
        mixin.second = function() {
            return 'mixin';
        };
        var mixin2 = {
            third: function() {
                return 'mixin2';
            }
        };

        result = Blender.blend(view, mixin, mixin2);

        equal(view.first(), 'view');
        equal(view.second(), 'mixin');
        equal(view.third(), 'mixin2');
    });

    test('combining two mixins with same function uses the first in chain', function() {
        mixin.something = function() {
            return 'mixin';
        };
        var mixin2 = {
            something: function() {
                return 'mixin2';
            }
        };

        result = Blender.blend(view, mixin, mixin2);

        equal(view.something(), 'mixin');
    });

    test('second parameter is array of mixins, should combine to view', function() {
        view.first = function() {
            return 'view';
        };
        var mixins = [
            {
                second: function() {
                    return 'mixin1';
                }
            },
            {
                third: function() {
                    return 'mixin2';
                }
            }
        ];

        result = Blender.blend(view, mixins);

        equal(view.first(), 'view');
        equal(view.second(), 'mixin1');
        equal(view.third(), 'mixin2');
    });

}());