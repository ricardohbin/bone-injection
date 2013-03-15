(function (Backbone, _) {
    function BoneInjection(obj, dependencies, attributes, options) {
        var objInstance, originalInitializer = obj.prototype.initialize;
        obj.prototype.initialize = function () {
            this.__injections__ = {};
            _.forEach(dependencies, function (objects) {
                _.forEach(objects, function (value, key) {
                    this.__injections__[key] = value;
                }, this);
            }, this);
            originalInitializer.apply(this, arguments);
        }
        objInstance = new obj(attributes, options);
        obj.prototype.initialize = originalInitializer;
        return objInstance;
    }
    window.BoneInjection = BoneInjection;
}(window.Backbone, window._));	
