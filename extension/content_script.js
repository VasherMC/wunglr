
function NodeAddedObserver(f) {
	return new MutationObserver(mutations => {
		for (const m of mutations) {
			if (m.addedNodes.length == 0) continue;
			const added = m.addedNodes[0];
			if (added.nodeType == Node.ELEMENT_NODE && f(added)) break;
		}
	});
}

const post_listener = NodeAddedObserver(added => {
	if (added.querySelector("[data-id]")) {
		// temporarily remove the observer while we're modifying the DOM
		post_listener.disconnect();
		add_wungle_elems();
		post_listener.observe(
			document.querySelector("body"),
			{childList: true, subtree: true});
		return true;
	}
});

// TODO add another observer to call this when a post has been edited?
function updateFlippedWungle(block) {
	let wungle = String.fromCodePoint(...(block.textContent.match(/[\u{e0020}-\u{e007e}]/gu)??[]).map(c=>c.codePointAt(0)-0xe0000));
	/* wungle div first, since readmores are added at the end */
	let wungleElem = block.firstChild;
	if (wungleElem && wungleElem.classList.contains("flipped-wungle")) {
		wungleElem.innerText = wungle;
	} else {
		wungleElem = document.createElement("div");
		wungleElem.className = "flipped-wungle k31gt"; /* k31gt=textblock (margin/padding) */
		wungleElem.innerText = wungle;
		block.insertBefore(wungleElem, block.firstChild);
	}
}


function add_wungle_elems(){
	/* dashboard has 1 extra div in the tree compared to blog-view on the dashboard */
	document.querySelectorAll(`
  [data-id] article >div>div>div>span:not(:has(div>div[role="link"] div[aria-label="avatar"])):not(.wunglr-post),
  [data-id] article >div>div>div>span>div>div[role="link"]+div:not(.wunglr-post),
  [data-id] article     >div>div>span:not(:has(div>div[role="link"] div[aria-label="avatar"])):not(.wunglr-post),
  [data-id] article     >div>div>span>div>div[role="link"]+div:not(.wunglr-post)
`).forEach(block => {
		block.classList.add("wunglr-post");
		updateFlippedWungle(block);
	});
	/* Individual text blocks got parsed; now add the flip button to each post */
	document.querySelectorAll(`[data-id]:not(.wunglr-done)`).forEach(post=>{
		post.classList.add("wunglr-done");
		let btn_sec = post.querySelector("header[role] span:has(>button)");
		if (!btn_sec) return;
		let btn_el = document.createElement("button");
		btn_el.innerText = "↶W";
		btn_el.type = "button";
		btn_el.name = "wungle";
		btn_el.onclick = (e) => post.classList.toggle("wungled");
		btn_sec.insertBefore(btn_el, btn_sec.firstChild);
	});
}

post_listener.observe(document.querySelector("body"), {childList: true, subtree: true});

window.addEventListener("load", add_wungle_elems);


/* ------------------------- Editor functionality ------------------------- */

const wungle = (str)=>str.replaceAll(/[\x20-\x7e]/gu,
	c=>String.fromCodePoint(c.codePointAt(0) + 0xe0000));
const unwungle = (str)=>str.replaceAll(/[\u{e0020}-\u{e007e}]/gu,
	c=>String.fromCodePoint(c.codePointAt(0) - 0xe0000));

const apply_text_transform = f => e => {
	let sel = window.getSelection();
	/* use document.execCommand for undo/redo */
	sel.focusNode.parentElement.focus();
	document.execCommand("insertText", false, f(sel.toString()));
	e.stopPropagation();
};

function makeEditButton(txt, callback, aria) {
	let b = document.createElement("button");
	b.type = "button";
	b.innerText = txt;
	b.onclick = callback;
	b.style = "width:auto; padding:0 4px 0 4px;";
	if (aria) { b.setAttribute("aria-label", aria); b.setAttribute("title", aria); }
	return b;
}

const editor_listener = NodeAddedObserver(added => {
	let btn_container;
	if (btn_container = added.querySelector("button[aria-haspopup='menu']+div+div")) {
		let classname = btn_container.lastElementChild.className;
		let btn1 = makeEditButton("W↷", apply_text_transform(wungle), "Hide (Wungle)");
		let btn2 = makeEditButton("↶W", apply_text_transform(unwungle), "Unhide (Unwungle)");
		btn1.className = classname;
		btn2.className = classname;
		btn_container.append(btn1, btn2);
		return true;
	}
});
editor_listener.observe(document.querySelector("body"), {childList: true, subtree: true});