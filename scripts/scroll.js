const scroll = (ev)=>{
	ev.preventDefault();
	const tgt = ev.target,
				href = tgt.getAttribute('href'),
				elem = href != '#' ? document.querySelector(href):null,
				speed = 3;
	let rect = {},
			top = {},
			move = 0;
	if(elem != null){
		rect = {
			elem: elem.getBoundingClientRect(),
			tgt: tgt.getBoundingClientRect()
		}
		top={
			start: rect.tgt.top + window.pageYOffset,
			end: rect.elem.top + window.pageYOffset
		}
	}else{
		top={
			start: tgt.getBoundingClientRect().top + window.pageYOffset,
			end: 0
		}
	}
	const start = ()=>{
		const preLocation ={
			top: window.pageYOffset,
			end: window.pageYOffset + window.innerHeight
		};
		move = (top.start - top.end < 0) ? Math.max((top.end - preLocation.top) / (speed*5), 2):Math.min((top.end - preLocation.top) / (speed*5), -2)
		window.scrollBy(0, move);
		if(top.start - top.end > 0 ? preLocation.top >= top.end:preLocation.top <= top.end && preLocation.end < document.body.clientHeight){
			requestAnimationFrame(start);
		}
	}
	start();
}

const init = ()=>{
	document.querySelectorAll('.js-scroll').forEach(e=>{
		e.addEventListener('click', ev=>{
			scroll(ev);
		});
	});
}

document.addEventListener('DOMContentLoaded', init, false);
