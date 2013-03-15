(function (Backbone, _) {
    function BoneInjection(obj, dependencies) {
        var oldInitializer = obj.prototype.initialize;

        obj.prototype.initialize = function () {
            this.__injections__ = {};
            _.forEach(dependencies, function (objects) {
                _.forEach(objects, function (value, key) {
                this.__injections__[key] = value;
                console.log(value);
                }, this);
            }, this);
            oldInitializer.apply(this, arguments);
        }
        return obj;
    }
    window.BoneInjection = BoneInjection;
}(window.Backbone, window._));	
