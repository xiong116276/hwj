/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function (a, b, c, d) {
    var e = a(b);
    a.fn.lazyload = function (f) {
        function g() {
            var b = 0;
            i.each(function () {
                var c = a(this);
                if (!j.skip_invisible || c.is(":visible"))if (a.abovethetop(this, j) || a.leftofbegin(this, j)); else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                    if (++b > j.failure_limit)return !1
                } else c.trigger("appear"), b = 0
            })
        }

        var h, i = this, j = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: b,
            data_attribute: "original",
            skip_invisible: !0,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABSCAYAAACYPQzSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NkNEMEUyMjNGRDcxMUU3QjQ2NUExOTc2NTk3QjVEMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NkNEMEUyMzNGRDcxMUU3QjQ2NUExOTc2NTk3QjVEMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg2Q0QwRTIwM0ZENzExRTdCNDY1QTE5NzY1OTdCNUQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg2Q0QwRTIxM0ZENzExRTdCNDY1QTE5NzY1OTdCNUQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HHWDVAAAEQZJREFUeNrsXQl0FdUZ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"
        };
        return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function () {
            return g()
        }), this.each(function () {
            var b = this, c = a(b);
            b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function () {
                if (!this.loaded) {
                    if (j.appear) {
                        var d = i.length;
                        j.appear.call(b, d, j)
                    }
                    a("<img />").bind("load", function () {
                        var d = c.attr("data-" + j.data_attribute);
                        c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                        var e = a.grep(i, function (a) {
                            return !a.loaded
                        });
                        if (i = a(e), j.load) {
                            var f = i.length;
                            j.load.call(b, f, j)
                        }
                    }).attr("src", c.attr("data-" + j.data_attribute))
                }
            }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function () {
                b.loaded || c.trigger("appear")
            })
        }), e.bind("resize", function () {
            g()
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function (b) {
            b.originalEvent && b.originalEvent.persisted && i.each(function () {
                a(this).trigger("appear")
            })
        }), a(c).ready(function () {
            g()
        }), this
    }, a.belowthefold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
    }, a.rightoffold = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
    }, a.abovethetop = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
    }, a.leftofbegin = function (c, f) {
        var g;
        return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
    }, a.inviewport = function (b, c) {
        return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
    }, a.extend(a.expr[":"], {
        "below-the-fold": function (b) {
            return a.belowthefold(b, {threshold: 0})
        }, "above-the-top": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-screen": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-screen": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }, "in-viewport": function (b) {
            return a.inviewport(b, {threshold: 0})
        }, "above-the-fold": function (b) {
            return !a.belowthefold(b, {threshold: 0})
        }, "right-of-fold": function (b) {
            return a.rightoffold(b, {threshold: 0})
        }, "left-of-fold": function (b) {
            return !a.rightoffold(b, {threshold: 0})
        }
    })
}(jQuery, window, document);