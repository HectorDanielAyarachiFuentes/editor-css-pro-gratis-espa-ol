"use strict";

// Close
if (document.body.classList.contains('yp-yellow-pencil')) {
	var url = new URL(window.location);
	url.searchParams.delete("wyp");
	window.location.replace(url);

// Open
}else{

    fetch(chrome.runtime.getURL('editor.html'))
        .then(response => response.text())
        .then(editorHtml => {
            // Replace placeholders with actual URLs
            editorHtml = editorHtml.replace(/%%EDITOR_URL%%/g, chrome.runtime.getURL('editor/'));

            document.open();
            document.write(editorHtml);
            document.close();

            // Vars
            window.bMode = true;

            // Update loading notes.
            var oldP = 0;
            function wyp_load_note(text, p){
                if(window.loadStatus == false && oldP < p){
                    if(text){
                        document.querySelector('.loading-files').innerHTML = text;
                    }
                    document.querySelector('#loader i').style.width = p + "%";
                    oldP = p;
                }
            }

            // Reload the page after browser undo & undo
            if (!!window.performance && window.performance.navigation.type === 2) {
                wyp_load_note("Reloading Editor", "0");
                window.location.reload();
            }

            // Variable
            window.loadStatus = false;

            // Document Load Note:
            wyp_load_note("Loading Editor", "20");

            setTimeout(function(){
                wyp_load_note(null, "23");
            }, 300);

            setTimeout(function(){
                wyp_load_note(null, "26");
            }, 600);

            setTimeout(function(){
                wyp_load_note(null, "29");
            }, 900);

            // Document ready.
            (function() {

                var iframeNode = document.getElementById('iframe');

                // Load iframe.
                if(window.bMode){
                    iframeNode.contentWindow.location.replace(window.location.href);
                }else{
                iframeNode.contentWindow.location.replace(iframeNode.getAttribute("data-href"));
                }

                // 33%
                wyp_load_note("Loading Page", "33");

                setTimeout(function(){
                    wyp_load_note(null, "33");
                }, 600);

                setTimeout(function(){
                    wyp_load_note(null, "36");
                }, 900);

                // Frame ready
                var iframeReady = false;
                iframeNode.addEventListener("load", function() {

                    // check if iframe URL is not valid.
                    try {
                        var iframeURL = document.getElementById("iframe").contentWindow.location.href;
                    } catch(e) {
                        alert("This page does not allow to use of the editor.");
                        if(window.bMode){window.location.reload();}
                        return false;
                    }

                    // b mode
                    if(iframeReady && window.bMode){
                        alert("This page cannot be edited as it is redirected. Please open the redirected page directly in the editor.");
                        window.location.href = iframeURL;
                    }

                    // if iframe redirect : follow
                    if(window.bMode !== true){
                        if(iframeReady || iframeURL.indexOf("yellow_pencil_frame") == -1){

                            // show loading
                            document.querySelector(".wyp-iframe-loader").style.display = "block";
                            document.querySelector(".loading-files").innerHTML = "Page was redirected!";
                            window.wyp_redirect_on = true;

                            // Get parent url
                            var parentURL = window.location;

                            // delete after href.
                            parentURL = parentURL.toString().split("href=")[0] + "href=";

                            // Clean url
                            iframeURL = new URL(iframeURL);
                            iframeURL.searchParams.delete("yellow_pencil_frame");
                            iframeURL.searchParams.delete("wyp_page_id");
                            iframeURL.searchParams.delete("wyp_page_type");
                            iframeURL.searchParams.delete("wyp_mode");
                            iframeURL.searchParams.delete("wyp_load_popup");
                            iframeURL.searchParams.delete("wyp_rand");
                            iframeURL.searchParams.delete("wyp_out");

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", iframeURL, true);
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                            xhr.onreadystatechange = function () {
                                if (this.readyState != 4) return;

                                if (this.status == 200) {

                                            // Find page details
                                            var data = document.createElement("div");
                                            data.insertAdjacentHTML('beforeend', this.responseText);
                                            data = data.querySelector('#wyp_page_details').innerHTML;

                                            // same like fail
                                            if(data === undefined || data === null){
                                                alert("Page information cannot be retrieved.");
                                                return false;
                                            }

                                            // find all
                                            var pageID = data.split("|")[0];
                                            var pageTYPE = data.split("|")[1];
                                            var pageMODE = data.split("|")[2];

                                            // Update result URL
                                            iframeURL = iframeURL.toString().replace(/.*?:\/\//g, ""); // delete protocol
                                            iframeURL = encodeURIComponent(iframeURL); // encode url
                                            parentURL = parentURL + iframeURL + "&wyp_page_id="+pageID+"&wyp_page_type="+pageTYPE+"&wyp_mode=" + pageMODE; // update parent URL

                                            // GO
                                            window.location = parentURL;


                                }else{
                                        alert("Page information cannot be retrieved.");
                                    }

                            };

                            xhr.send("wyp_get_details=true");

                            return false;

                        }
                    }

                    iframeReady = true;

                    // Variables
                    var iframe = (iframeNode.contentWindow.document || iframeNode.contentDocument);
                    var iframeHead = iframe.head;
                    var iframeBody = iframe.body;


                    // Moving styles to iframe
                    var editorData = document.querySelector("#yellow-pencil-iframe-data");
                    if(editorData !== null){
                        iframeHead.insertAdjacentHTML('beforeend', editorData.innerHTML.replace(/(^\<\!\-\-|\-\-\>$)/g, ""));
                        document.body.removeChild(editorData);
                        iframeBody.insertAdjacentHTML('beforeend', '<div id="wyp-animate-data">'+iframeHead.querySelector("#wyp-animate-data").innerHTML+'</div>');
                        iframeHead.removeChild(iframeHead.querySelector("#wyp-animate-data"));
                    }

                    // CSS Loader
                    function wyp_load_style(link, i, length){

                        var style = document.createElement('link');
                        style.rel = "stylesheet";
                        style.href = link;
                        style.async = false;
                        document.head.appendChild(style);

                        style.onload = function(){
                            wyp_load_note("Loading Styles", 39 + parseInt(21*i/(length - 1)));
                        };

                    }

                    // Loading The Styles
                    var styles = [
                        "//fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto:wght@400;500&display=swap",
                        chrome.runtime.getURL('editor/') + "css/yellow-pencil.css?wypver=7.6.0"
                    ];

                    // Load styles in iframe
                    iframeHead.insertAdjacentHTML('beforeend', "<link rel='stylesheet' id='yellow-pencil-frame'  href='"+chrome.runtime.getURL('editor/')+"css/frame.css?wypver=7.6.0' type='text/css' media='all' />");

                    // Loading.
                    for(var i = 0; i < styles.length; i++){
                        wyp_load_style(styles[i], i, styles.length);
                    }

                    var scripts = [
                        chrome.runtime.getURL('editor/') + "js/ace/editor.js?wypver=7.6.0",
                        chrome.runtime.getURL('editor/') + "js/interface.js?wypver=7.6.0",
                        chrome.runtime.getURL('editor/') + "js/ace/ace.js?wypver=7.6.0",
                        chrome.runtime.getURL('editor/') + "js/ace/ext-language_tools.js?wypver=7.6.0",
                        chrome.runtime.getURL('editor/') + "js/addons.js?wypver=7.6.0",
                        chrome.runtime.getURL('editor/') + "js/yellow-pencil.js?wypver=7.6.0"
                    ];

                    // Stop load and call editor function.
                    function wyp_start_editor(){

                        // Ready!:
                        wyp_load_note("Ready!", "100");

                        // Set true.
                        window.loadStatus = true;

                        if(window.bMode){
                            document.querySelector("#customizing-mode .type-heading").innerHTML = window.location.hostname;
                        }

                        setTimeout(function(){
                            var addClasses = ["yp-yellow-pencil", "yellow-pencil-ready"];

                            if(window.bMode){
                                addClasses.push("wyp-b-mode");
                            }

                            for(var i = 0; i < addClasses.length; i++){
                                document.body.classList.add(addClasses[i]);
                                iframeBody.classList.add(addClasses[i]);
                            }

                            document.querySelector(".wyp-iframe-loader").style.display = 'none';

                            document.querySelector("#iframe").focus();

                        }, 350);

                    }

                    // JS loader - loads scripts sequentially
                    function wyp_load_script(i) {
                        // When all scripts are loaded, start the editor
                        if (i >= scripts.length) {
                            setTimeout(function() {
                                wyp_start_editor();
                            }, 0);
                            return;
                        }

                        var src = scripts[i];
                        var script = document.createElement('script');
                        script.src = src;
                        script.async = false;
                        document.head.appendChild(script);

                        script.onload = function(){
                            wyp_load_note("Loading Scripts", 60 + parseInt(38 * i / (scripts.length - 1)));
                            // Load the next script
                            wyp_load_script(i + 1);
                        };
                    }

                    // Load scripts
                    wyp_load_script(0);

                }); // iframe ready

                // Javascript hook for call in editor
                window.yp_js_hook = function() {
                                    };

            })();
        })
        .catch(error => {
            console.error('Error loading editor.html:', error);
            alert('Failed to load editor interface.');
        });

} // End of if