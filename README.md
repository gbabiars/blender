# Blender

Blender is a small library that allows you to create Backbone Views using mixins.  By utilizing mixins, you compose views with small pieces of functionality instead of relying on inheritance.

## Getting Started

To get Blender, download or clone the repository and copy the blender.js file into your project:
```
git clone https://github.com/gbabiars/blender.git
```
Or you can install using Bower:
```
bower install blender --save-dev
```

## How To Use

Blender can be use to create Backbone Views nearly the exact same way as normal, with the difference that you can pass a list of mixin objects which will be merged together.

### Single Mixin
Here is a simple example of passing one mixin and view specific properties to create a new view class:
```js
// create our mixin object which contains css class, close event declaration and hide/show methods
var modalMixin = {
  className: 'modal',
  
  events: {
    'click [data-action="close"]': 'hide'
  },
  
  show: function() {
    this.$el.css('visibility', 'visible');
  },
  
  hide: function() {
    this.$el.css('visibility', 'hidden');
  }
};

// create our custom modal
var MyModal = Backbone.View.extendWithMixin(modalMixin, {
  className: 'myModal',
  
  events: {
    'click [data-action="save"]': 'save'
  },
  
  save: function() {
    this.model.save();
    this.hide();
  }
});
```

This resulting view class is the equivalent of the following:
```js
var MyModal = Backbone.View.extend({
  className: 'modal myModal',
  
  events: {
    'click [data-action="close"]': 'hide',
    'click [data-action="save"]': 'save'
  },
  
  show: function() {
    this.$el.css('visibility', 'visible');
  },
  
  hide: function() {
    this.$el.css('visibility', 'hidden');
  }
  
  save: function() {
    this.model.save();
    this.hide();
  }
});
```

### Multiple Mixins

We can also pass in more than one mixin.  The priority for the arguments go from least priority to highest priority.  For most properties, the higher priority mixin's property will overwrite the lower priority mixin's property.  className and events are exceptions as they will be combined.
```js

```
