//* TITLE wunglr **//
//* VERSION 1.0.0 **//
//* DESCRIPTION	The hidden side of tumblr **//
//* DEVELOPER VasherMC **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.wunglr = new Object({

	running: false,

	run: function() {
		this.running = true;
		XKit.tools.init_css("wunglr");
		XKit.post_listener.add("wunglr", this.add_wungle_elems);
		this.add_wungle_elems();
	},

	add_wungle_elems: function(){
		/* dashboard has 1 extra div in the tree compared to blog-view on the dashboard */
		document.querySelectorAll(`
  [data-id] article >div>div>div>span:not(:has(div>div[role="link"] div[aria-label="avatar"])):not(.wunglr-post),
  [data-id] article >div>div>div>span>div>div[role="link"]+div:not(.wunglr-post),
  [data-id] article     >div>div>span:not(:has(div>div[role="link"] div[aria-label="avatar"])):not(.wunglr-post),
  [data-id] article     >div>div>span>div>div[role="link"]+div:not(.wunglr-post)
`).forEach(block => {
			block.classList.add("wunglr-post");
			let wungle = String.fromCodePoint(...block.textContent.matchAll(/[\u{e0020}-\u{e007e}]/gu).map(a=>a[0].codePointAt(0)-0xe0000));
			let wungleElem = document.createElement("div");
			wungleElem.className = "k31gt"; /* text block (for margin/padding) */
			wungleElem.innerText = wungle;
			block.insertBefore(wungleElem,block.firstChild); /* put first, since readmores are added at the end */
		});
		/* Individual post blocks got parsed; now add the button for each post to toggle Wungler */
		document.querySelectorAll(`[data-id]:not(.wunglr-done)`).forEach(post=>{
			post.classList.add("wunglr-done");
			let btn_sec = post.querySelector("header[role] span:has(>button)");
			let btn_el = document.createElement("button");
			btn_el.innerText = "↶W";
			btn_el.type = "button";
			btn_el.name = "wungle";
			btn_el.onclick = (e) => post.classList.toggle("wungled");
			btn_sec.insertBefore(btn_el, btn_sec.firstChild);
		});
	},

	destroy: function() {
		XKit.post_listener.remove("wunglr");
		document.querySelectorAll(".wunglr-post").forEach(block => {
			block.classList.remove("wunglr-post");
			block.removeChild(block.firstChild); /*the wungle*/
		});
		document.querySelectorAll(".wunglr-done").forEach(post => {
			post.classList.remove("wunglr-done");
			post.classList.remove("wungled");
			let btn_sec = post.querySelector("header[role] span:has(>button)");
			btn_sec.removeChild(btn_sec.firstChild); /* Wungle Button */
		});
		XKit.tools.remove_css("wunglr");
		this.running = false;
	}
});
