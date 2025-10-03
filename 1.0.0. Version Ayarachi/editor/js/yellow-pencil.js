(function (o) {
  "use strict";
  window.bMode = true;
  function e() {
    var e = document.body.getAttribute("data-b-mode-data");
    return void 0 === e || null === e ? {} : JSON.parse(e);
  }
  function t(t, a) {
    var i = e();
    (i[t] = a),
      document.body.setAttribute("data-b-mode-data", JSON.stringify(i));
  }
  function a(e, t) {
    !1 === t &&
      (!0 == J(e) || e == E()) &&
      window.ypData["wyp-need-to-process"] &&
      Zi();
    var a;
    if (K(e)) {
      var i = an.querySelector('[data-source-mode="' + e + '"]');
      null !== i && (a = i.innerHTML);
    } else a = an.getElementById("wyp-styles-area").innerHTML;
    return void 0 === a || 0 === a.length
      ? ""
      : (a + " /*")
          .replace(/\n/g, "")
          .replace(/\s+/g, " ")
          .replace(/\s+:\s+/g, ":");
  }
  function r(e, t, a) {
    if (
      ((e = e.replace(/\/\*/g, "\n/*").replace(/\*\//g, "*/\n")),
      J(a) && (a = ""),
      K(t))
    ) {
      "a" != a &&
        (Gi.find("[data-source-mode='" + t + "']").addClass(
          "wyp-data-updated wyp-data-only-updated"
        ),
        o("#c-t-list li[data-value='" + t + "']").addClass(
          "customizing-type-updated"
        ));
      var i = an.querySelector('[data-source-mode="' + t + '"]');
      null !== i && (i.innerHTML = e);
    } else
      "a" != a &&
        (St().addClass("wyp-data-updated wyp-data-only-updated"),
        o(".active-customizing-list").addClass("customizing-type-updated")),
        (an.getElementById("wyp-styles-area").innerHTML = e);
  }
  function l(e, t) {
    (e = e.replace(/\/\*/g, "\n/*").replace(/\*\//g, "*/\n")),
      K(t)
        ? an
            .querySelector('[data-source-mode="' + t + '"]')
            .insertAdjacentHTML("beforeend", e)
        : an
            .getElementById("wyp-styles-area")
            .insertAdjacentHTML("beforeend", e);
  }
  function d(e) {
    e = e.trim().replace(/(\/\*|^)(.*?)\*\//g, "");
    var t = "desktop",
      a = e.split("{")[0],
      i;
    return (
      -1 == e.indexOf("@media")
        ? (i = e.split("{")[1].split("}")[0])
        : ((t = e.match(/@media(.*?){/g)[0].replace(/(^@media(\s+)|\{$)/g, "")),
          (i = e.split("{")[2].split("}")[0])),
      -1 != a.indexOf("@media") && (a = e.split("{")[1].split("{")[0]),
      (i = i.split(":")[0]),
      "/* [rule=" +
        i.trim() +
        "] [selector=" +
        gi(a.trim()) +
        "] [msize=" +
        t.trim() +
        "] */ " +
        e.trim()
    );
  }
  function p(e, t, a) {
    t = t.match(/\[(.*?)\]/g);
    for (
      var i = e.split("/*"),
        n = [],
        s = t.length,
        r = o.trim(t[0]),
        l = o.trim(t[1]),
        d = o.trim(t[2]),
        p = 0,
        c;
      p < i.length;
      p++
    )
      ((c = i[p]), !(a && -1 != c.indexOf("YPtoAddBreakpoint"))) &&
        (1 != s ||
          "[style]" != r ||
          (-1 != c.indexOf("[msize=") &&
            -1 != c.indexOf("[selector=") &&
            -1 != c.indexOf("[rule="))) &&
        (3 == s &&
          -1 != c.indexOf(r) &&
          -1 != c.indexOf(l) &&
          -1 != c.indexOf(d) &&
          n.push(c),
        2 == s && -1 != c.indexOf(r) && -1 != c.indexOf(l) && n.push(c),
        1 == s && (-1 != c.indexOf(r) || "[style]" == r) && n.push(c));
    return n;
  }
  function c(e, t) {
    t = t.match(/\[(.*?)\]/g);
    for (
      var a = e.split("/*"),
        i = t.length,
        n = o.trim(t[0]),
        s = o.trim(t[1]),
        r = o.trim(t[2]),
        l = -1,
        d = 0,
        p;
      d < a.length;
      d++
    )
      if (
        ((p = a[d]),
        1 != i ||
          "[style]" != n ||
          (-1 != p.indexOf("[msize=") &&
            -1 != p.indexOf("[selector=") &&
            -1 != p.indexOf("[rule=")))
      ) {
        if (
          3 == i &&
          -1 != p.indexOf(n) &&
          -1 != p.indexOf(s) &&
          -1 != p.indexOf(r)
        ) {
          l = d;
          break;
        }
        if (2 == i && -1 != p.indexOf(n) && -1 != p.indexOf(s)) {
          l = d;
          break;
        }
        if (1 == i && (-1 != p.indexOf(n) || "[style]" == n)) {
          l = d;
          break;
        }
      }
    return 1 == l ? l - 1 : 0 < l - 1 ? l - 1 : null;
  }
  function u(e, t) {
    t = t.match(/\[(.*?)\]/g);
    for (
      var a = e.split("/*"),
        i = t.length,
        n = o.trim(t[0]),
        s = o.trim(t[1]),
        r = o.trim(t[2]),
        l = [],
        d = 0,
        p;
      d < a.length;
      d++
    )
      (p = a[d]),
        3 == i &&
          (-1 == p.indexOf(n) || -1 == p.indexOf(s) || -1 == p.indexOf(r)) &&
          l.push(p),
        2 == i && (-1 == p.indexOf(n) || -1 == p.indexOf(s)) && l.push(p),
        1 == i && -1 == p.indexOf(n) && l.push(p);
    return (l = l.filter(Boolean)), l.splice(0, 0, ""), l.join("/*").trim();
  }
  function m(e, t, a) {
    "default" == a && (a = null), (t = d(t).replace(/^\/\*/, ""));
    var n = o.trim(t.match(/\[rule\=(.*?)\]/)[0]),
      s = o.trim(t.match(/\[selector\=(.*?)\]/)[0]),
      r = o.trim(t.match(/\[msize\=(.*?)\]/)[0]);
    "a" == n && (a = null);
    var l = [],
      p = [],
      c = [],
      u = !1,
      m,
      g;
    if (0 < e.length) {
      var h = e.split("/*"),
        y;
      for (g = 0; g < h.length; g++)
        ((m = h[g]), !(1 >= m.length)) &&
          ((y = m.match(/\[msize\=(.*?)\]/)[0]),
          -1 != y.indexOf("max-width") && -1 == y.indexOf("and")
            ? l.push(m)
            : -1 != y.indexOf("min-width") && -1 == y.indexOf("and")
            ? p.push(m)
            : c.push(m));
    }
    if (-1 != r.indexOf("max-width") && -1 == r.indexOf("and")) {
      for (null != a && (a -= c.length), g = l.length; g--; )
        if (
          ((m = l[g]),
          -1 != m.indexOf(n) && -1 != m.indexOf(s) && -1 != m.indexOf(r))
        ) {
          (l[g] = t), (u = !0);
          break;
        }
      for (g = l.length; g-- && !u; )
        if (((m = l[g]), -1 != m.indexOf(s) && -1 != m.indexOf(r))) {
          null == a ? l.splice(g + 1, 0, t) : l.splice(a, 0, t), (u = !0);
          break;
        }
      (0 === l.length || !1 === u) &&
        (null == a ? l.push(t) : l.splice(a, 0, t));
    } else if (-1 != r.indexOf("min-width") && -1 == r.indexOf("and")) {
      for (null != a && (a = a - l.length - c.length), g = p.length; g--; )
        if (
          ((m = p[g]),
          -1 != m.indexOf(n) && -1 != m.indexOf(s) && -1 != m.indexOf(r))
        ) {
          (p[g] = t), (u = !0);
          break;
        }
      for (g = p.length; g-- && !u; )
        if (((m = p[g]), -1 != m.indexOf(s) && -1 != m.indexOf(r))) {
          null == a ? p.splice(g + 1, 0, t) : p.splice(a, 0, t), (u = !0);
          break;
        }
      (0 === p.length || !1 === u) &&
        (null == a ? p.push(t) : p.splice(a, 0, t));
    } else {
      for (u = !1, g = c.length; g--; )
        if (
          ((m = c[g]),
          -1 != m.indexOf(n) && -1 != m.indexOf(s) && -1 != m.indexOf(r))
        ) {
          (c[g] = t), (u = !0);
          break;
        }
      for (g = c.length; g-- && !u; )
        if (((m = c[g]), -1 != m.indexOf(s) && -1 != m.indexOf(r))) {
          null == a ? c.splice(g + 1, 0, t) : c.splice(a, 0, t), (u = !0);
          break;
        }
      (0 === c.length || !1 === u) &&
        (null == a ? c.push(t) : c.splice(a, 0, t));
    }
    return f(c, l, p, !1);
  }
  function f(e, n, s, o) {
    var r;
    if (!0 == o) {
      (n = []), (s = []), (e = []);
      var l = a().split("/*"),
        d,
        p;
      for (r = 0; r < l.length; r++)
        ((d = l[r]), !(1 >= d.length)) &&
          ((p = d.match(/\[msize\=(.*?)\]/)[0]),
          -1 != p.indexOf("max-width") && -1 == p.indexOf("and")
            ? n.push(d)
            : -1 != p.indexOf("min-width") && -1 == p.indexOf("and")
            ? s.push(d)
            : e.push(d));
    }
    var c = {},
      u = {},
      m = [],
      f = [],
      g,
      h,
      y,
      w,
      v;
    for (n = n.filter(Boolean), s = s.filter(Boolean), r = 0; r < n.length; r++)
      (g = n[r].match(/\[msize\=(.*?)\]/)[0].replace(/\D/g, "")),
        c[g] || (c[g] = []),
        c[g].push(n[r]);
    for (
      h = Object.keys(c).sort(function (e, t) {
        return t - e;
      }),
        r = 0;
      r < h.length;
      r++
    )
      m.push(c[h[r]]);
    for (r = 0; r < s.length; r++)
      (g = s[r].match(/\[msize\=(.*?)\]/)[0].replace(/\D/g, "")),
        u[g] || (u[g] = []),
        u[g].push(s[r]);
    for (
      y = Object.keys(u).sort(function (e, t) {
        return e - t;
      }),
        r = 0;
      r < y.length;
      r++
    )
      f.push(u[y[r]]);
    var b = [];
    for (r = 0; r < m.length; r++)
      for (v = 0; v < m[r].length; v++) b.push(m[r][v]);
    var x = [];
    for (r = 0; r < f.length; r++)
      for (v = 0; v < f[r].length; v++) x.push(f[r][v]);
    return (w = e.concat(b).concat(x)), w.splice(0, 0, ""), w.join("/*").trim();
  }
  function g(e) {
    return e.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
  }
  function h(e) {
    return "-webkit-" + e.replace(/(-webkit-|-moz-|-o-|-ms-|-khtml-)/g, "");
  }
  function y(e) {
    x++;
    var t = 1;
    if (
      (null == e && ((e = E()), (t = 0)),
      "single" == e
        ? n.setSession(b.singleData)
        : "template" == e
        ? n.setSession(b.templateData)
        : n.setSession(b.globalData),
      n.getSession().setUseWrapMode(!0),
      n.getSession().setUseWorker(!1),
      n.setOption("tabSize", 2),
      0 == t &&
        (o(".editor-tabs").removeClass("active"),
        o(".editor-tabs[data-type-value='" + e + "']").addClass("active")),
      A() &&
        setTimeout(function () {
          X();
        }, window.Yellow2Delay),
      window.history.pushState &&
        0 < window.location.href.split("wyp_mode=").length &&
        o.urlParam("wyp_mode") != e &&
        2 < x)
    ) {
      var a = window.location.href.split("wyp_mode=")[1];
      K(a) &&
        ((a = -1 == a.indexOf("&") ? "" : "&" + a.split(/&(.+)/)[1]),
        window.history.pushState(
          null,
          null,
          window.location.href.split("wyp_mode=")[0] + "wyp_mode=" + e + a
        ));
    }
    o("#customizing-mode").attr("data-this-type", e),
      window.ypData["vsl-css-vi-active"] &&
        o("#vsl-css-vi").attr("data-current-type", E());
  }
  function w(e, t, a, n) {
    for (var s = n.split("|"), o = 0; o < s.length; o++) e += t + s[o] + a;
    return "," == t && "" == a && (e = e.substring(1)), e;
  }
  function v(e, t) {
    return (
      !(window.ypData.demo_mode || window.bMode) &&
      void o.post(ajaxurl, {
        action: "wyp_live_save_option",
        wyp_option_name: e,
        wyp_option_value: t,
        _wpnonce: window.wyp_editor_nonce,
      })
    );
  }
  function _() {
    return window.ypData.get_selected_element;
  }
  function k(e, t) {
    var a, i, n;
    (a = o(
      "<div class='yellow-overlay'><div class='yellow-alert'></div></div>"
    )),
      e.title && a.find(".yellow-alert").append("<h2>" + e.title + "</h2>"),
      e.text && a.find(".yellow-alert").append("<p>" + e.text + "</p>"),
      e.customClass && a.addClass(e.customClass),
      e.showInput && a.find(".yellow-alert").append('<input type="text" />'),
      !0 !== e.noButton &&
        a.find(".yellow-alert").append("<div class='button-container'></div>"),
      !0 !== e.noButton &&
        e.showCancelButton &&
        ((i = o("<span class='cancel'>Cancel</span>")),
        a.find(".button-container").append(i),
        i.on("click", function () {
          tn.find(".yellow-overlay").remove();
        })),
      !0 !== e.noButton &&
        ((n = o("<span>Ok!</span>")),
        a.find(".button-container").append(n),
        e.confirmButtonText && n.text(e.confirmButtonText),
        e.confirmButtonColor &&
          n.css("background-color", e.confirmButtonColor)),
      tn.find(".yellow-overlay").remove(),
      tn.append(a),
      setTimeout(function () {
        a.css("opacity", "1");
      }, 5),
      n.on("click", function () {
        t && t(), tn.find(".yellow-overlay").remove();
      });
  }
  function C() {
    return window.ypData.is_content_selected;
  }
  function z() {
    return window.ypData.is_dragging;
  }
  function O() {
    return window.ypData.is_resizing;
  }
  function D() {
    return window.ypData.is_visual_editing;
  }
  function A() {
    return window.ypData.is_responsive_mod;
  }
  function S() {
    return window.ypData.is_animate_creator;
  }
  function T() {
    return window.ypData.is_animation_manager;
  }
  function E() {
    return o(".active-customizing-list").attr("data-value");
  }
  function L(e) {
    /\:(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/gi.test(
      e
    ) || (window.ypData["data-clickable-select"] = e);
  }
  function B(e, t) {
    var a = [],
      i = e.attr("class");
    if (K(i) && ((i = Ii(i)), (i = _i(i)), 1 <= i.length)) {
      var n = ma(i);
      if (0 < n.length)
        for (var s = 0, o; s < n.length; s++)
          (o = _i(n[s])),
            -1 == a.indexOf(o) &&
              -1 == t.indexOf(o) &&
              1 <= o.length &&
              a.push(o);
      else -1 == a.match(i) && -1 == t.indexOf(i) && a.push(i);
    }
    return a;
  }
  function M(e) {
    var t = !1;
    Ji.hasClass("wyp-wf-on") && ((t = !0), Ji.removeClass("wyp-wf-on"));
    var n, s, r, d;
    if ("typography" == e) {
      (window.colorJsonList = []),
        o(
          ".info-color-scheme-list,.info-font-family-list,.info-animation-list,.info-basic-typography-list,.info-image-list"
        ).empty();
      var c = o(".info-color-scheme-list"),
        u = o(".info-font-family-list"),
        m = o(".info-image-list"),
        f = o(".info-animation-list"),
        g = o(".info-basic-typography-list"),
        h,
        w,
        v;
      Ji.append(
        "<h1 id='wyp-heading-test-level-1'></h1><h2 id='wyp-heading-test-level-2'></h2><h3 id='wyp-heading-test-level-3'></h3><h4 id='wyp-heading-test-level-4'></h4><h5 id='wyp-heading-test-level-5'></h5><h6 id='wyp-heading-test-level-6'></h6><h6 id='wyp-paragraph-test'></h6>"
      );
      var b = Ji.find("#wyp-paragraph-test"),
        k = Math.round(10 * parseFloat(Ji.css("fontSize"))) / 10,
        z = Math.round(10 * parseFloat(b.css("fontSize"))) / 10;
      for (
        w = Ji.css("fontFamily"),
          v = b.css("fontFamily"),
          g
            .append(
              '<li><span class="typo-list-left">' +
                qi.general +
                ' (body)</span><span class="typo-list-right"><span>' +
                k +
                "px, " +
                P(w) +
                "</span></span></li>"
            )
            .append(
              '<li><span class="typo-list-left">' +
                qi.paragraph +
                '</span><span class="typo-list-right"><span>' +
                z +
                "px, " +
                P(v) +
                "</span></span></li>"
            ),
          b.remove(),
          s = "",
          r = 1;
        6 >= r;
        r++
      ) {
        d = Ji.find("#wyp-heading-test-level-" + r);
        var O = parseFloat(d.css("fontSize"));
        (O = Math.round(10 * O) / 10),
          (h = d.css("fontFamily")),
          (s +=
            '<li><span class="typo-list-left">' +
            qi.heading_level +
            " " +
            r +
            '</span><span class="typo-list-right"><span>' +
            O +
            "px, " +
            P(h) +
            "</span></span></li>"),
          d.remove();
      }
      g.append(s);
      var D = [],
        A = [],
        S = [],
        T = [];
      n = Ji.find(ui());
      var E = 0;
      for (r = 0; r < n.length && !(1e4 < r); r++) {
        var L = n[r].tagName;
        if (
          !/^(UL|LI|SPAN|A|I|STRONG|IFRAME|LABEL|BUTTON|FORM|INPUT|B|EM)$/g.test(
            L
          )
        ) {
          if (n[r].clientWidth && 40 > n[r].clientWidth) {
            E++;
            continue;
          }
          (d = o(n[r])),
            (h = P(d.css("fontFamily")).toLowerCase()),
            -1 == A.indexOf(h) && A.push(h);
          var M = d.css("backgroundColor").toLowerCase().replace(/ /g, "");
          if (
            ("transparent" != M &&
              "rgb(255,255,255)" != M &&
              "rgba(0,0,0,0)" != M &&
              "rgba(255,255,255,0)" != M &&
              D.push(M),
            -1 != d.css("background-image").indexOf("http"))
          ) {
            var R = d.css("background-image");
            !0 == /url\((\"|\')?(.*?)(\"|\')?\)/i.test(R) &&
              T.push(
                R.match(/url\((\"|\')?(.*?)(\"|\')?\)/i)[0]
                  .replace(/^url\(("|'|)/g, "")
                  .replace(/("|'|)\)$/g, "")
              );
          }
          if ("IMG" == L) {
            var I = d.attr("src");
            d.hasAttr("data-src") && (I = d.attr("data-src")),
              null != I && "" != I && null != I && T.push(I);
          }
        }
      }
      var Y = p(a(null, !1), "[rule=animation-name]"),
        N,
        H;
      for (r = 0; r < Y.length; r++)
        (N = Y[r].replace(/(\/\*(.*?)\*\/|\n)/g, "")),
          (H = Vt(N)),
          -1 == S.indexOf(H) && S.push(H);
      s = "";
      var W = [];
      for (r = 0; r < D.length; r++)
        if (-1 == W.indexOf(D[r])) {
          for (var F = 0, j = 0; j < D.length; j++) D[j] == D[r] && F++;
          var X = (100 * F) / D.length;
          W.push(D[r]),
            window.colorJsonList.push(D[r]),
            (s +=
              '<div data-width="' +
              X +
              '" data-color="' +
              D[r] +
              '" style="width:' +
              X +
              "%;background-color:" +
              D[r] +
              ';"></div>');
        }
      c.append(s), (s = "");
      var V = [];
      for (
        o.each(T, function (e, t) {
          -1 === o.inArray(t, V) && V.push(t);
        }),
          r = 0;
        r < V.length;
        r++
      )
        -1 === V[r].indexOf("wyp_rand=") &&
          -1 === V[r].indexOf("wyp_mode=") &&
          -1 === V[r].indexOf("bing.com/action/") &&
          (s += "<img src='" + V[r] + "' />");
      for (
        "" == s ? (m.prev("h3").remove(), m.remove()) : m.append(s),
          s = "",
          r = 0;
        r < A.length;
        r++
      )
        s += "<li>" + A[r] + "</li>";
      for (u.append(s), s = "", r = 0; r < S.length; r++)
        s += "<li>" + S[r] + "</li>";
      f.append(s),
        0 == S.length
          ? o("#animations-heading").hide()
          : o("#animations-heading").show();
    } else if ("element" == e) {
      var U = o(".info-element-general"),
        q = o(".info-element-accessibility"),
        $ = o(".info-element-class-list"),
        G = o(".info-element-selector-list");
      if (
        (o(
          ".info-element-general,.info-element-class-list,.info-element-selector-list,.info-element-accessibility"
        ).empty(),
        C())
      ) {
        o(".info-no-element-selected").hide(),
          o(".info-element-selected-section").show(),
          o("info-element-selector-section").hide();
        var J = _(),
          Q = J.attr("id");
        K(Q) &&
          "" !== Q &&
          U.append(
            '<li><span class="typo-list-left">' +
              qi.element_id +
              '</span><span class="typo-list-right"><span>#' +
              Q +
              "</span></span></li>"
          ),
          U.append(
            '<li><span class="typo-list-left">' +
              qi.tag +
              '</span><span class="typo-list-right"><span>' +
              J.prop("tagName") +
              "</span></span></li>"
          ),
          U.append(
            '<li><span class="typo-list-left">' +
              qi.affected_els +
              '</span><span class="typo-list-right"><span>' +
              (parseInt(Ji.find(".wyp-selected-others").length) + 1) +
              "</span></span></li>"
          );
        var ee = B(J, []),
          te;
        for (s = "", te = 0; te < ee.length; te++)
          s += "<li>." + ee[te] + "</li>";
        if (
          ($.append(s),
          0 === $.find("li").length
            ? o(".info-element-classes-section").hide()
            : o(".info-element-classes-section").show(),
          G.append("<li>" + _a() + "</li>"),
          0 < J.text().length)
        ) {
          q.append(
            '<li class="contrast-accessibility"><span class="typo-list-left">Text Contrast</span><span class="typo-list-right"><span>' +
              ia() +
              "</span></span></li>"
          );
          var ae = parseFloat(J.height()) / ta(J);
          2 <= ae &&
            q.append(
              '<li class="line-spacing-accessibility"><span class="typo-list-left">Line Spacing</span><span class="typo-list-right"><span>' +
                aa() +
                "</span></span></li>"
            ),
            q.append(
              '<li class="font-size-accessibility"><span class="typo-list-left">Legibility</span><span class="typo-list-right"><span>' +
                ea() +
                "</span></span></li>"
            );
        }
        0 === q.find("li").length
          ? o(".info-element-accessibility-section").hide()
          : o(".info-element-accessibility-section").show();
        var ie = J.clone();
        for (
          ie.removeAttr("class"), ie.removeAttr("data-wyp-slctr"), te = 0;
          te < ee.length;
          te++
        )
          ie.addClass(ee[te]);
        ie.html("...");
        var ne = o("<div />").append(ie).html();
        (ne = ne.replace(/(\s+)?style=\"\"/, "")),
          o(".info-element-dom").val(ne);
      } else
        o(".info-no-element-selected").show(),
          o(".info-element-selected-section").hide();
    }
    !0 == t && Ji.addClass("wyp-wf-on"),
      Z(),
      o(".info-element-accessibility li").tooltip("destroy"),
      o(".font-size-accessibility").tooltip({
        trigger: "hover",
        container: ".advanced-info-box-inner",
        title: qi.font_size_ac,
        delay: { show: 100, hide: 0 },
      }),
      o(".line-spacing-accessibility").tooltip({
        trigger: "hover",
        container: ".advanced-info-box-inner",
        title: qi.line_spacing_ac,
        delay: { show: 100, hide: 0 },
      }),
      o(".contrast-accessibility").tooltip({
        trigger: "hover",
        container: ".advanced-info-box-inner",
        title: qi.contrast_ac,
        delay: { show: 100, hide: 0 },
      });
  }
  function Z() {
    new ClipboardJS(".info-color-scheme-list div", {
      text: function (e) {
        return Pi(e.getAttribute("data-color"));
      },
    }),
      o(".info-color-scheme-list > div").tooltip("destroy"),
      o(".info-color-scheme-list > div").tooltip({
        animation: !0,
        trigger: "manual",
        container: ".advanced-info-box-inner",
        html: !0,
      }),
      o(".info-color-scheme-list > div").on("mouseenter", function () {
        o(this)
          .attr("data-original-title", Pi(o(this).attr("data-color")))
          .tooltip("fixTitle")
          .tooltip("show");
      }),
      o(".info-color-scheme-list > div").on("click", function () {
        o(this)
          .attr("data-original-title", "Copied!")
          .tooltip("fixTitle")
          .tooltip("show");
      }),
      o(".info-color-scheme-list > div").on("mouseleave", function () {
        o(this).tooltip("hide");
      }),
      new ClipboardJS(".info-image-list img", {
        text: function (e) {
          return e.getAttribute("src");
        },
      }),
      o(".info-image-list img").tooltip("destroy"),
      o(".info-image-list img").tooltip({
        placement: "top",
        animation: !0,
        trigger: "manual",
        container: ".advanced-info-box-inner",
        html: !0,
      }),
      o(".info-image-list img").on("mouseenter", function () {
        o(this)
          .attr("data-original-title", "Copy URL")
          .tooltip("fixTitle")
          .tooltip("show");
      }),
      o(".info-image-list img").on("click", function () {
        o(this)
          .attr("data-original-title", "Copied!")
          .tooltip("fixTitle")
          .tooltip("show");
      }),
      o(".info-image-list img").on("mouseleave", function () {
        o(this).tooltip("hide");
      });
  }
  function P(e) {
    return null == e
      ? ""
      : (-1 != e.indexOf(",") && (e = e.split(",")[0]),
        (e = o.trim(e).replace(/\W+/g, " ")),
        o.trim(e));
  }
  function R(e, t) {
    var a = "",
      i = new Date();
    i.setTime(i.getTime() + 31536000000),
      (a = "; expires=" + i.toUTCString()),
      (document.cookie = e + "=" + t + a + "; path=/");
  }
  function I(e, t) {
    for (
      var a = e + "=", n = document.cookie.split(";"), s = 0, r;
      s < n.length;
      s++
    ) {
      for (r = n[s]; " " == r.charAt(0); ) r = r.substring(1, r.length);
      if (0 == r.indexOf(a)) return parseInt(r.substring(a.length, r.length));
    }
    return window.ypData["wyp-fix-pan"] && "visualManagerWidth" == e
      ? parseInt(o(".ed-pnl").width())
      : parseInt(t);
  }
  function Y(e, t) {
    var a = "<style id='csseditor-personalized-view'>",
      i = 0;
    window.ypOption.fixed_left_bar &&
      !window.ypData["wyp-css-ed-drgable"] &&
      (i = 44),
      (a +=
        "#cssData,#cssEditorBar,#leftAreaEditor{width:" +
        parseFloat(e) +
        "px!important}body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable) #iframe{left:" +
        (e + i) +
        "px!important;margin-left:0 !important}body.wyp-css-ed-act:not(.wyp-css-ed-drgable):not(.wyp-fix-leftbar) .editor-leftbar,body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable) .metric-top-tooltip,body.wyp-css-ed-act:not(.wyp-res-mod):not(.wyp-css-ed-drgable):not(.wyp-crnt-el-menu) .context-menu-root:not(.dom_contextmenu){margin-left:" +
        (e + i) +
        "px!important}"),
      window.ypOption.fixed_left_bar &&
        ((a +=
          "body.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #leftAreaEditor{left:44px !important;}"),
        (a +=
          ".breakpoint-bar .min-width.breakpoint-item.last-min-breakpoint {width: calc(100% - 44px) !important;}"));
    var n = o(window).width();
    e > (40 * n) / 100
      ? (a +=
          "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{display:none !important}")
      : ((a +=
          "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{max-width:" +
          parseFloat((40 * (100 - (100 * e) / n)) / 100) +
          "% !important;}"),
        (a +=
          "body.wyp-css-ed-act:not(.wyp-css-ed-drgable) #ed-elt-tr{left:" +
          e +
          "px!important;}"),
        (a +=
          "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr{left:0px!important;z-index:9999999 !important;background-color:#d7d7d7 !important;}"),
        (a +=
          "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr ul li:not(.active):after{border-left-color:#d7d7d7 !important;}"),
        (a +=
          "body.wyp-css-ed-act.wyp-fix-leftbar:not(.wyp-css-ed-drgable) #ed-elt-tr ul li.active{background-color:#f8f8f8 !important;}")),
      t &&
        (a +=
          ".wyp-css-ed-drgable #cssData{height: " +
          t +
          "px;}.wyp-css-ed-drgable #leftAreaEditor{height: calc(" +
          t +
          "px + 36px);}"),
      (a += "}</style>"),
      tn.find("#csseditor-personalized-view").remove(),
      tn.append(a);
  }
  function N(e) {
    var t = 0,
      a = o(window).width(),
      i = A(),
      n = 0,
      s = 0;
    window.ypOption.fixed_left_bar && ((n = 44), (a -= n));
    var r = o("#iframe-general-style"),
      l,
      d;
    if (
      (e || r.remove(),
      i ||
        (window.ypData["vsl-css-vi-active"] && (t += o("#vsl-css-vi").width()),
        window.ypData["wyp-css-ed-act"] &&
          !window.ypData["wyp-css-ed-drgable"] &&
          (t += o("#leftAreaEditor").width())),
      (d = a - t),
      window.ypData["wyp-fix-pan"] &&
        !1 == tn.hasClass("wyp-cln-lo-panel-only") &&
        !1 == tn.hasClass("wyp-cln-lo-manual") &&
        !1 == T() &&
        (t += o(".ed-pnl").width()),
      (l = a - t),
      e)
    )
      return l;
    var p = "<style id='iframe-general-style'>";
    if (
      ((p += "#iframe{width:" + l + "px;}"),
      window.ypOption.fixed_left_bar &&
        !1 === i &&
        (p += "#iframe{margin-left:" + n + "px;}"),
      i)
    )
      if (
        ((s = o(".ed-pnl").width()),
        window.ypOption.fixed_left_bar &&
          window.ypOption.fixed_right_panel &&
          !1 === tn.hasClass("wyp-cln-lo-manual") &&
          !1 === tn.hasClass("wyp-cln-lo-panel-only") &&
          !1 === T())
      )
        (p +=
          ".responsive-size-text,#iframe{left:calc(50% - (" +
          s +
          "px/2) + (" +
          n +
          "px/2)) !important;}"),
          (p +=
            ".breakpoint-bar{margin-left:" +
            n +
            "px !important;width:calc(100% - " +
            s +
            "px - " +
            n +
            "px) !important;}");
      else if (
        window.ypOption.fixed_left_bar &&
        !0 === window.ypOption.fixed_right_panel &&
        tn.hasClass("wyp-cln-lo-manual")
      )
        (p +=
          ".responsive-size-text,#iframe{left:calc(50% + (" +
          n +
          "px/2)) !important;}"),
          (p +=
            ".breakpoint-bar{margin-left:" +
            n +
            "px !important;width:calc(100% - " +
            n +
            "px) !important;}");
      else if (
        window.ypOption.fixed_left_bar &&
        !0 === window.ypOption.fixed_right_panel &&
        tn.hasClass("wyp-cln-lo-panel-only")
      ) {
        var c = o("#vsl-css-vi").width();
        (p +=
          ".responsive-size-text,#iframe{left:calc(50% - (" +
          c +
          "px/2) + (" +
          n +
          "px/2)) !important;}"),
          (p +=
            ".breakpoint-bar{margin-left:" +
            n +
            "px !important;width:calc(100% - " +
            c +
            "px - " +
            n +
            "px) !important;}");
      } else
        window.ypOption.fixed_left_bar &&
        !1 === window.ypOption.fixed_right_panel
          ? ((p +=
              ".responsive-size-text,#iframe{left:calc(50% + (" +
              n +
              "px/2)) !important;}"),
            (p +=
              ".breakpoint-bar{margin-left:" +
              n +
              "px !important;width:calc(100% - " +
              n +
              "px) !important;}"))
          : !1 === window.ypOption.fixed_left_bar &&
            window.ypOption.fixed_right_panel &&
            ((p +=
              ".responsive-size-text,#iframe{left:calc(50% - (" +
              s +
              "px/2)) !important;}"),
            (p +=
              ".breakpoint-bar{width:calc(100% - " + s + "px) !important;}"));
    (p += "</style>"),
      tn.append(p),
      window.ypData.editor_context_menu_open && _().contextMenu("hide"),
      i && j();
  }
  function H() {
    var e = [];
    0 < o(".wyp-anim-process-bar-area").length &&
      o(".wyp-anim-process-bar-area").each(function () {
        var t = o(this).attr("data-selector-full");
        -1 == e.indexOf(t) && e.push(t);
      }),
      o(".wyp-animate-manager [data-toggle='tooltipAnim']").tooltip("destroy"),
      0 <
        o(
          ".wyp-anim-process-bar-delay.ui-resizable-e,.wyp-anim-process-bar.ui-resizable-e"
        ).length &&
        o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").resizable(
          "destroy"
        ),
      o(".wyp-anim-el-column,.wyp-animate-bar").remove(),
      o(".wyp-anim-metric").empty();
    for (var n = 1; 61 > n; n++)
      o(".wyp-anim-metric").append(
        '<div class="second"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b>' +
          n +
          "s</b></div>"
      );
    for (
      var s = ["single", "template", "global"],
        r = 0,
        l = 0,
        d,
        c,
        u,
        m,
        f,
        g,
        h,
        y,
        w,
        v,
        b,
        x;
      l < s.length;
      l++
    ) {
      var _ = a(s[l], !1),
        k = p(_, "[rule=animation-name]"),
        z;
      for (n = 0; n < k.length; n++)
        (z = Ut(k[n])), -1 == e.indexOf(z) && e.push(z);
      if (0 < e.length)
        for (n = 0; n < e.length; n++) {
          d = p(_, "[selector=" + gi(e[n]) + "][rule=animation-name]");
          for (var O = 0; O < d.length; O++) {
            r++,
              (c = d[O].replace(/(\/\*)(.*?)\*\//g, "")),
              (u = /\[msize\=(.*?)\]/g.exec(d[O])[1].trim()),
              (z = Ut(c)),
              (m = Vt(c)),
              (f = "0s"),
              (g = "1s"),
              (h = "yp_onscreen"),
              /yp(-|_)hover/g.test(z)
                ? (h = "yp_hover")
                : /yp(-|_)focus/g.test(z)
                ? (h = "yp_focus")
                : /yp(-|_)click/g.test(z)
                ? (h = "yp_click")
                : /yp(-|_)onscreen/g.test(z) && (h = "yp_onscreen"),
              (y = ""),
              (w = ""),
              (v = h.replace("yp_", "")),
              (y = "desktop" == u ? qi.all_devices : u),
              "" !== y &&
                (w =
                  " <span class='wyp-device-responsive'>" +
                  y +
                  "</span><span class='wyp-type-anim-text'>" +
                  yi(s[l]) +
                  "</span>"),
              (b = z.replace(
                /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g,
                ""
              )),
              (x = ""),
              (x =
                0 < Gi.find(b).length
                  ? yi(bi(b, !0, null)).replace(/\(\d+\)/g, "")
                  : yi(vi(b)));
            var D = p(
              _,
              "[selector=" +
                gi(z) +
                "][rule=animation-duration][msize=" +
                u +
                "]"
            );
            0 < D.length &&
              ((g = D[0].replace(/(\/\*(.*?)\*\/|\n)/g, "")), (g = Vt(g)));
            var A = p(
              _,
              "[selector=" + gi(z) + "][rule=animation-delay][msize=" + u + "]"
            );
            0 < A.length &&
              ((f = A[0].replace(/(\/\*(.*?)\*\/|\n)/g, "")), (f = Vt(f)));
            var S = o.trim(
                g
                  .replace("/[^0-9.]+/g", "")
                  .replace(/ms/g, "")
                  .replace(/s/g, "")
              ),
              T = o.trim(
                f
                  .replace("/[^0-9.]+/g", "")
                  .replace(/ms/g, "")
                  .replace(/s/g, "")
              );
            -1 == m.indexOf(",") &&
              ((S *= 100), (T *= 100), 10 > T && (T = 10));
            var L = "";
            10 == T && (L = " wyp-delay-zero");
            var B =
                "<div class='wyp-anim-process-bar-delay" +
                L +
                "' data-toggle='tooltipAnim' data-placement='top' title='" +
                qi.delay +
                " " +
                parseFloat(f).toFixed(2) +
                "s' style='width:" +
                T +
                "px;'></div><div class='wyp-anim-process-bar' data-toggle='tooltipAnim' data-placement='top' title='" +
                qi.duration +
                ": " +
                parseFloat(g).toFixed(2) +
                "s' style='width:" +
                S +
                "px;'><span class='animate-part-icons wyp-control-trash' data-toggle='tooltipAnim' data-placement='top' title='" +
                qi.delete_t +
                "'><span class='yicon icon-trash'></span></span><span class='animation-name'>" +
                m +
                "</span></div>",
              M,
              Z,
              P;
            if (-1 != m.indexOf(",")) {
              B = "";
              for (var R = 0, I = 0; I < m.split(",").length; I++) {
                (M =
                  -1 == T.toString().indexOf(",")
                    ? T
                    : o.trim(T.split(",")[I])),
                  J(M) && (M = 0),
                  (Z =
                    -1 == g.toString().indexOf(",")
                      ? g
                      : o.trim(g.split(",")[I])),
                  J(Z) && (Z = "1s"),
                  (P =
                    -1 == S.toString().indexOf(",")
                      ? S
                      : o.trim(S.split(",")[I])),
                  J(P) && (P = 1);
                var Y = o.trim(
                  m
                    .split(",")
                    [I].replace(/\s+?!important/g, "")
                    .replace(/\;$/g, "")
                );
                (P *= 100), (M *= 100);
                var H = M - R,
                  W = H / 100;
                10 >= H && ((H = 10), (W = "0s")),
                  (L = ""),
                  10 == H && (L = " wyp-delay-zero"),
                  (B +=
                    "<div class='wyp-anim-process-bar-delay" +
                    L +
                    "' data-toggle='tooltipAnim' data-placement='top' title='" +
                    qi.delay +
                    " " +
                    parseFloat(W).toFixed(2) +
                    "s' style='width:" +
                    H +
                    "px;'></div><div class='wyp-anim-process-bar' data-toggle='tooltipAnim' data-placement='top' title='" +
                    qi.duration +
                    ": " +
                    parseFloat(Z).toFixed(2) +
                    "s' style='width:" +
                    P +
                    "px;'><span class='animate-part-icons wyp-control-trash' data-toggle='tooltipAnim' data-placement='top' title='" +
                    qi.delete_t +
                    "'><span class='yicon icon-trash'></span></span><span class='animation-name'>" +
                    Y +
                    "</span></div>"),
                  (R = M + P);
              }
            }
            var j = "";
            !1 == Ca(b, !0, !1, !1) && (j = " unavailable-animate-bar"),
              o(".wyp-anim-left-part-column").append(
                "<div class='wyp-anim-el-column wyp-anim-el-column-" +
                  gi(b) +
                  "" +
                  j +
                  "' data-anim-media-size='" +
                  u +
                  "'><i data-title='" +
                  b +
                  "'></i><span>" +
                  x +
                  "</span> <label>" +
                  v +
                  "</label>" +
                  w +
                  "</div>"
              ),
              o(".wyp-anim-right-part-column").append(
                "<div class='wyp-animate-bar" +
                  j +
                  "' id='wyp-animate-bar-" +
                  r +
                  "'><div class='wyp-anim-process-bar-area' data-responsive='" +
                  u +
                  "' data-selector='" +
                  b +
                  "' data-selector-full='" +
                  z +
                  "' data-anim-type='" +
                  s[l] +
                  "'><div class='wyp-anim-process-inner'>" +
                  B +
                  "</div><a class='wyp-anim-add' data-toggle='tooltipAnim' data-placement='right' title='" +
                  qi.add_new_anim +
                  "'></a></div>"
              );
          }
        }
    }
    o(".wyp-delay-zero").each(function () {
      var e = o(".wyp-anim-process-inner").offset().left - 5,
        t = o(this).next(".wyp-anim-process-bar").offset().left - e;
      o(this).css("left", t),
        o(this)
          .next(".wyp-anim-process-bar")
          .addClass("wyp-anim-has-zero-delay");
    });
    var X = _a(),
      V = Fe(),
      U = o(
        ".wyp-anim-el-column-" + gi(X) + "[data-anim-media-size='" + V + "']"
      );
    K(X) && 0 === U.length && C()
      ? ((x = ""),
        (x =
          0 < Gi.find(X).length
            ? yi(bi(X, !0, null)).replace(/\(\d+\)/g, "")
            : yi(vi(X))),
        (w =
          "desktop" == V
            ? " <span class='wyp-device-responsive'>" +
              qi.all_devices +
              "</span>"
            : " <span class='wyp-device-responsive'>" + V + "</span>"),
        o(".wyp-anim-left-part-column").append(
          "<div class='wyp-anim-el-column anim-active-row wyp-anim-el-column-" +
            gi(X) +
            "' data-anim-media-size='" +
            V +
            "'><i data-title='" +
            X +
            "'></i><span>" +
            x +
            "</span> <label>onscreen</label>" +
            w +
            "<span class='wyp-type-anim-text'>" +
            yi(E()) +
            "</span></div>"
        ),
        o(".wyp-anim-right-part-column").append(
          "<div class='wyp-animate-bar anim-active-row' id='wyp-animate-bar-current'><div class='wyp-anim-process-bar-area' data-responsive='" +
            V +
            "' data-anim-type='" +
            o(".active-customizing-list").attr("data-value") +
            "' data-selector='" +
            X +
            "' data-selector-full='" +
            (X +
              ".yp_onscreen'><div class='wyp-anim-process-inner'></div><a class='wyp-anim-add' data-toggle='tooltipAnim' data-placement='right' title='") +
            qi.add_new_anim +
            "'></a></div>"
        ))
      : U.addClass("anim-active-row"),
      o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").resizable({
        handles: "e",
        minWidth: 10,
        start: function () {
          o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar")
            .not(this)
            .tooltip("disable")
            .tooltip("hide");
        },
        resize: function (e, t) {
          var a = o(this),
            i = t.size.width,
            n = parseFloat(i / 100).toFixed(2),
            r;
          a.hasClass("wyp-anim-process-bar-delay")
            ? (10 == i && (n = "0"),
              (r = qi.delay + ": " + n),
              10 >= i
                ? (a.addClass("wyp-delay-zero"),
                  a
                    .next(".wyp-anim-process-bar")
                    .addClass("wyp-anim-has-zero-delay"))
                : a.hasClass("wyp-delay-zero") &&
                  (a.removeClass("wyp-delay-zero").css("left", "0"),
                  a
                    .next(".wyp-anim-process-bar")
                    .removeClass("wyp-anim-has-zero-delay")))
            : (r = qi.duration + ": " + n),
            o(this)
              .parents(".wyp-animate-bar")
              .find(".wyp-delay-zero")
              .each(function () {
                var e = o(".wyp-anim-process-inner").offset().left - 5,
                  t = o(this).next(".wyp-anim-process-bar").offset().left - e;
                o(this).css("left", t);
              }),
            a.attr("data-original-title", r + "s").tooltip("show");
        },
        stop: function () {
          F(),
            o(this).tooltip("hide"),
            o(".wyp-anim-process-bar-delay,.wyp-anim-process-bar").tooltip(
              "enable"
            );
        },
      }),
      o('[data-toggle="tooltipAnim"]').tooltip({
        container: ".wyp-animate-manager",
        html: !0,
      }),
      o("[data-toggle='tooltipAnim']").on("show.bs.tooltip", function () {
        o("[data-toggle='tooltipAnim']").not(this).tooltip("hide");
      }),
      0 === o(".wyp-animate-bar").length
        ? (o(".animation-manager-empty").show(),
          o(".wyp-anim-list-menu").hide())
        : o(".animation-manager-empty").hide();
    var q = Math.max.apply(
      null,
      o(".wyp-anim-process-inner")
        .map(function () {
          return o(this).outerWidth(!0);
        })
        .get()
    );
    o(".wyp-anim-process-bar-area").width(q + o(window).width()), N();
  }
  function W(e) {
    if (tn.hasClass("wyp-bg-layer-active")) return !1;
    (e.container = e.container ? o(e.container) : tn),
      e.background || (e.background = "transparent");
    var t = o(
      "<div id='fake-layer' style='position:fixed;left:0;top:0;width:100%;height:100%;z-index:" +
        e.index +
        ";background-color:" +
        e.background +
        "'></div>"
    );
    void 0 !== e.custom_class && t.addClass(e.custom_class),
      e.container.append(t),
      tn.addClass("wyp-bg-layer-active"),
      t.on(
        "click mousewheel DOMMouseScroll",
        o.throttle(function () {
          t.remove(), tn.removeClass("wyp-bg-layer-active"), e.callback();
        }, 64)
      );
  }
  function F() {
    window.ypData["wyp-animate-manager-mode"] = !0;
    var e = Math.max.apply(
      null,
      o(".wyp-anim-process-inner")
        .map(function () {
          return o(this).outerWidth(!0);
        })
        .get()
    );
    o(".wyp-anim-process-bar-area").width(e + o(window).width()),
      o(".wyp-animate-bar").each(function () {
        var e = o(this)
            .find(".wyp-anim-process-bar-area")
            .attr("data-selector-full"),
          t = [],
          a = [],
          i = [],
          n = 0,
          r = "",
          l = o(this)
            .find(".wyp-anim-process-bar-area")
            .attr("data-responsive"),
          d = o(this).find(".wyp-anim-process-bar-area").attr("data-anim-type");
        o(this)
          .find(".wyp-anim-process-bar,.wyp-anim-process-bar-delay")
          .each(function () {
            var p = o(this).width(),
              c = p / 100;
            if (
              o(this).hasClass("wyp-anim-process-bar-delay") &&
              1 == o(this).parent().find(".wyp-anim-process-bar-delay").length
            )
              10 == p && (c = "0"),
                tt(
                  e,
                  "animation-delay",
                  Math.round(100 * c) / 100 + "s",
                  "",
                  l,
                  d
                );
            else if (
              o(this).hasClass("wyp-anim-process-bar") &&
              1 == o(this).parent().find(".wyp-anim-process-bar").length
            )
              tt(e, "animation-duration", c, "s", l, d),
                tt(e, "animation-name", o(this).text(), "", l, d),
                t.push(o(this).text());
            else if (
              (1 <
                o(this).parent().find(".wyp-anim-process-bar-delay").length ||
                1 < o(this).parent().find(".wyp-anim-process-bar").length) &&
              (o(this).hasClass("wyp-anim-process-bar-delay") &&
                ((r =
                  o(this).offset().left -
                  o(this).parent(".wyp-anim-process-inner").offset().left),
                (r /= 100),
                (r = Math.round(100 * r) / 100),
                10 < o(this).width()
                  ? ((n = o(this).width() / 100),
                    (n = Math.round(100 * n) / 100),
                    a.push(n + r + "s"))
                  : a.push(r + "s")),
              o(this).hasClass("wyp-anim-process-bar"))
            ) {
              var u = o(this).width() / 100;
              i.push(u + "s"), t.push(o(this).text());
            }
          }),
          1 < a.length
            ? (tt(e, "animation-delay", a.toString(), "", l, d),
              tt(e, "animation-duration", i.toString(), "", l, d),
              tt(e, "animation-name", t.toString(), "", l, d))
            : 0 === t.length &&
              window.ypData["wyp-anim-removing"] &&
              (tt(e, "animation-delay", "disable", "", l, d),
              tt(e, "animation-duration", "disable", "", l, d),
              tt(e, "animation-name", "disable", "", l, d)),
          Mi();
      }),
      (window.ypData["wyp-animate-manager-mode"] = void 0);
  }
  function j(e) {
    if (!1 === A()) return !1;
    var t = o("#iframe").get(0).getBoundingClientRect(),
      a = o(window).height() - t.top,
      i =
        "body.wyp-res-mod:not(.wyp-crnt-el-menu) .context-menu-root:not(.dom_contextmenu){margin-left:" +
        t.left +
        "px !important;}.responsive-right-handle{left:" +
        parseInt(t.right) +
        "px !important;top:" +
        t.top +
        "px !important;height:" +
        a +
        "px !important;}.responsive-left-handle{left:" +
        (t.left - 14) +
        "px !important;top:" +
        t.top +
        "px !important;height:" +
        a +
        "px !important;}";
    (i +=
      "left" === e
        ? "body.wyp-res-mod .metric-left-tooltip,body.wyp-res-mod .metric-top-border{transform:translate3d(" +
          parseInt(t.left - 2) +
          "px, 0px, 0px) !important;}"
        : "body.wyp-res-mod .metric-left-tooltip,body.wyp-res-mod .metric-top-border{transform:translate3d(" +
          parseInt(t.right) +
          "px, 0px, 0px) !important;}"),
      (i +=
        0 ===
        o(".breakpoint-bar [data-breakpoint=" + parseInt(t.width) + "]").length
          ? ".responsive-add-breakpoint{left:" +
            t.right +
            "px !important;display:block !important;}"
          : ".responsive-add-breakpoint{display:none !important;}");
    var n = tn.find("#responsive-live-style");
    0 === n.length
      ? tn.append("<style id='responsive-live-style'>" + i + "</style>")
      : n.text(i);
  }
  function X() {
    o(".breakpoint-bar .breakpoint-item").removeClass("active focus edited");
    var e, t, i, n, s, r;
    (i = o(".breakpoint-bar .breakpoint-item")),
      (s = o("#iframe").width()),
      i.each(function () {
        (e = o(this)), (t = e.attr("data-breakpoint-data"));
        var i = p(a(null, !1), "[msize=" + t + "]", !0);
        if (
          (e.attr("data-edits", i.length),
          0 < i.length && e.addClass("edited"),
          nn.matchMedia(t).matches)
        ) {
          n = parseInt(e.css("width"));
          var l = o(".responsive-size-text");
          s <= n &&
            (o(".breakpoint-bar .breakpoint-item.focus").removeClass("focus"),
            e.addClass("focus"),
            l.find(".device-size").text(e.attr("data-breakpoint")));
        } else if (parseFloat(o(".breakpoint-bar .breakpoint-item.focus").attr("data-breakpoint")) !== s && ((r = e.attr("data-breakpoint")), 1 == Math.abs(r - s))) return Ja(e), !1;
      }),
      o(".breakpoint-bar .breakpoint-item.focus")
        .nextAll(".breakpoint-item")
        .addClass("active"),
      0 === o(".breakpoint-bar .breakpoint-item.focus").length &&
        o(".breakpoint-bar .breakpoint-item").addClass("active"),
      setTimeout(function () {
        ye();
      }, window.Yellow2Delay);
  }
  function V(e) {
    0 === Gi.find("#wyp-live-css-data").length &&
      St().after("<style id='wyp-live-css-data'></style>"),
      (e = Ne(e)),
      zi(e),
      (window.ypData["wyp-need-to-process"] = !0),
      Gi.find("#wyp-live-css-data").text(e),
      St().empty(),
      Gi.find(".wyp-live-css").remove(),
      o(".wyp-save-btn")
        .text(qi.save)
        .removeClass("wyp-disabled")
        .addClass("waiting-for-save"),
      St().addClass("wyp-data-updated"),
      o(".active-customizing-list").addClass("customizing-type-updated");
  }
  function U() {
    if (!1 === n.session.getUndoManager().hasUndo())
      return Li("", "There's nothing else to undo", "undoRedoNote"), !1;
    if (
      (Bi("undoRedoNote"),
      O() || D() || z() || window.ypData["wyp-processing-now"])
    )
      return !1;
    if (S()) return k({ title: qi.sorry, text: qi.cantUndo }), !1;
    if (T()) return k({ title: qi.sorry, text: qi.cantUndoAnimManager }), !1;
    n.commands.exec("undo", n);
    var e = n.getValue();
    V(e),
      $(),
      A() && he(!0),
      we(),
      window.ypData["vsl-css-vi-active"] && (Yt(), Zt()),
      0 < o(".mo-i.active").length && Qa(),
      n.getSession().removeMarker(window.typeHereMarker),
      setTimeout(function () {
        o.throttle(Be(), 32);
      }, 10),
      Ze();
  }
  function q() {
    if (!1 === n.session.getUndoManager().hasRedo())
      return Li("", "There's nothing else to redo", "undoRedoNote"), !1;
    if (
      (Bi("undoRedoNote"),
      O() || D() || z() || window.ypData["wyp-processing-now"])
    )
      return !1;
    if (S()) return k({ title: qi.sorry, text: qi.cantUndo }), !1;
    if (T()) return k({ title: qi.sorry, text: qi.cantUndoAnimManager }), !1;
    n.commands.exec("redo", n);
    var e = n.getValue();
    V(e),
      $(),
      A() && he(!0),
      we(),
      window.ypData["vsl-css-vi-active"] && (Yt(), Zt()),
      0 < o(".mo-i.active").length && Qa(),
      setTimeout(function () {
        o.throttle(Be(), 32);
      }, 10),
      Ze();
  }
  function $() {
    !1 === n.session.getUndoManager().hasUndo()
      ? o(".undo-btn").addClass("disabled")
      : o(".undo-btn").removeClass("disabled"),
      !1 === n.session.getUndoManager().hasRedo()
        ? o(".redo-btn").addClass("disabled")
        : o(".redo-btn").removeClass("disabled");
  }
  function G(e) {
    return o(e).attr("id").replace("-group", "");
  }
  function K(e) {
    return (
      "undefined" != typeof e &&
      !1 !== e &&
      "" != e &&
      " " != e &&
      "undefined" != e &&
      null !== e
    );
  }
  function J(e) {
    return (
      "undefined" == typeof e ||
      !1 === e ||
      "" === e ||
      " " == e ||
      "undefined" == e ||
      null === e
    );
  }
  function Q(e, t, a) {
    if ("cursor" === window.ypData.inspector) return !1;
    if (((window.mouseoverTrigger = !0), a && At(), "*" == e.trim())) return !1;
    var i = Ca(xi(e, !0, !0, !1, !1), !0, !1, !1);
    if (!1 == i) return !1;
    window.ypOption.show_css_selector || (e = Da(e)),
      (null !== t && t.hasClass("wyp-selected")) ||
        (null === t
          ? void 0 === window.ypData["wyp-will-selected"]
            ? i
                .filter(":visible")
                .first()
                .trigger("fakeOver")
                .trigger("fakeClick")
            : (window.ypData["wyp-will-selected"]
                .trigger("fakeOver")
                .trigger("fakeClick"),
              (window.ypData["wyp-will-selected"] = void 0))
          : t.trigger("fakeOver").trigger("fakeClick")),
      1 < i.length &&
        Gi.find(xi(e, !0, !0, !0, !0))
          .not(".wyp-selected,.wyp-multiple-selected")
          .addClass("wyp-selected-others"),
      i.hasClass("wyp-selected") ||
        (1 === i.length
          ? (i.addClass("wyp-selected"),
            (window.ypData.get_selected_element = i))
          : 1 < i.length &&
            (i.first().addClass("wyp-selected"),
            (window.ypData.get_selected_element = i.first()))),
      Qi.addClass("wyp-con-slcd"),
      (window.ypData.is_content_selected = !0),
      tn.hasClass("wyp-nvgtn-act") && Ba(),
      Ji.addClass("wyp-imp-chk"),
      (window.orginalHeight = parseFloat(da("height", i).replace(/px/g, ""))),
      (window.orginalWidth = parseFloat(da("width", i).replace(/px/g, "")));
    var n = da("margin-left", i),
      s = i.offset().left,
      r = i.attr("style");
    i.css("margin-left", "2px"),
      "right" == da("float", i) || s == i.offset().left
        ? Ji.addClass("wyp-element-float")
        : Ji.removeClass("wyp-element-float"),
      void 0 === r
        ? i.removeAttr("style")
        : -1 == r.indexOf("margin-left")
        ? i.css("margin-left", "")
        : i.css("margin-left", n);
    var l = i.prop("tagName").toLowerCase();
    "ul" == l || "ol" == l || "li" == l
      ? tn.addClass("wyp-element-list")
      : tn.removeClass("wyp-element-list");
    var d = sn.general.find(".wyp-selected-tooltip"),
      p = sn.general.css("--tooltip-title");
    J(p) && (p = bi(e, !0, i)),
      sn.general.get(0).style.setProperty("--tooltip-selector", '"' + e + '"'),
      sn.general.get(0).style.setProperty("--tooltip-title", '"' + p + '"'),
      C()
        ? o("#wyp-crnt-el").text(p)
        : o("#wyp-crnt-el").text(qi.no_el_selected),
      Ji.removeClass("wyp-imp-chk"),
      /:/g.test(e) &&
        (/:hover/g.test(e)
          ? (Ji.addClass("yp-selector-hover"),
            tn.attr("data-wyp-selector", ":hover"),
            (e = e.replace(/:hover/g, "")))
          : /:focus/g.test(e)
          ? (Ji.addClass("yp-selector-focus"),
            tn.attr("data-wyp-selector", ":focus"),
            (e = e.replace(/:focus/g, "")))
          : /:visited/g.test(e)
          ? (Ji.addClass("yp-selector-visited"),
            tn.attr("data-wyp-selector", ":visited"),
            (e = e.replace(/:visited/g, "")))
          : /:link/g.test(e)
          ? (Ji.addClass("yp-selector-link"),
            tn.attr("data-wyp-selector", ":link"),
            (e = e.replace(/:link/g, "")))
          : /:active/g.test(e)
          ? (Ji.addClass("yp-selector-active"),
            tn.attr("data-wyp-selector", ":active"),
            (e = e.replace(/:active/g, "")))
          : /:checked/g.test(e)
          ? (Ji.addClass("yp-selector-checked"),
            tn.attr("data-wyp-selector", ":checked"),
            (e = e.replace(/:checked/g, "")))
          : /:disabled/g.test(e)
          ? (Ji.addClass("yp-selector-disabled"),
            tn.attr("data-wyp-selector", ":disabled"),
            (e = e.replace(/:disabled/g, "")))
          : /:enabled/g.test(e)
          ? (Ji.addClass("yp-selector-enabled"),
            tn.attr("data-wyp-selector", ":enabled"),
            (e = e.replace(/:enabled/g, "")))
          : /:invalid/g.test(e)
          ? (Ji.addClass("yp-selector-invalid"),
            tn.attr("data-wyp-selector", ":invalid"),
            (e = e.replace(/:invalid/g, "")))
          : /:valid/g.test(e) &&
            (Ji.addClass("yp-selector-valid"),
            tn.attr("data-wyp-selector", ":valid"),
            (e = e.replace(/:valid/g, "")))),
      (window.setSelector = e),
      L(e),
      window.ypData["wyp-css-ed-act"] && _e(),
      window.ypData["vsl-css-vi-active"] && Zt(),
      !1 == window.targetIsParentTree &&
        setTimeout(function () {
          Ae();
        }, 96),
      T() && H(),
      setTimeout(function () {
        sa();
      }, 64),
      o.throttle(Be(), 32),
      "block" == o(".advanced-info-box").css("display") && M("element"),
      (window.setSelector = !1),
      (window.mouseoverTrigger = !1),
      Di(),
      Ze();
  }
  function ee() {
    o(".anim-bar").hasClass("anim-bar-dragged") ||
      o(".anim-bar").css(
        "left",
        parseFloat(o(window).width() / 2) - o(".anim-bar").width() / 2
      );
  }
  function te(e) {
    var a = o(".scenes .scene").length,
      n = "",
      s;
    for (s = 1; s < a; s++)
      (n = n + o(".scenes .scene-" + s + " input").val() + "% {"),
        Gi.find("#wyp-anim-scenes")
          .find(".style-scene-" + s)
          .each(function () {
            n =
              n +
              o(this)
                .text()
                .match(/\{(.*?)\}/g)
                .toString()
                .replace("{", "")
                .replace("}", "") +
              ";";
          }),
        (n += "}");
    var r = n.replace(/\}/g, "}YKSYXA"),
      l = r.split("YKSYXA").reverse(),
      d = [],
      p = "{",
      c = _(),
      u,
      m,
      f,
      g,
      h,
      y;
    for (s = 1; s < l.length; s++) {
      if (
        ((m = o.trim(l[s])),
        (y = o.trim(l[s])),
        (m = m.split("{")[1].split("}")[0]),
        l.length - 1 == s)
      )
        for (var w = 0; w < d.length; w++) {
          g = 0;
          var v = new RegExp("({|;)" + d[w] + ":");
          if (
            (null !== y.match(v) && (g = parseInt(y.match(v).length)), 0 === g)
          ) {
            var b = c,
              C = b.css(d[w]);
            if (
              ("top" == d[w] && "auto" == C && (C = "0px"),
              "left" == d[w] && "auto" == C && (C = "0px"),
              "width" == d[w] && "auto" == C && (C = b.width()),
              "height" == d[w] && "auto" == C && (C = b.height()),
              "opacity" == d[w] && "auto" == C && (C = "1"),
              "right" != d[w] && "auto" != C && "bottom" != d[w] && "auto" != C)
            ) {
              var z = d[w] + ":" + C + ";";
              (y = y.toString().replace(/\}$/, "") + z + "}"),
                (n = n.replace("0% {", "0% {" + z)),
                (p += z);
            }
          }
        }
      for (f = m.split(";"), u = 0; u < f.length; u++)
        if ("" != f[u].split(":")[0]) {
          var O = f[u].split(":")[0];
          (h = 0),
            null !== n.match("{" + O + ":") &&
              (h = parseInt(n.match("{" + O + ":").length)),
            null !== n.match(";" + O + ":") &&
              (h += parseInt(n.match(";" + O + ":").length)),
            h < parseInt(a - 1) && d.push(O);
        }
    }
    var D = n.replace(/\}/g, "}TYQA"),
      A = D.split("TYQA"),
      S = [],
      T = [];
    for (s = 0; s < A.length; s++)
      if (((m = o.trim(A[s])), "" != m && " " != m)) {
        for (
          m = m.split("{")[1].split("}")[0], f = m.split(";"), u = 0;
          u < f.length;
          u++
        )
          if ("" != f[u].split(":")[0]) {
            var E = f[u].split(":")[0],
              L = f[u].replace(/^(.*?):(.*?)$/g, "$2");
            L = o
              .trim(L)
              .replace(/\s+?!important/g, "")
              .replace(/\;$/g, "");
            var B = S.indexOf(E);
            -1 != B && (S.splice(B, 1), T.splice(B, 1)), S.push(E), T.push(L);
          }
        for (var M = "{" + m, Z = 0; Z < S.length; Z++) {
          var P = S[Z],
            R = T[Z];
          (g = 0),
            null !== M.match("{" + P + ":") &&
              (g = parseInt(M.match("{" + P + ":").length)),
            null !== M.match(";" + P + ":") &&
              (g = h + parseInt(M.match(";" + P + ":").length)),
            1 > g && (M = "{" + P + ":" + R + ";" + M.replace("{", ""));
        }
        var I = o.trim(A[s]).split("{")[0] + "{" + m.replace("{", "") + "}",
          Y = o.trim(A[s]).split("{")[0] + "{" + M.replace("{", "") + "}";
        n = n.replace(I, Y);
      }
    return (
      (n = "@keyframes " + e + "{\r" + n + "\r}"),
      (n = n.replace(/\}/g, "}\r")),
      (n = n.replace(";;", "")),
      n
    );
  }
  function ae(e) {
    Qi.removeClass("wyp-ani-cre")
      .removeAttr("data-anim-scene")
      .removeClass("wyp-animate-test-playing"),
      (window.ypData.is_animate_creator = !1),
      Qi.removeAttr("data-anim-scene");
    var t = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
    tn.attr("class", t),
      (t = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, ""))),
      Ji.attr("class", t),
      Gi.find(
        "#wyp-anim-scenes #scene-1,#wyp-anim-scenes #scene-2,#wyp-anim-scenes #scene-3,#wyp-anim-scenes #scene-4,#wyp-anim-scenes #scene-5,#wyp-anim-scenes #scene-6"
      ).empty(),
      we(),
      o(
        ".anim-bar .scenes .scene:not(.scene-1):not(.scene-2):not(.scene-add)"
      ).each(function () {
        o(this).remove();
      }),
      Gi.find("#animate-test-drive").empty(),
      o(".scene-add").show(),
      e &&
        "disable" != window.animGeneratorOldAnim &&
        "" != window.animGeneratorOldAnim &&
        "none" != window.animGeneratorOldAnim &&
        (tt(null, "animation-name", window.animGeneratorOldAnim, ""),
        tt(
          null,
          "animation-duration",
          window.animGeneratorOldAnimDuration,
          window.animGeneratorOldAnimDurationF
        ),
        tt(
          null,
          "animation-delay",
          window.animGeneratorOldAnimDelay,
          window.animGeneratorOldAnimDelayF
        ),
        tt(
          null,
          "animation-fill-mode",
          window.animGeneratorOldAnimFillMode,
          ""
        )),
      o.throttle(Be(), 32),
      Ze();
  }
  function ie(e) {
    var t = o("#" + e + "-group"),
      a = t.parents(".wyp-t-cont");
    o(".wyp-t-cont").hide(),
      o(".ed-pnl-list > li").removeClass("active"),
      a.prev("h3").trigger("click"),
      a.parent("li").show(),
      t.addClass("focus-option"),
      setTimeout(function () {
        t.removeClass("focus-option");
      }, 1600),
      o.throttle(Be(), 32);
  }
  function ne(e) {
    null == e && (e = o("#wyp-background-image").val()),
      0 < o(".wyp-background-image-show").length &&
        o(".wyp-background-image-show").attr("src") == e &&
        o(".wyp-background-image-show").show(),
      o(".wyp-background-image-show").remove(),
      (e = e
        .replace(/"/g, "")
        .replace(/'/g, "")
        .replace(/url\(/g, "")
        .replace(/\)/g, "")),
      -1 == e.indexOf("yellow-pencil") &&
        (-1 != e.indexOf("//") || -1 != e.indexOf("data:")) &&
        o("#background-image-group .op-c").append(
          "<img src='" + e + "' class='wyp-background-image-show' />"
        );
  }
  function se() {
    setTimeout(function () {
      var e = 0;
      if (0 < o(".wyp-bg-ast.active").length) {
        var t = o(".wyp-bg-ast.active").index();
        e = 68 * (parseInt(t / 4) - 1.5);
      }
      o(".wyp-background-asts").scrollTop(e), oe();
    }, 10);
  }
  function oe() {
    o(".wyp-background-asts .wyp-bg-ast:in-viewport").each(function () {
      o(this).css(
        "backgroundImage",
        "url(" + pluginurl + "assets/" + o(this).data("url") + ")"
      );
    });
  }
  function re(e, t) {
    if (window.bMode) return !1;
    var a = "",
      i = 0,
      n = 0,
      s,
      r,
      l;
    Gi.find(".wyp-data-updated").each(function () {
      i++,
        (s = o(this).attr("data-source-mode")),
        (r = Tt(s)),
        (r = r.replace(/\/\*\s+\[/g, "YPOGRP")),
        (r = r.replace(/\]\s+\*\//g, "YPEGRP")),
        (l = Et(!0, s, !1, !0)),
        "home" == e && "single" == s && ((s = "template"), (t = e)),
        ("login" == e || "lostpassword" == e || "register" == e) &&
          "single" == s &&
          ((s = "template"), (t = e)),
        (a += l),
        "single" == s
          ? o
              .post(ajaxurl, {
                action: "wyp_ajax_save",
                wyp_page_id: e,
                wyp_data: l,
                wyp_editor_data: r,
                _wpnonce: window.wyp_editor_nonce,
              })
              .done(function (e) {
                "nonce_error" == e ||
                "authorized_error" == e ||
                "json_error" == e
                  ? (o(".wyp-save-btn")
                      .text(qi.save)
                      .removeClass("wyp-disabled")
                      .addClass("waiting-for-save"),
                    clearInterval(window.savingChecker),
                    (window.saveFromEditor = !1),
                    "nonce_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_nonce_msg,
                        })
                      : "authorized_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_authorized_msg,
                        })
                      : "json_error" == e &&
                        k({
                          title: qi.save_error,
                          text: qi.save_error_json_msg,
                        }))
                  : n++;
              })
              .fail(function () {
                o(".wyp-save-btn")
                  .text(qi.save)
                  .removeClass("wyp-disabled")
                  .addClass("waiting-for-save"),
                  clearInterval(window.savingChecker),
                  (window.saveFromEditor = !1),
                  k({ title: qi.save_error, text: qi.save_error_msg });
              })
          : "template" == s
          ? o
              .post(ajaxurl, {
                action: "wyp_ajax_save",
                wyp_page_type: t,
                wyp_data: l,
                wyp_editor_data: r,
                _wpnonce: window.wyp_editor_nonce,
              })
              .done(function (e) {
                "nonce_error" == e ||
                "authorized_error" == e ||
                "json_error" == e
                  ? (o(".wyp-save-btn")
                      .text(qi.save)
                      .removeClass("wyp-disabled")
                      .addClass("waiting-for-save"),
                    clearInterval(window.savingChecker),
                    (window.saveFromEditor = !1),
                    "nonce_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_nonce_msg,
                        })
                      : "authorized_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_authorized_msg,
                        })
                      : "json_error" == e &&
                        k({
                          title: qi.save_error,
                          text: qi.save_error_json_msg,
                        }))
                  : n++;
              })
              .fail(function () {
                o(".wyp-save-btn")
                  .text(qi.save)
                  .removeClass("wyp-disabled")
                  .addClass("waiting-for-save"),
                  clearInterval(window.savingChecker),
                  (window.saveFromEditor = !1),
                  k({ title: qi.save_error, text: qi.save_error_msg });
              })
          : o
              .post(ajaxurl, {
                action: "wyp_ajax_save",
                wyp_data: l,
                wyp_editor_data: r,
                _wpnonce: window.wyp_editor_nonce,
              })
              .done(function (e) {
                "nonce_error" == e ||
                "authorized_error" == e ||
                "json_error" == e
                  ? (o(".wyp-save-btn")
                      .text(qi.save)
                      .removeClass("wyp-disabled")
                      .addClass("waiting-for-save"),
                    clearInterval(window.savingChecker),
                    (window.saveFromEditor = !1),
                    "nonce_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_nonce_msg,
                        })
                      : "authorized_error" == e
                      ? k({
                          title: qi.save_error,
                          text: qi.save_error_authorized_msg,
                        })
                      : "json_error" == e &&
                        k({
                          title: qi.save_error,
                          text: qi.save_error_json_msg,
                        }))
                  : n++;
              })
              .fail(function () {
                o(".wyp-save-btn")
                  .text(qi.save)
                  .removeClass("wyp-disabled")
                  .addClass("waiting-for-save"),
                  clearInterval(window.savingChecker),
                  (window.saveFromEditor = !1),
                  k({ title: qi.save_error, text: qi.save_error_msg });
              });
    }),
      o
        .post(ajaxurl, {
          action: "wyp_preview_data_save",
          wyp_data: a,
          _wpnonce: window.wyp_editor_nonce,
        })
        .done(function (e) {
          "nonce_error" == e || "authorized_error" == e || "json_error" == e
            ? (o(".wyp-save-btn")
                .text(qi.save)
                .removeClass("wyp-disabled")
                .addClass("waiting-for-save"),
              clearInterval(window.savingChecker),
              (window.saveFromEditor = !1),
              "nonce_error" == e
                ? k({ title: qi.save_error, text: qi.save_error_nonce_msg })
                : "authorized_error" == e
                ? k({
                    title: qi.save_error,
                    text: qi.save_error_authorized_msg,
                  })
                : "json_error" == e &&
                  k({ title: qi.save_error, text: qi.save_error_json_msg }))
            : n++;
        })
        .fail(function () {
          o(".wyp-save-btn")
            .text(qi.save)
            .removeClass("wyp-disabled")
            .addClass("waiting-for-save"),
            clearInterval(window.savingChecker),
            (window.saveFromEditor = !1),
            k({ title: qi.save_error, text: qi.save_error_msg });
        }),
      o
        .post(ajaxurl, {
          action: "wyp_save_comments_option",
          wyp_selector_comments: JSON.stringify(window.selectorComments),
          _wpnonce: window.wyp_editor_nonce,
        })
        .done(function (e) {
          "nonce_error" == e || "authorized_error" == e || "json_error" == e
            ? (o(".wyp-save-btn")
                .text(qi.save)
                .removeClass("wyp-disabled")
                .addClass("waiting-for-save"),
              clearInterval(window.savingChecker),
              (window.saveFromEditor = !1),
              "nonce_error" == e
                ? k({ title: qi.save_error, text: qi.save_error_nonce_msg })
                : "authorized_error" == e
                ? k({
                    title: qi.save_error,
                    text: qi.save_error_authorized_msg,
                  })
                : "json_error" == e &&
                  k({ title: qi.save_error, text: qi.save_error_json_msg }))
            : n++;
        })
        .fail(function () {
          o(".wyp-save-btn")
            .text(qi.save)
            .removeClass("wyp-disabled")
            .addClass("waiting-for-save"),
            clearInterval(window.savingChecker),
            (window.saveFromEditor = !1),
            k({ title: qi.save_error, text: qi.save_error_msg });
        }),
      (window.savingChecker = setInterval(function () {
        n == i + 2 &&
          (o(".wyp-save-btn")
            .text(qi.saved)
            .addClass("wyp-disabled")
            .removeClass("waiting-for-save"),
          clearInterval(window.savingChecker),
          (window.saveFromEditor = !1),
          Gi.find(".wyp-data-updated").removeClass("wyp-data-updated"),
          o(".customizing-type-updated").removeClass(
            "customizing-type-updated"
          ),
          o.post(ajaxurl, {
            action: "wyp_ajax_update_css",
            _wpnonce: window.wyp_editor_nonce,
          }),
          "none" == o("#wyp-customizing-type-frame").css("display") && Qe(!0));
      }, 200));
  }
  function le(e, t, a, i) {
    var n = e.add(e.parents()),
      s = !0,
      r,
      l;
    return (
      n.each(function () {
        if (((l = o(this)), (r = null), !1 === l.hasClass("wyp-animating"))) {
          if (
            ((r = l.css("animationFillMode")), "forwards" == r || "both" == r)
          ) {
            if (((s = de(l, t, a, i, r)), !0 === s)) return !1;
          } else if (((s = de(l, t, a, i)), !0 === s)) return !1;
        } else if (((s = de(l, t, a, i)), !0 === s)) return !1;
      }),
      s
    );
  }
  function de(e, t, a, i, n) {
    var s = e.css(t);
    if (
      ("transform" == t && "matrix(1, 0, 0, 1, 0, 0)" == s && (s = "none"),
      "==" == i)
    ) {
      if (s === a) return void 0 !== n && e.css("animationFillMode", n), !0;
    } else if (s !== a)
      return void 0 !== n && e.css("animationFillMode", n), !0;
    return void 0 !== n && e.css("animationFillMode", n), !1;
  }
  function pe(e) {
    var t = Gi.height(),
      a = o("#iframe").height();
    0 < o(".wyp-panel-hide:visible").length
      ? o(".wyp-panel-show").css("top", o(".wyp-panel-hide").offset().top)
      : o(".wyp-panel-show").css("top", "50vh"),
      t > a
        ? o(".wyp-panel-show").css("right", ei() + "px")
        : o(".wyp-panel-show").css("right", "0px"),
      !0 === e
        ? tn.removeClass("wyp-clean-look wyp-cln-lo-manual")
        : tn.toggleClass("wyp-cln-lo-manual"),
      N(),
      Ze();
  }
  function ce(e) {
    var t = "any";
    if (null == e) {
      if (Ji.hasClass("wyp-ele-n-vis")) return !1;
      C() && ((e = _()), (t = "selected"));
    }
    if (null == e || 1 !== e.length) return !1;
    if (le(_(), "position", "fixed", "==")) return !1;
    var a = parseInt(o(window).height() / 2),
      i = parseInt(e.height() / 2),
      n = e.offset(),
      s = n.top - 50;
    i < a && (s = i + n.top - a),
      nn.scroll({ top: s, behavior: "smooth" }),
      "selected" == t && ii();
  }
  function ue(e, t, a) {
    var n = [],
      s = null,
      r = null,
      l = [],
      d = "",
      p;
    if (((e = e.replace(/\s+/g, " ")), -1 != e.indexOf(":"))) return [];
    var c = e.substr(e.length - 1),
      u = ua(e),
      m = u[u.length - 1];
    " " == c && (m = " ");
    var g = u;
    " " != c && g.pop(), (g = g.join(" "));
    var h = g.replace(/(\s+$|\.$|#$)/g, ""),
      y = m.replace(/(\.|#)/g, ""),
      v = [
        "body",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "br",
        "hr",
        "abbr",
        "address",
        "b",
        "bdi",
        "bdo",
        "blockquote",
        "center",
        "cite",
        "code",
        "del",
        "dfn",
        "em",
        "font",
        "i",
        "ins",
        "kbd",
        "mark",
        "meter",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "small",
        "strike",
        "strong",
        "sub",
        "sup",
        "time",
        "tt",
        "u",
        "var",
        "wbr",
        "form",
        "input",
        "textarea",
        "button",
        "select",
        "optgroup",
        "option",
        "label",
        "fieldset",
        "legend",
        "datalist",
        "output",
        "frame",
        "iframe",
        "img",
        "map",
        "area",
        "canvas",
        "figcaption",
        "figure",
        "picture",
        "audio",
        "source",
        "track",
        "video",
        "a",
        "link",
        "nav",
        "ul",
        "ol",
        "li",
        "dir",
        "dl",
        "dt",
        "dd",
        "menu",
        "menuitem",
        "table",
        "caption",
        "th",
        "tr",
        "td",
        "thead",
        "tbody",
        "tfoot",
        "col",
        "colgroup",
        "div",
        "span",
        "header",
        "footer",
        "main",
        "section",
        "article",
        "aside",
        "details",
        "dialog",
        "summary",
      ],
      b,
      x,
      _,
      C,
      z;
    !0 == /^[a-z-A-Z0-9_-]+\.$/g.test(m) &&
      ((d = m.split(".")[0]), l.push(d + "[class]")),
      !0 == /^[a-z-A-Z0-9_-]+#$/g.test(m) &&
        ((d = m.split("#")[0]), l.push(d + "[id]")),
      !0 == /^[a-z-A-Z0-9_-]+\.[a-z-A-Z0-9_-]+$/g.test(m) &&
        ((d = m.split(".")[0]),
        (p = m.split(".")[1]),
        l.push(d + "[class*='" + p + "']")),
      !0 == /^[a-z-A-Z0-9_-]+#[a-z-A-Z0-9_-]+$/g.test(m) &&
        ((d = m.split("#")[0]),
        (p = m.split("#")[1]),
        l.push(d + "[id^='" + p + "']")),
      !0 == /^\#$/g.test(m) && l.push("[id]"),
      !0 == /^\.$/g.test(m) && l.push("[class]"),
      !0 == /^\.[a-z-A-Z0-9_-]+$/g.test(m) &&
        ((p = m.split(".")[1]), l.push("[class*='" + p + "']")),
      !0 == /^\#[a-z-A-Z0-9_-]+$/g.test(m) &&
        ((p = m.split("#")[1]), l.push("[id^='" + p + "']")),
      !0 == /^[a-z-A-Z0-9_-]+$/g.test(m) && l.push("[tag*='" + m + "']"),
      " " == m && l.push("[tag]"),
      !0 == /^[a-z-A-Z0-9_-]+$/g.test(m) && l.push("[id^='" + m + "']"),
      !0 == /^[a-z-A-Z0-9_-]+$/g.test(m) && l.push("[class*='" + m + "']");
    for (var O = 0, D; O < l.length; O++) {
      if ("[tag]" == l[O] || -1 != l[O].indexOf("[tag*="))
        for (b = new RegExp("^" + m + "(.+)?"), D = 0; D < v.length; D++)
          if (((z = "[tag]" == l[O] || b.test(v[D])), z)) {
            try {
              C =
                0 < h.length
                  ? Gi.find(h)
                      .find(v[D])
                      .not(w("", ",", "", window.simple_not_list))
                  : Gi.find(v[D]).not(w("", ",", "", window.simple_not_list));
            } catch (t) {
              continue;
            }
            if (
              0 < C.length &&
              ((r = g + " " + v[D]),
              Ca(r, !0, !1, !1) && n.push(r),
              hi(n).length >= t)
            )
              break;
          }
      try {
        C =
          0 < h.length
            ? Gi.find(h).find(l[O]).not(w("", ",", "", window.simple_not_list))
            : Gi.find(l[O]).not(w("", ",", "", window.simple_not_list));
      } catch (t) {
        continue;
      }
      C.each(function (a) {
        if (!0 == /^\[class\*\=/g.test(l[O]))
          for (
            x = o(this).attr("class").split(" "),
              b = new RegExp("^" + y + "(.+)?"),
              a = 0;
            a < x.length &&
            ((_ = b.exec(x[a])),
            !(
              null !== _ &&
              ((r = g + " ." + _[0]),
              Ca(r, !0, !1, !1) && n.push(r),
              hi(n).length >= t)
            ));
            a++
          );
        else if (-1 != l[O].indexOf("[class]")) {
          if (
            ((s = o(this).attr("class")),
            -1 != s.indexOf(" ") && (s = s.split(" ")[0]),
            "" == s)
          )
            return !0;
          if (
            ((r = "" == d ? g + " ." + s : g + " " + d + "." + s),
            Ca(r, !0, !1, !1) && n.push(r),
            hi(n).length >= t)
          )
            return !1;
        } else if (-1 != l[O].indexOf("[id]") || -1 != l[O].indexOf("[id^=")) {
          if (
            ((r =
              "" == d
                ? g + " #" + o(this).attr("id")
                : g + " " + d + "#" + o(this).attr("id")),
            Ca(r, !0, !1, !1) && n.push(r),
            hi(n).length >= t)
          )
            return !1;
        } else if (!0 == /^[a-z-A-Z0-9_-]+\[class\*\=/g.test(l[O]))
          for (x = o(this).attr("class").split(" "), a = 0; a < x.length; a++)
            if (
              ((b = new RegExp("^" + e.split(".")[1] + "(.+)?")),
              (_ = b.exec(x[a])),
              null !== _ &&
                ((r = g + " " + d + "." + _[0]),
                Ca(r, !0, !1, !1) && n.push(r),
                hi(n).length >= t))
            )
              return !1;
      });
    }
    n = hi(n);
    for (var A = 0; A < window.plugin_classes_list.split("|").length; A++)
      for (D = n.length - 1; 0 <= D; D--)
        -1 !=
          n[D].replace(/\./g, "")
            .trim()
            .indexOf(window.plugin_classes_list.split("|")[A]) &&
          n.splice(D, 1);
    var S = [];
    for (
      Ji.hasAttr("class") && (S = ma(Ji.attr("class"))), D = 0;
      D < n.length;
      D++
    )
      (n[D] = n[D].replace(/(^\s+|\s+$)/g, "").replace(/\s\s+/g, " ")),
        -1 != n[D].indexOf(".") &&
          -1 != S.indexOf(n[D].replace(/\./g, "")) &&
          (n[D] = "body" + n[D]);
    return 1 == n.length && "autocomplate" == a && n[0] == e && (n = []), n;
  }
  function me() {
    o("#autocomplate-selector-list li").remove();
    var e;
    if (((e = o("#wyp-selector-editor").val()), J(e))) return !1;
    if ("  " == e || " " == e || "" == e) return !1;
    for (
      var t = ue(e.replace(/(\s?)+>(\s?)+/g, " "), 10, "autocomplate"), a = 0;
      a < t.length;
      a++
    )
      if (10 > o("#autocomplate-selector-list li").length) {
        if (0 === Gi.find(t[a]).length) return !1;
        if (0 < o("#" + gi(t[a])).length) return !1;
        o("#autocomplate-selector-list").append(
          "<li id='" + gi(t[a]) + "'>" + t[a] + "</li>"
        );
      }
    window.selectorActive = -1;
  }
  function fe() {
    window.ypData.editor_context_menu_open && _().contextMenu("hide"),
      o("#wyp-selector-editor").removeClass("selector-is-invalid"),
      Qi.addClass("wyp-selector-editor-active");
    var e = _a();
    ":hover" == tn.attr("data-wyp-selector") && (e += ":hover"),
      ":focus" == tn.attr("data-wyp-selector") && (e += ":focus"),
      ":link" == tn.attr("data-wyp-selector") && (e += ":link"),
      ":active" == tn.attr("data-wyp-selector") && (e += ":active"),
      ":visited" == tn.attr("data-wyp-selector") && (e += ":visited"),
      ":checked" == tn.attr("data-wyp-selector") && (e += ":checked"),
      ":disabled" == tn.attr("data-wyp-selector") && (e += ":disabled"),
      ":enabled" == tn.attr("data-wyp-selector") && (e += ":enabled"),
      ":invalid" == tn.attr("data-wyp-selector") && (e += ":invalid"),
      ":valid" == tn.attr("data-wyp-selector") && (e += ":valid"),
      J(e) && (e = ""),
      o("#wyp-selector-editor").trigger("focus").val(e).trigger("keyup"),
      me();
  }
  function ge(e) {
    "cursor" === window.ypData.inspector &&
      (o(".inspector-sublist-default").trigger("click"),
      (window.ypData.inspector = "default"),
      o(".inspector-sublist").css("display", "none")),
      o(e).removeClass("selector-is-invalid");
    var t = o(e).val();
    if ("" == t || " " == t)
      return (
        "#wyp-selector-editor" == e &&
          (Qi.removeClass("wyp-selector-editor-active"),
          (window.selectorActive = -1)),
        !1
      );
    var a = t.match(/:hover(.*?)$/g),
      i = t.match(/:focus(.*?)$/g),
      n = t.match(/:visited(.*?)$/g),
      s = t.match(/:active(.*?)$/g),
      r = t.match(/:link(.*?)$/g),
      l = t.match(/:checked(.*?)$/g),
      d = t.match(/:disabled(.*?)$/g),
      p = t.match(/:enabled(.*?)$/g),
      c = t.match(/:invalid(.*?)$/g),
      u = t.match(/:valid(.*?)$/g);
    (a =
      null === a
        ? 0
        : a
            .toString()
            .trim()
            .replace(/:hover/g, "")
            .trim().length),
      (i =
        null === i
          ? 0
          : i
              .toString()
              .trim()
              .replace(/:focus/g, "")
              .trim().length),
      (n =
        null === n
          ? 0
          : n
              .toString()
              .trim()
              .replace(/:visited/g, "")
              .trim().length),
      (s =
        null === s
          ? 0
          : s
              .toString()
              .trim()
              .replace(/:active/g, "")
              .trim().length),
      (r =
        null === r
          ? 0
          : r.toString().trim().replace(/:link/g, "").trim().length),
      (l =
        null === l
          ? 0
          : l
              .toString()
              .trim()
              .replace(/:checked/g, "")
              .trim().length),
      (d =
        null === d
          ? 0
          : d
              .toString()
              .trim()
              .replace(/:disabled/g, "")
              .trim().length),
      (p =
        null === p
          ? 0
          : p
              .toString()
              .trim()
              .replace(/:enabled/g, "")
              .trim().length),
      (c =
        null === c
          ? 0
          : c
              .toString()
              .trim()
              .replace(/:invalid/g, "")
              .trim().length),
      (u =
        null === u
          ? 0
          : u
              .toString()
              .trim()
              .replace(/:valid/g, "")
              .trim().length);
    var m = t.replace(
        /\:(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
        ""
      ),
      f = Ca(m, !0, !1, !0);
    return !1 == f
      ? (o(e).addClass("selector-is-invalid"), !1)
      : void (
          0 < Gi.find(m).length &&
          "*" != m &&
          0 === a &&
          0 === i &&
          0 == n &&
          0 == s &&
          0 == r &&
          0 == l &&
          0 == d &&
          0 == p &&
          0 == c &&
          0 == u &&
          (Gi.find(t).hasClass("wyp-selected") &&
            (window.ypData["wyp-will-selected"] = _()),
          L(_i(t)),
          Q(_i(t), null, !0),
          ce(),
          "#wyp-selector-editor" == e &&
            (Qi.removeClass("wyp-selector-editor-active"),
            (window.selectorActive = -1)))
        );
  }
  function he(e) {
    var t = o(".breakpoint-bar");
    t.find(".breakpoint-item").tooltip("destroy"), t.empty();
    var i = qa(!0, !1, !1, !1);
    0 == i.length &&
      (i = [
        "(max-width:1200px)",
        "(max-width:992px)",
        "(max-width:768px)",
        "(max-width:576px)",
      ]);
    var n = 0,
      s = 0,
      r = [],
      l = "",
      d = o(".media-control").attr("data-code"),
      c = o(window).width(),
      u,
      m;
    if (0 < i.length) {
      if (
        (o.each(i, function (e, t) {
          (u = Ya(t)),
            (t = t.replace(/(\d+)\.(\d+)/g, "$1")),
            !1 !== u &&
              ((n = parseInt(mi(u.replace(/</g, "").replace(/\>/g, "")))),
              (s = _i(
                t
                  .match(/\:(.*?)\)/g)
                  .toString()
                  .replace(/\:/g, "")
                  .replace(/\)/g, "")
              )),
              -1 == u.indexOf(",") &&
                -1 == u.indexOf("and") &&
                270 <= n &&
                (-1 != u.indexOf(">") &&
                  "min-width" == o(".media-control").attr("data-code") &&
                  -1 == r.indexOf("min-breakpoint-" + n) &&
                  n <= c &&
                  (r.push("min-breakpoint-" + n),
                  (m = ""),
                  0 <
                    p(
                      a(null, !1),
                      "[selector=YPtoAddBreakpoint][msize=(min-width:" +
                        s +
                        ")]"
                    ).length && (m = " defined-with-yellowpencil"),
                  (l +=
                    "<div data-breakpoint='" +
                    n +
                    "' data-media-content='" +
                    t +
                    "' data-breakpoint-data='(min-width:" +
                    s +
                    ")' class='min-width breakpoint-item" +
                    m +
                    "' id='min-breakpoint-" +
                    n +
                    "' style='width:" +
                    n +
                    "px;'></div>")),
                -1 != u.indexOf("<") &&
                  "max-width" == d &&
                  -1 == r.indexOf("max-breakpoint-" + n) &&
                  (r.push("max-breakpoint-" + n),
                  (m = ""),
                  0 <
                    p(
                      a(null, !1),
                      "[selector=YPtoAddBreakpoint][msize=(max-width:" +
                        s +
                        ")]"
                    ).length && (m = " defined-with-yellowpencil"),
                  (l +=
                    "<div data-breakpoint='" +
                    n +
                    "' data-media-content='" +
                    t +
                    "' data-breakpoint-data='(max-width:" +
                    s +
                    ")' class='max-width breakpoint-item" +
                    m +
                    "' id='max-breakpoint-" +
                    n +
                    "' style='width:" +
                    n +
                    "px;'></div>"))));
        }),
        t.html(l),
        "max-width" == d)
      )
        t.find(".breakpoint-item")
          .sort(function (e, t) {
            return +t.dataset.breakpoint - +e.dataset.breakpoint;
          })
          .appendTo(t);
      else {
        t.find(".breakpoint-item")
          .sort(function (e, t) {
            return +e.dataset.breakpoint - +t.dataset.breakpoint;
          })
          .appendTo(t);
        var f = t.find(".min-width"),
          g = f.length,
          h = !1,
          y;
        f.each(function (e) {
          (y = o(this)),
            y.css("z-index", 50 - e),
            0 === e && (h = y.css("width")),
            g == e + 1
              ? y.addClass("last-min-breakpoint")
              : y.css("width", y.next().css("width"));
        }),
          !1 !== h &&
            t.append(
              "<div class='empty-placeholder' style='width:" +
                h +
                " !important;'></div>"
            );
      }
      t.find(".breakpoint-item").each(function () {
        var e = o(this),
          t = e.attr("data-breakpoint"),
          a = e.next(".breakpoint-item").attr("data-breakpoint");
        1 >= Math.abs(t - a) && e.remove(),
          23 > Math.abs(t - a)
            ? e.addClass("xsmall-breakpoint")
            : 44 >= Math.abs(t - a) && e.addClass("small-breakpoint");
      }),
        t
          .find(".breakpoint-item")
          .on("mouseover", function () {
            o(this).addClass("hover-breakpoint"),
              o(this).nextAll(".breakpoint-item").addClass("hover-breakpoint");
          })
          .on("mouseout", function () {
            tn.hasClass("wyp-contextmenu-breakpoint") ||
              o(".hover-breakpoint").removeClass("hover-breakpoint");
          }),
        t.find(".breakpoint-item").on("mouseenter", function (e) {
          var a = o(this);
          a
            .tooltip({
              template:
                '<div class="tooltip breakpoints-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
              title: function () {
                var e = o(".media-control").text(),
                  t = o(this).attr("data-breakpoint"),
                  a = "";
                return (
                  (a = o(this).hasClass("edited")
                    ? "<span class='breakpoint-tooltip-e'>(right-click to manage)</span>"
                    : o(this).hasClass("defined-with-yellowpencil")
                    ? "<span class='breakpoint-tooltip-e'>(right-click to manage)</span>"
                    : "<span class='breakpoint-tooltip-t'>(defined by the theme)</span>"),
                  qi.breakpoint_size.replace("{$1}", t).replace("{$2}", e) + a
                );
              },
              delay: { show: 50, hide: 0 },
              placement: "bottom",
              trigger: "manual",
              container: "body",
              html: !0,
            })
            .on("shown.bs.tooltip", function () {
              var i = a.outerWidth(),
                n = a.offset(),
                s = a.prev();
              a.hasClass("max-width") && (s = a.next());
              var r = (e.clientX - n.left) / i,
                l = o(".breakpoints-tooltip"),
                d = l.outerWidth(),
                p = 240,
                c;
              0 < s.length
                ? (p = s.outerWidth())
                : a.hasClass("min-width") &&
                  (p = t.find(".empty-placeholder").width()),
                0 !== p &&
                  (0.5 < r
                    ? (c = n.left + i - (i - p) / 4)
                    : (c = n.left + (i - p) / 4)),
                c && ((c -= d / 2), l.css("left", c + 1 + "px"));
            }),
            a.tooltip("show");
        });
    }
    !0 == e && X(),
      setTimeout(function () {
        j();
      }, window.YellowDelay);
  }
  function ye() {
    if (!1 === A()) return !1;
    var e = o("#iframe").width(),
      t = o(".breakpoint-bar > .breakpoint-item.focus");
    0 === t.length && o(".device-size").text(e);
  }
  function we() {
    if ((T() && H(), !1 === C())) return !1;
    var e = o(".ed-pnl-list > li.active .op-g");
    if ((o("li[data-loaded]").removeAttr("data-loaded"), 0 < e.length)) {
      var t = _a();
      e.each(function () {
        var e = 1;
        "animation-duration-group" == o(this).attr("id") &&
          !0 === S() &&
          (e = 0),
          1 == e && pa(G(this), t);
      }),
        e.parent().attr("data-loaded", "true");
    }
    sa();
  }
  function ve(e) {
    e.each(function () {
      var e = o(this),
        t = e.parents(".op-g"),
        a = t.attr("data-css"),
        n = t.find("textarea");
      (n =
        !1 == /^(http|chrome-extension)/g.test(n.val())
          ? JSON.parse(decodeURIComponent(n.val()))
          : n.val()),
        e
          .catcomplete({
            source: n,
            delay: 0,
            minLength: 0,
            autoFocus: !0,
            close: function () {
              o("#fake-layer").trigger("click"),
                o(".active-autocomplete-item").removeClass(
                  "active-autocomplete-item"
                ),
                e.removeClass("active"),
                e.parent().removeClass("active"),
                tn.removeClass("autocomplete-active"),
                e.parent().find("select option:contains(" + e.val() + ")")
                  .length &&
                  e.val(
                    e
                      .parent()
                      .find("select option:contains(" + e.val() + ")")
                      .val()
                  ),
                "" == e.val() && e.val(window.openVal),
                Qi.find("[id^='wyp-font-test-']").remove();
            },
            change: function () {
              if ("font-family" == a) {
                var t = mt(e.val());
                t
                  ? (o("#include-webfont-label").css("display", "none"),
                    tt(null, "--google-webfont", "disable"))
                  : o("#include-webfont-label").css("display", "inline-block"),
                  o("#font-family-group").addClass("font-family-changed");
                var i = Wn(o.trim(P(e.val()).replace(/ /g, "+")));
                !1 === t &&
                  0 === o("#wyp-font-load-" + i).length &&
                  Qi.append(
                    "<link rel='stylesheet' id='wyp-font-load-" +
                      i +
                      "'  href='https://fonts.googleapis.com/css2?family=" +
                      o.trim(P(e.val()).replace(/ /g, "+")) +
                      ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"
                  );
              }
            },
            focus: function (t, i) {
              null != window.openVal &&
                ("font-weight" == a &&
                  (_t("font-weight"),
                  ht("font-weight", i.item.value),
                  o(".ac-d li").each(function () {
                    e.css("fontWeight", i.item.value);
                  }),
                  o(".ac-d li").css("fontFamily", o("#wyp-font-family").val())),
                "font-family" == a &&
                  (clearTimeout(window.load_near_fonts_delay),
                  (window.load_near_fonts_delay = setTimeout(function () {
                    gt();
                  }, 48)),
                  _t("font-family"),
                  ht("font-family", i.item.value)));
            },
            open: function (i) {
              W({
                index: 2147483646,
                container: ".ed-pnl",
                callback: function () {},
              }),
                o(i.target)
                  .next()
                  .find("ul")
                  .width(parseFloat(e.css("width")) - 2),
                null == window.openVal && (window.openVal = e.val()),
                e.addClass("active"),
                e.parent().addClass("active"),
                tn.addClass("autocomplete-active");
              var s = e.val();
              o("#autocomplete-custom-style-" + a).remove(),
                o(".up-style-autocomplete").removeClass(
                  "up-style-autocomplete"
                ),
                o(".up-style-autocomplete-input").removeClass(
                  "up-style-autocomplete-input"
                );
              var r = e.get(0).getBoundingClientRect(),
                l = o(".ed-pnl-list > li.active > .wyp-t-cont")
                  .get(0)
                  .getBoundingClientRect(),
                d = 272,
                p = l.bottom - r.top - r.height + 1 - 10,
                c = r.top - l.top - 10,
                u = t.find(".ui-autocomplete.ui-menu li").outerHeight(),
                m;
              if (200 > p && 200 > c)
                (p = 360),
                  (m = parseInt(p / u)),
                  16 < m && (m = 16),
                  (p = parseInt(m) * u),
                  tn.append(
                    '<style id="autocomplete-custom-style-' +
                      a +
                      '">#' +
                      a +
                      "-group .ui-autocomplete.ui-menu{max-height:" +
                      p +
                      "px;position:fixed;top:" +
                      (r.top + r.height - 1) +
                      "px;}</style>"
                  ),
                  (d = p);
              else if (c <= p)
                (m = parseInt(p / u)),
                  16 < m && (m = 16),
                  (p = parseInt(m) * u),
                  tn.append(
                    '<style id="autocomplete-custom-style-' +
                      a +
                      '">#' +
                      a +
                      "-group .ui-autocomplete.ui-menu{max-height:" +
                      p +
                      "px;}</style>"
                  ),
                  (d = p);
              else if ("font-family" != a) {
                (m = parseInt(c / u)),
                  16 < m && (m = 16),
                  (c = parseInt(m) * u);
                var f =
                    t.find(".ui-autocomplete.ui-menu").outerHeight() +
                    r.height -
                    2,
                  g = c + r.height - 2;
                f > g && (f = g),
                  tn.append(
                    '<style id="autocomplete-custom-style-' +
                      a +
                      '">#' +
                      a +
                      "-group .ui-autocomplete.ui-menu{top:-" +
                      f +
                      "px;max-height:" +
                      (f - r.height + 2) +
                      "px;}</style>"
                  ),
                  t
                    .find(".ui-autocomplete.ui-menu")
                    .addClass("up-style-autocomplete"),
                  e.addClass("up-style-autocomplete-input"),
                  (d = c);
              }
              "font-family" == a
                ? -1 != s.indexOf(",") &&
                  (s = o
                    .trim(s.split(",")[0])
                    .replace(/'/g, "")
                    .replace(/"/g, ""))
                : "text-shadow" == a &&
                  ("rgba(0, 0, 0, 0.3) 0px 1px 1px" == s
                    ? (s = "Basic Shadow")
                    : "rgb(255, 255, 255) 1px 1px 0px, rgb(170, 170, 170) 2px 2px 0px" ==
                      s
                    ? (s = "Multiple")
                    : "rgb(255, 0, 0) -1px 0px 0px, rgb(0, 255, 255) 1px 0px 0px" ==
                      s
                    ? (s = "Anaglyph")
                    : "rgb(255, 255, 255) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px" ==
                      s
                    ? (s = "Emboss")
                    : "rgb(255, 255, 255) 0px 0px 2px, rgb(255, 255, 255) 0px 0px 4px, rgb(255, 255, 255) 0px 0px 6px, rgb(255, 119, 255) 0px 0px 8px, rgb(255, 0, 255) 0px 0px 12px, rgb(255, 0, 255) 0px 0px 16px, rgb(255, 0, 255) 0px 0px 20px, rgb(255, 0, 255) 0px 0px 24px" ==
                      s
                    ? (s = "Neon")
                    : "rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) -1px 0px 1px" ==
                        s && (s = "Outline"));
              var y = e
                .parent()
                .find(".ac-d li")
                .filter(function () {
                  return "font-weight" == a
                    ? o.text([this]) === s ||
                        o.text([this]).replace(/\D/g, "") === s
                    : o.text([this]) === s;
                });
              if (
                (1 == y.length &&
                  (o(".active-autocomplete-item").removeClass(
                    "active-autocomplete-item"
                  ),
                  0 === o(".active-autocomplete-item").length &&
                    y.addClass("active-autocomplete-item")),
                0 < o(".active-autocomplete-item").length)
              ) {
                e.parent()
                  .find(".ac-d")
                  .find("li.ui-state-focus")
                  .removeClass("ui-state-focus");
                var w = e
                    .parent()
                    .find(".ac-d li.active-autocomplete-item")
                    .parent(),
                  v = e.parent().find(".ac-d li.active-autocomplete-item"),
                  b = v.height();
                w.scrollTop(
                  w.scrollTop() +
                    v.position().top -
                    parseInt((parseInt(d / b) - 1) / 2) * b
                );
              }
              if ("font-weight" == a)
                o(".ac-d li").each(function () {
                  var e = Math.abs(mi(o(this).text()));
                  o(this).css("fontWeight", e);
                }),
                  o("#ac-pl-font-weight ul li").css(
                    "fontFamily",
                    o("#wyp-font-family").val()
                  );
              else if ("font-family" == a || "font-weight" == a)
                "font-family" == a && gt();
              else if ("animation-name" == a) {
                var h, x;
                o("#animation-name-group .ui-autocomplete.ui-menu li").each(
                  function () {
                    (h = o(this)), (x = h.text());
                  }
                );
              } else
                "text-shadow" == a
                  ? o("#ac-pl-text-shadow li").each(function (e) {
                      o(this).css("textShadow", n[e].value);
                    })
                  : "cursor" == a &&
                    o("#ac-pl-cursor li").each(function (e) {
                      o(this).attr(
                        "style",
                        "cursor:" + n[e].value + " !important;"
                      );
                    });
            },
            appendTo: e.next(),
          })
          .focus(function () {
            clearTimeout(window.AutoCompleteDelay),
              (window.AutoCompleteDelay = setTimeout(function () {
                e.catcomplete("search", "");
              }, window.Yellow2Delay));
          });
    });
  }
  function be(e) {
    return e.hasAttr("data-default") ? e.attr("data-default") : "no-defined";
  }
  function xe(e, t, a) {
    var i = e.parent().parent().parent(),
      n;
    if (
      ("-" == e.parent().find(".css-un").val() &&
        e.hasClass("css-va") &&
        e.val() != be(i) &&
        e.parent().find(".css-un").val("px").trigger("autogrow"),
      isNaN(e.parent().find(".css-va").val()) &&
        !1 == o(document.activeElement).hasClass("css-un") &&
        e.parent().find(".css-un").val("-").trigger("autogrow"),
      !1 === t &&
        ((t = e.parent().find(".css-va").val()),
        (a = e.parent().find(".css-un").val())),
      /(\d+)([a-z%]{1,3})$/i.test(t))
    ) {
      var s = t.match(/(\d+)([a-z%]{1,3})$/i);
      /^(em|rem|vh|vw|%|px|ms|s|pt|pc|in|mm|cm|ex|ch|vmin|vmax)$/.test(s[2]) &&
        ((t = parseFloat(s[1])), (a = s[2]));
    }
    var r = e.parent().parent().find(".sl-d");
    if (((n = ot(a, i)), void 0 === n || !1 === n)) return !1;
    var l = parseInt(n[0]),
      d = parseInt(n[1]);
    t < l && (l = parseInt(t)),
      t > d && (d = t),
      !1 === isNaN(l) &&
        !1 === isNaN(d) &&
        !1 === isNaN(t) &&
        r.slider({ min: parseInt(l), max: parseInt(d), value: t }, !0);
  }
  function _e(e) {
    if (!1 == window.ypData["wyp-css-ed-act"]) return !1;
    if (!C())
      n.setValue(Et(!0, null, !0)),
        setTimeout(function () {
          n.getSession().removeMarker(window.typeHereMarker);
        }, 2),
        e && n.focus(),
        n.execCommand("gotolineend");
    else if (!1 == window.disable_auto_insert) {
      tt(null, "a", "a", "");
      var t = Et(!1, null, !0),
        a = t.split("\ta:a")[0].split(/\r\n|\r|\n/).length;
      (t = t.replace(/a:a !important;/g, "")),
        (t = t.replace(/a:a;/g, "")),
        tt(null, "a", "disable", ""),
        n.setValue(t),
        n.resize(!0),
        setTimeout(function () {
          n.scrollToLine(a, !0, !1);
          var e = ace.require("ace/range").Range,
            t = "";
          A() && (t = " ace-type-here-in-responsive"),
            n.getSession().removeMarker(window.typeHereMarker),
            (window.typeHereMarker = n.session.addMarker(
              new e(a - 1, 0, a - 1, 1),
              "ace-type-here" + t,
              "line",
              !0
            ));
        }, 2),
        e && n.focus(),
        A() ? n.gotoLine(a, 2, !0) : n.gotoLine(a, 1, !0);
    }
    n.resize();
  }
  function ke(e) {
    if ((void 0 === e && (e = _()), !e)) return !1;
    if (void 0 === e[0] || !1 === e[0] || null === e[0]) return !1;
    for (
      var t = e.parentsUntil("body"),
        a = "body",
        n = ya(e),
        s = t.length - 1,
        o;
      0 <= s;
      s--
    )
      (o = ya(t[s])),
        /\.|#/g.test(o) && (o = t[s].tagName.toLowerCase() + o),
        (a = _i(a).trim() + " > " + o + window.separator);
    return (a = _i(a + " > " + n + ".wyp-selected")), a;
  }
  function Ce(e, t) {
    var a = "wyp-selected";
    window.ypData["wyp-control-key-down"] &&
      C() &&
      (a = "wyp-multiple-selected");
    var n = ua(e),
      s = 0,
      r = 0,
      l = "";
    for (s = 0; s < n.length; s++)
      (l += 0 < s ? window.separator + n[s] : n[s]),
        1 < Gi.find(l).length &&
          Gi.find(l).each(function () {
            ")" != l.substr(l.length - 1) &&
              0 < o(this).parent().length &&
              ((r = 0),
              o(this)
                .parent()
                .children()
                .each(function () {
                  r++,
                    (0 < o(this).find("." + a).length || o(this).hasClass(a)) &&
                      (l = l + ":nth-child(" + r + ")");
                }));
          });
    if (-1 != l.indexOf(":nth-child")) {
      for (n = ua(l), s = 0; s < n.length; s++) {
        var d = Oe(n, s).join(" "),
          p = De(n, s).join(" "),
          c =
            d +
            window.separator +
            n[s].replace(/:nth-child\((.*?)\)/i, "") +
            window.separator +
            p;
        (c = _i(c)),
          1 == Gi.find(c).length &&
            (n[s] = n[s].replace(/:nth-child\((.*?)\)/i, ""));
      }
      l = _i(n.join(" "));
    }
    return t ? l : (window.ypOption.show_css_selector && (l = Da(l)), ze(l));
  }
  function ze(e) {
    for (var t = ua(e), a = "", n = 0, s, r, l, d; n < t.length; n++)
      (r = t[n].replace(/:nth-child\((.*?)\)/i, "")),
        (l = _i(o.trim(a + window.separator + r + window.separator + r))),
        (d = Gi.find(l)),
        (s = d.length),
        0 < s && d.hasClass("wyp-selected")
          ? (a = _i(a) + " > " + t[n] + window.separator)
          : (a += t[n] + window.separator);
    if (
      ((a = o.trim(a)),
      1 < Gi.find(a).length && (a = a.replace(/(?=[^ ]*$)/i, " > ")),
      -1 != a.indexOf(">"))
    ) {
      var p = a.split(">").length,
        c = Gi.find(a).length;
      for (n = 1; n < p; n++)
        (d = Gi.find(a.replace(/ > /i, " "))),
          d.length == c &&
            d.hasClass("wyp-selected") &&
            (a = a.replace(/ > /i, " "));
    }
    return /^[>\s]+/gi.test(a) && (a = a.replace(/^[>\s]+/gi, "")), _i(a);
  }
  function Oe(e, t) {
    for (var a = [], n = 0; n < e.length; n++) n < t && a.push(e[n]);
    return a;
  }
  function De(e, t) {
    for (var a = [], n = 0; n < e.length; n++) n > t && a.push(e[n]);
    return a;
  }
  function Ae() {
    o("#ed-elt-tr span").remove();
    var e = o("#ed-elt-tr ul");
    if ((e.empty(), e.parent().removeClass("ed-eld-larger"), void 0 === _()))
      return !1;
    var t = _().parentsUntil("html").addBack(),
      a = t.length,
      n = "",
      s = t.length,
      r = "",
      l,
      d,
      p;
    t.each(function (e) {
      return (
        !!(e < a - window.maxDeep) ||
        void ((l = this),
        l.classList.add("wyp-pa-r" + e),
        (d = ya(l)),
        (p = Se(d, l)),
        (n +=
          s - 1 == e
            ? "<li data-index='" +
              e +
              "' data-parent-selector='" +
              d +
              "' class='active'><span>" +
              p +
              "</span></li>"
            : "<li data-index='" +
              e +
              "' data-parent-selector='" +
              d +
              "'><span>" +
              p +
              "</span></li>"),
        (r += p + " "))
      );
    }),
      70 < r.length && 4 < s && e.parent().addClass("ed-eld-larger"),
      e.append(n);
  }
  function Se(e, t) {
    var a = bi(e, !1, o(t));
    return (
      (null == a || !1 == a) && (a = qi.unknown),
      a.toLowerCase() == qi.division && (a = e),
      (a = a.replace(/\\/g, "")),
      a
    );
  }
  function Te() {
    var e;
    if ("" == window.parentItems) {
      e = "";
      var t = _().parentsUntil("html"),
        a = t.length - 1,
        n;
      t.each(function (t) {
        return (
          !(t > window.maxDeep) &&
          void ((e = Se(ya(this), this)),
          22 < e.length && (e = e.substr(0, 21) + "&hellip;"),
          (n = ""),
          !0 == Ee(null, "wyp-pa-r" + (a - t)) && (n = "Edited"),
          (e = e + "<i class='wyp-contextmenu-small'>" + n + "</i>"),
          (window.parentItems += '"parent-' + t + '" : {"name": "' + e + '"},'))
        );
      }),
        (window.parentItems +=
          '"show-more-parent-link" : {"name": "...", "className": "show-more-parent-link"},'),
        (window.parentItems = o.parseJSON(
          "{" + window.parentItems.replace(/,$/g, "").toString() + "}"
        ));
    }
    "" == window.childrenItems &&
      ((e = ""),
      _()
        .children()
        .each(function (t) {
          return (
            !(t > window.maxDeep) &&
            void (
              "BR" != o(this).prop("tagName").toUpperCase() &&
              ((e = Se(ya(this), this)),
              22 < e.length && (e = e.substr(0, 21) + "&hellip;"),
              (window.childrenItems +=
                '"children-' + t + '" : {"name": "' + e + '"},'))
            )
          );
        }),
      (window.childrenItems +=
        '"show-more-children-link" : {"name": "...", "className": "show-more-children-link"},'),
      (window.childrenItems = o.parseJSON(
        "{" + window.childrenItems.replace(/,$/g, "").toString() + "}"
      )));
  }
  function Ee(e, t) {
    var a = !1,
      i = [],
      n,
      s;
    if (((i = Nt(e).selectors), !1 != i && null != i && 0 < i.length))
      for (var o = 0; o < i.length; o++)
        if (
          ((n = xi(i[o], !0, !0, !0, !0)), (s = Ca(n, !0, !1, !1)), !1 != s) &&
          !0 == Gi.find(n).hasClass(t)
        ) {
          a = !0;
          break;
        }
    return a;
  }
  function Le() {
    o(
      ".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs,.wyp-contextmenu-reset-single-self,.wyp-contextmenu-reset-template-self,.wyp-contextmenu-reset-global-self"
    ).removeClass("wyp-disable-contextmenu");
    for (
      var e = [],
        a = 0,
        n = 0,
        s = 0,
        r = 0,
        l = 0,
        d = 0,
        p = [],
        c = null,
        u = ["global", "template", "single"],
        m = 0,
        f = 0,
        g,
        h,
        y,
        w,
        v,
        b;
      f < u.length;
      f++
    ) {
      if (
        ((n = 0),
        (s = 0),
        (r = 0),
        (c = u[f]),
        o(
          ".wyp-contextmenu-reset-" +
            c +
            "-childs,.wyp-contextmenu-reset-" +
            c +
            "-self"
        ).addClass("wyp-disable-contextmenu"),
        (w = Nt(c)),
        c == E() && (v = w),
        (p = w.selectors),
        (e = w.rules),
        !1 == p || null == p || 0 >= p.length)
      ) {
        o(".wyp-contextmenu-reset-" + c).addClass("wyp-disable-contextmenu");
        continue;
      }
      for (b = 0; b < p.length; b++)
        ((h = e[b]),
        (g = xi(p[b], !0, !0, !0, !0)),
        (y = Ca(g, !0, !1, !1)),
        !1 != y) &&
          (0 < Gi.find(g).parents(".wyp-selected").length
            ? (o(".wyp-contextmenu-reset-" + c + "-childs").removeClass(
                "wyp-disable-contextmenu"
              ),
              d++,
              (a += h),
              (n += h),
              (s += h))
            : !0 == Gi.find(g).hasClass("wyp-selected") &&
              (o(".wyp-contextmenu-reset-" + c + "-self").removeClass(
                "wyp-disable-contextmenu"
              ),
              l++,
              (a += h),
              (n += h),
              (r += h)));
      0 == n &&
        o(".wyp-contextmenu-reset-" + c).addClass("wyp-disable-contextmenu"),
        o(".wyp-contextmenu-reset-" + c + "-self > span").html(
          o(".wyp-contextmenu-reset-" + c + "-self > span").nodeText() +
            "<i class='wyp-contextmenu-small'>" +
            r +
            "</i>"
        ),
        o(".wyp-contextmenu-reset-" + c + "-childs > span").html(
          o(".wyp-contextmenu-reset-" + c + "-childs > span").nodeText() +
            "<i class='wyp-contextmenu-small'>" +
            s +
            "</i>"
        ),
        (m += r);
    }
    0 == l &&
      0 == d &&
      o(".wyp-contextmenu-reset-styles").addClass("wyp-disable-contextmenu"),
      0 == l
        ? o(".wyp-contextmenu-review-styles").addClass(
            "wyp-disable-contextmenu"
          )
        : o(".wyp-contextmenu-review-styles > span").html(
            o(".wyp-contextmenu-review-styles > span").nodeText() +
              "<i class='wyp-contextmenu-small'>" +
              m +
              "</i>"
          ),
      o(".wyp-contextmenu-pseudo-classes .wyp-contextmenu-small").remove(),
      (p = v.selectors);
    var x = "";
    if (!1 != p && null != p && 0 < p.length)
      for (b = 0; b < p.length; b++)
        !1 !=
          /(:|yp-selector-)(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g.test(
            p[b]
          ) &&
          ((x = p[b]
            .match(
              /(:|\.yp-selector-)(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g
            )[0]
            .replace(/(\:|\.yp-selector-)/g, "")),
          (g = xi(p[b], !0, !0, !0, !0)),
          (y = Ca(g, !0, !1, !1)),
          !1 != y) &&
          !0 == Gi.find(g).hasClass("wyp-selected") &&
          o(".wyp-contextmenu-" + x).append(
            "<i class='wyp-contextmenu-small'>Edited</i>"
          );
  }
  function Be(e) {
    var t = 0,
      a = o(".ed-pnl"),
      i = o(".ed-pnl-list"),
      n = o(".ed-pnl-footer"),
      s = window.ypData["wyp-fix-pan"];
    if ("none" === a.css("display") && !0 !== e) return n.show(), !1;
    window.lastScrollTop = i.scrollTop();
    var r = i.offset().top,
      l = n.height();
    i.hasClass("list-active") || (l = 0);
    var d = Gi.height(),
      p = o("#iframe").height(),
      c = o(window).height(),
      u = c - (r + l);
    if (
      (i.removeAttr("style"),
      i.find(".wyp-t-cont").css("height", ""),
      (t = i.height()),
      i.hasClass("list-active"))
    )
      t > u && !1 == s && i.height(u - 10), s && i.height(u);
    else {
      var m = i.find("li.active .wyp-t-cont"),
        f = 41;
      s || (f += 10), t > u && m.height(u - f);
    }
    n.css("width", parseInt(a.width()) + "px"),
      i.scrollTop(window.lastScrollTop),
      0 < o(".ed-pnl-list > li.active").length ? n.hide() : n.show(),
      !1 == A() &&
        (clearTimeout(vn),
        (vn = setTimeout(function () {
          d > p
            ? a.css("marginRight", 4 + ei() + "px")
            : a.css("marginRight", "4px");
        }, window.Yellow2Delay)));
  }
  function Me(e) {
    if (
      (!1 === window.leftBarSize &&
        (window.leftBarSize = document
          .querySelector(".editor-leftbar")
          .getBoundingClientRect()),
      "cursor" !== window.ypData.inspector && window.ypData["wyp-met-dis"])
    ) {
      var t = o(e.target),
        a = t.get(0),
        i = C(),
        n = t.prop("tagName").toLowerCase();
      if (
        (t.hasClass("wyp-iframe-ph") &&
          void 0 !== window.ypData["wyp-will-selected"] &&
          (t = window.ypData["wyp-will-selected"]),
        !1 == window.setSelector &&
          !1 == i &&
          ("iframe" == n || "audio" == n || "video" == n) &&
          !J(a))
      ) {
        var s = Ra(a),
          r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
          l = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
          d = s.width,
          p = s.height,
          c = s.top + l,
          u = s.left + r,
          m = t.css([
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
          ]),
          f = m["margin-top"],
          g = m["margin-right"],
          h = m["margin-bottom"],
          y = m["margin-left"],
          w = m["padding-top"],
          v = m["padding-right"],
          b = m["padding-bottom"],
          x = m["padding-left"];
        (c -= parseFloat(f)),
          (u -= parseFloat(y)),
          sn.extra.append(
            "<div class='wyp-iframe-ph' style='transform:translate3d(" +
              u +
              "px, " +
              c +
              "px, 0px) !important;width:" +
              d +
              "px !important;height:" +
              p +
              "px !important;margin-top:" +
              f +
              ";margin-right:" +
              g +
              ";margin-bottom:" +
              h +
              ";margin-left:" +
              y +
              ";padding-top:" +
              w +
              ";padding-right:" +
              v +
              ";padding-bottom:" +
              b +
              ";padding-left:" +
              x +
              ";'></div>"
          ),
          (window.ypData["wyp-will-selected"] = t);
      }
      if (
        (!0 === i &&
          !1 === window.ypData["wyp-control-key-down"] &&
          (window.ypData["wyp-rcnt-hvr-el"] = t),
        window.placeholderSelector)
      )
        return !1;
      if (t.hasClass("wyp-iframe-ph")) return !1;
      if (!1 === window.ypData["wyp-control-key-down"]) {
        if (window.firstSelectLimit) return !1;
        if (!0 === i) return !1;
      }
      if ("html" == n) return !1;
      if (null === t) return !1;
      if (0 === t.length) return !1;
      !1 === i &&
        (void 0 !== _() && _().removeClass("wyp-selected"),
        (window.ypData["data-clickable-select"] = void 0),
        (window.ypData.get_selected_element = void 0),
        Gi.find(".wyp-selected-others").removeClass(".wyp-selected-others"),
        t.addClass("wyp-selected"),
        (window.ypData.get_selected_element = t));
      var k;
      if (
        ((k =
          !1 === window.setSelector ? Ma(t, "default") : window.setSelector),
        e.stopPropagation(),
        e.preventDefault(),
        !1 === i)
      ) {
        var z = bi(k, !0, t),
          O = sn.general.find(".wyp-selected-tooltip");
        0 == O.length &&
          sn.general.append(
            "<div class='wyp-selected-tooltip'><div class='wyp-slct-tooltip'><span class='wyp-slct-menu'></span></div><small class='wyp-tooltip-small'></small></div>"
          ),
          sn.general
            .get(0)
            .style.setProperty("--tooltip-selector", '"' + o.trim(k) + '"'),
          sn.general.get(0).style.setProperty("--tooltip-title", '"' + z + '"');
        var D = Pa(),
          A = Ra(a, D),
          S = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
          T = parseFloat(Ji.scrollLeft() + Ki.scrollLeft());
        ti(k, void 0, { boxSize: A, scrollTop: S, scrollLeft: T, diff: D }),
          ii({ boxSize: A, scrollTop: S, scrollLeft: T, diff: D });
      } else
        window.ypData["wyp-control-key-down"] &&
          0 === t.parents(".wyp-selected").length &&
          (Gi.find(".wyp-multiple-selected").removeClass(
            "wyp-multiple-selected"
          ),
          t.addClass("wyp-multiple-selected"),
          (window.ypData["wyp-rcnt-hvr-el"] = t),
          ti(t, "multiple"));
    }
  }
  function Ze() {
    if (void 0 === _()) return !1;
    var e = _().get(0),
      t;
    return (J(e)
      ? ((t = {}), (t.width = 0), (t.height = 0))
      : (t = e.getBoundingClientRect()),
    0 == t.width && 0 == t.height)
      ? (clearTimeout(window.SelectedElHidden),
        (window.SelectedElHidden = setTimeout(function () {
          C() &&
            (!Ji.hasClass("wyp-ele-n-vis") &&
              Li(
                "The Element Is Hidden",
                "The selected element is hidden in the current screen size.",
                "selectedElement"
              ),
            Ji.addClass("wyp-ele-n-vis"));
        }, 600)),
        !1)
      : void (clearTimeout(window.SelectedElHidden),
        Bi("selectedElement"),
        Ji.removeClass("wyp-ele-n-vis"),
        Ia(".wyp-selected", "wyp-selected-boxed"),
        ti(),
        ii());
  }
  function Pe(e) {
    return "desktop" == e ? "" : "@media " + e + "{";
  }
  function Re(e) {
    return "desktop" == e ? "" : "}";
  }
  function Ie(e, t, i, n, s, o, l) {
    if (!1 == window.ypOption.smart_important_tag) return !1;
    (s = je(s, t, i)),
      (e = at(e, t)),
      (i = i.replace(/\s+?!important/g, "").replace(/\;$/g, ""));
    var d = a(null, !1);
    null == l &&
      (l = c(d, "[selector=" + gi(e) + "][rule=" + t + "][msize=" + s + "]"));
    var p = null;
    if (
      ((p = c(
        d,
        "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" + s + "]"
      )),
      null != p && (l = p + 1),
      r(
        u(
          a(null, !1),
          "[selector=" + gi(e) + "][rule=" + t + "][msize=" + s + "]"
        )
      ),
      r(
        u(
          a(null, !1),
          "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" + s + "]"
        )
      ),
      "animation-name" == t && $e(e, t, i, n, s, o),
      "disable" == i || "" == i || "undefined" == i || null === i)
    )
      return !1;
    "a" != i && !0 == window.ypOption.append_auto_comments && Ci(e, null);
    var f = Pe(s),
      g = Re(s),
      y = i + n;
    if (
      ("" != gi(e) &&
        (!0 === S() && "position" != t
          ? (Gi.find(
              "#wyp-anim-scenes #" + gi(Qi.attr("data-anim-scene") + t)
            ).remove(),
            Gi.find(
              "#wyp-anim-scenes #" + Qi.attr("data-anim-scene") + ""
            ).append(
              '<style data-rule="' +
                t +
                '" class="style-' +
                Qi.attr("data-anim-scene") +
                " scenes-" +
                gi(t) +
                '-style">' +
                e +
                "{" +
                t +
                ":" +
                y +
                " !important}</style>"
            ))
          : ((d = a(null, !1)),
            -1 != window.webkitArray.indexOf(t) &&
              r(
                m(d, f + e + "{-webkit-" + t + ":" + y + " !important}" + g, l)
              ),
            r(
              m(a(null, !1), f + e + "{" + t + ":" + y + " !important}" + g, l)
            ))),
      Ji.hasClass("wyp-wf-on") && C())
    ) {
      var w = qt(t)[0];
      ("color" == t ||
        "background-color" == t ||
        "background-image" == t ||
        "box-shadow" == w ||
        "border-color" == t ||
        "text-shadow" == t ||
        -1 != w.indexOf("-radius") ||
        "filter" == w ||
        "backdrop-filter" == w) &&
        _().addClass("wyp-no-wf");
    }
    var v = nt(null, t, y);
    v.always(function (l) {
      if (!1 == l) {
        var d = ua(e).length;
        if (12 < d + 1) return !1;
        window.minCrpdSlctr = d + 1;
        var p = Ma(
          Gi.find(".wyp-con-slcd .wyp-selected"),
          window.lastParentQueryStatus
        );
        if (((window.minCrpdSlctr = !1), ua(p).length <= d)) return !1;
        r(
          u(
            a(o, !1),
            "[selector=" + gi(e) + "][rule=" + t + "][msize=" + s + "]"
          ),
          o
        ),
          r(
            u(
              a(o, !1),
              "[selector=" + gi(e) + "][rule=" + h(t) + "][msize=" + s + "]"
            ),
            o
          ),
          Ie(p, t, i, n, s, o, "default"),
          setTimeout(function () {
            Ze();
          }, window.Yellow2Delay);
      }
    });
  }
  function Ye(e) {
    var t = o("<pre>");
    t.html(e), (e = t.html());
    for (
      var a = e
          .replace(/\,\r?\n(\s+)?/g, function (e) {
            var t = ",",
              i = e.match(/\r?\n/g);
            if (i) for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
            return t;
          })
          .replace(/\r?\n(\s+)?\{/g, function (e) {
            var t = "{",
              i = e.match(/\r?\n/g);
            if (i) for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
            return t;
          })
          .replace(/\:\r?\n(\s+)?/g, function (e) {
            var t = ":",
              i = e.match(/\r?\n/g);
            if (i) for (var n = 0; n < i.length; n++) t += "tx8thk3bz1u9i6av";
            return t;
          })
          .split(/\r?\n/g),
        s = { open: 0, isComment: !1, close: 0 },
        r = a.length,
        l = null,
        d = null,
        p = 0,
        c = 0,
        u,
        m,
        f,
        g,
        h,
        y,
        w,
        v,
        b;
      c < r;
      c++
    ) {
      if (
        ((u = a[c]),
        (m = null),
        (g = 0),
        (h = null),
        (d = null),
        (w = u.match(/\/\*/g)),
        w && 0 < w.length && (s.isComment = !0),
        (y = u.match(/\*\//g)),
        s.isComment && y && 0 < y.length && (s.isComment = !1),
        /tx8thk3bz1u9i6av/.test(u) &&
          (u = u.replace(/tx8thk3bz1u9i6av/g, function () {
            return p++, "";
          })),
        (u = u.replace(/(\/\*)[^\n]+(\*\/)/g, "")),
        (u = u.replace(/\s+/g, "")),
        (u = u.replace(
          /(\"([^\"]+)?\"|\'([^\']+)?\'|\(([^\)]+)?\))/g,
          "np2ne4pf9j3x8hpj"
        )),
        !1 == /\/\*/.test(u) && /\*\//.test(u)
          ? (u = u.replace(/^([^\n]+)?(\*\/)/g, ""))
          : /\/\*/.test(u) &&
            !1 == /\*\//.test(u) &&
            (u = u.replace(/(\/\*)([^\n]+)?$/g, "")),
        w && 0 < w.length && 0 == u.length)
      )
        continue;
      else if (y && 0 < y.length && 0 == u.length) continue;
      else if (null === w && null === y && s.isComment) continue;
      else if (0 == u.length) continue;
      if (
        ((f = u.match(/\}/g)),
        (m = u.match(/\{/g)),
        m &&
          ((s.open += m.length),
          (h =
            /^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/g.test(
              u
            )
              ? "function-open"
              : "selector-open")),
        f && (s.close += f.length),
        (g = s.open - s.close),
        "function-open" == h
          ? (l = h)
          : "selector-open" == h && 2 > g
          ? (l = h)
          : 0 == g && (l = null),
        null === f && null === m)
      ) {
        if ("function-open" == l && 2 == g) {
          if (!1 === /^(\s+)?([^\:]+\:[^\;]+\;)/.test(u))
            if (
              ((v = u.match(/:/g)),
              (b = u.match(/\;/g)),
              v && b && 0 < v.length && b.length === v.length)
            );
            else if (!/^(\s+)?([^\:]+\:[^\;]+)/.test(u)) {
              d = {
                text: "Invalid CSS property at line " + (c + p + 1),
                index: c + 1,
              };
              break;
            } else if (
              !1 == a[c + 1] ||
              !1 ==
                /^[^\:\;]+$/g.test(a[c + 1].replace(/\/\*([^\n]+)?\*\//g, ""))
            ) {
              d = {
                text: "expected character: ; at line " + (c + p + 1),
                index: c + 1,
              };
              break;
            }
        } else if (
          "selector-open" == l &&
          1 == g &&
          !1 === /^(\s+)?([^\:]+\:[^\;]+\;(\s+)?$)/.test(u)
        )
          if (
            ((v = u.match(/:/g)),
            (b = u.match(/\;/g)),
            v && b && 0 < v.length && b.length === v.length)
          );
          else if (!/^(\s+)?([^\:]+\:[^\;]+)/.test(u)) {
            d = {
              text: "Invalid CSS property at line " + (c + p + 1),
              index: c + 1,
            };
            break;
          } else if (
            !1 == a[c + 1] ||
            !1 == /^[^\:\;]+$/g.test(a[c + 1].replace(/\/\*([^\n]+)?\*\//g, ""))
          ) {
            d = {
              text: "expected character: ; at line " + (c + p + 1),
              index: c + 1,
            };
            break;
          }
        if (
          /(^[^\:]+$|^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document))/.test(
            u
          ) &&
          0 !== u.length
        )
          if (
            /^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|media|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/g.test(
              u
            )
          ) {
            d = {
              text: "expected character: { at line " + (c + p + 1),
              index: c + 1,
            };
            break;
          } else if (!1 === /(\/\*|\*\/)/g.test(u))
            if (/^(\s+)?\@(charset|import|namespace)/.test(u)) {
              d = {
                text: "unsupported feature at line " + (c + p + 1),
                index: c + 1,
              };
              break;
            } else {
              d = {
                text: "expected character: { at line " + (c + p + 1),
                index: c + 1,
              };
              break;
            }
      }
      if (1 < g && "function-open" !== l) {
        d = {
          text: "unexpected character: { at line " + (c + p + 1),
          index: c + 1,
        };
        break;
      }
      if (
        "function-open" === l &&
        /^(\s+)?\@(keyframes|-webkit-keyframes|-moz-keyframes|-o-keyframes|supports|-webkit-supports|-moz-supports|-o-supports|document|-webkit-document|-moz-document|-o-document)/.test(
          u
        )
      ) {
        d = {
          text: "unsupported feature at line " + (c + p + 1),
          index: c + 1,
        };
        break;
      }
    }
    d ||
      (s.open > s.close
        ? (d = { text: "expected character: } at line " + (c + p), index: c })
        : s.close > s.open
        ? (d = { text: "unexpected character: } at line " + (c + p), index: c })
        : s.isComment &&
          (d = {
            text: "expected character: */ at line " + (c + p),
            index: c,
          })),
      tn.removeClass("css-code-unvalid"),
      n.getSession().setAnnotations([]),
      d
        ? (tn.addClass("css-code-unvalid"),
          o(".unvalid-css-error span").text(d.text),
          o(".unvalid-css-error").attr("data-error-index", d.index + p),
          n
            .getSession()
            .setAnnotations([
              { row: d.index - 1 + p, column: 0, text: d.text, type: "error" },
            ]))
        : tn.removeClass("css-error-message");
  }
  function Ne(e) {
    var t;
    (e = e.replace(/\}/g, "}\n")),
      (e = e.replace(
        /(^|\s|\}|\*\/)(.*?):(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid){/g,
        function (e) {
          return (
            (t = ""),
            -1 != e.indexOf("\n") && ((e = e.replace(/\n/g, "")), (t = "\n")),
            t + Xe(e)
          );
        }
      )),
      (e = e
        .replace(/\:yp-onscreen/g, ".yp_onscreen")
        .replace(/\:yp-focus/g, ".yp_focus")
        .replace(/\:yp-hover/g, ".yp_hover")
        .replace(/\:yp-click/g, ".yp_click"));
    var a = new RegExp(
      "([^-])(" + window.webkitArray.join("|") + "):(.*?);",
      "g"
    );
    return (e = e.replace(a, "$1-webkit-$2:$3;\n\t$2:$3;")), e;
  }
  function He(e) {
    if (!C()) return !1;
    if ("0" == on.css("opacity")) return !1;
    on.stop().animate({ opacity: 0 }, e);
    var t = Ji.find("#wyp-ui-transform-hide");
    0 == t.length
      ? Ji.append(
          "<style id='wyp-ui-transform-hide'>.wyp-con-slcd.wyp-h-trfm .wyp-selected,.wyp-h-trfm .wyp-selected-others{outline:none !important}</style>"
        )
      : t.text(
          ".wyp-con-slcd.wyp-h-trfm .wyp-selected,.wyp-h-trfm .wyp-selected-others{outline:none !important}"
        );
  }
  function We(e) {
    var t = Ji.find("#wyp-ui-transform-hide");
    return (
      0 < t.length && t.text(""),
      !!C() &&
        !window.ypData["wyp-force-hide-select-ui"] &&
        "1" != on.css("opacity") &&
        void (Ze(), on.stop().animate({ opacity: 1 }, e))
    );
  }
  function Fe() {
    var e = "desktop";
    if (A()) {
      var t, a;
      (t =
        0 < o(".breakpoint-bar .breakpoint-item.focus").length
          ? o(".breakpoint-bar .breakpoint-item.focus").attr("data-breakpoint")
          : o("#iframe").width()),
        (a = o(".media-control").attr("data-code")),
        (e = "(" + a + ":" + t + "px)");
    }
    return e;
  }
  function je(e, t, a) {
    if ("--google-webfont" == t) return "desktop";
    if (K(e)) return e;
    if (A()) {
      var i, n;
      return (
        (i =
          0 < o(".breakpoint-bar .breakpoint-item.focus").length
            ? o(".breakpoint-bar .breakpoint-item.focus").attr(
                "data-breakpoint"
              )
            : o("#iframe").width()),
        (n = o(".media-control").attr("data-code")),
        (e = "(" + n + ":" + i + "px)"),
        e
      );
    }
    if (
      !0 == window.ypOption.smart_responsive_technology &&
      "disable" != a &&
      ("font-size" == t ||
        "line-height" == t ||
        "letter-spacing" == t ||
        "word-spacing" == t ||
        "margin-left" == t ||
        "margin-right" == t ||
        "margin-top" == t ||
        "margin-bottom" == t ||
        "padding-left" == t ||
        "padding-right" == t ||
        "padding-top" == t ||
        "padding-bottom" == t ||
        "z-index" == t ||
        "column-count" == t ||
        "position" == t ||
        "top" == t ||
        "left" == t ||
        "right" == t ||
        "bottom" == t ||
        "width" == t ||
        "height" == t ||
        "min-width" == t ||
        "min-height" == t ||
        "max-width" == t ||
        "max-height" == t ||
        "animation-name" == t ||
        "animation-duration" == t ||
        "animation-delay" == t ||
        "animation-fill-mode" == t ||
        "transform" == t ||
        "filter" == t ||
        "backdrop-filter" == t ||
        "opacity" == t ||
        "display" == t ||
        "cursor" == t ||
        "float" == t ||
        "clear" == t ||
        "visibility" == t ||
        "pointer-events" == t ||
        "overflow" == t)
    ) {
      var s = Va(t);
      if (K(s))
        return (
          null != a &&
            !1 != a &&
            "disable" != a &&
            Li(
              "Preserving Responsive Design",
              "The style was applied to a specific screen size to preserve the responsive design.",
              "responsiveLayout"
            ),
          s
        );
    }
    return "desktop";
  }
  function Xe(e) {
    e = e
      .replace(/\:yp-onscreen/g, ".yp_onscreen")
      .replace(/\:yp-focus/g, ".yp_focus")
      .replace(/\:yp-hover/g, ".yp_hover")
      .replace(/\:yp-click/g, ".yp_click");
    var t = e.match(
      /:(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g
    );
    if (null != t) t = t[0].replace(/:/g, "");
    else return e;
    var a = "",
      i = "";
    return (
      ("hover" == t ||
        "focus" == t ||
        "active" == t ||
        "visited" == t ||
        "link" == t ||
        "checked" == t ||
        "disabled" == t ||
        "enabled" == t ||
        "invalid" == t ||
        "valid" == t) &&
        ("}" == e.charAt(0) && (a = "}"),
        "{" == e.slice(-1) && (i = "{"),
        (e = e.replace(/(\{|\})/g, "")),
        (e = e.replace(
          /(body)?\.yp-selector-(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)\./g,
          "body."
        )),
        (e = e.replace(
          /(body)?\.yp-selector-(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)/g,
          ""
        )),
        (e = e.replace(
          /:(hover|focus|active|visited|link|checked|disabled|enabled|invalid|valid)(\s+)?$/g,
          ""
        )),
        (e = Hi(e, "yp-selector-" + t)),
        (e = e.replace(/(\r|\n)/g, "")),
        (e = a + e + i)),
      e
    );
  }
  function Ve(e, t) {
    return (
      !0 === t
        ? ((e = e.replace(/:nth-child\((.*?)\)/g, ".nth-child.$1.")),
          (e = e.replace(/:not\((.*?)\)/g, ".notYP$1YP")),
          (e = e.replace(/:lang\((.*?)\)/g, ".langYP$1YP")),
          (e = e.replace(/:nth-last-child\((.*?)\)/g, ".nth-last-child.$1.")),
          (e = e.replace(
            /:nth-last-of-type\((.*?)\)/g,
            ".nth-last-of-type.$1."
          )),
          (e = e.replace(/:nth-of-type\((.*?)\)/g, ".nth-of-type.$1.")))
        : ((e = e.replace(/\.nth-child\.(.*?)\./g, ":nth-child($1)")),
          (e = e.replace(/\.notYP(.*?)YP/g, ":not($1)")),
          (e = e.replace(/\.langYP(.*?)YP/g, ":lang($1)")),
          (e = e.replace(/\.nth-last-child\.(.*?)\./g, ":nth-last-child($1)")),
          (e = e.replace(
            /\.nth-last-of-type\.(.*?)\./g,
            ":nth-last-of-type($1)"
          )),
          (e = e.replace(/\.nth-of-type\.(.*?)\./g, ":nth-of-type($1)"))),
      e
    );
  }
  function Ue(e, t, a, i) {
    var n = "",
      s = Pe(i),
      o = Re(i);
    if ("" != gi(e) && "disable" != a) {
      n = d(s + e + "{" + t + ":" + a + "}" + o);
    }
    return n;
  }
  function qe(e) {
    tn.addClass("process-by-code-editor");
    var t = Ne(Et(!0, null, !1));
    (t = Ve(t, !0)),
      (t = t.replace(/(\r\n|\n|\r)/g, "").replace(/\t/g, "")),
      (t = t
        .replace(/\}\s+\}/g, "}}")
        .replace(/\s+\{/g, "{")
        .replace(/\}\s+/g, "}")),
      (t = t.replace(/\s+\}/g, "}").replace(/\{\s+/g, "{")),
      (t = ka(t));
    var a = t;
    if (
      ((t = t.replace(/(\/\*)(.*?)\*\/(\s+)?/g, "")),
      (t = t
        .replace(/@?([a-zA-Z0-9_-]+)?keyframes(.*?)\}\}/g, "")
        .replace(/@(-webkit-|-moz-|-o-)?(supports|document)(.*?)\}\}/g, "")),
      "desktop" != e)
    ) {
      var n = o.trim(e.replace(/\)/g, "\\)").replace(/\(/g, "\\(")),
        s = new RegExp(n + "(.*?)}}", "g"),
        r = new RegExp(n, "g");
      null != t.match(s) && (t = t.match(s).toString()),
        (t = t.replace(r, "")),
        (t = t.toString().replace(/\}\}/g, "}"));
    } else t = t.replace(/@media(.*?)\}\}/g, "");
    if ("" == t) return tn.removeClass("process-by-code-editor"), !1;
    var d = "",
      p;
    "desktop" == e && St().empty(), (t = t.toString().replace(/\}\,/g, "}"));
    var c = hi(t.replace(/\{(.*?)\}/g, "|BREAK|").split("|BREAK|")),
      u = e
        .toString()
        .replace(/\{/g, "")
        .replace(/@media /g, "")
        .replace(/@media/g, "");
    (t = "}" + t), (t = t.replace(/\}/g, "}}"));
    for (var m = 0; m < c.length; m++)
      if (
        ((p = c[m]), null != p && "" != p) &&
        ((p = p.trim()), -1 == p.indexOf("}") && -1 == p.indexOf("{"))
      ) {
        var f = Na(p),
          g = window.selectorComments[gi(p)];
        null != g &&
          null != g &&
          !1 == new RegExp("\\/\\*(.*?)\\*\\/" + f + "{", "gi").test(a) &&
          delete window.selectorComments[gi(p)];
        var h = t.match(new RegExp("}" + f + "{(.*?)}", "g"));
        if (((p = Ve(_i(p), !1)), null !== h && "" != h)) {
          (h = h
            .toString()
            .match(/\{(.*?)\}/g)
            .toString()
            .replace(/\}\,\{/g, ";")
            .replace(/\{/g, "")
            .replace(/\}/g, "")
            .replace(/\;\;/g, ";")),
            (h = h.replace(/\((.*?)\)|\"(.*?)\"/g, function (e) {
              return e.replace(/\;/g, "YxkHNXdP");
            })),
            (h = h.replace(/\((.*?)\)|\"(.*?)\"/g, function (e) {
              return e.replace(/\:/g, "HXImiddP");
            })),
            (h = h.split(";"));
          for (var y = 0, w, v, b; y < h.length; y++)
            (w = o
              .trim(h[y])
              .replace(/YxkHNXdP/g, ";")
              .replace(/HXImiddP/g, ":")),
              void 0 !== w &&
                3 <= w.length &&
                -1 != w.indexOf(":") &&
                ((v = w.split(":")[0]),
                "" != v &&
                  "a" != v &&
                  ((b = w.split(":").slice(1).join(":")),
                  "" != b && (d += Ue(p, v, b, u))));
        }
      }
    "" != d && l(d), tn.removeClass("process-by-code-editor");
  }
  function $e(e, t, a, i, n, s) {
    if ("disable" != a && "none" != a && C() && !1 === T()) {
      var r = _();
      if (
        !1 === o("#animation-duration-group").hasClass("hidden-option") &&
        !1 === o("#animation-delay-group").hasClass("hidden-option")
      ) {
        var l = r.css("animationDuration").replace(/[^0-9.,]/g, ""),
          d = r.css("animationDelay").replace(/[^0-9.,]/g, "");
        xi(e, !1, !1, !0, !0) == _a().trim() &&
          ("0" == l && (l = 1),
          tt(e, "animation-duration", l + "s", i, n, s),
          0 > d && (d = 0),
          tt(e, "animation-delay", d + "s", i, n, s));
      }
      var p = r.css("animationFillMode");
      (null == p || "none" == p) && (p = "both"),
        tt(_a(), "animation-fill-mode", p, i, n, s),
        pa("animation-duration"),
        pa("animation-delay"),
        pa("animation-fill-mode");
    }
    "bounce" == a
      ? tt(e, "transform-origin", "center bottom", i, n, s)
      : "swing" == a
      ? tt(e, "transform-origin", "top center", i, n, s)
      : "jello" == a
      ? tt(e, "transform-origin", "center", i, n, s)
      : tt(e, "transform-origin", "disable", i, n, s),
      "lightSpeedIn" == a || "heartBeat" == a || "headShake" == a
        ? tt(e, "animation-timing-function", "ease-out", i, n, s)
        : "lightSpeedOut" == a
        ? tt(e, "animation-timing-function", "ease-in", i, n, s)
        : tt(e, "animation-timing-function", "disable", i, n, s),
      "flip" == a ||
      "flipInX" == a ||
      "flipInY" == a ||
      "flipOutX" == a ||
      "flipOutY" == a
        ? tt(e, "backface-visibility", "visible", i, n, s)
        : tt(e, "backface-visibility", "disable", i, n, s);
  }
  function Ge(e, t) {
    var a = xi(e, !0, !0, !0, !0),
      i = xi(t, !0, !0, !0, !0),
      n = Ca(a, !0, !1, !1);
    if (!1 == n) return !1;
    var s = Ca(i, !0, !1, !1);
    if (!1 == s) return !1;
    n.addClass("test-selector1-group");
    var o = s.filter(".test-selector1-group");
    return (
      n.removeClass("test-selector1-group"),
      s.length == o.length &&
        n.length == s.length &&
        0 != n.length &&
        /yp-selector-hover/g.test(e) == /yp-selector-hover/g.test(t) &&
        /yp-selector-focus/g.test(e) == /yp-selector-focus/g.test(t) &&
        /yp-selector-active/g.test(e) == /yp-selector-active/g.test(t) &&
        /yp-selector-visited/g.test(e) == /yp-selector-visited/g.test(t) &&
        /yp-selector-link/g.test(e) == /yp-selector-link/g.test(t) &&
        /yp-selector-checked/g.test(e) == /yp-selector-checked/g.test(t) &&
        /yp-selector-disabled/g.test(e) == /yp-selector-disabled/g.test(t) &&
        /yp-selector-enabled/g.test(e) == /yp-selector-enabled/g.test(t) &&
        /yp-selector-invalid/g.test(e) == /yp-selector-invalid/g.test(t) &&
        /yp-selector-valid/g.test(e) == /yp-selector-valid/g.test(t) &&
        /wyp-scene-1/g.test(e) == /wyp-scene-1/g.test(t) &&
        /wyp-scene-2/g.test(e) == /wyp-scene-2/g.test(t) &&
        /wyp-scene-3/g.test(e) == /wyp-scene-3/g.test(t) &&
        /wyp-scene-4/g.test(e) == /wyp-scene-4/g.test(t) &&
        /wyp-scene-5/g.test(e) == /wyp-scene-5/g.test(t) &&
        /wyp-scene-6/g.test(e) == /wyp-scene-6/g.test(t) &&
        /wyp-selected/g.test(e) == /wyp-selected/g.test(t) &&
        /yp(-|_)onscreen/g.test(e) == /yp(-|_)onscreen/g.test(t) &&
        /yp(-|_)hover/g.test(e) == /yp(-|_)hover/g.test(t) &&
        /yp(-|_)focus/g.test(e) == /yp(-|_)focus/g.test(t) &&
        /yp(-|_)click/g.test(e) == /yp(-|_)click/g.test(t) &&
        /:active/g.test(e) == /:active/g.test(t) &&
        /:checked/g.test(e) == /:checked/g.test(t) &&
        /:disabled/g.test(e) == /:disabled/g.test(t) &&
        /:empty/g.test(e) == /:empty/g.test(t) &&
        /:enabled/g.test(e) == /:enabled/g.test(t) &&
        /:hover/g.test(e) == /:hover/g.test(t) &&
        /:focus/g.test(e) == /:focus/g.test(t) &&
        /:in-range/g.test(e) == /:in-range/g.test(t) &&
        /:invalid/g.test(e) == /:invalid/g.test(t) &&
        /:lang/g.test(e) == /:lang/g.test(t) &&
        /:link/g.test(e) == /:link/g.test(t) &&
        /:optional/g.test(e) == /:optional/g.test(t) &&
        /:out-of-range/g.test(e) == /:out-of-range/g.test(t) &&
        /:valid/g.test(e) == /:valid/g.test(t) &&
        /:visited/g.test(e) == /:visited/g.test(t) &&
        /body\.logged-in/g.test(e) == /body\.logged-in/g.test(t) &&
        /body\.non-logged-in/g.test(e) == /body\.non-logged-in/g.test(t)
    );
  }
  function Ke() {
    o(".type-has-change").removeClass("type-has-change");
  }
  function Je(e) {
    /^margin-(top|right|bottom|left)/gi.test(e)
      ? o("#spacing-type-margin").addClass("type-has-change")
      : /^padding-(top|right|bottom|left)/gi.test(e)
      ? o("#spacing-type-padding").addClass("type-has-change")
      : /^(animation-name|animation-duration|animation-delay|animation-timing-function|animation-fill-mode)/gi.test(
          e
        )
      ? o("#motion-type-animation").addClass("type-has-change")
      : /^(transition-property|transition-duration|transition-timing-function)/gi.test(
          e
        )
      ? o("#motion-type-transition").addClass("type-has-change")
      : /^border-top-(width|color|style)/gi.test(e)
      ? o("#border-type-top").addClass("type-has-change")
      : /^border-right-(width|color|style)/gi.test(e)
      ? o("#border-type-right").addClass("type-has-change")
      : /^border-bottom-(width|color|style)/gi.test(e)
      ? o("#border-type-bottom").addClass("type-has-change")
      : /^border-left-(width|color|style)/gi.test(e)
      ? o("#border-type-left").addClass("type-has-change")
      : /^border-(width|color|style)/gi.test(e)
      ? o("#border-type-all").addClass("type-has-change")
      : /^(translate-x-transform|translate-y-transform)$/gi.test(e)
      ? o("#transform-type-move").addClass("type-has-change")
      : /^(rotatex-transform|rotatey-transform|rotatez-transform)$/gi.test(e)
      ? o("#transform-type-rotate").addClass("type-has-change")
      : /^(skew-x-transform|skew-y-transform)$/gi.test(e)
      ? o("#transform-type-skew").addClass("type-has-change")
      : /^(scale-transform|perspective)$/gi.test(e)
      ? o("#transform-type-extra").addClass("type-has-change")
      : /^(blur-filter|grayscale-filter|invert-filter|sepia-filter)$/gi.test(e)
      ? o("#filter-type-color-effects").addClass("type-has-change")
      : /^(brightness-filter|contrast-filter|hue-rotate-filter|saturate-filter)$/gi.test(
          e
        )
      ? o("#filter-type-color-adjustment").addClass("type-has-change")
      : /^(background-color|background-image|background-size|background-blend-mode|background-attachment|background-position-x|background-position-y|background-repeat|background-clip)$/gi.test(
          e
        )
      ? o("#background-type-background").addClass("type-has-change")
      : /^(blur-backdrop-filter|grayscale-backdrop-filter|invert-backdrop-filter|sepia-backdrop-filter|brightness-backdrop-filter|contrast-backdrop-filter|hue-rotate-backdrop-filter|saturate-backdrop-filter)$/gi.test(
          e
        ) && o("#background-type-filter").addClass("type-has-change");
  }
  function Qe(e) {
    var t = o("#wyp-customizing-type-frame"),
      a = E(),
      i = t.attr("data-page-id"),
      n = t.attr("data-page-type"),
      s = t.attr("data-page-href"),
      r = t.attr("data-page-visitor");
    r = "true" == r || !0 == r ? "&wyp_out=true" : "";
    var l =
      t.attr("data-src") +
      "&wyp_page_href=" +
      s +
      "&wyp_page_id=" +
      i +
      "&wyp_page_type=" +
      n +
      "&wyp_mode=" +
      a +
      r;
    if (!1 == e && l == t.attr("src")) return !1;
    var d = o("<div />")
      .append(o("#wyp-customizing-type-frame").clone().attr("src", l))
      .html();
    t.remove(), o("#iframe").after(d);
  }
  function et(e) {
    var t = e.toString().match(/(\(|\)|\"|\')/gi);
    return null === t || 1 != Math.abs(t.length % 2);
  }
  function tt(s, l, d, f, y, w, v) {
    if (window.bMode && !1 === e()?.is_subscription_active) {
      if (
        150 <
        (parseInt(e()?.initial_style_counts) || 0) +
          (parseInt(e()?.local_counts) || 0)
      )
        return (
          o(".wyp-info-modal .wyp-info-modal-top-inner h2").text(
            "Consider Upgrading to the Professional Plan"
          ),
          o(".wyp-info-modal .wyp-info-modal-top-inner p").text(
            "A pro plan required for editing over 150 styles per month. Save time with a professional plan."
          ),
          o(".wyp-info-modal .wyp-buy-link").attr(
            "href",
            "https://visualcsseditor.com/?utm_source=chrome-editor&utm_medium=wordpress-based-upgrade&utm_campaign=chrome-upgrade"
          ),
          o(".wyp-info-modal .wyp-buy-link").text("See Pricing"),
          o(".wyp-info-modal .wyp-info-modal-close").text("Maybe Later"),
          o(".wyp-info-modal .wyp-info-unlock-p").attr(
            "style",
            "visibility:hidden;"
          ),
          o(".wyp-info-modal .wyp-info-last-note").text(
            "Get unlimited usage and premium customer support today."
          ),
          o(".wyp-info-modal .activate-pro").attr(
            "href",
            "https://visualcsseditor.com/sign-in"
          ),
          o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"),
          !1
        );
      t("local_counts", (parseInt(e()?.local_counts) || 0) + 1);
    }
    "justify-content1" == l && (l = "justify-content"),
      null == w && (w = E()),
      null === s && (s = _a());
    var b = _();
    (y = je(y, l, d)),
      (f = ca(l, f)),
      ".s" == f && (f = "s"),
      -1 != f.indexOf("px") && (f = "px");
    var x = l;
    if ((_t(l, !1), Gi.find(".wyp-live-css").remove(), J(d) && 0 !== d))
      return !1;
    if (!et(d)) return !1;
    if (
      ("animation-name" == l && (d = d.replace(/,\s*$/, "")),
      (l = l.toString().toLowerCase()),
      (x = x.toString().toLowerCase()),
      (f = f.toString().toLowerCase()),
      0 < d.length)
    ) {
      /\.00$/.test(d) && (d = d.replace(/\.00$/g, "")),
        /\.0$/.test(d) && (d = d.replace(/\.0$/g, ""));
    }
    var k = g(l);
    if (
      ("font-family" != k &&
        "background-image" != k &&
        "list-style-image" != k &&
        "animation-name" != k &&
        "animation-play" != l &&
        "filter" != k &&
        "transform" != k &&
        "backdrop-filter" != k &&
        (d = d.toString().toLowerCase()),
      "nan" == d || "NaN" == d)
    )
      return !1;
    if (((s = at(s, l)), "height" == l || "width" == l)) {
      var z = mi(o("#min-" + l + "-value").val()),
        O = o("#min-" + l + "-after").val();
      parseFloat(d) < parseFloat(z) &&
        f == O &&
        (tt(s, "min-" + l, d, f, y, w, v),
        setTimeout(function () {
          var e = _a();
          o.each(["min-" + l], function (t, a) {
            pa(a, e);
          });
        }, 50));
    }
    if (!0 === S() && -1 != l.indexOf("animation")) return !1;
    if (
      ("disable" != d &&
        "a" != d &&
        !0 == window.ypOption.append_auto_comments &&
        Ci(s, null),
      "font-family" == l &&
        "disable" == d &&
        tt(null, "--google-webfont", "disable"),
      C() &&
        ("background-clip" == l &&
          "text" == d &&
          ((window.lastTextColor = da("color", b)),
          tt(s, "color", "transparent", "", y, w, v)),
        "background-clip" == l && "text" != d && null != window.lastTextColor))
    ) {
      var D = da("color", b);
      ("transparent" == D || "rgba(0, 0, 0, 0)" == D || "rgba(0,0,0,0)" == D) &&
        tt(s, "color", window.lastTextColor, "", y, w, v);
    }
    if (
      ("background-clip" == l &&
        "text" != d &&
        null == window.lastTextColor &&
        tt(s, "color", "disable", "", y, w, v),
      "display" == l &&
        (tn.removeClass("wyp-flex-container wyp-grid-element"),
        ("flex" == d || "inline-flex" == d) &&
          tn.addClass("wyp-flex-container"),
        ("grid" == d || "inline-grid" == d) && tn.addClass("wyp-grid-element"),
        setTimeout(function () {
          o.throttle(Be(), 32);
        }, window.YellowDelay)),
      "border-width" == l)
    ) {
      var L = _a();
      o.each(
        [
          "border-top-width",
          "border-left-width",
          "border-right-width",
          "border-bottom-width",
        ],
        function (e, t) {
          pa(t, L);
        }
      );
    }
    if ("border-color" == l) {
      var L = _a();
      o.each(
        [
          "border-top-color",
          "border-left-color",
          "border-right-color",
          "border-bottom-color",
        ],
        function (e, t) {
          pa(t, L);
        }
      );
    }
    if ("border-style" == l) {
      var L = _a();
      o.each(
        [
          "border-top-style",
          "border-left-style",
          "border-right-style",
          "border-bottom-style",
        ],
        function (e, t) {
          pa(t, L);
        }
      );
    }
    -1 != l.indexOf("border-") &&
      -1 != l.indexOf("-style") &&
      "border-style" != l &&
      pa("border-style"),
      -1 != l.indexOf("border-") &&
        -1 != l.indexOf("-color") &&
        "border-color" != l &&
        pa("border-color"),
      -1 != l.indexOf("border-") &&
        -1 != l.indexOf("-width") &&
        "border-width" != l &&
        pa("border-width");
    var B, M, Z;
    if ("animation-name" == l && !1 === T()) {
      var P = 1;
      if (
        (("none" == d || "disable" == d) && (P = 0),
        -1 != d.indexOf(",") && (P = d.split(",").length),
        ("disable" == d || "none" == d) &&
          o(".anim-player-icon")
            .removeClass("icon-controls-pause")
            .addClass("icon-controls-play"),
        "none" != d &&
          "disable" != d &&
          o(".anim-player-icon")
            .removeClass("icon-controls-play")
            .addClass("icon-controls-pause"),
        C())
      ) {
        var R = b.css("animation-duration"),
          I = R.split(","),
          Y = 1;
        if ((-1 != R.indexOf(",") && (Y = I.length), Y != P)) {
          for (R = [], Z = 0; Z < P; Z++)
            I[Z] && "0s" !== I[Z] ? R.push(I[Z]) : R.push("1s");
          (R = R.toString().replace(/\s+/g, "")),
            1 >= P &&
              o("#animation-duration-group").removeClass("hidden-option"),
            tt(null, "animation-duration", R, "", y, w, v);
        }
      }
      if (C()) {
        var N = b.css("animation-delay"),
          H = N.split(","),
          W = 1;
        if ((-1 != N.indexOf(",") && (W = H.length), W != P)) {
          for (N = [], Z = 0; Z < P; Z++) N[Z] ? N.push(H[Z]) : N.push(Z + "s");
          (N = N.toString().replace(/\s+/g, "")),
            1 >= P && o("#animation-delay-group").removeClass("hidden-option"),
            tt(null, "animation-delay", N, "", y, w, v);
        }
      }
    }
    if (
      ("animation-name" == l ||
        "animation-play" == l ||
        "animation-duration" == l) &&
      !1 === T() &&
      "none" != d &&
      "disable" != d &&
      C()
    ) {
      (B = b.css("animation-duration")), (M = b.css("animation-delay"));
      var F = ft(B, M);
      (M = !1 === F ? (J(M) ? 0 : parseFloat(Wt(M))) : parseFloat(F)),
        (B = J(B) ? 1e3 : parseFloat(Wt(B)));
      var j = M + B;
      0 === j && (j = 1e3),
        (j += 100),
        (window.ypData["wyp-force-hide-select-ui"] = !0),
        Ji.addClass("wyp-hid-bor-n"),
        Yi(),
        (window.animationTimer1 = setTimeout(function () {
          (window.ypData["wyp-force-hide-select-ui"] = void 0),
            Ji.removeClass("wyp-hid-bor-n"),
            Ni(),
            Ze(),
            !1 == window.ypData["wyp-if-movleav"] &&
              setTimeout(function () {
                We(200);
              }, 300),
            o(".anim-player-icon")
              .removeClass("icon-controls-pause")
              .addClass("icon-controls-play");
        }, j));
    }
    if (
      (("list-style-image" == l || "background-image" == l) &&
        "disable" != d &&
        "none" != d &&
        (-1 == d.indexOf("gradient(") &&
          "inherit" != d &&
          "initial" != d &&
          (d = d.replace(/(\"|\'|url\(|\))/gi, "")),
        "" == d
          ? (d = "disable")
          : -1 == d.indexOf("gradient(") &&
            "inherit" != d &&
            "initial" != d &&
            (d = 'url("' + d + '")')),
      ("top" == l || "bottom" == l || "left" == l || "right" == l) &&
        "disable" != d &&
        C())
    ) {
      var X = da("position", b);
      "static" == X &&
        (tt(s, "position", "relative", "", y, w, v), pa("position"));
    }
    var V = Pe(y),
      U = Re(y),
      q = null,
      $ = qt(l)[1],
      G,
      K;
    if (null == $ || "backdrop" == $) {
      G = a(w, !1);
      var Q;
      if (
        (null == v &&
          (v = c(
            G,
            "[selector=" + gi(s) + "][rule=" + l + "][msize=" + y + "]"
          )),
        "a" != l &&
          ((Q = p(G, "[selector=YPtoAddBreakpoint][msize=" + y + "]")),
          0 < Q.length &&
            r(u(G, "[selector=YPtoAddBreakpoint][msize=" + y + "]"), w, x)),
        (Q = p(G, "[selector=" + gi(s) + "][rule=" + l + "][msize=" + y + "]")),
        0 < Q.length)
      ) {
        if (Vt(Q[0]) == d || Vt(Q[0]) == d + f) return !1;
        r(
          u(G, "[selector=" + gi(s) + "][rule=" + l + "][msize=" + y + "]"),
          w,
          x
        );
      }
      if (
        ((q = c(
          G,
          "[selector=" + gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"
        )),
        null != q && (v = q + 1),
        (Q = p(
          G,
          "[selector=" + gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"
        )),
        0 < Q.length)
      ) {
        if (Vt(Q[0]) == d || Vt(Q[0]) == d + f) return !1;
        r(
          u(G, "[selector=" + gi(s) + "][rule=" + h(l) + "][msize=" + y + "]"),
          w
        );
      }
      G = a(w, !1);
      var ee = p(G, "[rule=" + l + "][msize=" + y + "]"),
        te,
        ae;
      for (Z = 0; Z < ee.length; Z++)
        if (((te = ee[Z]), (ae = Ut(te)), Ge(s, ae))) {
          r(
            u(G, "[selector=" + gi(ae) + "][rule=" + l + "][msize=" + y + "]"),
            w,
            x
          );
          break;
        }
      for (
        ee = p(G, "[rule=" + h(l) + "][msize=" + y + "]"), Z = 0;
        Z < ee.length;
        Z++
      )
        if (((te = ee[Z]), (ae = Ut(te)), Ge(s, ae))) {
          r(
            u(
              G,
              "[selector=" + gi(ae) + "][rule=" + h(l) + "][msize=" + y + "]"
            ),
            w
          );
          break;
        }
      if (
        S() &&
        ((Q = Gi.find(
          "#wyp-anim-scenes #" +
            tn.attr("data-anim-scene") +
            " .scenes-" +
            gi(l) +
            "-style"
        )),
        0 < Q.length)
      ) {
        if (Vt(Q.text()) == d || Vt(Q.text()) == d + f) return !1;
        var ie =
          parseInt(tn.attr("data-anim-scene").replace(/scene-/g, "")) + 1;
        for (Q.remove(), K = ie; 7 > K; K++)
          (0 == o(".anim-bar .scenes .scene-" + K).length ||
            !0 ==
              o(".anim-bar .scenes .scene-" + K).hasClass(
                "scene-no-click-yet"
              )) &&
            Gi.find(
              "#wyp-anim-scenes #scene-" + K + " .scenes-" + gi(l) + "-style"
            ).remove();
      }
    }
    if ("--google-webfont" == l && "no-include" != d) return !1;
    if (
      ("disable" != d &&
        "" != d &&
        "undefined" != d &&
        null !== d &&
        -1 != window.webkitArray.indexOf(l) &&
        tt(s, "-webkit-" + l, d, f, y, w, q),
      ("flex-grow" == k ||
        "flex-shrink" == k ||
        "opacity" == k ||
        "blur-filter" == k ||
        "grayscale-filter" == k ||
        "invert-filter" == k ||
        "brightness-filter" == k ||
        "z-index" == k ||
        "column-count" == k ||
        "contrast-filter" == k ||
        "hue-rotate-filter" == k ||
        "saturate-filter" == k ||
        "sepia-filter" == k ||
        -1 != k.indexOf("-transform") ||
        "blur-backdrop-filter" == k ||
        "grayscale-backdrop-filter" == k ||
        "invert-backdrop-filter" == k ||
        "sepia-backdrop-filter" == k ||
        "brightness-backdrop-filter" == k ||
        "contrast-backdrop-filter" == k ||
        "hue-rotate-backdrop-filter" == k ||
        "saturate-backdrop-filter" == k) &&
        "text-transform" != k &&
        ("disable" != d && (d = mi(d)), (f = "")),
      "blur-filter" == l ||
        "grayscale-filter" == l ||
        "invert-filter" == l ||
        "brightness-filter" == l ||
        "contrast-filter" == l ||
        "hue-rotate-filter" == l ||
        "saturate-filter" == l ||
        "sepia-filter" == l)
    ) {
      var ne = vt(l, d);
      return tt(s, "filter", ne, "", y, w, v), !1;
    }
    if (
      "blur-backdrop-filter" == l ||
      "grayscale-backdrop-filter" == l ||
      "invert-backdrop-filter" == l ||
      "sepia-backdrop-filter" == l ||
      "brightness-backdrop-filter" == l ||
      "contrast-backdrop-filter" == l ||
      "hue-rotate-backdrop-filter" == l ||
      "saturate-backdrop-filter" == l
    ) {
      var se = bt(l, d);
      return tt(s, "backdrop-filter", se, "", y, w, v), !1;
    }
    if (-1 != k.indexOf("-transform") && "text-transform" != k) {
      var oe = wt(l, d);
      return tt(s, "transform", oe, "", y, w, v), !1;
    }
    if (
      "border-type" == l ||
      "background-type" == l ||
      "spacing-type" == l ||
      "transform-type" == l ||
      "filter-type" == l ||
      "motion-type" == l
    )
      return !1;
    if (
      "box-shadow-inset" == l ||
      "box-shadow-color" == l ||
      "box-shadow-vertical" == l ||
      "box-shadow-blur-radius" == l ||
      "box-shadow-spread" == l ||
      "box-shadow-horizontal" == l
    ) {
      var re = xt(s, l, d);
      return tt(s, "box-shadow", re, "", y, w, v), !1;
    }
    if ("animation-play" == l) {
      "yp_onscreen" == d || "yp-onscreen" == d
        ? o("#--animation-trigger-repeat-group").addClass("hidden-option")
        : o("#--animation-trigger-repeat-group").removeClass("hidden-option"),
        (G = a(w, !1));
      var le = p(G, "[msize=" + y + "]"),
        de = s.replace(
          /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g,
          ""
        ),
        pe,
        ce;
      for (Z = 0; Z < le.length; Z++)
        (pe = /\[selector\=(.*?)\]/g.exec(le[Z])[1]),
          (ce = Ut(le[Z])),
          pe == gi(de + ".yp_onscreen") &&
            (G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]")),
          pe == gi(de + ".yp_hover") &&
            (G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]")),
          pe == gi(de + ".yp_click") &&
            (G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]")),
          pe == gi(de + ".yp_focus") &&
            (G = u(G, "[selector=" + gi(ce) + "][msize=" + y + "]"));
      return (
        r(G, w),
        "none" != o("#wyp-animation-name").val() &&
          tt(s, "animation-name", o("#wyp-animation-name").val(), f, y, w, v),
        !1
      );
    }
    if (
      ("animation-name" == l && $e(s, l, d, f, y, w),
      "disable" == d || "" == d || "undefined" == d || null === d)
    )
      return !1;
    var ue = d + f;
    if (
      ((ue = ue.replace(/\s+?!important/g, "").replace(/\;$/g, "")),
      "" != gi(s))
    ) {
      if (!0 === S() && "position" != l) {
        Gi.find(
          "#wyp-anim-scenes #" + gi(Qi.attr("data-anim-scene") + x)
        ).remove(),
          Gi.find(
            "#wyp-anim-scenes #" + Qi.attr("data-anim-scene") + ""
          ).append(
            '<style data-rule="' +
              x +
              '" class="style-' +
              Qi.attr("data-anim-scene") +
              " scenes-" +
              gi(x) +
              '-style">' +
              s +
              "{" +
              x +
              ":" +
              ue +
              "}</style>"
          );
        var me = 0,
          fe,
          ge;
        for (
          K = parseInt(Qi.attr("data-anim-scene").replace("scene-", "")) + 1;
          6 >= K;
          K++
        )
          (me = "scene-" + K),
            (fe = Gi.find(
              "#wyp-anim-scenes #" + me + " .scenes-" + gi(x) + "-style"
            )),
            (0 == fe.length || fe.hasClass("dynamic-generated-scene")) &&
              ((ge = s.replace(
                /body\.wyp-scene-[0-9]/g,
                "body.wyp-scene-" + K
              )),
              Gi.find(
                "#wyp-anim-scenes #" + me + " style[data-rule='" + x + "']"
              ).remove(),
              Gi.find("#wyp-anim-scenes #" + me + "").append(
                '<style data-rule="' +
                  x +
                  '" class="dynamic-generated-scene style-' +
                  me +
                  " scenes-" +
                  gi(x) +
                  '-style">' +
                  ge +
                  "{" +
                  x +
                  ":" +
                  ue +
                  "}</style>"
              ));
      } else r(m(a(w, !1), V + s + "{" + x + ":" + ue + "}" + U, v), w, x);
      Ze();
    }
    if (
      (null != window.lastEditID &&
        (A() &&
          "desktop" != y &&
          (o("#" + window.lastEditID + "-group").addClass("reset-enable"),
          Je(window.lastEditID)),
        !1 == A() &&
          "desktop" == y &&
          (o("#" + window.lastEditID + "-group").addClass("reset-enable"),
          Je(window.lastEditID)),
        -1 == window.lastEditID.indexOf("box-shadow") &&
          o("#" + window.lastEditID + "-group")
            .parents("li")
            .find("h3")
            .addClass("wyp-group-edited"),
        (window.lastEditID = null)),
      S())
    )
      return !1;
    if (window.ypData["wyp-animate-manager-mode"]) return !1;
    if ("a" == l) return !1;
    if ("--google-webfont" == l || "--animation-trigger-repeat" == l) return !1;
    if (
      (Ji.hasClass("wyp-wf-on") &&
        C() &&
        (($ = qt(x)[0]),
        ("color" == x ||
          "background-color" == x ||
          "background-image" == x ||
          "box-shadow" == $ ||
          "border-color" == x ||
          "text-shadow" == x ||
          -1 != $.indexOf("-radius") ||
          "filter" == $ ||
          "backdrop-filter" == $) &&
          b.addClass("wyp-no-wf")),
      window.editedByReview)
    )
      return !1;
    if (
      -1 == l.indexOf("-webkit-") &&
      -1 == l.indexOf("-moz-") &&
      -1 == l.indexOf("-o-")
    ) {
      var he = nt(null, x, ue);
      he.always(function (e) {
        !1 == e && Ie(s, l, d, f, y, w, v);
      });
    }
  }
  function at(e, t) {
    if (
      (!0 === S() && "position" != t
        ? ((e = o.trim(e.replace(/(body)?\.wyp-scene-[0-9]/g, ""))),
          (e = Hi(e, "wyp-" + Qi.attr("data-anim-scene"))))
        : (e = o.trim(e.replace(/(body)?\.wyp-scene-[0-9]/g, ""))),
      !1 === tn.hasClass("process-by-code-editor") &&
        !1 === T() &&
        ("animation-name" == t ||
          "animation-duration" == t ||
          "animation-delay" == t))
    ) {
      var a = e;
      e = e.replace(
        /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g,
        ""
      );
      var i = "";
      0 < o("#wyp-animation-play").length &&
      0 < o("#wyp-animation-play").val().length
        ? (i = "." + o("#wyp-animation-play").val())
        : !0 ==
          /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g.test(
            a
          )
        ? /(\.|\:)yp(-|_)onscreen/g.test(a)
          ? (i = ".yp_onscreen")
          : /(\.|\:)yp(-|_)hover/g.test(a)
          ? (i = ".yp_hover")
          : /(\.|\:)yp(-|_)focus/g.test(a)
          ? (i = ".yp_focus")
          : /(\.|\:)yp(-|_)click/g.test(a) && (i = ".yp_click")
        : (i = ".yp_onscreen");
      var n = e.split(":");
      if (0 < n.length) {
        for (var s = "", r = 0; r < n.length - 1; r++) s += n[r];
        "hover" == n[n.length - 1] || "focus" == n[n.length - 1]
          ? (e = s + i + ":" + n[n.length - 1])
          : (e += i);
      } else e += i;
    }
    var l = tn.attr("data-wyp-selector");
    if (
      !1 == J(l) &&
      !1 ==
        /(yp(-|_)onscreen|yp(-|_)click|yp(-|_)focus|yp(-|_)hover)/g.test(e) &&
      "animation-play" != t &&
      "animation-fill-mode" != t
    ) {
      e = e.replace(/(body)?\.yp-selector-(.*?)\s+?/g, "");
      var d = l.replace(":", "");
      e = Hi(e, "yp-selector-" + d);
    }
    return e;
  }
  function it(e) {
    var t = "",
      a,
      i,
      n,
      s;
    if (((a = e.get(0)), (i = window.getComputedStyle(a, null)), 0 < i.length))
      for (s in i)
        i.hasOwnProperty(s) &&
          ((n = i.getPropertyValue(s)), n && (t += s + ":" + n + ";"));
    return t.replace(/\"/g, "");
  }
  function nt(e, t, a) {
    !1 === /(^)transition(\-|$)/gi.test(t) && Ji.addClass("wyp-imp-chk"),
      "border-width" == t
        ? (t = "border-top-width")
        : "border-style" == t
        ? (t = "border-top-style")
        : "border-color" == t && (t = "border-top-color");
    var i = _(),
      n;
    null == e ? ((e = ".wyp-selected-others"), (n = i)) : (n = Gi.find(e));
    var s = i.attr("style"),
      r = o(
        "<div id='wyp-fake-test-dom' style='" +
          it(n) +
          "" +
          t +
          ":" +
          a.replace(/\"/g, "") +
          " !important;visibility:hidden !important;position:absolute !important;'></div>"
      );
    n.after(r);
    var l = jQuery.Deferred();
    return (
      setTimeout(function () {
        !1 === CSS.supports(t, a) &&
          !1 === CSS.supports("-webkit-" + t, a) &&
          ((p = !0),
          Gi.find("#wyp-fake-test-dom").remove(),
          Ji.removeClass("wyp-imp-chk"),
          n.removeClass("wyp-no-wf"),
          !1 != s && null != s ? n.attr("style", s) : n.removeAttr("style"),
          l.resolve(p),
          Li(
            "Something Went Wrong",
            "The style is applied, but your browser doesn't support it or the style is not valid.",
            "browserSupport"
          ));
        var i = n.css(t),
          d = r.css(t),
          p = !1;
        if (
          (J(i) &&
            ((p = !1),
            Gi.find("#wyp-fake-test-dom").remove(),
            Ji.removeClass("wyp-imp-chk"),
            n.removeClass("wyp-no-wf"),
            !1 != s && null != s ? n.attr("style", s) : n.removeAttr("style"),
            l.resolve(p)),
          i == d && (p = !0),
          !1 === p &&
            o.trim(a).toLowerCase() == o.trim(i).toLowerCase() &&
            (p = !0),
          !p)
        ) {
          var c = a.replace(/(\'|\")/g, ""),
            u = i.replace(/(\'|\")/g, "");
          (c = c.replace(/\,\s+/g, ",")),
            (u = u.replace(/\,\s+/g, ",")),
            (c = c.replace(/(\d+)(\.\d+)/g, function (e) {
              return parseFloat(e).toFixed(2);
            })),
            (u = u.replace(/(\d+)(\.\d+)/g, function (e) {
              return parseFloat(e).toFixed(2);
            })),
            u == c && (p = !0);
        }
        /\d\%/g.test(a) &&
          /(background-image|background-position-(x|y))/g.test(t) &&
          (p = !0),
          p &&
            Gi.find(e).each(function (e) {
              var a = o(this);
              /animation-/g.test(t) &&
                a.addClass("yp_onscreen yp_hover yp_click yp_focus");
              var n = a.css(t);
              return J(n) || 20 < e
                ? (/animation-/g.test(t) &&
                    a.removeClass("yp_onscreen yp_hover yp_click yp_focus"),
                  !0)
                : i == n
                ? void 0
                : ((p = !1), !1);
            }),
          Gi.find("#wyp-fake-test-dom").remove(),
          Ji.removeClass("wyp-imp-chk"),
          n.removeClass("wyp-no-wf"),
          !1 != s && null != s ? n.attr("style", s) : n.removeAttr("style"),
          l.resolve(p);
      }, window.YellowDelay),
      l.promise()
    );
  }
  function st(e) {
    clearTimeout(window.relaxView),
      sn.extra.find(".wyp-el-viewer-relax-opacity").remove(),
      e.each(function (e) {
        var a = o(this),
          i = a.get(0);
        if (!J(i)) {
          0 === sn.extra.find(".wyp-el-viewer-" + e).length &&
            sn.extra.append(
              "<div class='wyp-el-viewer wyp-el-viewer-" + e + "'></div>"
            );
          var n = Ra(i),
            s = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
            r = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
            d = a.css([
              "margin-top",
              "margin-right",
              "margin-bottom",
              "margin-left",
            ]),
            p = parseFloat(d["margin-top"]),
            c = parseFloat(d["margin-right"]),
            u = parseFloat(d["margin-bottom"]),
            m = parseFloat(d["margin-left"]),
            f = n.top + r,
            t = n.left + s,
            l = Gi.find(".wyp-el-viewer-" + e);
          l.css({
            width: n.width,
            height: n.height,
            "border-left-width": m,
            "border-right-width": c,
            "border-top-width": p,
            "border-bottom-width": u,
            transform: "translate3d(" + t + "px, " + f + "px, 0px)",
          }),
            setTimeout(function () {
              l && 0 < l.length && l.remove();
            }, 1e4);
        }
      });
  }
  function ot(e, t) {
    var a = t.data("px").split(",");
    return (
      ("%" == e || "vw" == e || "vh" == e) && (a = t.data("pc").split(",")),
      ("em" == e ||
        "rem" == e ||
        "ex" == e ||
        "cm" == e ||
        "in" == e ||
        "pc" == e) &&
        (a = t.data("em").split(",")),
      "s" == e && (a = t.data("em").split(",")),
      "ms" == e &&
        ((a = t.data("em").split(",")),
        (a[0] = parseInt(1e3 * a[0])),
        (a[1] = parseInt(1e3 * a[1]))),
      a
    );
  }
  function rt(e, t) {
    var a = o("#" + e + "-group"),
      n = o("#" + e + "-group .css-un").val(),
      s = ["px", "%", "em", "vw", "vh"];
    a.hasAttr("data-support-formats") &&
      (s = a.attr("data-support-formats").split(","));
    var r = be(a);
    "" != r && "no-defined" != r && s.push(r);
    for (var l = [], d = 0, p; d < s.length; d++)
      (p = {}), (p.value = s[d]), (p.label = s[d]), l.push(p);
    o("#" + e + "-group .css-un")
      .autocomplete({
        source: function (e, t) {
          t(o.ui.autocomplete.filter(l, ""));
        },
        open: function () {
          var t = o(this);
          null == window.openValS && (window.openValS = t.val());
          var i =
            o(".ed-pnl-list").height() -
            (t.offset().top - o(".ed-pnl-list").offset().top);
          o("#autocomplete-custom-style-prefix-" + e).remove(),
            o(".up-style-autocomplete-prefix").removeClass(
              "up-style-autocomplete-prefix"
            ),
            o(".up-style-autocomplete-input-prefix").removeClass(
              "up-style-autocomplete-input-prefix"
            );
          var n = t.outerHeight(),
            s = parseFloat(
              a.find(".ui-autocomplete.ui-menu").outerHeight() + n + 2
            );
          (i -= s),
            20 > i &&
              (tn.append(
                '<style id="autocomplete-custom-style-prefix-' +
                  e +
                  '">#' +
                  e +
                  "-group .ui-autocomplete.ui-menu{top:-" +
                  s +
                  "px;}</style>"
              ),
              a
                .find(".ui-autocomplete.ui-menu")
                .addClass("up-style-autocomplete-prefix"),
              t.addClass("up-style-autocomplete-input-prefix"));
        },
        close: function () {
          var t = o("#" + e + "-group .css-va");
          if (r == o(this).val()) {
            o(this).val("-");
            var a = t.val();
            t.val(r).attr("data-last-val", a);
          } else
            t.val() == r && window.openValS != o(this).val()
              ? t.hasAttr("data-last-val")
                ? t.val(t.attr("data-last-val"))
                : t.val(0)
              : t.removeAttr("data-last-val");
          window.openValS != o(this).val() &&
            ((window.allow_input_CSS_process = !0),
            o("#" + e + "-group .css-un").trigger("keyup"),
            (window.allow_input_CSS_process = !1)),
            o(this).trigger("autogrow"),
            o(this).blur(),
            (window.openValS = void 0);
        },
        delay: 0,
        minLength: 0,
        autoFocus: !0,
        appendTo: o("#" + e + "-group .un-s"),
      })
      .focus(function () {
        o(this).autocomplete("search", "");
      });
    var c = ot(n, a);
    o("#wyp-" + e).slider({
      min: parseInt(c[0]),
      max: parseInt(c[1]),
      step: t,
      start: function () {
        tn.css("cursor", "pointer");
      },
      stop: function () {
        tn.css("cursor", "");
      },
      change: function (t, i) {
        return (
          a.find(".sl-cu").attr(
            "style",
            o(i.handle)
              .attr("style")
              .replace(/left(\s?):/g, "width:")
          ),
          o(".fake-layer").remove(),
          !!t.originalEvent &&
            void ("-" == o("#" + e + "-after").val() &&
              (o("#" + e + "-after").val("px"),
              o("#" + e + "-after").trigger("autogrow")),
            lt(o(this), e, !0, !0))
        );
      },
      slide: function (t, i) {
        "-" == o("#" + e + "-after").val() &&
          (o("#" + e + "-after").val("px"),
          o("#" + e + "-after").trigger("autogrow"));
        var n = i.value,
          s = o("#" + e + "-after").val();
        (n = +parseFloat(n).toFixed(2)),
          o("#" + e + "-value").val(n),
          (s = o("#" + e + "-after").val()),
          _t(e, !1),
          ht(e, n + s, !1),
          0 === o(".fake-layer").length &&
            tn.append("<div class='fake-layer'></div>"),
          a.find(".sl-cu").attr(
            "style",
            o(i.handle)
              .attr("style")
              .replace(/left(\s?):/g, "width:")
          );
      },
    });
  }
  function lt(e, t, a, i) {
    var n = e.parent().parent(),
      s = n.attr("data-css"),
      l = be(n),
      d;
    !0 === a && (d = e.slider("value")),
      o("#" + s + "-value").is(":focus") && (d = o("#" + s + "-value").val());
    var p = o("#" + s + "-after").val();
    if ("-" != p) d = parseFloat(d);
    else if (/(\d+)([a-z%]{1,3})$/i.test(d)) {
      var c = d.match(/(\d+)([a-z%]{1,3})$/i);
      /^(em|rem|vh|vw|%|px|ms|s|pt|pc|in|mm|cm|ex|ch|vmin|vmax)$/.test(c[2]) &&
        ((d = parseFloat(c[1])), (p = c[2]));
    } else (p = ""), (d = l), (d = parseFloat(d));
    var r = o("#" + s + "-value").val();
    if (r == l) (d = l), (p = "");
    else if (isNaN(d))
      if (
        "inherit" == r ||
        "initial" == r ||
        "auto" == r ||
        "none" == r ||
        "normal" == r
      )
        (d = r), (p = "");
      else return !1;
    (window.lastEditID = s), tt(null, t, d, p), i && Mi();
  }
  function dt(e) {
    return ("" + e)
      .replace(/\\/g, "\\\\")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\u00A0/g, "\\u00A0")
      .replace(/&/g, "\\x26")
      .replace(/'/g, "\\x27")
      .replace(/"/g, "\\x22")
      .replace(/</g, "\\x3C")
      .replace(/>/g, "\\x3E");
  }
  function pt(e, t, a) {
    if (
      ("auto auto" == a && (a = "auto"), "" != a && "undefined" != typeof a)
    ) {
      var i, n;
      try {
        (i = o("input[name=" + t + "][value='" + dt(a) + "']")),
          (n = i.parent()),
          i.length;
      } catch (t) {
        return !1;
      }
      a.match(/\bauto\b/g) && (a = "auto"),
        a.match(/\bnone\b/g) && (a = "none"),
        "background-size" == t &&
          ("cover" != dt(a) && "contain" != dt(a)
            ? ut()
            : o(".background-size-custom-group").hide()),
        0 < i.length
          ? (e.find(".active").removeClass("active"),
            i.prop("checked", !0),
            n.addClass("active"))
          : (e.find(".active").removeClass("active"),
            o("input[name=" + t + "]").each(function () {
              o(this).prop("checked", !1);
            }));
    }
  }
  function ct(e) {
    e.find(".background-size-x-group,.background-size-y-group").each(
      function () {
        var e = o(this);
        e.find(".wyp-bgs-prefix")
          .autocomplete({
            source: function (e, t) {
              t(
                o.ui.autocomplete.filter(
                  ["%", "px", "em", "vh", "vw", "auto"],
                  ""
                )
              );
            },
            open: function () {
              null == window.openValK && (window.openValK = o(this).val());
            },
            close: function () {
              var t = e.find(".wyp-bgs-css-val"),
                a = "auto";
              if (a == o(this).val()) {
                o(this).val("-");
                var i = t.val();
                t.val(a).attr("data-last-val", i);
              } else
                t.val() == a && window.openValK != o(this).val()
                  ? t.hasAttr("data-last-val")
                    ? t.val(t.attr("data-last-val"))
                    : t.val(0)
                  : t.removeAttr("data-last-val");
              window.openValK != o(this).val() &&
                ((window.allow_input_CSS_process = !0),
                e.find(".wyp-bgs-prefix").trigger("keyup"),
                (window.allow_input_CSS_process = !1)),
                o(this).trigger("autogrow"),
                o(this).blur(),
                (window.openValK = void 0);
            },
            delay: 0,
            minLength: 0,
            autoFocus: !0,
            appendTo: e.find(".un-s"),
          })
          .focus(function () {
            e.find(".wyp-bgs-prefix").autocomplete("search", "");
          });
      }
    );
  }
  function ut() {
    o(".background-size-custom-group").hide(),
      setTimeout(function () {
        var e = _(),
          t = e.css("background-size"),
          a = e.css("background-image");
        if (
          "none" != a &&
          "" != a &&
          0 < o(".ra.active #background-size-auto").length
        ) {
          if ((o(".background-size-custom-group").css("display", "flex"), J(t)))
            return;
          var i = t.split(" ");
          if (1 < i.length) {
            var n = i[0].replace(/[^0-9]/g, ""),
              s = i[1].replace(/[^0-9]/g, ""),
              r = i[0].replace(/[0-9]/g, ""),
              l = i[1].replace(/[0-9]/g, "");
            "auto" == r && ((r = "-"), (n = "auto")),
              "auto" == l && ((l = "-"), (s = "auto")),
              o("#background-size-x-value").val(n),
              o("#background-size-y-value").val(s),
              o("#background-size-x-custom").val(r),
              o("#background-size-y-custom").val(l);
          } else
            "auto" == t || "cover" == t || "contain" == t
              ? (o("#background-size-x-value,#background-size-y-value").val(
                  "auto"
                ),
                o("#background-size-x-custom,#background-size-y-custom").val(
                  "-"
                ))
              : (o("#background-size-x-value,#background-size-y-value").val(
                  t.replace(/[^0-9]/g, "")
                ),
                o("#background-size-x-custom,#background-size-y-custom").val(
                  t.replace(/[0-9]/g, "")
                ));
        }
      }, 2 * window.Yellow2Delay);
  }
  function mt(e) {
    if (J(e)) return !1;
    var t = e.toLowerCase();
    return /\barial\b|\barial black\b|\barial narrow\b|\barial rounded mt bold\b|\bavant garde\b|\bcalibri\b|\bcandara\b|\bcentury gothic\b|\bfranklin gothic medium\b|\bgeneva\b|\bfutura\b|\bgill sans\b|\bhelvetica neue\b|\bimpact\b|\blucida grande\b|\boptima\b|\bsegoe ui\b|\btahoma\b|\btrebuchet ms\b|\bverdana\b|\bbig caslon\b|\bbodoni mt\b|\bbook antiqua\b|\bcalisto mt\b|\bcambria\b|\bdidot\b|\bgaramond\b|\bgeorgia\b|\bgoudy old style\b|\bhoefler text\b|\blucida bright\b|\bpalatino\b|\bperpetua\b|\brockwell\b|\brockwell extra bold\b|\bbaskerville\b|\btimes new roman\b|\bconsolas\b|\bcourier new\b|\blucida console\b|\bhelveticaneue\b/.test(
      t
    );
  }
  function ft(e, t) {
    if (J(e) || J(t)) return !1;
    var a = 0,
      n = e.toString().split(","),
      s = t.toString().split(",");
    if (n.length != s.length) return !1;
    if (1 >= n.length) return !1;
    for (var o = 0, r = 0; r < n.length; r++)
      K(s[r + 1]) &&
        ((o += parseFloat(Wt(n[r]))),
        (a = parseFloat(Wt(s[r + 1])) - o + a),
        (o += a));
    return a;
  }
  function gt() {
    var e = "",
      t,
      a,
      i,
      n;
    o(
      "#font-family-group .ui-autocomplete.ui-menu li:not(.ui-autocomplete-category):in-viewport"
    ).each(function () {
      if (
        ((t = o(this)),
        (i = t.text()),
        (n = t.attr("style")),
        null != n && null != n)
      )
        return !0;
      a = Wn(o.trim(i.replace(/ /g, "+")));
      var s = !1;
      mt(i) && (s = !0),
        !1 == s &&
          0 === o("#wyp-font-test-" + a).length &&
          (e +=
            "<link rel='stylesheet' id='wyp-font-test-" +
            a +
            "'  href='https://fonts.googleapis.com/css2?family=" +
            o.trim(i.replace(/ /g, "+")) +
            ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"),
        t.css("fontFamily", "'" + i + "'");
    }),
      "" != e && Qi.append(e);
  }
  function ht(e, t, a) {
    var i = _a();
    if (
      (-1 == i.indexOf(",") &&
        (window.cachedSelector != i &&
          ((window.cachedSelector = _a()),
          (window.minCrpdSlctr = 12),
          (window.cachedSelectorStrong = Ma(
            Gi.find(".wyp-con-slcd .wyp-selected"),
            window.lastParentQueryStatus
          )),
          (window.minCrpdSlctr = !1)),
        (i = window.cachedSelectorStrong)),
      "height" == e || "width" == e)
    ) {
      var n = mi(o("#min-" + e + "-value").val()),
        s = o("#" + e + "-after").val(),
        r = o("#min-" + e + "-after").val();
      parseFloat(t) < parseFloat(n) &&
        s == r &&
        (_t("min-" + e, !1), ht("min-" + e, t, !1));
    }
    var l = !1 !== a && void 0 !== a ? a : "#" + e + "-live-css";
    var d = Gi.find(l);
    if (0 === d.length) {
      var p = l.replace("#", "").replace(".", ""),
        c = g(e);
      ("flex-grow" == c ||
        "flex-shrink" == c ||
        "opacity" == c ||
        "blur-filter" == c ||
        "grayscale-filter" == c ||
        "invert-filter" == c ||
        "brightness-filter" == c ||
        "z-index" == c ||
        "column-count" == c ||
        "contrast-filter" == c ||
        "hue-rotate-filter" == c ||
        "saturate-filter" == c ||
        "sepia-filter" == c ||
        -1 != c.indexOf("-transform") ||
        "blur-backdrop-filter" == c ||
        "grayscale-backdrop-filter" == c ||
        "invert-backdrop-filter" == c ||
        "sepia-backdrop-filter" == c ||
        "brightness-backdrop-filter" == c ||
        "contrast-backdrop-filter" == c ||
        "hue-rotate-backdrop-filter" == c ||
        "saturate-backdrop-filter" == c) &&
        "text-transform" != c &&
        (t = mi(t)),
        ("blur-filter" == e ||
          "grayscale-filter" == e ||
          "invert-filter" == e ||
          "brightness-filter" == e ||
          "contrast-filter" == e ||
          "hue-rotate-filter" == e ||
          "saturate-filter" == e ||
          "sepia-filter" == e) &&
          ((e = "filter"), (p = "filter"), (t = vt(null, null))),
        ("blur-backdrop-filter" == e ||
          "grayscale-backdrop-filter" == e ||
          "invert-backdrop-filter" == e ||
          "sepia-backdrop-filter" == e ||
          "brightness-backdrop-filter" == e ||
          "contrast-backdrop-filter" == e ||
          "hue-rotate-backdrop-filter" == e ||
          "saturate-backdrop-filter" == e) &&
          ((e = "backdrop-filter"),
          (p = "backdrop-filter"),
          (t = bt(null, null))),
        -1 != c.indexOf("-transform") &&
          "text-transform" != c &&
          ((e = "transform"), (p = "transform"), (t = wt(null, null))),
        ("box-shadow-inset" == e ||
          "box-shadow-color" == e ||
          "box-shadow-vertical" == e ||
          "box-shadow-blur-radius" == e ||
          "box-shadow-spread" == e ||
          "box-shadow-horizontal" == e) &&
          ((e = "box-shadow"), (p = "box-shadow"), (t = xt(i, null, null)));
      var u = "",
        m = da("position");
      "static" == m &&
        ("top" == e || "left" == e || "right" == e || "bottom" == e) &&
        (u = "position:relative !important;"),
        "animation-name" == e &&
          ((u =
            "-webkit-animation-duration:1000ms !important;animation-duration:1000ms !important;-webkit-animation-delay:100ms !important;animation-delay:100ms !important;-webkit-animation-fill-mode:none !important;animation-fill-mode:none !important;"),
          "bounce" == t
            ? (u +=
                "-webkit-transform-origin:center bottom !important;transform-origin:center bottom !important;")
            : "swing" == t
            ? (u +=
                "-webkit-transform-origin:top center !important;transform-origin:top center !important;")
            : "jello" == t
            ? (u +=
                "-webkit-transform-origin:center !important;transform-origin:center !important;")
            : "lightSpeedIn" == t || "heartBeat" == t || "headShake" == t
            ? (u +=
                "-webkit-animation-timing-function: ease-out !important;animation-timing-function: ease-out !important;")
            : "lightSpeedOut" == t &&
              (u +=
                "-webkit-animation-timing-function: ease-in !important;animation-timing-function: ease-in !important;"),
          ("flip" == t ||
            "flipInX" == t ||
            "flipInY" == t ||
            "flipOutX" == t ||
            "flipOutY" == t) &&
            (u +=
              "-webkit-backface-visibility:visible !important;backface-visibility:visible !important;")),
        -1 == window.webkitArray.indexOf(e)
          ? Ji.append(
              "<style class='" +
                p +
                " wyp-live-css' id='" +
                p +
                "'>.wyp-selected,.wyp-selected-others," +
                i +
                "{" +
                e +
                ":" +
                t +
                " !important;" +
                u +
                "}</style>"
            )
          : Ji.append(
              "<style class='" +
                p +
                " wyp-live-css' id='" +
                p +
                "'>.wyp-selected,.wyp-selected-others," +
                i +
                "{" +
                e +
                ":" +
                t +
                " !important;-webkit-" +
                e +
                ":" +
                t +
                " !important;" +
                u +
                "}</style>"
            );
    }
    yt(e);
  }
  function yt(e) {
    "block" == o(".advanced-info-box").css("display") &&
      o(".element-btn").hasClass("active") &&
      "block" == o(".info-element-accessibility-section").css("display") &&
      (("color" == e || "background-color" == e || "all" == e) &&
        o(".contrast-accessibility").html(
          '<span class="typo-list-left">Text Contrast</span><span class="typo-list-right"><span>' +
            ia() +
            "</span></span>"
        ),
      ("line-height" == e || "font-size" == e || "all" == e) &&
        o(".line-spacing-accessibility").html(
          '<span class="typo-list-left">Line Spacing</span><span class="typo-list-right"><span>' +
            aa() +
            "</span></span>"
        ),
      ("font-size" == e || "all" == e) &&
        o(".font-size-accessibility").html(
          '<span class="typo-list-left">Legibility</span><span class="typo-list-right"><span>' +
            ea() +
            "</span></span>"
        ));
  }
  function wt(e, t) {
    var a = "scale(" + o.trim(o("#scale-transform-value").val()) + ")",
      i = "rotateX(" + o.trim(o("#rotatex-transform-value").val()) + "deg)",
      n = "rotateY(" + o.trim(o("#rotatey-transform-value").val()) + "deg)",
      s = "rotateZ(" + o.trim(o("#rotatez-transform-value").val()) + "deg)",
      r =
        "translatex(" + o.trim(o("#translate-x-transform-value").val()) + "px)",
      l =
        "translatey(" + o.trim(o("#translate-y-transform-value").val()) + "px)",
      d = "skewx(" + o.trim(o("#skew-x-transform-value").val()) + "deg)",
      p = "skewy(" + o.trim(o("#skew-y-transform-value").val()) + "deg)";
    "disable" == t &&
      ("scale-transform" == e && (a = ""),
      "rotatex-transform" == e && (i = ""),
      "rotatey-transform" == e && (n = ""),
      "rotatez-transform" == e && (s = ""),
      "translate-x-transform" == e && (r = ""),
      "translate-y-transform" == e && (l = ""),
      "skew-x-transform" == e && (d = ""),
      "skew-y-transform" == e && (p = ""));
    var c = o.trim(
      _i(
        a + " " + i + " " + n + " " + s + " " + r + " " + l + " " + d + " " + p
      )
    );
    return (
      !1 === S() &&
        (c = c.replace(
          /(scale\(1\)|rotate\(0deg\)|rotatex\(0deg\)|rotatey\(0deg\)|rotatez\(0deg\)|translatex\(0px\)|translatey\(0px\)|skewx\(0deg\)|skewy\(0deg\))/gi,
          ""
        )),
      (c = c.replace(/\s+/g, " ")),
      ("" === c || " " == c) && (c = "disable"),
      c
    );
  }
  function vt(e, t) {
    var a = "blur(" + o.trim(o("#blur-filter-value").val()) + "px)",
      i = "grayscale(" + o.trim(o("#grayscale-filter-value").val()) + ")",
      n = "invert(" + o.trim(o("#invert-filter-value").val()) + ")",
      s = "brightness(" + o.trim(o("#brightness-filter-value").val()) + ")",
      r = "contrast(" + o.trim(o("#contrast-filter-value").val()) + ")",
      l = "hue-rotate(" + o.trim(o("#hue-rotate-filter-value").val()) + "deg)",
      d = "saturate(" + o.trim(o("#saturate-filter-value").val()) + ")",
      p = "sepia(" + o.trim(o("#sepia-filter-value").val()) + ")";
    "disable" == t &&
      ("blur-filter" == e && (a = ""),
      "grayscale-filter" == e && (i = ""),
      "invert-filter" == e && (n = ""),
      "brightness-filter" == e && (s = ""),
      "contrast-filter" == e && (r = ""),
      "hue-rotate-filter" == e && (l = ""),
      "saturate-filter" == e && (d = ""),
      "sepia-filter" == e && (p = ""));
    var c = o.trim(
      _i(
        a + " " + s + " " + r + " " + i + "  " + n + " " + l + " " + d + " " + p
      )
    );
    return (
      !1 === S() &&
        (c = c.replace(
          /(blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
          ""
        )),
      (c = c.replace(/\s+/g, " ")),
      ("" === c || " " == c) && (c = "disable"),
      c
    );
  }
  function bt(e, t) {
    var a = "blur(" + o.trim(o("#blur-backdrop-filter-value").val()) + "px)",
      i =
        "grayscale(" +
        o.trim(o("#grayscale-backdrop-filter-value").val()) +
        ")",
      n = "invert(" + o.trim(o("#invert-backdrop-filter-value").val()) + ")",
      s =
        "brightness(" +
        o.trim(o("#brightness-backdrop-filter-value").val()) +
        ")",
      r =
        "contrast(" + o.trim(o("#contrast-backdrop-filter-value").val()) + ")",
      l =
        "hue-rotate(" +
        o.trim(o("#hue-rotate-backdrop-filter-value").val()) +
        "deg)",
      d =
        "saturate(" + o.trim(o("#saturate-backdrop-filter-value").val()) + ")",
      p = "sepia(" + o.trim(o("#sepia-backdrop-filter-value").val()) + ")";
    "disable" == t &&
      ("blur-backdrop-filter" == e && (a = ""),
      "grayscale-backdrop-filter" == e && (i = ""),
      "invert-backdrop-filter" == e && (n = ""),
      "brightness-backdrop-filter" == e && (s = ""),
      "contrast-backdrop-filter" == e && (r = ""),
      "hue-rotate-backdrop-filter" == e && (l = ""),
      "saturate-backdrop-filter" == e && (d = ""),
      "sepia-backdrop-filter" == e && (p = ""));
    var c = o.trim(
      _i(
        a + " " + s + " " + r + " " + i + "  " + n + " " + l + " " + d + " " + p
      )
    );
    return (
      !1 === S() &&
        (c = c.replace(
          /(blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
          ""
        )),
      (c = c.replace(/\s+/g, " ")),
      ("" === c || " " == c) && (c = "disable"),
      c
    );
  }
  function xt(e, t, a) {
    var i = "";
    o("#box-shadow-inset-inset").parent().hasClass("active") && (i = "inset");
    var n = o.trim(o("#wyp-box-shadow-color").val()),
      s = mi(o("#box-shadow-vertical-value").val()),
      r = mi(o("#box-shadow-blur-radius-value").val()),
      l = mi(o("#box-shadow-spread-value").val()),
      d = mi(o("#box-shadow-horizontal-value").val());
    "disable" == a &&
      ("box-shadow-color" == t && (n = Pi(Gi.find(e).css("color"))),
      "box-shadow-vertical" == t && (s = "0"),
      "box-shadow-blur-radius" == t && (r = "0"),
      "box-shadow-spread" == t && (l = "0"),
      "box-shadow-horizontal" == t && (d = "0")),
      "" == s && (s = "0"),
      "" == r && (r = "0"),
      "" == l && (l = "0"),
      "" == d && (d = "0");
    var p = o.trim(
      _i(d + "px " + s + "px " + r + "px " + l + "px " + n + " " + i)
    );
    return (
      0 == d && 0 == s && 0 == r && 0 == l && (p = "none"),
      ("transparent" == n || "rgba(226,146,146,0)" == n.replace(/\s/g, "")) &&
        (p = "none"),
      p
    );
  }
  function _t(e, t) {
    "animation-name" == e && (Ji.removeClass("wyp-h-trfm"), Ni());
    var a = !1 !== t && void 0 !== t ? t : "#" + e + "-live-css";
    var i = Gi.find(a);
    0 < i.length && i.remove();
  }
  function kt() {
    (window.ypData["data-clickable-select"] = void 0),
      Qi.removeClass("wyp-con-slcd"),
      (window.ypData.is_content_selected = !1),
      tn.removeClass(
        "wyp-non-logged-in-mode wyp-logged-in-mode wyp-flex-container wyp-flex-element wyp-grid-element wyp-element-list"
      ),
      tn.removeAttr("data-wyp-selector"),
      Ji.removeClass(
        "wyp-h-trfm wyp-selected-bottom wyp-full-width-selected wyp-ele-n-vis wyp-element-float yp-selector-hover yp-selector-focus yp-selector-link yp-selector-visited yp-selector-active yp-selector-checked yp-selector-disabled yp-selector-enabled yp-selector-invalid yp-selector-valid wyp-el-reing wyp-vis-edng wyp-vis-edng-x wyp-vis-edng-y"
      ),
      (window.ypData.is_visual_editing = !1),
      (window.ypData.is_resizing = !1),
      Gi.find(".wyp-selected-others,.wyp-selected").removeClass(
        "wyp-selected-others wyp-selected"
      ),
      (window.ypData.get_selected_element = void 0),
      sn.general.empty(),
      sn.other.empty(),
      sn.active.empty(),
      on.removeAttr("style"),
      (window.lastTextColor = null),
      Gi.find(".wyp-live-css").remove(),
      "block" == o(".advanced-info-box").css("display") &&
        o(".element-btn").hasClass("active") &&
        (o(".info-element-selected-section").hide(),
        o(".info-no-element-selected").show());
  }
  function Ct() {
    var t = o(".wyp-gradient-pointer-area"),
      a = t.width(),
      i = t.offset(),
      n = i.left,
      s = i.top;
    if (o(".wyp-gradient-pointer").hasClass("ui-draggable"))
      try {
        o(".wyp-gradient-pointer.ui-draggable").draggable("destroy");
      } catch (t) {}
    o(".wyp-gradient-pointer").draggable({
      containment: [n, s, n + a, s],
      start: function () {
        o(".wyp-gradient-pointer").removeClass("active"),
          o(this).addClass("active"),
          (window.blockIris = !0),
          o(".wyp-gradient-section .iris-picker").hide(),
          (window.gradientPointerTop =
            o(this).offset().top + o(this).height() / 2),
          (window.gradientPointerLen = o(
            ".wyp-gradient-pointer:not(.disable)"
          ).length);
      },
      drag: function (i, e) {
        t.addClass("gradient-pointer-no-cursor"),
          o(this).attr("data-position", parseInt(100 * (e.position.left / a))),
          2 < window.gradientPointerLen &&
            (i.pageY < window.gradientPointerTop - 25 ||
            i.pageY > window.gradientPointerTop + 25
              ? o(this).addClass("disable")
              : o(this).removeClass("disable")),
          Dt("live");
      },
      stop: function (i, e) {
        t.removeClass("gradient-pointer-no-cursor"),
          o(this).attr("data-position", parseInt(100 * (e.position.left / a))),
          Dt("insert"),
          (window.blockIris = !1);
      },
      axis: "x",
    });
  }
  function zt(e) {
    var t = !1;
    !0 == /(-webkit-|-moz-)/g.test(e) && (t = !0),
      (e = e.replace(
        /(-webkit-gradient\(linear\,(\s+)?|-webkit-linear-gradient\(|-o-linear-gradient\(|-moz-linear-gradient\()/g,
        "linear-gradient("
      ));
    var a = /linear-gradient\(([^,]+)/.exec(e)[1];
    if (!1 == /(deg|left|top|right|bottom)/g.test(a))
      e = e.replace(/linear-gradient\(/g, "linear-gradient(to right, ");
    else if (-1 == a.indexOf("to "))
      if (-1 != a.indexOf("deg") && !0 == t) {
        var i = mi(a);
        90 > i ? (i = 90 - i) : 90 < i && (i = 360 - (i - 90)),
          (e = e.replace(
            /linear-gradient\(([^,]+)/,
            "linear-gradient(" + i + "deg"
          ));
      } else
        (a = a.trim()),
          -1 == a.indexOf(" ") &&
            ("left" == a
              ? (e = e.replace(
                  /linear-gradient\(([^,]+)/,
                  "linear-gradient(to right"
                ))
              : "right" == a
              ? (e = e.replace(
                  /linear-gradient\(([^,]+)/,
                  "linear-gradient(to left"
                ))
              : "top" == a
              ? (e = e.replace(
                  /linear-gradient\(([^,]+)/,
                  "linear-gradient(to bottom"
                ))
              : "bottom" == a &&
                (e = e.replace(
                  /linear-gradient\(([^,]+)/,
                  "linear-gradient(to top"
                )));
    if (-1 == e.indexOf("%")) {
      e = e.replace(/rgb(a?)\((.*?)\)/g, function (e) {
        return e.replace(/\,/g, "|-|-|");
      });
      var n = e.match(/\,/g).length,
        s = -2;
      (e = e.replace(/\,/g, function () {
        return s++, -1 == s ? "," : " " + parseInt((100 * s) / n) + "%,";
      })),
        (e = e.replace(/\|\-\|\-\|/g, ",")),
        (e = e.replace(/\)$/, " 100%)"));
    }
    return e;
  }
  function Ot(e) {
    var t, a, n, s, r, l, d, p, c, u, m;
    if (
      ((e = e
        .replace(/\s+?!important/g, "")
        .replace(/\;$/g, "")
        .trim()),
      (c = "linear-gradient(to right,"),
      -1 == e.indexOf("linear-gradient("))
    )
      return !1;
    e = zt(e);
    try {
      t = window.GradientParser(e)[0];
    } catch (t) {
      return !1;
    }
    (m = t.orientation.type),
      (u = t.orientation.value),
      "directional" == m &&
        ("top" == u
          ? (u = "0")
          : "right" == u
          ? (u = "90")
          : "bottom" == u
          ? (u = "180")
          : "left" == u
          ? (u = "270")
          : "top" == u && (u = "360")),
      o(".wyp-gradient-orientation").attr("data-degree", u),
      o(".wyp-gradient-pointer-area").empty();
    for (var f = 0; f < t.colorStops.length; f++) {
      if (K(t.colorStops[f])) {
        if (((s = t.colorStops[f].length.type), "%" != s)) return !0;
        (r = t.colorStops[f].length.value), (l = "%"), (d = " ");
      } else (r = (100 * f) / (t.colorStops.length - 1)), (l = "%"), (d = " ");
      (r = parseInt(r)),
        (a = t.colorStops[f].type),
        (n = t.colorStops[f].value),
        ("rgb" == a || "rgba" == a) && (n = a + "(" + n + ")"),
        "hex" == a && (n = "#" + n),
        0 == f && o("#iris-gradient-color").val(n),
        (c += " " + n + d + r + l),
        t.colorStops.length - 1 != f && (c += ","),
        (p =
          '<div class="wyp-gradient-pointer" data-color="' +
          n +
          '" data-position="' +
          r +
          '" style="left:' +
          r +
          "" +
          l +
          ';"><i class="wyp-gradient-pointer-color" style="background-color:' +
          n +
          ';"></i></div>'),
        o(".wyp-gradient-pointer-area").append(p);
    }
    (c += ")"),
      o("#gradient-bar-view-style").remove(),
      tn.append(
        '<style id="gradient-bar-view-style">.wyp-gradient-bar{background-image:' +
          c +
          ";}.wyp-gradient-orientation{background-image:" +
          e +
          ";}</style>"
      ),
      setTimeout(function () {
        Ct();
      }, 26);
  }
  function Dt(e) {
    var t = o(".wyp-gradient-orientation").attr("data-degree") + "deg";
    "0deg" == t
      ? (t = "to top")
      : "90deg" == t
      ? (t = "to right")
      : "180deg" == t
      ? (t = "to bottom")
      : "270deg" == t
      ? (t = "to left")
      : "360deg" == t && (t = "to top");
    var a = "linear-gradient(to right,",
      n = "linear-gradient(" + t + ",";
    o(".wyp-gradient-pointer-area .wyp-gradient-pointer:not(.disable)")
      .sort(function (e, t) {
        return +e.dataset.position - +t.dataset.position;
      })
      .appendTo(".wyp-gradient-pointer-area"),
      o(".wyp-gradient-pointer-area .wyp-gradient-pointer:not(.disable)").each(
        function (e) {
          var t = o(this),
            i = t.attr("data-color"),
            s = t.attr("data-position");
          (n += " " + i + " " + parseInt(s) + "%"),
            (a += " " + i + " " + parseInt(s) + "%"),
            o(".wyp-gradient-pointer:not(.disable)").length - 1 != e &&
              ((n += ","), (a += ","));
        }
      ),
      (n += ")"),
      (a += ")"),
      o("#gradient-bar-view-style").remove(),
      tn.append(
        '<style id="gradient-bar-view-style">.wyp-gradient-bar{background-image:' +
          a +
          ";}.wyp-gradient-orientation{background-image:" +
          n +
          ";}</style>"
      ),
      "live" == e
        ? (_t("background-image", !1),
          ht("background-image", n, !1),
          o("#wyp-background-image").val(n))
        : "insert" == e &&
          (_t("background-image", !1),
          o("#wyp-background-image").val(n).trigger("keyup"));
  }
  function At() {
    return ((window.firstSelectLimit = !1), !1 === C())
      ? (kt(), !1)
      : !z() &&
          void (!1 == window.targetIsParentTree &&
            (o("#ed-elt-tr ul").empty(),
            Gi.find('[class*="wyp-pa-r"]').each(function () {
              "string" == typeof this.className &&
                (this.className = this.className.replace(
                  /wyp-pa-r[0-9]+/g,
                  ""
                ));
            })),
          o("#wyp-crnt-el").text(qi.no_el_selected),
          o(".selector-group.active").removeClass("active"),
          o("#font-family-group").removeClass("font-family-changed"),
          o(".property-responsive").removeClass("property-responsive"),
          tn.removeClass("node-has-other-screen-edits"),
          tn.removeClass("node-has-other-screen-edits"),
          tn.removeAttr("node-edits-screen"),
          o(".pr-res-ite").tooltip("destroy"),
          o("#property-responsive-menu").empty(),
          window.ypData["wyp-force-hide-select-ui"] &&
            ((window.ypData["wyp-force-hide-select-ui"] = void 0),
            Ji.removeClass("wyp-hid-bor-n")),
          window.ypData.editor_context_menu_open && _().contextMenu("hide"),
          o(
            "#margin-left-group,#margin-right-group,#margin-top-group,#margin-bottom-group,#padding-left-group,#padding-right-group,#padding-top-group,#padding-bottom-group,#background-color-group,#background-size-group,#background-repeat-group,#background-blend-mode-group,#background-attachment-group,#background-position-x-group,#background-position-y-group,#box-shadow-color-group,#animation-name-group,#list-style-position-group,#list-style-image-group,#list-style-type-group"
          ).popover("destroy"),
          o(".ed-pnl-list > li.active > h3").trigger("click"),
          !1 === Ji.hasClass("wyp-animate-manager-playing") &&
            Gi.find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass(
              "yp_onscreen yp_hover yp_click yp_focus"
            ),
          o(".ed-pnl-list > li > h3.wyp-group-edited").removeClass(
            "wyp-group-edited"
          ),
          o(".reset-enable").removeClass("reset-enable"),
          Ke(),
          tn.hasClass("wyp-nvgtn-act") &&
            o("#layer-tree").find(".selected").removeClass("selected"),
          o(".wyp-after").css("display", "block"),
          o("li[data-loaded]").removeAttr("data-loaded"),
          A() && ye(),
          o(".in-ac").removeAttr("style"),
          o(".wyp-disable-contextmenu").removeClass("wyp-disable-contextmenu"),
          o(".wyp-active-contextmenu").removeClass("wyp-active-contextmenu"),
          S() && o(".wyp-anim-cancel").trigger("click"),
          o(".wyp-advanced-option").hide(),
          o(".wyp-on").removeClass("wyp-on"),
          kt(),
          o(".wyp-unsplash-list,.wyp-gradient-list").scrollTop(0),
          o(
            ".iris-picker,.wyp-border-top-section,.wyp-border-right-section,.wyp-border-bottom-section,.wyp-border-left-section,.wyp-spacing-margin-section,.wyp-transform-rotate-section,.wyp-transform-skew-section,.wyp-transform-extra-section,.wyp-filter-color-adjustment-section,.wyp-motion-transition-section,.wyp-background-filter-section"
          ).hide(),
          o(
            ".wyp-border-all-section, .wyp-spacing-padding-section,.wyp-transform-move-section,.wyp-filter-color-effects-section,.wyp-motion-animation-section,.wyp-background-background-section"
          ).show(),
          o(".wyp-gradient-pointer-area").removeClass(
            "gradient-pointer-no-cursor"
          ),
          o(
            ".wyp-background-asts,.wyp-gradient-section,.wyp-unsplash-section"
          ).hide(),
          o(
            ".wyp-unsplash-btn,.wyp-bg-img-btn,.wyp-gradient-pointer,.wyp-gradient-btn,#border-type-group .ra.active,#spacing-type-group .ra.active,#transform-type-group .ra.active,#filter-type-group .ra.active,#motion-type-group .ra.active,.wyp-unsplash-list .active, #background-type-group .ra.active"
          ).removeClass("active"),
          o.throttle(Be(), 32),
          T() &&
            (0 == o("#wyp-animate-bar-current .wyp-anim-process-bar").length &&
            0 < o("#wyp-animate-bar-current").length
              ? o(".anim-active-row").remove()
              : o(".anim-active-row").removeClass("anim-active-row"),
            0 == o(".wyp-animate-bar").length
              ? (o(".animation-manager-empty").show(),
                o(".wyp-anim-list-menu").hide())
              : o(".animation-manager-empty").hide()),
          Zt(),
          o(
            "#min-width-group .wyp-after,#min-height-group .wyp-after,#max-width-group .wyp-after,#max-height-group .wyp-after"
          ).css("display", "none"),
          (window.parentItems = ""),
          (window.childrenItems = ""),
          o(".wyp-gradient-demo").removeClass("active"),
          Ji.removeClass("wyp-full-width-selected"),
          window.ypData["wyp-css-ed-act"] && _e(),
          o(".ace-type-here").remove(),
          tn.hasClass("property-responsive-open") && Qa());
  }
  function St() {
    return Gi.find("#wyp-styles-area");
  }
  function Tt(e) {
    return Gi.find("[data-source-mode='" + e + "']").text();
  }
  function Et(e, t, n, s) {
    var r;
    if (0 < Gi.find("#wyp-live-css-data").length && t == E())
      r = Gi.find("#wyp-live-css-data").text();
    else if (0 < Gi.find("#wyp-live-css-data").length && null == t)
      r = Gi.find("#wyp-live-css-data").text();
    else {
      var l;
      (l = null == t ? a(null, !1) : a(t, !1)), (r = Lt("desktop", t, l));
      var d = p(l, "[style]");
      if (0 < d.length) {
        for (var c = [], u = 0, m; u < d.length; u++)
          ((m = /\[msize\=(.*?)\]/g.exec(d[u])[1]),
          !(s && -1 != d[u].indexOf("YPtoAddBreakpoint"))) &&
            -1 === o.inArray(m, c) &&
            "desktop" != m &&
            c.push(m);
        o.each(c, function (e, a) {
          var i = Lt(a, t, l);
          (i =
            "\t" +
            i.replace(/\r/g, "\r\t").replace(/\t$/g, "").replace(/\t$/g, "")),
            "tablet" == a && (a = "(min-width: 768px) and (max-width: 991px)"),
            "mobile" == a && (a = "(max-width:767px)"),
            K(a) && (r = r + "\r\r@media " + a + "{\r\r" + i + "}");
        });
      }
    }
    (r = r.replace(/\{\r\r/g, "{")),
      n &&
        (r = r
          .replace(/\.yp_onscreen/g, ":yp-onscreen")
          .replace(/\.yp_focus/g, ":yp-focus")
          .replace(/\.yp_hover/g, ":yp-hover")
          .replace(/\.yp_click/g, ":yp-click")),
      (r = r.replace(
        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?){/g,
        function (e) {
          var t = e
              .match(
                /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
              )[0]
              .replace(/(body)?\.yp-selector-/g, ""),
            a = e.replace(
              /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
              ""
            );
          return (
            " " != a[0] && (a = "body" + a),
            (a = a.trim().replace(/\{/g, "") + ":" + t + "{"),
            a
          );
        }
      ));
    var f = new RegExp(
      "(\t+)?-webkit-(" + window.webkitArray.join("|") + "):(.*?);(\n|\r)?",
      "g"
    );
    (r = r.replace(f, "")),
      (r = r.replace(/\)\{/g, "){\r").replace(/\)\{/g, "){\r"));
    for (
      var g = [
          "nth-child",
          "not",
          "lang",
          "nth-last-child",
          "nth-last-of-type",
          "nth-of-type",
        ],
        h = 0,
        y;
      h < g.length;
      h++
    )
      (y = new RegExp(g[h] + "\\((.*?)\\){\r\r", "g")),
        (r = r.replace(y, g[h] + "($1){"));
    if (
      (!0 === e &&
        ((r = r.replace(/\r\ta:a !important;/g, "")),
        (r = r.replace(/a:a !important;/g, "")),
        (r = r.replace(/a:a;/g, ""))),
      (r = r.replace(/^\r/g, "").replace(/^\r/g, "")),
      (r = r.replace(/\}\r\r\r\r@media/g, "}\r\r@media")),
      (r = r.replace(/\/\*(.*?)\*\/\n@media/g, "@media")),
      (r = r.replace(/\n\n\n/g, "\n\n")),
      !0 == n)
    ) {
      var w, b;
      r = r.replace(/(^)(.*?){/gm, function (e) {
        return -1 == e.indexOf("@media")
          ? e
          : ((w = o.trim(
              e
                .match(/@media(.*?){/g)
                .toString()
                .replace(/(\{|@media(\s+)?)/g, "")
            )),
            (b = Ya(w)),
            !1 === b
              ? e
              : ((w = Ha(b)),
                (w = w.replace(/desktop/i, qi.all_devices)),
                "/* " + w + " */\n" + e));
      });
    }
    return r;
  }
  function Lt(e, t, a) {
    if (1 >= a.length) return "";
    var n, s, o;
    n = "";
    for (var r = [], l = p(a, "[msize=" + e + "]"), d = 0, c; d < l.length; d++)
      if (
        ((s = Ut(l[d])),
        (o =
          -1 != l[d].indexOf("[rule=a]") &&
          !0 == window.ypOption.append_auto_comments
            ? Ai(s, !1)
            : ki(s)),
        -1 == r.indexOf(s)) &&
        "" != s &&
        !1 != s &&
        null != s
      )
        if (
          (r.push(s),
          !1 != o && (n += "/* " + o + " */\n"),
          "desktop" != e && "all" != e && !1 != o && (n += "\t"),
          "YPtoAddBreakpoint" != s)
        ) {
          (n += s + "{\r"),
            (c = p(a, "[selector=" + gi(s) + "][msize=" + e + "]"));
          for (var u = 0; u < c.length; u++) n += "\t" + Xt(c[u]) + ";\r";
          n += "}\r\r";
        } else n += "/* New created breakpoint. */\r\r";
    return n;
  }
  function Bt(e, t, a, i) {
    var n = Pe(i),
      s = Re(i);
    (a = a.replace(/\s+\![a-zA-Z]{0,9}(\s+)?$/g, "")),
      -1 == window.webkitArray.indexOf(t)
        ? Ji.append(
            "<style class='wyp-fastest-live-css'>" +
              n +
              e +
              "{" +
              t +
              ":unset !important;" +
              t +
              ":" +
              a +
              " !important;}" +
              s +
              "</style>"
          )
        : Ji.append(
            "<style class='wyp-fastest-live-css'>" +
              n +
              e +
              "{" +
              t +
              ":unset !important;" +
              t +
              ":" +
              a +
              " !important;-webkit-" +
              t +
              ":" +
              a +
              " !important;}" +
              s +
              "</style>"
          );
  }
  function Mt() {
    Gi.find(".wyp-fastest-live-css").remove();
  }
  function Zt(e) {
    if (
      (o("#visual-rule-filter").trigger("keyup"),
      window.selectedByView ||
        "matched" == o("#visual-rule-filter").val() ||
        !1 == window.ypData["vsl-css-vi-active"])
    )
      return !1;
    if ("block" == o("#vsl-css-vi").css("display") && !0 == C()) {
      var t = _a();
      t = xi(t, !0, !0, !0, !0);
      var a = o(".selector-group[data-clean-selector='" + t + "']");
      if (0 < a.length) {
        o(".selector-group.active").removeClass("active"),
          o(".selector-group.focus").removeClass("focus"),
          a.addClass("active focus");
        var i = a.last().offset().top + o("#vsl-css-co").scrollTop() - 50;
        0 > i && (i = 0),
          !0 === e
            ? o("#vsl-css-co").scrollTop(i)
            : o("#vsl-css-co").stop().animate({ scrollTop: i }, 500, "swing");
      }
    }
  }
  function Pt() {
    if (
      (o(".view-children-group").removeClass("view-children-group"),
      "single.css" != o("#visual-rule-filter").val() &&
        "template.css" != o("#visual-rule-filter").val() &&
        "global.css" != o("#visual-rule-filter").val())
    ) {
      var e = [];
      o(".selector-group.selector-group-visible").each(function () {
        var t = o(this),
          a = t.attr("data-view-selector");
        return (
          -1 != e.indexOf(a) ||
          void (e.push(a),
          o(
            ".selector-group.selector-group-visible[data-view-selector='" +
              a +
              "']"
          )
            .not(this)
            .each(function () {
              t.after(o(this).addClass("view-children-group"));
            }))
        );
      });
    }
    o(".selector-group").removeClass("first-child last-child"),
      o(".selector-group:visible").first().addClass("first-child"),
      o(".selector-group:visible").last().addClass("last-child");
  }
  function Rt() {
    Yt(),
      o("#vsl-css-co").scrollTop(0),
      tn.addClass("vsl-css-vi-active wyp-cln-lo-panel-only"),
      (window.ypData["vsl-css-vi-active"] = !0),
      o(".selector-group").removeClass("first-child last-child"),
      o(".selector-group:visible").first().addClass("first-child"),
      o(".selector-group:visible").last().addClass("last-child"),
      C() && Zt(!0),
      window.ypData["wyp-fix-pan"] &&
        276 == I("visualManagerWidth") &&
        (o("#visual-manager-personalized-view").remove(),
        tn.append(
          "<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" +
            parseInt(o(".ed-pnl").width()) +
            "px !important;}</style>"
        )),
      N(),
      Ze();
  }
  function It() {
    return (
      !!window.ypData["vsl-css-vi-active"] &&
      void (o("#visual-rule-filter").val(""),
      tn.removeClass("vsl-css-vi-active wyp-cln-lo-panel-only"),
      (window.ypData["vsl-css-vi-active"] = void 0),
      N(),
      Ze(),
      we())
    );
  }
  function Yt() {
    for (
      var e = ["global", "template", "single"],
        t =
          '<p class="view-information" style="display:none;"></p><div id="view-no-item" style="display:none;"><span></span><p></p></div>',
        n = 0,
        r,
        l,
        d,
        c,
        u,
        m,
        f,
        g,
        h,
        y,
        w,
        v,
        b,
        _,
        k,
        z,
        O,
        D,
        A,
        S,
        T;
      n < e.length;
      n++
    )
      if (
        ((d = a(e[n], !1)), !(1 >= d.length)) &&
        ((w = p(d, "[style]")), 0 != w.length)
      ) {
        v = ["desktop"];
        for (var L = 0; L < w.length; L++)
          (g = /\[msize\=(.*?)\]/g.exec(w[L])[1]),
            -1 === o.inArray(g, v) && "desktop" != g && v.push(g);
        var B = null;
        C() && (B = _a()),
          o.each(v, function (a, i) {
            "tablet" == i && (i = "(min-width: 768px) and (max-width: 991px)"),
              "mobile" == i && (i = "(max-width:767px)"),
              (T = ""),
              -1 != i.indexOf("and") && (T = " disabled-media-line"),
              (b = i.replace(/desktop/i, qi.all_devices)),
              (_ = e[n]),
              (S = Ya(i)),
              !1 === S
                ? "all" != i && "desktop" != i
                  ? (A = " title='Unknown Media Query'")
                  : (A = "")
                : ((A = Ha(S)), (A = " title='" + A + "'")),
              (h = []),
              (y = p(d, "[msize=" + i + "]"));
            for (var s = 0; s < y.length; s++)
              if (
                ((u = Ut(y[s])),
                (y[s] = y[s].replace(
                  /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?){/g,
                  function (e) {
                    var t = e
                        .match(
                          /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
                        )[0]
                        .replace(/(body)?\.yp-selector-/g, ""),
                      a = e.replace(
                        /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                        ""
                      );
                    return (
                      " " != a[0] && (a = "body" + a),
                      (a = a.trim().replace(/\{/g, "") + ":" + t + "{"),
                      a
                    );
                  }
                )),
                (r = Ut(y[s])),
                "YPtoAddBreakpoint" != r) &&
                -1 == h.indexOf(r) &&
                null != r &&
                !1 != r &&
                "" != r
              ) {
                h.push(r),
                  (D = ""),
                  B == r && (D = " active-view-group focus"),
                  (l = xi(u, !0, !0, !0, !0)),
                  (m = Ai(r, !1)),
                  (f = ""),
                  !1 == Ca(l, !0, !1, !1) && (f = " unavailable-view-group"),
                  (t +=
                    "<div class='selector-group selector-group-visible" +
                    D +
                    "" +
                    f +
                    "' data-view-selector='" +
                    u +
                    "' data-clean-selector='" +
                    l +
                    "' data-view-size='" +
                    i +
                    "' data-view-type='" +
                    e[n] +
                    "'>"),
                  (t +=
                    "<div class='selector-heading'><span></span><input type='text' value='" +
                    m +
                    "' class='selector-comment-input' maxlength='70' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' /></div>"),
                  (t +=
                    "<div class='selector-content'><div class='view-before-selector'><div class='view-media-line" +
                    T +
                    "'" +
                    A +
                    ">" +
                    b +
                    "</div><span class='source-view'>" +
                    _ +
                    ".css</span><div class='wyp-clear'></div></div>"),
                  (t +=
                    "<div class='css-selector-open'><span class='selector-view'><span>" +
                    r
                      .replace(/\.yp_onscreen/g, ":yp-onscreen")
                      .replace(/\.yp_focus/g, ":yp-focus")
                      .replace(/\.yp_hover/g, ":yp-hover")
                      .replace(/\.yp_click/g, ":yp-click") +
                    "</span><i>{</i></span></div>"),
                  (t += "<div class='css-rule-group'>"),
                  (c = p(d, "[selector=" + gi(u) + "][msize=" + i + "]"));
                for (var o = 0; o < c.length; o++)
                  ((k = /^(.*?):(.*?)$/i.exec(Xt(c[o]))), null != k) &&
                    ((z = k[1]), -1 == z.indexOf("-webkit-")) &&
                    ((O = k[2]),
                    (t +=
                      '<div class="css-rule-view" data-view-rule="' +
                      z +
                      '"><label class="css-rule-label"><input type="checkbox" checked="checked"><span class="rule-checkbox"></span><span class="view-rule">' +
                      z +
                      ':</span></label><span class="view-rule-value">' +
                      O +
                      '</span><input class="value-input" type="text" /><span class="rule-end">;</span></div>'));
                (t += "</div>"),
                  (t += "<div class='css-selector-close'>}</div>"),
                  (t += "</div></div>");
              }
          });
      }
    return (
      o("#vsl-css-co").html(t),
      0 == o(".selector-group").length && "" == o("#visual-rule-filter").val()
        ? (o("#view-no-item p").text(qi.manager_msg15),
          o("#view-no-item").show(),
          !1)
        : void (Pt(),
          o("#vsl-css-vi").attr("data-current-type", E()),
          o(".view-media-line").tooltip("destroy"),
          o(
            ".selector-group:not([data-view-size='desktop']) .view-media-line"
          ).tooltip({
            placement: "bottom",
            template:
              '<div class="tooltip small-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            container: "#vsl-css-co",
            delay: { show: 50, hide: 0 },
          }))
    );
  }
  function Nt(e) {
    (null == e || null == e) && (e = E());
    for (
      var t = { selectors: [], rules: [] },
        a = window.ypData["wyp-need-to-process"],
        n = 0,
        s;
      n < an.styleSheets.length;
      n++
    ) {
      var r;
      try {
        r = o(an.styleSheets[n].ownerNode);
      } catch (t) {
        continue;
      }
      if (!1 == a) {
        if (r.hasClass("wyp-inline-data") && r.attr("data-source-mode") == e) {
          s = an.styleSheets[n];
          break;
        }
      } else if (
        r.hasAttr("id") &&
        "wyp-live-css-data" == r.attr("id") &&
        e == E()
      ) {
        s = an.styleSheets[n];
        break;
      }
    }
    if (J(s)) return t;
    var l, d, p, c, u;
    for (n = 0; n < s.cssRules.length; n++)
      if (
        ((l = s.cssRules[n]),
        (d = l.selectorText),
        J(d) || (t.selectors.push(d), t.rules.push(l.style.length)),
        (u = l.conditionText),
        !J(u))
      )
        for (var m = 0; m < l.cssRules.length; m++)
          ((p = l.cssRules[m]), (c = p.selectorText), !J(c)) &&
            (t.selectors.push(c), t.rules.push(p.style.length));
    return t;
  }
  function Ht(e, t) {
    if (!C()) return !1;
    var n = Nt(t).selectors;
    if (!1 != n && null != n && 0 < n.length) {
      for (var s = a(t, !1), o = 0, l, d; o < n.length; o++)
        if (
          ((l = xi(n[o], !0, !0, !0, !0)), (d = Ca(l, !0, !1, !1)), !1 != d)
        ) {
          if (!0 === e) {
            if (0 == Gi.find(l).parents(".wyp-selected").length) continue;
          } else if (!1 == Gi.find(l).hasClass("wyp-selected")) continue;
          s = u(s, "[selector=" + gi(Xe(n[o])) + "]");
        }
      r(s, t), Mi(), we();
    }
  }
  function Wt(e) {
    (e = e.toString()), (e = e.replace(/ms/g, ""));
    var t = 0,
      a;
    if (-1 != e.indexOf(",")) {
      for (var n = e.split(","), s = 0, o; s < n.length; s++)
        (o = n[s]),
          -1 == o.indexOf(".")
            ? (o = o.replace(/s/g, "000"))
            : ((a = parseFloat(o).toString().split(".")[1].length),
              (o = o.replace(".", "").toString()),
              2 == a
                ? (o = o.replace(/s/g, "0"))
                : 1 == a && (o = o.replace(/s/g, "00"))),
          (t = parseFloat(t) + parseFloat(o));
      return t;
    }
    return (
      -1 == e.indexOf(".")
        ? (e = e.replace(/s/g, "000"))
        : ((a = parseFloat(e).toString().split(".")[1].length),
          (e = e.replace(".", "").toString()),
          2 == a
            ? (e = e.replace(/s/g, "0"))
            : 1 == a && (e = e.replace(/s/g, "00"))),
      e
    );
  }
  function Ft(e, t, i, n) {
    var s = jQuery.Deferred();
    null == e && (e = _a()), (e = xi(e, !0, !0, !0));
    var r = "";
    tn.hasAttr("data-wyp-selector") &&
      ((r = tn.attr("data-wyp-selector")), (e += r)),
      (e = Xe(e));
    var l = i[0],
      d = i[1],
      c;
    if (((t = qt(t)[0]), S())) {
      var u = o(".scene-active").attr("data-scene"),
        m = Gi.find("#wyp-anim-scenes #" + u + ' style[data-rule="' + t + '"]');
      return (0 < m.length && (c = Vt(m.text())), l)
        ? 0 != m.length
        : c
        ? (!1 == d ? s.resolve(c) : s.resolve("all"), s.promise())
        : !l && (s.resolve(!1), s.promise());
    }
    var f = new RegExp("({|s+|;)" + t + "(s+)?:"),
      g = [],
      h = [],
      y,
      w,
      v,
      x,
      k,
      C,
      z,
      O,
      D,
      T,
      E;
    if (0 < Gi.find("#wyp-live-css-data").length)
      (w = Gi.find("#wyp-live-css-data").text()),
        (v = za(w, !1)),
        (w = za(w, !0)),
        (x = w.split("}")),
        (y = "all"),
        o.each(x, function (e, a) {
          if (((a += "}"), !1 == f.test(a))) return !0;
          var i = a
            .match(/\{(.*?)\}$/m)[0]
            .toString()
            .replace(/(^\{|\}$)/g, "")
            .trim();
          if (
            ((D = hi(i.split(";"))),
            o.each(D, function (e, a) {
              return (
                "" == a ||
                void (
                  a.split(":")[0].toString().trim() == t &&
                  (z = a.replace(/^(.*?):(.*?)$/g, "$2").trim())
                )
              );
            }),
            (k = Ut(a)),
            !1 == Ca(k, !0, !1, !1))
          )
            return !0;
          if (((C = Gi.find(k)), !1 == C.hasClass("wyp-selected"))) return !0;
          if ("" != r && -1 == k.indexOf(".yp-selector-"))
            if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
            else if (-1 != k.indexOf("yp_focus") && -1 != r.indexOf("focus"));
            else return !0;
          g.push(y), h.push(k + "{" + t + ":" + z + "}");
        }),
        (O = v.match(/@media(.*?){(.*?)}}/g)),
        null != O &&
          o.each(O, function (e, a) {
            if (
              ((y = o.trim(
                a
                  .match(/@media(.*?){/g)
                  .toString()
                  .replace(/(\{|@media(\s+)?)/g, "")
              )),
              "desktop" == y && (y = "all"),
              !nn.matchMedia(y).matches)
            )
              return !0;
            if (A())
              if (0 < o(".breakpoint-bar .focus").length) {
                var i = Ya(y),
                  n = Ya(
                    o(".breakpoint-bar .focus").attr("data-breakpoint-data")
                  );
                if (!1 !== i && !1 !== n && i != n) return !0;
              } else if (0 == o(".breakpoint-bar .focus").length) return !0;
            (a =
              a
                .match(/\{(.*?)\}$/g)[0]
                .toString()
                .replace(/(^\{|\}\}$)/g, "")
                .trim() + "}"),
              (x = a.split("}")),
              o.each(x, function (e, a) {
                if (((a += "}"), !1 == f.test(a))) return !0;
                var i = a
                  .match(/\{(.*?)\}$/m)[0]
                  .toString()
                  .replace(/(^\{|\}$)/g, "")
                  .trim();
                if (
                  ((D = hi(i.split(";"))),
                  o.each(D, function (e, a) {
                    return (
                      "" == a ||
                      void (
                        a.split(":")[0].toString().trim() == t &&
                        (z = a.replace(/^(.*?):(.*?)$/g, "$2").trim())
                      )
                    );
                  }),
                  (k = Ut(a)),
                  !1 == Ca(k, !0, !1, !1))
                )
                  return !0;
                if (((C = Gi.find(k)), !1 == C.hasClass("wyp-selected")))
                  return !0;
                if ("" != r && -1 == k.indexOf(".yp-selector-"))
                  if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
                  else if (
                    -1 != k.indexOf("yp_focus") &&
                    -1 != r.indexOf("focus")
                  );
                  else return !0;
                g.push(y), h.push(k + "{" + t + ":" + z + "}");
              });
          });
    else {
      void 0 === n && (n = a(null, !1));
      var L = p(n, "[rule=" + t + "]");
      if (0 < L.length)
        for (E = 0; E < L.length; E++)
          if (
            ((w = L[E]),
            (y = /\[msize\=(.*?)\]/g.exec(w)[1]),
            "desktop" == y && (y = "all"),
            !!nn.matchMedia(y).matches)
          ) {
            if (A())
              if (0 < o(".breakpoint-bar .focus").length) {
                var B = Ya(y),
                  M = Ya(
                    o(".breakpoint-bar .focus").attr("data-breakpoint-data")
                  );
                if (!1 !== B && !1 !== M && B != M) continue;
              } else if (0 == o(".breakpoint-bar .focus").length) continue;
            if (
              ((w = jt(w)), (k = Ut(w)), !1 != Ca(k, !0, !1, !1)) &&
              ((C = Gi.find(k)), !1 != C.hasClass("wyp-selected"))
            ) {
              if ("" != r && -1 == k.indexOf(".yp-selector-"))
                if (-1 != k.indexOf("yp_hover") && -1 != r.indexOf("hover"));
                else if (
                  -1 != k.indexOf("yp_focus") &&
                  -1 != r.indexOf("focus")
                );
                else continue;
              k == Ut(h[E]) && h.pop(), g.push(y), h.push(w);
            }
          }
    }
    if (0 == h.length) return !l && (s.resolve(!1), s.promise());
    if (l) {
      var Z = !1,
        P,
        R;
      for (E = 0; E < g.length; E++)
        if (!(nn.matchMedia(g[E]).matches && "all" != g[E]))
          "all" == g[E] && !1 == A() && (Z = !0);
        else if (
          ((P = Ya(Fe())), (R = Ya(g[E])), !1 !== P && !1 !== R && P == R)
        ) {
          Z = !0;
          break;
        }
      return Z;
    }
    if (0 < h.length) {
      var I = '<style id="wyp-calcature-style">' + _a() + "{outline:unset;}",
        Y;
      o.each(h, function (e, a) {
        "all" != g[e] && (I += "@media " + g[e] + "{"),
          (Y = /\!important/g.test(a) ? " !important" : ""),
          /\:(.*?);/g.test(a)
            ? (I += a.replace(
                /\:(.*?);/g,
                ":" + (e + 1) + "px solid transparent" + Y + ";"
              ))
            : /\:(.*?)}/g.test(a) &&
              (I += a
                .replace(
                  /\:(.*?)}/g,
                  ":" + (e + 1) + "px solid transparent" + Y + ";}"
                )
                .replace("}}", "}")),
          (I = I.replace("{" + t + ":", "{outline:")),
          "all" != g[e] && (I += "}");
      }),
        (I += "</style>"),
        Ji.append(I);
    }
    return (
      setTimeout(function () {
        if (
          ((T =
            0 < h.length && void 0 !== _()
              ? parseInt(_().css("outline-width")) - 1
              : -1),
          !1 != d)
        )
          0 > T ? s.resolve(!1) : s.resolve(g[T]);
        else if (0 > T) s.resolve(_().css(t));
        else {
          var e = Vt(h[T]);
          null == e || null == e || !1 == e
            ? s.resolve(_().css(t))
            : -1 == e.indexOf("var(--")
            ? s.resolve(e)
            : s.resolve(_().css(t));
        }
        0 < h.length && Ji.find("#wyp-calcature-style").remove();
      }, window.YellowDelay),
      s.promise()
    );
  }
  function jt(e) {
    if (null === e || void 0 === e || "" === e) return !1;
    var t = e.replace(/(\/\*|^)(.*?)\*\//g, "");
    return (
      -1 != t.indexOf("@media") &&
        (t = t
          .trim()
          .match(/\{(.*?)\}$/g)
          .toString()
          .replace(/(^\{|\}$)/g, "")),
      t.trim()
    );
  }
  function Xt(e) {
    if (null === e || void 0 === e || "" === e) return !1;
    var t;
    if (
      ((e = e.replace(/(\/\*|^)(.*?)\*\//g, "")), -1 != e.indexOf("@media"))
    ) {
      if (null == e.split("{")[2]) return "";
      t = e.split("{")[2].split("}")[0];
    } else {
      if (null == e.split("{")[1]) return "";
      t = e.split("{")[1].split("}")[0];
    }
    return (t = t.trim().replace(/(\s+)?\;$/g, "")), t.trim();
  }
  function Vt(e, t) {
    if ((J(t) && (t = !0), null === e || void 0 === e || "" === e)) return !1;
    e = e.replace(/(\/\*|^)(.*?)\*\//g, "");
    var a;
    return (
      (a =
        -1 == e.indexOf("@media")
          ? e
              .split("{")[1]
              .split("}")[0]
              .replace(/^(.*?):(.*?)$/g, "$2")
          : e
              .split("{")[2]
              .split("}")[0]
              .replace(/^(.*?):(.*?)$/g, "$2")),
      !1 !== t && (a = a.trim().replace(/((\s+)?\;$|(\s+)?\!important)/g, "")),
      a.trim()
    );
  }
  function Ut(e) {
    if (null === e || void 0 === e || "" === e) return !1;
    e = e.replace(/(\/\*|^)(.*?)\*\//g, "");
    var t = e.split("{")[0];
    return null == t || !1 == t
      ? ""
      : (-1 != t.indexOf("@media") && (t = e.split("{")[1].split("{")[0]),
        t.trim());
  }
  function qt(e) {
    var t = null;
    return (
      (e = e.replace(/\-webkit\-/g, "")),
      -1 != e.indexOf("-transform") && "text-transform" != e
        ? ((t = e.replace(/-transform/g, "")),
          (e = "transform"),
          (t = t.replace(/\-/g, "")))
        : -1 == e.indexOf("-backdrop-filter")
        ? -1 != e.indexOf("-filter") && -1 === e.indexOf("backdrop-filter")
          ? ((t = e.replace(/-filter/g, "")), (e = "filter"))
          : -1 == e.indexOf("box-shadow-")
          ? "justify-content1" == e && (e = "justify-content")
          : ((t = e.replace(/box-shadow-/g, "")), (e = "box-shadow"))
        : ((t = e.replace(/-backdrop-filter/g, "")), (e = "backdrop-filter")),
      [e, t]
    );
  }
  function $t(e, t, i) {
    var n = [e, t, i].map(function (e) {
      return (
        (e /= 255),
        0.03928 >= e ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4)
      );
    });
    return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  }
  function Gt(e, t) {
    var a = ($t(e[0], e[1], e[2]) + 0.05) / ($t(t[0], t[1], t[2]) + 0.05);
    return (
      1 > a &&
        (a = ($t(t[0], t[1], t[2]) + 0.05) / ($t(e[0], e[1], e[2]) + 0.05)),
      a.toFixed(2)
    );
  }
  function Kt(e, t) {
    return (
      -1 != e.indexOf("#") && (e = Ri(e)),
      -1 != t.indexOf("#") && (t = Ri(t)),
      (e = e.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
      (t = t.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
      Gt([e[0], e[1], e[2]], [t[0], t[1], t[2]])
    );
  }
  function Jt(e, t) {
    var a, i, n;
    return (
      e.parents().each(function () {
        return (
          ((n = o(this)),
          (i = n.css("background-image")),
          (a = n.css("background-color")),
          "none" == i) &&
          ("rgba(0, 0, 0, 0)" == a ||
            "rgba(0,0,0,0)" == a ||
            "transparent" == a ||
            ((t = n.css("background-color")), !1))
        );
      }),
      t
    );
  }
  function Qt(e, t) {
    var a = t.a,
      i = "rgb(";
    return (
      (i += parseInt((1 - a) * e.r + a * t.r) + ", "),
      (i += parseInt((1 - a) * e.g + a * t.g) + ", "),
      (i += parseInt((1 - a) * e.b + a * t.b)),
      (i += ")"),
      i
    );
  }
  function ea() {
    var e = _(),
      t = parseFloat(e.css("font-size"));
    isNaN(t) && (t = 0);
    var a =
      "<span class='accessibility-pass-badge'>" +
      t +
      "px<i class='yicon icon-yes'></i></span>";
    return (
      12 >= t &&
        (a =
          "<span class='accessibility-fail-badge'>" +
          t +
          "px<i class='yicon icon-no-alt'></i></span>"),
      a
    );
  }
  function ta(e) {
    var t = parseFloat(e.css("line-height"));
    return (
      "normal" == t &&
        (t = Math.round(1.33333333333 * parseFloat(e.css("font-size")))),
      parseFloat(t)
    );
  }
  function aa() {
    var e = _(),
      t = parseFloat(e.css("font-size"));
    isNaN(t) && (t = 0);
    var a = ta(e) / t,
      i = parseFloat(100 / parseFloat(t) / 20),
      n = Math.ceil(10 * parseFloat(i / 1.2 + 1)) / 10,
      s = Math.ceil(10 * parseFloat(i / 1.2 + 1.6)) / 10;
    a = a.toFixed(2);
    var o =
      "<span class='accessibility-pass-badge'>" +
      a +
      "<i class='yicon icon-yes'></i></span>";
    return (
      a < n &&
        (o =
          "<span class='accessibility-fail-badge'>" +
          a +
          "<i class='yicon icon-no-alt'></i></span>"),
      a > s &&
        (o =
          "<span class='accessibility-fail-badge'>" +
          a +
          "<i class='yicon icon-no-alt'></i></span>"),
      o
    );
  }
  function ia() {
    var e = _(),
      t = e.css("color"),
      a = e.css("background-color");
    if ("none" != e.css("background-image"))
      return "<span class='accessibility-unknown-badge'>Unknown</span>";
    if (
      ("rgba(0, 0, 0, 0)" == a || "rgba(0,0,0,0)" == a || "transparent" == a) &&
      ((a = "transparent"),
      "fixed" != e.css("position") &&
        "absolute" != e.css("position") &&
        (a = Jt(e, a)),
      "transparent" == a)
    )
      return "<span class='accessibility-unknown-badge'>Unknown</span>";
    if (
      -1 != a.indexOf("rgba") &&
      0 < e.parent().length &&
      "none" == e.css("background-image")
    ) {
      var i, n, s, o;
      if (
        ((i = a.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
        (n = e.parent().css("background-color")),
        ("rgba(0, 0, 0, 0)" == n ||
          "rgba(0,0,0,0)" == n ||
          "transparent" == n) &&
          ((n = "transparent"), (n = Jt(e, n))),
        "transparent" != n && -1 == n.indexOf("rgba"))
      ) {
        var r = n.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",");
        (s = { r: i[0], g: i[1], b: i[2], a: i[3] }),
          (o = { r: r[0], g: r[1], b: r[2] }),
          (a = Qt(o, s));
      }
    }
    if (-1 != t.indexOf("rgba") && -1 == a.indexOf("rgba")) {
      var l, d, p, c;
      (l = t.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
        (d = a.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
        (p = { r: l[0], g: l[1], b: l[2], a: l[3] }),
        (c = { r: d[0], g: d[1], b: d[2] }),
        (t = Qt(c, p));
    }
    var u = Kt(t, a),
      m = parseInt(e.css("font-size"));
    isNaN(m) && (m = 0);
    var f =
      "<span class='accessibility-pass-badge'>" +
      u +
      "<i class='yicon icon-yes'></i></span>";
    return (
      4.5 > u &&
        18.66 > m &&
        (f =
          "<span class='accessibility-fail-badge'>" +
          u +
          "<i class='yicon icon-no-alt'></i></span>"),
      3 > u &&
        18.66 < m &&
        (f =
          "<span class='accessibility-fail-badge'>" +
          u +
          "<i class='yicon icon-no-alt'></i></span>"),
      f
    );
  }
  function na(e) {
    return (
      "text-decoration-line" == e && (e = "text-decoration"),
      "overflow-wrap" == e && (e = "word-wrap"),
      e
    );
  }
  function sa() {
    if (C()) {
      o(".wyp-group-edited").removeClass("wyp-group-edited"),
        o(".reset-enable").removeClass("reset-enable"),
        Ke(),
        o(".property-responsive").removeClass("property-responsive"),
        tn.removeClass("node-has-other-screen-edits"),
        tn.removeAttr("node-edits-screen");
      var e = tn.hasClass("property-responsive-open"),
        t = null,
        n,
        s,
        r,
        l;
      if (
        (e && (t = o(".mo-i.active").parents(".op-g").attr("data-css")),
        !1 == S())
      ) {
        var d, p, c;
        (p = _a(!0)), (p = Xe(p)), (c = E());
        for (
          var u = window.ypData["wyp-need-to-process"], m = 0;
          m < an.styleSheets.length;
          m++
        ) {
          var f;
          try {
            f = o(an.styleSheets[m].ownerNode);
          } catch (t) {
            continue;
          }
          if (!1 == u) {
            if (
              f.hasClass("wyp-inline-data") &&
              f.attr("data-source-mode") == c
            ) {
              d = an.styleSheets[m];
              break;
            }
          } else if (f.hasAttr("id") && "wyp-live-css-data" == f.attr("id")) {
            d = an.styleSheets[m];
            break;
          }
        }
        var g, h, y, w, v, _;
        if (void 0 !== d)
          for (m = 0; m < d.cssRules.length; m++) {
            if (((h = d.cssRules[m]), (w = h.selectorText), !J(w))) {
              var k = p;
              if (
                (-1 != w.indexOf("yp_hover") &&
                  -1 != p.indexOf("yp-selector-hover") &&
                  (p = p.replace(/\.yp-selector-hover/g, "")),
                -1 != w.indexOf("yp_focus") &&
                  -1 != p.indexOf("yp-selector-focus") &&
                  (p = p.replace(/\.yp-selector-focus/g, "")),
                (w = w.replace(
                  /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g,
                  ""
                )),
                !1 == Ca(w, !0, !1, !1))
              )
                continue;
              if (((_ = Gi.find(w)), !1 == _.hasClass("wyp-selected")))
                continue;
              if (!1 == Ge(p, w)) continue;
              p = k;
            }
            if (((g = h.conditionText), !J(g))) {
              for (var z = 0; z < h.cssRules.length; z++)
                if (
                  ((y = h.cssRules[z]), (v = y.selectorText), !J(v)) &&
                  ((v = v.replace(
                    /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)focus|yp(-|_)click)/g,
                    ""
                  )),
                  !1 != Ca(v, !0, !1, !1)) &&
                  ((_ = Gi.find(v)), !1 != _.hasClass("wyp-selected")) &&
                  !1 != Ge(p, v)
                )
                  for (
                    r = o.map(y.style, function (e) {
                      return [e];
                    }),
                      n = 0;
                    n < r.length;
                    n++
                  )
                    if (
                      ((r[n] = na(r[n])),
                      (l = y.style[r[n]]),
                      "--animation-trigger-repeat" == r[n] &&
                        (l = y.style.getPropertyValue(
                          "--animation-trigger-repeat"
                        )),
                      !ra(r, n, l, y.style))
                    ) {
                      (r[n] = r[n].replace(/\-passed/g, "")),
                        (s = o("#" + r[n] + "-group"));
                      var O, D;
                      if (A()) {
                        D = Ya(g);
                        var T = "",
                          L = o(".breakpoint-bar .focus");
                        (T =
                          0 < L.length
                            ? "max-width" ==
                              o(".media-control").attr("data-code")
                              ? T + "<" + L.attr("data-breakpoint")
                              : T + ">" + L.attr("data-breakpoint")
                            : "max-width" ==
                              o(".media-control").attr("data-code")
                            ? T + "<" + parseInt(o("#iframe").width())
                            : T + ">" + parseInt(o("#iframe").width())),
                          !1 !== D &&
                            !1 !== T &&
                            ((D = D),
                            (T = T.toString()),
                            D == T
                              ? (s.addClass("reset-enable"),
                                Je(r[n]),
                                s
                                  .parents("li")
                                  .find("h3")
                                  .addClass("wyp-group-edited"))
                              : -1 == r[n].indexOf("box-shadow") &&
                                (s.addClass("property-responsive"),
                                tn.addClass("node-has-other-screen-edits"),
                                (O = tn.attr("node-edits-screen")),
                                void 0 !== O && -1 === O.indexOf(D)
                                  ? (O += "," + D)
                                  : (O = D),
                                tn.attr("node-edits-screen", O)));
                      } else
                        s.addClass("property-responsive"),
                          tn.addClass("node-has-other-screen-edits"),
                          (O = tn.attr("node-edits-screen")),
                          void 0 !== O && -1 === O.indexOf(D)
                            ? (O += "," + D)
                            : (O = D),
                          tn.attr("node-edits-screen", O);
                      var B = Ya(g);
                      !1 !== B &&
                        t == r[n] &&
                        o(
                          "#property-responsive-menu .pr-res-ite[data-responsive-size='" +
                            B +
                            "']"
                        ).attr("data-info", "Edited");
                    }
            } else
              for (
                r = o.map(h.style, function (e) {
                  return [e];
                }),
                  n = 0;
                n < r.length;
                n++
              )
                ((r[n] = na(r[n])),
                (l = h.style[r[n]]),
                "--animation-trigger-repeat" == r[n] &&
                  (l = h.style.getPropertyValue("--animation-trigger-repeat")),
                !ra(r, n, l, h.style)) &&
                  ((r[n] = r[n].replace(/\-passed/g, "")),
                  (s = o("#" + r[n] + "-group")),
                  t == r[n] &&
                    o(
                      "#property-responsive-menu .pr-res-ite[data-responsive-size='all']"
                    ).attr("data-info", "Edited"),
                  A() &&
                    -1 == r[n].indexOf("-box-shadow") &&
                    (s.addClass("property-responsive"),
                    tn.addClass("node-has-other-screen-edits")),
                  A() || (s.addClass("reset-enable"), Je(r[n])),
                  !1 == A() &&
                    -1 == r[n].indexOf("-box-shadow") &&
                    s.parents("li").find("h3").addClass("wyp-group-edited"));
          }
      } else {
        var M, Z, P;
        (P = o(".scene-active").attr("data-scene")),
          (M = Gi.find("#wyp-anim-scenes #" + P + " style")),
          (r = []);
        var R = [];
        for (
          M.each(function () {
            return (
              (Z = o(this)),
              (l = Z.text()),
              !!J(l) || void (r.push(qt(Z.attr("data-rule"))[0]), R.push(Vt(l)))
            );
          }),
            n = 0;
          n < r.length;
          n++
        )
          (-1 == r[n].indexOf("-passed") && ((l = R[n]), ra(r, n, l, R))) ||
            ((r[n] = r[n].replace(/\-passed/g, "")),
            (s = o("#" + r[n] + "-group")),
            s.addClass("reset-enable"),
            Je(r[n]),
            -1 == r[n].indexOf("-box-shadow") &&
              s.parents("li").find("h3").addClass("wyp-group-edited"));
      }
    }
  }
  function oa(e, t, a, i) {
    if (
      (-1 == t.indexOf("border-" + i + "-passed") &&
        (e == "border-top-" + i ||
          e == "border-right-" + i ||
          e == "border-bottom-" + i ||
          e == "border-left-" + i) &&
        a["border-top-" + i] == a["border-left-" + i] &&
        a["border-right-" + i] == a["border-bottom-" + i] &&
        a["border-top-" + i] == a["border-bottom-" + i] &&
        t.push("border-" + i + "-passed"),
      -1 != t.indexOf("border-" + i + "-passed"))
    ) {
      if (e == "border-top-" + i) return !0;
      if (e == "border-left-" + i) return !0;
      if (e == "border-right-" + i) return !0;
      if (e == "border-bottom-" + i) return !0;
    } else
      e == "border-top-" + i && t.push("border-top-" + i + "-passed"),
        e == "border-left-" + i && t.push("border-left-" + i + "-passed"),
        e == "border-right-" + i && t.push("border-right-" + i + "-passed"),
        e == "border-bottom-" + i && t.push("border-bottom-" + i + "-passed");
  }
  function ra(e, t, a, i) {
    var n = e[t];
    if (-1 == n.indexOf("-passed")) {
      if (J(a)) return !0;
      a = a.replace(
        /(^|\s)(scale\(1\)|rotate\(0deg\)|rotatex\(0deg\)|rotatey\(0deg\)|rotatez\(0deg\)|translatex\(0px\)|translatey\(0px\)|skewx\(0deg\)|skewy\(0deg\)|blur\(0px\)|brightness\(1\)|contrast\(1\)|grayscale\(0\)|invert\(0\)|hue-rotate\(0deg\)|saturate\(1\)|sepia\(0\))/gi,
        ""
      );
      for (var s = ["style", "width", "color"], r = 0; r < s.length; r++)
        if (oa(n, e, i, s[r])) return !0;
      if ("background-repeat-x" == n || "background-repeat-y" == n)
        return e.push("background-repeat"), !0;
      if ("overflow-x" == n || "overflow-y" == n)
        return e.push("overflow-passed"), !0;
      if ("flex-grow" == n || "flex-basis" == n || "flex-shrink" == n)
        return e.push("flex-passed"), !0;
      if ("transform" == n && "none" != a)
        return (
          /scale\(/gi.test(a) && e.push("scale-" + n + "-passed"),
          /rotate\(/gi.test(a) && e.push("rotate-" + n + "-passed"),
          /rotatex\(/gi.test(a) && e.push("rotatex-" + n + "-passed"),
          /rotatey\(/gi.test(a) && e.push("rotatey-" + n + "-passed"),
          /rotatez\(/gi.test(a) && e.push("rotatez-" + n + "-passed"),
          /translatex\(/gi.test(a) && e.push("translate-x-" + n + "-passed"),
          /translatey\(/gi.test(a) && e.push("translate-y-" + n + "-passed"),
          /skewx\(/gi.test(a) && e.push("skew-x-" + n + "-passed"),
          /skewy\(/gi.test(a) && e.push("skew-y-" + n + "-passed"),
          !0
        );
      if ("filter" == n && "none" != a)
        return (
          /blur\(/gi.test(a) && e.push("blur-" + n + "-passed"),
          /brightness\(/gi.test(a) && e.push("brightness-" + n + "-passed"),
          /contrast\(/gi.test(a) && e.push("contrast-" + n + "-passed"),
          /grayscale\(/gi.test(a) && e.push("grayscale-" + n + "-passed"),
          /invert\(/gi.test(a) && e.push("invert-" + n + "-passed"),
          /hue-rotate\(/gi.test(a) && e.push("hue-rotate-" + n + "-passed"),
          /saturate\(/gi.test(a) && e.push("saturate-" + n + "-passed"),
          /sepia\(/gi.test(a) && e.push("sepia-" + n + "-passed"),
          !0
        );
      if ("backdrop-filter" == n && "none" != a)
        return (
          /blur\(/gi.test(a) && e.push("blur-" + n + "-passed"),
          /brightness\(/gi.test(a) && e.push("brightness-" + n + "-passed"),
          /contrast\(/gi.test(a) && e.push("contrast-" + n + "-passed"),
          /grayscale\(/gi.test(a) && e.push("grayscale-" + n + "-passed"),
          /invert\(/gi.test(a) && e.push("invert-" + n + "-passed"),
          /hue-rotate\(/gi.test(a) && e.push("hue-rotate-" + n + "-passed"),
          /saturate\(/gi.test(a) && e.push("saturate-" + n + "-passed"),
          /sepia\(/gi.test(a) && e.push("sepia-" + n + "-passed"),
          !0
        );
      if ("box-shadow" == n) {
        var l, d;
        if (
          ((l = o("#wyp-box-shadow-color").val()),
          null != l && "" != l && -1 != l.indexOf("#") && (l = Ri(l)),
          (d = Ri(Pi(da("color")))),
          null != l && (l = l.replace(/\s+/g, "")),
          null != d && (d = d.replace(/\s+/g, "")),
          l != d &&
            ((a = a.replace(/(rgba\(0\,0\,0\,0\)|rgba\(0\, 0\, 0\, 0\))/g, "")),
            (-1 != a.indexOf("#") || -1 != a.indexOf("rgb")) &&
              e.push(n + "-color-passed")),
          -1 == a.indexOf("inset")
            ? "none" == a &&
              o("#box-shadow-inset-inset").parent().hasClass("active") &&
              e.push(n + "-inset-passed")
            : e.push(n + "-inset-passed"),
          "none" != a)
        ) {
          var p = o.trim(
            a
              .replace(/rgb(.*?)\((.*?)\) /g, "")
              .replace(/ rgb(.*?)\((.*?)\)/g, "")
              .replace(/inset /g, "")
              .replace(/ inset/g, "")
          );
          0 != mi(p.split(" ")[0]) && e.push(n + "-horizontal-passed"),
            0 != mi(p.split(" ")[1]) && e.push(n + "-vertical-passed"),
            0 != mi(p.split(" ")[2]) && e.push(n + "-blur-radius-passed"),
            0 != mi(p.split(" ")[3]) && e.push(n + "-spread-passed");
        }
        return !0;
      }
    }
  }
  function la(e) {
    var t = [],
      a,
      i;
    e.find(".this-grid-input").each(function () {
      (a = o(this).val().trim()),
        (i = o(this).next().find(".grid-format").val().trim()),
        "auto" == i || "" == a ? t.push("auto") : t.push(a + i);
    }),
      (t = t.join(" ")),
      e.parent().find(".gr-bu-in").val(t).trigger("keyup"),
      o.throttle(Be(), 32);
  }
  function da(e, t) {
    var a = new Date().getTime();
    return void 0 !== On && 300 >= a - On
      ? window.cachedCSS.getPropertyValue(e)
      : ((On = new Date().getTime()),
        (window.cachedCSS =
          void 0 === t
            ? window.getComputedStyle(_().get(0), null)
            : window.getComputedStyle(t.get(0), null)),
        window.cachedCSS.getPropertyValue(e));
  }
  function pa(e, t, i) {
    void 0 === t && (t = _a());
    var n;
    (n = i && i.element ? i.element : _()),
      ("animation-name" == e ||
        "animation-duration" == e ||
        "animation-delay" == e) &&
        n.addClass("yp_onscreen yp_hover yp_click yp_focus");
    var s = qt(e),
      r = s[0],
      l = s[1],
      d;
    d = i && i.size ? i.size : Fe();
    var c = "",
      u;
    (u = i && i.styles ? i.styles : a(null, !0)),
      0 <
        p(u, "[selector=" + gi(t + ".yp_onscreen") + "][msize=" + d + "]")
          .length && (c = "yp_onscreen"),
      0 <
        p(u, "[selector=" + gi(t + ".yp_click") + "][msize=" + d + "]")
          .length && (c = "yp_click"),
      0 <
        p(u, "[selector=" + gi(t + ".yp_hover") + "][msize=" + d + "]")
          .length && (c = "yp_hover"),
      0 <
        p(u, "[selector=" + gi(t + ".yp_focus") + "][msize=" + d + "]")
          .length && (c = "yp_focus"),
      Ji.hasClass("yp-selector-hover") && "" == c && (c = "yp_hover"),
      Ji.hasClass("yp-selector-focus") && "" == c && (c = "yp_focus"),
      (J(c) || "" == c) && (c = "yp_onscreen"),
      "cursor" == e && Ji.addClass("wyp-imp-chk");
    var m = "",
      f = Ft(t, e, [!1, !1], u);
    f.always(function (s) {
      !1 !== s && (m = s);
      var d = qt(e)[0];
      ("color" == e ||
        "background-color" == e ||
        "background-image" == e ||
        "box-shadow" == d ||
        "border-color" == e ||
        "text-shadow" == e ||
        -1 != d.indexOf("-radius") ||
        "filter" == d ||
        "backdrop-filter" == d) &&
        n.addClass("wyp-no-wf");
      var f, g;
      "animation-play" != e &&
        "border-width" != e &&
        "border-color" != e &&
        "border-style" != e &&
        ((f = da(r, n)), (g = mi(f))),
        Ft(t, e, [!0, !1], u) &&
          ("inherit" == m ||
          "auto" == m ||
          "unset" == m ||
          "auto" == m ||
          "initial" == m
            ? ((f = da(r, n)), (g = mi(f)))
            : ((f = m), (g = mi(f)))),
        J(f) && ((f = ""), (g = mi(""))),
        setTimeout(function () {
          "cursor" == e && Ji.removeClass("wyp-imp-chk");
        }, window.YellowDelay),
        ("top" == e || "left" == e) && "auto" == f && ((f = "0px"), (g = 0)),
        "border-type" == e &&
          !1 == o("#border-type-group").find(".ra.active").length &&
          (f = "all"),
        "background-type" == e &&
          !1 == o("#background-type-group").find(".ra.active").length &&
          (f = "background");
      var h;
      if ("display" == e) {
        if (
          (tn.removeClass(
            "wyp-flex-container wyp-grid-element wyp-flex-element"
          ),
          (h = da("display", n)),
          ("flex" == h || "inline-flex" == h) &&
            tn.addClass("wyp-flex-container"),
          ("grid" == h || "inline-grid" == h) &&
            tn.addClass("wyp-grid-element"),
          0 < n.parent().length)
        ) {
          var y = n.parent().css("display");
          ("flex" == y || "inline-flex" == y) &&
            tn.addClass("wyp-flex-element");
        }
        setTimeout(function () {
          o.throttle(Be(), 32);
        }, window.YellowDelay);
      }
      "column-count" == e && 0 == g && (g = 1),
        "spacing-type" == e &&
          !1 == o("#spacing-type-group").find(".ra.active").length &&
          (f = "padding"),
        "transform-type" == e &&
          !1 == o("#transform-type-group").find(".ra.active").length &&
          (f = "move"),
        "filter-type" == e &&
          !1 == o("#filter-type-group").find(".ra.active").length &&
          (f = "color-effects"),
        "motion-type" == e &&
          !1 == o("#motion-type-group").find(".ra.active").length &&
          (f = "animation");
      var w = fi(f).replace(/(\.|\,)/g, "");
      ("rgba(0, 0, 0, 0)" == f || "rgba(0,0,0,0)" == f) && (f = "transparent");
      var v;
      if (
        ("border-style" == e &&
          null == f &&
          ((f = "solid"),
          (v = da("borderTopStyle", n)),
          v == da("borderLeftStyle", n) &&
            v == da("borderRightStyle", n) &&
            v == da("borderBottomStyle", n) &&
            (f = v)),
        "border-width" == e &&
          null == f &&
          ((f = "0px"),
          (g = 0),
          (v = da("borderTopWidth", n)),
          v == da("borderLeftWidth", n) &&
            v == da("borderRightWidth", n) &&
            v == da("borderBottomWidth", n) &&
            ((f = v), (g = mi(v)))),
        "border-color" == e &&
          null == f &&
          ((f = da("color", n)),
          (v = da("borderTopColor", n)),
          v == da("borderLeftColor", n) &&
            v == da("borderRightColor", n) &&
            v == da("borderBottomColor", n) &&
            (f = v)),
        "margin-left" == e || "margin-right" == e)
      ) {
        var x = Gi.width(),
          _ = parseFloat(da("marginLeft", n)),
          k = parseFloat(da("width", n));
        x == 2 * _ + k && 0 < _
          ? ((f = "auto"), (g = 0))
          : 0 < n.parent().length &&
            parseFloat(n.parent().width()) == 2 * _ + k &&
            0 < _ &&
            ((f = "auto"), (g = 0));
      }
      if (
        ("text-align" == e && "start" == f && (f = "left"),
        "animation-play" == e &&
          ((f = c),
          "yp_onscreen" == c || "yp-onscreen" == c
            ? o("#--animation-trigger-repeat-group").addClass("hidden-option")
            : o("#--animation-trigger-repeat-group").removeClass(
                "hidden-option"
              )),
        "--animation-trigger-repeat" == e && "" == f && ((f = "1"), (g = 1)),
        "animation-name" == e &&
          "none" != f &&
          "animationGeneratorTestAnimate" != f)
      ) {
        (window.ypData["wyp-force-hide-select-ui"] = !0),
          Ji.addClass("wyp-hid-bor-n"),
          o(".anim-player-icon")
            .removeClass("icon-controls-play")
            .addClass("icon-controls-pause");
        var C = n.css("animationDuration"),
          z = n.css("animationDelay"),
          O = ft(C, z);
        (z = !1 === O ? (J(z) ? 0 : Wt(z)) : O),
          (C = J(C) ? 1e3 : Wt(C)),
          (C = parseFloat(C) + parseFloat(z)),
          0 === C && (C = 1e3),
          (C += 100),
          Yi(),
          (window.animationTimer2 = setTimeout(function () {
            (window.ypData["wyp-force-hide-select-ui"] = void 0),
              Ji.removeClass("wyp-hid-bor-n"),
              Ni(),
              Ze(),
              o(".anim-player-icon")
                .removeClass("icon-controls-pause")
                .addClass("icon-controls-play"),
              !1 == window.ypData["wyp-if-movleav"] &&
                setTimeout(function () {
                  We(200);
                }, 300);
          }, C));
      }
      if (
        ("text-shadow" == e && o("#wyp-text-shadow").css(e, f),
        "filter" == r &&
          ((null === f || "none" == f || void 0 === f) &&
            (f = da("-webkit-filter", n)),
          "none" != f && null !== f && void 0 !== f
            ? ((f = f.match(new RegExp(l + "\\((.*?)\\)", "g"))),
              K(f)
                ? ((f = f
                    .toString()
                    .replace("deg", "")
                    .replace("hue-rotate(", "")
                    .replace(")", "")),
                  (f = mi(f)),
                  (g = f))
                : ((f = "disable"), (g = 0)))
            : ((f = "disable"), (g = 0))),
        "backdrop-filter" == r &&
          ((null === f || "none" == f || void 0 === f) &&
            (f = da("-webkit-backdrop-filter", n)),
          "none" != f && null !== f && void 0 !== f
            ? ((f = f.match(new RegExp(l + "\\((.*?)\\)", "g"))),
              K(f)
                ? ((f = f
                    .toString()
                    .replace("deg", "")
                    .replace("hue-rotate(", "")
                    .replace(")", "")),
                  (f = mi(f)),
                  (g = f))
                : ((f = "disable"), (g = 0)))
            : ((f = "disable"), (g = 0))),
        "font-weight" == e &&
          ("bolder" == f && (f = "700"),
          "bold" == f && (f = "600"),
          "normal" == f && (f = "400"),
          "lighter" == f && (f = "300")),
        "transform" == r)
      ) {
        f = m;
        var D = null;
        if (S()) {
          for (
            var A = parseInt(tn.attr("data-anim-scene").replace("scene-", "")),
              T = 0,
              E;
            6 > T;
            T++
          )
            if (
              ((E = Gi.find(".scene-" + (A - T) + " .scenes-transform-style")),
              0 < E.length)
            ) {
              D = E.last().text();
              break;
            }
          null != D && (f = Vt(D));
        }
        "none" != f && !1 !== f && void 0 !== f
          ? ((f = f.match(new RegExp(l + "\\((.*?)\\)", "gi"))),
            K(f)
              ? ((f = f.toString()), (f = mi(f)), (g = f))
              : ((f = "disable"), (g = 0)))
          : ((f = "disable"), (g = 0));
      }
      if ("animation-duration" == e && !0 === S() && ("0s" == f || "0ms" == f))
        return !1;
      ("min-width" == e || "min-height" == e) &&
        0 == parseFloat(f) &&
        (f = "auto");
      var L;
      if (
        ("bottom" == e &&
          ((L = parseInt(
            parseFloat(da("top", n)) + parseFloat(da("bottom", n))
          )),
          (0 === L || L == parseInt(o("#iframe").height() - n.height())) &&
            (f = "auto")),
        "right" == e &&
          ((L = parseInt(
            parseFloat(da("left", n)) + parseFloat(da("right", n))
          )),
          (0 === L || L == parseInt(o("#iframe").width() - n.width())) &&
            (f = "auto")),
        "box-shadow" == r && "none" != f && null !== f && void 0 !== f)
      ) {
        "box-shadow-color" == e &&
          (!1 == /(rgb|\#)/g.test(f) && (f = "transparent"),
          -1 == f.indexOf("#")
            ? -1 != f.indexOf("rgb") &&
              (f = f.match(/rgb(.*?)\((.*?)\)/g).toString())
            : -1 == f.split("#")[1].indexOf("inset")
            ? (f = o.trim(f.split("#")[1]))
            : (f = o.trim(f.split("#")[1].split(" ")[0])),
          (-1 != f.indexOf("rgba(0,0,0,0)") ||
            -1 != f.indexOf("rgba(0, 0, 0, 0)")) &&
            (f = "transparent"),
          (-1 != f.indexOf(",rgba") || -1 != f.indexOf(",rgb")) &&
            (f = f.split(",")[0]),
          /\,/g.test(f.replace(/rgba?\((.*?)\)/g, "")) &&
            (f = f.split(",")[0]));
        var B = f
          .replace(/rgb(.*?)\((.*?)\) /g, "")
          .replace(/ rgb(.*?)\((.*?)\)/g, "")
          .replace(/inset /g, "")
          .replace(/ inset/g, "");
        "box-shadow-horizontal" == e && ((f = B.split(" ")[0]), (g = mi(f))),
          "box-shadow-vertical" == e && ((f = B.split(" ")[1]), (g = mi(f))),
          "box-shadow-blur-radius" == e && ((f = B.split(" ")[2]), (g = mi(f))),
          "box-shadow-spread" == e && ((f = B.split(" ")[3]), (g = mi(f)));
      }
      var M;
      "line-height" == e &&
        "px" == w &&
        ((M = parseFloat(da("font-size", n))),
        isNaN(M) && (M = 0),
        (g /= M),
        (f = g + "em"),
        (w = "em")),
        "line-height" == e &&
          "normal" == w &&
          ((M = parseFloat(da("font-size", n))),
          isNaN(M) && (M = 0),
          (M = Math.round(1.33333333333 * M)),
          (g = M),
          (f = M + "px"),
          (w = "px")),
        "box-shadow-inset" == e &&
          (J(f)
            ? (f = "no")
            : -1 == f.indexOf("inset")
            ? (f = "no")
            : (f = "inset"));
      var Z = o("#wyp-" + e),
        R = Z.parent().parent();
      void 0 === da(e, n) &&
        0 < Gi.find("." + r + "-" + e + "-style").length &&
        ((f = m), (g = mi(f)));
      var I, Y, N;
      if (Z.hasClass("gr-bu-in")) {
        Z.val(f);
        var H = f.split(" "),
          W = [];
        for (N = 0; N < H.length; N++)
          Math.ceil(10 * parseFloat(H[N])) / 10 ==
            Math.ceil(10 * parseFloat(H[0])) / 10 &&
            -1 != H[N].indexOf("px") &&
            -1 != H[0].indexOf("px") &&
            W.push("1fr");
        var F = !0;
        if (W.length == H.length) {
          H = W;
          var j = da("grid-auto-rows"),
            X = da("grid-auto-columns");
          if ("none" != j && "auto" != j && "grid-template-rows" == e) {
            for (N = 0; N < H.length; N++) H[N] = j;
            F = !1;
          }
          if ("none" != X && "auto" != X && "grid-template-columns" == e) {
            for (N = 0; N < H.length; N++) H[N] = X;
            F = !1;
          }
        } else "none" == H[0] && (H = ["auto"]);
        var V = R.find(".gr-bu-ar");
        V.empty(), (h = da("display", n));
        var U = 0;
        U = "grid" == h ? parseInt(n.width()) : parseInt(n.parent().width());
        var q = H.length,
          $,
          G;
        for (N = 0; N < q; N++) {
          ($ = ""),
            -1 != H[N].indexOf("px") && "0px" != H[N] && "0" != H[N]
              ? !0 == F
                ? (($ = (100 / U) * parseFloat(H[N])),
                  ($ = Math.floor(100 * $) / 100),
                  (G =
                    "<option value='fr' selected>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto'>auto</option>"))
                : (($ = parseFloat(H[N])),
                  (G =
                    "<option value='fr'>fr</option><option value='%'>%</option><option value='px' selected>px</option><option value='auto'>auto</option>"))
              : -1 != H[N].indexOf("auto") || "0px" == H[N] || "0" == H[N]
              ? (($ = ""),
                (G =
                  "<option value='fr'>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto' selected>auto</option>"))
              : -1 == H[N].indexOf("fr")
              ? -1 != H[N].indexOf("%") &&
                (($ = parseFloat(H[N])),
                (G =
                  "<option value='fr'>fr</option><option value='%' selected>%</option><option value='px'>px</option><option value='auto'>auto</option>"))
              : (($ = parseFloat(H[N])),
                (G =
                  "<option value='fr' selected>fr</option><option value='%'>%</option><option value='px'>px</option><option value='auto'>auto</option>"));
          var Q = "this-grid";
          2 > q && (Q = "this-grid last-grid"),
            V.append(
              "<div class='" +
                Q +
                "'><input class='this-grid-input' placeholder='auto' type='number' min='1' value='" +
                $ +
                "' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' /><div class='grid-format-div'><select class='grid-format'>" +
                G +
                "</select></div><span class='yicon icon-no-alt delete-grid'></span></div>"
            ),
            "auto" == V.find(".this-grid").last().find(".grid-format").val() &&
              V.find(".this-grid")
                .last()
                .find(".this-grid-input")
                .prop("disabled", !0);
        }
        if (
          (V.append(
            "<span class='grid-builder-add-new yicon icon-plus'></span>"
          ),
          0 < V.find(".this-grid").length &&
            0 < V.find('.grid-format option[value="fr"][selected]').length)
        ) {
          var ee = null,
            te = !0;
          V.find('.grid-format option[value="fr"][selected]').each(function () {
            var e = o(this)
              .parents(".this-grid")
              .find(".this-grid-input")
              .val();
            return null != ee && ee != e ? ((te = !1), !1) : void (ee = e);
          }),
            !0 == te &&
              V.find('.grid-format option[value="fr"][selected]').each(
                function () {
                  o(this)
                    .parents(".this-grid")
                    .find(".this-grid-input")
                    .val("1");
                }
              );
        }
      } else if (Z.hasClass("sl-d")) {
        if (
          ("animation-duration" == e && -1 != f.indexOf(",")
            ? ((f = "1s"),
              (w = "s"),
              (g = "1"),
              o("#animation-duration-group").addClass("hidden-option"))
            : "animation-duration" == e &&
              o("#animation-duration-group").removeClass("hidden-option"),
          "animation-delay" == e && -1 != f.indexOf(",")
            ? ((f = "0s"),
              (w = "s"),
              (g = "0"),
              o("#animation-delay-group").addClass("hidden-option"))
            : "animation-delay" == e &&
              o("#animation-delay-group").removeClass("hidden-option"),
          ("inline" != da("display", n) ||
            -1 != da("display", n).indexOf("table")) &&
            "height" == e &&
            0 < n.children().length &&
            12 > n.children().length)
        ) {
          var ae = da("height", n),
            ie;
          n.children().each(function () {
            if (((ie = o(this).css("height")), ae == ie))
              return (f = "auto"), !1;
          });
        }
        (w = o.trim(w)),
          ("" === w || "px .px" == w || "px px" == w) && (w = "px"),
          -1 != w.indexOf("px") && (w = "px"),
          "" == g && "scale-transform" == e && (g = 1),
          "" == g && "brightness-filter" == e && (g = 1),
          "" == g && "contrast-filter" == e && (g = 1),
          "" == g && "saturate-filter" == e && (g = 1),
          "" == g && "brightness-backdrop-filter" == e && (g = 1),
          "" == g && "contrast-backdrop-filter" == e && (g = 1),
          "" == g && "saturate-backdrop-filter" == e && (g = 1),
          "" == g && "opacity" == e && (g = 1),
          "" == g && (g = 0);
        var se = R.data("px").split(","),
          oe = parseInt(se[0]),
          re = parseInt(se[1]);
        if (
          (g < oe && (oe = g),
          g > re && (re = g),
          ("width" == e ||
            "max-width" == e ||
            "min-width" == e ||
            "height" == e ||
            "min-height" == e ||
            "max-height" == e) &&
            ((re = parseInt(re) + 1.5 * parseInt(re)),
            (oe = parseInt(oe) + 1.5 * parseInt(oe))),
          "inline" != da("display", n))
        ) {
          if (
            "width" == e &&
            0 < n.parent().length &&
            "px" == w &&
            "inline" != n.parent().css("display") &&
            "inline-flex" != n.parent().css("display") &&
            -1 == n.parent().css("display").indexOf("table")
          ) {
            var le = n.parent().width();
            le == parseInt(g) && ((g = "100"), (w = "%")),
              parseInt(le / 2) == parseInt(g) && ((g = "50"), (w = "%")),
              parseInt(le / 4) == parseInt(g) && ((g = "25"), (w = "%")),
              parseInt(le / 5) == parseInt(g) && ((g = "20"), (w = "%"));
          }
          "height" == e &&
            parseInt(o(window).height()) == parseInt(g) &&
            "px" == w &&
            ((g = "100"), (w = "vh"));
        }
        "%" == w || "vh" == w || "vw" == w
          ? ((se = o("#" + e + "-group")
              .attr("data-pc")
              .split(",")),
            (oe = se[0]),
            (re = se[1]))
          : "em" == w &&
            ((se = o("#" + e + "-group")
              .attr("data-em")
              .split(",")),
            (oe = se[0]),
            (re = se[1])),
          (g = Math.floor(100 * g) / 100),
          (w = w.replace(/\./g, "")),
          "px" == w &&
            ("width" == e ||
              "height" == e ||
              "min-width" == e ||
              "min-height" == e ||
              "max-width" == e ||
              "max-height" == e ||
              "font-size" == e ||
              -1 != e.indexOf("margin-") ||
              -1 != e.indexOf("padding-") ||
              /border(.*?)?width/g.test(e) ||
              -1 != e.indexOf("-radius") ||
              -1 != e.indexOf("z-index") ||
              "column-count" == e ||
              "top" == e ||
              "right" == e ||
              "bottom" == e ||
              "left" == e) &&
            (g = parseInt(g)),
          Z.slider({
            min: parseInt(oe),
            max: parseInt(re),
            value: parseFloat(g),
          }),
          Z.slider("value", g);
        var de = be(R);
        if (m == de || f == de) {
          Z.slider("value", de);
          var pe = parseFloat(de);
          !1 === isNaN(pe) ? Z.slider("value", pe) : Z.slider("value", 0),
            o("#" + e + "-value")
              .val(de)
              .attr("data-last-val", g),
            o("#" + e + "-after").val("-");
        } else
          Z.slider("value", g),
            o("#" + e + "-value").val(g),
            o("#" + e + "-after").val(w);
        o("#" + e + "-after").hasClass("autogrow")
          ? o("#" + e + "-after").trigger("autogrow")
          : o("#" + e + "-after")
              .autoGrowInput({ minWidth: 15, maxWidth: 32 })
              .addClass("autogrow");
      } else if (Z.hasClass("in-ac")) {
        var ce, ue;
        "font-family" == e &&
          "undefined" != typeof f &&
          ((ce = P(f)),
          (ue = f),
          (f = o.trim(f.replace(/"/g, "").replace(/'/g, "")))),
          K(f) &&
            ("font-family" == e &&
              (mt(ue) || !1 == Ft(t, "font-family", [!0, !1], u)
                ? o("#include-webfont-label").css("display", "none")
                : o("#include-webfont-label").css("display", "inline-block"),
              Ft(t, "--google-webfont", [!0, !1], u)
                ? o("#include-webfont-label input").prop("checked", !1)
                : o("#include-webfont-label input").prop("checked", !0)),
            0 === o("#wyp-font-load-" + Wn(ce)).length &&
              "font-family" == e &&
              !1 === mt(ue) &&
              Qi.append(
                "<link rel='stylesheet' id='wyp-font-load-" +
                  Wn(ce.replace(/ /g, "+")) +
                  "'  href='https://fonts.googleapis.com/css2?family=" +
                  ce.replace(/ /g, "+") +
                  ":ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' type='text/css' media='all' />"
              ),
            Z.val(f),
            "font-family" == e &&
              o("#wyp-font-family,#wyp-font-weight").each(function () {
                o(this).css("fontFamily", ue);
              })),
          null === Z.val() && void 0 !== f && Z.val(f);
      } else if (Z.hasClass("ra-c")) {
        if ("disable" == f) R.find(".di-btn").trigger("click");
        else {
          if (
            ("background-size" == e &&
              "cover" != f &&
              "contain" != f &&
              (f = "auto"),
            "flex" == e)
          ) {
            var me = n.css(["flex-grow", "flex-shrink", "flex-basis"]);
            f =
              me["flex-grow"] +
              " " +
              me["flex-shrink"] +
              " " +
              me["flex-basis"];
          }
          pt(Z, e, f);
        }
      } else if (Z.hasClass("co-p")) {
        "box-shadow-color" == e &&
          (void 0 === f || !1 === f || "none" == f || "" == f) &&
          (f = da("color", n));
        var fe = "rgba(0,0,0,0)";
        if (
          (K(f) &&
            (-1 == f.indexOf("#") && -1 != f.indexOf("rgb")
              ? (fe = Pi(f))
              : "transparent" != f &&
                "none" != f &&
                "inherit" != f &&
                (fe = f)),
          Z.val(fe),
          "transparent" == f || "none" == f || "inherit" == f)
        )
          Z.iris("color", "rgba(0,0,0,0)");
        else {
          Z.iris("color", f);
          var ge = 1;
          -1 != f.indexOf("rgba") &&
            (ge = f.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")[3]),
            -1 != f.indexOf("rgba") && 0 != ge
              ? o(".information.hex").removeClass("hex").addClass("rgb")
              : o(".information.rgb").removeClass("rgb").addClass("hex");
        }
        Z.parent().find(".co-sw-co").css("backgroundColor", fe),
          ("transparent" == f || "" == f || "none" == m) &&
            Z.parent().find(".co-sw-co").css("backgroundColor", "transparent"),
          "box-shadow-color" == e &&
            o("#box-shadow-color-group .co-sw-co").css("backgroundColor", f);
      } else
        (Z.hasClass("wyp-input") || Z.hasClass("wyp-textarea")) &&
          ("disable" != f &&
          "background-image" == e &&
          f != window.location.href &&
          -1 == f.indexOf("gradient(") &&
          -1 == f.indexOf("yellow_pencil_frame")
            ? ((I = o(document).find("#iframe").attr("src")),
              (Y = f
                .replace(/"/g, "")
                .replace(/'/g, "")
                .replace(/url\(/g, "")
                .replace(/\)/g, "")),
              I == Y && (f = ""),
              !0 == /url\((\"|\')?(.*?)(\"|\')?\)/i.test(f) &&
                (f = f.match(/url\((\"|\')?(.*?)(\"|\')?\)/i)[0]),
              Z.val(
                f
                  .replace(/"/g, "")
                  .replace(/'/g, "")
                  .replace(/url\(/g, "")
                  .replace(/\)/g, "")
              ),
              o(".wyp-bg-ast").removeClass("active"),
              -1 == f.indexOf("yellow-pencil")
                ? ne(f)
                : (o(
                    ".wyp-bg-ast[data-url='" +
                      f
                        .replace(/"/g, "")
                        .replace(/'/g, "")
                        .replace(/url\(/g, "")
                        .replace(/\)/g, "") +
                      "']"
                  ).addClass("active"),
                  o(".wyp-background-image-show").hide()))
            : o(".wyp-background-image-show").hide(),
          "disable" != f &&
            "list-style-image" == e &&
            f != window.location.href &&
            ((I = o(document).find("#iframe").attr("src")),
            (Y = f
              .replace(/"/g, "")
              .replace(/'/g, "")
              .replace(/url\(/g, "")
              .replace(/\)/g, "")),
            I == Y && (f = ""),
            Z.val(
              f
                .replace(/"/g, "")
                .replace(/'/g, "")
                .replace(/url\(/g, "")
                .replace(/\)/g, "")
            )),
          "background-image" == e &&
            -1 != f.indexOf("gradient(") &&
            ((f = zt(f)),
            Z.val(f),
            o(".wyp-gradient-demo").removeClass("active"),
            0 < o(".wyp-gradient-demo[data-gradient='" + f + "']").length &&
              o(".wyp-gradient-demo[data-gradient='" + f + "']").addClass(
                "active"
              ),
            Ot(f)),
          "" == m && "none" == f && Z.val(""),
          "" == Z.val() || "none" == Z.val()
            ? Z.parent().addClass("empty-input")
            : Z.parent().removeClass("empty-input"));
      ("inherit" == m ||
        "auto" == m ||
        "unset" == m ||
        "auto" == m ||
        "initial" == m) &&
        Z.hasClass("sl-d") &&
        R.find(".wyp-after").hide();
      var d = qt(e)[0];
      ("color" == e ||
        "background-color" == e ||
        "background-image" == e ||
        "box-shadow" == d ||
        "border-color" == e ||
        "text-shadow" == e ||
        -1 != d.indexOf("-radius") ||
        "filter" == d ||
        "backdrop-filter" == d) &&
        n.removeClass("wyp-no-wf");
    });
  }
  function ca(e, t) {
    t = o.trim(t);
    var a = "px";
    return (
      ("animation-delay" == e ||
        "animation-duration" == e ||
        "transition-duration" == e) &&
        (a = "s"),
      -1 == window.validUnits.indexOf(t) ? a : t
    );
  }
  function ua(e) {
    var t = [];
    if (
      ((e = o.trim(e)),
      (e = e.replace(/\s\s+/g, " ")),
      (e = e.replace(/(\s)?(\>|\,|\+|\~)(\s)?/g, "$2")),
      (e = e.replace(/\>/g, " ")),
      (e = o.trim(e)),
      -1 != e.indexOf(" "))
    )
      for (var a = e.split(" "), n = 0, s; n < a.length; n++)
        (s = o.trim(a[n])), t.push(s);
    else t.push(e);
    var r = [];
    return (
      o.each(t, function (e, t) {
        r.push(t.replace(/\~/g, " ~ ").replace(/\+/g, " + "));
      }),
      r
    );
  }
  function ma(e) {
    var t = [];
    if (((e = o.trim(e)), (e = e.replace(/\s\s+/g, " ")), -1 != e.indexOf(" ")))
      for (var a = e.split(" "), n = 0, s; n < a.length; n++)
        (s = o.trim(a[n])), t.push(s);
    else t.push(e);
    return t;
  }
  function fa(e, t) {
    t = t.replace(/ /g, "  ");
    for (var n = 0, s; n < e.length; n++)
      (s = new RegExp("(\\s|^)" + e[n] + "(\\s|$)", "gi")),
        (t = t.replace(s, " "));
    return t.trim();
  }
  function ga(e, t) {
    if ("cursor" === window.ypData.inspector) {
      if (/\(\!singleInspector\)/g.test(e)) return !1;
      e = e.replace(/\(\!singleInspector\)/g, "");
    } else {
      if (/\(singleInspector\)/g.test(e)) return !1;
      e = e.replace(/\(singleInspector\)/g, "");
    }
    e = e.replace(/\(\!?singleInspector\)/g, "");
    var a = new RegExp("(\\s|^)" + e + "(\\s|$)", "gi");
    return !!a.test(t);
  }
  function ha(e) {
    if (!1 === e || null === e || void 0 === e) return e;
    e = e.replace(
      /(@|\\|\.|\/|!|\*|#|\+|\$|%|&|\(|\)|:|;|<|=|>|\?|\[|\]|\^|~|\|)/g,
      "\\$1"
    );
    for (var t = ma(e), a = [], n = 0, s; n < t.length; n++)
      (s = o.trim(t[n])), !1 == /("|'|{|}|,)/g.test(s) && a.push(s);
    return a.join(" ");
  }
  function ya(e) {
    e = o(e);
    var t = e.attr("data-wyp-slctr"),
      a = 0,
      i = 0,
      n = "",
      s = e.attr("class"),
      r,
      d;
    return (
      null != s &&
        null != s &&
        ((s = s.replace(/ /g, "  ")),
        (s = s
          .replace(/(^|\s)yp(-|_)(.*?)(\s|$)/g, " ")
          .replace(/(^|\s)yellow-pencil(-|_)(.*?)(\s|$)/g, " ")
          .replace(/(^|\s)(data-anim-scene|context-menu-active)(\s|$)/g, " ")),
        (s = o.trim(_i(s))),
        (i = s.length),
        (n = s.charAt(0) + s.charAt(i / 2) + s.charAt(i - 1)),
        (a = s.length + n)),
      null != t && null != t
        ? ((r = t.split("|")),
          r[1] == a
            ? (d = r[0])
            : ((d = wa(e)),
              window.isDynamicSelectorsReady &&
                e.attr("data-wyp-slctr", d + "|" + a)))
        : ((d = wa(e)),
          window.isDynamicSelectorsReady &&
            e.attr("data-wyp-slctr", d + "|" + a)),
      d
    );
  }
  function wa(t) {
    var a = "",
      r = "",
      l = /\d+/,
      c,
      g,
      h,
      y,
      w,
      b,
      x,
      _;
    if (
      ((h = t),
      (_ = h.attr("class")),
      void 0 !== _ && null !== _ && (_ = o.trim(Ii(ha(_)))),
      (c = h.attr("id")),
      (g = h.prop("tagName").toLowerCase()),
      "body" == g || "html" == g)
    )
      return g;
    if (K(c)) {
      if (((c = o.trim(ha(c))), l.test(c))) {
        for (var k = !1, C = 0; C < Mn.length; C++) {
          if (/el-([a-zA-Z0-9_-]+)/g.test(c))
            if (void 0 === _ || null === _) continue;
            else if (-1 == _.indexOf("vce-row")) continue;
          if (ga(Mn[C], c)) {
            k = !0;
            break;
          }
        }
        !1 == k && (c = "");
      }
      if (
        (!1 == /^(nf-form-|nf-field-([0-9]+)-wrap)$/g.test(c) &&
          0 < window.idList.length &&
          5 < c.length &&
          -1 != window.idList.indexOf(c) &&
          (c = ""),
        "" != c)
      )
        for (var z = 0; z < Zn.length; z++)
          if (ga(Zn[z], c)) {
            c = "";
            break;
          }
      if ("" != c) return "#" + c;
    }
    var O;
    if (void 0 !== _ && null !== _) {
      if (((O = ma(_)), 0 < window.ClassList.length))
        for (var D = 0; D < O.length; D++)
          -1 != window.ClassList.indexOf(O[D]) &&
            5 < O[D].length &&
            delete O[D];
      _ = O.join(" ").trim();
    }
    K(O) && ((a = _), 1 < a.length && (a = fa(An, a)), (a = o.trim(a)));
    var A = !1,
      S = !1,
      T;
    "" != a &&
      ((A = !0),
      (T = a),
      K(T) && (1 < T.length && (T = fa(Sn, T)), (T = o.trim(T)))),
      "" != o.trim(T) && (S = !0);
    var E = ma(a),
      L = ma(T),
      B = !1,
      M,
      Z,
      P;
    for (y = !1, M = 0; M < E.length; M++)
      if (((P = E[M]), (B = !1), l.test(P) && (B = !0), B))
        for (Z = 0; Z < Bn.length; Z++)
          if (!0 == ga(Bn[Z], P)) {
            r += " " + P;
            break;
          }
    if (S)
      for (M = 0; M < L.length; M++) {
        (P = L[M]), (B = !1), l.test(P) && (B = !0);
        for (var R = 0; R < En.length; R++)
          if (!0 == B && !0 == ga(En[R], P)) {
            B = !1;
            break;
          }
        if (B) {
          for (y = !0, Z = 0; Z < Ln.length; Z++)
            if (!0 == ga(Ln[Z], P)) {
              y = !1;
              break;
            }
          y && (r += " " + P);
        }
      }
    var I = ma(r),
      Y,
      N;
    if (A) {
      var H = [],
        W = [];
      for (M = 0; M < E.length; M++) l.test(E[M]) || H.push(E[M]);
      if (((Y = E), (N = a), (E = H), (a = E.join(" ")), S)) {
        for (M = 0; M < L.length; M++) l.test(L[M]) || W.push(L[M]);
        L = W;
      }
    }
    var F, X;
    if (S)
      for (b = !1, M = 0; M < L.length; M++) {
        for (F = 0; F < Dn.length; F++)
          if (ga(Dn[F], L[M])) {
            if ("post" == L[M] && -1 != L.indexOf("hentry")) break;
            (b = !0), (w = "." + L[M]);
            break;
          }
        if (b) break;
      }
    if (!1 == b && !0 == A)
      for (M = 0; M < E.length; M++) {
        for (F = 0; F < Dn.length; F++)
          if (ga(Dn[F], E[M])) {
            (b = !0), (w = "." + E[M]);
            break;
          }
        if (b) break;
      }
    if ("" != r) {
      x = !1;
      for (var V = 0; V < I.length; V++) {
        for (X = 0; X < Bn.length; X++) {
          if (void 0 !== _ && null !== _) {
            if (-1 != Bn[X].indexOf("kc-css") && !1 == /(kc_row)/g.test(_))
              continue;
            if (
              -1 != Bn[X].indexOf("fl-node") &&
              !1 == /(fl-row|fl-col)/g.test(_)
            )
              continue;
            if (
              -1 != Bn[X].indexOf("e([0-9-]+)") &&
              !1 == /(x-section)/g.test(_)
            )
              continue;
          }
          if (!0 == ga(Bn[X], I[V])) {
            (x = !0), (w = "." + I[V]);
            break;
          }
        }
        if (x) break;
      }
    }
    if ("" != r)
      for (X = 0; X < I.length; X++) {
        if (
          !0 == ga("elementor-element-(.*?)", I[X]) &&
          !0 == /elementor-section/i.test(_)
        ) {
          w = "." + I[X];
          break;
        }
        if (!0 == ga("e([0-9-]+)", I[X]) && /x-section/i.test(_)) {
          w = "." + I[X];
          break;
        }
        if (
          !0 == ga("ugb-([a-z-A-Z-0-9]+)", I[X]) &&
          /ugb-main-block/i.test(_)
        ) {
          w = "." + I[X];
          break;
        }
        if (
          !0 == ga("qubely-block-([a-z-A-Z-0-9]+)", I[X]) &&
          /qubely-section/i.test(_)
        ) {
          w = "." + I[X];
          break;
        }
      }
    var U;
    if ("input" == g && !1 == window.reGetBestClass) {
      var q = h.attr("type");
      "submit" != q &&
        ("single" === window.ypData.inspector
          ? ((window.reGetBestClass = !0),
            (U = ya(t)),
            K(q) && (w = "input[type=" + q + "]" + U),
            (window.reGetBestClass = !1))
          : K(q) && (w = "input[type=" + q + "]"));
    }
    "textarea" == g &&
      !1 == window.reGetBestClass &&
      ("single" === window.ypData.inspector
        ? ((window.reGetBestClass = !0),
          (U = ya(t)),
          (w = "textarea" + U),
          (window.reGetBestClass = !1))
        : (w = "textarea")),
      "select" == g &&
        !1 == window.reGetBestClass &&
        ("single" === window.ypData.inspector
          ? ((window.reGetBestClass = !0),
            (U = ya(t)),
            (w = "select" + U),
            (window.reGetBestClass = !1))
          : (w = "select"));
    for (var $ = !1, G = 0; G < Pn.length; G++)
      if (Pn[G] == g) {
        $ = g;
        break;
      }
    var J = !1;
    "" != r && (J = ba(I));
    var Q = !1;
    "single" === window.ypData.inspector &&
      ((Q = va(ba(L, !0, !1))),
      !1 == Q && (Q = va(L)),
      !1 == Q && (Q = va(ba(E, !0, !1))),
      !1 == Q && (Q = va(E)));
    var ee = !1,
      te,
      ae;
    if (
      ((ee = ba(L, !1, !1)),
      !1 == ee && (ee = ba(E, !1, !1)),
      void 0 !== _ &&
        null !== _ &&
        /(^|\s)kc_column($|\s)/i.test() &&
        (w = ".kc_column"),
      K(w))
    )
      return w;
    if (!1 != Q) return Q;
    if (!1 != ee) return ee;
    if (!1 != $) return $;
    if (!1 != J) return J;
    if ("div" != g) return g;
    if ("" != a && null != a) {
      for (te = ba(E), ae = !0, Z = 0; Z < Ln.length; Z++)
        if (!0 == ga(Ln[Z], te.replace(/^(\.|#)/g, ""))) {
          ae = !1;
          break;
        }
      return ae ? te : g;
    }
    if ("" != N && null != N) {
      for (te = ba(Y), ae = !0, Z = 0; Z < Ln.length; Z++)
        if (!0 == ga(Ln[Z], te.replace(/^(\.|#)/g, ""))) {
          ae = !1;
          break;
        }
      return ae ? te : g;
    }
    return g;
  }
  function va(e) {
    if (!1 === e || "" == e) return !1;
    var t = e.sort(function (e, t) {
      return Ji.find("." + e).length - Ji.find("." + t).length;
    });
    return 1 == Ji.find("." + t[0]).length && "." + t[0];
  }
  function ba(e, t, a) {
    if (0 == e.length) return !1;
    if (1 == e.length && !0 == a) return !1;
    if (!1 == t) {
      if (1 == e.length && !1 == a) return !!(1 < e[0].length) && "." + e[0];
    } else if (1 == e.length && !1 == a) return !!(1 < e[0].length) && e;
    var n = [],
      s = [],
      r = [],
      l = [],
      d = [],
      p = [],
      c = [],
      u;
    for (u = 0; u < e.length; u++)
      if (((r = []), (l = []), !/(\,|\[|\]|\#)/g.test(e[u]))) {
        Gi.find("." + e[u]).each(function () {
          var e = o(this);
          r.push(e.parents().length), l.push(e.prop("tagName"));
        });
        var m = r.every(function (e, t, i) {
            return e === i[0];
          }),
          f = l.every(function (e, t, i) {
            return e === i[0];
          });
        m && f && n.push(e[u]);
      }
    for (0 == n.length && (n = e), u = 0; u < n.length; u++)
      !1 == /\_/g.test(n[u]) && !0 == /\-/g.test(n[u]) && p.push(n[u]);
    if (0 == p.length) {
      for (u = 0; u < n.length; u++)
        !1 == /\-/g.test(n[u]) && !0 == /\_/g.test(n[u]) && c.push(n[u]);
      s = 0 == c.length ? n : c;
    } else s = p;
    for (u = 0; u < s.length; u++) !1 == /(.)\1\1/.test(s[u]) && d.push(s[u]);
    return (
      0 == d.length && (d = n),
      d.sort(function (e, t) {
        return t.length - e.length;
      }),
      t ? d : "." + xa(d)
    );
  }
  function xa(e) {
    var t = e[0],
      a =
        e[0].split(/[-_]/)[0] +
        e[0].charAt(e[0].split(/[-_]/)[0].length) +
        e[0].split(/[-_]/)[1],
      n = null,
      s = null,
      o = !1,
      r = Gi,
      l,
      d,
      c;
    for (
      l = 2;
      l < e[0].split(/[-_]/).length - 1 &&
      ((a = a + e[0].charAt(a.length) + e[0].split(/[-_]/)[l]),
      (n = e[0].split(/[-_]/)[e[0].split(/[-_]/).length - l]),
      !(3 > n.length || !0 == /(\d|current|active)/g.test(n)));
      l++
    ) {
      for (d = 0; d < e.length; d++)
        if (e[d] === a) {
          (t = a), (o = !0);
          break;
        }
      if (o) break;
    }
    if (!1 == o && null != e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 2])
      for (
        c =
          e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 2] +
          e[0].charAt(
            e[0].length -
              e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 1].length -
              1
          ) +
          e[0].split(/[-_]/)[e[0].split(/[-_]/).length - 1],
          l = e[0].split(/[-_]/).length - 1;
        2 < l &&
        ((c =
          e[0].split(/[-_]/)[l - 2] +
          e[0].charAt(e[0].length - c.length - 1) +
          c),
        (s = e[0].split(/[-_]/)[e[0].split(/[-_]/).length - l - 1]),
        !(3 > s.length || !0 == /(\d|current|active)/g.test(s)));
        l--
      ) {
        for (d = 0; d < e.length; d++)
          if (e[d] === c) {
            t = c;
            break;
          }
        if (o) break;
      }
    var u = _();
    return (
      u && 0 < u.length && (r = u.parent()),
      r.find("." + e[0]).length == r.find("." + t).length ? t : e[0]
    );
  }
  function _a(e) {
    var t = window.ypData["data-clickable-select"],
      a = !1;
    if (
      ((e =
        !0 == e
          ? tn.hasAttr("data-wyp-selector")
            ? tn.attr("data-wyp-selector")
            : ""
          : ""),
      K(t))
    ) {
      if (!1 == Ca(t, !0, !1, !1)) a = Ma(null, "default") + e;
      else return t + e;
    } else if (((a = Ma(null, "default") + e), !C())) return a;
    return C() && !1 != a
      ? (0 == Gi.find(".wyp-selected-others").length &&
          1 < Gi.find(a).length &&
          (tn.addClass("wyp-single-inspector-active"),
          (window.ypData.inspector = "single"),
          (a = Ma(null, "default") + e),
          tn.removeClass("wyp-single-inspector-active"),
          (window.ypData.inspector = "default")),
        L(a),
        Q(a, _(), !0),
        a)
      : void 0;
  }
  function ka(e) {
    return e
      .replace(/[\u2018\u2019\u2032]/g, "'")
      .replace(/[\u201c\u201d\u2033]/g, '"');
  }
  function Ca(e, t, a, i) {
    if (J(e)) return !!i && qi.selector_no_match;
    e = xi(e, !0, !0, !0);
    try {
      var n;
      return (
        (n = a ? Ji.find(e) : Gi.find(e)),
        !0 == t && 0 == n.length ? !!i && qi.selector_no_match : !!i || n
      );
    } catch (t) {
      return !!i && t.message;
    }
  }
  function za(e, t) {
    return (
      (e = e.replace(/(\r\n|\n|\r)/g, "").replace(/\t/g, "")),
      (e = e.replace(/(\/\*)(.*?)\*\//g, "")),
      (e = e.replace(/\}\s+\}/g, "}}").replace(/\s+\{/g, "{")),
      (e = e.replace(/\s+\}/g, "}").replace(/\{\s+/g, "{")),
      (e = ka(e)),
      !0 === t && (e = e.replace(/@media(.*?)\}\}/g, "")),
      e
    );
  }
  function Oa(e) {
    var t = 5,
      a = !1,
      i = null,
      n,
      s,
      r,
      l,
      d,
      p;
    return (
      !1 != window.minCrpdSlctr && (t = window.minCrpdSlctr),
      (p = ua(e)),
      p.length > t &&
        ((n = Gi.find(e).length),
        (s = -1 == e.indexOf(">") ? p : e.replace(/\s+>\s+/g, ">")),
        o.each(p, function () {
          !1 === a &&
            (-1 == e.indexOf(">")
              ? (s.shift(), (r = s.join(" ")), (d = s.length))
              : ((s =
                  !1 == /^[^\s>]+\s/.test(s)
                    ? s.replace(/\s[^\s>]+\s/, " ")
                    : s.replace(/^[^\s>]+\s/, "")),
                (r = s),
                (d = ua(s))),
            (l = Gi.find(r).length),
            n == l && (i = r),
            d <= t && n == l && ((a = !0), (e = r)));
        })),
      a
        ? (e = o.trim(e.replace(/>/g, " > ")))
        : null != i && (e = o.trim(i.replace(/>/g, " > "))),
      e
    );
  }
  function Da(e) {
    var t = an.querySelectorAll(e).length,
      a = Oa(e),
      n = [],
      s = "",
      l,
      d;
    if (-1 == e.indexOf(">"))
      (e = ua(e)), (l = e[e.length - 1]), e.pop(), (d = e[0]), e.shift();
    else return a;
    for (var p = [], c = 0, u, m; c < e.length; c++) {
      u = !0;
      for (var f = 0; f < Tn.length; f++)
        if (
          ((m = new RegExp("(\\s|^)." + Tn[f] + "(\\s|$)", "gi")), m.test(e[c]))
        ) {
          u = !1;
          break;
        }
      u && p.push(e[c]);
    }
    if (J(d) || J(d)) return a;
    if (
      (-1 == d.indexOf(" ") &&
        -1 == l.indexOf(" ") &&
        (s = _i(d + window.separator + l)),
      Ca(s, !1, !1, !1) &&
        !1 == window.minCrpdSlctr &&
        1 <= e.length &&
        0 == p.length &&
        Gi.find(s).length == t)
    )
      return s;
    if ((0 < p.length && (e = p), 1 > e.length)) return a;
    var g = [],
      h,
      y,
      w;
    for (c = 0; c < e.length; c++)
      if (/.|#/g.test(e[c])) {
        if (((h = []), (y = []), !1 == Ca(e[c], !1, !1, !1))) return !0;
        Gi.find(e[c]).each(function () {
          (w = o(this)), h.push(w.parents().length), y.push(w.prop("tagName"));
        });
        var v = h.every(function (e, t, i) {
            return e === i[0];
          }),
          b = y.every(function (e, t, i) {
            return e === i[0];
          });
        v && b && g.push(e[c]);
      }
    var x = Aa(e, n, d, l, t);
    if (1 < g.length) {
      var _ = Aa(g, n, d, l, t);
      0 < _.length && (x = _);
    }
    if (0 == n.length) return a;
    if (
      (n.sort(function (e, t) {
        return e.length - t.length;
      }),
      !1 != window.minCrpdSlctr)
    ) {
      for (var C = 0; C < n.length; C++)
        if (ua(n[C]).length >= window.minCrpdSlctr) return _i(n[C]);
      return a;
    }
    return _i(n[0]);
  }
  function Aa(e, t, a, s, o) {
    var r = e.slice(0),
      l,
      d,
      p,
      c,
      u;
    for (d = 0; d < e.length; d++)
      for (
        l = e[d],
          u = a + window.separator + l + window.separator + s,
          an.querySelectorAll(u).length == o && t.push(u),
          r.shift(),
          p = 0;
        p < r.length;
        p++
      )
        (c = r[p]),
          (u =
            a +
            window.separator +
            l +
            window.separator +
            c +
            window.separator +
            s),
          an.querySelectorAll(u).length == o && t.push(u);
    return t;
  }
  function Sa(e, t, a, i, n) {
    return (
      "LINK" != t &&
      "STYLE" != t &&
      "SCRIPT" != t &&
      "PARAM" != t &&
      "OPTION" != t &&
      "NOSCRIPT" != t &&
      "BR" != t &&
      "wyp-anim-scenes" != a &&
      "animate-test-drive" != a &&
      "wyp-animate-data" != a &&
      "yellow-pencil-canvas" != a &&
      "yellow-pencil-focus-canvas" != a &&
      "yellow-pencil-other-canvas" != a &&
      "yellow-pencil-extra-canvas" != a &&
      "elementor-device-mode" != a &&
      !(
        i.contains("wyp-x-distance-border") ||
        i.contains("wyp-y-distance-border") ||
        i.contains("hv-in-bx") ||
        i.contains("wyp-size-handle") ||
        i.contains("wyp-slct-tooltip") ||
        i.contains("wyp-slct-menu") ||
        i.contains("wyp-selected-tooltip") ||
        i.contains("wyp-tooltip-small") ||
        i.contains("wyp-helper-tooltip") ||
        i.contains("wyp-iframe-ph") ||
        i.contains("wyp-data-updated") ||
        i.contains("wyp-inline-data") ||
        i.contains("wyp-multiple-selected") ||
        i.contains("wyp-demo-link") ||
        i.contains("wyp-live-editor-link") ||
        i.contains("context-menu-active") ||
        i.contains("wyp-selected-others-multiple-box") ||
        i.contains("wyp-selected-boxed-top") ||
        i.contains("wyp-selected-boxed-bottom") ||
        i.contains("wyp-selected-boxed-left") ||
        i.contains("wyp-selected-boxed-right") ||
        i.contains("wyp-selected-boxed-margin-left") ||
        i.contains("wyp-zero-m-w") ||
        i.contains("wyp-size-handle") ||
        i.contains("wyp-selected-boxed-margin-top") ||
        i.contains("wyp-selected-boxed-margin-bottom") ||
        i.contains("wyp-selected-boxed-margin-right") ||
        i.contains("wyp-selected-boxed-padding-left") ||
        i.contains("wyp-selected-boxed-padding-top") ||
        i.contains("wyp-selected-boxed-padding-bottom") ||
        i.contains("wyp-selected-boxed-padding-right") ||
        i.contains("wyp-zero-m-h") ||
        i.contains("wyp-drw-bx") ||
        i.contains("wyp-selected-bottom") ||
        i.contains("wyp-fixed-tooltip")
      ) &&
      !/^(\s+)?(clearfix|clear|clr|clrfix)(\s+)?$/gi.test(i) &&
      "none" != e.css("display") &&
      "0" != e.css("opacity") &&
      ("DIV" != t || !1 != i || !1 != a || "BODY" != n.prop("tagName"))
    );
  }
  function Ta(e, t, a) {
    a || (a = 0);
    var i = "",
      n = [],
      s = e.children(),
      r,
      l,
      d,
      p,
      c,
      u,
      m,
      f;
    if (0 < s.length) {
      if (2 < a) return i;
      (i += t ? "<ul id='layer-tree-ul'>" : "<ul>"),
        s.each(function (a) {
          if (
            ((n = []),
            (r = o(this)),
            (u = r.prop("tagName")),
            (c = r.prop("id")),
            (p = this.classList),
            t && "BODY" !== u)
          )
            return !0;
          if ("hidden" == r.css("visibility") && "svg" === u) return !0;
          if (!1 === Sa(r, u, c, p, e)) return !0;
          (l = ya(r)),
            (d = bi(l, !1, r)),
            (m = r.children().filter(function () {
              if (
                ((f = o(this)),
                Sa(f, f.prop("tagName"), f.prop("id"), this.classList, e))
              )
                return e;
            })),
            0 < m.length && n.push("has-children"),
            "hidden" == r.css("visibility") && n.push("is-hidden"),
            (n = 0 < n.length ? "class='" + n.join(" ") + "' " : "");
          var s =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g><g><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10V0Z"></path></g></g></svg>';
          /header/i.test(d)
            ? (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)" fill="currentColor"></path><path d="M0,0H9" transform="translate(42.5 75.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>')
            : /footer/i.test(d)
            ? (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9" transform="translate(42.5 78.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>')
            : /column/i.test(d)
            ? (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9.221" transform="translate(47 81.221) rotate(-90)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>')
            : /row/i.test(d)
            ? (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9.451" transform="translate(42.274 76.79)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>')
            : /section/i.test(d) || "SECTION" == u
            ? (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-42 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(42 72)"></path><path d="M0,0H9" transform="translate(42.5 74.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path><path d="M0,0H9" transform="translate(42.5 79.5)" fill="currentColor" stroke="currentColor" stroke-width="1"></path></g></svg>')
            : "BODY" == u &&
              (s =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><g transform="translate(-32 -72)"><path fill="currentColor" d="M9,1V9H1V1H9m1-1H0V10H10Z" transform="translate(32 72)"/><rect fill="currentColor" width="9.5" height="2.8" transform="translate(32.25 72.25)"/></g></svg>'),
            (i +=
              "<li " +
              n +
              "data-index='" +
              a +
              "'><div class='layer-tree-wrap'><div class='yicon icon-arrow-down'></div><div class='layer-tree-title'>" +
              s +
              d +
              "</div></div></li>");
        }),
        (i += "</ul>");
    }
    return i;
  }
  function Ea(e) {
    if (e) {
      var t = [e.index()];
      e.parentsUntil("html").each(function () {
        t.push(o(this).index());
      }),
        t.reverse();
    } else t = null;
    return t;
  }
  function La(e) {
    var t = parseInt(e.attr("data-index")),
      a,
      n,
      s;
    for (
      a = [t],
        e.parentsUntil("#layer-tree").each(function () {
          (e = o(this)),
            "LI" == e.prop("tagName") && a.push(parseInt(e.attr("data-index")));
        }),
        a.reverse(),
        s = Ki,
        n = 0;
      n < a.length;
      n++
    )
      s = s.children().eq(a[n]);
    return s;
  }
  function Ba() {
    var e, t;
    if (!1 === window.triggedByNav && C()) {
      if (((e = Ea(_())), !e)) return !0;
      (t = o("#layer-tree")), t.find(".selected").removeClass("selected");
      for (
        var a = t, n = !1, s = 0;
        s < e.length &&
        ((a = a.children("ul").children('li[data-index="' + e[s] + '"]')),
        a.hasClass("active") || !(e.length > s + 1));
        s++
      )
        if (s + 1 === e.length) {
          a.addClass("selected");
          var r = o("#layer-tree-ul");
          0 < r.length &&
            r.scrollTop(
              t.offset().top - r.offset().top - r.height() / 2 + r.scrollTop()
            ),
            (n = !0);
        }
      if (!0 !== n)
        for (var l = -1, s = 0; s < e.length; s++)
          (function (a) {
            setTimeout(function () {
              if (
                (l++,
                (t = t
                  .children("ul")
                  .children('li[data-index="' + e[l] + '"]')),
                t.hasClass("active") ||
                  t
                    .find(".layer-tree-wrap > .icon-arrow-down")
                    .trigger("click"),
                l + 1 === e.length && 0 < t.length)
              ) {
                t.addClass("selected");
                var a = o("#layer-tree-ul");
                a.scrollTop(
                  t.offset().top -
                    a.offset().top -
                    a.height() / 2 +
                    a.scrollTop()
                );
              }
            }, 50 * a);
          })(s);
    }
  }
  function Ma(e, t) {
    var a = window.ypData["data-clickable-select"];
    if (
      ("single" === window.ypData.inspector && (t = "sharp"),
      "default" == t &&
        !1 == window.minCrpdSlctr &&
        K(a) &&
        !1 != Ca(a, !0, !1, !1))
    )
      return a;
    if (
      ("defaultNoCache" == t && (t = "default"),
      null === e && (e = _()),
      void 0 === e || void 0 === e[0] || !1 === e[0] || null === e[0])
    )
      return !1;
    var s = e[0].tagName;
    if (J(s)) return !1;
    if ("HTML" === s) return "body";
    if ("BODY" == s) return "body";
    var l = e.parentsUntil("body"),
      d = "",
      p = "",
      c = ya(e),
      u,
      m,
      f;
    if (!0 == /#/g.test(c)) return c;
    var g = [],
      h = !1,
      y = !1;
    !1 != window.minCrpdSlctr && window.minCrpdSlctr >= l.length && (h = !0);
    var w = l.length;
    w > window.maxDeep && (w = window.maxDeep);
    for (var v = w - 1; 0 <= v; v--) {
      if (
        ((u = !1),
        (f = ya(l[v])),
        (y = !1),
        !1 != window.minCrpdSlctr && v - 1 <= window.minCrpdSlctr && (y = !0),
        !0 == /\.|#/g.test(f) &&
          !1 == h &&
          !1 == y &&
          1 == Gi.find(f).length &&
          ".active" != f)
      ) {
        var b = !0;
        -1 == f.indexOf("#") && 0 >= v && (b = !1),
          b &&
            ("sharp" == t
              ? -1 == Ce(d, !0).indexOf("nth-child") &&
                ((d = f + window.separator), g.push(f), (u = !0))
              : ((d = f + window.separator), g.push(f), (u = !0)));
      }
      !1 == u &&
        ((m = Gi.find(
          d +
            window.separator +
            f +
            window.separator +
            f +
            "," +
            d +
            window.separator +
            p +
            window.separator +
            f
        ).length),
        "default" == t && 0 < m && "" != _i(d).trim()
          ? (d = _i(d).trim() + " > " + f + window.separator)
          : (d += f + window.separator)),
        (p = f);
    }
    if (
      ((m = Gi.find(
        d +
          window.separator +
          c +
          window.separator +
          c +
          "," +
          d +
          window.separator +
          f +
          window.separator +
          c
      ).length),
      (d =
        0 < m && 0 < d.length
          ? _i(d + " > " + c)
          : _i(d + window.separator + c)),
      1 < g.length && "#" != d.charAt(0))
    ) {
      var x = [],
        k,
        C;
      for (v = 0; v < g.length; v++) {
        k = !0;
        for (var z = 0; z < Tn.length; z++)
          if (
            ((C = new RegExp("(\\s|^)." + Tn[z] + "(\\s|$)", "gi")),
            C.test(g[v]))
          ) {
            k = !1;
            break;
          }
        k && x.push(g[v]);
      }
      var O;
      if (1 < x.length) {
        var D, A, S;
        for (O = [], v = 0; v < x.length; v++) {
          (D = []),
            (A = []),
            Gi.find(x[v]).each(function () {
              (S = o(this)),
                D.push(S.parents().length),
                A.push(S.prop("tagName"));
            });
          var T = D.every(function (e, t, i) {
              return e === i[0];
            }),
            E = A.every(function (e, t, i) {
              return e === i[0];
            });
          T && E && O.push(x[v]);
        }
      }
      J(O) && (O = []);
      var L = null;
      if (
        (0 < O.length
          ? (L = O[O.length - 1])
          : 0 < x.length && (L = x[x.length - 1]),
        null != L)
      ) {
        var B = d
          .match(/(\s)(.*?)$/g)
          .join("")
          .toString();
        (B = L + B), Ca(B, !0, !1, !1) && Ge(d, B) && (d = B);
      }
    }
    if (
      (!1 == window.setSelector && (window.lastParentQueryStatus = t),
      "sharp" == t || "div" == d)
    )
      return "div" == d && (d = "body div"), Ce(d, !1);
    if (-1 != Pn.indexOf(s.toLowerCase())) {
      var M = [],
        Z;
      Gi.find(d).each(function () {
        (Z = o(this).prop("tagName")), -1 == M.indexOf(Z) && M.push(Z);
      }),
        1 < M.length && !0 == /(\.|#)/g.test(c)
          ? (d =
              o.trim(
                d
                  .match(new RegExp("^(.*?)(?=" + Na(c) + "$)", "g"))
                  .join("")
                  .toString()
              ) +
              window.separator +
              s.toLowerCase() +
              c)
          : Za(d, c, s) &&
            (d =
              o.trim(
                d
                  .match(new RegExp("^(.*?)(?=" + Na(c) + "$)", "g"))
                  .join("")
                  .toString()
              ) +
              window.separator +
              s.toLowerCase());
    }
    if (((d = _i(d)), -1 != d.indexOf(">"))) {
      var P = d.split(">").length,
        R = Gi.find(d).length;
      for (v = 1; v < P; v++)
        Gi.find(d.replace(/ > /i, " ")).length == R &&
          (d = d.replace(/ > /i, " "));
    }
    return ((d = _i(d)),
    "sharp" != t &&
      /\.wp-block-gallery/i.test(d) &&
      /\.wp-image-[0-9]+$/i.test(d) &&
      (d = d.replace(/\s\.wp-image-[0-9]+/i, " img")),
    (d = d.replace(/(^|\s)\.wpforms-field([a-zA-Z0-9_-]+)?\s/i, " ")),
    (d = d.replace(/(^|\s)\.wpuf-el\s/i, " ")),
    "sharp" != t &&
      (d = d.replace(/(^|\s)\.wpuf-name-field-([a-zA-Z0-9_-]+)?\s/i, " ")),
    /( |>)div$/g.test(d) && 20 <= Gi.find(d).length)
      ? Ce(d)
      : (window.ypOption.show_css_selector && (d = Da(d)), d);
  }
  function Za(e, t, a) {
    var i = Gi.find(e),
      n = Gi.find(
        o.trim(
          e
            .match(new RegExp("^(.*?)(?=" + Na(t) + "$)", "g"))
            .join("")
            .toString()
        ) +
          window.separator +
          a.toLowerCase()
      );
    if (1 == i.length && 1 == n.length) return !0;
    if (i.length == n.length && /.|#/g.test(t)) {
      var s = [],
        r = [];
      Gi.find(t).each(function () {
        var e = o(this);
        s.push(e.parents().length), r.push(e.prop("tagName"));
      });
      var l = s.every(function (e, t, i) {
          return e === i[0];
        }),
        d = r.every(function (e, t, i) {
          return e === i[0];
        });
      if (l && d) return !0;
    }
    return !1;
  }
  function Pa() {
    if (60 < (Date.now() - Rn) / 1e3) {
      var e = Ji.css(["position", "transform"]);
      if ("relative" === e.position || "none" !== e.transform) {
        var t = Ji.offset();
        (In = 0 - t.top), (Yn = 0 - t.left);
      }
      Rn = Date.now();
    }
    return { top: In, left: Yn };
  }
  function Ra(e, t) {
    var a = e.getBoundingClientRect(),
      i = {
        x: a.left,
        y: a.top,
        top: a.top,
        left: a.left,
        bottom: a.bottom,
        right: a.right,
        width: a.width,
        height: a.height,
      },
      n;
    return (
      (n = t ? t : Pa()),
      (i.y += n.top),
      (i.top = i.y),
      (i.bottom = i.top + i.height),
      (i.x += n.left),
      (i.left = i.x),
      (i.right = i.left + i.width),
      i
    );
  }
  function Ia(e, t, a) {
    if (C()) {
      var i = "object" == typeof e ? o(e) : Gi.find(e);
      var n = C(),
        s = !1;
      if ((n && (s = !0), 0 < i.length)) {
        var r = "",
          l = "",
          d = "",
          p = "",
          c = "",
          u = "",
          m = "",
          f = "",
          g,
          h,
          y,
          w,
          v,
          b,
          x,
          _,
          k,
          z,
          O,
          D,
          S,
          T;
        if (s) {
          var E = i.css([
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
          ]);
          (g = E["margin-top"]),
            (w = E["margin-right"]),
            (h = E["margin-bottom"]),
            (y = E["margin-left"]),
            (v = E["padding-top"]),
            (_ = E["padding-right"]),
            (b = E["padding-bottom"]),
            (x = E["padding-left"]),
            0 >= parseFloat(g) && (g = "0px"),
            0 >= parseFloat(h) && (h = "0px"),
            0 >= parseFloat(w) && (w = "0px"),
            0 >= parseFloat(y) && (y = "0px"),
            (k = y),
            (z = w),
            (O = parseInt(v)),
            (D = parseInt(_)),
            (S = parseInt(b)),
            (T = parseInt(x)),
            0 == parseInt(v) && (v = "12px"),
            0 == parseInt(_) && (_ = "10px"),
            0 == parseInt(b) && (b = "12px"),
            0 == parseInt(x) && (x = "12px"),
            on.find(".wyp-zero-m-h").removeClass("wyp-zero-m-h"),
            0 == parseInt(g) &&
              n &&
              ((g = "10px"),
              sn.active
                .find(".wyp-selected-boxed-margin-top")
                .addClass("wyp-zero-m-h"));
        }
        var L = i.get(0);
        if (J(L)) return !1;
        var B, M, Z;
        a
          ? ((B = a.boxSize), (M = a.scrollTop), (Z = a.scrollLeft))
          : ((B = Ra(L)),
            (M = parseFloat(Ji.scrollTop() + Ki.scrollTop())),
            (Z = parseFloat(Ji.scrollLeft() + Ki.scrollLeft())));
        var P = B.width,
          R = B.height,
          I = B.top + M,
          Y = B.left + Z,
          N = B.bottom + M,
          H = Gi.height();
        !0 == n &&
          0 == parseInt(h) &&
          Math.round(N) != H &&
          Math.round(N + 2) != H &&
          ((h = "10px"),
          sn.active
            .find(".wyp-selected-boxed-margin-bottom")
            .addClass("wyp-zero-m-h")),
          (!0 == n && Math.round(N) == H) || Math.round(N + 2) == H
            ? Ji.addClass("wyp-selected-bottom")
            : Ji.removeClass("wyp-selected-bottom");
        var W = o("#iframe").width(),
          F = W - Ki.width(),
          j = o(window).width() - F,
          X = 1;
        n && (X = 2),
          Y + P > j
            ? (P = j - Y - X)
            : A() &&
              (Y + P > W && (P = W - Y - F),
              W == P && Ki.height() > o("#iframe").height() && (P -= F));
        var V = Y + P - X;
        if (
          (Y + P + 2 >= W - F
            ? Ji.addClass("wyp-full-width-selected")
            : Ji.removeClass("wyp-full-width-selected"),
          s)
        ) {
          var U = !1;
          W == parseFloat(2 * y) + P && 0 < parseFloat(y)
            ? (U = !0)
            : 0 < i.parent().length &&
              parseFloat(i.parent().width()) == 2 * parseFloat(y) + P &&
              0 < parseFloat(y) &&
              (U = !0),
            W - F > Y + P + 30 &&
              (on.find(".wyp-zero-m-w").removeClass("wyp-zero-m-w"),
              0 == parseInt(w) &&
                n &&
                ((w = "10px"),
                (U = !1),
                sn.active
                  .find(".wyp-selected-boxed-margin-right")
                  .addClass("wyp-zero-m-w")),
              0 == parseInt(y) &&
                n &&
                ((y = "10px"),
                (U = !1),
                sn.active
                  .find(".wyp-selected-boxed-margin-left")
                  .addClass("wyp-zero-m-w"))),
            30 < parseInt(g) && (r = parseInt(g) + "px"),
            30 < parseInt(w) && (l = parseInt(w) + "px"),
            30 < parseInt(h) && (d = parseInt(h) + "px"),
            30 < parseInt(y) && (p = parseInt(y) + "px"),
            30 < parseInt(v) && (c = parseInt(v) + "px"),
            30 < parseInt(_) && (u = parseInt(_) + "px"),
            30 < parseInt(b) && (m = parseInt(b) + "px"),
            30 < parseInt(x) && (f = parseInt(x) + "px"),
            U && ((p = "Auto"), (l = "Auto"));
        }
        if (1 < R && 1 < P) {
          if (0 === on.find("." + t + "-top").length) {
            var q =
              "<div class='" +
              t +
              "-top'></div><div class='" +
              t +
              "-bottom'></div><div class='" +
              t +
              "-left'></div><div class='" +
              t +
              "-right'></div>";
            (q +=
              10 >= parseFloat(g)
                ? "<div class='" +
                  t +
                  "-margin-top wyp-zero-m-h'>" +
                  r +
                  "</div>"
                : "<div class='" + t + "-margin-top'>" + r + "</div>"),
              (q +=
                10 >= parseFloat(w)
                  ? "<div class='" +
                    t +
                    "-margin-right wyp-zero-m-w'>" +
                    l +
                    "</div>"
                  : "<div class='" + t + "-margin-right'>" + l + "</div>"),
              (q +=
                10 >= parseFloat(h)
                  ? "<div class='" +
                    t +
                    "-margin-bottom wyp-zero-m-h'>" +
                    d +
                    "</div>"
                  : "<div class='" + t + "-margin-bottom'>" + d + "</div>"),
              (q +=
                10 >= parseFloat(y)
                  ? "<div class='" +
                    t +
                    "-margin-left wyp-zero-m-w'>" +
                    p +
                    "</div>"
                  : "<div class='" + t + "-margin-left'>" + p + "</div>"),
              (q +=
                "<div class='" +
                t +
                "-padding-left'>" +
                f +
                "</div><div class='" +
                t +
                "-padding-top'>" +
                c +
                "</div><div class='" +
                t +
                "-padding-bottom'>" +
                m +
                "</div><div class='" +
                t +
                "-padding-right'>" +
                u +
                "</div>"),
              sn.active.append(q);
          } else
            s &&
              (sn.active.find("." + t + "-margin-top").text(r),
              sn.active.find("." + t + "-margin-right").text(l),
              sn.active.find("." + t + "-margin-bottom").text(d),
              sn.active.find("." + t + "-margin-left").text(p),
              sn.active.find("." + t + "-padding-top").text(c),
              sn.active.find("." + t + "-padding-right").text(u),
              sn.active.find("." + t + "-padding-bottom").text(m),
              sn.active.find("." + t + "-padding-left").text(f));
          var $ =
            "." +
            t +
            "-top{top:" +
            I +
            "px !important;left:" +
            Y +
            "px !important;width:" +
            P +
            "px !important;border-bottom:" +
            (R - 2) +
            "px solid rgba(66, 133, 244, 0.04) !important;}";
          if (
            (($ +=
              "." +
              t +
              "-bottom{top:" +
              N +
              "px !important;left:" +
              Y +
              "px !important;width:" +
              P +
              "px !important;}"),
            ($ +=
              "." +
              t +
              "-left{top:" +
              I +
              "px !important;left:" +
              Y +
              "px !important;height:" +
              R +
              "px !important;}"),
            ($ +=
              "." +
              t +
              "-right{top:" +
              I +
              "px !important;left:" +
              V +
              "px !important;height:" +
              R +
              "px !important;}"),
            s)
          ) {
            var G = parseFloat(I) - parseFloat(g),
              K = parseFloat(Y) - parseFloat(y),
              Q = N - parseFloat(b),
              ee = V - parseFloat(_),
              te = parseFloat(w);
            V + 2 + parseFloat(w) > W - F && (te = W - F - (V + 2));
            var ae = parseFloat(P) + parseFloat(k) + parseFloat(z),
              ie = parseFloat(Y) - parseFloat(k);
            ie + ae > j && (ae = P + parseFloat(k)),
              ($ +=
                "." +
                t +
                "-margin-top{transform: translate3d(" +
                ie +
                "px, " +
                G +
                "px, 0) !important;width:" +
                ae +
                "px !important;height:" +
                parseFloat(g) +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-margin-bottom{transform: translate3d(" +
                ie +
                "px, " +
                N +
                "px, 0) !important;width:" +
                ae +
                "px !important;height:" +
                parseFloat(h) +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-margin-left{transform: translate3d(" +
                K +
                "px, " +
                I +
                "px, 0) !important;width:" +
                parseFloat(y) +
                "px !important;height:" +
                R +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-margin-right{transform: translate3d(" +
                (parseFloat(V) + 2) +
                "px, " +
                I +
                "px, 0) !important;width:" +
                parseFloat(te) +
                "px !important;height:" +
                R +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-padding-top{transform: translate3d(" +
                parseFloat(Y) +
                "px, " +
                I +
                "px, 0) !important;width:" +
                P +
                "px !important;height:" +
                parseFloat(v) +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-padding-bottom{transform: translate3d(" +
                parseFloat(Y) +
                "px, " +
                Q +
                "px, 0) !important;width:" +
                P +
                "px !important;height:" +
                parseFloat(b) +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-padding-left{transform: translate3d(" +
                parseFloat(Y) +
                "px, " +
                I +
                "px, 0) !important;width:" +
                parseFloat(x) +
                "px !important;height:" +
                parseFloat(R) +
                "px !important;}"),
              ($ +=
                "." +
                t +
                "-padding-right{transform: translate3d(" +
                parseFloat(ee) +
                "px, " +
                I +
                "px, 0) !important;width:" +
                parseFloat(_) +
                "px !important;height:" +
                parseFloat(R) +
                "px !important;}"),
              0 == parseInt(O) &&
                ($ +=
                  "." + t + "-padding-top:before{display:none !important;}"),
              0 == parseInt(D) &&
                ($ +=
                  "." + t + "-padding-right:before{display:none !important;}"),
              0 == parseInt(S) &&
                ($ +=
                  "." + t + "-padding-bottom:before{display:none !important;}"),
              0 == parseInt(T) &&
                ($ +=
                  "." + t + "-padding-left:before{display:none !important;}");
          }
          var ne = Ji.find("#wyp-drw-bx");
          0 < ne.length
            ? ne.text($)
            : Ji.append("<style id='wyp-drw-bx'>" + $ + "</style>");
        }
      }
    }
  }
  function Ya(e) {
    var t = !1;
    if (
      /\bhandheld\b|\baural\b|\bbraille\b|\bembossed\b|\bprojection\b|\btty\b|\btv\b|\bprint\b|\b3d-glasses\b/.test(
        e
      )
    )
      return !1;
    if (/,|\bnot\b/.test(e)) return !1;
    var a = parseFloat(Ki.css("fontSize"));
    e = e.replace(/[0-9. ]+(rem|em)/g, function (e) {
      return parseFloat(e) * a + "px";
    });
    var i = e.match(/\((.*?)\)/g),
      n = [];
    return (
      o.each(i, function (e, a) {
        return !1 == /max-width|min-width/.test(a)
          ? ((t = !0), !1)
          : void ((a = a.replace(/\(|\)|:|px|\s+/g, "")),
            (a = a.replace(/min-width/g, ">")),
            (a = a.replace(/max-width/g, "<")),
            (a = a.replace(/(\d+)\.(\d+)/g, "$1")),
            n.push(a));
      }),
      0 === n.length && (t = !0),
      !1 == t && n.toString()
    );
  }
  function Na(e) {
    return e
      .replace(/\\/g, "\\\\")
      .replace(/\//g, "\\/")
      .replace(/\./g, "\\.")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/\^/g, "\\^")
      .replace(/\$/g, "\\$")
      .replace(/\*/g, "\\*")
      .replace(/\:/g, "\\:")
      .replace(/\+/g, "\\+")
      .replace(/\?/g, "\\?")
      .replace(/\{/g, "\\{")
      .replace(/\}/g, "\\}")
      .replace(/\|/g, "\\|");
  }
  function Ha(e) {
    var t = null;
    return (
      (t =
        -1 == e.indexOf(",")
          ? e
              .replace(/([^\d+])(\d+)/g, "$2$1")
              .replace(/</g, " and smaller")
              .replace(/\>/g, " and larger")
              .replace(/\.\d+/g, "")
              .replace(/(\d+)(\s|$)/g, "$1px$2") + " screen sizes"
          : "screen sizes " +
            e
              .replace(/</g, "smaller than ")
              .replace(/\>/g, "larger than ")
              .replace(/\,/g, " and ")
              .replace(/\.\d+/g, "")
              .replace(/(\d+)(\s|$)/g, "$1px$2")),
      (t = t.replace(/(\d+)\./g, "")),
      t
    );
  }
  function Wa(e) {
    if (!K(e)) return e;
    var t, a;
    if (null == e || !1 == e) return !1;
    if (
      ((e = e.toString()),
      (t = parseInt(mi(e.replace(/</g, "").replace(/\>/g, "")))),
      (a = ""),
      -1 == e.indexOf(",") &&
        -1 == e.indexOf("and") &&
        (-1 != e.indexOf(">") && (a = "(min-width:" + t + "px)"),
        -1 != e.indexOf("<") && (a = "(max-width:" + t + "px)")),
      -1 != e.indexOf(","))
    ) {
      var n = e.split(",");
      a = "";
      for (var s = 0, r = 0; r < n.length; r++)
        (s = parseInt(mi(n[r].replace(/</g, "").replace(/\>/g, "")))),
          -1 != n[r].indexOf(">") && (a += "and (min-width:" + s + "px) "),
          -1 != n[r].indexOf("<") && (a += "and (max-width:" + s + "px) ");
      a = o.trim(a).replace(/\s+/g, " ").replace(/^and /g, "");
    }
    return a;
  }
  function Fa(e, t) {
    var a = [],
      i;
    return (o.each(e, function (e, n) {
      -1 != n.indexOf(">") &&
        -1 != n.indexOf(",") &&
        -1 != n.indexOf("<") &&
        ((i = parseInt(
          Math.abs(n.split(",")[0].replace(/(<|\>)/g, "") - t) +
            Math.abs(n.split(",")[1].replace(/(<|\>)/g, "") - t)
        )),
        a.push({ diff: i, index: e }));
    }),
    0 == a.length)
      ? null
      : (a.sort(function (e, t) {
          return e.diff > t.diff ? 1 : t.diff > e.diff ? -1 : 0;
        }),
        e[a[0].index]);
  }
  function ja(e, t) {
    var a = null;
    return (
      o.each(e, function (e, i) {
        -1 != i.indexOf(">") &&
          -1 == i.indexOf(",") &&
          ((i = parseInt(i.replace(/(<|\>|\,)/g, ""))),
          (null == a || Math.abs(i - t) < Math.abs(a - t)) && (a = i));
      }),
      a
    );
  }
  function Xa(e, t) {
    var a = null;
    return (
      o.each(e, function (e, i) {
        -1 != i.indexOf("<") &&
          -1 == i.indexOf(",") &&
          ((i = parseInt(i.replace(/(<|\>|\,)/g, ""))),
          (null == a || Math.abs(i - t) < Math.abs(a - t)) && (a = i));
      }),
      a
    );
  }
  function Va(e) {
    if (S() || A()) return !1;
    var t = [],
      a = [],
      i = [],
      n,
      s,
      r,
      l;
    if (((s = o("#iframe").width()), (n = qa(!1, e, !0, !1)), 0 == n.length))
      return !1;
    if (
      (o.each(n, function (e, n) {
        (r = Ya(n)),
          !1 !== r &&
            (t.push(r),
            (l = _i(n.replace("@media", ""))),
            nn.matchMedia(l).matches ? a.push(r) : i.push(r));
      }),
      0 < a.length)
    ) {
      var d = ja(a, s),
        p = Xa(a, s),
        c = Fa(a, s);
      return null == c ? (null == d ? Wa("<" + p) : Wa(">" + d)) : Wa(c);
    }
    return Ua(i, s);
  }
  function Ua(e, t) {
    var a = !1,
      i = ja(e, t),
      n = Xa(e, t);
    if (null == i || null == n) {
      var s, o, r, l, d;
      (d = Fa(e, t)),
        null != d &&
          ((s = d.split(",")[0]),
          (o = d.split(",")[1]),
          -1 == s.indexOf("<") ? (l = s) : (r = s),
          -1 == o.indexOf("<") ? (l = o) : (r = o),
          (r = parseInt(r.replace(/(<|\>|\,)/g, ""))),
          (l = parseInt(l.replace(/(<|\>|\,)/g, ""))),
          null == n && r < t && (n = r),
          null == i && l > t && (i = l));
    }
    return (
      null != i && --i,
      null != n && ++n,
      null != n && null != i
        ? (a = "(min-width:" + n + "px) and (max-width:" + i + "px)")
        : null == n
        ? null != i && (a = "(max-width:" + i + "px)")
        : (a = "(min-width:" + n + "px)"),
      a
    );
  }
  function qa(e, a, s, o) {
    for (
      var r = an.styleSheets,
        l = null,
        d = [],
        c = [],
        u = [],
        m = [],
        f = !1,
        g = 0,
        h,
        y,
        w,
        v,
        b,
        x,
        _,
        C,
        z,
        O;
      g < r.length;
      g++
    ) {
      try {
        _ = r[g];
      } catch (t) {
        continue;
      }
      if (
        ((O = _.ownerNode.className),
        (O = O + " " + _.ownerNode.id),
        -1 == O.indexOf("wyp-drw-bx") &&
          -1 == O.indexOf("wyp-ui-transform-hide")) &&
        !(
          s &&
          (-1 != O.indexOf("wyp-inline-data") ||
            -1 != O.indexOf("wyp-live-css-data") ||
            -1 != O.indexOf("wyp-styles-area"))
        ) &&
        !(
          o &&
          -1 == O.indexOf("wyp-inline-data") &&
          -1 == O.indexOf("wyp-live-css-data") &&
          -1 == O.indexOf("wyp-styles-area")
        ) &&
        ((l = _.href),
        null == l && (l = location.protocol + "//" + window.location.hostname),
        -1 == l.indexOf("waspthemes-yellow-pencil") &&
          -1 == l.indexOf("animate") &&
          -1 == l.indexOf("webkit") &&
          -1 == l.indexOf("animation") &&
          -1 == l.indexOf("keyframe") &&
          -1 == l.indexOf("font") &&
          -1 == l.indexOf("icon") &&
          -1 == l.indexOf("googleapis.com") &&
          -1 == l.indexOf("print") &&
          -1 == l.indexOf("reset") &&
          -1 == l.indexOf("player") &&
          -1 == l.indexOf("video") &&
          -1 == l.indexOf("audio") &&
          "ie" != l &&
          -1 == l.indexOf("ie6") &&
          -1 == l.indexOf("ie7") &&
          -1 == l.indexOf("ie8") &&
          -1 == l.indexOf("ie9") &&
          -1 == l.indexOf("ie10") &&
          -1 == l.indexOf("ie11") &&
          -1 == l.indexOf("jquery") &&
          -1 == l.indexOf("color") &&
          -1 == l.indexOf("skin") &&
          -1 == l.indexOf("scheme") &&
          -1 == l.indexOf("setting") &&
          -1 == l.indexOf("admin")) &&
        -1 != l.indexOf(location.protocol + "//" + window.location.hostname)
      ) {
        try {
          h = _.cssRules;
        } catch (t) {
          continue;
        }
        for (var D = 0; D < h.length; D++)
          if (((y = h[D]), y.media)) {
            try {
              x = y.media[0].replace(/(\s+)?\:(\s+)?/g, ":");
            } catch (t) {
              continue;
            }
            w = y.cssRules;
            for (var A = 0; A < w.length; A++)
              if (
                ((v = w[A]), (b = v.selectorText), !J(b)) &&
                !1 == /(\*|\:|\@)/i.test(b) &&
                !1 != Ca(b)
              )
                if (((b = b.trim()), e)) -1 == d.indexOf(x) && d.push(x);
                else if (!1 != a)
                  Gi.find(xi(b)).hasClass("wyp-selected") &&
                    a in v.style &&
                    "" !== v.style[a] &&
                    -1 == d.indexOf(x) &&
                    d.push(x);
                else if (Gi.find(xi(b)).hasClass("wyp-selected")) {
                  (u = []), (m = []);
                  for (var S = 0; S < v.style.length; S++)
                    u.push(v.style[S]), m.push(v.style[u[S]]);
                  for (var T = 0; T < u.length; T++)
                    if (
                      !/(-webkit-|-moz-|-o-|-ms-)/g.test(u[T]) &&
                      !/(\:|\{|\}|\(|\))/g.test(u[T])
                    ) {
                      if ("padding" == u[T]) {
                        u.push(
                          "padding-top",
                          "padding-right",
                          "padding-bottom",
                          "padding-left"
                        );
                        continue;
                      } else if ("margin" == u[T]) {
                        u.push(
                          "margin-top",
                          "margin-right",
                          "margin-bottom",
                          "margin-left"
                        );
                        continue;
                      } else if ("overflow" == u[T]) {
                        u.push("overflow-x", "overflow-y");
                        continue;
                      } else if ("border-width" == u[T]) {
                        u.push(
                          "border-top-width",
                          "border-right-width",
                          "border-bottom-width",
                          "border-left-width"
                        );
                        continue;
                      } else if ("border-style" == u[T]) {
                        u.push(
                          "border-top-style",
                          "border-right-style",
                          "border-bottom-style",
                          "border-left-style"
                        );
                        continue;
                      } else if ("border-color" == u[T]) {
                        u.push(
                          "border-top-color",
                          "border-right-color",
                          "border-bottom-color",
                          "border-left-color"
                        );
                        continue;
                      } else if ("border-top" == u[T]) {
                        u.push(
                          "border-top-width",
                          "border-top-style",
                          "border-top-color"
                        );
                        continue;
                      } else if ("border-right" == u[T]) {
                        u.push(
                          "border-right-width",
                          "border-right-style",
                          "border-right-color"
                        );
                        continue;
                      } else if ("border-bottom" == u[T]) {
                        u.push(
                          "border-bottom-width",
                          "border-bottom-style",
                          "border-bottom-color"
                        );
                        continue;
                      } else if ("border-left" == u[T]) {
                        u.push(
                          "border-left-width",
                          "border-left-style",
                          "border-left-color"
                        );
                        continue;
                      } else if ("background" == u[T]) {
                        /(\s+|^)(#[a-zA-Z-0-9]{6}|#[a-zA-Z-0-9]{3}|rgb\(|rgba\()(\s+|$)/g.test(
                          m[T]
                        ) && u.push("background-color"),
                          /(\s+|^)url\((\s+|$)/g.test(m[T]) &&
                            u.push("background-image"),
                          /(\s+|^)(left|top|right|bottom|center)(\s+|$)/g.test(
                            m[T]
                          ) && u.push("background-position"),
                          /(\s+|^)(auto|cover|contain)(\s+|$)/g.test(m[T]) &&
                            u.push("background-size"),
                          /(\s+|^)(repeat)(\s+|$)/g.test(m[T]) &&
                            u.push("background-repeat"),
                          /(\s+|^)(padding-box|border-box|content-box)(\s+|$)/g.test(
                            m[T]
                          ) &&
                            (u.push("background-origin"),
                            u.push("background-clip")),
                          /(\s+|^)(fixed|scroll|local)(\s+|$)/g.test(m[T]) &&
                            u.push("background-attachment");
                        continue;
                      } else if ("border-radius" == u[T]) {
                        u.push(
                          "border-top-left-radius",
                          "border-top-right-radius",
                          "border-bottom-right-radius",
                          "border-bottom-left-radius"
                        );
                        continue;
                      } else if ("flex" == u[T]) {
                        u.push("flex-grow"),
                          1 < u[T].split(/\+s/g).length &&
                            u.push("flex-shrink"),
                          2 < u[T].split(/\+s/g).length && u.push("flex-basis");
                        continue;
                      } else if ("flex-flow" == u[T]) {
                        u.push("flex-direction"),
                          -1 != u[T].indexOf(" ") && u.push("flex-wrap");
                        continue;
                      } else if ("list-style" == u[T]) {
                        /(\s+|^)url\((\s+|$)/g.test(m[T]) &&
                          u.push("list-style-image"),
                          /(\s+|^)(disc|armenian|circle|cjk-ideographic|decimal|decimal-leading-zero|georgian|hebrew|hiragana|hiragana-iroha|katakana|katakana-iroha|lower-alpha|lower-greek|lower-latin|lower-roman|none|square|upper-alpha|upper-greek|upper-latin|upper-roman)(\s+|$)/g.test(
                            m[T]
                          ) && u.push("list-style-image"),
                          /(\s+|^)(inside|outside)(\s+|$)/g.test(m[T]) &&
                            u.push("list-style-position");
                        continue;
                      } else if ("animation" == u[T]) {
                        u.push(
                          "animation-name",
                          "animation-duration",
                          "animation-delay"
                        ),
                          /(\s+|^)(paused|running)(\s+|$)/g.test(m[T]) &&
                            u.push("animation-play-state"),
                          /(\s+|^)(forwards|backwards|both)(\s+|$)/g.test(
                            m[T]
                          ) && u.push("animation-fill-mode"),
                          /(\s+|^)(normal|reverse|alternate|alternate-reverse)(\s+|$)/g.test(
                            m[T]
                          ) && u.push("animation-direction"),
                          /(\s+|^)(linear|ease|ease-in|ease-out|ease-in-out|step-start|step-end|steps\(|cubic-bezier\()(\s+|$)/g.test(
                            m[T]
                          ) && u.push("animation-timing-function");
                        continue;
                      } else if ("border" == u[T]) {
                        u.push("border-width", "border-style", "border-color");
                        continue;
                      } else if ("font" == u[T]) {
                        u.push("font-size", "line-height", "font-family"),
                          /(\s+|^)(normal|italic|oblique)(\s+|$)/g.test(m[T]) &&
                            u.push("font-style"),
                          /(\s+|^)(normal|small-caps)(\s+|$)/g.test(m[T]) &&
                            u.push("font-variant"),
                          /(\s+|^)(100|200|300|400|500|600|700|800|900|normal|bold|bolder|lighter)(\s+|$)/g.test(
                            m[T]
                          ) && u.push("font-weight");
                        continue;
                      } else if ("transform" == u[T]) {
                        /scale\(/g.test(m[T]) && u.push("scale-transform"),
                          /rotateX\(/g.test(m[T]) &&
                            u.push("rotatex-transform"),
                          /rotateY\(/g.test(m[T]) &&
                            u.push("rotatey-transform"),
                          /rotateZ\(/g.test(m[T]) &&
                            u.push("rotatez-transform"),
                          /translatex\(/g.test(m[T]) &&
                            u.push("translate-x-transform"),
                          /translatey\(/g.test(m[T]) &&
                            u.push("translate-y-transform"),
                          /skewx\(/g.test(m[T]) && u.push("skew-x-transform"),
                          /skewy\(/g.test(m[T]) && u.push("skew-y-transform");
                        continue;
                      } else if ("filter" == u[T]) {
                        /blur\(/g.test(m[T]) && u.push("blur-filter"),
                          /brightness\(/g.test(m[T]) &&
                            u.push("brightness-filter"),
                          /contrast\(/g.test(m[T]) && u.push("contrast-filter"),
                          /grayscale\(/g.test(m[T]) &&
                            u.push("grayscale-filter"),
                          /invert\(/g.test(m[T]) && u.push("invert-filter"),
                          /hue-rotate\(/g.test(m[T]) &&
                            u.push("hue-rotate-filter"),
                          /saturate\(/g.test(m[T]) && u.push("saturate-filter"),
                          /sepia\(/g.test(m[T]) && u.push("sepia-filter");
                        continue;
                      } else if ("backdrop-filter" == u[T]) {
                        /blur\(/g.test(m[T]) && u.push("blur-backdrop-filter"),
                          /brightness\(/g.test(m[T]) &&
                            u.push("brightness-backdrop-filter"),
                          /contrast\(/g.test(m[T]) &&
                            u.push("contrast-backdrop-filter"),
                          /grayscale\(/g.test(m[T]) &&
                            u.push("grayscale-backdrop-filter"),
                          /invert\(/g.test(m[T]) &&
                            u.push("invert-backdrop-filter"),
                          /hue-rotate\(/g.test(m[T]) &&
                            u.push("hue-rotate-backdrop-filter"),
                          /saturate\(/g.test(m[T]) &&
                            u.push("saturate-backdrop-filter"),
                          /sepia\(/g.test(m[T]) &&
                            u.push("sepia-backdrop-filter");
                        continue;
                      }
                      var E = Ya(x);
                      if (!1 !== E) {
                        for (
                          v = u[T].trim(), C = Ga(x), f = !1, z = 0;
                          z < c.length;
                          z++
                        )
                          if (
                            v == c[z].rule &&
                            x == c[z].query &&
                            C == c[z].order
                          ) {
                            f = !0;
                            break;
                          }
                        !1 == f &&
                          -1 == v.indexOf("outline-") &&
                          c.push({ rule: v, query: x, order: C });
                      }
                    }
                }
          }
      }
    }
    return e || a ? d : c;
  }
  function $a(e) {
    if (0 == o(".ed-pnl-list > li.active .op-g").length) return !1;
    var t = qa(!1, !1, !1, !0).reverse();
    t.sort(function (e, t) {
      return e.order - t.order;
    });
    var a;
    4 ==
      o.map(t, function (e) {
        if (/border-(.*?)-style/g.test(e.rule)) return (a = e), !0;
      }).length &&
      t.push({ rule: "border-style", query: a.query, order: a.order }),
      4 ==
        o.map(t, function (e) {
          if (/border-(.*?)-width/g.test(e.rule)) return (a = e), !0;
        }).length &&
        t.push({ rule: "border-width", query: a.query, order: a.order }),
      4 ==
        o.map(t, function (e) {
          if (/border-(.*?)-color/g.test(e.rule)) return (a = e), !0;
        }).length &&
        t.push({ rule: "border-color", query: a.query, order: a.order });
    var i = o("#property-responsive-menu");
    i.find(".pr-res-ite").tooltip("destroy"), i.empty();
    var n, s, r, l, d, p, c, u;
    i.append(
      "<div class='pr-res-ite' data-info='-' title='" +
        qi.all_msg +
        "' data-insert-media='desktop' data-responsive-size='all'><span class='yicon icon-desktop'></span>All<span class='yicon icon-no-alt'></span></div>"
    );
    for (var m = 0; m < t.length; m++) {
      (n = t[m].rule), (s = t[m].query);
      try {
        if (0 == o("#" + n + "-group").length) continue;
      } catch (t) {
        continue;
      }
      ((r = o("#" + n + "-group")), n == e) &&
        ((l = Ya(s)), !1 !== l) &&
        (0 < i.find("[data-responsive-size='" + l + "']").length ||
          ((d = l
            .replace(/</g, "max ")
            .replace(/\>/g, "min. ")
            .replace(/\,/g, " & ")
            .replace(/\.\d+/g, "")
            .replace(/(\d+)(\s|$)/g, "$1px$2")),
          (p = Ha(l)),
          (c = parseInt(mi(l.replace(/</g, "").replace(/\>/g, "")))),
          (u = ""),
          -1 == l.indexOf(",") &&
            -1 == l.indexOf("and") &&
            (-1 != l.indexOf(">") && (u = "(min-width:" + c + "px)"),
            -1 != l.indexOf("<") && (u = "(max-width:" + c + "px)")),
          i.append(
            "<div class='pr-res-ite' data-info='-' title='" +
              p +
              "' data-insert-media='" +
              u +
              "' data-responsive-size='" +
              l +
              "'><span class='yicon icon-smartphone'></span>" +
              d +
              "<span class='yicon icon-no-alt'></span></div>"
          )));
    }
    o(".pr-res-ite").tooltip({
      template:
        '<div class="tooltip small-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      container: ".ed-pnl",
      delay: { show: 50, hide: 0 },
      placement: "left",
    });
  }
  function Ga(e) {
    var t;
    if (
      ((t = /(>|<)/g.test(e) && !1 === /\@media/gi.test(e) ? e : Ya(e)),
      !1 !== t)
    ) {
      var a = t.replace(/(<|\>)/g, "");
      return (
        -1 != a.indexOf(",") &&
          (-1 == t.split(",")[1].indexOf("<")
            ? (a = a.split(",")[0])
            : (a = a.split(",")[1])),
        parseFloat(a)
      );
    }
    return !1;
  }
  function Ka() {
    var e = o(".mo-i.active");
    if (0 < e.length) {
      var t = o("#property-responsive-menu"),
        a = e.offset(),
        i = o(".ed-pnl"),
        n = i.offset(),
        s = a.top - n.top,
        r = n.top + i.height() - a.top;
      t.removeClass("top bottom"),
        r > s
          ? (t.css("top", a.top), t.css("left", a.left), t.addClass("top"))
          : (t.css("top", a.top - t.height()),
            t.css("left", a.left),
            t.addClass("bottom"));
    }
  }
  function Ja(e) {
    var t = o(".responsive-size-text");
    o(".breakpoint-bar .breakpoint-item").removeClass("focus active"),
      t.removeAttr("data-before"),
      t.find(".device-size").text(e.attr("data-breakpoint")),
      e.addClass("focus"),
      e.nextAll(".breakpoint-item").addClass("active"),
      C() && _e();
    var a = e.attr("data-breakpoint");
    o("#iframe").width(a),
      j(),
      setTimeout(function () {
        Ze(), ce(), j(), ye(), we();
      }, window.YellowDelay);
  }
  function Qa() {
    o(".fake-layer-responsive").remove(),
      o(".responsive-menu-open").removeClass("responsive-menu-open"),
      o(".mo-i").removeClass("active"),
      tn.removeClass("property-responsive-open wyp-bg-layer-active");
  }
  function ei() {
    if (A()) return 0;
    if (null != window.scrollbar_width_cache)
      return window.scrollbar_width_cache;
    var e = an.createElement("p");
    (e.style.width = "100%"),
      (e.style.height = "200px"),
      (e.id = "wyp-sc-test1");
    var t = an.createElement("div");
    (t.id = "wyp-sc-test2"),
      (t.style.position = "absolute"),
      (t.style.top = "0px"),
      (t.style.left = "0px"),
      (t.style.visibility = "hidden"),
      (t.style.width = "200px"),
      (t.style.height = "150px"),
      (t.style.overflow = "hidden"),
      t.appendChild(e),
      an.body.appendChild(t);
    var a = e.offsetWidth;
    t.style.overflow = "scroll";
    var i = e.offsetWidth;
    a == i && (i = t.clientWidth), an.body.removeChild(t);
    var n = a - i;
    return (
      5 > n ? (n = 5) : 20 < n && (n = 20),
      (window.scrollbar_width_cache = n),
      n
    );
  }
  function ti(e, t, a) {
    var n = "",
      s,
      r,
      l,
      d,
      p,
      c,
      u,
      m,
      f,
      g,
      h;
    a
      ? ((l = a.scrollTop), (d = a.scrollLeft))
      : ((l = parseFloat(Ji.scrollTop() + Ki.scrollTop())),
        (d = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()))),
      (p = o(nn).width()),
      (null == e || null == e) && (e = _a()),
      (null == t || null == t) && (t = "default");
    var y;
    (y =
      "multiple" == t
        ? e
        : C()
        ? Gi.find(e + ":in-viewport").not(
            ".wyp-selected,.wyp-multiple-selected"
          )
        : Gi.find(e + ":in-viewport").not(".wyp-multiple-selected")),
      "multiple" != t && sn.other.empty(),
      y.each(function (e) {
        if (
          ((s = o(this)),
          (r = s.attr("class")),
          "multiple" == t && (e = "multiple"),
          200 < e)
        )
          return !1;
        if (((h = s.prop("tagName")), null === s)) return !0;
        if ("HTML" == h || "BODY" == h) return !0;
        if (0 === s.length) return !0;
        if (
          !0 === le(s, "opacity", "0", "==") ||
          !0 === le(s, "visibility", "hidden", "==")
        )
          return !0;
        if ("&nbsp;" == s.html() && "P" == h) return !0;
        if (Ji.hasClass("wyp-h-trfm")) return !0;
        if (((c = a ? Ra(this, a.diff) : Ra(this)), 0 == c.length)) return !1;
        if (
          ((u = c.top + l),
          (m = c.left + d),
          (f = c.width),
          (g = c.height),
          m > p)
        )
          return !0;
        if ((f + m > p && (f = p - m), 1 < g && 1 < f)) {
          var y = "";
          /(^|\s)wyp-selected($|\s)/.test(r) && (y = " fast-selected-box"),
            0 === sn.other.find(".wyp-selected-others-" + e + "-box").length
              ? (n +=
                  "<div class='wyp-selected-others-box" +
                  y +
                  " wyp-selected-others-" +
                  e +
                  "-box' style='transform:translate3d(" +
                  m +
                  "px, " +
                  u +
                  "px, 0) !important;width:" +
                  parseFloat(f) +
                  "px !important;height:" +
                  parseFloat(g) +
                  "px !important;'></div>")
              : sn.other
                  .find(".wyp-selected-others-" + e + "-box")
                  .attr(
                    "style",
                    "transform:translate3d(" +
                      m +
                      "px, " +
                      u +
                      "px, 0) !important;width:" +
                      parseFloat(f) +
                      "px !important;height:" +
                      parseFloat(g) +
                      "px !important;"
                  );
        }
      }),
      "" != n && sn.other.append(n);
  }
  function ai(e) {
    var t = e.get(0);
    if (J(t)) return 0;
    var a = t.getBoundingClientRect(),
      i = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
      n = a.top + i,
      s = a.height;
    return n < i ? s - (i - n) : s;
  }
  function ii(e) {
    var t = sn.general.find(".wyp-selected-tooltip");
    if (0 >= t.length) return !1;
    t.removeClass(
      "wyp-small-tooltip wyp-tooltip-bttm-out wyp-fixed-tooltip wyp-fixed-tooltip-parentbar wyp-fixed-tooltip-bottom"
    );
    var a = _(),
      i = a.get(0);
    if (J(i)) return !1;
    var n, s, r, l;
    e
      ? ((n = e.boxSize), (s = e.scrollTop), (r = e.scrollLeft), (l = e.diff))
      : ((n = Ra(i)),
        (s = parseFloat(Ji.scrollTop() + Ki.scrollTop())),
        (r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft())),
        (l = Pa()));
    var d = o(window).height(),
      p = o("#iframe").width(),
      c = parseFloat(n.top + s) - 25,
      u = parseFloat(n.left + r);
    0 > u && (u = 0),
      !0 !== window.ypOption.fixed_left_bar &&
        !1 == tn.hasClass("wyp-res-mod") &&
        !1 == tn.hasClass("wyp-cln-lo-manual") &&
        !1 == tn.hasClass("wyp-clean-look") &&
        u - l.left <= window.leftBarSize.right &&
        c - s - l.top <= window.leftBarSize.bottom &&
        (u = window.leftBarSize.right + l.left),
      t.css({ left: u + "px", top: c + "px" });
    var m;
    if (c - l.top >= d + s - 25)
      t.addClass("wyp-fixed-tooltip wyp-fixed-tooltip-bottom"),
        u - l.left < o("#ed-elt-tr").width() &&
          t.addClass("wyp-fixed-tooltip-parentbar"),
        t.css("left", u + "px");
    else if (2 > c - l.top || c - l.top < s + 2)
      if (C()) {
        var f = ai(a),
          g = parseFloat(
            sn.active.find(".wyp-selected-boxed-bottom").css("top")
          );
        (c = g - parseFloat(f)),
          t.css("left", u + "px"),
          t.addClass("wyp-fixed-tooltip"),
          (m = (100 * t.outerHeight()) / f),
          10 < m &&
            (t.addClass("wyp-tooltip-bttm-out"),
            (c = g),
            t.css({ left: u + "px", top: c + "px" }));
      } else
        t.addClass("wyp-tooltip-bttm-out"),
          t.css({ top: c + a.outerHeight() + 25 + "px" });
    var h = Ra(t.get(0));
    0 >= p - (h.width + h.left + 80) && t.addClass("wyp-small-tooltip");
  }
  function ni(e) {
    var t;
    return (
      (t = -1 < e.indexOf("://") ? e.split("/")[2] : e.split("/")[0]),
      (t = t.split(":")[0]),
      o.trim(t)
    );
  }
  function si() {
    k({
      title: qi.page_information_cant_be_retrieved,
      text: qi.page_information_cant_be_retrieved_msg,
      customClass: "wyp-page-information-cant-be-retrieved",
      noButton: !0,
    }),
      o(".loading-files").text(""),
      o(".wyp-iframe-loader").css("background-image", "none"),
      o(".sa-error-container,.sa-button-container").css("display", "none"),
      o(".editor-style-ok p").css("margin-bottom", "0px"),
      o(document).on("keyup keydown", function (t) {
        var e = t.keyCode || t.which;
        if (27 == e) return !1;
      });
  }
  function oi(e) {
    "block" == o(".inspector-sublist").css("display") &&
      !1 ==
        o(e.target).is(
          ".cursor-main-btn,.cursor-main-btn *,.inspector-sublist,.inspector-sublist *"
        ) &&
      o(".inspector-sublist").hide(),
      "block" == o(".interface-settings").css("display") &&
        !1 ==
          o(e.target).is(
            ".left-menu-btn,.left-menu-btn *,.interface-settings,.interface-settings *"
          ) &&
        (o(".left-menu-btn").toggleClass("yhover"),
        o(".interface-settings").hide());
    var t = o(e.target);
    if (
      window.ypData["wyp-control-key-down"] &&
      t.hasClass("wyp-selected-others") &&
      0 < _a().split(",").length
    ) {
      var a = _a();
      t.removeClass("wyp-selected-others");
      var i = Ma(t, "sharp");
      a = a.replace(new RegExp("," + Na(i), "g"), "");
      var s = _();
      return (
        L(a), Q(a, s, !0), t.removeClass("wyp-multiple-selected"), Ze(), !1
      );
    }
    if (tn.hasClass("wyp-tooltip-input-blur-only")) return !1;
    if (
      (window.ypData["wyp-css-ed-act"] && n.blur(),
      "cursor" !== window.ypData.inspector && window.ypData["wyp-met-dis"])
    ) {
      if (
        ((1 == e.which || void 0 === e.which) &&
          (e.stopPropagation(), e.preventDefault()),
        Ji.hasClass("wyp-animate-manager-playing"))
      )
        return !1;
      if (window.ypData["wyp-visual-edited"])
        return (window.ypData["wyp-visual-edited"] = void 0), !1;
      if (
        window.ypData["wyp-element-resized"] ||
        window.ypData["resize-time-delay"]
      )
        return (
          (window.ypData["wyp-element-resized"] = void 0),
          (window.ypData["resize-time-delay"] = void 0),
          !1
        );
      if (!0 === C() && window.ypData.editor_context_menu_open)
        return _().contextMenu("hide"), !1;
      var r = o(e.target),
        l,
        d;
      if ((void 0 === e.which || 1 == e.which) && !0 === C()) {
        if (r.hasClass("wyp-slct-menu")) {
          if (((d = r.get(0)), J(d))) return !1;
          l = d.getBoundingClientRect();
          var p = l.left + Ji.scrollLeft() + Ki.scrollLeft();
          0 === p && (p = 1);
          var c = l.top + 26 + 1 + Ji.scrollTop() + Ki.scrollTop();
          return (
            _().contextMenu({ x: p, y: c }),
            o(".context-menu-root").addClass("no-top-radius"),
            !1
          );
        }
        if (r.hasClass("wyp-selected-tooltip")) return fe(), !1;
        if (
          0 < r.parent().length &&
          r.parent().hasClass("wyp-selected-tooltip")
        )
          return fe(), !1;
        if (
          r.is(
            "[class*=wyp-selected-boxed-margin-],[class*=wyp-selected-boxed-padding-]"
          )
        )
          return clearTimeout(window.visualEditDelay), !1;
      }
      if (1 == e.which || void 0 === e.which)
        if (
          !1 === r.hasClass("wyp-selected") &&
          window.ypData["wyp-rcnt-hvr-el"] &&
          window.ypData["wyp-rcnt-hvr-el"].is(r)
        ) {
          if (!0 === C() && 1 != r.parents(".wyp-selected").length) {
            if (S() && !1 === z())
              return (
                k(
                  {
                    title: qi.closeAnim,
                    showCancelButton: !0,
                    confirmButtonText: "Close",
                  },
                  function () {
                    ae(!0);
                  }
                ),
                !1
              );
            if (C() && window.ypData["wyp-control-key-down"]) {
              if (!1 === r.hasClass("wyp-selected-others-box")) {
                var u = _a(),
                  m = Ma(r, "sharp");
                sn.other.find(".wyp-selected-others-multiple-box").remove(),
                  Gi.find(".wyp-multiple-selected")
                    .addClass("wyp-selected-others")
                    .removeClass("wyp-multiple-selected"),
                  L(u + "," + m),
                  Q(u + "," + m, _(), !0),
                  r.blur();
              }
              return !1;
            }
            At(),
              (window.mouseoverTrigger = !0),
              o(e.target).trigger("fakeOver"),
              (window.mouseoverTrigger = !1);
          }
        } else if (!1 === C()) {
          if (
            ((window.visualResizingType = "width"),
            (window.ResizeSelectedBorder = "right"),
            (window.styleAttrBeforeChange = r.attr("style")),
            (d = r.get(0)),
            J(d))
          )
            return !1;
          (l = Ra(d)),
            (window.elementOffsetLeft = l.left),
            (window.elementOffsetRight = l.right),
            r.width(parseFloat(r.width() + 10)),
            (window.ResizeSelectedBorder =
              window.elementOffsetLeft == l.left &&
              window.elementOffsetRight != l.right
                ? "right"
                : window.elementOffsetLeft != l.left &&
                  window.elementOffsetRight == l.right
                ? "left"
                : "right"),
            K(window.styleAttrBeforeChange)
              ? r.attr("style", window.styleAttrBeforeChange)
              : (r.removeAttr("style"), (window.styleAttrBeforeChange = null)),
            window.mouseoverTrigger || Q(Ma(r, "default"), r, !1),
            r.blur();
        }
    }
    return "cursor" === window.ypData.inspector
      ? void 0
      : (e.stopPropagation(), e.preventDefault(), !1);
  }
  function ri() {
    if (Qi.hasClass("wyp-smart-guide-disabled")) return !1;
    for (
      var e = Ji.find(ui()).filter(":in-viewport"), t = 0;
      t < e.length;
      t++
    ) {
      var a = o(e[t]),
        n = a.get(0);
      if (!J(n)) {
        var s = n.getBoundingClientRect().width,
          r = Ra(n);
        if (
          0 >= a.parents(".wyp-selected").length &&
          0 >= a.parents(".wyp-selected-others").length &&
          "none" != a.css("display") &&
          "0" != a.css("opacity") &&
          "hidden" != a.css("visibility") &&
          10 <= r.height
        ) {
          var l = Math.round(r.top + Ji.scrollTop() + Ki.scrollTop()),
            d = Math.round(r.left + Ji.scrollLeft() + Ki.scrollLeft()),
            p = Math.round(r.height);
          0 >=
            Ji.find(
              '[data-wyp-top="' +
                l +
                '"][data-wyp-left="' +
                d +
                '"][data-wyp-width="' +
                s +
                '"][data-wyp-height="' +
                p +
                '"]'
            ).length &&
            a
              .addClass("wyp-smrt-gd-el")
              .attr("data-wyp-top", l)
              .attr("data-wyp-left", d)
              .attr("data-wyp-top-round", ci(l))
              .attr("data-wyp-bottom-round", ci(l + p))
              .attr("data-wyp-left-round", ci(d))
              .attr("data-wyp-right-round", ci(d + s))
              .attr("data-wyp-width", s)
              .attr("data-wyp-height", p);
        }
      }
    }
    sn.extra.append(
      "<div class='wyp-x-distance-border'></div><div class='wyp-y-distance-border'></div>"
    );
  }
  function li() {
    sn.extra
      .find(".wyp-x-distance-border,.wyp-y-distance-border,.wyp-helper-tooltip")
      .remove(),
      Ji.find(".wyp-smrt-gd-el")
        .removeClass("wyp-smrt-gd-el")
        .removeAttr("data-wyp-top")
        .removeAttr("data-wyp-left")
        .removeAttr("data-wyp-width")
        .removeAttr("data-wyp-top-round")
        .removeAttr("data-wyp-bottom-round")
        .removeAttr("data-wyp-left-round")
        .removeAttr("data-wyp-right-round")
        .removeAttr("data-wyp-height");
  }
  function di(e, t) {
    var a = e.parentsUntil("body"),
      i = !1,
      n;
    return (
      a.each(function () {
        if (((n = o(this).hasClass(t)), n)) return (i = !0), !1;
      }),
      i
    );
  }
  function pi(e, t) {
    var a = [],
      i = !1,
      n = e.parent(),
      s = n.css(["display"]);
    if (
      0 < n.length &&
      -1 == s.display.indexOf("table") &&
      "inline" != s.display &&
      "inline-flex" != s.display
    ) {
      var o = n.width();
      !0 == window.liveResizeWPercent &&
        ((i = !0),
        (a.val = Math.round(10 * ((100 * parseFloat(t)) / parseFloat(o))) / 10),
        (a.format = "%")),
        parseInt(o) == parseInt(t) &&
          !1 == i &&
          ((i = !0), (a.val = 100), (a.format = "%")),
        parseInt(o / 2) == parseInt(t) &&
          !1 == i &&
          ((i = !0), (a.val = 50), (a.format = "%")),
        parseInt(o / 4) == parseInt(t) &&
          !1 == i &&
          ((i = !0), (a.val = 25), (a.format = "%")),
        parseInt(o / 5) == parseInt(t) &&
          !1 == i &&
          ((i = !0), (a.val = 20), (a.format = "%"));
    }
    return !1 === i && ((a.val = t), (a.format = "px")), a;
  }
  function ci(e) {
    return 6 * Math.round(e / 6);
  }
  function ui() {
    var e = "*",
      t = window.simple_not_list.split("|"),
      a,
      n,
      s,
      o;
    for (
      a = window.plugin_classes_list.split("|"),
        n = window.plugin_id_list.split("|"),
        s = 0;
      s < a.length;
      s++
    )
      a[s] = "." + a[s];
    for (s = 0; s < n.length; s++) n[s] = "#" + n[s];
    for (t = t.concat(a), t = t.concat(n), o = 0; o < t.length; o++)
      e += ":not(" + t[o] + ")";
    return e;
  }
  function mi(e) {
    if ("number" == typeof e) return e;
    if (void 0 !== e && null !== e && !1 !== e && "" !== e) {
      var t = e.replace(/[^\d.-]/g, "");
      if (null !== t || void 0 !== t) return t;
    }
    return 0;
  }
  function fi(e) {
    return "undefined" != typeof e && "" != e
      ? e.replace(/\d/g, "").replace(".px", "px")
      : "";
  }
  function gi(e) {
    return "undefined" != typeof e && "" != e
      ? ((e = e
          .replace(/\:/g, "yp-sym-p")
          .replace(/\^/g, "yp-sym-a")
          .replace(/\#/g, "yp-sym-c")
          .replace(/\+/g, "yp-sym-o")
          .replace(/\$/g, "yp-sym-q")
          .replace(/\(/g, "yp-sym-e")
          .replace(/\)/g, "yp-sym-s")
          .replace(/\[/g, "yp-sym-g")
          .replace(/\]/g, "yp-sym-x")
          .replace(/\=/g, "yp-sym-k")
          .replace(/\*/g, "yp-sym-n")
          .replace(/\-/g, "yp-sym-t")
          .replace(/\./g, "yp-sym-u")
          .replace(/\>/g, "yp-sym-l")
          .replace(/\,/g, "yp-sym-b")
          .replace(/\~/g, "yp-sym-m")
          .replace(/\@/g, "yp-sym-i")
          .replace(/\//g, "yp-sym-y")
          .replace(/\!/g, "yp-sym-v")
          .replace(/[^a-zA-Z0-9_\^\#\+\$\(\)\[\]\=\*\-\:\.\>\,\~\@\/\!]/g, "")),
        e)
      : "";
  }
  function hi(e) {
    var t = e.filter(function (t, a) {
      return e.indexOf(t) == a;
    });
    return t.filter(Boolean);
  }
  function yi(e) {
    return e.replace(/\w\S*/g, function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    });
  }
  function wi(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }
  function vi(e) {
    return (
      (e = xi(e, !0, !0, !0, !0)),
      (e = e.toLowerCase()),
      -1 != e.indexOf(" ") && (e = e.split(" ")[e.split(" ").length - 1]),
      (e = e
        .replace(/(\>|\*|\+|\:|\~|\[(.*?)\])/g, "")
        .replace(/(\.|\#)/g, "")
        .replace(/(\-|\_)/g, " ")
        .replace(/:nth-child\(\d+\)/g, "")
        .replace(/\bli\b/g, "list item")
        .replace(/(\bul\b|\bol\b)/g, "list")
        .replace(/\ba\b/g, "link")
        .replace(/\bp\b/g, "paragraph")
        .replace(/(\bh1\b|\bh2\b|\bh3\b|\bh4\b|\bh5\b|\bh6\b)/g, "heading")
        .replace(/\bbr\b/g, "line break")
        .replace(/\bhr\b/g, "horizontal rule")
        .replace(/\bb\b/g, "bold tag")
        .replace(/\b(em|i)\b/g, "italic tag")
        .replace(/\bpre\b/g, "preformatted")
        .replace(/\btable\b/g, "table")
        .replace(/\btr\b/g, "table row")
        .replace(/\btd\b/g, "table data")
        .replace(/\bbutton\b/g, "button")
        .replace(/\bcenter\b/g, "centred block")
        .replace(/\bdl\b/g, "definition list")
        .replace(/\bdt\b/g, "definition term")
        .replace(/\bdd\b/g, "definition description")
        .replace(/\btextarea\b/g, "text area")
        .replace(/\btbody\b/g, "body of table")
        .replace(/\bthead\b/g, "head of table")
        .replace(/\btfoot\b/g, "foot of table")
        .replace(/\bu\b/g, "underline text tag")
        .replace(/\bq\b/g, "quotation tag")
        .replace(/\bcite\b/g, "citation")
        .replace(/\btime\b/g, "time tag")
        .replace(/\bcaption\b/g, "caption of table")
        .replace(/\binput\b/g, "input")
        .replace(/\bspan\b/g, "span tag")
        .replace(/\bstrong\b/g, "strong tag")
        .replace(/\bsmall\b/g, "small tag")
        .replace(/\bdiv\b/g, "division")
        .replace(/\bimg\b/g, "image")
        .replace(/\bnav\b/g, "navigation")),
      0 == e.length && (e = "Unknown Element"),
      _i(yi(e))
    );
  }
  function bi(e, t, a) {
    var n = ki(e);
    if (((e = xi(e, !0, !0, !0)), !1 == Ca(e, !1, !1, !1) && !1 == n))
      return !!(a && 0 < a.length) && Si(e, a);
    var s = e.split(",");
    if (1 == s.length) {
      var o;
      if (
        (!1 == n
          ? (o = Si(e, a))
          : ((o = n), ("false" == o || !1 == o) && (o = Si(e, a))),
        !0 == t)
      ) {
        var r = Gi.find(e).length;
        if (
          ((o = o.replace(
            / \((onscreen|hover|click|focus|link|visited|active|checked|disabled|enabled|invalid|valid)\)(\s+)?$/gi,
            ""
          )),
          1 < r)
        )
          return !1 == n ? o.plural() + " (" + r + ")" : o + " (" + r + ")";
        if (/\:nth-child\([0-9]+\)$/gi.test(e)) {
          var l = e.match(/:nth-child\([0-9]+\)$/i);
          if (l && l[0]) return o + " #" + l[0].replace(/[^0-9]+/g, "");
        }
        return o;
      }
      return o;
    }
    if (!1 != n && ((p = n), !1 != p)) return p;
    for (var d = [], p = "", c = 0; c < s.length; c++)
      (n = ki(s[c])),
        !1 == n
          ? (p = Si(s[c], a))
          : ((p = n), ("false" == p || !1 == p) && (p = Si(s[c], a))),
        -1 == d.indexOf(p) && d.push(p);
    return d.toString().replace(/\,/g, ", ");
  }
  function xi(e, t, a, i, n) {
    return (
      !0 === t &&
        ((e = e.replace(
          /\:(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
          ""
        )),
        (e = e
          .replace(/\:yp-onscreen/g, ".yp_onscreen")
          .replace(/\:yp-focus/g, ".yp_focus")
          .replace(/\:yp-hover/g, ".yp_hover")
          .replace(/\:yp-click/g, ".yp_click"))),
      !0 === a &&
        (e = e.replace(
          /:(:)?(after|before|first-letter|first-line|selection)/g,
          ""
        )),
      !0 === i &&
        ((e = e.replace(
          /body\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)\./g,
          "body."
        )),
        (e = e.replace(
          /body\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)$/g,
          "body"
        )),
        (e = e.replace(
          /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
          ""
        ))),
      !0 === n &&
        (e = e.replace(
          /(\.)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g,
          ""
        )),
      e.trim()
    );
  }
  function _i(e) {
    return o.trim(e.replace(/\s\s+/g, " "));
  }
  function ki(e) {
    e = Xe(e);
    var t = window.selectorComments[gi(e)],
      a = "";
    return (
      J(t) &&
        (/(\.|\:)yp(-|_)onscreen/g.test(e)
          ? (a = " (onscreen)")
          : /(\.|\:)yp(-|_)hover/g.test(e)
          ? (a = " (hover)")
          : /(\.|\:)yp(-|_)click/g.test(e)
          ? (a = " (click)")
          : /(\.|\:)yp(-|_)focus/g.test(e) && (a = " (focus)"),
        -1 != e.indexOf(".yp-selector-") &&
          (a =
            " (" +
            e
              .match(
                /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
              )[0]
              .replace(/\.yp-selector-/, "")
              .trim() +
            ")"),
        (t = window.selectorComments[gi(xi(e, !0, !0, !0, !0))])),
      !J(t) && t + a
    );
  }
  function Ci(e, t) {
    (null == t || null == t) && (t = Ai(e, !1));
    var a = gi(Xe(e));
    (null == window.selectorComments[a] ||
      null == window.selectorComments[a]) &&
      window.newComments.push(a),
      (window.selectorComments[a] = Oi(t));
  }
  function zi(e) {
    if (e.split("{").length != e.split("}").length) return !1;
    e = e.replace(
      /\*\/(body)?\.yp-selector-(.*?)\n/gi,
      "*/\n$1.yp-selector-$2"
    );
    var t = e.match(/\/\*(.*?)\*\/\n(.*?){/gi);
    if (null == t) return !1;
    for (var a = 0, n, s, o; a < t.length; a++)
      ((n = t[a]),
      (o = n
        .split("*/")[0]
        .replace(/\/\*/g, "")
        .replace(/(\r\n|\n|\r|\t)/g, "")
        .trim()),
      (s = n
        .split("*/")[1]
        .replace(/(\r\n|\n|\r|\t)/g, "")
        .replace(/(\{|\})/g, "")
        .trim()),
      !0 != /\@media/g.test(s)) &&
        null != s &&
        null != s &&
        Ci(s, o);
    Di();
  }
  function Oi(e) {
    return null == e || null == e || "" == e
      ? e
      : ((e = e.replace(
          /(select|delete|create|drop|alter|insert|update|truncate)/g,
          "Unknown"
        )),
        (e = e
          .replace(/(\r\n|\n|\r)/g, "")
          .replace(/(\/\*|\*\/)/g, "")
          .replace(/[^a-zA-Z0-9\_\-\?\s\=\/\.\,\@\&\+\!\(\)]/g, "")
          .trim()),
        0 == e.length)
      ? ""
      : ((e = e.match(/.{1,70}/i)[0]), e);
  }
  function Di() {
    var e = _a(!0);
    if ("" == e || null == e) return !1;
    var t = bi(e, !0, _());
    sn.general.get(0).style.setProperty("--tooltip-selector", '"' + e + '"'),
      sn.general.get(0).style.setProperty("--tooltip-title", '"' + t + '"'),
      C()
        ? o("#wyp-crnt-el").text(t)
        : o("#wyp-crnt-el").text(qi.no_el_selected);
  }
  function Ai(e, t) {
    e = Xe(e);
    var a = "",
      i;
    (i = bi(e, t, null)), J(i) && (i = vi(e));
    var n = ki(e);
    return (
      !1 != n && (n = n.toLowerCase()),
      i.toLowerCase() != n &&
        (/(\.|\:)yp(-|_)onscreen/g.test(e)
          ? (a = " (onscreen)")
          : /(\.|\:)yp(-|_)hover/g.test(e)
          ? (a = " (hover)")
          : /(\.|\:)yp(-|_)click/g.test(e)
          ? (a = " (click)")
          : /(\.|\:)yp(-|_)focus/g.test(e) && (a = " (focus)"),
        -1 != e.indexOf(".yp-selector-") &&
          (a =
            " (" +
            e
              .match(
                /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
              )[0]
              .replace(/\.yp-selector-/, "")
              .trim() +
            ")")),
      (i + a).trim()
    );
  }
  function Si(e, t) {
    var a = "",
      i = !1,
      n = "",
      s,
      r,
      l,
      d;
    if (
      ((e = xi(e, !0, !0, !0, !0)),
      null == t &&
        ((t = Gi.find(e).filter(".wyp-selected")),
        0 >= t.length && (t = Gi.find(e))),
      "*" == e)
    )
      return "All Elements";
    if (":root" == e) return "Root";
    if (
      ((s = ua(e).length - 1),
      (r = t.prop("tagName")),
      (l = ua(e)[s].trim()),
      -1 != l.indexOf(".") && (l = "." + l.split(".")[1]),
      -1 != l.indexOf("#") && (l = "#" + l.split("#")[1]),
      -1 != l.indexOf(":") && (l = l.split(":")[0]),
      t.hasAttr("id") && (n = t.attr("id")),
      t.hasAttr("class") && (a = t.attr("class").toUpperCase()),
      (d =
        "" == a
          ? o.trim(l.replace(/[^a-zA-Z0-9\s]/g, ""))
          : o.trim((a + " " + n).replace(/[^a-zA-Z0-9\s]/g, ""))),
      "BODY" == r)
    )
      return "Body";
    if (/(^|\s)WIDGET($|\s)/.test(d)) return "Widget";
    if (/(^|\s)(MENU|MAIN-MENU|NAVIGATION|NAV)($|\s)/.test(d)) return "Menu";
    if (/(^|\s)(FA|FA-(.*?))($|\s)/.test(a)) return "Font Icon";
    if (/(^|\s)SUBMIT($|\s)/.test(d) && "INPUT" == r) return "Submit Button";
    if (/(^|\s)MENUITEM($|\s)/.test(d)) return "Menu Item";
    if (/(^|\s)(ENTRYMETA|ENTRYMETABOX|POSTMETABOX)($|\s)/.test(d))
      return "Post Meta Division";
    if (/(^|\s)COMMENTREPLYTITLE($|\s)/.test(d)) return "Comment Reply Title";
    if (/(^|\s)LOGGEDINAS($|\s)/.test(d)) return "Login Info";
    if (/(^|\s)FORMALLOWEDTAGS($|\s)/.test(d)) return "Allowed Tags Section";
    if (/(^|\s)LOGO($|\s)/.test(d)) return "Logo";
    if (/(^|\s)(ENTRYTITLE|POSTTITLE)($|\s)/.test(d)) return "Post Title";
    if (/(^|\s)COMMENTFORM($|\s)/.test(d)) return "Comment Form";
    if (/(^|\s)WIDGETTITLE($|\s)/.test(d)) return "Widget Title";
    if (/(^|\s)TAGCLOUD($|\s)/.test(d)) return "Tag Cloud";
    if (/(^|\s)ROW($|\s)/.test(d)) return "Row";
    if (/(^|\s)(BUTTON|BTN)($|\s)/.test(d)) return "Button";
    if (/(^|\s)LEAD($|\s)/.test(d)) return "Lead";
    if (/(^|\s)WELL($|\s)/.test(d)) return "Well";
    if (/(^|\s)ACCORDIONTOGGLE($|\s)/.test(d)) return "Accordion Toggle";
    if (/(^|\s)PANELBODY($|\s)/.test(d)) return "Accordion Content";
    if (/(^|\s)ALERT($|\s)/.test(d)) return "Alert Division";
    if (/(^|\s)MORELINK($|\s)/.test(d)) return "Show More Link";
    if (/(^|\s)(MENULINK|MENUICON|MENUBTN|MENUBUTTON)($|\s)/.test(d))
      return "Menu Link";
    if (/(^|\s)SUBMENU($|\s)/.test(d)) return "Sub Menu";
    if (/(^|\s)(POSTBODY|POST)($|\s)/.test(d)) return "Post Division";
    if (/(^|\s)(CONTENT|DEFAULTCONTENT)($|\s)/.test(d))
      return "Content Division";
    if (/(^|\s)ENTRYCONTENT($|\s)/.test(d)) return "Entry Content";
    if (/(^|\s)ENTRYFOOTER($|\s)/.test(d)) return "Entry Footer";
    if (/(^|\s)ENTRYHEADER($|\s)/.test(d)) return "Entry Header";
    if (/(^|\s)ENTRYTIME($|\s)/.test(d)) return "Entry Time";
    if (/(^|\s)POSTEDITLINK($|\s)/.test(d)) return "Post Edit Link";
    if (/(^|\s)POSTTHUMBNAIL($|\s)/.test(d)) return "Post Thumbnail";
    if (/(^|\s)THUMBNAIL($|\s)/.test(d)) return "Thumbnail";
    if (/([a-zA-Z0-9_-]+)?ATTACHMENT([a-zA-Z0-9_-]+)?/.test(a))
      return "Thumbnail Image";
    if (/(^|\s)EDITLINK($|\s)/.test(d)) return "Edit Link";
    if (/(^|\s)COMMENTSLINK($|\s)/.test(d)) return "Comments Link Division";
    if (/(^|\s)SITEDESCRIPTION($|\s)/.test(d)) return "Site Description";
    if (K(a)) {
      var p = a.match(
        /([a-zA-Z0-9_-]+)?(span|small|medium|large|col|column|[_-]l|[_-]m|[_-]s|col-xs|col-md|col-lg|-col-sm)([_-])?[0-9]+/i
      );
      if (K(p) && !1 === /section/gi.test(a)) {
        var c = parseInt(p[0].replace(/\D/g, ""));
        if (0 < c && 13 > c) return "Column " + c + "/12";
      }
    }
    if (((i = Ti(l)), !1 !== i && !0 == /(#|\.)/g.test(l))) return i;
    if (
      -1 !=
        [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "img",
          "a",
          "li",
          "ul",
          "header",
          "footer",
          "article",
          "code",
          "form",
          "label",
          "ol",
          "blockquote",
          "nav",
        ].indexOf(l) &&
      !1 == /(#|\.)/g.test(l)
    ) {
      if (
        "h1" == l ||
        "h2" == l ||
        "h3" == l ||
        "h4" == l ||
        "h5" == l ||
        "h6" == l
      )
        return "Heading";
      if ("p" == l) return "Paragraph";
      if ("img" == l) return "Image";
      if ("a" == l) return "Link";
      if ("li" == l) return "List Item";
      if ("ul" == l) return "List";
      if ("header" == l) return "Header";
      if ("footer" == l) return "Footer";
      if ("article" == l) return "Article";
      if ("code" == l) return "Code Tag";
      if ("form" == l) return "Form Division";
      if ("label" == l) return "Label";
      if ("ol" == l) return "List";
      if ("blockquote" == l) return "Block Quote";
      if ("nav" == l) return "Navigation";
    }
    return /(^|\s)(CONTAINER|WRAPPER)($|\s)/.test(d)
      ? "Wrapper"
      : "BR" == r
      ? "Line Break"
      : "HR" == r
      ? "Horizontal Rule"
      : "PRE" == r
      ? "Preformatted"
      : "TABLE" == r
      ? "Table"
      : "TR" == r
      ? "Table Row"
      : "TD" == r
      ? "Table Data"
      : "BUTTON" == r
      ? "Button"
      : "CENTER" == r
      ? "Centred block"
      : "DL" == r
      ? "Definition list"
      : "DT" == r
      ? "Definition term"
      : "DD" == r
      ? "Definition description"
      : "TEXTAREA" == r
      ? "Text Area"
      : "TBODY" == r
      ? "Body Of Table"
      : "THEAD" == r
      ? "Head Of Table"
      : "TFOOT" == r
      ? "Foot Of Table"
      : "U" == r
      ? "Underline text tag"
      : "Q" == r
      ? "Quotation"
      : "CITE" == r
      ? "Citation Tag"
      : "TIME" == r
      ? "Time Tag"
      : "CAPTION" == r
      ? "Caption Of table"
      : "INPUT" == r
      ? "Input"
      : "SPAN" == r
      ? "Span Tag"
      : "B" == r
      ? "Bold Tag"
      : "EM" == r || "I" == r
      ? "Italic Tag"
      : "STRONG" == r
      ? "Strong Tag"
      : "SMALL" == r
      ? "Small Tag"
      : "DIV" == r
      ? "Division"
      : ("H1" == r ||
        "H2" == r ||
        "H3" == r ||
        "H4" == r ||
        "H5" == r ||
        "H6" == r
          ? (r = "Heading")
          : "P" == r
          ? (r = "Paragraph")
          : "IMG" == r
          ? (r = "Image")
          : "A" == r
          ? (r = "Link")
          : "LI" == r
          ? (r = "List Item")
          : "UL" == r
          ? (r = "List")
          : "HEADER" == r
          ? (r = "Header")
          : "FOOTER" == r
          ? (r = "Footer")
          : "ARTICLE" == r
          ? (r = "Article")
          : "CODE" == r
          ? (r = "Code Tag")
          : "FORM" == r
          ? (r = "Form Division")
          : "LABEL" == r
          ? (r = "Label")
          : "OL" == r
          ? (r = "List")
          : "BLOCKQUOTE" == r
          ? (r = "Block Quote")
          : "NAV" == r && (r = "Navigation"),
        "undefined" == typeof r || !1 === r
          ? "Unknown Element"
          : wi(r.replace(/(_|-)/g, " ").toLowerCase()));
  }
  function Ti(e) {
    if ("undefined" == typeof e || !1 === e) return !1;
    (e = e.replace(/(#|\.)/g, "")),
      (e = e.replace(/([A-Z][a-z])/g, "-$1").toLowerCase());
    var t = /[A-Z]/,
      a = /-/;
    if (window.ypOption.show_css_selector) {
      if (/_/.test(e) && a.test(e)) return !1;
      if (a.test(e) && 3 <= e.match(/(-|_)/g).length) return !1;
    } else if (a.test(e) && 5 <= e.match(/(-|_)/g).length) return !1;
    if (
      ((e = e.replace(/_/g, " ").replace(/-/g, " ")),
      window.ypOption.show_css_selector)
    ) {
      if (e.match(t) || 5 > e.length || 20 < e.length) return !1;
    } else if (e.match(t) || 3 > e.length || 50 < e.length) return !1;
    return Ei(e);
  }
  function Ei(e) {
    for (var t = [], a = e.split(" "), n = 0; n < a.length; n++)
      28 < a[n].length ||
        (1 < a.length &&
          /\b(elementor|oxy|ast|uael|owl|avia)\b/gi.test(a[n])) ||
        (/(A|E|I|O|U)/gi.test(a[n]) && 2 < a[n].length
          ? t.push(a[n])
          : !1 === /[A-Z]/i.test(a[n])
          ? t.push(a[n])
          : 3 < a[n].length && t.push(a[n]));
    var s = t.join(" ").trim();
    return !!(2 < s.length) && wi(s);
  }
  function Li(e, t, a) {
    var i, n;
    0 < o("#" + a).length
      ? (i = o("#" + a))
      : ((i = o(
          "<div class='wyp-message-box' id='" +
            a +
            "'><b>" +
            e +
            "</b>" +
            t +
            "</div>"
        )),
        tn.append(i),
        (n = !0));
    var s = o(".ed-pnl").offset();
    tn.hasClass("wyp-cln-lo-panel-only") && (s.top = 14),
      window.ypData["wyp-fix-pan"] && (s.top = 14),
      i.css("left", s.left - i.outerWidth() - 30),
      i.css("top", s.top),
      n && i.css("opacity", "1"),
      setTimeout(function () {
        i.css("opacity", "0"),
          setTimeout(function () {
            i.remove();
          }, 350);
      }, 6e3);
  }
  function Bi(e) {
    0 < o("#" + e).length &&
      (o("#" + e).css("opacity", "0"),
      setTimeout(function () {
        o("#" + e).remove();
      }, 350));
  }
  function Mi() {
    if (
      (clearTimeout(window.wyp_insert_data_delay),
      tn.hasClass("css-code-unvalid"))
    )
      return !1;
    tn.addClass("wyp-history-delay"),
      o(".wyp-save-btn")
        .text(qi.save)
        .removeClass("wyp-disabled")
        .addClass("waiting-for-save");
    var e = window.editedByReview,
      t = 370;
    (window.wyp_insert_data_delay = setTimeout(function () {
      var t = E();
      Gi.find(".wyp-data-only-updated").each(function () {
        var e = o(this),
          t;
        (t = e.attr("data-source-mode")), y(t);
        var a = Et(!0, t, !0);
        n.setValue(a), e.removeClass("wyp-data-only-updated");
      }),
        y(t),
        window.ypData["vsl-css-vi-active"] && !1 == e && (Yt(), Zt()),
        sa(),
        tn.removeClass("wyp-history-delay"),
        window.ypData["wyp-css-ed-act"] && _e(),
        n.getSession().removeMarker(window.typeHereMarker),
        yt("all");
    }, t)),
      setTimeout(function () {
        $();
      }, t + 20),
      A() && he(!0),
      0 == o(".wyp-type-menu-link.done").length &&
        (o(".wyp-type-menu-link").addClass("focus").addClass("done"),
        setTimeout(function () {
          o(".wyp-type-menu-link").removeClass("focus");
        }, 600));
  }
  function Zi() {
    if (
      !1 === window.ypData["wyp-need-to-process"] ||
      window.ypData["wyp-processing-now"]
    )
      return !1;
    var e = Et(!0, null, !1);
    if (
      ((window.ypData["wyp-need-to-process"] = !1),
      (window.ypData["wyp-processing-now"] = !0),
      qe("desktop"),
      (e = e.toString()),
      -1 != e.indexOf("@media"))
    ) {
      var i = e
        .replace(/(\r\n|\n|\r)/g, "")
        .replace(/(\/\*)(.*?)\*\/(\s+)?/g, "")
        .replace(/@media[^\{]+{(\s?)+}/g, "")
        .match(/@media(.*?){/g);
      (i = hi(i)),
        o.each(i, function (e, t) {
          (t = za(t, !1)), qe(t);
        });
    }
    Gi.find("#wyp-live-css-data").remove(),
      r(f(null, null, null, !0)),
      (window.ypData["wyp-processing-now"] = !1),
      T() && H();
    var n = ["single", "template", "global"],
      s,
      l,
      d,
      c;
    for (s = 0; s < n.length; s++) c += a(n[s], !1);
    for (gn = 0; gn < window.newComments.length; gn++)
      ((d = window.newComments[gn]), null != d && null != d) &&
        ((l = p(c, "[selector=" + d + "]")), null != l && null != l) &&
        0 == l.length &&
        delete window.selectorComments[d];
    Di();
  }
  function Pi(e) {
    return "undefined" == typeof e
      ? ""
      : -1 == e.indexOf("rgba")
      ? ((e = e.match(
          /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
        )),
        e && 4 === e.length
          ? "#" +
            ("0" + parseInt(e[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(e[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(e[3], 10).toString(16)).slice(-2)
          : "")
      : e.replace(/\s+/g, "");
  }
  function Ri(e) {
    e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, a, i) {
      return t + t + a + a + i + i;
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t
      ? "rgb(" +
          parseInt(t[1], 16) +
          "," +
          parseInt(t[2], 16) +
          "," +
          parseInt(t[3], 16) +
          ")"
      : null;
  }
  function Ii(e) {
    return J(e)
      ? ""
      : e.replace(new RegExp(window.plugin_classes_list_sorted, "gi"), "");
  }
  function Yi() {
    clearTimeout(window.animationTimer1),
      clearTimeout(window.animationTimer2),
      clearTimeout(window.animationTimer3),
      clearTimeout(window.animationTimer4),
      clearTimeout(window.animationTimer5);
  }
  function Ni() {
    Gi.find(_a()).trigger("animationend");
  }
  function Hi(e, t) {
    var a = e;
    if (("body" == e && (e = e + "." + t), -1 != e.indexOf("body." + t)))
      return e;
    var n = "";
    if (0 < ua(e).length) {
      var s = o.trim(ua(e)[0]);
      "html" == s.toLowerCase() && (n = s);
      try {
        Gi.find(s);
      } catch (t) {
        return e;
      }
      0 < Gi.find(s).length &&
        (-1 != s.indexOf("#") &&
          "HTML" == Gi.find(s).prop("tagName") &&
          (n = s),
        -1 != s.indexOf(".") &&
          "HTML" == Gi.find(s).prop("tagName") &&
          (n = s)),
        "" != n && (e = ua(e)[1]);
    }
    if (
      ((e = e.replace(/\bbody\./g, "body." + t + ".")),
      (e = e.replace(" body ", " body." + t + " ")),
      -1 != e.indexOf("body." + t))
    )
      return "" != n && (e = n + " " + e), e;
    if (void 0 !== Ji.attr("class") && null !== Ji.attr("class")) {
      var r = Gi.find(a);
      if (0 < r.length && "BODY" == r.prop("tagName"))
        for (var l = ma(Ji.attr("class")), d = 0; d < l.length; d++)
          (e = e.replace("." + l[d] + " ", "." + l[d] + "." + t + " ")),
            1 == ua(e).length &&
              l[d] == e.replace(".", "") &&
              (e = e + "." + t);
    }
    if (-1 != e.indexOf("." + t + " ")) return "" != n && (e = n + " " + e), e;
    if (-1 != e.indexOf("." + t) && 1 == ua(e).length)
      return "" != n && (e = n + " " + e), e;
    var p = Ji.attr("id");
    return ((e = e.replace("#" + p + " ", "#" + p + "." + t + " ")),
    -1 != e.indexOf("." + t + " "))
      ? ("" != n && (e = n + " " + e), e)
      : ((e = "YPIREFIX" + e),
        (e = e.replace(/YPIREFIXbody /g, "body." + t + " ")),
        (e = e.replace("YPIREFIX", "")),
        -1 != e.indexOf("body." + t + " "))
      ? ("" != n && (e = n + " " + e), e)
      : ((-1 == e.indexOf(" body ") || -1 == e.indexOf(" body.")) &&
          (e = "body." + t + " " + e),
        "" != n && (e = n + " " + e),
        e);
  }
  function Wi(e) {
    var t, a, i;
    (t = o("#unsplash-search").val()), "" == t.trim() && (t = null);
    (window.getJsonNow = !0),
      (a =
        null == t
          ? "https://api.unsplash.com/photos"
          : "https://api.unsplash.com/search/photos"),
      (a +=
        "?client_id=5746b12f75e91c251bddf6f83bd2ad0d658122676e9bd2444e110951f9a04af8"),
      null != t && (a += "&query=" + t),
      null != e && (a += "&page=" + e),
      o
        .getJSON(a, function (e) {
          0 == e.total
            ? o(".wyp-unsplash-list").addClass("no-result")
            : o(".wyp-unsplash-list").removeClass("no-result"),
            (i = null == t ? e : e.results);
          var a;
          o.each(i, function (e, t) {
            (a = t.urls.thumb),
              o(".wyp-unsplash-list").append(
                "<span style='background-color:" +
                  t.color +
                  ";' data-id='" +
                  t.id +
                  "' data-regular='" +
                  t.urls.regular +
                  "' data-small='" +
                  t.urls.small +
                  "' data-thumb='" +
                  t.urls.thumb +
                  "' ><i>Upload</i></span>"
              );
          }),
            (window.getJsonNow = !1),
            Fi();
        })
        .fail(function () {
          Li(
            "Loading Error",
            "Could Not Load Json library. (Unsplash API)",
            "jsonError"
          );
        });
  }
  function Fi() {
    o(".wyp-unsplash-list > span:in-viewport").each(function () {
      o(this).css(
        "background-image",
        "url(" + o(this).attr("data-thumb") + ")"
      );
    });
  }
  function ji() {
    if (
      0 < o(".wyp-unsplash-list > span:nth-last-child(-n+4):in-viewport").length
    ) {
      var e = o(".wyp-unsplash-list > span").length;
      !1 == window.getJsonNow && Wi(e / 10 + 1);
    }
  }
  function Xi(e) {
    var t = e.match(/id=["|'|](.*?)["|'|\s|>]/g);
    if (t && 0 < t.length) {
      for (var a = 0; a < t.length; a++)
        t[a] = t[a].replace(/^id=("|'|)|("|'|>)$/g, "").trim();
      return t;
    }
    return [];
  }
  function Vi(e) {
    var t = [],
      a = e.match(/class=["|'|](.*?)["|'|>]/g);
    if (a && 0 < a.length)
      for (var n = 0; n < a.length; n++)
        (a[n] = a[n].replace(/^class=("|'|)|("|'|>)$/g, "").trim()),
          (t = t.concat(ma(a[n])));
    return t;
  }
  if (
    ((window.ypData = {
      "data-clickable-select": void 0,
      is_content_selected: !1,
      is_responsive_mod: !1,
      is_dragging: !1,
      is_resizing: !1,
      is_visual_editing: !1,
      is_animate_creator: !1,
      is_animation_manager: !1,
      "wyp-need-to-process": !1,
      "wyp-processing-now": !1,
      "wyp-met-dis": !0,
      inspector: "default",
      editor_context_menu_open: !1,
      demo_mode: !1,
      "wyp-control-key-down": !1,
    }),
    window.bMode)
  ) {
    (window.ypOption = {
      fixed_right_panel: !1,
      fixed_left_bar: !1,
      hide_premium_options: !1,
      show_css_selector: !1,
      smart_responsive_technology: !0,
      smart_important_tag: !0,
      append_auto_comments: !0,
    }),
      (window.selectorComments = {});
    var Ui = new URL(window.location);
    Ui.searchParams.set("wyp", "1"),
      window.history.pushState({}, "", Ui),
      o(window).on("popstate", function () {
        location.reload();
      });
  }
  var qi = {};
  (qi.back_to_menu = "Back to menu"),
    (qi.close_editor = "Close Editor"),
    (qi.saving = window.bMode ? "Export" : "Saving"),
    (qi.save = window.bMode ? "Export" : "Save"),
    (qi.saved = window.bMode ? "Export" : "Saved"),
    (qi.unknown = "Unknown"),
    (qi.no_el_selected = "No element selected"),
    (qi.live_preview_alert = "This tool is disabled in demo mode!"),
    (qi.live_preview_text =
      "You can download the free version of the plugin and try on your site."),
    (qi.save_alert = "Saving is disabled in demo mode!"),
    (qi.list_notice =
      "The selected element is not a list item, Select a list item to edit styles."),
    (qi.list_notice1 =
      "Disable list style image property to use this property."),
    (qi.display_notice =
      "This property may not work, Set 'block' or 'inline-block' value to display option from extra section."),
    (qi.absolute_notice =
      "The absolute value could harm mobile view, Set absolute value just to high screen sizes with responsive tool."),
    (qi.fixed_notice =
      "The fixed value could harm mobile view, Set fixed value just to high screen sizes with responsive tool."),
    (qi.negative_margin_notice =
      "Negative margin value could break the website layout."),
    (qi.high_position_notice =
      "High position value could harm mobile view, Please apply this change only to large screen sizes using the responsive tool."),
    (qi.bg_img_notice_two = "Set a background image for using this feature."),
    (qi.bg_img_notice_tree =
      "Set a background color or image for using this feature."),
    (qi.sure = "Are you sure you want to leave the page without saving?"),
    (qi.height_notice =
      "The height property can cause conflict with the dynamic elements. Use min height and max height for dynamic contents."),
    (qi.cantUndo =
      'You can\'t undo the changes while creating a new animation. Click "reset icon" if you want to disable any option.'),
    (qi.cantUndoAnimManager =
      "You can't undo the changes while animation manager on."),
    (qi.cantEditor =
      "You can't use the CSS editor while creating a new animation."),
    (qi.allScenesEmpty =
      "Please add properties to the scenes to play the animation."),
    (qi.scene = "Scene"),
    (qi.closeAnim =
      "Are you sure you want to close Animation Generator without saving?"),
    (qi.notice = "Notice"),
    (qi.warning = "Warning"),
    (qi.empty = "empty"),
    (qi.style = "style"),
    (qi.type_not_available = "Can not be used on the current page."),
    (qi.you_are_sure = "You are sure?"),
    (qi.delete_anim = "Delete Animate"),
    (qi.welcome_pro = "Welcome to Pro Club!"),
    (qi.license_activated =
      "License Activated! Thank you for your purchase. We are here to help! Check out <a href='https://yellowpencil.waspthemes.com/documentation/' target='_blank'>Plugin Docs</a> and join <a href='https://www.facebook.com/groups/YellowPencils/' target='_blank'>Facebook Community</a>."),
    (qi.general = "General"),
    (qi.paragraph = "Paragraph"),
    (qi.heading_level = "Heading Level"),
    (qi.element_id = "Element ID"),
    (qi.tag = "Tag"),
    (qi.affected_els = "Selected elements"),
    (qi.pseudo_class = "States&hellip;"),
    (qi.conditions = "Conditions&hellip;"),
    (qi.all_devices = "All Devices"),
    (qi.delay = "Delay"),
    (qi.duration = "Duration"),
    (qi.delete_t = "Delete"),
    (qi.reset = "Reset"),
    (qi.add_new_anim = "Add New Animate"),
    (qi.sorry = "Sorry."),
    (qi.all_scenes_empty = "All scenes are empty."),
    (qi.animation_name = "Save Animation"),
    (qi.save_animation = "Save"),
    (qi.set_animation_name = "Set a name to the animation to save."),
    (qi.scene_properties = "Scene Properties"),
    (qi.no_property_yet = "No properties yet."),
    (qi.save_error = "An error occurred while saving."),
    (qi.save_error_msg =
      "The server may be offline either server's maximum post limit is not enough. Please try again later."),
    (qi.save_error_nonce_msg =
      "Nonce verification has failed. Please copy the CSS data from the CSS Editor and refresh the page."),
    (qi.save_error_authorized_msg =
      "You do not have the authority to edit the site appearance or you may have logged out."),
    (qi.save_error_json_msg =
      "Unable to save CSS comments. You can fix this problem by resetting settings from WP Dashboard > YellowPencil > Settings page."),
    (qi.define_breakpoints = "breakpoints"),
    (qi.breakpoint_size = "{$1}px and {$2} screens"),
    (qi.css_parse_error = "CSS Parse Error."),
    (qi.css_parse_error_text =
      "The changes you made in the CSS editor seems to be invalid. To continue, undo changes with CMD + Z or fix this CSS error."),
    (qi.delete_media_query = "Do you want reset {$1} Media Query?"),
    (qi.delete_media_query_msg =
      "This process will reset the media query just in the current customization type."),
    (qi.active_breakpoint = "Active Breakpoint"),
    (qi.review_breakpoint = "Review Breakpoint"),
    (qi.show_in_editor = "Show In CSS Editor"),
    (qi.parent_elements = "Parent Elements&hellip;"),
    (qi.children_elements = "Child Elements&hellip;"),
    (qi.select_only_this = "Select Only This"),
    (qi.write_css = "Write CSS"),
    (qi.edit_selector =
      "Edit Selector <span style='opacity: 0.6;margin-left: 4px;'>(F)</span>"),
    (qi.review_styles = "Review Styles"),
    (qi.reset_styles = "Reset Styles&hellip;"),
    (qi.single = "Single&hellip;"),
    (qi.the_element = "Element"),
    (qi.child_elements = "Child Elements"),
    (qi.template = "Template&hellip;"),
    (qi.global_t = "Global&hellip;"),
    (qi.leave = "Leave"),
    (qi.above_t = "larger"),
    (qi.below_t = "smaller"),
    (qi.toggle_media_query_condition = "Toggle media query condition as {$1}"),
    (qi.customize_type_not_available =
      "This customizing type can not be used on the current page."),
    (qi.cursor_warning =
      "This change does not appear in the editor, check it with Live Preview."),
    (qi.reset_type_msg =
      "You are sure to reset all styles in <strong>{$1} customization</strong>?"),
    (qi.reset_btn = "Yes, Reset!"),
    (qi.manager_msg1 = "There is no style matching with the selected element."),
    (qi.manager_msg2 = "Select an item to review matching styles."),
    (qi.manager_msg3 = "Single customization is empty."),
    (qi.manager_msg4 = "Template customization is empty."),
    (qi.manager_msg5 = "Global customization is empty."),
    (qi.manager_msg6 = "There is no style in this media query."),
    (qi.manager_msg7 = "There are no styles matching your search term."),
    (qi.manager_msg8 = "No style found. Check again after making a few edits."),
    (qi.manager_msg9 = "All styles on the current page are listed below."),
    (qi.manager_msg10 =
      "The styles matching with the selected element are listed below."),
    (qi.manager_msg11 = "Single Customization styles listed below."),
    (qi.manager_msg12 = "Template Customization styles listed below."),
    (qi.manager_msg13 = "Global Customization styles listed below."),
    (qi.manager_msg14 = "All styles in this media query are listed below."),
    (qi.manager_msg15 =
      "No styles were found. Check again after making a few edits."),
    (qi.manager_msg16 =
      "All styles that match your search term are listed below."),
    (qi.selector_no_match =
      "The selector doesn't match any element on this page"),
    (qi.all_msg = "All screen sizes"),
    (qi.not_wp_link =
      "This link is not an wordpress page. You can't edit this page."),
    (qi.external_link =
      "This is an external link. You can't edit this page. <em style='opacity:0.8'>(Click the element while holding down CTRL key to run the Javascript action.)</em>"),
    (qi.link_not_valid =
      "This link is not an wordpress page. You can't edit this page. <em style='opacity:0.8'>(Click the element while holding down CTRL key to run the Javascript action.)</em>"),
    (qi.page_loading = "Loading Editor"),
    (qi.page_information_cant_be_retrieved =
      "Page information cannot be retrieved."),
    (qi.page_information_cant_be_retrieved_msg =
      "Please close the page and open the target page manually with YellowPencil."),
    (qi.contrast_ac =
      "Background and text colors should meet WCAG contrast standards to make the text legible on all devices."),
    (qi.line_spacing_ac =
      "Line spacing should be minimum 1 and maximum 2. This ratio varies depending on the font size."),
    (qi.font_size_ac =
      "Font size should be a minimum of 12 pixels to easy readable."),
    (window.plugin_classes_list =
      "wyp-bg-layer-active|wyp-x-distance-border|wyp-y-distance-border|hv-in-bx|wyp-helper-tooltip|wyp-css-editor-disable|wyp-no-wf|wyp-ele-n-vis|wyp-iframe-ph|wyp-data-updated|wyp-inline-data|wyp-animating|wyp-scene-1|wyp-single-inspector-active|wyp-scene-2|wyp-scene-3|wyp-scene-4|wyp-scene-5|wyp-scene-6|wyp-ani-cre|wyp-animate-test-playing|yp-yellow-pencil-demo-mode|yellow-pencil-ready|yp_onscreen|yp_hover|yp_click|yp_focus|wyp-selected-others|wyp-multiple-selected|wyp-demo-link|wyp-live-editor-link|yp-yellow-pencil|wyp-con-slcd|wyp-hid-bor-n|wyp-selector-editor-active|wyp-res-mod|wyp-met-dis|wyp-css-ed-act|wtfv|wyp-clean-look|wyp-h-trfm|wyp-selected|wyp-el-reing|context-menu-active|wyp-selectors-hide|wyp-control-key-down|wyp-selected-others-multiple-box|wyp-if-movleav|wyp-selected-boxed-top|wyp-selected-boxed-bottom|wyp-selected-boxed-left|wyp-selected-boxed-right|wyp-selected-boxed-margin-left|wyp-zero-m-w|wyp-animate-manager-active|wyp-wf-on|yp-selector-hover|wyp-size-handle|wyp-flexible-inspector-active|wyp-selected-boxed-margin-top|wyp-selected-boxed-margin-bottom|wyp-selected-boxed-margin-right|wyp-selected-boxed-padding-left|wyp-selected-boxed-padding-top|wyp-selected-boxed-padding-bottom|wyp-selected-boxed-padding-right|wyp-selected-tooltip|wyp-slct-tooltip|wyp-slct-menu|wyp-full-width-selected|wyp-zero-m-h|wyp-tooltip-small|wyp-selected-bottom|wyp-fixed-tooltip|wyp-tooltip-bttm-out|wyp-css-slctr-off");
  for (var $i = 0; 51 > $i; $i++)
    window.plugin_classes_list += "|wyp-pa-r" + $i;
  (window.plugin_id_list =
    "wyp-drw-bx|wyp-anim-scenes|anim-tester|wyp-animate-data|yellow-pencil-canvas|yellow-pencil-focus-canvas|yellow-pencil-other-canvas|yellow-pencil-extra-canvas"),
    (window.simple_not_list =
      "link|style|script|noscript|meta|title|br|param|option|head|circle|rect|polygon|defs|linearGradient|stop|ellipse|text|line|polyline|path|g|tspan"),
    o(".fixed_right_panel_checkbox input").prop(
      "checked",
      window.ypOption.fixed_right_panel
    ),
    o(".fixed_left_bar_checkbox input").prop(
      "checked",
      window.ypOption.fixed_left_bar
    ),
    o(".hide_premium_options_checkbox input").prop(
      "checked",
      window.ypOption.hide_premium_options
    ),
    o(".show_css_selector_checkbox input").prop(
      "checked",
      window.ypOption.show_css_selector
    ),
    o(".smart_responsive_technology_checkbox input").prop(
      "checked",
      window.ypOption.smart_responsive_technology
    ),
    o(".smart_important_tag_checkbox input").prop(
      "checked",
      window.ypOption.smart_important_tag
    ),
    o(".append_auto_comments_checkbox input").prop(
      "checked",
      window.ypOption.append_auto_comments
    ),
    (window.define = window.define || ace.define),
    !0 !== window.bMode && ace.config.set("basePath", aceEditorBase);
  var n = ace.edit("cssData");
  n.setTheme("ace/theme/twilight"),
    (n.$blockScrolling = 1 / 0),
    n.setShowPrintMargin(!1),
    n.setOptions({
      enableMultiselect: !0,
      enableBasicAutocompletion: !0,
      enableLiveAutocompletion: !0,
      enableSnippets: !1,
      fontSize: "14px",
    }),
    (n.container.style.lineHeight = "19px");
  var b = {
      singleData: ace.createEditSession("", "ace/mode/css"),
      templateData: ace.createEditSession("", "ace/mode/css"),
      globalData: ace.createEditSession("", "ace/mode/css"),
    },
    x = 0;
  (window.leftBarSize = !1),
    (window.setSelector = !1),
    (window.separator = " "),
    (window.minCrpdSlctr = !1),
    (window.YellowDelay = 5),
    (window.Yellow2Delay = 10),
    (window.lastTextColor = null),
    (window.targetIsParentTree = !1),
    (window.selectedByView = !1),
    (window.editedByReview = !1),
    (window.sourceViewClick = !1),
    (window.resizedByPropertySize = !1),
    (window.licenseCheckDelay = !1),
    (window.responsiveFirstWasOpen = !1),
    (window.parentItems = ""),
    (window.childrenItems = ""),
    (window.idList = []),
    (window.ClassList = []),
    (window.allow_input_CSS_process = !1),
    (window.firstSelectLimit = !1),
    (window.newComments = []),
    (window.placeholderSelector = !1),
    (window.mouseoverTrigger = !1),
    (window.getJsonNow = !1),
    (window.colorsReady = !1),
    (window.maxDeep = 24),
    (window.isDynamicSelectorsReady = !1),
    (window.triggedByNav = !1),
    (window.isIrisOpen = !1),
    (window.webkitArray = [
      "column-count",
      "backdrop-filter",
      "transform",
      "box-shadow",
      "filter",
      "animation-fill-mode",
      "animation-timing-function",
      "transition-property",
      "transition-duration",
      "transition-timing-function",
      "flex-direction",
      "justify-content",
      "align-items",
      "flex-wrap",
      "align-content",
      "column-gap",
      "row-gap",
      "animation-duration",
      "animation-delay",
      "animation-name",
      "grid-template-columns",
      "grid-template-rows",
      "backface-visibility",
      "transform-origin",
      "animation-iteration-count",
      "transition-delay",
      "perspective",
      "flex",
      "background-clip",
    ]);
  var Gi = o("#iframe").contents(),
    Ki = Gi.find("html"),
    Ji = Gi.find("body"),
    Qi = o(document.body).add(Ji),
    en = o(document).add(Gi),
    tn = o(document.body),
    an = document.getElementById("iframe"),
    nn = an.contentWindow;
  (an = an.contentWindow.document || an.contentDocument),
    Gi.find("#wyp-animate-data").after(
      "<div id='yellow-pencil-canvas'></div><div id='yellow-pencil-focus-canvas'></div><div id='yellow-pencil-other-canvas'></div><div id='yellow-pencil-extra-canvas'></div>"
    );
  var sn = [];
  (sn.general = Ji.find("#yellow-pencil-canvas")),
    (sn.active = Ji.find("#yellow-pencil-focus-canvas")),
    (sn.other = Ji.find("#yellow-pencil-other-canvas")),
    (sn.extra = Ji.find("#yellow-pencil-extra-canvas"));
  var on = Ji.find(
    "#yellow-pencil-canvas,#yellow-pencil-focus-canvas,#yellow-pencil-other-canvas"
  );
  if (!1 == window.ypData.demo_mode) {
    var rn = !1;
    window.addEventListener("beforeunload", function () {
      rn = !0;
    }),
      nn.addEventListener("beforeunload", function (t) {
        !1 === rn && (t.preventDefault(), (t.returnValue = ""));
      });
  }
  Gi.on(
    "webkitAnimationStart animationstart",
    w("*", ":not(", ")", window.simple_not_list),
    function () {
      if (S() || T()) return !1;
      var e = o(this);
      return (
        e.hasClass("wyp-animating") || e.addClass("wyp-animating"),
        e.hasClass("wyp-selected") &&
          !1 == Ji.hasClass("wyp-h-trfm") &&
          C() &&
          Ji.addClass("wyp-h-trfm"),
        !1
      );
    }
  ),
    0 == o(".css-editor-btn").length && tn.addClass("wyp-css-editor-disable"),
    o(".wyp-t-cont").each(function () {
      0 == o(this).find(".op-g").length &&
        o(this).parent().addClass("empty-property");
    }),
    Ji.addClass("non-logged-in logged-in"),
    o("#c-t-list .type-disabled").each(function () {
      var e = o(this).attr("data-value");
      o(".editor-tabs." + e + "-tab").addClass("disabled"),
        o(".editor-tabs." + e + "-tab").attr("title", qi.type_not_available);
    }),
    o(".editor-tabs").tooltip({
      title: function () {
        var e = o(this),
          t;
        return e.hasClass("single-tab")
          ? ((t = o(
              "#c-t-list li[data-value='single'] h6 > span:not(.type-byte)"
            )
              .text()
              .toLowerCase()),
            "The styles applied to <b>" + t + "</b>.")
          : e.hasClass("template-tab")
          ? ((t = o(
              "#c-t-list li[data-value='template'] h6 > span:not(.type-byte)"
            )
              .text()
              .toLowerCase()),
            "The styles applied to  <b>" + t + "</b>.")
          : "The styles applied to the <b>entire website</b>.";
      },
      placement: "bottom",
      container: "#cssEditorBar",
      html: !0,
    }),
    o("#include-webfont-label").tooltip({
      container: ".ed-pnl",
      title: "Include the font file.",
    }),
    o(".fixed_right_panel_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? (tn.addClass("wyp-fix-pan"),
          (window.ypData["wyp-fix-pan"] = !0),
          (window.ypOption.fixed_right_panel = !0),
          N(),
          o.throttle(Be(), 32),
          Ze(),
          Ct(),
          t.originalEvent && v("fixed_right_panel", "true"))
        : (tn.removeClass("wyp-fix-pan"),
          (window.ypData["wyp-fix-pan"] = !1),
          (window.ypOption.fixed_right_panel = !1),
          pe(!0),
          o.throttle(Be(), 32),
          Ct(),
          t.originalEvent && v("fixed_right_panel", "false"));
    }),
    o(".fixed_left_bar_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? (tn.addClass("wyp-fix-leftbar"),
          (window.ypOption.fixed_left_bar = !0),
          (window.leftBarSize = o(".editor-leftbar")
            .get(0)
            .getBoundingClientRect()),
          N(),
          o.throttle(Be(), 32),
          Ze(),
          t.originalEvent && v("fixed_left_bar", "true"))
        : (tn.removeClass("wyp-fix-leftbar"),
          (window.ypOption.fixed_left_bar = !1),
          (window.leftBarSize = o(".editor-leftbar")
            .get(0)
            .getBoundingClientRect()),
          N(),
          o.throttle(Be(), 32),
          Ze(),
          t.originalEvent && v("fixed_left_bar", "false")),
        Y(I("cssEditorWidth", 400), I("cssEditorHeight", 320) - 36);
    }),
    o(".hide_premium_options_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? (o("li.animation-option").hasClass("active") &&
            o("li.animation-option.active > h3").trigger("click"),
          o(
            "#font-family-group,#color-group,#background-color-group,#background-image-group,#width-group,#height-group,li.animation-option,.animation-manager-btn"
          ).hide(),
          o("li.animation-option").addClass("disabled"),
          o(".wyp-badge.wyp-lite").css("visibility", "hidden"),
          (window.ypOption.hide_premium_options = !0),
          t.originalEvent && v("hide_premium_options", "true"))
        : (o(
            "#font-family-group,#color-group,#background-color-group,#background-image-group,#width-group,#height-group,.animation-manager-btn"
          ).show(),
          0 == o(".ed-pnl-list > li.active").length
            ? o("li.animation-option").removeClass("disabled").show()
            : o("li.animation-option").removeClass("disabled").hide(),
          o(".wyp-badge.wyp-lite").css("visibility", "visible"),
          (window.ypOption.hide_premium_options = !1),
          t.originalEvent && v("hide_premium_options", "false"));
    }),
    o(".smart_responsive_technology_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? ((window.ypOption.smart_responsive_technology = !0),
          t.originalEvent && v("smart_responsive_technology", "true"))
        : ((window.ypOption.smart_responsive_technology = !1),
          t.originalEvent && v("smart_responsive_technology", "false"));
    }),
    o(".smart_important_tag_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? ((window.ypOption.smart_important_tag = !0),
          t.originalEvent && v("smart_important_tag", "true"))
        : ((window.ypOption.smart_important_tag = !1),
          t.originalEvent && v("smart_important_tag", "false"));
    }),
    o(".show_css_selector_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? (Ji.removeClass("wyp-css-slctr-off"),
          (window.ypOption.show_css_selector = !0),
          t.originalEvent &&
            (v("show_css_selector", "true"),
            C() && Q(_a(), _(), !0),
            0 == o(".left-menu-btn.yhover").length &&
              o(".left-menu-btn").trigger("click")))
        : (Ji.addClass("wyp-css-slctr-off"),
          (window.ypOption.show_css_selector = !1),
          t.originalEvent &&
            (v("show_css_selector", "false"),
            C() && Q(_a(), _(), !0),
            0 == o(".left-menu-btn.yhover").length &&
              o(".left-menu-btn").trigger("click")));
    }),
    window.ypOption.show_css_selector || Ji.addClass("wyp-css-slctr-off"),
    o(".append_auto_comments_checkbox input").change(function (t) {
      o(this).is(":checked")
        ? ((window.ypOption.append_auto_comments = !0),
          t.originalEvent && v("append_auto_comments", "true"))
        : ((window.ypOption.append_auto_comments = !1),
          t.originalEvent && v("append_auto_comments", "false"));
    }),
    tn.hasClass("yp-yellow-pencil-demo-mode") && (window.ypData.demo_mode = !0),
    !0 == window.ypOption.fixed_right_panel &&
      (o(".fixed_right_panel_checkbox input").prop("checked", !0),
      o(".fixed_right_panel_checkbox input").trigger("change")),
    !0 == window.ypOption.fixed_left_bar &&
      (o(".fixed_left_bar_checkbox input").prop("checked", !0),
      o(".fixed_left_bar_checkbox input").trigger("change")),
    !0 == window.ypOption.hide_premium_options &&
      (o(".hide_premium_options_checkbox input").prop("checked", !0),
      o(".hide_premium_options_checkbox input").trigger("change")),
    null != o.urlParam("wyp_load_popup") &&
      ((function () {
        var e = o("#wyp-customizing-type-frame"),
          t = o.urlParam("wyp_mode"),
          a = e.attr("data-page-id"),
          i = e.attr("data-page-type"),
          n = e.attr("data-page-href"),
          s = e.attr("data-page-visitor");
        s = "true" == s || !0 == s ? "&wyp_out=true" : "";
        var r =
          e.attr("data-src") +
          "&wyp_page_href=" +
          n +
          "&wyp_page_id=" +
          a +
          "&wyp_page_type=" +
          i +
          "&wyp_mode=" +
          t +
          s;
        if (r == e.attr("src")) return !1;
        var l = o("<div />")
          .append(o("#wyp-customizing-type-frame").clone().attr("src", r))
          .html();
        e.remove(), o("#iframe").after(l);
      })(),
      setTimeout(function () {
        o("#wyp-current-page").trigger("click");
      }, 10)),
    Gi.on(
      "webkitAnimationEnd animationend",
      w("*", ":not(", ")", window.simple_not_list),
      function () {
        if (S() || T()) return !1;
        var e = o(this);
        return (
          e.hasClass("wyp-animating") && e.removeClass("wyp-animating"),
          e.hasClass("wyp-selected") &&
            C() &&
            (Ji.removeClass("wyp-h-trfm"), Ze()),
          !1
        );
      }
    ),
    o(
      "#min-width-group .wyp-after,#min-height-group .wyp-after,#max-width-group .wyp-after,#max-height-group .wyp-after"
    ).css("display", "none"),
    o(".wyp-wireframe-btn").click(function () {
      Ji.toggleClass("wyp-wf-on");
    }),
    $(),
    o(".wyp-anim-control-play").on("click", function () {
      if (o(this).hasClass("active")) return !1;
      Qi.addClass("wyp-animate-manager-playing"),
        tn.addClass("wyp-clean-look"),
        Ji.addClass("wyp-hid-bor-n");
      var e = Math.max.apply(
          null,
          o(".wyp-anim-process-inner")
            .map(function () {
              return o(this).outerWidth(!0);
            })
            .get()
        ),
        n = parseFloat(e) / 100;
      o("#wyp-animate-helper").text(
        "@-webkit-keyframes playingBorder{from{left: 0px;}to{left:" +
          e +
          "px;}}@keyframes playingBorder{from{left: 0px;}to{left:" +
          e +
          "px;}}"
      ),
        o(".wyp-anim-playing-border")
          .css("animation-duration", n + "s")
          .addClass("active"),
        o(this).addClass("active");
      Yi(),
        (window.animationTimer3 = setTimeout(function () {
          o(".wyp-anim-control-pause").trigger("click");
        }, 1e3 * n)),
        o(".wyp-anim-playing-over").css("width", e + o(window).width());
      for (var s = ["single", "template", "global"], r = 0; r < s.length; r++)
        for (
          var l = p(a(s[r], !1), "[rule=animation-name]"), d = 0, c, u;
          d < l.length;
          d++
        )
          (c = l[d].replace(/(\/\*(.*?)\*\/|\n)/g, "")),
            (u = Ut(c)),
            (u = u.replace(
              /(\.|:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g,
              ""
            )),
            Gi.find(u).each(function () {
              o(this).addClass("yp_hover yp_focus yp_click yp_onscreen");
            });
      var m = 0;
      window.animMinC = setInterval(function () {
        ++m, 59 == g && (g = 0);
        var e = m;
        10 > m && (e = "0" + m), o(".wyp-counter-min").text(e);
      }, 6e4);
      var f = 0;
      window.animSecC = setInterval(function () {
        ++f;
        var e = f;
        10 > f && (e = "0" + f), o(".wyp-counter-second").text(e);
      }, 1e3);
      var g = 0;
      window.animMsC = setInterval(function () {
        ++g, 99 == g && (g = 0);
        var e = g;
        10 > g && (e = "0" + g), o(".wyp-counter-ms").text(e);
      }, 1);
    }),
    o(".wyp-anim-control-pause").on("click", function () {
      clearTimeout(window.wyp_anim_player),
        o(".wyp-anim-playing-border").removeClass("active"),
        o(".wyp-anim-control-play").removeClass("active");
      for (var e = ["single", "template", "global"], n = 0; n < e.length; n++)
        for (
          var s = p(a(null, !1), "[rule=animation-name]"), r = 0, l, d;
          r < s.length;
          r++
        )
          (l = s[r].replace(/(\/\*(.*?)\*\/|\n)/g, "")),
            (d = Ut(l)),
            (d = d.replace(
              /(\.|\:)(yp(-|_)onscreen|yp(-|_)hover|yp(-|_)click|yp(-|_)focus)/g,
              ""
            )),
            Gi.find(d).each(function () {
              o(this).removeClass("yp_hover yp_focus yp_click yp_onscreen");
            });
      tn.removeClass("wyp-clean-look"),
        Ji.removeClass("wyp-hid-bor-n"),
        Qi.removeClass("wyp-animate-manager-playing"),
        o(".wyp-counter-min").text("00"),
        o(".wyp-counter-second").text("00"),
        o(".wyp-counter-ms").text("00"),
        clearInterval(window.animMinC),
        clearInterval(window.animSecC),
        clearInterval(window.animMsC);
    }),
    o(".wyp-anim-control-close,.wyp-visual-editor-link").on(
      "click",
      function () {
        o(".animation-manager-btn").trigger("click");
      }
    ),
    o(".wyp-animate-manager-inner").on(
      "scroll",
      o.throttle(function () {
        0 < o(this).scrollLeft()
          ? o(".wyp-animate-manager").addClass("view-scrolled")
          : o(".wyp-animate-manager").removeClass("view-scrolled");
      }, 48)
    ),
    o(".animation-manager-btn").on("click", function () {
      if (
        (Qi.toggleClass("wyp-animate-manager-active"),
        (window.ypData.is_animation_manager =
          !window.ypData.is_animation_manager),
        o(".wyp-animate-manager").toggle(),
        o(".wyp-anim-control-pause").trigger("click"),
        !o(this).hasClass("active"))
      ) {
        o(".wyp-css-ed-act .wyp-css-close-btn").trigger("click"), It(), H();
        var e = Math.max.apply(
          null,
          o(".wyp-anim-process-inner")
            .map(function () {
              return o(this).outerWidth(!0);
            })
            .get()
        );
        o(".wyp-anim-process-bar-area").width(e + o(window).width());
      } else j(), N();
      0 < o(".animation-option.active").length &&
        (o(".animation-option.active h3").trigger("click"),
        o(".animation-option.active").removeAttr("data-loaded")),
        we(),
        Ze();
    }),
    o(document).on("mouseenter", ".wyp-control-trash", function () {
      o(this).parent().tooltip("hide"), o(this).tooltip("show");
    }),
    o(document).on("click", ".wyp-control-trash", function () {
      var e = o(this);
      k(
        {
          title: qi.you_are_sure,
          showCancelButton: !0,
          confirmButtonText: qi.delete_anim,
        },
        function () {
          e
            .parent(".wyp-anim-process-bar")
            .prev(".wyp-anim-process-bar-delay")
            .remove(),
            e.parent(".wyp-anim-process-bar").remove(),
            (window.ypData["wyp-anim-removing"] = !0),
            o(".wyp-delay-zero").each(function () {
              var e = o(".wyp-anim-process-inner").offset().left - 5,
                t = o(this).next(".wyp-anim-process-bar").offset().left - e;
              o(this).css("left", t),
                o(this)
                  .next(".wyp-anim-process-bar")
                  .addClass("wyp-anim-has-zero-delay");
            }),
            F(),
            (window.ypData["wyp-anim-removing"] = void 0),
            H();
        }
      );
    }),
    !1 === window.ypData.demo_mode &&
      !0 !== window.bMode &&
      o(window)
        .add(o(nn))
        .focus(function () {
          tn.hasClass("wtfv") &&
            tn.hasClass("wyp-mouseleave") &&
            window.ypData["wyp-if-movleav"] &&
            !1 == window.licenseCheckDelay &&
            (o
              .post(ajaxurl, {
                action: "wyp_check_license",
                _wpnonce: window.wyp_editor_nonce,
              })
              .done(function (e) {
                "1" == e &&
                  (tn.removeClass("wtfv"),
                  o(".wyp-popup-background,.wyp-info-modal").hide(),
                  k({ title: qi.welcome_pro, text: qi.license_activated }));
              }),
            (window.licenseCheckDelay = !0),
            setTimeout(function () {
              window.licenseCheckDelay = !1;
            }, 1e4));
        }),
    o(".info-btn").on("click", function () {
      if (!o(this).hasClass("active")) {
        var e = "element";
        0 == o(".advance-info-btns.active").length
          ? o(".element-btn").trigger("click")
          : o(".advance-info-btns.active").hasClass("design-btn") &&
            (e = "typography"),
          o(".information-updated").removeClass("information-updated"),
          M(e),
          window.ypData["wyp-css-ed-drgable"] &&
            o(".css-editor-btn.active").trigger("click"),
          o(".wyp-navigation-btn.active").trigger("click");
      }
      o(".advanced-info-box").toggle();
    }),
    o(".design-btn").on("click", function () {
      o(this).parent().find(".active").removeClass("active"),
        o(this).addClass("active"),
        o(".element-content").hide(),
        o(".typography-content").show(),
        !1 == o(this).hasClass("information-updated") &&
          (M("typography"), o(this).addClass("information-updated"));
    }),
    o(".element-btn").on("click", function () {
      o(this).parent().find(".active").removeClass("active"),
        o(this).addClass("active"),
        o(".typography-content").hide(),
        o(".element-content").show();
    }),
    o(".advance-info-btns").on("click", function () {
      o(".advanced-info-box-inner").scrollTop(0);
    }),
    o(document).on("mousedown", ".ui-resizable-handle", function () {
      0 == o(this).parents(".wyp-anim-process-inner").length &&
        (tn.addClass("fake-layer-x-bg"),
        tn.append("<div class='fake-layer-x'></div>"),
        o(this).addClass("active"));
    }),
    o(document).on(
      "mouseup",
      ".ui-resizable-handle,.fake-layer-x",
      function () {
        0 == o(this).parents(".wyp-anim-process-inner").length &&
          (tn.removeClass("fake-layer-x-bg"),
          o(".fake-layer-x").remove(),
          o(".ui-resizable-handle").removeClass("active"));
      }
    );
  var ln = I("CSSEditorDraggable", "0");
  "1" == ln &&
    (tn.addClass("wyp-css-ed-drgable"),
    (window.ypData["wyp-css-ed-drgable"] = !0));
  var dn = 276;
  (ln = I("rightPanelWidth", dn)),
    tn.append(
      "<style id='rightpanel-personalized-view'>.ed-pnl{width:" +
        ln +
        "px !important;}</style>"
    ),
    (dn = 276),
    (ln = I("visualManagerWidth", dn)),
    tn.append(
      "<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" +
        ln +
        "px !important;}</style>"
    ),
    (ln = I("advancedInfoBoxWidth", 280)),
    tn.append(
      "<style id='advancedinfobox-personalized-view'>.advanced-info-box {width:" +
        ln +
        "px !important;}</style>"
    ),
    Y(I("cssEditorWidth", 400), I("cssEditorHeight", 320) - 36),
    (ln = I("animManagerHeight", 234)),
    tn.append(
      "<style id='animmanager-personalized-view'>body.wyp-animate-manager-active #iframe{height:-webkit-calc(100% - " +
        parseInt(ln) +
        "px) !important;height:calc(100% - " +
        parseInt(ln) +
        "px) !important;}body.wyp-animate-manager-active.wyp-res-mod #iframe, body.wyp-animate-manager-active.wyp-res-mod .responsive-right-handle,body.wyp-animate-manager-active.wyp-res-mod .responsive-left-handle{height:-webkit-calc(100% - " +
        parseInt(ln + 24) +
        "px) !important;height:calc(100% - " +
        parseInt(ln + 24) +
        "px) !important;}.wyp-animate-manager{height:" +
        ln +
        "px !important;}</style>"
    ),
    (ln = I("navigationWidth", 230)),
    tn.append(
      "<style id='navigation-personalized-view'>#layer-tree{width:" +
        parseFloat(ln) +
        "px !important;}</style>"
    ),
    o(".wyp-css-editor-detach").on("click", function () {
      window.ypData["wyp-css-ed-drgable"] ||
        (o(".wyp-navigation-btn.active").trigger("click"),
        o(".info-btn.active").trigger("click")),
        tn.toggleClass("wyp-css-ed-drgable"),
        (window.ypData["wyp-css-ed-drgable"] =
          !window.ypData["wyp-css-ed-drgable"]),
        n.resize(),
        N(),
        ye(),
        Ze(),
        Y(I("cssEditorWidth", 400), I("cssEditorHeight", 320) - 36),
        window.ypData["wyp-css-ed-drgable"]
          ? R("CSSEditorDraggable", "1")
          : R("CSSEditorDraggable", "0");
    }),
    o(".wyp-animate-manager-inner").on(
      "scroll",
      o.throttle(function () {
        o(".wyp-anim-left-part-column").css("left", o(this).scrollLeft());
      }, 64)
    ),
    o(document).on("click", ".wyp-anim-list-menu ul li", function () {
      Gi.find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass(
        "yp_onscreen yp_hover yp_click yp_focus"
      );
      var e = o(".wyp-anim-add.active");
      window.ypData["wyp-animate-manager-mode"] = !0;
      var t = e.parent().attr("data-selector-full"),
        a = [],
        i = [],
        n = [],
        s = e.parents(".wyp-anim-process-bar-area").attr("data-responsive"),
        r = e.parents(".wyp-anim-process-bar-area").attr("data-anim-type");
      if (e.parent().find(".wyp-anim-process-inner").is(":empty"))
        tt(t, "animation-name", o(this).data("value"), "", s, r);
      else {
        e
          .parent()
          .find(".wyp-anim-process-inner .wyp-anim-process-bar")
          .each(function () {
            a.push(o(this).text()), i.push(o(this).width() / 100 + "s");
          }),
          e
            .parent()
            .find(".wyp-anim-process-inner .wyp-anim-process-bar-delay")
            .each(function () {
              var t =
                (o(this).offset().left -
                  e.parent().find(".wyp-anim-process-inner").offset().left) /
                100;
              o(this).hasClass("wyp-delay-zero")
                ? n.push(t + "s")
                : n.push(t + o(this).width() / 100 + "s");
            }),
          a.push(o(this).data("value")),
          i.push("1s");
        var l = e
            .parent()
            .find(".wyp-anim-process-inner .wyp-anim-process-bar")
            .last(),
          d =
            (l.offset().left +
              l.width() -
              e.parent().find(".wyp-anim-process-inner").offset().left) /
            100;
        n.push(d + "s"),
          tt(t, "animation-name", a.toString(), "", s, r),
          tt(t, "animation-duration", i.toString(), "", s, r),
          tt(t, "animation-delay", n.toString(), "", s, r);
      }
      o("#fake-layer").trigger("click"),
        (window.ypData["wyp-animate-manager-mode"] = void 0),
        setTimeout(function () {
          H(), F();
        }, 100);
    }),
    o(document).on("click", ".wyp-anim-add", function (a) {
      a.stopPropagation();
      var e = o(this).offset().top,
        t = o(this).offset().left,
        i = o(".wyp-anim-list-menu ul");
      o(".wyp-anim-list-menu")
        .removeAttr("style")
        .removeClass("wyp-anim-list-top");
      var n = "",
        s = [];
      o.each(
        JSON.parse(o("#animation-name-group textarea").val()),
        function (e, t) {
          -1 === s.indexOf(t.category) &&
            ((n += "<li class='anim-cat-list'>" + t.category + "</li>"),
            s.push(t.category)),
            "none" != t.value &&
              (n +=
                "<li data-value='" +
                t.value +
                "' data-text='" +
                t.label +
                "' data-content='" +
                t.label +
                "'>" +
                t.label +
                "</li>");
        }
      ),
        i.html(n);
      var r = o(window).height() - e;
      310 > r
        ? o(".wyp-anim-list-menu").addClass("wyp-anim-list-top")
        : i.height() > r && i.height(r),
        o(".wyp-anim-list-menu").css({ left: t, top: e }).show(),
        o(".wyp-anim-list-menu").css(
          "margin-left",
          "-" + parseInt(o(".wyp-anim-list-menu").width() / 2 - 10) + "px"
        ),
        o(".wyp-anim-add").removeClass("active"),
        o(this).addClass("active"),
        W({
          index: 2147483646,
          container: ".wyp-animate-manager",
          callback: function () {
            o(".wyp-anim-list-menu").hide();
          },
        });
    }),
    o(".wyp-info-modal-close").click(function () {
      o(".wyp-info-modal,.wyp-popup-background").fadeOut("fast");
    }),
    o(".wyp-popup-background").click(function () {
      o(this).fadeOut(), o(".wyp-info-modal").fadeOut("fast");
    }),
    o(".cursor-main-btn").mousedown(function () {
      !1 == o(this).hasClass("active")
        ? (!window.ypData["wyp-met-dis"] &&
            o(".wyp-ruler-btn").trigger("click"),
          o(this).addClass("active"))
        : o(".inspector-sublist").toggle(),
        o(this).tooltip("hide");
    }),
    o(".inspector-sublist li").click(function () {
      var e = o(this).attr("data-cursor-action");
      o(".wyp-ruler-btn").hasClass("active") &&
        o(".wyp-ruler-btn").trigger("click"),
        (window.ypData.inspector = e),
        "default" == e
          ? (tn.removeClass("wyp-single-inspector-active"),
            tn.addClass("wyp-flexible-inspector-active"))
          : "single" == e
          ? tn.addClass("wyp-single-inspector-active")
          : (tn.removeClass(
              "wyp-flexible-inspector-active wyp-single-inspector-active"
            ),
            At()),
        o(".inspector-sublist").toggle(),
        o(".inspector-sublist li").removeClass("active"),
        o(this).addClass("active");
    }),
    tn.on("click", function (t) {
      "block" == o(".inspector-sublist").css("display") &&
        !1 ==
          o(t.target).is(
            ".cursor-main-btn,.cursor-main-btn *,.inspector-sublist,.inspector-sublist *"
          ) &&
        o(".inspector-sublist").hide(),
        "block" == o(".interface-settings").css("display") &&
          !1 ==
            o(t.target).is(
              ".left-menu-btn,.left-menu-btn *,.interface-settings,.interface-settings *"
            ) &&
          (o(".left-menu-btn").toggleClass("yhover"),
          o(".interface-settings").hide());
    }),
    (window.responsiveModeRMDown = !1),
    (window.SelectorDisableResizeRight = !1),
    (window.selectorWasActive = !1),
    (window.rulerWasActive = !1),
    o(".responsive-right-handle,.responsive-left-handle").on(
      "mousedown",
      function () {
        if (window.responsiveModeRMDown) return !1;
        window.ypData["wyp-met-dis"] || o(".wyp-ruler-btn").trigger("click");
        var e = o(this);
        (window.responsiveModeRMDown = !0),
          e.hasClass("responsive-right-handle")
            ? Qi.addClass("wyp-res-resizing wyp-res-resizing-right")
            : Qi.addClass("wyp-res-resizing wyp-res-resizing-left"),
          tn.addClass("wyp-clean-look"),
          Ji.addClass("wyp-hid-bor-n"),
          (window.selectorWasActive =
            !!o(".wyp-selector-mode").hasClass("active")),
          o(".wyp-ruler-btn").hasClass("active")
            ? (window.rulerWasActive = !0)
            : ((window.rulerWasActive = !1),
              o(".wyp-ruler-btn").trigger("click").removeClass("active")),
          o(".wyp-selector-mode").hasClass("active") &&
            !1 === C() &&
            (o(".wyp-selector-mode").trigger("click"),
            (window.SelectorDisableResizeRight = !0)),
          e.hasClass("responsive-right-handle") ? j("right") : j("left"),
          setTimeout(function () {
            o(".metric-left-tooltip").html(
              "W: <span>" + parseInt(o("#iframe").width()) + "</span>px"
            );
          }, 1);
      }
    );
  var pn, cn;
  en.on(
    "mousemove",
    o.throttle(function (t) {
      if (!0 === window.responsiveModeRMDown) {
        var e = N(!0);
        (t.pageX -= 10),
          tn.hasClass("wyp-res-resizing-right")
            ? (t.pageX -= parseInt(o("#iframe").offset().left))
            : (t.pageX =
                parseInt(o("#iframe").offset().left + o("#iframe").width()) -
                t.pageX -
                16),
          270 > t.pageX && (t.pageX = 270),
          t.pageX > e - 220 && (t.pageX = e - 220),
          o("#iframe").width(t.pageX),
          tn.hasClass("wyp-res-resizing-left") ? j("left") : j(),
          clearTimeout(pn),
          clearTimeout(cn),
          (pn = setTimeout(function () {
            X();
          }, window.YellowDelay)),
          (cn = setTimeout(function () {
            o(".metric-left-tooltip").html(
              "W: <span>" + parseInt(o("#iframe").width()) + "</span>px"
            );
          }, 1));
      }
    }, 32)
  ),
    en.on("mouseup", function () {
      !0 === window.responsiveModeRMDown &&
        ((window.responsiveModeRMDown = !1),
        Qi.removeClass(
          "wyp-res-resizing wyp-res-resizing-right wyp-res-resizing-left"
        ),
        tn.removeClass("wyp-clean-look"),
        setTimeout(function () {
          Ji.removeClass("wyp-hid-bor-n"), Ze();
        }, 25),
        !0 === window.SelectorDisableResizeRight &&
          (window.SelectorDisableResizeRight = !1),
        !1 === window.rulerWasActive &&
          o(".wyp-ruler-btn").addClass("active").trigger("click"),
        !0 === window.selectorWasActive
          ? !1 === o(".wyp-selector-mode").hasClass("active") &&
            o(".wyp-selector-mode").trigger("click")
          : o(".wyp-selector-mode").hasClass("active") &&
            o(".wyp-selector-mode").trigger("click"),
        we(),
        C() && _e());
    }),
    o(".responsive-add-breakpoint").on("click", function () {
      var e =
          "(" +
          o(".media-control").attr("data-code") +
          ":" +
          o("#iframe").width() +
          "px)",
        t = Pe(e),
        i = Re(e);
      r(m(a(null, !1), t + "YPtoAddBreakpoint{b:b;}" + i, null), null, "b"),
        Mi(),
        o(".breakpoint-bar .focus")
          .addClass("defined-with-yellowpencil")
          .removeClass("edited"),
        we(),
        j();
    });
  var un = 0;
  en.on("keyup", function (t) {
    un = new Date();
    var e = t.target.tagName.toLowerCase(),
      a = !1,
      i = !1;
    (!0 === t.ctrlKey || !0 === t.metaKey) && (a = !0),
      ("input" == e || "textarea" == e) && (i = !0),
      !1 === a &&
        !1 === i &&
        (Ji.removeClass("wyp-control-key-down"),
        (window.ypData["wyp-control-key-down"] = !1),
        Gi.find(".wyp-multiple-selected").removeClass("wyp-multiple-selected"),
        sn.other.find(".wyp-selected-others-multiple-box").remove());
  });
  var mn;
  en.on("keydown", function (t) {
    var e = new Date(),
      a = t.target.tagName.toLowerCase(),
      i = o(t.target),
      n = t.keyCode || t.which,
      s = !1,
      d = !!t.shiftKey,
      p = !1,
      c;
    if (
      ((!0 === t.ctrlKey || !0 === t.metaKey) && (s = !0),
      ("input" == a || "textarea" == a) && (p = !0),
      83 == n &&
        !0 === s &&
        !1 === d &&
        (t.preventDefault(), o(".wyp-button.wyp-save-btn").trigger("click")),
      46 == n &&
        !1 === s &&
        !1 === p &&
        !1 === d &&
        (tt(null, "display", "none", ""),
        Mi(),
        setTimeout(function () {
          At(), sn.extra.find(".wyp-el-viewer").remove();
        }, window.Yellow2Delay)),
      27 == n && !1 === s && !1 === d)
    ) {
      if (O() || D()) return !1;
      if (
        "none" == o(".yellow-alert").css("display") ||
        0 === o(".yellow-alert").length
      ) {
        if (
          !0 !== window.bMode &&
          "none" != o(".wyp-popup-background").css("display")
        )
          return o(".wyp-info-modal-close").trigger("click"), !1;
        if (Qi.hasClass("wyp-selector-editor-active"))
          return (
            o("#wyp-selector-editor").val(""), ge("#wyp-selector-editor"), !1
          );
      }
    }
    if (
      (!1 === s &&
        !1 === p &&
        !0 === d &&
        !1 == window.ypData["wyp-if-movleav"] &&
        37 != n &&
        38 != n &&
        39 != n &&
        40 != n &&
        (clearTimeout(mn),
        (mn = setTimeout(function () {
          +e > +un &&
            C() &&
            (Ji.addClass("wyp-control-key-down"),
            (window.ypData["wyp-control-key-down"] = !0),
            window.ypData["wyp-rcnt-hvr-el"] &&
              0 < window.ypData["wyp-rcnt-hvr-el"].length &&
              ((window.mouseoverTrigger = !0),
              window.ypData["wyp-rcnt-hvr-el"].trigger("fakeOver"),
              (window.mouseoverTrigger = !1)),
            (window.ypData["wyp-rcnt-hvr-el"] = void 0));
        }, 200))),
      !1 === s &&
        !1 === p &&
        (38 == n || 40 == n || 37 == n || 39 == n) &&
        C() &&
        !1 === z() &&
        !1 == window.ypData["wyp-if-movleav"] &&
        (t.preventDefault(),
        clearTimeout(window.KeymovingDelay),
        (window.KeymovingDelay = setTimeout(function () {
          var e = _(),
            a = parseInt(e.css("top")),
            i = parseInt(e.css("left"));
          isNaN(a) && (a = 0), isNaN(i) && (i = 0);
          var s = 1;
          if (
            (d && (s = 10),
            38 == n ? (a -= s) : 40 == n && (a += s),
            37 == n ? (i -= s) : 39 == n && (i += s),
            (a += "px"),
            (i += "px"),
            38 == n || 40 == n)
          ) {
            tt(null, "top", a, "");
            var p = parseInt(e.css("bottom"));
            isNaN(p) && (p = 0),
              0 !== parseFloat(a) + parseFloat(p) &&
                tt(null, "bottom", "auto", "");
          }
          if (37 == n || 39 == n) {
            tt(null, "left", i, "");
            var c = parseInt(e.css("right"));
            isNaN(c) && (c = 0),
              0 !== parseFloat(i) + parseFloat(c) &&
                tt(null, "right", "auto", "");
          }
          var u = e.css("position");
          if (
            ("static" == u && tt(null, "position", "relative", ""),
            0 < o("li.position-option.active").length)
          ) {
            var m = _a();
            o("#top-group,#left-group").each(function () {
              pa(G(this), m);
            });
          } else o("li.position-option").removeAttr("data-loaded");
          Mi();
        }, 40))),
      !0 === p && 27 == n && !1 === s && !1 === d)
    )
      return i.blur(), !1;
    if (8 == n && !1 === s && !1 === p && !1 === d)
      return t.preventDefault(), !1;
    if (90 == n && !0 == s && !1 === p && !1 === d)
      return (
        t.preventDefault(),
        clearTimeout(window.historyDelay),
        tn.hasClass("wyp-history-delay")
          ? (window.historyDelay = setTimeout(function () {
              U();
            }, 220))
          : setTimeout(function () {
              U();
            }, 50),
        !1
      );
    if (71 == n && !0 === s && !1 === p && !1 === d)
      return t.preventDefault(), Qi.toggleClass("wyp-smart-guide-disabled"), !1;
    if (89 == n && !0 === s && !1 === p && !1 === d)
      return (
        t.preventDefault(),
        clearTimeout(window.historyDelay),
        tn.hasClass("wyp-history-delay")
          ? (window.historyDelay = setTimeout(function () {
              q();
            }, 220))
          : setTimeout(function () {
              q();
            }, 50),
        !1
      );
    if (90 == n && !0 === s && !0 === d && !1 === p)
      return (
        t.preventDefault(),
        clearTimeout(window.historyDelay),
        tn.hasClass("wyp-history-delay")
          ? (window.historyDelay = setTimeout(function () {
              q();
            }, 220))
          : setTimeout(function () {
              q();
            }, 50),
        !1
      );
    if (86 == n && !1 === s && !1 === p && !1 === d)
      return (
        "cursor" === window.ypData.inspector
          ? (o(".inspector-sublist-default").trigger("click"),
            (window.ypData.inspector = "default"))
          : (o(".inspector-sublist-cursor").trigger("click"),
            (window.ypData.inspector = "cursor")),
        o(".inspector-sublist").css("display", "none"),
        !1
      );
    if (27 == n && !1 === s && !1 === d) {
      if ((t.preventDefault(), z())) return !1;
      if (tn.hasClass("wyp-bg-layer-active"))
        return o("#fake-layer").trigger("click"), !1;
      if (
        0 < o("#wyp-customizing-type-frame").length &&
        !1 == p &&
        "block" == o("#wyp-customizing-type-frame").css("display")
      )
        return (
          o("#wyp-current-page").removeClass("active"),
          o("#wyp-customizing-type-frame").css("display", "none"),
          !1
        );
      if ("block" == o("#image_uploader").css("display") && !1 == p)
        return (
          o("#image_uploader").toggle(),
          o("#image_uploader_background").toggle(),
          o(".wyp-upload-btn").toggleClass("active"),
          !1
        );
      if (
        (!1 === tn.hasClass("autocomplete-active") &&
          "none" == o(".yellow-alert").css("display")) ||
        (0 === o(".yellow-alert").length && !1 == p)
      ) {
        if (window.isIrisOpen) return o(".iris-picker").hide(), !1;
        if (0 < o("#context-menu-layer:visible").length)
          return o("#context-menu-layer,.context-menu-list").hide(), !1;
        if (tn.hasClass("customization-type-popup"))
          return o("#customizing-mode").trigger("click"), !1;
        if ("block" == o(".inspector-sublist").css("display"))
          return o(".inspector-sublist").css("display", "none"), !1;
        if ("block" == o(".interface-settings").css("display"))
          return (
            o(".interface-settings").css("display", "none"),
            o(".left-menu-btn.yhover").removeClass("yhover"),
            !1
          );
        if (0 < o(".info-btn.active").length)
          return o(".info-btn.active").trigger("click"), !1;
        if ("block" == o("#cssEditorBar").css("display"))
          return o(".css-editor-btn").trigger("click"), !1;
        if (tn.hasClass("wyp-nvgtn-act"))
          return o(".wyp-navigation-btn.active").trigger("click"), !1;
        if (window.ypData["vsl-css-vi-active"]) return It(), !1;
        if (0 < o(".animation-manager-btn.active").length)
          return o(".animation-manager-btn").trigger("click"), !1;
        if (0 < o(".wyp-ruler-btn.active").length)
          return o(".wyp-ruler-btn").trigger("click"), !1;
        if (S()) return o(".wyp-anim-cancel").trigger("click"), !1;
        if (C()) return At(), o.throttle(Be(), 32), !1;
        if (0 == o(".wyp-responsive-btn.active").length)
          return o(".wyp-responsive-btn").trigger("click"), !1;
      }
    }
    if (32 == n && !1 === d && !1 === s && !1 === p && C())
      return t.preventDefault(), ce(), !1;
    if (
      32 == n &&
      !1 === s &&
      !1 === d &&
      !1 === p &&
      !1 === C() &&
      o(".wyp-selector-mode").hasClass("active")
    )
      return (
        t.preventDefault(),
        void 0 !== _() &&
          0 < _().length &&
          ((c =
            "single" === window.ypData.inspector
              ? o.trim(Ma(null, "sharp"))
              : o.trim(Ma(null, "default"))),
          L(c),
          Q(c, _(), !0)),
        !1
      );
    if (
      32 == n &&
      !1 === s &&
      !0 === d &&
      !1 === p &&
      !0 === C() &&
      o(".wyp-selector-mode").hasClass("active")
    ) {
      t.preventDefault();
      var u = Gi.find(".wyp-multiple-selected");
      if (0 == u.length) return !1;
      var r = _a(),
        l = Ma(u, "sharp");
      if (u.hasClass("wyp-selected-others") && 0 < r.split(",").length) {
        u.removeClass("wyp-selected-others"),
          (r = r.replace(new RegExp("," + Na(l), "g"), ""));
        var m = _();
        return (
          L(r), Q(r, m, !0), u.removeClass("wyp-multiple-selected"), Ze(), !1
        );
      }
      return (
        sn.other.find(".wyp-selected-others-multiple-box").remove(),
        u.addClass("wyp-selected-others").removeClass("wyp-multiple-selected"),
        L(r + "," + l),
        Q(r + "," + l, _(), !0),
        !1
      );
    }
    return 82 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(),
        o(".wyp-responsive-btn.active").trigger("click"),
        !1)
      : 77 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), o(".wyp-ruler-btn").trigger("click"), !1)
      : 87 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), o(".wyp-wireframe-btn").trigger("click"), !1)
      : 68 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), o(".info-btn:not(.active)").trigger("click"), !1)
      : 65 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), !window.bMode) &&
        (o(".animation-manager-btn:not(.active)").trigger("click"), !1)
      : 67 == n &&
        !1 === s &&
        !1 === p &&
        !1 === d &&
        (t.preventDefault(), !window.ypData["vsl-css-vi-active"])
      ? (o(".wyp-button-manage").trigger("click"), !1)
      : 72 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), pe(), !1)
      : 0 < o(".css-editor-btn").length &&
        !1 === s &&
        !1 === p &&
        !1 === tn.hasClass("process-by-code-editor") &&
        !1 === d &&
        (162 == n || 69 == n)
      ? (t.preventDefault(), S())
        ? (k({ title: qi.sorry, text: qi.cantEditor }), !1)
        : !window.bMode && (o(".css-editor-btn").trigger("click"), !1)
      : 192 == n &&
        !1 === s &&
        !1 === p &&
        !1 === tn.hasClass("process-by-code-editor") &&
        !1 === d
      ? (t.preventDefault(), S())
        ? (k({ title: qi.sorry, text: qi.cantEditor }), !1)
        : !window.bMode && (o(".css-editor-btn").trigger("click"), !1)
      : 70 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(), fe(), !1)
      : 78 == n && !1 === s && !1 === p && !1 === d
      ? (t.preventDefault(),
        o(".wyp-navigation-btn:not(.active)").trigger("click"),
        !1)
      : void 0;
  }),
    n.commands.addCommand({
      name: "close",
      bindKey: { win: "ESC", mac: "ESC" },
      exec: function () {
        o(".css-editor-btn").trigger("click");
      },
      readOnly: !1,
    }),
    n.commands.addCommand({
      name: "save",
      bindKey: { win: "CTRL+S", mac: "CMD+S" },
      exec: function () {
        var e = o(".wyp-button.wyp-save-btn");
        (!1 === window.saveFromEditor || void 0 === window.saveFromEditor) &&
          !1 === tn.hasClass("css-code-unvalid") &&
          e.hasClass("waiting-for-save") &&
          ((window.saveFromEditor = !0), e.trigger("click"));
      },
      readOnly: !1,
    }),
    n.on("copy", function (e) {
      if (!window.ypData.demo_mode && tn.hasClass("wtfv")) {
        var t = e.text.match(
          /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g
        );
        if (null !== t)
          return (
            o(".wyp-info-modal .wyp-info-modal-top-inner h2").text(
              "Copy Failed. Upgrade to Pro!"
            ),
            o(".wyp-info-modal .wyp-info-modal-top-inner p").text(
              "You are using some premium features. Upgrade to Pro or disable premium features to copy code."
            ),
            o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"),
            navigator.clipboard.writeText(""),
            !1
          );
      }
    }),
    Gi.find("form").submit(function (t) {
      if ((t.preventDefault(), "cursor" !== window.ypData.inspector)) return !1;
    }),
    o(".wyp-ruler-btn").click(function () {
      return (
        !1 === C() && At(),
        Qi.toggleClass("wyp-met-dis"),
        (window.ypData["wyp-met-dis"] = !1 === window.ypData["wyp-met-dis"]),
        o.throttle(Be(), 32),
        o(".cursor-main-btn").toggleClass("active"),
        window.ypData["wyp-met-dis"] &&
          (Gi.find(".hv-in-bx").css(
            "transform",
            "translate3d(-1000px, -1000px, -1000px)"
          ),
          Gi.find(".wyp-size-handle").css("top", "-1000px"),
          tn
            .find(
              ".metric-top-tooltip,.metric-left-tooltip,.metric-left-border,.metric-top-border"
            )
            .css("transform", "translate3d(-1000px, -1000px, -1000px)")),
        !1
      );
    }),
    o(".css-va,.wyp-bgs-css-val").keydown(function (t) {
      var e = t.keyCode || t.which,
        a = parseFloat(o(this).val());
      isNaN(a) && (a = 0),
        38 == e && (t.preventDefault(), o(this).val(a + parseFloat(1))),
        40 == e && (t.preventDefault(), o(this).val(a - parseFloat(1)));
    }),
    o(
      ".css-va,.wyp-bgs-css-val,.ac-p-d > .in-ac,.wyp-input,.css-un,.wyp-bgs-prefix,.iris-picker input"
    )
      .on("focus", function () {
        o(this).hasClass("select-able") ||
          o(this)[0].setSelectionRange(0, o(this).val().length),
          o(this).addClass("select-able");
      })
      .on("blur", function () {
        o(this).removeClass("select-able");
      }),
    o(document).on("focus", ".iris-picker input", function () {
      o(this).hasClass("select-able") ||
        o(this)[0].setSelectionRange(0, o(this).val().length),
        o(this).addClass("select-able");
    }),
    o(document).on("blur", ".iris-picker input", function () {
      o(this).removeClass("select-able");
    }),
    (o.fn.hasAttr = function (e) {
      return void 0 !== this.attr(e);
    }),
    (o.fn.getCursorPosition = function () {
      var e = this.get(0);
      if (e) {
        if ("selectionStart" in e) return e.selectionStart;
        if (document.selection) {
          e.focus();
          var t = document.selection.createRange(),
            a = document.selection.createRange().text.length;
          return t.moveStart("character", -e.value.length), t.text.length - a;
        }
      }
    }),
    (o.fn.cssImportant = function (e, t) {
      this.css(e, t),
        o(this).attr(
          "style",
          this.attr("style").replace(e + ": " + t, e + ": " + t + " !important")
        );
    }),
    o(".wyp-button-live").click(function () {
      var e = o(this);
      e.addClass("live-btn-loading"),
        window.ypData["wyp-need-to-process"] && Zi(),
        setTimeout(function () {
          var t = e.attr("data-href");
          if (window.ypData.demo_mode)
            return (
              k({ title: qi.live_preview_alert, text: qi.live_preview_text }),
              e.removeClass("live-btn-loading"),
              !1
            );
          var a = "",
            i;
          if (
            (Gi.find(".wyp-inline-data").each(function () {
              (i = o(this).attr("data-source-mode")), (a += Et(!0, i, !1, !0));
            }),
            window.bMode)
          )
            return !1;
          var n = o.post(ajaxurl, {
            action: "wyp_preview_data_save",
            wyp_data: a,
            _wpnonce: window.wyp_editor_nonce,
          });
          n.always(function () {
            return e.removeClass("live-btn-loading"), window.open(t, t), !1;
          });
        }, 100);
    }),
    (window.cacheFirstLoad = [E()]);
  for (var fn = ["single", "template", "global"], gn = 0; gn < fn.length; gn++)
    fn[gn] != window.cacheFirstLoad &&
      (y(fn[gn]),
      setTimeout(function () {
        n.setValue(Et(!0, fn[gn], !0)),
          n.getSession().setUndoManager(new ace.UndoManager());
      }, 300));
  y(),
    setTimeout(function () {
      n.setValue(Et(!0, null, !0)),
        n.getSession().setUndoManager(new ace.UndoManager());
    }, 300),
    (window.old_premium_rules = (
      Gi.find(".wyp-inline-data")
        .text()
        .match(
          /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g
        ) || []
    ).length),
    o('[data-toggle="tooltipTopBottom"]').tooltip({
      container: ".ed-pnl",
      template:
        '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      html: !0,
    }),
    o('[data-toggle="tooltip-bar"]').tooltip({ container: "body", html: !0 }),
    o(".info-btn").on("show.bs.tooltip", function () {
      if (o(this).hasClass("active")) return !1;
    }),
    o(".responsive-add-breakpoint").tooltip({
      template:
        '<div class="tooltip tooltip-breakpoint-add"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: function () {
        return (
          "Add A Breakpoint<span class='breakpoint-tooltip-t'>" +
          o("#iframe").width() +
          "px and " +
          o(".media-control").text() +
          " screens</span>"
        );
      },
      container: "body",
      delay: { show: 50, hide: 0 },
      placement: "bottom",
      html: !0,
    }),
    o(".mo-i").tooltip({
      template:
        '<div class="tooltip small-tooltip tooltip-responsive-icon"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      title: "Has edits on another screen size(s).",
      container: ".ed-pnl",
      delay: { show: 50, hide: 0 },
      placement: "top",
    }),
    o(".op-l span").tooltip({
      template:
        '<div class="tooltip property-help-tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      delay: { show: 200, hide: 0 },
      container: ".ed-pnl",
      placement: "top",
      html: !0,
    }),
    o('[data-toggle="tooltipAnimGenerator"]').tooltip({ html: !0 }),
    o('[data-toggle="tooltip"]')
      .tooltip({ container: ".ed-pnl", html: !0 })
      .on("shown.bs.tooltip", function () {
        0 < o(".popover").length && o(this).tooltip("hide");
      }),
    o('[data-toggle="popover"]').popover({
      trigger: "hover",
      container: ".ed-pnl",
    }),
    o(".op-g,.wyp-advanced-option").on("shown.bs.popover", function () {
      80 > parseFloat(o(".popover").css("top")) && o(this).popover("hide");
    }),
    o(".ed-pnl").draggable({
      handle: ".ed-pnl-top",
      cancel: ".ed-pnl-top *",
      start: function () {
        tn.append(
          "<div class='fake-layer' style='background-color:rgba(0,0,0,0.05);'></div>"
        ),
          window.ypData["wyp-fix-pan"] &&
            (o(".fixed_right_panel_checkbox input")
              .prop("checked", !1)
              .trigger("change"),
            v("fixed_right_panel", "false"),
            pe(!0),
            Ct());
      },
      drag: function (e, t) {
        (t.position.top = Math.max(-30, t.position.top)),
          (t.position.top = Math.min(o(window).height() - 30, t.position.top)),
          o(".wyp-right-panel-placeholder").show(),
          t.position.left > o(window).width() - o(".ed-pnl").width()
            ? o(".wyp-right-panel-placeholder").addClass("active")
            : o(".wyp-right-panel-placeholder").removeClass("active"),
          o.throttle(Be(), 32);
      },
      stop: function (e, t) {
        o(".fake-layer").remove(),
          setTimeout(function () {
            Ct();
          }, 5),
          o(".wyp-right-panel-placeholder").hide(),
          t.position.left > o(window).width() - o(".ed-pnl").width() &&
            (o(".fixed_right_panel_checkbox input")
              .prop("checked", !0)
              .trigger("change"),
            v("fixed_right_panel", "true"),
            N(),
            o.throttle(Be(), 32),
            Ze(),
            Ct());
      },
    }),
    o(".anim-bar").draggable({
      handle: ".anim-bar-title",
      cancel: ".wyp-anim-btn",
      containment: "window",
      start: function () {
        tn.append("<div class='fake-layer'></div>");
      },
      drag: function (e, t) {
        t.position.top = Math.max(-30, t.position.top);
      },
      stop: function () {
        o(".anim-bar").addClass("anim-bar-dragged"),
          o(".fake-layer").remove(),
          setTimeout(function () {
            Ct();
          }, 5);
      },
    }),
    o("#leftAreaEditor").draggable({
      handle: "#cssEditorBar",
      cancel: "#cssEditorBar *",
      start: function () {
        return (
          !!window.ypData["wyp-css-ed-drgable"] &&
          void (tn.append("<div class='fake-layer'></div>"),
          (window.leftAreaEditors = o("#leftAreaEditor").attr("style")),
          o("#css-editor-drag-style").remove(),
          (window.cssHeightLimit = parseInt(
            o(window).height() - (25 * o("#leftAreaEditor").height()) / 100
          )))
        );
      },
      drag: function (e, t) {
        return (
          !!window.ypData["wyp-css-ed-drgable"] &&
          void (32 > t.position.left && (t.position.left = 32),
          -14 > t.position.top && (t.position.top = -14),
          t.position.top > window.cssHeightLimit &&
            (t.position.top = window.cssHeightLimit))
        );
      },
      stop: function (e, t) {
        return (
          !!window.ypData["wyp-css-ed-drgable"] &&
          void (J(window.leftAreaEditors)
            ? o("#leftAreaEditor").removeAttr("style")
            : o("#leftAreaEditor").attr("style", window.leftAreaEditors),
          tn.append(
            "<style id='css-editor-drag-style'>body.wyp-css-ed-drgable #leftAreaEditor{left:" +
              t.position.left +
              "px !important;top:" +
              t.position.top +
              "px !important;}</style>"
          ),
          o(".fake-layer").remove())
        );
      },
    }),
    o(document).on("keydown keyup", ".scenes .scene input", function () {
      o(this).val(mi(o(this).val().replace(/\-/g, ""))),
        100 < parseFloat(o(this).val()) && o(this).val("100"),
        0 > parseFloat(o(this).val()) && o(this).val("0");
    }),
    o(document).on("click", ".scenes .scene-no-click-yet", function () {
      o(this).removeClass("scene-no-click-yet");
    }),
    o(document).on(
      "keyup keydown blur",
      ".scenes .scene:not(.scene-add):last input",
      function () {
        o(this).val("100");
      }
    ),
    o(document).on(
      "keyup keydown blur",
      ".scenes .scene:first-child input",
      function () {
        o(this).val("0");
      }
    ),
    o(document).on("click", ".wyp-anim-play", function () {
      var e = o(this);
      if (tn.hasClass("wyp-animate-test-playing"))
        return (
          o(".scenes .scene-" + window.willActive + "").trigger("click"),
          e.html('<span class="yicon icon-controls-play"></span>'),
          e
            .attr("data-original-title", "Play")
            .tooltip("fixTitle")
            .tooltip("show"),
          Qi.removeClass("wyp-animate-test-playing"),
          Gi.find("#animate-test-drive").empty(),
          Ji.removeClass("wyp-hid-bor-n"),
          Ni(),
          Ze(),
          Yi(),
          !1
        );
      if (
        ((window.willActive = 1),
        o(".scenes .scene").each(function (e) {
          o(this).hasClass("scene-active") && (window.willActive = e + 1);
        }),
        0 === Gi.find("#wyp-anim-scenes style").length)
      )
        return k({ title: qi.all_scenes_empty, text: qi.allScenesEmpty }), !1;
      o(".scenes .scene-1").trigger("click");
      var t = te("animationGeneratorTestAnimate");
      t = t + " " + t.replace(/@keyframes/g, "@-webkit-keyframes");
      var a, i;
      Ji.addClass("wyp-hid-bor-n");
      var n = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
      tn.attr("class", n),
        (n = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, ""))),
        Ji.attr("class", n),
        Qi.addClass("wyp-animate-test-playing"),
        Gi.find("#animate-test-drive").empty(),
        Gi.find("#animate-test-drive").append(
          "<style>" + za(t, !1) + "</style>"
        ),
        (a = o("#animation-duration-value").val()),
        (i = "s" == o("#animation-duration-after").val() ? 1e3 * a : a),
        (i -= 10),
        (a += o("#animation-duration-after").val()),
        Gi.find("#animate-test-drive").append(
          "<style>body.wyp-animate-test-playing .wyp-selected,body.wyp-animate-test-playing .wyp-selected-others,body.wyp-animate-test-playing.wyp-selected{animation-name:animationGeneratorTestAnimate !important;animation-duration:" +
            a +
            " !important;animation-iteration-count:1 !important;}</style>"
        ),
        e.html('<span class="yicon icon-controls-pause"></span>'),
        e
          .attr("data-original-title", "Pause")
          .tooltip("fixTitle")
          .tooltip("hide"),
        Yi(),
        (window.animationTimer4 = setTimeout(function () {
          e.html('<span class="yicon icon-controls-play"></span>'),
            e
              .attr("data-original-title", "Play")
              .tooltip("fixTitle")
              .tooltip("hide"),
            e.is(":hover") && e.tooltip("show"),
            Qi.removeClass("wyp-animate-test-playing"),
            Gi.find("#animate-test-drive").empty(),
            Ji.removeClass("wyp-hid-bor-n"),
            o(".scenes .scene-" + window.willActive + "").trigger("click"),
            Ni(),
            Ze();
        }, i));
    }),
    o(document).on("keyup", ".yellow-alert input", function () {
      o(this).val(Wn(o(this).val()));
    }),
    o(".wyp-anim-save").click(function () {
      return 0 === Gi.find("#wyp-anim-scenes style").length
        ? (k({ title: qi.sorry, text: qi.allScenesEmpty }), !1)
        : (setTimeout(function () {
            var e =
              Wn(yi(bi(_a(), !1, null))) +
              "_Animate_" +
              parseInt(
                JSON.parse(o("#animation-name-group textarea").val()).length + 1
              );
            o(".yellow-alert input").val(e).trigger("focus");
          }, 20),
          k(
            {
              title: qi.animation_name,
              confirmButtonText: qi.save_animation,
              showCancelButton: !0,
              showInput: !0,
              text: qi.set_animation_name,
            },
            function () {
              o(".scenes .scene-1").trigger("click");
              var e = o(".yellow-alert input").val(),
                t = te(e);
              (!1 == window.ypData.demo_mode || !0 !== window.bMode) &&
                o.post(ajaxurl, {
                  action: "wyp_add_animation",
                  wyp_anim_data: t,
                  wyp_anim_name: e,
                  _wpnonce: window.wyp_editor_nonce,
                });
              var a = o("#animation-name-group textarea");
              a.val(
                a
                  .val()
                  .replace(
                    /^\[\{/,
                    '[{"value":"' +
                      e +
                      '","label":"' +
                      e +
                      '","category":"my animations"},{'
                  )
              ),
                o("#wyp-animation-name").catcomplete({
                  source: JSON.parse(decodeURIComponent(a.val())),
                }),
                Gi.find("#wyp-animate-data").append(
                  "<style id='" + e + "style'>" + t + "</style>"
                ),
                Gi.find("#wyp-animate-data").append(
                  "<style id='webkit-" +
                    e +
                    "style'>" +
                    t.replace("@keyframes", "@-webkit-keyframes") +
                    "</style>"
                ),
                ae(!1),
                setTimeout(function () {
                  tt(null, "animation-name", e, ""),
                    tt(null, "animation-fill-mode", "both", ""),
                    o("li.animation-option").removeAttr("data-loaded"),
                    o("#wyp-animation-name").val(e).trigger("blur"),
                    ie("animation-name");
                }, 500);
            }
          ),
          !1);
    }),
    o("#search-css-selector").tooltip({
      container: "body",
      title: "Find elements by CSS selector",
    }),
    o("#search-css-selector").on("click", function () {
      fe(), o("#wyp-selector-editor").val("");
    }),
    o(document).on("click", ".scenes .scene .scene-delete", function () {
      var e = o(this).parent().attr("data-scene").replace("scene-", ""),
        t = o(".scenes .scene").length - 1;
      o(".scenes .scene:not('.scene-add')").remove();
      for (var a = 1; a < t; a++) o(".scene-add").trigger("click");
      return (
        6 == t && (o(".scene-add").show(), ee()),
        Gi.find("#wyp-anim-scenes #scene-" + e + "").empty(),
        o(".scenes .scene-" + (e - 1) + "").trigger("click"),
        !1
      );
    }),
    o(document).on("mouseover", ".scene-info", function () {
      var e = o(this).parent().parent().attr("data-scene"),
        t = "";
      Gi.find("#wyp-anim-scenes #" + e + " style").each(function () {
        (t +=
          "<span class='anim-info-rule'>" +
          o(this).attr("data-rule") +
          "</span>"),
          (t +=
            "<span class='anim-info-value'>" + Vt(o(this).html()) + "</span>"),
          (t += "<span class='anim-info-border'></span>");
      }),
        o(this).tooltip("destroy"),
        o(this).popover("destroy"),
        "" == t
          ? o(this)
              .tooltip({
                title: qi.no_property_yet,
                placement: "top",
                trigger: "hover",
                container: ".anim-bar",
                html: !0,
              })
              .tooltip("show")
          : o(this)
              .popover({
                title:
                  qi.scene_properties +
                  " " +
                  o(".anim-bar ." + e + " input").val() +
                  "%",
                content: t,
                trigger: "hover",
                placement: "top",
                container: ".anim-bar",
                html: !0,
              })
              .popover("show");
    }),
    o(document).on("click", ".scenes .scene", function () {
      if (o(this).hasClass("scene-add")) {
        var e = o(".scenes .scene").length;
        o(".scenes .scene-let-delete").removeClass("scene-let-delete"),
          o(".scene-add").before(
            '<div class="scene-let-delete scene scene-' +
              e +
              '" data-scene="scene-' +
              e +
              '"><span class="yicon icon-trash scene-delete"></span><p><span class="scene-info yicon icon-warning"></span>' +
              qi.scene +
              " " +
              e +
              '<span><input type="text" value="100" /></span></p></div>'
          ),
          o(".scenes .scene-" + e + "").trigger("click"),
          o(".scene-1 input").val("0"),
          o(".scene-2 input").val("100"),
          3 == e &&
            (o(".scene-1 input").val("0"),
            o(".scene-2 input").val("50"),
            o(".scene-3 input").val("100")),
          4 == e &&
            (o(".scene-1 input").val("0"),
            o(".scene-2 input").val("33.3"),
            o(".scene-3 input").val("66.6"),
            o(".scene-4 input").val("100")),
          5 == e &&
            (o(".scene-1 input").val("0"),
            o(".scene-2 input").val("25"),
            o(".scene-3 input").val("50"),
            o(".scene-4 input").val("75"),
            o(".scene-5 input").val("100")),
          6 == e &&
            (o(".scene-1 input").val("0"),
            o(".scene-2 input").val("20"),
            o(".scene-3 input").val("40"),
            o(".scene-4 input").val("60"),
            o(".scene-5 input").val("80"),
            o(".scene-6 input").val("100")),
          6 == e && o(".scene-add").hide();
        var t, a, i;
        return (
          Gi.find("#wyp-anim-scenes #scene-" + e + " style").each(function () {
            return (
              (a = o(this)),
              (t = a.attr("data-rule")),
              (i = Gi.find(
                "#wyp-anim-scenes #scene-" +
                  parseInt(e - 1) +
                  " style[data-rule='" +
                  t +
                  "']"
              )),
              0 == i.length ||
                void a.text(
                  i
                    .text()
                    .replace(/body\.wyp-scene-(\d+)/g, "body.wyp-scene-" + e)
                )
            );
          }),
          ee(),
          !1
        );
      }
      o(".scene-active").removeClass("scene-active"),
        o(this).addClass("scene-active"),
        Qi.attr("data-anim-scene", o(this).attr("data-scene"));
      var n = o.trim(tn.attr("class").replace(/wyp-scene-[0-9]/g, ""));
      tn.attr("class", n),
        (n = o.trim(Ji.attr("class").replace(/wyp-scene-[0-9]/g, ""))),
        Ji.attr("class", n),
        Qi.addClass("wyp-" + o(this).attr("data-scene"));
      for (
        var s = parseInt(o(this).attr("data-scene").replace("scene-", ""));
        1 < s;
        s--
      )
        Qi.addClass("wyp-scene-" + s);
      we(), Ze();
    }),
    o(".wyp-anim-cancel").click(function () {
      k(
        {
          title: qi.closeAnim,
          showCancelButton: !0,
          confirmButtonText: "Close",
        },
        function () {
          ae(!0);
        }
      );
    }),
    o(".wyp-add-animation-link").click(function () {
      return (
        (window.animGeneratorOldAnim = o("#wyp-animation-name").val()),
        (window.animGeneratorOldAnimDuration = o(
          "#animation-duration-value"
        ).val()),
        (window.animGeneratorOldAnimDelay = o("#animation-delay-value").val()),
        (window.animGeneratorOldAnimDurationF = o(
          "#animation-duration-after"
        ).val()),
        (window.animGeneratorOldAnimDelayF = o("#animation-delay-after").val()),
        (window.animGeneratorOldAnimFillMode = o(
          "#wyp-animation-fill-mode"
        ).val()),
        "none" == window.animGeneratorOldAnim &&
          (window.animGeneratorOldAnim = "disable"),
        tt(null, "animation-name", "disable", ""),
        ("0" == o("#animation-duration-value").val() ||
          "0.00" == o("#animation-duration-value").val()) &&
          (o("#animation-duration-value").val("1"),
          o("#animation-duration-value").trigger("blur")),
        0 === Gi.find("#wyp-anim-scenes").length &&
          Gi.find("#wyp-animate-data").after(
            '<div id="wyp-anim-scenes"><div id="scene-1"></div><div id="scene-2"></div><div id="scene-3"></div><div id="scene-4"></div><div id="scene-5"></div><div id="scene-6"></div></div><div id="animate-test-drive"></div>'
          ),
        window.ypData["wyp-css-ed-act"] &&
          o(".wyp-css-close-btn").trigger("click"),
        Qi.addClass("wyp-ani-cre"),
        (window.ypData.is_animate_creator = !0),
        Qi.addClass("wyp-scene-1"),
        Qi.attr("data-anim-scene", "scene-1"),
        o(".scene-active").removeClass("scene-active"),
        o(".scenes .scene:first-child").addClass("scene-active"),
        ee(),
        o(".animation-option.active > h3").trigger("click"),
        sa(),
        o.throttle(Be(), 32),
        !1
      );
    }),
    o(".wyp-advanced-link").click(function () {
      return (
        !o(this).hasClass("wyp-add-animation-link") &&
        void (o(".wyp-on").not(this).removeClass("wyp-on"),
        o(".wyp-advanced-option")
          .not(o(this).next(".wyp-advanced-option"))
          .hide(0),
        o(this).next(".wyp-advanced-option").toggle(0),
        o(this).toggleClass("wyp-on"),
        o.throttle(Be(), 32))
      );
    }),
    o(".wyp-responsive-btn").click(function () {
      j();
    }),
    o(
      ".leftbar-button:not(.left-menu-btn):not(.undo-btn):not(.redo-btn):not(.cursor-main-btn):not(.css-editor-btn)"
    ).click(function () {
      !1 === S()
        ? (o(this).toggleClass("active"), o(this).tooltip("hide"))
        : !1 === o(this).hasClass("wyp-selector-mode") &&
          (o(this).toggleClass("active"), o(this).tooltip("hide"));
    }),
    o(".left-menu-btn").click(function () {
      o(this).toggleClass("yhover"), o(".interface-settings").toggle();
    }),
    o(".undo-btn").click(function () {
      clearTimeout(window.historyDelay),
        tn.hasClass("wyp-history-delay")
          ? (window.historyDelay = setTimeout(function () {
              U();
            }, 220))
          : U();
    }),
    o(".redo-btn").click(function () {
      clearTimeout(window.historyDelay),
        tn.hasClass("wyp-history-delay")
          ? (window.historyDelay = setTimeout(function () {
              q();
            }, 220))
          : q();
    }),
    o(".wyp-bg-img-btn").click(function () {
      var e = o(this);
      e.hasAttr("data-json") &&
        o
          .getJSON(e.attr("data-json"), function (t) {
            var a = "";
            o.each(t.patterns, function (e, t) {
              a += '<div class="wyp-bg-ast" data-url="' + t + '"></div>';
            }),
              o(".wyp-background-asts").append(a),
              e.removeAttr("data-json"),
              se();
          })
          .fail(function () {
            Li(
              "Loading Error",
              "Could Not Load Json library. (patterns.json)",
              "jsonError"
            );
          }),
        e.toggleClass("active"),
        o(".wyp-background-asts").toggle(),
        e.hasClass("active")
          ? (o(".wyp-gradient-btn.active,.wyp-unsplash-btn.active").trigger(
              "click"
            ),
            o(".wyp-background-image-show").hide())
          : ne(null);
      var t = o("#wyp-background-image").val();
      -1 == t.indexOf("yellow-pencil")
        ? o(".wyp-bg-ast").removeClass("active")
        : o(
            ".wyp-bg-ast[data-url='" +
              t
                .replace(/"/g, "")
                .replace(/'/g, "")
                .replace(/url\(/g, "")
                .replace(/\)/g, "") +
              "']"
          ).addClass("active"),
        !1 == e.hasAttr("data-json") && se(),
        o.throttle(Be(), 32);
    }),
    o(".wyp-bg-ast").on("mouseenter mouseover", function () {
      o(".wyp-bg-ast").removeClass("focus"), o(this).addClass("focus");
    }),
    o(".wyp-background-asts").on(
      "scroll",
      o.throttle(function () {
        oe();
      }, 64)
    ),
    o(".wyp-gradient-btn").on("click", function () {
      var e = o(this);
      if (
        (e.hasAttr("data-json") &&
          o
            .getJSON(e.attr("data-json"), function (t) {
              var a = "";
              o.each(t, function (e, t) {
                a +=
                  8 > e
                    ? '<div class="wyp-gradient-demo free-gradient" data-gradient="' +
                      t.gradient +
                      '"><span style="background-image:' +
                      t.gradient +
                      '"></span> <div>' +
                      t.name +
                      "</div></div>"
                    : '<div class="wyp-gradient-demo" data-gradient="' +
                      t.gradient +
                      '"><span style="background-image:' +
                      t.gradient +
                      '"></span> <div>' +
                      t.name +
                      "</div></div>";
              }),
                o(".wyp-gradient-list").append(a),
                e.removeAttr("data-json");
            })
            .fail(function () {
              Li(
                "Loading Error",
                "Could Not Load Json library. (gradients.json)",
                "jsonError"
              );
            }),
        e.toggleClass("active"),
        o(".wyp-gradient-section").toggle(),
        e.hasClass("active"))
      ) {
        o(".wyp-unsplash-btn.active,.wyp-bg-img-btn.active").trigger("click"),
          o(".wyp-background-image-show").hide();
        var t = o("#wyp-background-image").val();
        -1 == t.indexOf("linear-gradient(")
          ? Ot("linear-gradient(141deg, #0fb8ad 0%, #2cb5e8 100%)")
          : Ot(t),
          setTimeout(function () {
            0 < o(".wyp-gradient-demo.active").length
              ? o(".wyp-gradient-list").scrollTop(
                  30 * (o(".wyp-gradient-demo.active").index() - 3)
                )
              : o(".wyp-gradient-list").scrollTop(0);
          }, window.YellowDelay);
      } else ne(null);
      o.throttle(Be(), 32);
    }),
    o(".wyp-clear-btn").on("click", function () {
      o(this)
        .parent()
        .find("input")
        .val("none")
        .trigger("keyup")
        .trigger("blur"),
        ne(null);
    }),
    o(document).on("change keyup", ".in-wr > input", function () {
      var e = o(this),
        t = e.val(),
        a = e.parent();
      "" == t || "none" == t
        ? a.addClass("empty-input")
        : a.removeClass("empty-input");
    });
  var hn = !1;
  o(".wyp-unsplash-btn").on("click", function () {
    var e = o(this);
    hn || (Wi(1), (hn = !0)),
      e.toggleClass("active"),
      o(".wyp-unsplash-section").toggle(),
      e.hasClass("active")
        ? (o(".wyp-gradient-btn.active,.wyp-bg-img-btn.active").trigger(
            "click"
          ),
          o(".wyp-background-image-show").hide())
        : ne(null),
      o.throttle(Be(), 32);
  }),
    o(document).on("click", ".wyp-gradient-demo", function () {
      Ot(o(this).attr("data-gradient")),
        Dt("insert"),
        o(
          ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active"
        ).removeClass("active"),
        o(this).addClass("active"),
        o(".wyp-background-image-show").hide();
    }),
    o(".wyp-upload-btn").click(function () {
      o("#image_uploader iframe")[0].contentWindow.location.replace(
        o("#image_uploader iframe").attr("data-url")
      ),
        o("#image_uploader iframe").attr("src", function (e, t) {
          return t;
        }),
        (window.send_to_editor = function (e) {
          var t = e.match(/src="(.*?)"/g);
          if (null != t) {
            var a = "";
            if (
              ((t = t.toString().replace('src="', "").replace('"', "")),
              "" != t)
            ) {
              var i = t.split("-").length - 1;
              null === t.split("-")[i].match(/(.*?)x(.*?)\./g)
                ? (a = t)
                : ((a = t.replace("-" + t.split("-")[i], "")),
                  -1 != t.split("-")[i].indexOf(".") &&
                    (a = a + "." + t.split("-")[i].split(".")[1]));
            }
            0 < o(".background-option.active").length
              ? o("#wyp-background-image").val(a).trigger("keyup")
              : o("#wyp-list-style-image").val(a).trigger("keyup");
          } else
            k({
              title: "Please upload only image type files.",
              text: "You can only upload images.",
            });
          (window.send_to_editor = window.restore_send_to_editor),
            o("#image_uploader").toggle(),
            o("#image_uploader_background").toggle(),
            o(".wyp-upload-btn").toggleClass("active");
        }),
        o("#image_uploader").toggle(),
        o("#image_uploader_background").toggle(),
        o(".wyp-upload-btn").toggleClass("active");
    }),
    o("#image_uploader_background").click(function () {
      o("#image_uploader").toggle(),
        o("#image_uploader_background").toggle(),
        o(".wyp-upload-btn").toggleClass("active"),
        o("#image_uploader iframe").attr("src", function (e, t) {
          return t;
        });
    }),
    (window.restore_send_to_editor = window.send_to_editor),
    (window.send_to_editor = function (e) {
      var t = o("img", e).attr("src");
      0 < o(".background-option.active").length
        ? o("#wyp-background-image").val(t)
        : o("#wyp-list-style-image").val(t),
        (window.send_to_editor = window.restore_send_to_editor),
        o("#image_uploader").toggle(),
        o("#image_uploader_background").toggle(),
        o(".wyp-upload-btn").toggleClass("active"),
        o("#image_uploader iframe").attr("src", function (e, t) {
          return t;
        });
    }),
    !1 == window.ypData.demo_mode &&
      (window.onbeforeunload = function () {
        if (
          !0 !== window.wyp_redirect_on &&
          o(".wyp-save-btn").hasClass("waiting-for-save")
        )
          return confirm(qi.sure);
      }),
    o(".wyp-save-btn").on("click", function () {
      if (o(this).hasClass("wyp-disabled")) return !1;
      if (window.bMode) {
        if (
          /wp-content/.test(Gi.find("head").html()) &&
          !1 === e()?.is_subscription_active
        )
          return (
            o(".wyp-info-modal .wyp-info-modal-top-inner h2").text(
              "Consider Upgrading to the Professional Plan"
            ),
            o(".wyp-info-modal .wyp-info-modal-top-inner p").text(
              "A pro plan is required to editing WordPress-based sites. Save your time with a pro plan."
            ),
            o(".wyp-info-modal .wyp-buy-link").attr(
              "href",
              "https://visualcsseditor.com/?utm_source=chrome-editor&utm_medium=wordpress-based-upgrade&utm_campaign=chrome-upgrade"
            ),
            o(".wyp-info-modal .wyp-buy-link").text("See Pricing"),
            o(".wyp-info-modal .wyp-info-modal-close").text("Maybe Later"),
            o(".wyp-info-modal .wyp-info-unlock-p").attr(
              "style",
              "visibility:hidden;"
            ),
            o(".wyp-info-modal .wyp-info-last-note").text(
              "Get unlimited usage and premium customer support today."
            ),
            o(".wyp-info-modal .activate-pro").attr(
              "href",
              "https://visualcsseditor.com/sign-in"
            ),
            o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"),
            !1
          );
        window.ypData["wyp-need-to-process"] && Zi(),
          o(".wyp-save-btn").removeClass("waiting-for-save");
        var t = Et(),
          a = t.match(/font-family(\s)?:([^;]+);/gi),
          n = "",
          s = [],
          r;
        if (a) {
          for (var l = 0; l < a.length; l++)
            -1 !== a[l].indexOf(",") &&
              !1 !== /(\"|\')/g.test(a[l]) &&
              ((r = a[l]
                .replace(/(^font-family(\s)?:|;$|!important|"|')/g, "")
                .split(",")[0]
                .trim()),
              -1 === s.indexOf(r)) &&
              (mt(r) ||
                (s.push(r),
                (n +=
                  '@import url("//fonts.googleapis.com/css2?family=' +
                  r.replace(/\s+/g, "+") +
                  ':ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");'),
                (n += "\n")));
          0 < n.length && (n = "/* Import Google Fonts */\n" + n + "\n");
        }
        k({
          customClass: "yellow-alert-bmode",
          text:
            "<div class='export-title'>Export CSS Code <div class='cly' onclick='document.querySelector(\".button-container .cancel\").click();'></div></div><div id='b-mode-css'>" +
            (n + t.replace(/\t/g, " ")) +
            "</div>",
          showCancelButton: !0,
        }),
          o(".yellow-alert-bmode.yellow-overlay").on("mousedown", function (t) {
            o(t.target).hasClass("yellow-alert-bmode") &&
              o(".yellow-alert-bmode").remove();
          });
        var d = ace.edit("b-mode-css");
        return (
          d.setTheme("ace/theme/twilight"),
          d.getSession().setMode("ace/mode/css"),
          d.getSession().setUseWorker(!1),
          d.setOptions({
            fontSize: "14px",
            enableBasicAutocompletion: !1,
            enableSnippets: !1,
            enableLiveAutocompletion: !1,
          }),
          d.focus(),
          !1
        );
      }
      var p = window.location.href.split("&wyp_page_id=");
      (p = p[1].split("&")), (p = p[0]);
      var c = window.location.href.split("&wyp_page_type=");
      if (((c = c[1].split("&")), (c = c[0]), !window.ypData.demo_mode)) {
        var u = Gi.find(".wyp-inline-data").text(),
          m = Gi.find("#wyp-live-css-data");
        0 < m.length && (u += m.text());
        var f = !0;
        if (tn.hasClass("wtfv")) {
          var g =
            (
              u.match(
                /(\s|\{)(font-family|color|background-image|background-color|width|height|animation-name)\:/g
              ) || []
            ).length - window.old_premium_rules;
          0 >= g
            ? o(".wyp-save-btn").text(qi.saving).addClass("wyp-disabled")
            : ((f = !1),
              o(".wt-save-btn")
                .text(qi.save)
                .removeClass("waiting-for-save")
                .removeClass("wt-disabled"),
              o(".wyp-info-modal .wyp-info-modal-top-inner h2").text(
                "Changes Are Not Saved. Upgrade To Pro!"
              ),
              o(".wyp-info-modal .wyp-info-modal-top-inner p").text(
                "You are using some premium features. Upgrade to Pro or disable premium features to save changes."
              ),
              o(".wyp-info-modal,.wyp-popup-background").fadeIn("fast"));
        } else o(".wyp-save-btn").text(qi.saving).addClass("wyp-disabled");
        if (!window.ypData["wyp-need-to-process"]) f && re(p, c);
        else if (f)
          return (
            Zi(),
            setTimeout(function () {
              re(p, c);
            }, 100),
            !1
          );
      } else
        k({ title: qi.save_alert, text: qi.live_preview_text }),
          o(".wyp-save-btn")
            .text(qi.saved)
            .addClass("wyp-disabled")
            .removeClass("waiting-for-save");
    }),
    o("#wyp-crnt-el").on("click", function () {
      if (C()) {
        tn.addClass("wyp-crnt-el-menu");
        var e = this.getBoundingClientRect(),
          t = e.left + 1 + Ji.scrollLeft() + Ki.scrollLeft(),
          a = e.top + 35 + Ji.scrollTop() + Ki.scrollTop();
        _().contextMenu({ x: t, y: a });
      }
    }),
    o(document).on(
      "mousewheel DOMMouseScroll",
      "#context-menu-layer",
      o.throttle(function () {
        window.ypData.editor_context_menu_open && _().contextMenu("hide");
      }, 64)
    ),
    o(document).on("mouseover", "#context-menu-layer", function () {
      sn.extra.find(".wyp-el-viewer").remove();
    });
  var yn = null,
    wn = null;
  Gi.on(
    "scroll",
    o.throttle(function () {
      null !== yn && clearTimeout(yn),
        null !== wn && clearTimeout(wn),
        C() &&
          (!0 === le(_(), "position", "fixed", "==") &&
            (Ji.hasClass("wyp-h-trfm")
              ? (yn = setTimeout(function () {
                  Ji.removeClass("wyp-h-trfm");
                }, 200))
              : Ji.addClass("wyp-h-trfm")),
          (wn = setTimeout(function () {
            Ze();
          }, 200)));
    }, 64)
  ),
    o(document).on("click", ".wyp-background-asts div", function () {
      var e = o(this);
      o(
        ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active"
      ).removeClass("active"),
        e
          .parent()
          .parent()
          .find(".wyp-input")
          .val(pluginurl + "assets/" + e.data("url"))
          .trigger("keyup"),
        e.addClass("active"),
        o(".wyp-background-image-show").hide();
      var t = _(),
        a = t.css(["background-repeat", "background-size"]);
      "no-repeat" == a["background-repeat"] &&
        (tt(null, "background-repeat", "repeat"), pa("background-repeat")),
        "auto" != a["background-size"] &&
          (tt(null, "background-size", "auto"), pa("background-size"));
    }),
    o(document).on("click", ".iris-color-preview", function () {
      var e = o(this),
        t = e.parents(".iris-picker"),
        a = e.parents(".op-g").find("input.co-p");
      0 == a.length && (a = o("#iris-gradient-color")), e.addClass("active");
      var i = a.val();
      (i = i.replace(/\s/g, "")),
        -1 != i.indexOf("#") &&
          ((i = Ri(i)),
          (i = i.replace(/rgb\(/g, "rgba(")),
          (i = i.replace(/\)$/g, ",0)"))),
        -1 == i.indexOf("rgba(")
          ? -1 != i.indexOf("rgb(") &&
            ((i = i.replace(/rgb\(/g, "rgba(")), (i = i.replace(/\)$/g, ",0)")))
          : (i = i.replace(/,[\d.]+\)$/, ",0)")),
        a.val("transparent").trigger("change"),
        a.iris("color", i),
        t.find(".information-item.hex input").val("transparent");
    }),
    o(document).on(
      "keyup",
      ".iris-picker .information-item.rgb input",
      function () {
        var e = o(this).parents(".op-g").find(".co-p");
        0 == e.length && (e = o("#iris-gradient-color"));
        var t = o(this).parents(".information-item"),
          i = t.find(".rgb-r input").val(),
          n = t.find(".rgb-g input").val(),
          s = t.find(".rgb-b input").val(),
          r = t.find(".rgb-a input").val(),
          a = "rgba(" + i + "," + n + "," + s + "," + r + ")";
        return (
          1 == r && (a = "rgb(" + i + "," + n + "," + s + ")"),
          "" != o(this).val() &&
            void (e.val(a).trigger("change"), e.iris("color", a))
        );
      }
    ),
    (window.inputFocusVal = ""),
    o(document).on(
      "focus",
      ".iris-picker .information-item input",
      function () {
        window.inputFocusVal = o(this).val();
      }
    ),
    o(document).on(
      "change",
      ".iris-picker .information-item.rgb input",
      function () {
        "" == o(this).val() &&
          ((window.BlockIrisTypeChange = !0),
          o(this).val(window.inputFocusVal).trigger("keyup"),
          (window.BlockIrisTypeChange = !1));
      }
    ),
    o(document).on(
      "change keyup",
      ".iris-picker .information-item.hex input",
      function (e) {
        var t = o(this),
          a = t.parents(".op-g").find(".co-p");
        0 == a.length && (a = o("#iris-gradient-color"));
        var i = t.val();
        return "" == i
          ? ("change" == e.type && t.val(window.inputFocusVal).trigger("keyup"),
            !1)
          : void (a.val(i).trigger("change"), a.iris("color", i));
      }
    ),
    o(document).on("click", ".iris-color", function () {
      var e = o(this),
        t = e.attr("data-color"),
        a = e.parents(".op-g").find(".co-p");
      0 == a.length && (a = o("#iris-gradient-color")),
        a.val(t).trigger("change"),
        a.iris("color", t);
    }),
    o(document).on("click", "#autocomplate-selector-list li", function () {
      var e = o(this).text().split(" |")[0];
      o("#wyp-selector-editor").val(e).trigger("keyup").trigger("focus");
    }),
    (window.selectorActive = -1),
    o("#wyp-selector-editor").keyup(function (t) {
      var e = o(this).val(),
        a = e.substr(e.length - 1);
      if (
        32 == t.keyCode &&
        !1 == /(\#|\.)/g.test(e) &&
        !1 == Ca(e, !0, !1, !1)
      ) {
        var i = o("#autocomplate-selector-list li.active");
        if (0 < i.length && e != i.text())
          return (
            o(this)
              .val(i.text() + " ")
              .trigger("keyup"),
            !1
          );
      }
      if (
        (40 != t.keyCode && 38 != t.keyCode && me(),
        o("#wyp-selector-editor").removeClass("selector-is-invalid"),
        o("#autocomplate-selector-list li").removeClass("active"),
        0 < o("#autocomplate-selector-list li").length &&
          !0 == /[a-z-A-Z0-9_-]/g.test(a))
      ) {
        var n = 1e4;
        o("#autocomplate-selector-list li").each(function () {
          o(this).text().length < n &&
            ((n = o(this).text().length),
            o("#autocomplate-selector-list li").removeClass("active"),
            o(this).addClass("active"));
        });
      }
      if (13 == t.keyCode)
        return 0 < o("#autocomplate-selector-list li.active").length &&
          o(this).val() != o("#autocomplate-selector-list li.active").text()
          ? (o(this).val(o("#autocomplate-selector-list li.active").text()),
            o("#autocomplate-selector-list li").remove(),
            !1)
          : (ge("#wyp-selector-editor"), !1);
      var s = o("#autocomplate-selector-list li.active");
      0 < s.length &&
        -1 == window.selectorActive &&
        (window.selectorActive = o(
          "#autocomplate-selector-list li.active"
        ).prevAll().length),
        40 == t.keyCode &&
        o("#autocomplate-selector-list li").length >= window.selectorActive + 2
          ? window.selectorActive++
          : 38 == t.keyCode && 0 <= window.selectorActive - 1
          ? window.selectorActive--
          : 38 == t.keyCode &&
            0 > window.selectorActive &&
            (window.selectorActive =
              o("#autocomplate-selector-list li").length - 1),
        (40 == t.keyCode || 38 == t.keyCode) &&
          (o("#autocomplate-selector-list li").removeClass("active"),
          o("#autocomplate-selector-list li")
            .eq(window.selectorActive)
            .addClass("active"),
          0 <
            o("#autocomplate-selector-list li").eq(window.selectorActive)
              .length &&
            o(this).val(
              o("#autocomplate-selector-list li")
                .eq(window.selectorActive)
                .text()
            ));
    }),
    o("#wyp-selector-editor").on("keyup keydown", function (t) {
      if (40 == t.keyCode || 38 == t.keyCode) return !1;
    }),
    o("#selector-editor-background").click(function () {
      o("#wyp-selector-editor").val(""), ge("#wyp-selector-editor");
    }),
    o(document).on("mouseout", ".info-element-class-list li", function () {
      clearTimeout(window.focusElementTimer),
        sn.extra.find(".wyp-el-viewer").remove();
    }),
    o(document).on("click", ".info-element-class-list li", function () {
      var e = o(this).text();
      window.focusElementTimer = setTimeout(function () {
        ce(Gi.find(e)), st(Gi.find(e));
      }, 80);
    }),
    o(document).on("click", ".breakpoint-bar .breakpoint-item", function () {
      Ja(o(this));
    }),
    o(document).on("mouseout", ".breakpoint-bar .breakpoint-item", function () {
      o(this).tooltip("destroy");
    }),
    o("#wyp-animation-play").on("keyup keydown keypress", function (t) {
      if (t.originalEvent) return !1;
    }),
    o.widget("custom.catcomplete", o.ui.autocomplete, {
      _create: function () {
        this._super(),
          this.widget().menu(
            "option",
            "items",
            "> :not(.ui-autocomplete-category)"
          );
      },
      _renderMenu: function (e, t) {
        var a = this,
          i = "";
        o.each(t, function (t, n) {
          null == n.category && (n.category = "google fonts");
          var s;
          n.category != i &&
            (e.append(
              "<li class='ui-autocomplete-category'>" + n.category + "</li>"
            ),
            (i = n.category)),
            (s = a._renderItemData(e, n)),
            n.category && s.attr("aria-label", n.category + " : " + n.label);
        });
      },
    }),
    o(".wyp-responsive-btn").click(function () {
      var e, t;
      if (o(this).hasClass("active"))
        Qi.removeClass("wyp-res-mod"),
          (window.ypData.is_responsive_mod = !1),
          o(this).addClass("active"),
          (e = o("#iframe").attr("style")),
          o("#iframe").removeAttr("style"),
          o("#iframe").attr("data-style", e),
          o.throttle(Be(), 32);
      else if (
        (Qi.addClass("wyp-res-mod"),
        (window.ypData.is_responsive_mod = !0),
        o(this).removeClass("active"),
        he(!1),
        window.resizedByPropertySize && (window.responsiveFirstWasOpen = !0),
        !1 == window.responsiveFirstWasOpen)
      ) {
        t = o(".breakpoint-bar > .max-width");
        var a;
        0 < t.length
          ? ((a = !1),
            t.each(function () {
              var e = o(this);
              600 < parseInt(e.attr("data-breakpoint")) &&
                1100 > parseInt(e.attr("data-breakpoint")) &&
                ((a = !0), Ja(e));
            }),
            !a && Ja(t.last()))
          : (o(".media-control").trigger("click"),
            (t = o(".breakpoint-bar > .min-width")),
            (a = !1),
            t.each(function () {
              var e = o(this);
              600 < parseInt(e.attr("data-breakpoint")) &&
                1100 > parseInt(e.attr("data-breakpoint")) &&
                ((a = !0), Ja(e));
            }),
            !a && Ja(t.first())),
          o(".media-control").tooltip("hide"),
          (window.responsiveFirstWasOpen = !0);
      } else
        (e = o("#iframe").attr("data-style")),
          o("#iframe").removeAttr("data-style"),
          o("#iframe").attr("style", e);
      N(),
        Ze(),
        ce(),
        setTimeout(function () {
          window.responsiveFirstWasOpen && X(), we();
        }, window.YellowDelay);
    }),
    Gi.contextmenu(function (t) {
      if (!1 == o(t.target).is("input,textarea,select,img")) return !1;
    }),
    (window.disable_auto_insert = !1),
    o(".css-editor-btn,.wyp-css-close-btn").click(function () {
      if (
        (T() && o(".animation-manager-btn.active").trigger("click"),
        o(".css-editor-btn").toggleClass("active"),
        "none" == o("#leftAreaEditor").css("display"))
      ) {
        o("#cssData,#cssEditorBar,#leftAreaEditor").show(),
          tn.addClass("wyp-css-ed-act"),
          (window.ypData["wyp-css-ed-act"] = !0),
          N();
        var e = o(".css-editor-btn"),
          t = e.attr("data-original-title");
        e.attr("data-title", t),
          e.attr("data-original-title", ""),
          _e(!0),
          tn.hasClass("wyp-fix-leftbar")
            ? o(".wyp-navigation-btn.active").trigger("click")
            : window.ypData["wyp-css-ed-drgable"] &&
              o(".wyp-navigation-btn.active").trigger("click"),
          window.ypData["wyp-css-ed-drgable"] &&
            o(".info-btn.active").trigger("click");
      } else {
        if (tn.hasClass("css-code-unvalid"))
          return (
            k({ title: qi.css_parse_error, text: qi.css_parse_error_text }), !1
          );
        o("#cssData,#cssEditorBar,#leftAreaEditor").hide(),
          tn.removeClass("wyp-css-ed-act"),
          (window.ypData["wyp-css-ed-act"] = !1),
          N(),
          o(".css-editor-btn").attr(
            "data-original-title",
            o(".css-editor-btn").attr("data-title")
          ),
          $(),
          Ze(),
          sn.extra.find(".wyp-el-viewer").remove();
      }
      Ze();
    }),
    o(".css-va,.css-un,.wyp-bgs-css-val,.wyp-bgs-prefix").on(
      "keydown keyup",
      function (t) {
        if (!1 == t.originalEvent && !1 == window.allow_input_CSS_process)
          return !1;
        var e = t.keyCode || t.which;
        if (27 == e || 13 == e) return o(this).trigger("blur"), !1;
        if (9 != e && 17 != e && 18 != e && 39 != e && 37 != e) {
          var a = o(this),
            i;
          clearTimeout(window.manualChangeInputDelay),
            (window.manualChangeInputDelay = setTimeout(function () {
              if (
                a.hasClass("wyp-bgs-css-val") ||
                a.hasClass("wyp-bgs-prefix")
              ) {
                i = a.parents(".op-g").attr("data-css");
                var e = o("#background-size-x-value").val(),
                  t = o("#background-size-x-custom").val(),
                  n = o("#background-size-y-value").val(),
                  s = o("#background-size-y-custom").val();
                if (
                  (!1 == /\d+/g.test(e) && "" != e.replace(/\s+/g)
                    ? !1 ==
                        o(document.activeElement).hasClass("wyp-bgs-prefix") &&
                      o("#background-size-x-custom").val("-")
                    : "-" == t &&
                      (o("#background-size-x-custom").val("%"), (t = "%")),
                  !1 == /\d+/g.test(n) && "" != n.replace(/\s+/g)
                    ? !1 ==
                        o(document.activeElement).hasClass("wyp-bgs-prefix") &&
                      o("#background-size-y-custom").val("-")
                    : "-" == s &&
                      (o("#background-size-y-custom").val("%"), (s = "%")),
                  "-" == t && ((t = ""), (e = "auto")),
                  "-" == s && ((s = ""), (n = "auto")),
                  isNaN(e) && "auto" != e)
                )
                  return !1;
                if (isNaN(n) && "auto" != n) return !1;
                if (-1 == window.validUnits.indexOf(t)) return !1;
                if (-1 == window.validUnits.indexOf(s)) return !1;
                "auto" == e && (t = ""),
                  "auto" == n && (s = ""),
                  "auto" == n && /\d+/g.test(e) && ((n = e), (s = t));
                var r = o.trim(e + t + " " + n + s);
                if (("auto auto" == r && (r = "auto"), "" == a.val()))
                  return !1;
                (window.lastEditID = i), tt(null, i, r, ""), Mi();
              } else {
                i = a.parents(".op-g").attr("data-css");
                var l = a.parent().find(".css-va").val(),
                  d = a.parent().find(".css-un").val();
                if ("" == d || "" == l) return !1;
                xe(a, !1), lt(o("#wyp-" + i), i, !0, !1), Mi();
              }
            }, 20));
        }
      }
    ),
    o(".wyp-panel-hide,.wyp-panel-show").click(function () {
      pe();
    }),
    o(document).on("click", "#ed-elt-tr ul li", function () {
      var e = o(this),
        t,
        a;
      o("#ed-elt-tr ul li").removeClass("active"),
        (a = e.attr("data-parent-selector")),
        (t = Gi.find(".wyp-pa-r" + e.attr("data-index"))),
        !1 == e.hasClass("wyp-parent-has-selector") &&
          ((a = Ma(t, "defaultNoCache")),
          e.attr("data-parent-selector", a),
          e.addClass("wyp-parent-has-selector")),
        (window.targetIsParentTree = !0),
        L(a),
        Q(a, t, !0),
        (window.targetIsParentTree = !1),
        e.addClass("active"),
        sn.extra
          .find(".wyp-el-viewer")
          .addClass("wyp-el-viewer-relax-opacity")
          .removeClass("wyp-el-viewer")
          .fadeOut(300),
        (window.relaxView = setTimeout(function () {
          sn.extra.find(".wyp-el-viewer-relax-opacity").remove();
        }, 320)),
        ce();
    }),
    o(document).on("mouseenter mouseover", "#ed-elt-tr ul li", function () {
      var e = o(this),
        t = e.attr("data-parent-selector"),
        a = Gi.find(".wyp-pa-r" + e.attr("data-index"));
      !1 == e.hasClass("wyp-parent-has-selector") &&
        ((t = Ma(a, "defaultNoCache")),
        e.attr("data-parent-selector", t),
        e.addClass("wyp-parent-has-selector")),
        st(Gi.find(t));
    }),
    o(document).on("mouseleave mouseout", "#ed-elt-tr ul li", function () {
      sn.extra.find(".wyp-el-viewer").remove();
    }),
    o(document).on(
      "mouseenter",
      ".context-menu-list.wyp-contextmenu-parent li",
      function () {
        var e = o(this).prevAll("li").length,
          t = _().parentsUntil("html").eq(e),
          a = Ma(t, "defaultNoCache");
        st(Gi.find(a));
      }
    ),
    o(document).on(
      "mouseenter",
      ".context-menu-list.wyp-contextmenu-children li",
      function () {
        var e = o(this).prevAll("li").length,
          t = _().children().eq(e),
          a = Ma(t, "defaultNoCache");
        st(Gi.find(a));
      }
    ),
    o(document).on(
      "mouseleave",
      ".context-menu-list.wyp-contextmenu-parent li,.context-menu-list.wyp-contextmenu-children li",
      function () {
        sn.extra.find(".wyp-el-viewer").remove();
      }
    ),
    o(document).on("click", ".show-more-parent-link", function () {
      var e = o(".context-menu-list.wyp-contextmenu-parent");
      e.removeClass("wyp-limit-parent-view");
    }),
    o(document).on("click", ".show-more-children-link", function () {
      var e = o(".context-menu-list.wyp-contextmenu-children");
      e.removeClass("wyp-limit-children-view");
    }),
    o(".ed-pnl").resizable({
      handles: "w, e",
      minWidth: 276,
      maxWidth: 400,
      start: function () {
        o(".fake-layer-x").css("cursor", "e-resize"), He(0);
      },
      resize: function (e, t) {
        o("#rightpanel-personalized-view").remove(),
          tn.append(
            "<style id='rightpanel-personalized-view'>.ed-pnl{width:" +
              t.size.width +
              "px !important;}</style>"
          ),
          N();
      },
      stop: function (e, t) {
        o(".fake-layer-x").remove(), R("rightPanelWidth", t.size.width), We(0);
      },
    }),
    o("#vsl-css-vi").resizable({
      handles: "w",
      minWidth: 276,
      maxWidth: o(window).width(),
      start: function () {
        o(".fake-layer-x").css("cursor", "e-resize"), He(0);
      },
      resize: function (e, t) {
        o("#visual-manager-personalized-view").remove(),
          t.size.width > parseInt(o(window).width() - 10) &&
            (t.size.width = o(window).width()),
          tn.append(
            "<style id='visual-manager-personalized-view'>#vsl-css-vi{width:" +
              t.size.width +
              "px !important;}</style>"
          ),
          N();
      },
      stop: function (e, t) {
        o(".fake-layer-x").remove(),
          R("visualManagerWidth", t.size.width),
          We(0);
      },
    }),
    o(".advanced-info-box").resizable({
      handles: "e",
      minWidth: 280,
      maxWidth: 500,
      start: function () {
        o(".fake-layer-x").css("cursor", "e-resize");
      },
      resize: function (e, t) {
        o("#advancedinfobox-personalized-view").remove(),
          tn.append(
            "<style id='advancedinfobox-personalized-view'>.advanced-info-box {width:" +
              t.size.width +
              "px !important;}</style>"
          );
      },
      stop: function (e, t) {
        o(".fake-layer-x").remove(), R("advancedInfoBoxWidth", t.size.width);
      },
    }),
    o(".wyp-animate-manager").resizable({
      handles: "n",
      minHeight: 234,
      maxHeight: (70 * o(window).height()) / 100,
      start: function () {
        He(0), o(".fake-layer-x").css("cursor", "n-resize");
      },
      resize: function (e, t) {
        o("#animmanager-personalized-view").remove(),
          tn.append(
            "<style id='animmanager-personalized-view'>body.wyp-animate-manager-active #iframe{height:-webkit-calc(100% - " +
              parseInt(t.size.height) +
              "px) !important;height:calc(100% - " +
              parseInt(t.size.height) +
              "px) !important;}body.wyp-animate-manager-active.wyp-res-mod #iframe, body.wyp-animate-manager-active.wyp-res-mod .responsive-right-handle,body.wyp-animate-manager-active.wyp-res-mod .responsive-left-handle{height:-webkit-calc(100% - " +
              parseInt(t.size.height + 24) +
              "px) !important;height:calc(100% - " +
              parseInt(t.size.height + 24) +
              "px) !important;}.wyp-animate-manager{height:" +
              t.size.height +
              "px !important;}</style>"
          );
      },
      stop: function (e, t) {
        o(".fake-layer-x").remove(), R("animManagerHeight", t.size.height);
      },
    }),
    o("#layer-tree").resizable({
      handles: "e",
      minWidth: 230,
      maxWidth: 400,
      start: function () {
        o(".fake-layer-x").css("cursor", "e-resize"), He(0);
      },
      resize: function (e, t) {
        o("#navigation-personalized-view").remove(),
          tn.append(
            "<style id='navigation-personalized-view'>#layer-tree{width:" +
              parseFloat(t.size.width) +
              "px !important;}</style>"
          ),
          N();
      },
      stop: function (e, t) {
        o(".fake-layer-x").remove(), R("navigationWidth", t.size.width), We(0);
      },
    }),
    o("#leftAreaEditor").resizable({
      handles: "e, s",
      maxWidth: o(window).width(),
      minWidth: 370,
      delay: 150,
      start: function (e, t) {
        var a = o(this).data("ui-resizable").axis;
        "e" == a &&
          (o("#cssData").width(t.size.width - 41),
          o("#cssEditorBar").width(t.size.width)),
          He(0),
          "e" == a
            ? o(".fake-layer-x").css("cursor", "e-resize")
            : o(".fake-layer-x").css("cursor", "s-resize");
      },
      resize: function (e, t) {
        var a = o(this).data("ui-resizable").axis;
        "e" == a &&
          (t.size.width > parseInt(o(window).width() - 10) &&
            (t.size.width = o(window).width()),
          o("#cssData").width(t.size.width - 41),
          o("#cssEditorBar").width(t.size.width)),
          200 > t.size.height && (t.size.height = 200),
          "s" == a && o("#cssData").height(t.size.height - 76),
          o("#csseditor-personalized-view").remove(),
          window.ypData["wyp-css-ed-drgable"]
            ? Y(t.size.width, t.size.height - 36)
            : Y(t.size.width, null),
          n.resize(),
          j(),
          N();
      },
      stop: function (e, t) {
        var a = o(this).data("ui-resizable").axis;
        o(".fake-layer-x").remove(),
          o("#cssData").width(t.size.width - 41),
          o("#cssEditorBar").width(t.size.width),
          "s" == a && o("#cssData").height(t.size.height - 76),
          R("cssEditorWidth", t.size.width),
          window.ypData["wyp-css-ed-drgable"] &&
            R("cssEditorHeight", t.size.height);
      },
    }),
    o.contextMenu({
      events: {
        show: function () {
          var e = o(this);
          tn.addClass("wyp-contextmenu-breakpoint"),
            e.nextAll(".breakpoint-item").addClass("hover-breakpoint"),
            setTimeout(function () {
              !1 == e.hasClass("edited") &&
              !1 == e.hasClass("defined-with-yellowpencil")
                ? (o(".reset-breakpoint-menu").addClass("disabled"),
                  o(".review-breakpoint-menu").addClass("disabled"),
                  o(".show-css-menu").addClass("disabled"))
                : (o(".review-breakpoint-menu").removeClass("disabled"),
                  o(".reset-breakpoint-menu").removeClass("disabled"),
                  o(".show-css-menu").removeClass("disabled"));
            }, window.YellowDelay);
        },
        hide: function () {
          tn.removeClass("wyp-contextmenu-breakpoint"),
            o(".breakpoint-item").removeClass("hover-breakpoint");
        },
      },
      selector: ".breakpoint-bar .breakpoint-item",
      className: "dom_contextmenu breakpoint-contextmenu",
      trigger: "right",
      callback: function (e) {
        var t;
        if (
          ("active" === e && Ja(o(this)),
          "reset" == e &&
            ((t = o(this).attr("data-breakpoint-data")),
            k(
              {
                title: qi.delete_media_query.replace(
                  "{$1}",
                  "<strong class='bold-light'>" + t + "</strong>"
                ),
                text: qi.delete_media_query_msg,
                showCancelButton: !0,
                confirmButtonColor: "#F94141",
                confirmButtonText: qi.reset + "!",
              },
              function () {
                r(u(a(null, !1), "[msize=" + t + "]")), Mi(), we(), Ze();
              }
            )),
          "reviewBreakpoint" == e &&
            ((t = o(this).attr("data-breakpoint-data")),
            Rt(),
            o("#visual-rule-filter").val(t).trigger("keyup")),
          "showCSS" == e)
        ) {
          (window.disable_auto_insert = !0),
            !1 == window.ypData["wyp-css-ed-act"] &&
              o(".css-editor-btn").trigger("click");
          var i = Et(!0, null, !0).replace(/ |\t/g, "");
          window.disable_auto_insert = !1;
          var s = o(this).attr("data-media-content");
          -1 == i.indexOf(s) &&
            (s = o(this).attr("data-breakpoint-data").replace(/ |\t/g, ""));
          var l = i.split(s)[0].split(/\r\n|\r|\n/).length,
            d = i.replace(/\}\s+\}/g, "}}");
          if (K(d.split(s)[1])) {
            setTimeout(function () {
              n.scrollToLine(l, !0, !1);
            }, 4);
            var p = d
                .split(s)[1]
                .split(/\}\}/g)[0]
                .split(/\r\n|\r|\n/).length,
              c = ace.require("ace/range").Range;
            n.selection.setRange(new c(l - 1, 0, l + p + 1, 1));
          }
        }
      },
      items: {
        active: {
          name: qi.active_breakpoint,
          className: "active-breakpoint-menu",
        },
        reviewBreakpoint: {
          name: qi.review_breakpoint,
          className: "review-breakpoint-menu",
        },
        showCSS: { name: qi.show_in_editor, className: "show-css-menu" },
        reset: { name: qi.reset, className: "reset-breakpoint-menu" },
      },
    }),
    o.contextMenu({
      events: {
        hide: function () {
          tn.removeClass("wyp-crnt-el-menu"),
            o(".context-menu-root").removeClass("no-top-radius"),
            o(".wyp-limit-parent-view").removeClass("wyp-limit-parent-view"),
            o(".wyp-limit-children-view").removeClass(
              "wyp-limit-children-view"
            ),
            Ze(),
            (window.ypData.editor_context_menu_open = !1);
        },
        show: function () {
          (window.ypData.editor_context_menu_open = !0),
            o(
              ".wyp-contextmenu-hover,.wyp-contextmenu-focus,.wyp-contextmenu-active,.wyp-contextmenu-checked,.wyp-contextmenu-disabled,.wyp-contextmenu-enabled,.wyp-contextmenu-invalid,.wyp-contextmenu-link,.wyp-contextmenu-valid,.wyp-contextmenu-visited"
            ).hide();
          var e = _(),
            t = e.prop("tagName").toUpperCase();
          if (
            (o(".wyp-contextmenu-hover,.wyp-contextmenu-active").show(),
            "INPUT" == t)
          ) {
            var a = e.attr("type");
            o(
              ".wyp-contextmenu-disabled,.wyp-contextmenu-enabled,.wyp-contextmenu-focus"
            ).show(),
              (null == a ||
                "text" == a ||
                "password" == a ||
                "date" == a ||
                "datetime-local" == a ||
                "email" == a ||
                "month" == a ||
                "number" == a ||
                "range" == a ||
                "search" == a ||
                "tel" == a ||
                "time" == a ||
                "week" == a ||
                "url" == a) &&
                o(".wyp-contextmenu-invalid,.wyp-contextmenu-valid").show(),
              "checkbox" == a && o(".wyp-contextmenu-checked").show();
          }
          "A" == t &&
            o(".wyp-contextmenu-link,.wyp-contextmenu-visited").show(),
            S() && e.contextMenu("hide");
          var i = _a(),
            n = Gi.find(i).parent();
          0 < n.length && "html" != n.prop("tagName").toLowerCase()
            ? o(".wyp-contextmenu-parent").removeClass(
                "wyp-disable-contextmenu"
              )
            : o(".wyp-contextmenu-parent").addClass("wyp-disable-contextmenu");
          var s = e.children().not("br");
          0 < s.length
            ? o(".wyp-contextmenu-children").removeClass(
                "wyp-disable-contextmenu"
              )
            : o(".wyp-contextmenu-children").addClass(
                "wyp-disable-contextmenu"
              ),
            o(".wyp-active-contextmenu").removeClass("wyp-active-contextmenu"),
            tn.hasAttr("data-wyp-selector") &&
              o(
                ".wyp-contextmenu-" +
                  tn.attr("data-wyp-selector").replace(":", "")
              ).addClass("wyp-active-contextmenu"),
            /body\.non-logged-in/i.test(i) &&
              o(".wyp-contextmenu-non-logged-in").addClass(
                "wyp-active-contextmenu"
              ),
            /body\.logged-in/i.test(i) &&
              o(".wyp-contextmenu-logged-in").addClass(
                "wyp-active-contextmenu"
              ),
            0 < Gi.find(".wyp-selected-others").length
              ? o(".wyp-contextmenu-select-it").show()
              : o(".wyp-contextmenu-select-it").hide();
          var r = o(".context-menu-list.wyp-contextmenu-parent"),
            l = o(".context-menu-list.wyp-contextmenu-parent li");
          7 < l.length && r.addClass("wyp-limit-parent-view");
          var d = o(".context-menu-list.wyp-contextmenu-children"),
            p = o(".context-menu-list.wyp-contextmenu-children li");
          7 < p.length && d.addClass("wyp-limit-children-view"),
            setTimeout(function () {
              Le();
            }, 200);
        },
      },
      selector:
        "body.wyp-con-slcd .wyp-selected,body.wyp-con-slcd.wyp-selected",
      callback: function (e) {
        var t = _(),
          a = _a(),
          i,
          s,
          r;
        if ("logged-in" == e || "non-logged-in" == e) {
          if (o(".wyp-contextmenu-" + e).hasClass("wyp-active-contextmenu"))
            L(a.replace(new RegExp("body." + e, "g"), "")),
              Q(a.replace(new RegExp("body." + e, "g"), ""), t);
          else {
            var l = a;
            "logged-in" == e
              ? ((l = l.replace("body.non-logged-in", "")),
                tn.addClass("wyp-logged-in-mode"))
              : "non-logged-in" == e &&
                ((l = l.replace("body.logged-in", "")),
                tn.addClass("wyp-non-logged-in-mode")),
              L(Hi(l, e)),
              Q(Hi(l, e), t);
          }
          window.ypData.editor_context_menu_open && _().contextMenu("hide");
        }
        if (
          (("hover" == e ||
            "focus" == e ||
            "link" == e ||
            "visited" == e ||
            "active" == e ||
            "checked" == e ||
            "disabled" == e ||
            "enabled" == e ||
            "invalid" == e ||
            "valid" == e) &&
            ((a = a.replace(
              /:(?!hover|focus|active|link|visited|checked|disabled|enabled|invalid|valid)/g,
              "WYP_DOTTED_PREFIX"
            )),
            (a = o(".wyp-contextmenu-" + e).hasClass("wyp-active-contextmenu")
              ? a.split(":")[0]
              : -1 == a.indexOf(":")
              ? a + ":" + e
              : a.split(":")[0] + ":" + e),
            (a = a.replace(/WYP_DOTTED_PREFIX/g, ":")),
            L(a),
            Q(a, t, !0)),
          "reviewStyles" == e &&
            (Rt(), o("#visual-rule-filter").val("matched").trigger("keyup")),
          "resetSingleSelf" == e && (Ht(!1, "single"), t.contextMenu("hide")),
          "resetSingleChilds" == e && (Ht(!0, "single"), t.contextMenu("hide")),
          "resetTemplateSelf" == e &&
            (Ht(!1, "template"), t.contextMenu("hide")),
          "resetTemplateChilds" == e &&
            (Ht(!0, "template"), t.contextMenu("hide")),
          "resetGlobalSelf" == e && (Ht(!1, "global"), t.contextMenu("hide")),
          "resetGlobalChilds" == e && (Ht(!0, "global"), t.contextMenu("hide")),
          "show-more-parent-link" == e || "show-more-children-link" == e)
        )
          return !1;
        if (
          (-1 != e.indexOf("parent-") &&
            "show-more-parent-link" != e &&
            ((s = e.replace("parent-", "")),
            (i = t.parentsUntil("html").eq(s)),
            (window.ypData["wyp-will-selected"] = i),
            At(),
            (r = o.trim(Ma(window.ypData["wyp-will-selected"], "default"))),
            L(r),
            Q(r, i, !1),
            sn.extra
              .find(".wyp-el-viewer")
              .addClass("wyp-el-viewer-relax-opacity")
              .removeClass("wyp-el-viewer")
              .fadeOut(300),
            setTimeout(function () {
              sn.extra.find(".wyp-el-viewer-relax-opacity").remove();
            }, 400)),
          -1 != e.indexOf("children-") &&
            "show-more-children-link" != e &&
            ((s = e.replace("children-", "")),
            (i = t.children().eq(s)),
            (window.ypData["wyp-will-selected"] = i),
            At(),
            (r = o.trim(Ma(window.ypData["wyp-will-selected"], "default"))),
            L(r),
            Q(r, i, !1),
            sn.extra
              .find(".wyp-el-viewer")
              .addClass("wyp-el-viewer-relax-opacity")
              .removeClass("wyp-el-viewer")
              .fadeOut(300),
            setTimeout(function () {
              sn.extra.find(".wyp-el-viewer-relax-opacity").remove();
            }, 400)),
          "writeCSS" == e &&
            (window.ypData["wyp-css-ed-act"] &&
              o(".css-editor-btn").trigger("click"),
            o(".css-editor-btn").trigger("click"),
            t.contextMenu("hide")),
          "selectjustit" == e)
        ) {
          tn.addClass("wyp-select-just-it");
          var d = _a();
          if (1 < Gi.find(d).length) {
            a = Ma(null, "sharp");
            var p = Ce(a, !1);
            0 !== Gi.find(p).length && (L(p), Q(p, null, !0));
          }
          (window.lastParentQueryStatus = "sharp"),
            tn.removeClass("wyp-select-just-it");
        }
        "close" == e && (At(), o.throttle(Be(), 32)),
          "editselector" == e && fe();
      },
      build: function () {
        return (
          Te(),
          {
            items: {
              "pseudo-class": {
                name: qi.pseudo_class,
                className: "wyp-contextmenu-pseudo-classes",
                items: {
                  hover: { name: ":hover", className: "wyp-contextmenu-hover" },
                  focus: { name: ":focus", className: "wyp-contextmenu-focus" },
                  link: {
                    name: ":unvisited",
                    className: "wyp-contextmenu-link",
                  },
                  visited: {
                    name: ":visited",
                    className: "wyp-contextmenu-visited",
                  },
                  active: {
                    name: ":active",
                    className: "wyp-contextmenu-active",
                  },
                  checked: {
                    name: ":checked",
                    className: "wyp-contextmenu-checked",
                  },
                  disabled: {
                    name: ":disabled",
                    className: "wyp-contextmenu-disabled",
                  },
                  enabled: {
                    name: ":enabled",
                    className: "wyp-contextmenu-enabled",
                  },
                  invalid: {
                    name: ":invalid",
                    className: "wyp-contextmenu-invalid",
                  },
                  valid: { name: ":valid", className: "wyp-contextmenu-valid" },
                },
              },
              conditions: {
                name: qi.conditions,
                className: "wyp-contextmenu-conditions",
                items: {
                  "logged-in": {
                    name: "Logged-in",
                    className: "wyp-contextmenu-logged-in",
                  },
                  "non-logged-in": {
                    name: "Non-logged-in",
                    className: "wyp-contextmenu-non-logged-in",
                  },
                },
              },
              editselector: {
                name: qi.edit_selector,
                className: "wyp-contextmenu-selector-edit",
              },
              writeCSS: {
                name: qi.write_css,
                className: "wyp-contextmenu-type-css",
              },
              sep2: "---------",
              selectjustit: {
                name: qi.select_only_this,
                className: "wyp-contextmenu-select-it",
              },
              parent: {
                name: qi.parent_elements,
                className: "wyp-contextmenu-parent",
                items: window.parentItems,
              },
              children: {
                name: qi.children_elements,
                className: "wyp-contextmenu-children",
                items: window.childrenItems,
              },
              sep3: "---------",
              reviewStyles: {
                name: qi.review_styles,
                className: "wyp-contextmenu-review-styles",
              },
              reset: {
                name: qi.reset_styles,
                className: "wyp-contextmenu-reset-styles",
                items: {
                  resetSingle: {
                    name: qi.single,
                    className: "wyp-contextmenu-reset-single",
                    items: {
                      resetSingleSelf: {
                        name: qi.the_element,
                        className: "wyp-contextmenu-reset-single-self",
                      },
                      resetSingleChilds: {
                        name: qi.child_elements,
                        className: "wyp-contextmenu-reset-single-childs",
                      },
                    },
                  },
                  resetTemplate: {
                    name: qi.template,
                    className: "wyp-contextmenu-reset-template",
                    items: {
                      resetTemplateSelf: {
                        name: qi.the_element,
                        className: "wyp-contextmenu-reset-template-self",
                      },
                      resetTemplateChilds: {
                        name: qi.child_elements,
                        className: "wyp-contextmenu-reset-template-childs",
                      },
                    },
                  },
                  resetGlobal: {
                    name: qi.global_t,
                    className: "wyp-contextmenu-reset-global",
                    items: {
                      resetGlobalSelf: {
                        name: qi.the_element,
                        className: "wyp-contextmenu-reset-global-self",
                      },
                      resetGlobalChilds: {
                        name: qi.child_elements,
                        className: "wyp-contextmenu-reset-global-childs",
                      },
                    },
                  },
                },
              },
              close: { name: qi.leave, className: "wyp-contextmenu-close" },
            },
          }
        );
      },
    });
  var vn;
  o.throttle(Be(!0), 32),
    en.on(
      "mousemove mousedown",
      o.throttle(function (t) {
        if (!1 === window.ypData["wyp-met-dis"]) {
          var e = t.pageX,
            a = t.pageY,
            i = t.clientX,
            n = t.clientY,
            s = 0;
          tn.hasClass("wyp-if-movleav") ||
            ((i += o("#iframe").offset().left),
            (n += o("#iframe").offset().top),
            window.ypOption.fixed_left_bar
              ? (s = 44)
              : n <= window.leftBarSize.bottom &&
                !1 == tn.hasClass("wyp-cln-lo-manual") &&
                !1 == tn.hasClass("wyp-clean-look") &&
                (s = window.leftBarSize.right),
            o(".metric-top-border").attr(
              "style",
              "transform:translate3d(" +
                parseInt(i - 1) +
                "px, 0px, 0px) !important;display:block;"
            ),
            o(".metric-left-border").attr(
              "style",
              "transform:translate3d(0px, " +
                parseInt(n - 1) +
                "px, 0px) !important;"
            ),
            o(".metric-top-tooltip").attr(
              "style",
              "transform:translate3d(" +
                parseInt(s) +
                "px, " +
                parseInt(n) +
                "px, 0px) !important;display:block;"
            ),
            o(".metric-left-tooltip").attr(
              "style",
              "transform:translate3d(" +
                parseInt(i) +
                "px, 0px, 0px) !important;display:block;"
            ),
            o(".metric-top-tooltip").html("Y: <span>" + a + "</span>px"),
            o(".metric-left-tooltip").html("X: <span>" + e + "</span>px"));
        }
      }, 32)
    ),
    Gi.on(
      "mousemove",
      o.throttle(function (t) {
        if (!1 === window.ypData["wyp-met-dis"]) {
          var e = o(t.target),
            a = _();
          if (
            ((O() || D() || z()) && (e = a),
            e &&
              e.hasAttr("class") &&
              /(^|\s+)wyp-(.*?)/g.test(e.attr("class")) &&
              !1 == /(wyp-pa-r|wyp-selected-others)/g.test(e.attr("class")) &&
              (e = a),
            void 0 !== e)
          ) {
            var i = e.get(0);
            if (!J(i)) {
              var n = Ra(i),
                s = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
                l = n.width,
                d = n.height,
                p = n.top + s,
                c = n.left + r,
                u = n.bottom + s;
              0 > c && (c = 0),
                0 === sn.extra.find(".hv-in-bx").length &&
                  sn.extra.append("<div class='hv-in-bx'></div>"),
                sn.extra
                  .find(".hv-in-bx")
                  .css({
                    width: l,
                    height: d,
                    transform: "translate3d(" + c + "px, " + p + "px, 0px)",
                  });
              var m = sn.extra.find(".wyp-size-handle"),
                f =
                  "<b class='wyp-size-handle-b'>" +
                  i.tagName +
                  "</b> " +
                  parseInt(l) +
                  " X " +
                  parseInt(d);
              0 === m.length &&
                (sn.extra.append(
                  "<div class='wyp-size-handle'>" + f + "</div>"
                ),
                (m = sn.extra.find(".wyp-size-handle"))),
                m.html(f),
                (c += l / 2),
                m.css({
                  top: u,
                  bottom: "auto",
                  left: c,
                  position: "absolute",
                }),
                parseFloat(u + 40) > parseFloat(o("#iframe").height()) + s &&
                  m.css({
                    bottom: "10px",
                    top: "auto",
                    left: c,
                    position: "fixed",
                  });
            }
          }
        }
      }, 32)
    );
  var bn;
  o(window).resize(function () {
    clearTimeout(bn),
      (bn = setTimeout(function () {
        N(), o.throttle(Be(), 32), Ct(), A() && j(), Ze();
      }, 30));
  }),
    Gi.on("mouseout", ".wyp-iframe-ph", function () {
      (window.ypData["wyp-will-selected"] = void 0),
        sn.extra.find(".wyp-iframe-ph").remove(),
        C() || At();
    }),
    an.addEventListener(
      "mouseup",
      function (e) {
        var t = o(e.target);
        if (
          (clearTimeout(window.dragDelay),
          window.drag.active &&
            ((window.drag.initialX = window.drag.currentX),
            (window.drag.initialY = window.drag.currentY),
            (window.drag.active = !1),
            li(),
            ii(),
            Ji.find("#wyp-drag-style").remove(),
            tt(
              null,
              "transform",
              "translatex(" +
                window.drag.currentX +
                "px) translatey(" +
                window.drag.currentY +
                "px)",
              ""
            ),
            we(),
            Mi(),
            Qi.removeClass("wyp-dragging"),
            (window.ypData.is_dragging = !1),
            tn.removeClass("wyp-clean-look"),
            Ji.removeClass("wyp-hid-bor-n"),
            Ze(),
            o.throttle(Be(), 32)),
          t.hasClass("wyp-iframe-ph"))
        ) {
          var i = window.ypData["wyp-will-selected"],
            n;
          (n = Ma(i, "default")),
            tn.hasAttr("data-wyp-selector") &&
              (n += tn.attr("data-wyp-selector")),
            (window.placeholderSelector = !0),
            L(n),
            Q(n, i, !1),
            (window.placeholderSelector = !1);
        }
        if (
          ((window.ypData["wyp-will-selected"] = void 0),
          sn.extra.find(".wyp-iframe-ph").remove(),
          clearTimeout(window.resizeDelay),
          O())
        ) {
          li(),
            sn.extra.find(".wyp-helper-tooltip").remove(),
            (window.ypData["wyp-element-resized"] = !0);
          var s =
            "width" == window.visualResizingType
              ? window.exWidthX
              : window.exWidthY;
          var i = _(),
            l = parseFloat(i.css(window.visualResizingType)).toString(),
            d = "px",
            p = l;
          if ("width" == window.visualResizingType) {
            var c = pi(i, l);
            (l = c.val), (d = c.format);
          }
          (l = Math.round(l)),
            null !== window.exWidthX &&
              "left" == window.ResizeSelectedBorder &&
              p != s &&
              tt(null, "margin-left", parseFloat(i.css("marginLeft")), "px"),
            null !== window.exWidthY &&
              "top" == window.ResizeSelectedBorder &&
              p != s &&
              tt(null, "margin-top", parseFloat(i.css("marginTop")), "px"),
            K(window.styleAttrBeforeChange)
              ? i.attr("style", window.styleAttrBeforeChange)
              : i.removeAttr("style"),
            ht("min-height", l + "" + d),
            p != s &&
              ("height" == window.visualResizingType && p > window.orginalHeight
                ? (r(
                    u(
                      a(),
                      "[selector=" +
                        gi(_a()) +
                        "][rule=height][msize=" +
                        Fe() +
                        "]"
                    )
                  ),
                  setTimeout(function () {
                    tt(null, "min-height", l, d);
                  }, 5))
                : tt(null, window.visualResizingType, l, d)),
            Ji.removeClass("wyp-el-reing"),
            (window.ypData.is_resizing = !1),
            tn.removeClass("wyp-clean-look"),
            window.maxData[window.visualResizingType] < l &&
              tt(null, "max-" + window.visualResizingType, l, d),
            window.minData[window.visualResizingType] > l &&
              tt(null, "min-" + window.visualResizingType, l, d),
            Mi();
          var m = _a();
          o.each(
            [
              "width",
              "height",
              "max-width",
              "max-height",
              "min-width",
              "min-height",
              "margin-left",
              "margin-top",
            ],
            function (e, t) {
              pa(t, m);
            }
          ),
            (window.mouseisDown = !1),
            (window.liveResizeWPercent = !1),
            Ze(),
            setTimeout(function () {
              (window.ypData["wyp-element-resized"] = !1),
                (window.ypData["resize-time-delay"] = !1);
            }, 100);
        }
        if (window.visualEdit) {
          (window.visualEdit = !1),
            (window.ypData["wyp-visual-edited"] = !0),
            tn.removeClass("wyp-clean-look"),
            Ji.removeClass(
              "wyp-h-trfm wyp-vis-edng wyp-vis-edng-x wyp-vis-edng-y"
            ),
            (window.ypData.is_visual_editing = !1),
            Gi.find("#wyp-visual-edit-css").remove();
          var i = sn.active.find(
              ".wyp-selected-boxed-" +
                window.visualEditType +
                "-" +
                window.visualEditPosition +
                ""
            ),
            f = i.text();
          30 >= parseInt(f) && i.html(""),
            window.visualEditValueOr != f &&
              (tt(
                null,
                window.visualEditType + "-" + window.visualEditPosition,
                f
              ),
              Mi(),
              pa(window.visualEditType + "-" + window.visualEditPosition),
              o.throttle(Be(), 32)),
            setTimeout(function () {
              Gi.find(".wyp-visual-active").removeClass("wyp-visual-active"),
                (window.ypData["wyp-visual-edited"] = void 0),
                Ze();
            }, 100);
        }
        return "cursor" === window.ypData.inspector
          ? void 0
          : (e.stopPropagation(), e.preventDefault(), !1);
      },
      !0
    );
  Gi.on(
    "mouseover",
    o.throttle(function (e) {
      Me(e);
    }, 64)
  ),
    o(".media-control").click(function () {
      var e = o(this).attr("data-code");
      "max-width" == e &&
        (o(this).attr("data-code", "min-width"), o(this).text(qi.above_t)),
        "min-width" == e &&
          (o(this).attr("data-code", "max-width"), o(this).text(qi.below_t)),
        he(!0),
        o(this).tooltip("fixTitle").tooltip("show");
    }),
    o(".media-control").tooltip({
      title: function () {
        var e = o(this).attr("data-code");
        return (
          "max-width" == e
            ? (e = "min-width")
            : "min-width" == e && (e = "max-width"),
          qi.toggle_media_query_condition.replace(
            "{$1}",
            "<strong>" + e + "</strong>"
          )
        );
      },
      delay: { show: 50, hide: 0 },
      placement: "bottom",
      trigger: "hover",
      container: "body",
      html: !0,
    });
  var xn, _n;
  o(document).on(
    "mousemove",
    ".unvalid-css-cover, .wyp-css-close-btn,.editor-tabs:not(.active)",
    o.throttle(function () {
      tn.hasClass("css-code-unvalid") && tn.addClass("css-error-message");
    }, 64)
  ),
    o(document).on("click", ".unvalid-css-cover", function () {
      if (tn.hasClass("css-code-unvalid"))
        return (
          k({ title: qi.css_parse_error, text: qi.css_parse_error_text }), !1
        );
    }),
    o(".unvalid-css-error").click(function () {
      var e = o(this).attr("data-error-index");
      n.scrollToLine(e, !0, !1), n.gotoLine(e, 0, !0);
    }),
    n.getSession().on("change", function () {
      clearTimeout(_n),
        (_n = setTimeout(function () {
          Ye(n.getValue());
        }, 100));
    }),
    o("#cssData").on("keyup keydown", function (t) {
      if (window.saveFromEditor) return !1;
      n.getSession().removeMarker(window.typeHereMarker);
      var e = 0;
      if (
        (t.originalEvent && (e = 900),
        !1 === Ji.hasClass("wyp-selectors-hide") && 0 !== e)
      ) {
        if (
          (Ji.addClass("wyp-selectors-hide"),
          window.ypData.editor_context_menu_open && _().contextMenu("hide"),
          A())
        ) {
          var a = tn.find(".context-menu-active");
          0 < a.length && a.contextMenu("hide");
        }
        He(200);
      }
      var i = sn.extra.find(".wyp-el-viewer");
      0 < i.length && i.remove(),
        clearTimeout(_n),
        (_n = setTimeout(function () {
          Ye(n.getValue());
        }, 100)),
        clearTimeout(xn),
        (xn = setTimeout(function () {
          return (
            Ji.hasClass("wyp-selectors-hide") &&
              0 === o(".sl-d .ui-state-active").length &&
              !1 === tn.hasClass("autocomplete-active") &&
              0 === o(".ed-pnl .tooltip").length &&
              (Ji.removeClass("wyp-selectors-hide"), We(200)),
            "keydown" != t.type &&
              !1 == tn.hasClass("css-code-unvalid") &&
              (A() && he(!0),
              we(),
              window.ypData["vsl-css-vi-active"] && (Yt(), Zt())),
            !1
          );
        }, e)),
        "keydown" != t.type && (V(n.getValue()), $());
    }),
    o(document).on("mouseenter", "#iframe", function () {
      We(200);
    }),
    o(document).on(
      "mouseenter",
      "#ed-elt-tr,.wyp-t-cont,.anim-bar,#vsl-css-vi,.fake-layer,.fake-layer-x,.fake-layer-x-bg",
      function (t) {
        return (
          !o(t.target).is(".pr-res-ite") &&
          void (window.ypData.editor_context_menu_open &&
            _().contextMenu("hide"),
          He(200))
        );
      }
    ),
    o(document)
      .on(
        "mouseenter",
        "ul.wyp-contextmenu-parent,ul.wyp-contextmenu-children",
        function () {
          He(200);
        }
      )
      .on(
        "mouseleave",
        "ul.wyp-contextmenu-parent,ul.wyp-contextmenu-children",
        function () {
          We(200);
        }
      ),
    o(document).on("mouseenter", "#vsl-css-vi", function () {
      window.ypData["wyp-need-to-process"] && Zi();
    }),
    o(document).on("mouseleave", ".view-media-line", function () {
      He(200);
    }),
    o("#wyp-current-page").on("click", function () {
      o(this).toggleClass("active");
      var e = o("#wyp-customizing-type-frame");
      return e.css("display", "block"), Qe(!1), !1;
    }),
    window.bMode &&
      tn
        .find(".editor-tabs.template-tab,.editor-tabs.single-tab")
        .addClass("disabled"),
    !0 !== window.bMode &&
      o("#customizing-mode").on("click", function () {
        return tn.hasClass("wyp-bg-layer-active")
          ? (o("#fake-layer").trigger("click"), !1)
          : void (o("#c-t-list").show(),
            o(this).addClass("active"),
            o("#c-t-list").addClass("active"),
            tn.addClass(
              "customization-type-popup customization-type-popup-" +
                o(
                  "#c-t-list > ul > li:not(.type-disabled):not(#wyp-current-page)"
                ).length
            ),
            o("#c-t-list li").each(function () {
              var e = o(this).attr("data-value"),
                t = o(this),
                a = Et(!0, e, !1),
                i = Et(!0, e, !1).match(/:(.*?);/g);
              if (0 < a.length && null != i) {
                var n = "";
                1 < i.length && (n = "s"),
                  t.find(".type-byte span").text(i.length + " " + qi.style + n),
                  t.removeClass("empty-customization");
              } else t.find(".type-byte span").text(qi.empty), t.addClass("empty-customization");
            }),
            W({
              index: 2147483646,
              container: ".wyp-customizing-inner",
              callback: function () {
                tn.removeClass(
                  "wyp-bg-layer-active customization-type-popup customization-type-popup-1 customization-type-popup-2 customization-type-popup-3"
                ),
                  o("#c-t-list").hide(),
                  o("#customizing-mode, #c-t-list").removeClass("active");
              },
            }));
      }),
    o(".type-disabled").tooltip({
      title: qi.customize_type_not_available,
      placement: "left",
      container: ".ed-pnl",
      html: !0,
    }),
    o(".manage-this-type").tooltip({
      title: "Manage Styles",
      placement: "left",
      container: ".ed-pnl",
      html: !0,
    }),
    o(".reset-this-type").tooltip({
      title: "Reset Styles",
      placement: "left",
      container: ".ed-pnl",
      html: !0,
    }),
    o(document).on("click", "#c-t-list li", function () {
      var e = o(this).attr("data-value");
      if (o(this).hasClass("type-disabled")) return !1;
      window.ypData["wyp-need-to-process"] && Zi(),
        o("#fake-layer").trigger("click"),
        n.getSession().removeMarker(window.typeHereMarker);
      var t = o(this).find("h6 > span").text();
      Gi.find(".wyp-inline-data").removeAttr("id"),
        Gi.find('.wyp-inline-data[data-source-mode="' + e + '"]').attr(
          "id",
          "wyp-styles-area"
        ),
        o(".active-customizing-list").removeClass("active-customizing-list"),
        o(this).addClass("active-customizing-list"),
        o("#customizing-mode .type-heading").text(t),
        y(),
        window.sourceViewClick || _e(!0),
        Qe(!1),
        $(),
        we();
    }),
    o(".editor-tabs").on("click", function () {
      if (o(this).hasClass("disabled") || o(this).hasClass("active")) return !1;
      if (tn.hasClass("css-code-unvalid"))
        return (
          k({ title: qi.css_parse_error, text: qi.css_parse_error_text }), !1
        );
      var e = o(this).attr("data-type-value");
      o(".editor-tabs").removeClass("active"),
        o(this).addClass("active"),
        o("#customizing-mode").removeClass("done"),
        o(".wyp-type-menu-link").addClass("focus").addClass("done"),
        setTimeout(function () {
          o(".wyp-type-menu-link").removeClass("focus").removeClass("done");
        }, 600),
        o("#c-t-list li[data-value='" + e + "']").trigger("click");
    }),
    o(document).on("mouseenter", ".ace_line_group", function () {
      var e = o(this).text(),
        t;
      !0 == /\{/g.test(e) &&
        !1 == /\@(media|font-face|import)/g.test(e) &&
        ((t = e.split("{")[0]),
        (window.focusDelay = setTimeout(function () {
          if (((t = xi(t, !0, !0, !0, !0)), "*" == t.trim())) return !1;
          var e = Ca(t, !0, !1, !1);
          return !1 != e && void st(e);
        }, 200)));
    }),
    o(document).on("mouseleave", ".ace_line_group", function () {
      clearTimeout(window.focusDelay), sn.extra.find(".wyp-el-viewer").remove();
    }),
    o("#wyp-border-type .ra").on("click", function () {
      var e = o("#wyp-border-type .ra.active input").val();
      o(
        ".wyp-border-all-section,.wyp-border-top-section,.wyp-border-right-section,.wyp-border-bottom-section,.wyp-border-left-section"
      ).hide(),
        o(".wyp-border-" + e + "-section").show();
    }),
    o("#wyp-background-type .ra").on("click", function () {
      var e = o("#wyp-background-type .ra.active input").val();
      o(
        ".wyp-background-background-section,.wyp-background-filter-section"
      ).hide(),
        o(".wyp-background-" + e + "-section").show();
    }),
    o("#wyp-spacing-type .ra").on("click", function () {
      var e = o("#wyp-spacing-type .ra.active input").val();
      o(".wyp-spacing-margin-section,.wyp-spacing-padding-section").hide(),
        o(".wyp-spacing-" + e + "-section").show();
    }),
    o("#wyp-transform-type .ra").on("click", function () {
      var e = o("#wyp-transform-type .ra.active input").val();
      o(
        ".wyp-transform-move-section,.wyp-transform-rotate-section,.wyp-transform-skew-section,.wyp-transform-extra-section"
      ).hide(),
        o(".wyp-transform-" + e + "-section").show();
    }),
    o("#wyp-filter-type .ra").on("click", function () {
      var e = o("#wyp-filter-type .ra.active input").val();
      o(
        ".wyp-filter-color-adjustment-section,.wyp-filter-color-effects-section"
      ).hide(),
        o(".wyp-filter-" + e + "-section").show();
    }),
    o("#wyp-motion-type .ra").on("click", function () {
      var e = o("#wyp-motion-type .ra.active input").val();
      o(".wyp-motion-animation-section,.wyp-motion-transition-section").hide(),
        o(".wyp-motion-" + e + "-section").show();
    }),
    o(".ra-o .ra label").on("click", function () {
      var e, t, a, i, n;
      return (
        (e = o(this)),
        (t = e.parent()),
        (a = t.parent().parent().parent()),
        (n = a.attr("data-css")),
        !(0 === o(".position-option.active").length && t.hasClass("active")) &&
          void (a.find(".active").removeClass("active"),
          t.addClass("active"),
          e.prev("input").prop("checked", !0),
          (i = o("input[name=" + n + "]:checked").val()),
          "background-size" == n &&
            (o(this).is("#background-size-auto")
              ? ut()
              : o(".background-size-custom-group").hide()),
          "border-type" != n &&
            "background-type" != n &&
            "spacing-type" != n &&
            "transform-type" != n &&
            "filter-type" != n &&
            "motion-type" != n &&
            ((window.lastEditID = n), tt(null, n, i, ""), Mi()))
      );
    }),
    o(
      "#margin-left-group,#margin-right-group,#margin-top-group,#margin-bottom-group"
    ).on("mousemove", function (t) {
      if (!t.originalEvent) return !0;
      o(this).popover("destroy");
      var e = da(["display"]);
      if ("inline" == e.display || "table-cell" == e.display)
        o(this)
          .popover({
            title: qi.notice,
            content: qi.display_notice,
            trigger: "hover",
            placement: "left",
            container: ".ed-pnl",
            html: !0,
          })
          .popover("show");
      else if (0 > o("#" + o(this).attr("data-css") + "-value").val()) {
        if (
          !1 == o(this).hasClass("reset-enable") &&
          0 == o(this).find(".sl-d .ui-state-active").length
        )
          return !0;
        o(this)
          .popover({
            title: qi.notice,
            content: qi.negative_margin_notice,
            trigger: "hover",
            placement: "left",
            container: ".ed-pnl",
            html: !0,
          })
          .popover("show");
      }
    }),
    o("#list-style-type-group").on("mousemove", function (t) {
      return (
        !t.originalEvent ||
        void (o(this).popover("destroy"),
        12 < o("#wyp-list-style-image").val().length &&
          "none" != o("#wyp-list-style-image").val() &&
          o(this)
            .popover({
              title: qi.notice,
              content: qi.list_notice1,
              trigger: "hover",
              placement: "left",
              container: ".ed-pnl",
              html: !0,
            })
            .popover("show"))
      );
    }),
    o("#cursor-group").on("mousemove", function (t) {
      return (
        !t.originalEvent ||
        void (o(this).popover("destroy"),
        o("#cursor-group").hasClass("reset-enable") &&
          o(this)
            .popover({
              title: qi.notice,
              content: qi.cursor_warning,
              trigger: "hover",
              placement: "left",
              container: ".ed-pnl",
              html: !0,
            })
            .popover("show"))
      );
    }),
    o(
      "#list-style-position-group,#list-style-image-group,#list-style-type-group"
    ).on("mousemove", function (t) {
      if (!t.originalEvent) return !0;
      o(this).popover("destroy");
      var e = _().prop("tagName").toLowerCase();
      "li" != e &&
        "ul" != e &&
        o(this)
          .popover({
            title: qi.notice,
            content: qi.list_notice,
            trigger: "hover",
            placement: "left",
            container: ".ed-pnl",
            html: !0,
          })
          .popover("show");
    }),
    o(
      "#scale-transform-group,#rotatex-transform-group,#rotatey-transform-group,#rotatez-transform-group,#translate-x-transform-group,#translate-y-transform-group,#skew-x-transform-group,#skew-y-transform-group,#padding-left-group,#padding-right-group,#padding-top-group,#padding-bottom-group,#width-group,#height-group,#animation-name-group"
    ).on("mousemove", function (t) {
      return (
        !t.originalEvent ||
        void (o(this).popover("destroy"),
        "inline" == da("display") &&
          o(this)
            .popover({
              title: qi.notice,
              content: qi.display_notice,
              trigger: "hover",
              placement: "left",
              container: ".ed-pnl",
              html: !0,
            })
            .popover("show"))
      );
    }),
    o("#left-group,#right-group,#top-group,#bottom-group").on(
      "mousemove",
      function (t) {
        return (
          !t.originalEvent ||
          !!A() ||
          (!1 == o(this).hasClass("reset-enable") &&
            0 == o(this).find(".sl-d .ui-state-active").length) ||
          void (o(this).popover("destroy"),
          50 <= o("#" + o(this).attr("id").replace("group", "value")).val() &&
            o(this)
              .popover({
                title: qi.notice,
                content: qi.high_position_notice,
                trigger: "hover",
                placement: "left",
                container: ".ed-pnl",
                html: !0,
              })
              .popover("show"))
        );
      }
    ),
    o("#position-group").on("mousemove click", function (t) {
      return (
        !t.originalEvent ||
        (o(this).popover("destroy"),
        !!A() ||
          (!1 == o(this).hasClass("reset-enable") &&
            0 == o(this).find(".sl-d .ui-state-active").length) ||
          void (0 < o(".ra.active #position-fixed").length
            ? o(this)
                .popover({
                  title: qi.notice,
                  content: qi.fixed_notice,
                  trigger: "hover",
                  placement: "left",
                  container: ".ed-pnl",
                  html: !0,
                })
                .popover("show")
            : 0 < o(".ra.active #position-absolute").length &&
              o(this)
                .popover({
                  title: qi.notice,
                  content: qi.absolute_notice,
                  trigger: "hover",
                  placement: "left",
                  container: ".ed-pnl",
                  html: !0,
                })
                .popover("show")))
      );
    }),
    o(
      "#background-size-group,#background-repeat-group,#background-blend-mode-group,#background-attachment-group,#background-position-x-group,#background-position-y-group"
    ).on("mousemove", function (t) {
      return (
        !t.originalEvent ||
        void (o(this).popover("destroy"),
        "" == o("#wyp-background-image").val() &&
          o(this)
            .popover({
              title: qi.notice,
              content: qi.bg_img_notice_two,
              trigger: "hover",
              placement: "left",
              container: ".ed-pnl",
              html: !0,
            })
            .popover("show"))
      );
    }),
    o("#background-clip-group").on("mousemove", function (t) {
      return (
        !t.originalEvent ||
        void (o(this).popover("destroy"),
        "" == o("#wyp-background-image").val() &&
          o(this)
            .popover({
              title: qi.notice,
              content: qi.bg_img_notice_tree,
              trigger: "hover",
              placement: "left",
              container: ".ed-pnl",
              html: !0,
            })
            .popover("show"))
      );
    }),
    o("#height-group").on("mousemove", function (t) {
      if (!t.originalEvent) return !0;
      o(this).popover("destroy");
      var e = _().prop("tagName");
      ("P" == e ||
        "H1" == e ||
        "H2" == e ||
        "H3" == e ||
        "H4" == e ||
        "H5" == e ||
        "H6" == e) &&
        o(this)
          .popover({
            title: qi.notice,
            content: qi.height_notice,
            trigger: "hover",
            placement: "left",
            container: ".ed-pnl",
            html: !0,
          })
          .popover("show");
    }),
    o(document).on("click", ".reset-enable .di-btn", function () {
      o(this).parents(".op-g").popover("destroy");
    }),
    o(".ed-pnl-list").on(
      "scroll",
      o.throttle(function () {
        o(".op-g,.wyp-advanced-option").popover("hide");
      }, 64)
    ),
    o(".in-ac").keydown(function (t) {
      var e = t.keyCode || t.which;
      (38 == e || 40 == e) &&
        (o(this)
          .parent()
          .find(".ac-d .ui-state-focus")
          .prev()
          .trigger("mouseout"),
        o(this).parent().find(".ac-d .ui-state-focus").trigger("mouseover")),
        13 == e && o(this).blur();
    }),
    o(document).on("click", ".ac-d ul li", function () {
      o(this)
        .parent()
        .parent()
        .parent()
        .find(".ui-autocomplete-input")
        .trigger("keyup")
        .trigger("blur");
    });
  var kn;
  o(".in-ac").on("keyup", function () {
    var e = o(this).attr("id");
    "wyp-font-family" == e &&
      (clearTimeout(kn),
      (kn = setTimeout(function () {
        var e = mt(o("#wyp-font-family").val());
        e
          ? (o("#include-webfont-label").css("display", "none"),
            tt(null, "--google-webfont", "disable"))
          : o("#include-webfont-label").css("display", "inline-block");
      }, window.Yellow2Delay)));
  }),
    o(".in-ac").on("blur keyup", function (t) {
      var e = o(this),
        a = e.parent().parent().parent().attr("data-css"),
        i = e.val();
      e.removeClass("active"), e.parent().removeClass("active"), _t(a);
      var n = !1;
      return (
        "font-family" == a
          ? P(window.openVal) == P(i) && (n = !0)
          : window.openVal == i && (n = !0),
        "" == i && (n = !0),
        "blur" == t.type && (window.openVal = void 0),
        !n &&
          void ("font-weight" == a &&
            o("#wyp-font-weight")
              .css(a, i)
              .css("fontFamily", o("#wyp-font-family").val()),
          "font-family" == a &&
            (o("#wyp-font-family").css(a, i),
            o("#wyp-font-weight").css(
              "fontFamily",
              o("#wyp-font-family").val()
            )),
          "text-shadow" == a && o("#wyp-text-shadow").css(a, i),
          "font-family" == a &&
            -1 == i.indexOf(",") &&
            -1 == i.indexOf("'") &&
            -1 == i.indexOf('"') &&
            (i = "'" + i + "'"),
          (window.lastEditID = a),
          tt(null, a, i, ""),
          Mi())
      );
    }),
    o(document).on("mouseout", ".ac-d", function () {
      var e = o(this).parents(".op-g").attr("data-css");
      _t(e);
    }),
    o(document).on("mouseleave", function () {
      return (
        !Qi.hasClass("wyp-mouseleave") &&
        void (Qi.addClass("wyp-mouseleave"),
        Ji.removeClass("wyp-control-key-down"),
        (window.ypData["wyp-control-key-down"] = !1),
        Gi.find(".wyp-multiple-selected").removeClass("wyp-multiple-selected"),
        sn.other.find(".wyp-selected-others-multiple-box").remove(),
        tn.removeClass("fake-layer-x-bg"),
        o(".fake-layer-x").remove(),
        o(".ui-resizable-handle").removeClass("active"))
      );
    }),
    o(document).on("mouseup", function () {
      0 != o(".ui-resizable-resizing").length &&
        o(".ui-resizable-handle").removeClass("active");
    }),
    o(document).on("mouseenter", function () {
      Qi.removeClass("wyp-mouseleave"),
        Ji.removeClass("wyp-control-key-down"),
        (window.ypData["wyp-control-key-down"] = !1),
        Gi.find(".wyp-multiple-selected").removeClass("wyp-multiple-selected"),
        sn.other.find(".wyp-selected-others-multiple-box").remove();
    }),
    Gi.on("mouseleave", function () {
      return (
        !window.ypData["wyp-if-movleav"] &&
        void (Qi.addClass("wyp-if-movleav"),
        (window.ypData["wyp-if-movleav"] = !0),
        Ji.removeClass("wyp-control-key-down"),
        (window.ypData["wyp-control-key-down"] = !1),
        Gi.find(".wyp-multiple-selected").removeClass("wyp-multiple-selected"),
        sn.other.find(".wyp-selected-others-multiple-box").remove())
      );
    }),
    Gi.on("mouseenter", function (e) {
      e.originalEvent &&
        (Qi.removeClass("wyp-if-movleav"),
        (window.ypData["wyp-if-movleav"] = !1),
        !1 == C() && Ji.removeClass("wyp-full-width-selected"));
    }),
    o(document).on("click", ".animation-option:not(.active) > h3", function () {
      o(".anim-player-icon.icon-controls-pause").trigger("click");
    }),
    o(".anim-player-icon").on("click", function () {
      return (Gi.find(".yp_onscreen,.yp_hover,.yp_click,.yp_focus").removeClass(
        "yp_onscreen yp_hover yp_click yp_focus"
      ),
      Ni(),
      Yi(),
      (window.ypData["wyp-force-hide-select-ui"] = void 0),
      Ji.removeClass("wyp-h-trfm wyp-hid-bor-n"),
      o(this).hasClass("icon-controls-pause"))
        ? (o(".anim-player-icon")
            .removeClass("icon-controls-pause")
            .addClass("icon-controls-play"),
          !1)
        : (clearTimeout(window.timer5),
          "none" != o("#wyp-animation-name").val() &&
            void (window.timer5 = setTimeout(function () {
              Gi.find(_a()).addClass("yp_onscreen yp_hover yp_click yp_focus"),
                o(".anim-player-icon")
                  .removeClass("icon-controls-play")
                  .addClass("icon-controls-pause");
              var e = _();
              (window.ypData["wyp-force-hide-select-ui"] = !0),
                Ji.addClass("wyp-hid-bor-n");
              var t = e.css("animationDuration"),
                a = e.css("animationDelay"),
                i = ft(t, a);
              (a = !1 === i ? (J(a) ? 0 : Wt(a)) : i),
                (t = J(t) ? 1e3 : Wt(t)),
                (t = parseFloat(t) + parseFloat(a)),
                0 === t && (t = 1e3),
                (t += 100),
                Yi(),
                (window.animationTimer5 = setTimeout(function () {
                  (window.ypData["wyp-force-hide-select-ui"] = void 0),
                    Ji.removeClass("wyp-hid-bor-n"),
                    Ni(),
                    o(".anim-player-icon")
                      .removeClass("icon-controls-pause")
                      .addClass("icon-controls-play"),
                    Ze(),
                    !1 == window.ypData["wyp-if-movleav"] &&
                      setTimeout(function () {
                        We(200);
                      }, 300);
                }, t));
            }, 5)));
    }),
    o(".wf-close-btn-link").on("click", function (t) {
      0 < o(".ed-pnl-list > li.active").length
        ? (t.preventDefault(),
          o(".ed-pnl-list > li.active > h3").trigger("click"))
        : window.bMode &&
          o(this).attr(
            "href",
            document.getElementById("iframe").contentWindow.location.href
          );
    }),
    (window.cachedSelector = null),
    (window.cachedSelectorStrong = null),
    o(document).on("click", ".iris-picker .format-change-button", function () {
      var e = o(this).parents(".information");
      e.hasClass("rgb")
        ? e.removeClass("rgb").addClass("hex")
        : e.addClass("rgb").removeClass("hex");
    }),
    o(document).on(
      "click",
      ".iris-picker .format-change-palette-button",
      function () {
        var e = o(this).parents(".iris-color-control");
        if (e.hasClass("flat")) e.removeClass("flat").addClass("meterial");
        else if (e.hasClass("meterial"))
          e.removeClass("meterial").addClass("soft");
        else if (e.hasClass("soft")) {
          e.removeClass("soft").addClass("page"),
            J(window.colorJsonList) && M("typography");
          for (var t = "", a = 0, n; a < window.colorJsonList.length; a++)
            (n = window.colorJsonList[a]),
              (t +=
                "<div class='iris-color page' data-color='" +
                n +
                "' style='background:" +
                n +
                "'></div>");
          e.find(".iris-color-list .iris-color.page").remove(),
            e.find(".iris-color-list").append(t);
        } else e.hasClass("page") && e.removeClass("page").addClass("flat");
      }
    );
  var Cn;
  en.on(
    "mousemove",
    o.throttle(function () {
      !0 === window.isIrisOpen &&
        (clearTimeout(Cn),
        (Cn = setTimeout(function () {
          var e, t, a;
          0 < o(".iris-dragging").length &&
            ((e = o(".iris-dragging").parents(".op-g")),
            (t = e.data("css")),
            (a = e.find(".co-p").val()),
            "background-image" != t && (_t(t, !1), ht(t, a, !1))),
            0 < o(".iris-slider").find(".ui-state-active").length &&
              ((e = o(".iris-slider")
                .find(".ui-state-active")
                .parents(".op-g")),
              (t = e.data("css")),
              (a = e.find(".co-p").val()),
              "background-image" != t && (_t(t, !1), ht(t, a, !1))),
            0 < o(".cs-alpha-slider").find(".ui-state-active").length &&
              ((e = o(".cs-alpha-slider")
                .find(".ui-state-active")
                .parents(".op-g")),
              (t = e.data("css")),
              (a = e.find(".co-p").val()),
              "background-image" != t && (_t(t, !1), ht(t, a, !1)));
        }, window.YellowDelay)));
    }, 48)
  ),
    en.on("mouseup", function (e) {
      if (!0 === window.isIrisOpen) {
        var t;
        0 < o(document).find(".iris-dragging").length
          ? ((t = o(".iris-dragging").parents(".op-g")),
            t.find(".co-p").trigger("change"),
            "background-image-group" == t.attr("id") && Dt("insert"))
          : 0 < o(document).find(".iris-slider .ui-state-active").length
          ? ((t = o(".ui-state-active").parents(".op-g")),
            t.find(".co-p").trigger("change"),
            "background-image-group" == t.attr("id") && Dt("insert"))
          : 0 < o(document).find(".cs-alpha-slider .ui-state-active").length
          ? ((t = o(".cs-alpha-slider .ui-state-active").parents(".op-g")),
            "background-image-group" == t.attr("id") && Dt("insert"))
          : o(e.target).hasClass("iris-square-handle") &&
            ((t = o(e.target).parents(".op-g")),
            t.find(".co-p").trigger("change"),
            "background-image-group" == t.attr("id") && Dt("insert"));
      }
    }),
    o(".co-p")
      .on("blur", function () {
        if ("" == o(this).val()) return !1;
      })
      .on("click", function () {
        o(this).parent().parent().find(".iris-picker").show();
      })
      .on("keydown keyup", function () {
        o(this)
          .parent()
          .find(".co-sw-co")
          .css("backgroundColor", o(this).val());
      })
      .on("change", function () {
        var e, t, a, i;
        (e = o(this)),
          (t = e.parent().parent().parent()),
          (a = t.attr("data-css")),
          (i = e.val()),
          (i = i.replace(/##/g, "#")),
          e.val(i),
          /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g.test(i) && -1 == i.indexOf("#")
            ? (i = "#" + i)
            : !1 == /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g.test(i) &&
              -1 == i.indexOf("rgb(") &&
              -1 == i.indexOf("rgba(") &&
              "inherit" != i &&
              "initial" != i &&
              ("red" == i
                ? (i = "#FF0000")
                : "white" == i
                ? (i = "#FFFFFF")
                : "blue" == i
                ? (i = "#0000FF")
                : "orange" == i
                ? (i = "#FFA500")
                : "green" == i
                ? (i = "#008000")
                : "purple" == i
                ? (i = "#800080")
                : "pink" == i
                ? (i = "#FFC0CB")
                : "black" == i
                ? (i = "#000000")
                : "brown" == i
                ? (i = "#A52A2A")
                : "yellow" == i
                ? (i = "#FFFF00")
                : "gray" == i
                ? (i = "#808080")
                : (i = "transparent")),
          3 > i.length && (i = "transparent"),
          _t(a, !1),
          (window.lastEditID = a),
          tt(null, a, i, ""),
          o(this).parent().find(".co-sw-co").css("backgroundColor", i),
          Mi();
      }),
    o(".in-o .wyp-input").on("change", function () {
      var e, t, a;
      (e = o(this)),
        (t = e.parent().parent().parent()),
        (a = t.attr("data-css")),
        "background-image" == a &&
          (0 < o(".wyp-unsplash-list .active").length &&
            o(".wyp-unsplash-list .active").removeClass("active"),
          0 < o(".wyp-gradient-list .active").length &&
            o(".wyp-gradient-list .active").removeClass("active"),
          0 < o(".wyp-background-asts .active").length &&
            o(".wyp-background-asts .active").removeClass("active"));
    }),
    o(".in-o .wyp-input").on("keyup", function () {
      var e, t, a, i;
      (e = o(this)),
        (t = e.parent().parent().parent()),
        (i = t.attr("data-css")),
        (a = e.val()),
        "" == a && (a = "none"),
        "background-image" == i && ut(),
        "background-image" == i &&
          -1 == a.indexOf("gradient(") &&
          "none" != a &&
          "" != a &&
          "disable" != a &&
          "inherit" != a &&
          "initial" != a &&
          (-1 == a.indexOf("url(") && (a = 'url("' + a + '")'),
          0 == o(".wyp-unsplash-btn.active").length &&
            0 == o(".wyp-gradient-btn.active").length &&
            ne(a)),
        "list-style-image" == i &&
          "none" != a &&
          "" != a &&
          "disable" != a &&
          "inherit" != a &&
          "initial" != a &&
          -1 == a.indexOf("url(") &&
          (a = 'url("' + a + '")'),
        (window.lastEditID = i),
        tt(null, i, a, ""),
        Mi();
    }),
    o(document).on("mouseover", ".op-g.reset-enable .di-btn", function () {
      o(this).tooltip("disable");
    }),
    o(document).on(
      "mouseover",
      ".op-g:not(.reset-enable) .di-btn",
      function () {
        o(this).tooltip("enable");
      }
    ),
    o(document).on("mousedown", ".wyp-gradient-pointer-area", function (t) {
      if (3 == t.which) return !1;
      if (
        o(t.target).hasClass("wyp-gradient-pointer") ||
        o(t.target).hasClass("wyp-gradient-pointer-color")
      )
        return !1;
      var e = o(".wyp-gradient-pointer-area"),
        a = e.width(),
        i = e.offset(),
        n = i.left,
        s = t.pageX - n;
      (s = parseInt(100 * (s / a))),
        o(".wyp-gradient-pointer").removeClass("active");
      var r = "#FF5253";
      7 == o("#iris-gradient-color").val().length &&
        (r = o("#iris-gradient-color").val());
      var l =
        '<div class="wyp-gradient-pointer active" data-color="' +
        r +
        '" data-position="' +
        s +
        '" style="left:' +
        s +
        '%;"><i class="wyp-gradient-pointer-color" style="background-color:' +
        r +
        ';"></i></div>';
      e.append(l), Ct(), Dt("insert");
    }),
    o(".wyp-gradient-orientation i").draggable({
      containment: "parent",
      start: function () {},
      drag: function (t, e) {
        var a = o(".wyp-gradient-orientation"),
          i = a.offset(),
          n = i.left + a.width() / 2,
          s = i.top + a.height() / 2,
          r = e.offset.left,
          l = e.offset.top,
          d = Math.atan2(r - n, l - s),
          p = -1 * (d * (180 / Math.PI));
        o(this).parent().attr("data-degree", parseInt(p)), Dt("live");
      },
      stop: function () {
        Dt("insert");
      },
    }),
    (window.blockIris = !1),
    (window.iris_global_change_callback = function (e, t) {
      var a = t.color.toString(),
        i = o(e.target).next(".iris-picker"),
        n = i.find(".information input").is(":focus");
      if (0 < i.length) {
        i.find(".iris-color-preview").removeClass("active");
        var s = a;
        -1 != a.indexOf("#") && (s = Ri(a)),
          (s = s.replace(/(rgba|rgb|\(|\)|\s)/g, "").split(",")),
          null == s[3] && (s[3] = 1),
          !1 == n &&
            (i.find(".information-item.rgb .rgb-r input").val(s[0]),
            i.find(".information-item.rgb .rgb-g input").val(s[1]),
            i.find(".information-item.rgb .rgb-b input").val(s[2]),
            i.find(".information-item.rgb .rgb-a input").val(s[3]));
        var r = 100 * s[3],
          l = i.find(".cs-alpha-slider").slider("value");
        r != l && i.find(".cs-alpha-slider").slider("value", r);
        var d = a;
        /(RGB\(|rgb\()/g.test(a) && (d = Pi(a)),
          0 == r &&
            (i.find(".iris-color-preview").addClass("active"),
            (d = "transparent")),
          !1 == n &&
            (i.find(".information-item.hex .hex input").val(d),
            !1 == window.BlockIrisTypeChange &&
              (-1 != a.indexOf("rgba") && 0 != r
                ? i.find(".information.hex").removeClass("hex").addClass("rgb")
                : i
                    .find(".information.rgb")
                    .removeClass("rgb")
                    .addClass("hex")));
      }
      0 < o(".wyp-gradient-section .iris-picker:visible").length &&
        (o(".wyp-gradient-pointer.active i").css("background-color", a),
        o(".wyp-gradient-pointer.active").attr("data-color", a),
        Dt("live"));
    }),
    o("#iris-gradient-color").on("change", function () {
      var e = o(this).val();
      o(".wyp-gradient-pointer.active i").css("background-color", e),
        o(".wyp-gradient-pointer.active").attr("data-color", e),
        Dt("insert");
    }),
    o(document).on("mousedown", ".iris-square", function () {
      var e = o(this).parent().find(".input-field.rgb-a input"),
        t = e.val();
      if ("0" == t) {
        var a = o(this).parents(".op-g").find(".co-p");
        0 == a.length && (a = o("#iris-gradient-color"));
        var i = a.val();
        -1 != i.indexOf("rgba(") &&
          ((i = i.replace(/(\s|rgba|\(|\))/g, "").split(",")),
          (i = "rgb(" + i[0] + "," + i[1] + "," + i[2] + ")"),
          a.iris("color", i));
      }
    }),
    o(document).on("click contextmenu", ".wyp-gradient-pointer", function () {
      o(".wyp-gradient-pointer").removeClass("active"),
        o(this).addClass("active");
    }),
    o(document).on(
      "contextmenu dblclick",
      ".wyp-gradient-pointer",
      function () {
        if (!0 == window.blockIris) return !1;
        var e = o(this).attr("data-color");
        (window.gradientlastColor = e),
          o(".wyp-gradient-pointer").removeClass("active focus"),
          o(this).addClass("active focus");
        var t =
          -1 === e.indexOf("rgba")
            ? 100
            : parseFloat(100 * e.replace(/^.*,(.+)\)/, "$1"));
        "transparent" == e && (t = 0),
          o(".wyp-gradient-section")
            .find(".cs-alpha-slider")
            .slider("value", t),
          o(".wyp-gradient-section .iris-picker").show();
        var a = o(".wyp-gradient-section .iris-picker").find(
          ".information.hex input"
        );
        return (
          o("#iris-gradient-color").iris("color", e),
          0 < a.length &&
            (a.trigger("focus"), a[0].setSelectionRange(0, a.val().length)),
          (window.isIrisOpen = !0),
          W({
            index: 2147483646,
            container: ".ed-pnl",
            callback: function () {
              (window.isIrisOpen = !1),
                o(".wyp-gradient-pointer").removeClass("focus"),
                o(".wyp-gradient-section .iris-picker").hide();
            },
          }),
          !1
        );
      }
    ),
    o(document).on("click", ".view-rule-value", function () {
      var e = o(this),
        t = e.next(".value-input");
      e.hide(),
        t.val(e.text()),
        t.css("display", "inline").focus(),
        t[0].setSelectionRange(0, t.val().length),
        e.parent().find(".rule-end").css("margin-left", "-12px"),
        e.next(".value-input").autoGrowInput(),
        e.parents(".css-rule-view").hasClass("view-rule-disabled") &&
          (t.addClass("rule-was-disable"),
          e.parents(".css-rule-view").removeClass("view-rule-disabled"));
    }),
    o(document).on("change", ".css-rule-label input", function () {
      var e = o(this).parents(".css-rule-view"),
        t = e.find(".value-input");
      if (!1 == o(this).is(":checked"))
        e.addClass("view-rule-disabled"), t.val("disable");
      else {
        var a = t.prev(".view-rule-value").text();
        t.val(a);
      }
      t.trigger("blur"),
        !0 == o(this).is(":checked") && e.removeClass("view-rule-disabled");
    }),
    o(".manage-this-type").on("click", function () {
      var e = o(this).parent().attr("data-value");
      return (
        Rt(),
        o("#visual-rule-filter")
          .val(e + ".css")
          .trigger("keyup"),
        o("#fake-layer").trigger("click"),
        !1
      );
    }),
    o(".reset-this-type").on("click", function () {
      var e = o(this).parent().attr("data-value");
      return (
        k(
          {
            title: qi.reset_type_msg.replace("{$1}", e),
            confirmButtonText: qi.reset_btn,
            showCancelButton: !0,
            confirmButtonColor: "#F94141",
          },
          function () {
            window.ypData["wyp-need-to-process"] && Zi(),
              o("#fake-layer").trigger("click"),
              r("", e),
              Mi();
          }
        ),
        !1
      );
    }),
    o(document).on(
      "click",
      ".css-selector-open .selector-view span",
      function () {
        var e = o(this).parents(".selector-group").attr("data-view-selector"),
          t = !1;
        C() && e == _a() && (t = !0);
        var a = xi(e, !0, !0, !0, !0);
        t ||
          !1 == Ca(a, !0, !1, !1) ||
          ((e = e.replace(
            /(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g,
            ""
          )),
          (e = e.replace(
            /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
            function (e) {
              var t = e
                  .match(
                    /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
                  )[0]
                  .replace(/(body)?\.yp-selector-/g, ""),
                a = e.replace(
                  /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                  ""
                );
              return (
                " " != a[0] && (a = "body" + a),
                (a = a.trim().replace(/\{/g, "") + ":" + t),
                a
              );
            }
          )),
          (window.selectedByView = !0),
          L(e),
          Q(e, null, !0),
          (window.selectedByView = !1),
          o(".selector-group").removeClass("active"),
          o(this).parents(".selector-group").addClass("active"),
          sn.extra.find(".wyp-el-viewer").remove()),
          ce();
      }
    ),
    o(document).on("click", ".selector-heading", function (t) {
      if (o(t.target).hasClass("selector-heading")) {
        var e = o(this),
          a = e.parent(),
          i = a.nextAll(
            ".view-children-group[data-clean-selector='" +
              a.attr("data-clean-selector") +
              "']"
          );
        a.toggleClass("focus"),
          i.toggleClass("focus"),
          o(".selector-group.focus").not(a).not(i).removeClass("focus");
      }
    }),
    o(document).on("click", ".selector-heading span", function () {
      "cursor" === window.ypData.inspector &&
        (o(".inspector-sublist-default").trigger("click"),
        (window.ypData.inspector = "default"),
        o(".inspector-sublist").css("display", "none"));
      var e = o(this).parents(".selector-group"),
        t = e.attr("data-view-selector"),
        a = !1;
      e.hasClass("active") && (a = !0);
      var i = xi(t, !0, !0, !0, !0);
      a ||
        !1 == Ca(i, !0, !1, !1) ||
        ((t = t.replace(
          /(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g,
          ""
        )),
        (t = t.replace(
          /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
          function (e) {
            var t = e
                .match(
                  /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
                )[0]
                .replace(/(body)?\.yp-selector-/g, ""),
              a = e.replace(
                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                ""
              );
            return (
              " " != a[0] && (a = "body" + a),
              (a = a.trim().replace(/\{/g, "") + ":" + t),
              a
            );
          }
        )),
        (window.selectedByView = !0),
        L(t),
        Q(t, null, !0),
        (window.selectedByView = !1),
        o(".selector-group").removeClass("active"),
        o(this).parents(".selector-group").addClass("active"),
        sn.extra.find(".wyp-el-viewer").remove()),
        ce();
    }),
    o(document).on("mouseover", ".selector-heading span", function () {
      var e = o(this);
      window.focusDelay = setTimeout(function () {
        var t = e.parents(".selector-group").attr("data-view-selector");
        if (((t = xi(t, !0, !0, !0, !0)), "*" == t.trim())) return !1;
        var a = Ca(t, !0, !1, !1);
        return !1 != a && void st(a);
      }, 200);
    }),
    o(document).on("click", ".wyp-anim-el-column > i", function () {
      "cursor" === window.ypData.inspector &&
        (o(".inspector-sublist-default").trigger("click"),
        (window.ypData.inspector = "default"),
        o(".inspector-sublist").css("display", "none"));
      var e = o(this).attr("data-title"),
        t = !1;
      C() && e == _a() && (t = !0);
      var a = xi(e, !0, !0, !0, !0);
      t ||
        !1 == Ca(a, !0, !1, !1) ||
        ((e = e.replace(
          /(\.|\:)(yp(-|_)onscreen|yp(-|_)focus|yp(-|_)hover|yp(-|_)click)/g,
          ""
        )),
        (e = e.replace(
          /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)(.*?)$/g,
          function (e) {
            var t = e
                .match(
                  /\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g
                )[0]
                .replace(/(body)?\.yp-selector-/g, ""),
              a = e.replace(
                /(body)?\.yp-selector-(hover|focus|link|visited|active|checked|disabled|enabled|invalid|valid)/g,
                ""
              );
            return (
              " " != a[0] && (a = "body" + a),
              (a = a.trim().replace(/\{/g, "") + ":" + t),
              a
            );
          }
        )),
        (window.selectedByView = !0),
        L(e),
        Q(e, null, !0),
        (window.selectedByView = !1),
        o(".selector-group").removeClass("active"),
        o(this).parents(".selector-group").addClass("active"),
        sn.extra.find(".wyp-el-viewer").remove()),
        ce();
    }),
    o(document).on("mouseover", ".wyp-anim-el-column > i", function () {
      var e = o(this);
      window.focusDelay = setTimeout(function () {
        var t = e.attr("data-title");
        if (((t = xi(t, !0, !0, !0, !0)), "*" == t.trim())) return !1;
        var a = Ca(t, !0, !1, !1);
        return !1 != a && void st(a);
      }, 200);
    }),
    o(document).on(
      "mouseleave mouseout",
      ".selector-heading span, .css-selector-open .selector-view span,.wyp-anim-el-column > i",
      function () {
        clearTimeout(window.focusDelay),
          sn.extra.find(".wyp-el-viewer").remove();
      }
    ),
    o(document).on(
      "mouseover",
      ".css-selector-open .selector-view span",
      function () {
        var e = o(this);
        window.focusDelay = setTimeout(function () {
          var t = e.parents(".selector-group").attr("data-view-selector");
          if (((t = xi(t, !0, !0, !0, !0)), "*" == t.trim())) return !1;
          var a = Ca(t, !0, !1, !1);
          return !1 != a && void st(a);
        }, 200);
      }
    ),
    o(document).on("click", ".source-view", function () {
      var e = o(this).text().replace(/.css/g, "");
      (window.disable_auto_insert = !0),
        !1 == window.ypData["wyp-css-ed-act"] &&
          o(".css-editor-btn").trigger("click"),
        (window.sourceViewClick = !0),
        o("#c-t-list li[data-value='" + e + "']").trigger("click"),
        (window.sourceViewClick = !1);
      var t = Et(!0, null, !0);
      window.disable_auto_insert = !1;
      var a = o(this).parents(".selector-group"),
        i = a.attr("data-view-selector") + "{",
        s = a.attr("data-view-size");
      "desktop" != s && (i = "\t" + a.attr("data-view-selector") + "{");
      var r = t.split(i)[0],
        l = r.split(/\r\n|\r|\n/).length;
      setTimeout(function () {
        n.focus(),
          n.scrollToLine(l, !0, !1),
          "desktop" == s ? n.gotoLine(l, 0, !0) : n.gotoLine(l, 1, !0);
      }, 4);
    }),
    o(document).on("blur", ".css-rule-view .value-input", function (t) {
      var e = o(this),
        i = e.parents(".css-rule-view"),
        n = e.parents(".selector-group"),
        s = e.val(),
        l = e.prev();
      e.hide(),
        e.removeClass("rule-was-disable"),
        l.parent().find(".rule-end").removeAttr("style"),
        (s = s.replace(/\;$/i, "")),
        0 == s.length && (s = "disable"),
        "disable" == s &&
          !1 == i.hasClass("view-rule-disabled") &&
          (1 == e.parents(".selector-group").find(".css-rule-view").length
            ? (e.parents(".selector-group").css("background-color", "#A43A3A"),
              e.parents(".selector-group").delay(100).slideUp(300),
              setTimeout(function () {
                e.parents(".selector-group").remove();
              }, 420))
            : (e
                .parents(".css-rule-view")
                .css("background-color", "#A43A3A")
                .delay(80)
                .slideUp(200),
              setTimeout(function () {
                e.parents(".css-rule-view").remove();
              }, 300)));
      var d = n.attr("data-view-selector"),
        p = n.attr("data-view-size"),
        m = n.attr("data-view-type"),
        f = i.attr("data-view-rule"),
        g = s.trim();
      if (0 == s.length) return l.show(), !0;
      if (s == l.text() && !1 == i.hasClass("view-rule-disabled"))
        return l.show(), !0;
      !1 == i.hasClass("view-rule-disabled") ? l.text(s).show() : l.show(),
        t.originalEvent && i.find(".css-rule-label input").prop("checked", !0),
        Mt(),
        r(
          u(
            a(m, !1),
            "[selector=" + gi(d) + "][rule=" + f + "][msize=" + p + "]"
          ),
          m
        ),
        r(
          u(
            a(m, !1),
            "[selector=" + gi(d) + "][rule=" + h(f) + "][msize=" + p + "]"
          ),
          m
        ),
        (window.editedByReview = !0);
      var y = null,
        w,
        v,
        b,
        x;
      (w = n.find(".css-rule-view:not(.view-rule-disabled)").not(i).first()),
        0 < w.length &&
          ((v = w.attr("data-view-rule")),
          (y = c(
            a(m, !1),
            "[selector=" + gi(d) + "][rule=" + v + "][msize=" + p + "]"
          )),
          (b = w.prevAll(".css-rule-view:not(.view-rule-disabled)").length),
          (x = i.prevAll(".css-rule-view:not(.view-rule-disabled)").length),
          x >= b && (y += x - b)),
        tt(d, f, g, "", p, m, y),
        Mi(),
        (window.editedByReview = !1);
    }),
    o(document).on("keyup", ".css-rule-view .value-input", function (t) {
      var e = t.keyCode || t.which,
        a = o(this),
        i = a.parents(".css-rule-view"),
        n = a.parents(".selector-group"),
        s = a.val(),
        r = a.prev(),
        l = i.attr("data-view-rule");
      if ((Mt(), 13 == e))
        return (
          i.find(".css-rule-label input").prop("checked", !0),
          a.trigger("blur"),
          !1
        );
      if (27 == e)
        return (
          a.val(r.text()),
          a.hasClass("rule-was-disable") &&
            (i.addClass("view-rule-disabled"),
            a.removeClass("rule-was-disable")),
          a.trigger("blur"),
          !1
        );
      var d = n.attr("data-view-selector"),
        p = n.attr("data-view-size"),
        c = s.replace(/\;$/i, "").trim();
      return 0 == s.length || void Bt(d, l, c, p);
    }),
    o("#vsl-css-co").on(
      "scroll",
      o.throttle(function () {
        0 < o(this).scrollTop()
          ? o("#vsl-css-vi").addClass("view-scrolled")
          : o("#vsl-css-vi").removeClass("view-scrolled");
      }, 48)
    );
  var zn = "";
  o(document).on("keyup keydown", "#visual-rule-filter", function () {
    var e = null,
      t,
      a,
      i,
      n,
      s,
      r;
    (t = o(this)),
      (a = t.val().toLowerCase().trim()),
      (i = o("#vsl-css-co")),
      (n = i.find(".selector-group")),
      "matched" == a &&
        o(".selector-group.active")
          .removeClass("active")
          .removeClass("active-view-group"),
      0 < a.length && zn != a && i.scrollTop(0),
      (zn = a),
      C() && (e = _a()),
      n.each(function () {
        (s = o(this)),
          "single.css" == a || "template.css" == a || "global.css" == a
            ? s.attr("data-view-type").toLowerCase() ==
              a.replace(/\.css/g, "").trim()
              ? s.addClass("selector-group-visible")
              : s.removeClass("selector-group-visible")
            : "matched" == a
            ? "matched" == a && null != e
              ? ((r = Ca(s.attr("data-clean-selector"), !0, !1, !1)),
                !1 == r
                  ? s.removeClass("selector-group-visible")
                  : r.hasClass("wyp-selected")
                  ? s.addClass("selector-group-visible")
                  : s.removeClass("selector-group-visible"))
              : s.removeClass("selector-group-visible")
            : -1 == s.text().toLowerCase().indexOf(a.trim())
            ? s.removeClass("selector-group-visible")
            : s.addClass("selector-group-visible");
      }),
      0 == o(".selector-group-visible").length
        ? (o("#view-no-item span").removeClass("view-hand-icon"),
          "matched" == a
            ? C()
              ? o("#view-no-item p").text(qi.manager_msg1)
              : (o("#view-no-item span").addClass("view-hand-icon"),
                o("#view-no-item p").text(qi.manager_msg2))
            : "single.css" == a
            ? o("#view-no-item p").text(qi.manager_msg3)
            : "template.css" == a
            ? o("#view-no-item p").text(qi.manager_msg4)
            : "global.css" == a
            ? o("#view-no-item p").text(qi.manager_msg5)
            : -1 != a.indexOf("(max-width:") || -1 != a.indexOf("(max-width:")
            ? o("#view-no-item p").text(qi.manager_msg6)
            : "" == a
            ? o("#view-no-item p").text(qi.manager_msg8)
            : o("#view-no-item p").text(qi.manager_msg7),
          o("#view-no-item").show(),
          o(".view-information").text("").hide())
        : (o("#view-no-item").hide(),
          "" == a
            ? o(".view-information").text(qi.manager_msg9).show()
            : "matched" == a
            ? o(".view-information").text(qi.manager_msg10).show()
            : "single.css" == a
            ? o(".view-information").text(qi.manager_msg11).show()
            : "template.css" == a
            ? o(".view-information").text(qi.manager_msg12).show()
            : "global.css" == a
            ? o(".view-information").text(qi.manager_msg13).show()
            : -1 != a.indexOf("(max-width:") || -1 != a.indexOf("(min-width:")
            ? o(".view-information").text(qi.manager_msg14).show()
            : 0 < a.length
            ? o(".view-information").text(qi.manager_msg16).show()
            : o(".view-information").text("").hide()),
      Pt();
  }),
    o(".wyp-button-manage").click(function () {
      Rt(), o("#visual-rule-filter").trigger("keyup");
    }),
    o(".visual-manager-close").click(function () {
      It();
    }),
    o(document).on(
      "mouseenter mouseover",
      ".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs",
      function () {
        var e = o(this)
            .attr("class")
            .match(/wyp-contextmenu-reset-(.*?)-childs/g)[0]
            .replace(/(wyp-contextmenu-reset-|-childs)/g, "")
            .trim(),
          t = Nt(e).selectors,
          a = [];
        if (!1 != t && null != t && 0 < t.length) {
          for (var n = 0, s, r; n < t.length; n++)
            ((s = xi(t[n], !0, !0, !0, !0)),
            (r = Ca(s, !0, !1, !1)),
            !1 != r) &&
              0 < Gi.find(s).parents(".wyp-selected").length &&
              -1 == a.indexOf(s) &&
              a.push(s);
          0 < a.length && st(Gi.find(a.join(",")));
        }
      }
    ),
    o(document).on(
      "mouseleave mouseout",
      ".wyp-contextmenu-reset-single-childs,.wyp-contextmenu-reset-template-childs,.wyp-contextmenu-reset-global-childs",
      function () {
        sn.extra.find(".wyp-el-viewer").remove();
      }
    ),
    o("#background-image-group .di-btn").click(function (t) {
      t.originalEvent &&
        (o("#background-image-group .wyp-background-image-show").toggle(),
        ut());
    }),
    o("#box-shadow-inset-group .di-btn").click(function (t) {
      t.originalEvent &&
        (o("#box-shadow-inset-inset").parent().removeClass("active"),
        o("#box-shadow-inset-no").parent().addClass("active"));
    }),
    o(document).on("keyup change", ".this-grid-input", function () {
      var e = o(this).parents(".gr-bu-ar");
      la(e);
    }),
    o(document).on("change", ".grid-format", function () {
      var e = o(this),
        t = e.parent().parent().find(".this-grid-input"),
        a = e.val();
      "auto" == a
        ? t.val("").prop("disabled", !0)
        : (t.prop("disabled", !1),
          "" == t.val() && ("fr" == a && t.val(1), "%" == a && t.val(10)));
      var i = e.parents(".gr-bu-ar");
      la(i);
    }),
    o(document).on("click", ".grid-builder-add-new", function () {
      var e = o(this),
        t = e.parents(".gr-bu-ar"),
        a = e.parents(".op-g").attr("data-css"),
        n = t.find(".this-grid").length + 1,
        i = "Row";
      "grid-template-columns" == a && (i = "Column"),
        o(this).before(
          '<div class="this-grid"><input class="this-grid-input" placeholder="auto" type="number" min="1" value="1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"><div class="grid-format-div"><select class="grid-format"><option value="fr" selected>fr</option><option value="%">%</option><option value="px">px</option><option value="auto">auto</option></select></div><span class="yicon icon-no-alt delete-grid"></span></div>'
        ),
        o(".last-grid").removeClass("last-grid"),
        la(t);
    }),
    o(document).on("click", ".delete-grid", function () {
      var e = o(this).parents(".gr-bu-ar"),
        t = o(this).parents(".op-g").attr("data-css");
      o(this).parent().remove(), la(e), pa(t);
    }),
    o(".gr-o .gr-bu-in").on("keyup", function () {
      var e, t, a, i;
      (e = o(this)),
        (t = e.parent().parent()),
        (i = t.attr("data-css")),
        (a = e.val()),
        (window.lastEditID = i),
        tt(null, i, a, ""),
        Mi();
    }),
    o("#include-webfont-label input").on("change", function () {
      o(this).is(":checked")
        ? tt(null, "--google-webfont", "disable")
        : tt(null, "--google-webfont", "no-include"),
        Mi();
    }),
    o("#include-webfont-label").on("mouseout", function () {
      o("#include-webfont-label").tooltip("hide");
    });
  var On;
  (window.cachedCSS = void 0),
    (window.validUnits = [
      "px",
      "%",
      "em",
      "rem",
      "vh",
      "vw",
      "cm",
      "ex",
      "in",
      "mm",
      "pc",
      "pt",
      "ch",
      "vmin",
      "vmax",
      "ms",
      "s",
      "deg",
      "",
    ]);
  var Dn = [
      "(current-menu-item|post|hentry|widget|wp-post-image|comment-author-admin|next|prev|product|footer|footer-top|footer-bottom|header|navbar|sidebar|masthead|copyright|menu-item|form-control|row_inner|wpDataTable|ls-wrapper|x-column)",
      "active(!singleInspector)",
      "current(!singleInspector)",
      "(entry|article|post|page|item|widget)([-_])?title",
      "(entry|article|post|page|item|widget)([-_])?content",
      "(entry|article|post|page|item|widget)([-_])?meta",
      "([a-zA-Z0-9_-]+)?item",
    ],
    An = [
      "([a-zA-Z0-9_-]+)?(infinite|bounce|pulse|rubberBand|shake|headShake|swing|wobble|jello|hinge|fade)([a-zA-Z0-9_-]+)?",
      "(([a-zA-Z0-9_-]+)?([-_]flash|flash[-_]|[-_]flash[-_])([a-zA-Z0-9_-]+)?|flash)",
      "(([a-zA-Z0-9_-]+)?([-_]tada|tada[-_]|[-_]tada[-_])([a-zA-Z0-9_-]+)?|tada)",
      "([a-zA-Z0-9_-]+)?slide([a-zA-Z0-9_-]+)?(in|out)([a-zA-Z0-9_-]+)?(up|down|left|right)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(roll|fall|flip|lightSpeed|rotate|zoom)([a-zA-Z0-9_-]+)?(in|out|up|down|left|right)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(publish|draft|pending|private|trash)([a-zA-Z0-9_-]+)?",
      "(standard|aside|audio|chat|gallery|image|link|quote|status|video)",
      "([a-zA-Z0-9_-]+)?([-_]drag[-_]|drag[-_]|[-_]drag|active-slide|current-slide|selected-slide|slide-active|slide-current|slide-selected|draggable|sortable|dismissable|flippable|clickable|focus|viewport|ltr|inherit|relative|absolute|transparent|visibility|spaced|hidden|hideresize|cloned|status|clean|clr|clfw|ready|validate|false|true|loading|loaded|added|move|moving|finished|delay|enabled|disabled|bold|italic|initialised|even|odd|underlined|gutter|animation|animating|animate|transition|repeat|cursor|pointer|uppercase|lowecase|all-caps|capitalize|padding|margin|padded|[_-])(to|from)([_-])(top|left|right|bottom)([a-zA-Z0-9_-]+)?",
      "((?!n2)([a-zA-Z0-9_-]+)hover([_-])([a-zA-Z0-9]+)?|hover|hover([_-])([a-zA-Z0-9]+)?|(?!n2)([a-zA-Z0-9_-]+)hover|hovered)",
      "(?!n2)([a-zA-Z0-9_-]+)[-_]font([a-zA-Z0-9_-]+)?",
      "currency([a-zA-Z0-9_-]+)?",
      "(lang|language|translate)([-_])([a-zA-Z0-9_-]+)?",
      "([_-]?)([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3}|rgba|rgb)([_-]?)?",
      "([a-zA-Z0-9_-]+)?rand",
      "([a-zA-Z0-9_-]+)?(mrg|pdg|m|p|pad|mar|margin|pading|padng|mrn)([-_])(t|r|b|l|btm|top|left|right|tp|lft|rght|bottom)([-_])([a-zA-Z0-9_-]+)",
      "is([_-])([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)none",
      "([a-zA-Z0-9_-]+)?with([_-])([a-zA-Z0-9]+)",
      "(display[-_]?block|display[-_]?inline|display[-_]?inline[-_]?block)",
      "(bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)",
      "(bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)[-_](bottom|top|left|right|center|align|middle|up|down)",
      "(not|no)([_-])([a-zA-Z0-9_-]+)?",
      "(roboto|lato|montserrat|slabo|raleway|merriweather|poppins|lora|titillium[-_]?web|muli|arimo)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)[-_](serif|sans|display|monospace|webfont)([a-zA-Z0-9_-]+)?",
      "page([_-])item",
      "([a-zA-Z0-9_-]+)?object([_-])page",
      "([a-zA-Z0-9_-]+)?closed",
      "thread([_-])alt",
      "([a-zA-Z0-9_-]+)?([_-])has([_-])?([a-zA-Z0-9_-]+)|([a-zA-Z0-9_-]+)?([_-])?has([_-])([a-zA-Z0-9_-]+)",
      "screen([_-])reader([_-])text",
      "tag-link([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(internet([-_])?explorer|opera|firefox|safari|chrome|product_tag|product_cat)([a-zA-Z0-9_-]+)?",
      "calculated_shipping",
      "woocommerce-MyAccount-navigation-link--([a-zA-Z0-9_-]+)?",
      "(img-responsive|ls-active|disappear|appear|noSwipe|wow|bootstrap-touchspin-down|section--no|cat-item|kc-elm|kc_column|selected|alternate_color|open-mega-a|sf-menu|sf-arrows|ajax|neg-marg|lazy|lazyload|lazy-img|text-shadow-small|full|sort|elementor-column-gap-no|n2-ow|et_pb_css_mix_blend_mode_passthrough|filterall|notranslate|vce|bordb|master-slider-parent|ms-sl-selected|non-hundred-percent-height-scrolling|hundred-percent-fullwidth|post-no-media|ie|form-label-above)",
      "([a-zA-Z0-9_-]+)?((syle|style)-default|nojquery|js-comp-ver|wpb-js-composer|disable-responsive-headings|ut-vc-|default([-_])template|ga-track|raw([-_])code|raw([-_])html|withbg|bg([-_])layout)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?-shd",
      "([a-zA-Z0-9_-]+)?video-aspect-ratio-([a-zA-Z0-9_-]+)",
      "([a-zA-Z0-9_-]+)?([-_])spacing([-_])(no|yes)",
      "n2-(ow|ss)-(all|desktop|mobile|tablet)",
      "([a-zA-Z0-9_-]+)?show-dropdown",
      "page-section-[a-zA-Z0-9]{13,13}",
    ],
    Sn = [
      "([a-zA-Z0-9_-]+)([_-])",
      "([_-])([a-zA-Z0-9_-]+)",
      "([a-zA-Z0-9_-]+)?([_-])([_-]|tag|category|cat)([_-]|format)([a-zA-Z0-9_-]+)?",
      "menu([_-])item([_-])type([_-])post([_-])type",
      "menu([_-])item([_-])object([_-])page",
      "menu([_-])item([_-])(object|type)([_-])custom",
      "widget_([a-zA-Z0-9_-]+)",
      "bg([-_])([a-zA-Z0-9_-]+)",
      "([a-zA-Z0-9_-]+)?([_-])(l|m|s|xs)([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?pure([_-])([a-zA-Z0-9_-]+)?([_-])u([_-])[0-9]+([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?col([_-])([a-zA-Z0-9_-]+)?([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?col([_-])([a-zA-Z0-9_-]+)?([_-])offset([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?(medium|large|small)([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?(medium|large|small)([_-])([a-zA-Z0-9_-]+)?([_-])[0-9]+",
      "(start|end|center|between)([_-])(xs|s|m|l|xl|xsmall|small|medium|large|xlarge)",
      "(xs|s|m|l|xl|xsmall|small|medium|large|xlarge)([_-])(start|end|center|between)",
      "([a-zA-Z0-9_-]+)?(small|medium|large)([_-])(push|pull)([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?span([_-])?[0-9]+",
      "([a-zA-Z0-9_-]+)?col([_-])[0-9]+([_-])[0-9]+",
      "([a-zA-Z0-9_-]+)?col([_-])[0-9]+",
      "(column|columns|col)",
      "([a-zA-Z0-9_-]+)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)([a-zA-Z0-9_-]+)",
      "([a-zA-Z0-9_-]+)?(sticky|fixed|logged|print|visible|trigger|required)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?pull([a-zA-Z0-9_-]+)(left|right)",
      "(left|right)",
      "([a-zA-Z0-9_-]+)?([_-])(yes|no)([_-]|yes|no)([_-]|([_-])(yes|no)[_-]|is([_-])active|clearfix|clear)([a-zA-Z0-9_-]+)?",
      "(xsmall|x?[-_]small|small|large|medium|huge|normal)",
      "([a-zA-Z0-9_-]+)?(background|width|height|position|parent|color|layout|invert|scroll|equal|square|([_-])skin|skin([_-])|toggled|style([0-9_-]+)|rounded|radius|type|dynamic|row|border|align|dimension|inline-inside|corner-pointed|float|last-child|first-child|hide|show|parallax|responsive|intense|completed|with_ajax|no-sibling)([a-zA-Z0-9_-]+)?",
      "(?!n2-)([a-zA-Z0-9_-]+)style([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?first",
      "([a-zA-Z0-9_-]+)?last",
      "([a-zA-Z0-9_-]+)?text([_-])justify",
      "([a-zA-Z0-9_-]+)?effect([0-9_-]+)",
      "([a-zA-Z0-9_-]+)?(round|scale|shadow|rotate|default|minimal|anim|pos[-_]align|angled)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)([_-])(on|off)",
      "([a-zA-Z0-9_-]+)(size|mobile|desktop|populated)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(blue|black|red|white|light|green|yellow|purple|pink|orange|brown|gray)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)?(black|dark|white|light)([a-zA-Z0-9_-]+)?",
      "([a-zA-Z0-9_-]+)([_-])only",
      "([a-zA-Z0-9_-]+)?(text-left|text-center|text-right)([a-zA-Z0-9_-]+)?",
      "(unyson-page|end|larger|smaller|height-full|created_group|mini|activity_update|forge-block|forge-|elementor-section-items-middle|themify_builder|module|dslc-post-no-thumb|downloadable|purchasable|instock|above|open|template-page|alpha|units|flex_column_div|woocommerce|affix-top|st-menu|circle|vc_figure|vc_general|waves-effect|collapsed|collapse)",
    ],
    Tn = [
      "([a-zA-Z0-9_-]+)?(inner|overlay|container|google-fonts|fl-col-content)([a-zA-Z0-9_-]+)?",
      "elementor([a-zA-Z0-9_-]+)?(column|gap|wide|wrap)([a-zA-Z0-9_-]+)?",
      "ms-([a-zA-Z0-9_-]+)-view",
      "(kc-wrap-columns|dslc-modules-section-wrapper|av-content-full|ninja-forms-form-wrap|nf-fields-wrap|nf-field-element|tp-tab-mask|n2-ss-section-outer|sp-mask|sp-grab|ms-slide-layers|ls-layers|snp-fb|form_sublabel_below|gform_body)",
    ];
  (Tn = Tn.concat(An)), (Tn = Tn.concat(Sn));
  var En = ["([a-zA-Z0-9_-]+)?(wpcf7|mc4wp)([a-zA-Z0-9_-]+)?"],
    Ln = [
      "([a-zA-Z0-9_-]+)?page([_-])item([_-])([0-9]+)",
      "(vc_|vc-)(.*?)(_|-)[a-zA-Z-0-9]{22,22}",
      "themify_builder_content-([0-9]+)",
      "themify_builder_([0-9]+)_row",
      "tb_([0-9]+)_column",
      "et_pb_image_([0-9]+)",
      "([a-zA-Z0-9_-]+)?(post|page|portfolio|product|work|port|form|video)([_-])([0-9]+)",
      "([a-zA-Z0-9_-]+)?(post|page|portfolio|product|work|port|form|video)([_-])(entry|item|id)([_-])([0-9]+)",
      "([0-9])+(px|em|rem)",
      "([a-zA-Z0-9_-]+)?wishlist-([0-9])+",
      "wpbs-bookable-([0-9])+",
      "wpbs-day-([0-9])+",
      "([a-zA-Z0-9_-]+)?rand-([0-9])+",
      "([a-zA-Z0-9_-]+)?(([-_])ie|ie8|ie9|ie10|ie11)",
      "testimonials-items-([a-zA-Z0-9_-]+)",
      "instance-([0-9]+)",
    ],
    Bn = [
      "wp-image-[0-9]+",
      "([a-zA-Z0-9_-]+)?(section|slide|button|image|row)([a-zA-Z0-9_-]+)?",
      "gb-container-([a-zA-Z0-9_-]+)?",
      "wp-container-[0-9]+",
      "wp-elements-[0-9]+",
      "vc_custom_([a-zA-Z0-9_-]+)?",
      "fl-node([a-zA-Z0-9_-]+)?",
      "fl-row([a-zA-Z0-9_-]+)?",
      "module_row_([0-9]+)",
      "module_column_([0-9]+)",
      "et_pb_(section|row)_[0-9]+",
      "kc-css-([0-9]+)",
      "forge-col[0-9]+",
      "(avia|av)-builder-el-([0-9]+)",
      "footer-([0-9]+)",
      "(n2-font-|n2-style-)([a-zA-Z0-9_-]+)?",
      "n2-ss-([0-9]+)item([0-9]+)",
      "n-uc-([a-zA-Z0-9_-]+)",
      "ms-parent-id-([0-9_-]+)",
      "msp-cn-([a-zA-Z0-9_-]+)",
      "e([0-9-]+)",
      "td_module_([0-9]+)",
      "cp_id_([a-zA-Z0-9_-]+)",
      "snp-pop-([0-9]+)",
      "dsgn__basic-([0-9]+)",
      "td_block_([0-9]+)",
      "weforms-([0-9]+)",
      "fusion-builder-row-([0-9]+)",
    ],
    Mn = [
      "([a-zA-Z0-9_-]+)?(module|slide|section|row|layout|form|wrapper|container|parallax|block)([a-zA-Z0-9_-]+)?",
      "layers-widget-([a-zA-Z0-9_-]+)?",
      "builder-module-([a-zA-Z0-9_-]+)?",
      "pg-([a-zA-Z0-9_-]+)?",
      "ptpb_s([a-zA-Z0-9_-]+)?",
      "billing_address_([0-9])([a-zA-Z0-9_-]+)?",
      "el-([a-zA-Z0-9_-]+)",
      "dslc-module-([a-zA-Z0-9_-]+)",
      "module-([0-9]){13,13}-([0-9]){4,4}",
      "wrapper-([0-9]){13,13}-([0-9]){4,4}",
      "eluid([a-zA-Z0-9_-]+)",
      "nf-form-([0-9]+)-cont",
      "nf-field-([0-9]+)-wrap",
      "ulp-inline-([a-zA-Z0-9_-]+)?",
      "ulp-layer-([a-zA-Z0-9_-]+)?",
      "ulp-([a-zA-Z0-9_-]+)?",
      "esg-grid-([0-9]+)-([0-9]+)",
      "snp-bld-step-([0-9]+)",
      "snp-bld-step-([0-9]+)-el-([0-9]+)",
      "snppopup-content-([0-9]+)",
      "gform_([0-9]+)",
    ],
    Zn = [
      "widget",
      "recentcomments",
      "fws_([a-zA-Z0-9_-]+)",
      "rps_([a-zA-Z0-9_-]+)",
      "wrapper-[a-zA-Z-0-9]{16,16}",
      "search-form-[a-zA-Z0-9]{13,13}",
      "fullwidth-block-[a-zA-Z0-9]{13,13}",
      "nf-field-([0-9]+)-container",
      "phantom",
      "wpforms-([0-9]+)-field_([0-9]+)([a-zA-Z0-9_-]+)?(!singleInspector)",
      "input_([0-9]+)_([0-9]+)_([0-9]+)_container(!singleInspector)",
      "gform_fields_([0-9]+)",
    ],
    Pn = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "span",
      "img",
      "strong",
      "a",
      "li",
      "i",
      "ul",
      "header",
      "footer",
      "article",
      "b",
      "em",
      "code",
      "form",
      "label",
      "ol",
      "small",
      "blockquote",
      "nav",
    ];
  (window.reGetBestClass = !1),
    o(".wyp-navigation-btn").on("click", function () {
      var e = o(this);
      if (e.hasClass("active")) {
        var t = Ta(Ki.not("head"), !0);
        o("#layer-tree-title").after(t),
          tn.addClass("wyp-nvgtn-act"),
          C()
            ? Ba()
            : o("#layer-tree-ul")
                .children("li")
                .first()
                .find(".icon-arrow-down")
                .trigger("click"),
          tn.hasClass("wyp-fix-leftbar")
            ? o(".css-editor-btn.active").trigger("click")
            : window.ypData["wyp-css-ed-drgable"] &&
              o(".css-editor-btn.active").trigger("click"),
          o(".info-btn.active").trigger("click");
      } else o("#layer-tree-ul").remove(), tn.removeClass("wyp-nvgtn-act");
      N(), C() && Ze();
    }),
    tn.on("click", "#layer-tree", function (e) {
      window.triggedByNav = !0;
      var t = o(e.target),
        a = o(this),
        i = t.parents("li").first(),
        n;
      if (
        (t.hasClass("icon-arrow-down") &&
          i.hasClass("has-children") &&
          (i.toggleClass("active"),
          i.children("ul").remove(),
          i.hasClass("active") && ((n = Ta(La(i), !1)), i.append(n))),
        (t.hasClass("layer-tree-title") || t.hasClass("layer-tree-wrap")) &&
          (a.find(".selected").removeClass("selected"),
          At(),
          !i.hasClass("selected")))
      ) {
        "cursor" === window.ypData.inspector &&
          (o(".inspector-sublist-default").trigger("click"),
          (window.ypData.inspector = "default"),
          o(".inspector-sublist").css("display", "none")),
          i.addClass("selected"),
          (n = La(i));
        var s = Ma(n);
        L(s), Q(s, n, !1), ce();
      }
      window.triggedByNav = !1;
    });
  var Rn = 0,
    In = 0,
    Yn = 0;
  o(document).on("click", ".view-media-line", function () {
    var e = o(this).parents(".selector-group").attr("data-view-size"),
      t = Ga(e),
      a = Pe(e),
      i = "max-width";
    if (-1 != e.indexOf("and")) return o(this).css("cursor", "default"), !1;
    if (((window.resizedByPropertySize = !0), "desktop" != e)) {
      0 < o(".wyp-responsive-btn.active").length &&
        o(".wyp-responsive-btn").trigger("click");
      var n = Ya(a);
      !1 !== n &&
        -1 === n.indexOf(",") &&
        (-1 !== n.indexOf("<") &&
          0 == o(".breakpoint-bar .max-width").length &&
          (o(".media-control").trigger("click"),
          o(".media-control").tooltip("hide")),
        -1 !== n.indexOf(">") &&
          (0 == o(".breakpoint-bar .min-width").length &&
            (o(".media-control").trigger("click"),
            o(".media-control").tooltip("hide")),
          (i = "min-width")),
        Ja(
          o(
            ".breakpoint-bar > ." +
              i +
              "[data-breakpoint='" +
              parseInt(mi(t)) +
              "']"
          )
        ));
    } else 0 == o(".wyp-responsive-btn.active").length && o(".wyp-responsive-btn").trigger("click");
    setTimeout(function () {
      (window.resizedByPropertySize = !1),
        We(200),
        setTimeout(function () {
          He(200);
        }, 1500);
    }, window.YellowDelay);
  }),
    o(document).on("click", ".mo-i", function () {
      var e = o(this);
      e.toggleClass("active");
      var t = e.parents(".property-responsive");
      $a(t.attr("data-css"));
      var a = o("#property-responsive-menu");
      e.hasClass("active")
        ? (a.addClass("responsive-menu-open"),
          tn.addClass("property-responsive-open"),
          W({
            index: 2147483646,
            container: ".ed-pnl",
            custom_class: "fake-layer-responsive",
            callback: function () {
              Qa();
            },
          }),
          Ka(),
          sa())
        : o("#fake-layer").trigger("click");
    }),
    o(document).on("click", ".pr-res-ite .icon-no-alt", function () {
      var e = o(".mo-i.active").parents(".op-g").attr("data-css"),
        t = o(this).parent().attr("data-insert-media");
      return (
        tt(null, e, "disable", null, t),
        Mi(),
        o(this).parent(".pr-res-ite").addClass("hided").hide(),
        0 ==
        o(this)
          .parent()
          .parent()
          .find(".pr-res-ite:not(.hided)")
          .not("[data-info='-']").length
          ? (o("#" + e + "-group").removeClass("property-responsive"),
            tn.removeClass("node-has-other-screen-edits"),
            tn.removeAttr("node-edits-screen"),
            Qa())
          : Ka(),
        !1
      );
    }),
    o(document).on("click", ".pr-res-ite", function () {
      var e = o(this),
        t = e.attr("data-responsive-size"),
        a = Ga(t),
        i = "max-width";
      (window.resizedByPropertySize = !0),
        !1 !== t && "all" != t
          ? (0 < o(".wyp-responsive-btn.active").length &&
              o(".wyp-responsive-btn").trigger("click"),
            -1 === t.indexOf(",") &&
              (-1 != t.indexOf("<") &&
                0 == o(".breakpoint-bar .max-width").length &&
                (o(".media-control").trigger("click"),
                o(".media-control").tooltip("hide")),
              -1 != t.indexOf(">") &&
                (0 == o(".breakpoint-bar .min-width").length &&
                  (o(".media-control").trigger("click"),
                  o(".media-control").tooltip("hide")),
                (i = "min-width")),
              Ja(
                o(
                  ".breakpoint-bar > ." +
                    i +
                    "[data-breakpoint='" +
                    parseInt(a) +
                    "']"
                )
              )))
          : 0 == o(".wyp-responsive-btn.active").length &&
            o(".wyp-responsive-btn").trigger("click"),
        setTimeout(function () {
          (window.resizedByPropertySize = !1),
            We(200),
            setTimeout(function () {
              He(200);
            }, 1500);
        }, window.YellowDelay),
        Qa();
    }),
    (window.scrollbar_width_cache = void 0),
    (window.drag = {
      active: !1,
      currentX: 0,
      currentY: 0,
      initialX: 0,
      initialY: 0,
      xOffset: 0,
      yOffset: 0,
      scrollY: 0,
      scrollX: 0,
    });
  var Nn;
  an.body.addEventListener(
    "mousemove",
    o.throttle(function (a) {
      window.drag.active &&
        (clearTimeout(Nn),
        (Nn = setTimeout(function () {
          a.preventDefault();
          var e =
              parseFloat(Ji.scrollTop() + Ki.scrollTop()) - window.drag.scrollY,
            i =
              parseFloat(Ji.scrollLeft() + Ki.scrollLeft()) -
              window.drag.scrollX;
          (window.drag.currentX = a.clientX - window.drag.initialX + i),
            (window.drag.currentY = a.clientY - window.drag.initialY + e),
            (window.drag.xOffset = window.drag.currentX),
            (window.drag.yOffset = window.drag.currentY),
            Ji.find("#wyp-drag-style").remove(),
            Ji.append(
              "<style id='wyp-drag-style'>html body.wyp-con-slcd.wyp-dragging .wyp-selected{transform: translatex(" +
                window.drag.currentX +
                "px) translatey(" +
                window.drag.currentY +
                "px) !important;}</style>"
            );
          var n = Pa(),
            s = window.drag.item.offset(),
            o = s.top + n.top,
            r = s.left + n.left,
            l = 6,
            t,
            d,
            p,
            u,
            m,
            g,
            h,
            y,
            w,
            v,
            b,
            x;
          Ia(".wyp-selected", "wyp-selected-boxed");
          var _ = window.drag.item.outerWidth(),
            k = Math.round(
              parseFloat(sn.active.find(".wyp-selected-boxed-top").css("top"))
            ),
            C = Math.round(
              parseFloat(sn.active.find(".wyp-selected-boxed-left").css("left"))
            ),
            z = Math.round(
              parseFloat(
                sn.active.find(".wyp-selected-boxed-right").css("left")
              )
            ),
            O = Math.round(
              parseFloat(
                sn.active.find(".wyp-selected-boxed-bottom").css("top")
              )
            ),
            D = z - C,
            A = O - k,
            S = window.drag.item.css(["margin-top", "margin-left"]),
            T = parseFloat(S["margin-top"]),
            E = parseFloat(S["margin-left"]),
            L = Ji.find(".wyp-y-distance-border"),
            B = Ji.find(".wyp-x-distance-border");
          B.css("display", "none"), L.css("display", "none");
          var M = Ji.find(
            ".wyp-smrt-gd-el[data-wyp-bottom-round='" + ci(O) + "']"
          );
          (M = M.add(
            Ji.find(".wyp-smrt-gd-el[data-wyp-top-round='" + ci(k) + "']")
          )),
            (M = M.add(
              Ji.find(".wyp-smrt-gd-el[data-wyp-top-round='" + ci(O) + "']")
            )),
            (M = M.add(
              Ji.find(".wyp-smrt-gd-el[data-wyp-bottom-round='" + ci(k) + "']")
            )),
            0 < M.length &&
              ((h = parseFloat(M.attr("data-wyp-top"))),
              (y = parseFloat(M.attr("data-wyp-left"))),
              (w = parseFloat(M.attr("data-wyp-width"))),
              (v = parseFloat(M.attr("data-wyp-height"))),
              (b = parseFloat(h + v)),
              (x = parseFloat(y + w)),
              C > y ? ((p = y), (u = z - y)) : ((p = C), (u = x - C)),
              M.attr("data-wyp-top-round") == ci(k) && (m = h),
              M.attr("data-wyp-bottom-round") == ci(O) && (m = b),
              M.attr("data-wyp-bottom-round") == ci(k) && (m = b),
              M.attr("data-wyp-top-round") == ci(O) && (m = h),
              (t = o + T - h),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(h - k + window.drag.currentY)),
                (window.drag.currentY = d),
                B.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  width: u,
                  display: "block",
                })),
              (t = o + T - b + A),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(b - O + window.drag.currentY)),
                (window.drag.currentY = d),
                B.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  width: u,
                  display: "block",
                })),
              (t = o + T - h + A),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(h - O + window.drag.currentY)),
                (window.drag.currentY = d),
                B.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  width: u,
                  display: "block",
                })),
              (t = o + T - b),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(b - k + window.drag.currentY)),
                (window.drag.currentY = d),
                B.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  width: u,
                  display: "block",
                })));
          var Z = Ji.find(
            ".wyp-smrt-gd-el[data-wyp-right-round='" + ci(z) + "']"
          );
          (Z = Z.add(
            Ji.find(".wyp-smrt-gd-el[data-wyp-left-round='" + ci(C) + "']")
          )),
            (Z = Z.add(
              Ji.find(".wyp-smrt-gd-el[data-wyp-left-round='" + ci(z) + "']")
            )),
            (Z = Z.add(
              Ji.find(".wyp-smrt-gd-el[data-wyp-right-round='" + ci(C) + "']")
            )),
            0 < Z.length &&
              ((h = parseFloat(Z.attr("data-wyp-top"))),
              (y = parseFloat(Z.attr("data-wyp-left"))),
              (w = parseFloat(Z.attr("data-wyp-width"))),
              (v = parseFloat(Z.attr("data-wyp-height"))),
              (b = parseFloat(h + v)),
              (x = parseFloat(y + w)),
              k > h ? ((m = h), (g = O - h)) : ((m = k), (g = b - k)),
              Z.attr("data-wyp-left-round") == ci(C) && (p = y),
              Z.attr("data-wyp-right-round") == ci(z) && (p = x),
              Z.attr("data-wyp-right-round") == ci(C) && (p = x),
              Z.attr("data-wyp-left-round") == ci(z) && (p = y),
              (t = r + E - y),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(y - C + window.drag.currentX)),
                (window.drag.currentX = d),
                L.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  height: g,
                  display: "block",
                })),
              (t = r + E - x),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(x - C + window.drag.currentX)),
                (window.drag.currentX = d),
                L.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  height: g,
                  display: "block",
                })),
              (t = r + E - x + D),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(x - z + window.drag.currentX)),
                (window.drag.currentX = d),
                L.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  height: g,
                  display: "block",
                })),
              (t = Math.round(r + E - y + _)),
              t < l &&
                t > -Math.abs(l) &&
                ((d = Math.round(y - z + window.drag.currentX - (_ - D))),
                (window.drag.currentX = d),
                L.css({
                  transform: "translate3d(" + p + "px, " + m + "px, 0)",
                  height: g,
                  display: "block",
                }))),
            (1 == window.drag.currentY ||
              -1 == window.drag.currentY ||
              2 == window.drag.currentY ||
              -2 == window.drag.currentY) &&
              (window.drag.currentY = 0),
            (1 == window.drag.currentX ||
              -1 == window.drag.currentX ||
              2 == window.drag.currentX ||
              -2 == window.drag.currentX) &&
              (window.drag.currentX = 0),
            60 <= k
              ? sn.extra
                  .find(".wyp-helper-tooltip")
                  .css("transform", "translate3d(" + C + "px, " + k + "px, 0)")
                  .html(
                    "X: " +
                      parseInt(window.drag.currentX) +
                      "<br>Y: " +
                      parseInt(window.drag.currentY)
                  )
              : sn.extra
                  .find(".wyp-helper-tooltip")
                  .css(
                    "transform",
                    "translate3d(" + C + "px, " + (k + A + 40 + 10) + "px, 0)"
                  )
                  .html(
                    "X: " +
                      parseInt(window.drag.currentX) +
                      "<br>Y: " +
                      parseInt(window.drag.currentY)
                  );
        }, window.YellowDelay)));
    }, 32),
    !1
  ),
    (window.mouseisDown = !1),
    (window.styleAttrBeforeChange = null),
    (window.visualResizingType = null),
    (window.ResizeSelectedBorder = null),
    (window.elementOffsetLeft = null),
    (window.elementOffsetRight = null);
  var Hn = function (e) {
    var t = document.createElement("a");
    return (
      (t.href = e), t.protocol + "//" + t.host + t.pathname + t.search + t.hash
    );
  };
  Gi.find("a[href]").on("click", function (e) {
    if ((o(this).attr("target", "_self"), !1 === window.ypData["wyp-met-dis"]))
      return !1;
    if ("cursor" === window.ypData.inspector) {
      if (window.bMode) return !1;
      var t = o(this).attr("href");
      if (
        "" == t ||
        "#" == t.substring(0, 1) ||
        -1 != t.indexOf("javascript:") ||
        -1 != t.indexOf("yellow_pencil=true")
      )
        return !0;
      if (
        ((t = Hn(t)),
        "" != t &&
          "#" != t.substring(0, 1) &&
          -1 == t.indexOf("javascript:") &&
          -1 == t.indexOf("yellow_pencil=true"))
      ) {
        var a = ni(t),
          i = window.location.hostname;
        if (a != i)
          return (
            !1 != e.ctrlKey ||
            !1 != e.metaKey ||
            (k({ title: qi.sorry, text: qi.external_link }), !1)
          );
        if (
          -1 == t.indexOf(siteurl.split("://")[1]) ||
          -1 != t.indexOf("wp-login.php?action=logout")
        )
          return (
            !1 != e.ctrlKey ||
            !1 != e.metaKey ||
            (k({ title: qi.sorry, text: qi.link_not_valid }), !1)
          );
        if (
          ("http:" == location.protocol &&
            -1 != t.indexOf("https:") &&
            -1 == t.indexOf("http:") &&
            ((t = t.replace("https:", "http:")), o(this).attr("href", t)),
          "https:" == location.protocol &&
            -1 != t.indexOf("http:") &&
            -1 == t.indexOf("https:") &&
            ((t = t.replace("http:", "https:")), o(this).attr("href", t)),
          o(".wyp-save-btn").hasClass("waiting-for-save"))
        )
          if (!0 == confirm(qi.sure))
            o(".waiting-for-save").removeClass("waiting-for-save");
          else return !0;
      } else return !0;
      o("#loader i").css("width", "5%"),
        o("#iframe").remove(),
        tn.removeClass("yellow-pencil-ready"),
        o(".wyp-iframe-loader").show(),
        o(".loading-files").text(qi.page_loading);
      var n = window.location;
      n = n.toString().split("href=")[0] + "href=";
      var s = t;
      if ("about:" == s.substring(0, 6)) return o(this).show(), !1;
      (s = s.replace(/\/?(\?|#|$)/, "/$1")),
        o
          .post(s, { wyp_get_details: "true" })
          .done(function (e) {
            if (
              ((e = o("<div />").append(e).find("#wyp_page_details").html()),
              -1 != s.indexOf("/wp-login.php") && (e = "login|login|single"),
              -1 != s.indexOf("/wp-login.php") &&
                -1 != s.indexOf("action=lostpassword") &&
                (e = "lostpassword|lostpassword|single"),
              -1 != s.indexOf("/wp-login.php") &&
                -1 != s.indexOf("action=register") &&
                (e = "register|register|single"),
              null == e || null == e)
            )
              return si(), !1;
            var t = e.split("|")[0],
              a = e.split("|")[1],
              i = e.split("|")[2];
            (s = s.replace(/.*?:\/\//g, "")),
              (s = s
                .replace("&yellow_pencil_frame", "")
                .replace("?yellow_pencil_frame", "")),
              (s = encodeURIComponent(s)),
              (n =
                n +
                s +
                "&wyp_page_id=" +
                t +
                "&wyp_page_type=" +
                a +
                "&wyp_mode=" +
                i),
              (window.location = n);
          })
          .fail(function () {
            si();
          });
    }
  }),
    an.addEventListener("click", oi, !0),
    an.addEventListener("fakeClick", oi, !0),
    Gi.on("fakeOver", Me),
    (window.visualEdit = !1),
    (window.visualEditDelay = null),
    an.addEventListener(
      "mousedown",
      function (e) {
        var t = o(e.target),
          a = t.prop("tagName");
        if (
          (C() &&
            "BODY" != a &&
            "HTML" != a &&
            1 === e.which &&
            (t.hasClass("wyp-selected") ||
              t.hasClass("wyp-selected") ||
              di(t, "wyp-selected")) &&
            (clearTimeout(window.dragDelay),
            (window.dragDelay = setTimeout(function () {
              var a = t.css("transform"),
                i = !0,
                n;
              try {
                n = new DOMMatrixReadOnly(a);
              } catch (t) {
                i = !1;
              }
              i &&
                ((window.drag.xOffset = n.m41),
                (window.drag.yOffset = n.m42),
                (window.drag.initialX = e.clientX - window.drag.xOffset),
                (window.drag.initialY = e.clientY - window.drag.yOffset),
                e.target === t.get(0) &&
                  ((window.drag.active = !0), (window.drag.item = t)),
                window.ypData.editor_context_menu_open && t.contextMenu("hide"),
                (window.drag.scrollY = parseFloat(
                  Ji.scrollTop() + Ki.scrollTop()
                )),
                (window.drag.scrollX = parseFloat(
                  Ji.scrollLeft() + Ki.scrollLeft()
                )),
                t.removeClass("yp_onscreen yp_hover yp_click yp_focus"),
                Qi.addClass("wyp-dragging"),
                (window.ypData.is_dragging = !0),
                tn.addClass("wyp-clean-look"),
                Ji.addClass("wyp-hid-bor-n"),
                sn.extra.append("<div class='wyp-helper-tooltip'></div>"),
                "inline" == t.css("display") &&
                  tt(null, "display", "inline-block", ""),
                ri());
            }, 75))),
          t.hasClass("wyp-selected-boxed-left") ||
            t.hasClass("wyp-selected-boxed-right"))
        ) {
          var i = t;
          if (
            !1 == Ji.hasClass("wyp-element-float") &&
            i.hasClass("wyp-selected-boxed-left")
          )
            return !1;
          window.ypData["resize-time-delay"] = !0;
          var n = "",
            s = Ft(_a(), "width", [!0, !1]);
          if (s) {
            var r = Ft(_a(), "width", [!1, !1]);
            r.always(function (e) {
              !1 !== n && (n = e);
            });
          }
          clearTimeout(window.resizeDelay),
            (window.resizeDelay = setTimeout(function () {
              if (!1 === C()) return !1;
              var e;
              (window.visualResizingType = "width"),
                (window.ResizeSelectedBorder = i.hasClass(
                  "wyp-selected-boxed-left"
                )
                  ? "left"
                  : "right"),
                (window.mouseisDown = !0);
              var t = _(),
                a = i.get(0);
              J(a)
                ? ((e = {}),
                  (e.width = 0),
                  (e.height = 0),
                  (e.left = 0),
                  (e.right = 0),
                  (e.top = 0),
                  (e.bottom = 0))
                : (e = Ra(a));
              var o = t.css([
                  "margin-left",
                  "max-width",
                  "max-height",
                  "min-width",
                  "min-height",
                  "width",
                ]),
                r = parseFloat(Ji.scrollLeft() + Ki.scrollLeft());
              (window.mouseDownX = e.left + r),
                (window.exWidthX = parseFloat(e.width)),
                (window.exWidthY = null),
                (window.currentMarginLeft = parseFloat(o["margin-left"])),
                (window.maxData = {
                  width: parseFloat(o["max-width"]),
                  height: parseFloat(o["max-height"]),
                }),
                (window.minData = {
                  width: parseFloat(o["min-width"]),
                  height: parseFloat(o["min-height"]),
                });
              var l = pi(t, o.width);
              (window.liveResizeWPercent = !1),
                "%" == l.format && (window.liveResizeWPercent = !0),
                "%" != l.format &&
                  s &&
                  -1 != n.indexOf("%") &&
                  (window.liveResizeWPercent = !0),
                Ji.addClass("wyp-el-reing"),
                (window.ypData.is_resizing = !0),
                tn.addClass("wyp-clean-look"),
                window.ypData.editor_context_menu_open && t.contextMenu("hide"),
                sn.extra.append("<div class='wyp-helper-tooltip'></div>"),
                ri();
            }, 150));
        }
        if (t.hasClass("wyp-selected-boxed-bottom")) {
          var i = t;
          (window.ypData["resize-time-delay"] = !0),
            clearTimeout(window.resizeDelay),
            (window.resizeDelay = setTimeout(function () {
              if (!1 === C()) return !1;
              var e;
              (window.mouseisDown = !0),
                (window.visualResizingType = "height"),
                (window.ResizeSelectedBorder = i.hasClass(
                  "wyp-selected-boxed-top"
                )
                  ? "top"
                  : "bottom");
              var t = _(),
                a = t.get(0);
              J(a)
                ? ((e = {}),
                  (e.width = 0),
                  (e.height = 0),
                  (e.left = 0),
                  (e.right = 0),
                  (e.top = 0),
                  (e.bottom = 0))
                : (e = Ra(a));
              var n = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
                s = t.css([
                  "margin-top",
                  "max-width",
                  "max-height",
                  "min-width",
                  "min-height",
                ]);
              (window.mouseDownY = e.top + n),
                (window.exWidthY = parseFloat(e.height)),
                (window.exWidthX = null),
                (window.currentMarginTop = parseFloat(s["margin-top"])),
                (window.maxData = {
                  width: parseFloat(s["max-width"]),
                  height: parseFloat(s["max-height"]),
                }),
                (window.minData = {
                  width: parseFloat(s["min-width"]),
                  height: parseFloat(s["min-height"]),
                }),
                Ji.addClass("wyp-el-reing"),
                (window.ypData.is_resizing = !0),
                tn.addClass("wyp-clean-look"),
                window.ypData.editor_context_menu_open &&
                  _().contextMenu("hide"),
                Gi.find(_a()).removeClass(
                  "wyp_selected yp_onscreen yp_hover yp_focus yp_click"
                ),
                sn.extra.append("<div class='wyp-helper-tooltip'></div>"),
                ri();
            }, 150));
        }
        if (
          t.hasClass("wyp-selected-boxed-margin-left") ||
          t.hasClass("wyp-selected-boxed-margin-right") ||
          t.hasClass("wyp-selected-boxed-margin-top") ||
          t.hasClass("wyp-selected-boxed-margin-bottom") ||
          t.hasClass("wyp-selected-boxed-padding-left") ||
          t.hasClass("wyp-selected-boxed-padding-right") ||
          t.hasClass("wyp-selected-boxed-padding-top") ||
          t.hasClass("wyp-selected-boxed-padding-bottom")
        ) {
          if (2 == e.which || 3 == e.which) return !1;
          var i = t;
          clearTimeout(window.visualEditDelay),
            (window.visualEditDelay = setTimeout(function () {
              if (!1 === C()) return !1;
              var t = i.attr("class").trim();
              i
                .addClass("wyp-visual-active")
                .removeClass("wyp-zero-m-w wyp-zero-m-h"),
                (window.visualEditType = t
                  .match(/boxed-[a-z]+/g)
                  .toString()
                  .replace("boxed-", "")),
                (window.visualEditPosition = t
                  .match(/boxed-(margin|padding)-[a-z]+/g)
                  .toString()
                  .replace(/boxed-|margin|padding|-/g, "")),
                (window.visualEdit = !0),
                (window.visualEditX = Math.round(e.pageX)),
                (window.visualEditY = Math.round(e.pageY));
              var a = window.visualEditType + "-" + window.visualEditPosition;
              (window.visualEditValue = _().css(a)),
                (window.visualEditValueOr = window.visualEditValue),
                (window.visualEditValue = J(window.visualEditValue)
                  ? 5
                  : parseInt(window.visualEditValue)),
                Ji.addClass("wyp-vis-edng"),
                (window.ypData.is_visual_editing = !0),
                tn.removeClass("wyp-clean-look"),
                /(left|right)/g.test(window.visualEditPosition)
                  ? Ji.addClass("wyp-vis-edng-x")
                  : Ji.addClass("wyp-vis-edng-y"),
                (window.currentLiveSelector = ke()),
                Ji.addClass("wyp-h-trfm");
            }, 150));
        }
        return "cursor" === window.ypData.inspector
          ? void 0
          : (e.stopPropagation(), e.preventDefault(), !1);
      },
      !0
    ),
    Gi.on(
      "mousemove",
      o.throttle(function (e) {
        if (!0 === window.mouseisDown) {
          var t = sn.extra.find(".wyp-y-distance-border"),
            a = sn.extra.find(".wyp-x-distance-border"),
            i = _(),
            n = i.get(0),
            s;
          J(n)
            ? ((s = {}),
              (s.width = 0),
              (s.height = 0),
              (s.left = 0),
              (s.right = 0),
              (s.top = 0),
              (s.bottom = 0))
            : (s = Ra(n));
          var r = Pa();
          (e.pageY += r.top),
            (e.pageX += r.left),
            "inline" == i.css("display") &&
              tt(null, "display", "inline-block", "");
          var l = "px";
          !0 == window.liveResizeWPercent && (l = "%");
          var d, p, c, u;
          "width" == window.visualResizingType
            ? ((u = s.width - i.outerWidth(!1)),
              (d =
                "left" == window.ResizeSelectedBorder
                  ? Math.round(s.left + Ji.scrollLeft() + Ki.scrollLeft()) +
                    Math.round(s.width) -
                    Math.round(e.pageX) -
                    u
                  : Math.round(e.pageX) -
                    Math.round(s.left + Ji.scrollLeft() + Ki.scrollLeft()) -
                    u),
              (("px" == l && 4 < d) || ("%" == l && 2 < d)) &&
                ("content-box" == i.css("boxSizing") &&
                  (d =
                    d -
                    Math.round(parseFloat(i.css("paddingLeft"))) -
                    Math.round(parseFloat(i.css("paddingRight")))),
                (p = pi(i, d)),
                (d = p.val),
                (l = p.format),
                !1 === window.wasLockX && i.cssImportant("width", d + l),
                Ia(".wyp-selected", "wyp-selected-boxed")))
            : "height" == window.visualResizingType &&
              ((u = s.height - i.outerHeight(!1)),
              (c =
                "top" == window.ResizeSelectedBorder
                  ? Math.round(s.bottom + Ji.scrollTop() + Ki.scrollTop()) -
                    Math.round(e.pageY)
                  : Math.round(e.pageY) -
                    Math.round(s.top + Ji.scrollTop() + Ki.scrollTop()) -
                    u),
              "px" == l &&
                4 < c &&
                ("content-box" == i.css("boxSizing") &&
                  (c =
                    c -
                    Math.round(parseFloat(i.css("paddingTop"))) -
                    Math.round(parseFloat(i.css("paddingBottom")))),
                !1 === window.wasLockY && i.cssImportant("height", c + l),
                Ia(".wyp-selected", "wyp-selected-boxed")));
          var m = "",
            f = 0;
          "width" == window.visualResizingType
            ? (5 > d && "px" == l ? (d = 5) : 2 > d && (d = 2),
              (f = Math.round(d)),
              (m = "W: " + f + l))
            : (5 > c && (c = 5), (f = Math.round(c)), (m = "H: " + f + l)),
            "height" == window.visualResizingType
              ? parseInt(window.orginalHeight) == parseInt(c) &&
                (m = "H: Initial - " + window.orginalHeight)
              : parseInt(window.orginalWidth) == parseInt(d) &&
                (m = "W: Initial - " + window.orginalWidth);
          var g = Math.round(
              parseFloat(sn.active.find(".wyp-selected-boxed-top").css("top"))
            ),
            h = Math.round(
              parseFloat(sn.active.find(".wyp-selected-boxed-left").css("left"))
            ),
            y = Math.round(
              parseFloat(
                sn.active.find(".wyp-selected-boxed-right").css("left")
              )
            ),
            w = Math.round(
              parseFloat(
                sn.active.find(".wyp-selected-boxed-bottom").css("top")
              )
            ),
            v,
            b,
            x,
            k,
            C,
            z,
            O,
            D,
            A,
            S,
            T,
            E;
          if ("height" == window.visualResizingType) {
            a.css("display", "none"), (window.wasLockY = !1);
            var L = Ji.find(
              ".wyp-smrt-gd-el[data-wyp-top-round='" +
                ci(e.pageY) +
                "'],.wyp-smrt-gd-el[data-wyp-bottom-round='" +
                ci(e.pageY) +
                "']"
            ).first();
            0 < L.length &&
              ((O = parseFloat(L.attr("data-wyp-top"))),
              (D = parseFloat(L.attr("data-wyp-left"))),
              (A = parseFloat(L.attr("data-wyp-width"))),
              (S = parseFloat(L.attr("data-wyp-height"))),
              (T = parseFloat(O + S)),
              (E = parseFloat(D + A)),
              h > D ? ((v = D), (b = y - v)) : ((v = h), (b = E - h)),
              L.attr("data-wyp-top-round") == ci(e.pageY)
                ? ((x = O), (k = O - g))
                : ((x = T), (k = T - g)),
              (u = s.height - i.outerHeight(!1)),
              (k -= u),
              "top" == window.ResizeSelectedBorder
                ? (k = c)
                : (i.cssImportant("height", k + l), (window.wasLockY = !0)),
              a.css({
                transform: "translate3d(" + v + "px, " + x + "px, 0)",
                width: b,
                display: "block",
              }),
              5 > k && (k = 5),
              (f = Math.round(k)),
              (m = "H: " + f + l)),
              parseInt(window.orginalHeight) == parseInt(k) &&
                (m = "H: Initial - " + window.orginalHeight);
          }
          if ("width" == window.visualResizingType) {
            (window.wasLockX = !1), t.css("display", "none");
            var B = Ji.find(
              ".wyp-smrt-gd-el[data-wyp-left-round='" +
                ci(e.pageX) +
                "'],.wyp-smrt-gd-el[data-wyp-right-round='" +
                ci(e.pageX) +
                "']"
            ).first();
            0 < B.length &&
              ((O = parseFloat(B.attr("data-wyp-top"))),
              (D = parseFloat(B.attr("data-wyp-left"))),
              (A = parseFloat(B.attr("data-wyp-width"))),
              (S = parseFloat(B.attr("data-wyp-height"))),
              (T = parseFloat(O + S)),
              (E = parseFloat(D + A)),
              g > O ? ((x = O), (C = w - O)) : ((x = g), (C = T - g)),
              B.attr("data-wyp-left-round") == ci(e.pageX)
                ? ((v = D), (z = D - h))
                : ((v = E), (z = E - h)),
              (u = s.width - i.outerWidth(!1)),
              (z -= u),
              (p = pi(i, z)),
              (z = p.val),
              (l = p.format),
              "left" == window.ResizeSelectedBorder
                ? (z = d)
                : (i.cssImportant("width", z + l), (window.wasLockX = !0)),
              t.css({
                transform: "translate3d(" + v + "px, " + x + "px, 0)",
                height: C,
                display: "block",
              }),
              "%" == l
                ? (2 > z && (z = 2), (f = Math.round(z)))
                : (5 > z && (z = 5), (f = Math.round(z))),
              (m = "W: " + f + l)),
              parseInt(window.orginalWidth) == parseInt(z) &&
                (m = "W: Initial - " + window.orginalWidth);
          }
          var M = e.pageX + 30;
          M + 120 >= o("#iframe").width() && (M = e.pageX - 120),
            sn.extra
              .find(".wyp-helper-tooltip")
              .css(
                "transform",
                "translate3d(" + M + "px, " + e.pageY + "px, 0)"
              )
              .html(m);
        }
      }, 32)
    ),
    Gi.on(
      "mousemove",
      o.throttle(function (e) {
        if (window.visualEdit) {
          var t, a, i, n, s;
          /(left|right)/g.test(window.visualEditPosition)
            ? ((t =
                "padding" == window.visualEditType
                  ? /left/g.test(window.visualEditPosition)
                    ? Math.round(e.pageX) - window.visualEditX
                    : window.visualEditX - Math.round(e.pageX)
                  : Math.round(e.pageX) - window.visualEditX),
              (n = "width"))
            : ((t = Math.round(e.pageY) - window.visualEditY), (n = "height")),
            (a = window.visualEditType + "-" + window.visualEditPosition),
            ("padding-bottom" == a ||
              "margin-left" == a ||
              "margin-top" == a) &&
              (0 > t ? (t = Math.abs(t)) : (t = -Math.abs(t))),
            (t += window.visualEditValue),
            0 > t && (t = 0),
            (i = "");
          var o = _(),
            r = o.get(0);
          J(r)
            ? ((s = {}),
              (s.width = 0),
              (s.height = 0),
              (s.left = 0),
              (s.right = 0),
              (s.top = 0),
              (s.bottom = 0))
            : (s = Ra(r));
          var l = parseFloat(Ji.scrollTop() + Ki.scrollTop()),
            d = parseFloat(Ji.scrollLeft() + Ki.scrollLeft()),
            p = s.width,
            c = s.height,
            u = s.top + l,
            m = s.left + d,
            f = parseFloat(m + p),
            g = parseFloat(u + c);
          "margin-right" ==
            window.visualEditType + "-" + window.visualEditPosition &&
            (i +=
              ".wyp-selected-boxed-margin-right{ transform: translate3d(" +
              f +
              "px, " +
              u +
              "px, 0) !important; height:" +
              c +
              "px !important; }"),
            "padding-right" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-padding-right{ transform: translate3d(" +
                (f - t) +
                "px, " +
                u +
                "px, 0) !important; height:" +
                c +
                "px !important; }"),
            "margin-left" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-margin-left{ transform: translate3d(" +
                (m - t) +
                "px, " +
                u +
                "px, 0) !important; height:" +
                c +
                "px !important; }"),
            "padding-left" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-padding-left{ transform: translate3d(" +
                m +
                "px, " +
                u +
                "px, 0) !important; height:" +
                c +
                "px !important; }");
          var h, y, w, v;
          ("margin-top" ==
            window.visualEditType + "-" + window.visualEditPosition ||
            "margin-bottom" ==
              window.visualEditType + "-" + window.visualEditPosition) &&
            ((h = parseFloat(o.css("margin-left"))),
            (y = parseFloat(o.css("margin-right"))),
            (w = parseFloat(p) + h + y),
            (v = parseFloat(m) - h)),
            "margin-top" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-margin-top{ transform: translate3d(" +
                v +
                "px, " +
                (u - t) +
                "px, 0) !important; width:" +
                w +
                "px !important; }"),
            "padding-top" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-padding-top{ transform: translate3d(" +
                m +
                "px, " +
                u +
                "px, 0) !important; width:" +
                p +
                "px !important; }"),
            "margin-bottom" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-margin-bottom{ transform: translate3d(" +
                v +
                "px, " +
                g +
                "px, 0) !important; width:" +
                w +
                "px !important; }"),
            "padding-bottom" ==
              window.visualEditType + "-" + window.visualEditPosition &&
              (i +=
                ".wyp-selected-boxed-padding-bottom{ transform: translate3d(" +
                m +
                "px, " +
                (g - t) +
                "px, 0) !important; width:" +
                p +
                "px !important; }"),
            (t = parseInt(t)),
            (i +=
              ".wyp-selected-boxed-" +
              window.visualEditType +
              "-" +
              window.visualEditPosition +
              "{ " +
              n +
              " : " +
              t +
              "px !important; }"),
            (i +=
              "body.wyp-con-slcd .wyp-selected," +
              window.currentLiveSelector +
              "{ " +
              a +
              " : " +
              t +
              "px !important; }"),
            0 == Gi.find("#wyp-visual-edit-css").length
              ? Ji.append("<style id='wyp-visual-edit-css'>" + i + "</style>")
              : Gi.find("#wyp-visual-edit-css").text(i),
            sn.active
              .find(
                ".wyp-selected-boxed-" +
                  window.visualEditType +
                  "-" +
                  window.visualEditPosition +
                  ""
              )
              .text(t + "px");
        }
      }, 32)
    ),
    o(document).on("click", ".wyp-color-background", function () {
      var e = o(this),
        t = e.parents(".op-g"),
        a = t.attr("data-css");
      if (tn.hasClass("wyp-bg-layer-active"))
        return o("#fake-layer").trigger("click"), !1;
      t.parent().hasClass("option-group-class") && (t = t.parent());
      var i = e.parent().parent().find(".iris-picker");
      i.toggle();
      var n = t.offset(),
        s =
          parseInt(e.offset().left + e.width() / 2 - n.left) -
          parseInt(i.css("marginLeft"));
      t.find(".custom-iris-pos-css").remove(),
        t.append(
          "<style class='custom-iris-pos-css'>.op-g[data-css='" +
            a +
            "'] .iris-picker::after, .op-g[data-css='" +
            a +
            "'] .iris-picker::before{left:" +
            s +
            "px;}</style>"
        ),
        i.css("top", e.offset().top).css("left", n.left);
      var r = e.find(".co-sw-co").css("background-color"),
        l =
          -1 === r.indexOf("rgba")
            ? 100
            : parseFloat(100 * r.replace(/^.*,(.+)\)/, "$1"));
      "transparent" == r && (l = 0),
        i.find(".cs-alpha-slider").slider("value", l);
      var d = i.find(".information.hex input");
      0 < d.length &&
        (d.trigger("focus"), d[0].setSelectionRange(0, d.val().length)),
        e.addClass("active"),
        (window.isIrisOpen = !0),
        W({
          index: 2147483646,
          container: ".ed-pnl",
          callback: function () {
            (window.isIrisOpen = !1),
              e.removeClass("active"),
              e.prev(".iris-picker").hide();
          },
        });
    }),
    tn.on("mousedown", ".ed-pnl-list > li:not(.active)", function () {
      if (!0 === C()) {
        var e = o(this),
          t = e.attr("data-loaded"),
          i = e.attr("data-setup");
        if (
          (("undefined" == typeof i || !1 === i) &&
            (e.find(".co-p").cs_iris(),
            e.hasClass("background-option") &&
              o("#iris-gradient-color").cs_iris(),
            e.find(".sl-o").each(function () {
              rt(G(this), o(this).data("decimals"));
            }),
            e.find(".se-o").each(function () {
              var t = o(this),
                a = t.find("textarea");
              /^http/g.test(a.val())
                ? o
                    .getJSON(a.val(), function (e) {
                      a.val(JSON.stringify(e)), ve(t.find(".in-ac"));
                    })
                    .fail(function () {
                      Li(
                        "Loading Error",
                        "Could Not Load Json library.",
                        "jsonError"
                      );
                    })
                : ve(e.find(".in-ac"));
            }),
            ct(e),
            e.attr("data-setup", "true")),
          "undefined" == typeof t || !1 === t)
        ) {
          var n = _a();
          (t = { element: _(), size: Fe(), styles: a(null, !0) }),
            e.find(".op-g").each(function () {
              pa(G(this), n, t);
            }),
            e.attr("data-loaded", "true");
        }
      }
    }),
    Gi.on(
      "mouseout mouseover",
      ".wyp-selected",
      o.throttle(function (t) {
        return (
          !(window.firstSelectLimit && "mouseover" == t.type) &&
          (window.firstSelectLimit
            ? ((window.firstSelectLimit = !1), !1)
            : void (
                !0 == C() &&
                !1 == O() &&
                !1 == z() &&
                !1 == D() &&
                (clearTimeout(window.update_drawmouseOver),
                (window.update_drawmouseOver = setTimeout(function () {
                  Ze();
                }, 200)))
              ))
        );
      }, 64)
    ),
    o(document).on("click", ".reset-enable .di-btn", function (t) {
      var e, a;
      (a = o(this).parent().parent().parent()), (e = G(a));
      var i = o("#wyp-" + e).val();
      if (
        ("background-image" == e &&
          o(
            ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active"
          ).removeClass("active"),
        t.originalEvent)
      ) {
        if ((a.removeClass("reset-enable"), o(this).hasClass("di-btn"))) {
          var n = Ft(null, e, [!1, !0]);
          n.always(function (t) {
            !1 !== t &&
              ("all" == t && (t = "desktop"),
              tt(null, e, "disable", "", t),
              setTimeout(function () {
                pa(e);
              }, window.Yellow2Delay));
          });
        }
        Mi();
      }
      a.hasClass("in-o") &&
        ("" == i || "none" == i
          ? a.find(".in-wr").addClass("empty-input")
          : a.find(".in-wr").removeClass("empty-input")),
        o.throttle(Be(), 32);
    }),
    o(
      ".in-o .in-wr input,.sl-o .wyp-after input,.wyp-bgs-css-val,.wyp-bgs-prefix"
    ).on("blur", function () {
      var e = o(this).parents(".op-g").attr("data-css"),
        t = o(this).val();
      "" == t && pa(e);
    }),
    o(".ed-pnl-list > li > h3").click(function () {
      var e = o(this),
        t = e.parent(),
        a = o(".wyp-close-btn"),
        i = o(".ed-pnl-list > li");
      i.not(t).hide(),
        t.toggleClass("active"),
        o(".ed-pnl-list").toggleClass("list-active"),
        t.find(".wyp-t-cont").toggle(),
        !1 == t.hasClass("active")
          ? (i.show(),
            a.removeClass("icon-menu").addClass("icon-no-alt"),
            a
              .tooltip("hide")
              .attr("data-original-title", qi.close_editor)
              .tooltip("fixTitle"),
            t.hasClass("animation-option") &&
              (Gi.find(
                ".yp_onscreen,.yp_hover,.yp_click,.yp_focus"
              ).removeClass("yp_onscreen yp_hover yp_click yp_focus"),
              t.removeAttr("data-loaded")))
          : (a.removeClass("icon-no-alt").addClass("icon-menu"),
            a
              .tooltip("hide")
              .attr("data-original-title", qi.back_to_menu)
              .tooltip("fixTitle")),
        o(".ed-pnl-list").scrollTop(0),
        o(".op-g,.wyp-advanced-option").popover("hide"),
        o.throttle(Be(), 32);
    });
  var Wn = function (e) {
    return "undefined" != typeof e && "" != e
      ? ((e = e.replace(/\W+/g, "")), e)
      : "";
  };
  o(document).on("mouseenter", ".selector-group", function () {
    o(this).find(".selector-comment-input").autoGrowInput();
  }),
    o(document).on("keyup keydown", ".selector-comment-input", function (t) {
      var e = t.keyCode || t.which;
      if ((13 == e && o(this).trigger("blur"), 27 == e))
        return o(this).val("").trigger("blur"), !1;
    }),
    o(document).on("focus", ".selector-comment-input", function () {
      var e = o(this).val(),
        t = e.match(/ \(\d+\)$/);
      null == t && (t = ""),
        o(this).attr("data-len", t),
        o(this).val(e.replace(/ \(\d+\)$/g, "").trim());
    }),
    o(document).on("blur", ".selector-comment-input", function () {
      var e = o(this).parents(".selector-group"),
        t = !1,
        a = o(this).val(),
        i = e.attr("data-view-selector"),
        n;
      "" == Oi(a) && ((t = !0), (a = Ai(i, !0))),
        Ci(i, a),
        (n = t ? a : Oi(a) + " " + o(this).attr("data-len")),
        e.hasClass("active") && Di(),
        o(this).val(n),
        setTimeout(function () {
          e.find(".selector-comment-input").autoGrowInput();
        }, 4),
        (window.editedByReview = !0),
        Mi(),
        (window.editedByReview = !1);
    }),
    o(document).on("click", ".wyp-message-box", function () {
      var e = o(this);
      e.css("opacity", "0"),
        setTimeout(function () {
          e.remove();
        }, 350);
    }),
    (window.plugin_classes_list_sorted = window.plugin_classes_list
      .split("|")
      .sort(function (e, t) {
        return t.length - e.length;
      })
      .join("|")),
    en.keydown(function (t) {
      var e = t.target.tagName.toLowerCase();
      "input" != e &&
        "textarea" != e &&
        t.shiftKey &&
        ("61" == t.which ||
          "107" == t.which ||
          "173" == t.which ||
          "109" == t.which ||
          "187" == t.which ||
          "189" == t.which) &&
        t.preventDefault();
    }),
    o(document).on("click", ".wyp-unsplash-list > span > i", function () {
      var e = o(this);
      if (
        (clearInterval(window.ypLocalUploader),
        window.ypData.demo_mode || window.bMode)
      )
        return !1;
      var t = 0;
      return (
        (window.ypLocalUploader = setInterval(function () {
          t++,
            0 == t % 2
              ? (e.text("Upload."), e.css("padding-left", "0px"))
              : (e.text("Upload.."), e.css("padding-left", "3px"));
        }, 200)),
        o
          .post(ajaxurl, {
            action: "wyp_unsplash_api",
            wyp_link: o("#wyp-background-image").val(),
            wyp_id: e.parent().attr("data-id"),
            _wpnonce: window.wyp_editor_nonce,
          })
          .done(function (t) {
            -1 == t.indexOf("http")
              ? k({ title: qi.sorry, text: t })
              : (e
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .parent()
                  .find(".wyp-input")
                  .val(t)
                  .trigger("keyup"),
                o(".wyp-unsplash-btn.active").trigger("click"),
                e.parent().attr("data-local", t),
                ne(t));
          })
          .always(function () {
            clearInterval(window.ypLocalUploader),
              e.text("Upload"),
              e.css("padding-left", "0px");
          }),
        !1
      );
    }),
    (window.glblUnsplashIndex = 0);
  var Fn;
  o("#unsplash-search").on("keyup", function () {
    (window.glblUnsplashIndex = 0),
      clearTimeout(Fn),
      (Fn = setTimeout(function () {
        o(".wyp-unsplash-list").empty(), Wi(null);
      }, 400));
  }),
    o(document).on("click", ".wyp-unsplash-list > span", function () {
      var e = o(this),
        t;
      if (e.hasClass("active") && !1 == e.hasClass("unsplash-img-loading"))
        return e.find("i").trigger("click"), !1;
      var a = (100 * _().width()) / Ji.width();
      (a = parseInt((2560 * a) / 100)),
        (a = 10 * Math.ceil(a / 10)),
        (t =
          200 > a
            ? e.attr("data-thumb")
            : 400 > a
            ? e.attr("data-small")
            : 1080 > a
            ? e.attr("data-regular")
            : e.attr("data-regular").replace(/w=1080/g, "w=" + a)),
        null != e.attr("data-local") &&
          null != e.attr("data-local") &&
          (t = e.attr("data-local")),
        e
          .parent()
          .parent()
          .parent()
          .parent()
          .find(".wyp-input")
          .val(t)
          .trigger("keyup"),
        o(".wyp-unsplash-list > span.unsplash-img-loading").removeClass(
          "unsplash-img-loading"
        ),
        e.attr("data-content", "1%");
      var i = 1;
      e.addClass("unsplash-img-loading"),
        Ji.find("#unsplash-img-loader").remove(),
        Ji.append("<img src='" + t + "' id='unsplash-img-loader' />"),
        Ji.find("#unsplash-img-loader").on("load", function () {
          (i = 100),
            e.attr("data-content", i + "%"),
            clearTimeout(window.unsplashLoaderIn),
            setTimeout(function () {
              e.removeClass("unsplash-img-loading"),
                o(
                  ".wyp-unsplash-list > span.active,.wyp-gradient-demo.active,.wyp-bg-ast.active"
                ).removeClass("active"),
                e.addClass("active");
            }, 500);
        }),
        clearInterval(window.unsplashLoaderIn),
        (window.unsplashLoaderIn = setInterval(function () {
          var t = 8;
          97 < i
            ? (t = 1.1)
            : 95 < i
            ? (t = 1.2)
            : 90 < i
            ? (t = 1.3)
            : 80 < i
            ? (t = 1.4)
            : 70 < i
            ? (t = 1.5)
            : 60 < i
            ? (t = 1.6)
            : 50 < i
            ? (t = 1.7)
            : 40 < i
            ? (t = 1.8)
            : 30 < i
            ? (t = 1.9)
            : 20 < i && (t = 2),
            99 != i && (i += Math.floor(Math.random() * t)),
            e.attr("data-content", i + "%");
        }, 100)),
        o(".wyp-background-image-show").hide();
    }),
    o(".wyp-unsplash-list").on(
      "scroll",
      o.throttle(function () {
        ji();
      }, 64)
    ),
    (Array.prototype.diff = function (e) {
      return this.filter(function (t) {
        return 0 > e.indexOf(t);
      });
    }),
    (function () {
      var e = Ki.html(),
        t = Math.floor(963100 * Math.random()) + 136900,
        a;
      (a =
        !0 === window.bMode
          ? decodeURIComponent(window.location.href)
          : location.protocol + "//" + decodeURIComponent(o.urlParam("href"))),
        (a = new URL(a)),
        !0 !== window.bMode &&
          (a.searchParams.set("wyp_rand", t),
          a.searchParams.set("yellow_pencil_frame", "true"),
          o.urlParam("wyp_out") && a.searchParams.set("wyp_out", "true")),
        o.post(a).always(function (t, a, n) {
          var s = n.status;
          if (((window.isDynamicSelectorsReady = !0), 200 != s)) return !1;
          for (
            var o = Xi(e).diff(Xi(t)), r = Vi(e).diff(Vi(t)), l = 0;
            l < o.length;
            l++
          )
            -1 != window.plugin_classes_list.indexOf(o[l]) && delete o[l];
          for (l = 0; l < r.length; l++)
            -1 != window.plugin_classes_list.indexOf(r[l]) && delete r[l];
          (window.idList = o.filter(Boolean)),
            (window.ClassList = r.filter(Boolean));
        });
    })(),
    N(),
    !0 !== window.bMode && yp_js_hook();
})(jQuery);
