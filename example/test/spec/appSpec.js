describe("Example test", function () {
    describe("Person context", function () {
        var model;

        beforeEach(function () {
            var fakeVendor = {
                register : function () {}
            };
            model = BoneInjection(App.Person, [{"vendor": fakeVendor}], {
                name: "Foo",
                lastName: "Bar"
            });
        });

        afterEach(function () {
            model = null;
        });

        it("should #getFullName register with vendor service", function () {
            spyOn(model.__injections__.vendor, "register");
            model.getFullName();
            expect(model.__injections__.vendor.register).toHaveBeenCalledWith("Foo", "Bar");
        });
    });

    describe("SomeView context", function () {
        var view;
        beforeEach(function () {
            var
                fakeEl = { html: function () {} },
                fakeModel = { getFullName : function () { return "Boo Far"; } },
                fakeVent = { trigger: function () {} }, fakeCompiler = function () {};
             
             view = BoneInjection(App.SomeView, [{"compiler": fakeCompiler}, {"vent": fakeVent}], {
                model: fakeModel,
                el: fakeEl
             });
        });

        afterEach(function () {
            view = null;
        });

        it("should render with correct params e trigger the right event", function () {
            spyOn(view.__injections__, "compiler");
            spyOn(view.__injections__.vent, "trigger");
            spyOn(view.$el, "html");

            view.render();

            expect(view.__injections__.compiler).toHaveBeenCalledWith({name: "Boo Far"});
            expect(view.__injections__.vent.trigger).toHaveBeenCalledWith("update", "Boo Far");
        });
    });

    describe("OtherView context", function () {
        var view;

        beforeEach(function () {
            var fakeElm = { html: function () {} }, fakeVent = { on: function () {} }, fakeCompiler = function () {};
            view = BoneInjection(App.OtherView, [{"compiler": fakeCompiler}, {"vent": fakeVent}], {
                el: fakeElm
            });
        });

        afterEach(function () {
            view = null;
        });

        it("should listen when #initialize", function () {
            spyOn(view.__injections__.vent, "on");
            view.initialize();
            expect(view.__injections__.vent.on).toHaveBeenCalledWith("update", view.render, view);
        });

        it("should render with correct params", function () {
            spyOn(view.__injections__, "compiler");
            view.render("ABC");
            expect(view.__injections__.compiler).toHaveBeenCalledWith({name: "ABC"});
        });
    });
});
