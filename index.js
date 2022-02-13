  //<div id="index"></div>
 

    var emIndex = document.getElementById('index');
    emIndex.innerHTML = `<div id="result-text"></div>
  <div class="grid-post">
    <div id="feed-container" class="grid-posts"></div>
  </div>
  <div class="loadMore">
    <div class="loadMorePosts">
        <div id="feed-nav"></div>
    </div>
    </div>`;

      var emSearch =`<div id="advanced-search" div class="layout-advanced-search">
    <header>
        <h2>البحث المتقدم</h2>
    </header>
    <section class="container-input">
      <form id="post-search">
        <input id="feed-q" placeholder="ابحث هنا . . ." type="search" />
        <button>بحث</button>
      </form>
    <div class="post-order">
        <select id="feed-order">        
            <option selected="selected" value="published">الترتيب</option>
          <option  value="published">الجديد</option>
          <option value="updated">الأحدث</option>
        </select>
    </div>
      <div class="feed-label">
        <select disabled="" id="label-sorter">
          <option selected="">التصنيف</option>
        </select>
      </div>
    </section>
  </div>`;
      document.querySelector('.main-wrapper').insertAdjacentHTML( 'beforebegin', emSearch);
      document.body.classList.add('index');
      document.getElementById('item-post-wrap').setAttribute('id','');
    var loadSEOLive,
      loadCategories,
      index_seolive = {
        init:  () =>{
          var config = {
              homeURL: window.location.origin,
              maxResults: 16,
              numChars: 270,
              thumbWidth: 300,
              thumbHeight: 95,
              navText: "عرض المزيد",
              resetText: "<span style='color: #e91e63; text-decoration: underline; '>إعادة ضبط</span>",
              noImage: noThumbnail??'',
              loading: "<div id='loader' style='display: block'><span>جاري العرض ...</span></div>",
              counting: "<div>جاري العرض ...</div>",
              searching: "<span>بحث . . .</span>",
            },
            w = window,
            d = document,
            el =  (id)=> {
              return d.getElementById(id);
            },
            o = {
              a: el("feed-order"),
              b: el("label-sorter").parentNode,
              c: el("post-search"),
              d: el("feed-q"),
              e: el("result-text"),
              f: el("feed-container"),
              g: el("feed-nav"),
              h: d.getElementsByTagName("head")[0],
              i: 0,
              j: null,
              k: "published",
              l: 0,
              m: "",
            },
            fn = {
              a: function () {
                old = el("tem-script");
                old.parentNode.removeChild(old);
              },
              b: function (param) {
                var script = d.createElement("script");
                script.type = "text/javascript";
                script.id = "tem-script";
                script.src = param;
                if (el("tem-script")) fn.a();
                o.h.appendChild(script);
              },
              c: function (mode, tag, order) {
                o.i++;
                o.e.innerHTML = config.counting;
                o.g.innerHTML = config[mode == 1 ? "searching" : "loading"];
                if (mode === 0) {
                  fn.b(
                    tag !== null
                      ? config.homeURL +
                          "/feeds/posts/summary/-/" +
                          tag +
                          "?alt=json-in-script&start-index=" +
                          (o.i * config.maxResults + 1) +
                          "&max-results=" +
                          config.maxResults +
                          "&orderby=" +
                          order +
                          "&callback=loadSEOLive"
                      : config.homeURL +
                          "/feeds/posts/summary?alt=json-in-script&start-index=" +
                          (o.i * config.maxResults + 1) +
                          "&max-results=" +
                          config.maxResults +
                          "&orderby=" +
                          order +
                          "&callback=loadSEOLive"
                  );
                } else if (mode == 1) {
                  fn.b(
                    config.homeURL +
                      "/feeds/posts/summary?alt=json-in-script&start-index=" +
                      (o.i * config.maxResults + 1) +
                      "&max-results=" +
                      config.maxResults +
                      "&q=" +
                      tag +
                      "&orderby=" +
                      order +
                      "&callback=loadSEOLive"
                  );
                }
                o.j = tag !== null ? tag : null;
                o.l = mode;
                o.a.disabled = true;
                o.b.children[0].disabled = true;
              },
              d: function (json) {
                var _h;
                o.g.innerHTML = "";
                o.e.innerHTML =
                  o.l == 1
                    ? "<span>نتائج البحث عن  <b>&#8220;" +
                      o.m +
                      "&#8221;</b> (" +
                      json.feed.openSearch$totalResults.$t +
                      "نتيجة)</span>"
                    : "<div>المجموع :  " +
                      json.feed.openSearch$totalResults.$t +
                      " </div>";
                if ("entry" in json.feed) {
                  var a = json.feed.entry,
                    b,
                    c,
                    _d,
                    e = "0 تعليق",
                    f = "",
                    g;
                  for (var i = 0; i < config.maxResults; i++) {
                    if (i == a.length) break;
                    b = a[i].title.$t;
                    _d =
                      "summary" in a[i]
                        ? a[i].summary.$t
                            .replace(/<br ?\/?>/gi, " ")
                            .replace(/<(.*?)>/g, "")
                            .replace(/<iframe/gi, "")
                            .substring(0, config.numChars)
                        : "";
                    g =
                      "media$thumbnail" in a[i]
                        ? a[i].media$thumbnail.url
                            .replace(/.*?:\/\//g, "//")
                            .replace(/s[0-9]+\-c/,"s" +  config.thumbWidth  + "-c")
                        : config.noImage.replace(/s[0-9]+\-c/,"s" +  config.thumbWidth  + "-c");
                    for (var j = 0, jen = a[i].link.length; j < jen; j++) {
                      c =
                        a[i].link[j].rel == "alternate"
                          ? a[i].link[j].href
                          : "#";
                    }
                    for (var k = 0, ken = a[i].link.length; k < ken; k++) {
                      if (
                        a[i].link[k].rel == "replies" &&
                        a[i].link[k].type == "text/html"
                      ) {
                        e = a[i].link[k].title;
                        break;
                      }
                    }
                    _h = d.createElement("div");
                    _h.classList.add('blog-posts-hostry')
                    _h.innerHTML =
                      `<div class="blog-post hentry index-post">
                        <div class="post-image-wrap">
                            <div class="posts-thumb">
                            <a href="${c}" target="_blank">
                                <img
                                class="post-thumb"
                                style="width:/${config.thumbWidth}px;height:/${config.thumbHeight}px;"
                                src="${g}"
                                alt="${b}"
                                />
                            </a>
                            </div>
                        </div>
                        <div class="post-info">
                            <h3 class="post-title">
                            <a class="entry-title" href="${c}" target="_blank" itemprop="name"
                                >${_d}</a
                            >
                            </h3>
                        </div>
                        </div>
                        `;
                    o.f.appendChild(_h);
                  }
                  _h = d.createElement("a");
                  _h.href = "#load-more";
                  _h.innerHTML = config.navText;
                  _h.onclick = function () {
                    fn.c(o.l, o.j, o.k);
                    return false;
                  };
                } else {
                  _h = d.createElement("a");
                  _h.href = "#reset-content";
                  _h.innerHTML = config.resetText;
                  _h.onclick = function () {
                    o.i = -1;
                    o.e.innerHTML = config.counting;
                    o.f.innerHTML = "";
                    fn.c(0, null, "published");
                    o.a.innerHTML = o.a.innerHTML;
                    o.b.children[0].innerHTML = o.b.children[0].innerHTML;
                    return false;
                  };
                }
                o.g.appendChild(_h);
                o.a.disabled = false;
                o.b.children[0].disabled = false;
              },
              e: function (json) {
                var a = json.feed.category,
                  b =
                    '<select id="label-sorter"><option value="" selected >التصنيف</option>';
                for (var i = 0, len = a.length; i < len; i++) {
                  b +=
                    '<option value="' +
                    encodeURIComponent(a[i].term) +
                    '">' +
                    a[i].term.toLowerCase() +
                    "</option>";
                }
                b += "</select>";
                o.b.innerHTML = b;
                o.b.children[0].onchange = function () {
                  o.i = -1;
                  o.f.innerHTML = "";
                  o.g.innerHTML = config.loading;
                  var myValue = this.value !=""?this.value:null;
                  fn.c(0, myValue, o.k);
                };
              },
            };
          loadSEOLive = fn.d;
          loadCategories = fn.e;
          fn.b(
            config.homeURL +
              "/feeds/posts/summary?alt=json-in-script&start-index=" +
              (o.i + 1) +
              "&max-results=" +
              config.maxResults +
              "&orderby=published&callback=loadSEOLive"
          );
          fn.b(
            config.homeURL +
              "/feeds/posts/summary?alt=json-in-script&max-results=0&orderby=published&callback=loadCategories"
          );
          o.a.onchange = function () {
            o.i = -1;
            o.f.innerHTML = "";
            o.g.innerHTML = config.counting;
            o.b.children[0].innerHTML = o.b.children[0].innerHTML;
            fn.c(0, null, this.value);
            o.k = this.value;
          };
          o.c.onsubmit = function () {
              if(o.d.value !=""){
                o.i = -1;
            o.f.innerHTML = "";
            o.m = o.d.value;
            fn.c(1, o.d.value, o.k);
              }else{
                o.i = -1;
                    o.e.innerHTML = config.counting;
                    o.f.innerHTML = "";
                    fn.c(0, null, "published");
                    o.a.innerHTML = o.a.innerHTML;
                    o.b.children[0].innerHTML = o.b.children[0].innerHTML;
              }
            return false;
          };
        },
      };
      
      index_seolive.init();
