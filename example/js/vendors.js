(function (global) {
    global.EventObserver = _.clone(Backbone.Events);
    global.Compiler = function ($el) {
        return _.template($el.html());
    }
    global.OtherCompiler = function ($el) {
        return Handlebars.compile($el.html());
    }
    global.VendorObject = function () {
        return {
            register: function (firstName, lastName) {
                return String(firstName + " " + lastName).toUpperCase();
            }
        }
    }
}(window))
