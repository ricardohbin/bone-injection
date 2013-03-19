(function (Backbone, _, global) {
var App = {};
App.Person = Backbone.Model.extend({
    getFullName: function () {
        return this.__injections__.vendor.register(this.get("name"), this.get("lastName"));
    }
});

App.SomeView = Backbone.View.extend({
    render: function () {
        var fullname = this.model.getFullName();
        this.$el.html(this.__injections__.compiler({
            name: fullname
        }));
        this.__injections__.vent.trigger("update", fullname);
        return this;
    }
});

App.OtherView = Backbone.View.extend({
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

global.App = App;

}(Backbone, _, window));
