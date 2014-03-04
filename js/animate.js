	console.log();

	var title = $('#toonya');
	var svg  = $('svg');
	var chars = title.children();
	TweenMax.set(chars, {fill: '#fff'});

	var width = svg.outerWidth();
	var height = svg.outerHeight();
	var h = 735/svg.parent().width()*svg.parent().height();
/* 	console.log('svg:'+svg.width()+' '+svg.height()+'   h:'+h); */

	$('.transform').each(function(i,e) {
		TweenMax.set($(e), $(e).data());
	});

	var tl = new TimelineMax(),
		rough = RoughEase.ease.config({strength:2, clamp:true}),
		i;

	tl
	.set(chars, {autoAlpha:1})
	.addLabel('charFall',0.3)
	.addLabel('charYMove','+=3.1')
	.addLabel('charFadeOut',4.5)
	.addLabel('charFadeIn',6.7)
	.to(title, 1, {fillOpacity:0},9)
	.to(title, 1, {fillOpacity:1});


/* 	console.log(Math.random() * (1.5 - 0.5) + 0.5); */


/*
	for (i = 0; i < chars.length; i++) {
		tl.fromTo(chars[i], 3, {transformOrigin:"center -"+h+'px', z:0.1, rotation:((Math.random() < 0.5) ? 90 : -90)}, {rotation:0, ease:Elastic.easeOut}, 0.3 + i * 0.06);
		tl.to(chars[i], 0.6, {y:96,  ease:Bounce.easeOut}, 3.4 + Math.random() * 0.6);
		tl.to(chars[i], 0.6, {autoAlpha:0, ease:rough}, 4.5 + Math.random());
		tl.to(chars[i], 0.6, {autoAlpha:1, ease:rough}, 7 + Math.random());
	}
*/
	for (i = 0; i < chars.length; i++) {
		tl.fromTo(chars[i], 3, {transformOrigin:"center -"+h+'px', z:0.1, rotation:((Math.random() < 0.5) ? 90 : -90)}, {rotation:0, ease:Elastic.easeOut}, 'charFall+=' + i * 0.06);
		tl.to(chars[i], 0.6, {y:96,  ease:Bounce.easeOut}, 'charYMove+=' + Math.random() * 0.6);
		tl.to(chars[i], 0.6, {autoAlpha:0, ease:rough}, 'charFadeOut+=' + Math.random());
		tl.to(chars[i], 0.6, {autoAlpha:1, ease:rough}, 'charFadeIn+=' + Math.random());
	}


/*
	TweenMax.set(title, {y: '-=200'});


	for (i = 0; i < chars.length; i++) {
		var z = Math.random() * (1.2 - 0.8) + 0.8;
		TweenMax.set(chars[i], {transformOrigin:'center center', scale: z*z*z, fill: z * 0xffffff});
		TweenMax.to(chars[i], 2.5, {y: '+='+z*400, ease: Elastic.easeOut});
		chars.eq(i).attr('z',z);
	}

	TweenMax.to($('body'), 2.5, {backgroundPosition: '0 +=50px', onComplete: parallax});
*/




/*
	var tl_title = new TimelineMax();

	tl_title.to(title, 1, {x: '+=500', y: '-=500px', rotation: 3600, fillOpacity: 0, scale: 0 },9);

	TweenMax.staggerTo(chars, 0, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d", fill: Math.random() * 0xffffff}});


	TweenMax.set(title, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}});

	TweenMax.to(chars[0], 1, {z: -50, scale:1.5});
	TweenMax.to(title, .8, {rotationY: 20});
*/



	function parallax(){
		var origin = {
			x: 0,
			y: 0
		}
		$(window).mousemove(function(e){
			if(origin.x!=0 && origin.y!=0){
				var move = {
					x: (e.pageX - origin.x)*0.1,
					y: (e.pageY - origin.y)*0.1
				}

				//console.log(move.x>=0? '+='+move.x:'-='+(0-move.x));

				chars.each(function(i,e){
					var z = $(e).attr('z');
					var _move = {
						x: move.x*z*z*z*z*z,
						y: move.y*z*z*z*z*z
					}
					//console.log(_move.x+' '+_move.y);

					TweenMax.set($(e), {x: _move.x>=0? '+='+_move.x:'-='+(0-_move.x), y: _move.y>=0? '+='+_move.y:'-='+(0-_move.y)});
				})
				var background_position = {
						x: move.x>=0? '+='+move.x*0.05+'px':'-='+(0-move.x*0.05)+'px',
						y: move.y>=0? '+='+move.y*0.05+'px':'-='+(0-move.y*0.05)+'px'
					}

				TweenMax.set($('body'), {backgroundPosition: background_position.x+' '+background_position.y});

			}

			origin.x = e.pageX;
			origin.y = e.pageY;

		})
	}
