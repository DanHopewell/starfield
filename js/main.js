var _l = function(text) { console.log('App:: ' + text) };

var star = function(container, document, undefined) {
		var element = null,

			// private
			size = 35,
			speed = 0.02,
			accel = 1.05,
			alive = true,
			currentProps = {},
			endProps = {},
			increments = {},
			rgb = '255, 255, 255',
			bird = false,
			nyan = false,
			doge = false,
			jim = false,

			// public
			create = function() {
				init();
				addToDom();
				putSomethingOnIt();
				setStyle();
			},
			update = function() {
				if (alive) {
					for (var prop in currentProps) {
					    if ( currentProps.hasOwnProperty(prop) ) {
					    	currentProps[prop] += increments[prop];
					    	increments[prop] *= accel;
					    }
					}
					setStyle();
					if (currentProps.w >= endProps.w) {
						alive = false;
					}
				}
			},
			reset = function() {
				init();
				putSomethingOnIt();
				setStyle();
				alive = true;
			},
			isAlive = function() {
				return alive;
			},
			toggleCharacter = function(character) {
				eval(character + ' = !' + character);
			},
			// speedUp = function() {
			// 	var c = 1.25;
			// 	speed *= c;
			// 	for (var prop in increments) {
			// 	    if ( increments.hasOwnProperty(prop) ) {
			// 	    	increments[prop] *= c;
			// 	    }
			// 	}
			// },
			// slowDown = function() {
			// 	var c = 0.8;
			// 	speed *= c;
			// 	for (var prop in increments) {
			// 	    if ( increments.hasOwnProperty(prop) ) {
			// 	    	increments[prop] *= c;
			// 	    }
			// 	}
			// },
			sizeUp = function() {
				size++;
			},
			sizeDown = function() {
				if (size > 1) {
					size--;
				}
			},

			// private
			randInt = function(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			plusMinus = function() {
				return Math.random() < 0.5 ? -1 : 1;
			},
			inc = function(start, end) {
				return (end - start) * speed;
			},
			init = function() {
				currentProps.x = 50;
				currentProps.y = 50;
				currentProps.w = 1;
				currentProps.h = 1;
				currentProps.opacity = 0;

				endProps.w = size;
				endProps.h = size;
				endProps.opacity = 1;
				if (randInt(0,1)) {
					endProps.x = randInt(0,1) * 130 - 15;
					endProps.y = currentProps.y - ( randInt(0,65) * plusMinus() );
				} else {
					endProps.x = currentProps.x - ( randInt(0,65) * plusMinus() );
					endProps.y = randInt(0,1) * 130 - 15;
				}

				for (var prop in currentProps) {
				    if (currentProps.hasOwnProperty(prop)) {
				    	increments[prop] = inc(currentProps[prop], endProps[prop]);
				    }
				}
			},
			addToDom = function() {
				element = document.createElement("div");
				// element.classList.add("bird-on-it");
				// if ( bird && Math.random() > 0.75 ) {
				// 	element.classList.add("bird-on-it");
				// }
				container.appendChild(element);
			},
			putSomethingOnIt = function() {
				element.className = "star";
				switch ( randInt(1,4) ) {
					case 1:
						if (bird) {
							element.classList.add("bird-on-it");
						}
						break;
					case 2:
						if (nyan) {
							element.classList.add("nyan-on-it");
						}
						break;
					case 3:
						if (doge) {
							element.classList.add("doge-on-it");
						}
						break;
					case 4:
						if (jim) {
							element.classList.add("jim-on-it");
						}
						break;
				}
			},
			setStyle = function() {
				element.style.left = currentProps.x + '%';
				element.style.top =  currentProps.y + '%';
				element.style.width = currentProps.w + 'px';
				element.style.height = currentProps.h + 'px';
				element.style.backgroundColor = 'rgba(' + rgb + ', ' + currentProps.opacity + ')';
			};

		create();

		// star object interface
		return {
			element : element,
			create : create,
			update : update,
			reset : reset,
			alive : isAlive,
			toggleCharacter : toggleCharacter,
			sizeUp : sizeUp,
			sizeDown : sizeDown
		};
	},

	starfield = function(id, document, undefined) {
		var stars = [],
			self = document.getElementById(id),
			play = true,
			frameCount = 0,
			frameRate = 2,
			spawnRate = 2,
			spawnMax = 6,
			numStars = 0,

			keydown = function(e) {
				_l(e.keyCode);
				switch (e.keyCode) {
					case 32:
						playPause();
						break;
					case 39:
						speedUp();
						break;
					case 37:
						slowDown();
						break;
					case 38:
						sizeUp();
						break;
					case 40:
						sizeDown();
						break;
					case 66:
						character('bird');
						break;
					case 68:
						character('doge');
						break;
					case 78:
						character('nyan');
						break;
					case 74:
						character('jim');
						break;
				}
			}

			playPause = function() {
				play = !play;
				if (play) {
					animate();
				}
			},
			speedUp = function() {
				if (frameRate > 1) {
					frameRate--;
				}
			},
			slowDown = function() {
				frameRate++;
			},
			sizeUp = function() {
				for (var i = stars.length - 1; i >= 0; i--) {
					stars[i].sizeUp();
				};
			},
			sizeDown = function() {
				for (var i = stars.length - 1; i >= 0; i--) {
					stars[i].sizeDown();
				};
			},
			character = function(character) {
				for (var i = stars.length - 1; i >= 0; i--) {
					stars[i].toggleCharacter(character);
				};
			}
			createStar = function() {
				for (var i = stars.length - 1; i >= 0; i--) {
					if ( !stars[i].alive() ) {
						stars[i].reset();
						return;
					}
				}
				stars.push( star(self, document) );
			},
			update = function() {
				for (var i = stars.length - 1; i >= 0; i--) {
					if (i + 1 > numStars) {
						numStars = i + 1;
						_l(numStars + ' star objects');
					}
					stars[i].update();
				};
			},
			spawn = function() {
				for (var i = Math.ceil(Math.random() * spawnMax); i >= 0; i--) {
					createStar();
				}
			},
			animate = function() {
				if (play) {
					if (frameCount % frameRate === 0) {
						update();
					}
					if (frameCount % spawnRate === 0) {
						spawn();
					}
					frameCount++;
					// if (frameCount < 100) {
					// 	requestAnimationFrame(animate);
					// }
					requestAnimationFrame(animate);
				}
			};

			animate();

			return {
				keydown : keydown
			}		

	}('starfield', document);

window.addEventListener("keydown", starfield.keydown, false);
