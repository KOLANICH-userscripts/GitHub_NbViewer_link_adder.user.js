// ==UserScript==
// @name GitHub_NBViewer_link_added
// @namespace GitHub_NbViewer_link_adder
// @description Adds a link to https://nbviewer.org to IPython notebooks
// @author KOLANICH
// @homepageURL https://nbviewer.org
// @version 0.1
// @license Unlicense
// @grant GM.getResourceUrl
// @run-at document-idle
// @include /^https://github\.com/.+\.ipynb(\?.+)?$/
// @icon https://nbviewer.org/favicon.ico
// @resource NBViewer_Icon https://nbviewer.org/favicon.ico
// ==/UserScript==

// WARNING: If you use ViolentMonkey, replace `GM.getResourceUrl` with `GM.getResourceURL` (https://github.com/violentmonkey/violentmonkey/issues/1403)

var downloadButton = document.getElementById("raw-url");
let l = window.location.pathname;

if (downloadButton && l.substring(l.length - 6).toLowerCase() == ".ipynb") {
	GM.getResourceUrl("NBViewer_Icon").then(iconURI => {
		let nbviewerIcon = document.createElement("IMG");
		nbviewerIcon.src = iconURI;

		var newLink = document.createElement("A");
		newLink.className = "btn-sm btn BtnGroup-item";
		newLink.appendChild(nbviewerIcon);
		newLink.appendChild(document.createTextNode("Viewer"));

		newLink.href = "https://nbviewer.org/github/" + l.substring(1);

		downloadButton.parentElement.appendChild(newLink, downloadButton);
	});
}
