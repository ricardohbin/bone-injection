describe("BoneInjector", function () {
    var mockedBackbone, fakeInitialize;
    beforeEach(function () {
        mockedBackbone = function (attributes, options) {
            this.initialize(attributes, options);
        };
        fakeInitialize = function () {};
        mockedBackbone.prototype.initialize = fakeInitialize;
    });

    afterEach(function () {
        mockedBackbone = injected = null;
    });
    
    it("should create a __injections__ key with all dependecies", function () {
        var injected = BoneInjection(mockedBackbone, [ {"one":{}}, {"two":{}} ], { a: 1, b: 2, c: 3  }, 'someOptions');
        expect(injected.__injections__.one).toBeDefined();
        expect(injected.__injections__.two).toBeDefined();
    });

    it("should return a new instance of the same passed object", function () {
        var injected = BoneInjection(mockedBackbone, [ {"one":{}}, {"two":{}} ], { a: 1, b: 2, c: 3  }, 'someOptions');
        expect(injected instanceof mockedBackbone).toBeTruthy();
    });

    it("should initialize the original instance with the same params", function () {
        spyOn(mockedBackbone.prototype, "initialize");
        var injected = BoneInjection(mockedBackbone, [ {"one":{}}, {"two":{}} ], { a: 1, b: 2, c: 3  }, 'someOptions');
        expect(mockedBackbone.prototype.initialize).toHaveBeenCalledWith({a: 1, b: 2, c: 3}, 'someOptions');
    });
    
    it("should restore the original initialize function to the object prototype", function () {
        var injected = BoneInjection(mockedBackbone, [ {"one":{}}, {"two":{}} ], { a: 1, b: 2, c: 3  }, 'someOptions');
        expect(mockedBackbone.prototype.initialize).toEqual(fakeInitialize);
    });
});
