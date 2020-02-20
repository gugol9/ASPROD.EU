class Slider {
    constructor(selector) {
        window.Comp = window.Comp || window.jQuery;
        this.slider = new Comp(selector);
        this.settings = {
            first: 0,

            activeClassName: "active",
            prevClassName: "prev",
            firstClassName: "first",
            loadingClassName: "loading",
            loadErrorClassName: "error",
            loadedClassName: "loaded",
            jsClassName: "js",
            animation: "fade",

            prev: false,
            next: false,
            auto: true,
            time: 5000,
            pause: true,

            nav: false,
            parent: true,
            height: true,
            load: true
        };

        this.slider.test = this.slider.test || function(condition, error, element) {
            if(condition) {
                throw error;
            }
            return element;
        }

        this.slider.foreach = this.slider.foreach || this.slider.each;
        this.slider.ajax = this.slider.ajax || Comp.ajax;
    }

    create() {
        this.firstRun = true;
        this.index = this.tryIndex(this.settings.first);
        this.classNameActive = this.slider.test(typeof this.settings.activeClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci activeClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.activeClassName), this.settings.activeClassName);
        this.classNamePrev = this.slider.test(typeof this.settings.prevClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci prevClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.prevClassName), this.settings.prevClassName);
        this.classNameFirst = this.slider.test(typeof this.settings.firstClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci firstClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.firstClassName), this.settings.firstClassName);
        this.classNameLoading = this.slider.test(typeof this.settings.loadingClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci loadingClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.loadingClassName), this.settings.loadingClassName);
        this.classNameLoadError = this.slider.test(typeof this.settings.loadErrorClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci loadErrorClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.loadErrorClassName), this.settings.loadErrorClassName);
        this.classNameLoaded = this.slider.test(typeof this.settings.loadedClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci loadedClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.loadedClassName), this.settings.loadedClassName);
        this.classNameAnimation = this.slider.test(typeof this.settings.animation !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci animation nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.animation), this.settings.animation);
        this.classNameJS = this.slider.test(typeof this.settings.jsClassName !== "string", new TypeError("WartoĹÄ wĹaĹciwoĹci jsClassName nie jest ciÄgiem znakĂłw, przekazana wĹaĹciwoĹÄ to: " + this.settings.jsClassName), this.settings.jsClassName);

        this.autoTime = this.slider.test(typeof this.settings.time !== "number", new TypeError("WartoĹÄ wĹaĹciwoĹci time nie jest liczbÄ, przekazana wĹaĹciwoĹÄ to: " + this.settings.time), this.settings.time);

        this.eventElementPrev = (this.settings.prev) ? new Comp(this.settings.prev) : false;
        this.eventElementNext = (this.settings.next) ? new Comp(this.settings.next) : false;
        this.eventElementNav = (this.settings.nav) ? new Comp(this.settings.nav) : false;
        this.parent = (this.settings.parent) ? new Comp((typeof this.settings.parent === "string") ? this.settings.parent : this.slider[this.index].parentElement) : false;
    }

    tryIndex(index) {
        if(typeof index !== "number") {
            throw new TypeError("funkcja tryIndex - Slide musi byÄ liczbÄ: " + index);
        }
        else if(index < 0 || index > this.slider.length - 1) {
            throw new TypeError("funkcja tryIndex - Nie ma takiego slide'u: " + index);
        }

        return index;
    };

    checkJS() {
        if(this.parent) this.parent.addClass(this.classNameJS);
    };

    setFirstSlide(index) {
        if(!this.firstRun) {
            this.setPrevSlide();
            this.slider.removeClass(this.classNameFirst);
        } else {
            let element = new Comp(this.slider[this.index]);
            this.firstRun = false;
            element.addClass(this.classNameFirst);
            if(this.classNameAnimation === "tape") {
                let element = new Comp(this.slider[0]);
                element.addClass(this.classNameFirst);
            }
        }
    };

    setSlide(index) {
        this.setFirstSlide(this.index);
        this.setActiveSlide(!this.firstRun ? index : this.index)
        this.setSlideAfter(this.index);
    };

    setSlideAfter(index) {
        if(this.eventElementNav) this.makeActive(new Comp(this.eventElementNav[index]), this.eventElementNav);
        if(this.settings.auto) this.auto(this.autoTime);
        if(this.parent && this.settings.height)this.parentSetHeight(this.slider[this.index]);
        this.animation(this.classNameAnimation);
    };

    setActiveSlide(index) {
        this.index = index;
        this.active = new Comp(this.slider[index]);
        this.makeActive(this.active, this.slider);
    };

    setPrevSlide() {
        this.slider.removeClass(this.classNamePrev);
        this.active.addClass(this.classNamePrev);
    };

    makeActive(element, list) {
        list.removeClass(this.classNameActive);
        element.addClass(this.classNameActive);
    }

    checkNextSlide(index) {
        return (index > this.slider.length - 1) ?  0 : index;
    }

    checkPrevSlide(index) {
        return (index < 0) ? this.slider.length - 1 : index;
    }

    animation(animation) {
        switch(animation) {
            case "zip":
                this.animationZip("zip");
                break;
            case "fade":
                this.animationFade("fade");
                break;
            case "chain":
                this.animationChain("chain");
                break;
            case "tape":
                this.animationTape("tape");
                break;
        };
    }

    animationZip(animation) {
        this.parent.addClass(animation);
    }

    animationFade(animation) {
        this.parent.addClass(animation);
    }

    animationChain(animation) {
        this.parent.addClass(animation);
    }

    animationTape(animation) {
        this.parent.addClass(animation);
        let translate = 0;
        for (let i = 0; i < this.index; i++) {
            translate += this.slider[i].offsetWidth;
        };
        this.slider[0].style.marginLeft = "-" + translate + "px";
    }

    auto(time) {
        this.autoIntervalTime = Date.now();
        this.autoActualTime = time;
        clearInterval(this.autoInterval);
        this.autoInterval = setInterval(() => {
            this.autoIntervalTime = Date.now();
            if (!this.settings.load || this.slider[this.checkNextSlide(this.index + 1)].classList.contains(this.classNameLoaded)) {
                this.setSlide(this.checkNextSlide(this.index + 1));
            } else {
                this.auto(this.autoTime);
            }
        }, time);
    }

    autoStop() {
        clearInterval(this.autoInterval);
        this.autoPauseTime = this.autoActualTime - (Date.now() - this.autoIntervalTime);
    }

    autoStart() {
        this.auto(this.autoPauseTime);
    }

    parentSetHeight(slide) {
        this.parent[0].style.height = slide.offsetHeight + "px";
    }

    event() {

        if(this.settings.pause && this.settings.auto) {
            this.slider.on("mouseenter", () => {
                this.autoStop();
            });
            this.slider.on("mouseleave", () => {
                this.autoStart();
            });
        }

        if(this.eventElementPrev) {
            this.eventElementPrev.on("click", () => {
                this.setSlide(this.checkPrevSlide(this.index - 1));
            });
        }

        if(this.eventElementNext) {
            this.eventElementNext.on("click", () => {
                this.setSlide(this.checkNextSlide(this.index + 1));
            });
        }

        if(this.eventElementNav) {
            if(this.eventElementNav.length !== this.slider.length) {
                throw new TypeError("NiewĹaĹciwa iloĹÄ nawigacji: " + this.eventElementNav.length);
            }

            this.eventElementNav.on("click", (event) => {
                if (!this.settings.load || event.target.classList.contains(this.classNameLoaded)) {
                    for(let i = 0; i < this.slider.length; i++) {
                        if(this.eventElementNav[i] === event.target) {
                            this.setSlide(i);
                        }
                    }
                }
            });
        }

    };

    load() {
        let active = this.slider[this.index],
            load = this.settings.load,
            arr = [],

            deleteSrc = (element) => {
                element.src = "";
            },

            addBackground = (element, url) => {
                element.style.backgroundImage = "url('" + url + "')";
            },

            ajax = (element, url, index, direction) => {
                this.slider.ajax({
                    type: "GET",
                    url: url,
                    success: () => {
                        addBackground(element, url);
                        if (this.eventElementNav) changeElementStatus(new Comp(this.eventElementNav[index]), this.classNameLoaded);
                        changeElementStatus(new Comp(this.slider[index]), this.classNameLoaded);
                        loadElement(index + direction, direction);
                    },
                    error: () => {
                        if (this.eventElementNav) changeElementStatus(new Comp(this.eventElementNav[index]), this.classNameLoadError);
                        changeElementStatus(new Comp(this.slider[index]), this.classNameLoadError);
                        loadElement(index + direction, direction);
                    }
                });
            },

            loadElement = (index, direction) => {
                if (index < this.slider.length && index >= 0) {
                    ajax(arr[index][0], arr[index][1], index, direction);
                }
            },

            changeElementStatus = (element, status) => {
                element.removeClass(this.classNameLoading + " " + this.classNameLoadError + " " + this.classNameLoaded);
                element.addClass(status);
            };

        this.slider.foreach(function() {
            let figure = (this.querySelectorAll('figure')) ? this.querySelectorAll('figure')[0] : false,
                img = (figure && figure.querySelectorAll('img')) ? figure.querySelectorAll('img')[0] : false;
            if(load) {
                arr.push([figure, img.src]);
                if (this !== active) deleteSrc(img);
            } else {
                addBackground(figure, img.src);
            }
        });

        if(this.eventElementNav && load) {
            this.eventElementNav.addClass(this.classNameLoading);
        }

        if(load) {
            loadElement(this.index, 1);
            loadElement(this.index -1, -1);
        }
    }

    options(options) {
        Object.assign(this.settings, this.slider.test(typeof options !== "object", "Do klasy slider zostaĹ przekazany argument niebÄdÄcy obiektem, przekazany argument to: " + options, options));
        return this;
    }

    init() {
        if(this.slider.length === 0) return false;
        this.create();
        this.setSlide(this.index);
        this.load();
        this.event();
        this.checkJS();
    };

}