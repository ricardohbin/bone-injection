bone-injection
==============

A simple dependency injector to Backbone objects

## Getting Started
Passing external objects to Backbone objects as parameters can be very repeteadly. You will need to set it in each initializer and pass in every new instance.

With BoneInjection you can pass an array of dependencies to a object, and them will be injected inside a new Backbone instance, under the __injections__ namespace.

This is helpful to avoid global components and share common services between your views, model, routers and collection (ie: socket.io, event aggregators, template engines, etc), plus all other advantages of using dependency injectons.

## How it works
BoneInjection function intercepts the prototype initializer of the object, decorate it, and return this object decoraded. BTW, the original state of Backbone object's initializer keeps intact after the decorator.

## Examples
See the __example__ folder to see its full usage, including external javascript files, unit tests, mocks, etc.

## Usage

To use BoneInjection just call it passing as arguments
- Object -> Backbone Object (View, Model, Collection or Router)
- Array({label: obj}, ...)  -> An array of dependencies to be injected. The label is the reference inside the __injector__
- [attributes] -> The same attributes used in the native Backbone Object constructor.
- [options] -> The same optional parameters used in native Backbone Object constructor.

In this example, its possible to see the versality of injecting objects inside the Backbone objects.

```html
<div id="someView"></div>
<div id="otherView"></div>
<script id="someViewTemplate" type="text/template">
    <h1> <%= name %> </h1>
</script>
<script id="otherViewTemplate" type="text/template">
    <h2> Hello, {{ name }}. I have listen to it. </h2>
</script>
```

```javascript
(function (Backbone, _) {
    var Person, SomeView, OtherView, EventObserver, Compiler, OtherCompiler, VendorObject, person, someview, otherview;
    /*** objects ***/

    Person = Backbone.Model.extend({
        getFullName: function () {
            return this.__injections__.vendor.register(this.get("name"), this.get("lastName"));
        }
    });

    SomeView = Backbone.View.extend({
        render: function () {
            var fullname = this.model.getFullName();
            this.$el.html(this.__injections__.compiler({
                name: fullname
            }));
            this.__injections__.vent.trigger("update", fullname);
            return this;
        }
    });

    OtherView = Backbone.View.extend({
        initialize: function () {
            this.__injections__.vent.on("update", this.render, this);
        },
        render: function (fullname) {
            this.$el.html(this.__injections__.compiler({
                name: fullname
            }));

            return this;
        }
    });
    
    EventObserver = _.clone(Backbone.Events);
    Compiler = _.template($("#someViewTemplate").html());
    OtherCompiler = Handlebars.compile($("#otherViewTemplate").html());
    VendorObject = function () {
        return {
            register: function (firstName, lastName) {
                return String(firstName + " " + lastName).toUpperCase();
            }
        }
    }

    /*** instances ***/

    person = BoneInjection(Person, [{'vendor': new VendorObject}], {
        name: "Foo", lastName: "Bar"
    });

    someview = BoneInjection(SomeView, [{'vent': EventObserver}, {'compiler': Compiler}], {
        model: person, el: $("#someView") 
    });

    otherview = BoneInjection(OtherView, [{'vent': EventObserver}, {'compiler': OtherCompiler}], {
        el: $("#otherView")
    });

    someview.render();

}(Backbone, _));
```


