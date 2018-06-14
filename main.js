window.onload = function () {

    // Objects  --------------------------------------------------------------------------------------------------------
    var beef = document.getElementById('beef');
    var book = document.getElementById('book');
    var bookSpotCutting = document.getElementById('bookSpotCutting');
    var bookSpotFurnace = document.getElementById('bookSpotFurnace');
    var camera = document.getElementById('camera');
    var carrot = document.getElementById('carrot');
    var carrots = []
    for (i = 0; i < 4; i++) {
        carrots[i] = document.getElementById('carrot_' + i);
    }
    var carrotPositions = [0, 0, 0];
    var carrotCuts = [0, -1.8];
    var cursor = document.getElementById('cursor');
    var cuttingBoard = document.getElementById('cuttingBoard')
    var gases = [];
    for (i = 0; i < 5; i++) {
        gases[i] = document.getElementById('gas' + i);
    }
    ;
    var knife = document.getElementById('knife');
    var objectives = [];
    var onion = document.getElementById('onion');
    var onions = []
    for (i = 0; i < 5; i++) {
        onions[i] = document.getElementById('onion_' + i);
    }
    var onionPositions = [0, 0, 0, 0];
    var onionCuts = [0, 2.4];
    var pan = document.getElementById('pan');
    var scene = document.getElementById('scene');
    var sink_trigger = document.getElementById('sink_trigger');
    var spaghetti = document.getElementById('spaghetti');
    var spaghetPan = document.getElementById('spaghet-pan');
    var panwat = document.getElementById('pan-water');
    var tapButton = document.getElementById('tap_trigger');
    var text = document.getElementById('text');
    var textLines = [];
    var tomatoCan = document.getElementById('tomatoCan');
    var tomatoSauce = document.getElementById('tomatoSauce');

    // Placement cubes  ------------------------------------------------------------------------------------------------
    var panSpots = [];
    for (i = 0; i < 6; i++) {
        panSpots[i] = document.getElementById('panSpot' + i);
    }
    ;
    var panAddSpot = document.getElementById('panAddSpot');
    var spaghetPanAddSpot = document.getElementById('spaghetPanAddSpot');
    var beefCounterSpot = document.getElementById('beefCounterSpot');
    var beefFridgeSpot = document.getElementById('beefFridgeSpot');
    var knifeSpot = document.getElementById('knifeSpot');
    var carrotFridgeSpot = document.getElementById('carrotFridgeSpot');
    var onionFridgeSpot = document.getElementById('onionFridgeSpot');
    var cutSpot = document.getElementById('cutSpot');
    var tomatoCanFridgeSpot = document.getElementById('tomatoCanFridgeSpot');
    var tomatoCanCounterSpot = document.getElementById('tomatoCanCounterSpot');
    var spaghettiSpot = document.getElementById('spaghettiSpot');


    // Variables -------------------------------------------------------------------------------------------------------
    var beefCookingTime = 0;
    var spaghetCookingTime = 0;
    var gasActive = [false, false, false, false, false];
    var panHasSpaghetti = false;
    var panHasWater = false;
    var panInSink = false;
    var panPositionIndex = 5;
    var spaghetPanPositionIndex = 6;
    var tapOn = false
    var tomatoSauceInPan = false;


    // beef ------------------------------------------------------------------------------------------------------------
    beef.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '-0.7 -0.5 0');
            showBeefPositions();
        }
    });

    beefCounterSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
            scene.append(beef);
            beef.setAttribute('position', '-4.4 -2.1 -5');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        }
    });

    beefFridgeSpot.addEventListener('click', function () {
        if (beef.parentNode == cursor) {
            scene.append(beef);
            beef.setAttribute('position', '-10.5 -2.5 0.3');
            panAddSpot.setAttribute('visible', 'false');
            hideBeefPositions();
        };
    });

    function cookBeef() {
        if (panPositionIndex < 5 && gasActive[panPositionIndex] && beef.parentNode == pan) {
            beefCookingTime = beefCookingTime + 1;
            if (beefCookingTime > 5) {
                beef.setAttribute('src', 'Textures/groundbeefCooked.png');
            };
        };
    }

    function showBeefPositions() {
        beefCounterSpot.setAttribute('visible', 'true');
        beefFridgeSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    }

    function hideBeefPositions() {
        beefCounterSpot.setAttribute('visible', 'false');
        beefFridgeSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    }


    // Book ------------------------------------------------------------------------------------------------------------
    textLines.push('Place the pot in the sink');
    textLines.push('Fill it with water');
    textLines.push('Put it on the stove');
    textLines.push('And turn on the heat')
    for (var i = 0; i < textLines.length; i++) {
        objectives[i] = false;
    }
    updateText();
    function updateText() {
        text.setAttribute('value', isDone(0) + textLines[0] + '\n' + isDone(1) + textLines[1] + '\n' + isDone(2) + textLines[2] + '\n' + isDone(3) + textLines[3]);
    }

    function isDone(i) {
        if (objectives[i]) {
            return '[x]'
        }
        return '[ ]'
    }

    function objectiveCompleted(i) {
        if(i == 0 || objectives[i-1]) {
            objectives[i] = true;
            updateText();
        }
    }


    book.addEventListener('click', function () {
        if(!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '-0.7 -0.5 0');
            this.setAttribute('rotation', '-4.846 90 -10.420');
            this.setAttribute('scale', '3 3 3');
            showBookPositions();
        }
    });

    bookSpotCutting.addEventListener('click', function () {
        scene.append(book);
        book.setAttribute('position', '-1.673 -1.559 5.400');
        book.setAttribute('rotation', '-4.846 -106.707 -10.420"');
        hideBookPositions();
    });

    bookSpotFurnace.addEventListener('click', function () {
        scene.append(book);
        hideBookPositions();
    });

    function showBookPositions() {
        bookSpotCutting.setAttribute('visible', 'true');
        bookSpotFurnace.setAttribute('visible', 'true');
    }

    function hideBookPositions() {
        bookSpotCutting.setAttribute('visible', 'false');
        bookSpotFurnace.setAttribute('visible', 'false');
    }


    // Carrot   --------------------------------------------------------------------------------------------------------
    carrot.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this)
            this.setAttribute('position', '-0.7 -0.5 0');
            showCarrotPositions();
            loadCarrotPositions()
        };

        if (knife.parentNode == cursor
            && this.parentNode == cuttingBoard
            && carrotCuts[0] < 3) {
            carrots[carrotCuts[0]].setAttribute('position', carrotCuts[1] + ' 0 0');
            carrotCuts[0] += 1;
            carrotCuts[1] += 0.6;
            saveCarrotPositions();
            cuttingSound();
        };
    });

    carrotFridgeSpot.addEventListener('click', function () {
        scene.append(carrot);
        hideCarrotPositions();
        loadCarrotPositions();
    });

    function showCarrotPositions() {
        carrotFridgeSpot.setAttribute('visible', 'true');
        cutSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideCarrotPositions() {
        carrotFridgeSpot.setAttribute('visible', 'false');
        cutSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };

    function saveCarrotPositions() {
        for (i = 0; i < 3; i++) {
            carrotPositions[i] = carrots[i].getAttribute('position').x;
        };
    };

    function loadCarrotPositions() {
        for (i = 0; i < 3; i++) {
            carrots[i].setAttribute('position', carrotPositions[i] + ' 0 0');
        };
    };


    // fridge   --------------------------------------------------------------------------------------------------------
    document.getElementById('fridgeDoor').addEventListener('click', function () {
        let anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'rotation');
        anim.setAttribute('dur', '2000');
        anim.setAttribute('easing', 'linear');
        if (this.getAttribute('rotation').y == 0) {
            anim.setAttribute('to', '0 90 0');
        } else {
            anim.setAttribute('to', '0 0 0');
        };
        this.append(anim);
    });


    // knife    --------------------------------------------------------------------------------------------------------
    knife.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '0.7 -0.5 0');
            this.setAttribute('rotation', '-90 90 -20')
            knifeSpot.setAttribute('visible', 'true');
        };
    });

    knifeSpot.addEventListener('click', function () {
        scene.append(knife);
        knifeSpot.setAttribute('visible', 'false');
    });


    // Onion   --------------------------------------------------------------------------------------------------------
    onion.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this)
            this.setAttribute('position', '-0.7 -0.5 0');
            showOnionPositions();
            loadOnionPositions()
        };

        if (knife.parentNode == cursor
            && this.parentNode == cuttingBoard
            && onionCuts[0] < 4) {
            console.log("doing this")
            onions[onionCuts[0]].setAttribute('position', '0 0 ' + onionCuts[1]);
            onionCuts[0] += 1;
            onionCuts[1] -= 0.6;
            saveOnionPositions();
            cuttingSound();
        };
    });

    onionFridgeSpot.addEventListener('click', function () {
        scene.append(onion);
        hideOnionPositions();
        loadOnionPositions();
    });

    function showOnionPositions() {
        onionFridgeSpot.setAttribute('visible', 'true');
        cutSpot.setAttribute('visible', 'true');
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideOnionPositions() {
        onionFridgeSpot.setAttribute('visible', 'false');
        cutSpot.setAttribute('visible', 'false');
        panAddSpot.setAttribute('visible', 'false');
    };

    function saveOnionPositions() {
        for (i = 0; i < 4; i++) {
            onionPositions[i] = onions[i].getAttribute('position').z;
        };
    };

    function loadOnionPositions() {
        for (i = 0; i < 4; i++) {
            onions[i].setAttribute('position', ' 0 0 ' + onionPositions[i]);
        };
    };


    // Pan  ------------------------------------------------------------------------------------------------------------
    pan.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '0.8 -0.5 0');
            showPanPositions();
            if (beef.parentNode == pan) {
                beef.setAttribute('position', '0.5 0 0.2');
            }
            if (carrot.parentNode == pan) {
                carrot.setAttribute('position', '.25 0 .2');
                loadCarrotPositions();
            }
            if (onion.parentNode == pan) {
                onion.setAttribute('position', '.65 0 .2');
                loadOnionPositions();
            }
            if (tomatoSauceInPan) tomatoSauce.setAttribute('visible', 'true');
        };
    });

    panAddSpot.addEventListener('mouseenter', function () {
        if (carrot.parentNode == cursor) {
            pan.append(carrot);
            carrot.setAttribute('position', '.25 0 .2');
            hideCarrotPositions();
            loadCarrotPositions();
        };
        if (onion.parentNode == cursor) {
            pan.append(onion);
            onion.setAttribute('position', '.65 0 .2');
            hideOnionPositions();
            loadOnionPositions();
        };
        if (beef.parentNode == cursor) {
            pan.append(beef);
            beef.setAttribute('position', '0.5 0 0.2');
            hideBeefPositions();
        };
        if (tomatoCan.parentNode == cursor) {
            hideTomatoCanPositions()
            let anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'rotation');
            anim.setAttribute('dur', '1500');
            anim.setAttribute('to', '0 0 -90');
            tomatoCan.append(anim);
            tomatoSauceInPan = true;

            window.setTimeout(function () {
                tomatoSauce.setAttribute('visible', 'true');
                let anim3 = document.createElement('a-animation');
                anim3.setAttribute('attribute', 'rotation');
                anim3.setAttribute('dur', '1500');
                anim3.setAttribute('to', '0 0 0');
                tomatoCan.append(anim3);
            }, 2500);
            window.setTimeout(function () {
                cursor.removeChild(tomatoCan);
            }, 4000);
        };
    });

    function showPanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            if (i != spaghetPanPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
    };

    function hidePanPositions() {
        for (var i = 0; i < panSpots.length; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
    };


    // sink ------------------------------------------------------------------------------------------------------------
    document.getElementById('tap_trigger').addEventListener('click', function () {
        tapOn = !tapOn;

        if (tapOn) {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0.5');
            fillpan();
        } else {
            document.getElementById('water').setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 0');
        };
    });

    spaghetPan.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.appendChild(spaghetPan);
            showSpaghetPanPositions();
            panInSink = false;
            loadSpaghetPan();
        };
    });

    spaghetPanAddSpot.addEventListener('mouseenter', function() {
        if (spaghetti.parentNode == cursor) {
            spaghetPan.append(spaghetti);
            loadSpaghetti();
            hidespaghetPositions();
        }
    })

    sink_trigger.addEventListener('click', function () {
        if (spaghetPan.parentNode == cursor) {
            objectiveCompleted(0);
            scene.appendChild(spaghetPan);
            spaghetPan.setAttribute('position', '-0.69 -3.21 -5.52');
            spaghetPan.setAttribute('rotation', '180 -44 180');
            panInSink = true;
            hideSpaghetPanPositions();
            loadSpaghetPan();
        };
    });

    function fillpan() {
        if (panInSink && tapOn) {
            objectiveCompleted(1);
            panHasWater = true;
            loadSpaghetPan();
        };
    };

    function showSpaghetPanPositions() {
        sink_trigger.setAttribute('visible', 'true');
        for (var i = 0; i < panSpots.length-1; i++) {
            if (i != panPositionIndex) {
                panSpots[i].setAttribute('visible', 'true');
            };
        };
    };

    function hideSpaghetPanPositions() {
        sink_trigger.setAttribute('visible', 'false');
        for (var i = 0; i < panSpots.length-1; i++) {
            panSpots[i].setAttribute('visible', 'false');
        };
    };

    function loadSpaghetPan() {
        if(panHasWater) {
            panwat.setAttribute('material', 'side: double; color: #0000FF; transparent: true; opacity: 1');
        };
        loadSpaghetti();
    };


    // Spaghetti
    spaghetti.addEventListener('click', function() {
        if (!holdingItem()) {
            cursor.append(this);
            spaghetti.setAttribute('position', '-1 -.6 0');
            spaghetti.setAttribute('rotation', '0 90 0');
            showspaghetPositions();
        }
    });

    spaghettiSpot.addEventListener('click', function() {
        console.log('pls work');
        if (spaghetti.parentNode == cursor) {
            scene.append(spaghetti);
            hidespaghetPositions();
        }
    });


    function cookSpaghetti() {
        if (spaghetPanPositionIndex < 5 && gasActive[spaghetPanPositionIndex]) {
            objectiveCompleted(3);
            if (spaghetti.parentNode == spaghetPan) {
                spaghetCookingTime += 1;
                if (spaghetCookingTime > 5) {
                    beef.setAttribute('src', 'Textures/groundbeefCooked.png');
                };
            }
        };
    };

    function showspaghetPositions() {
        spaghettiSpot.setAttribute('visible', 'true');
        spaghetPanAddSpot.setAttribute('visible', 'true');
    };

    function hidespaghetPositions() {
        spaghettiSpot.setAttribute('visible', 'false');
        spaghetPanAddSpot.setAttribute('visible', 'false');
    };

    function loadSpaghetti() {
        if (spaghetti.parentNode == spaghetPan) {
            spaghetti.setAttribute('scale', '33 33 33');
            spaghetti.setAttribute('position', '0 15 0');
            spaghetti.setAttribute('rotation', '0 0 0');
            spaghetti.setAttribute('geometry', 'primitive: cone; height: .5; radiusTop: .6; radiusBottom: .2');
        }
    }


    // TomatoCan    ----------------------------------------------------------------------------------------------------
    tomatoCan.addEventListener('click', function () {
        if (!holdingItem()) {
            cursor.append(this);
            this.setAttribute('position', '-0.7 -0.5 0');
            showTomatoCanPositions();
        }
    });

    tomatoCanFridgeSpot.addEventListener('click', function () {
        scene.append(tomatoCan);
        hideTomatoCanPositions();
    });

    tomatoCanCounterSpot.addEventListener('click', function () {
        if (tomatoCan.parentNode == cursor) {
            scene.append(tomatoCan);
            tomatoCan.setAttribute('position', '-3.6 -2.05 -5')
            hideTomatoCanPositions();
        }
    });

    function showTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'true');
        tomatoCanCounterSpot.setAttribute('visible', 'true')
        panAddSpot.setAttribute('visible', 'true');
    };

    function hideTomatoCanPositions() {
        tomatoCanFridgeSpot.setAttribute('visible', 'false');
        tomatoCanCounterSpot.setAttribute('visible', 'false')
        panAddSpot.setAttribute('visible', 'false');
    };


    // shared stuff ----------------------------------------------------------------------------------------------------
    cutSpot.addEventListener('click', function () {
        if (carrot.parentNode == cursor) {
            cuttingBoard.append(carrot);
            carrot.setAttribute('position', '0 .17 0');
            hideCarrotPositions();
            loadCarrotPositions();
        }
        if (onion.parentNode == cursor) {
            cuttingBoard.append(onion);
            onion.setAttribute('position', '0 .17 0');
            hideOnionPositions();
            loadOnionPositions();
        }
    })

    function holdingItem() {
        if (beef.parentNode == cursor
            || pan.parentNode == cursor
            || spaghetPan.parentNode == cursor
            || carrot.parentNode == cursor
            || knife.parentNode == cursor
            || tomatoCan.parentNode == cursor
            || onion.parentNode == cursor
            || book.parentNode == cursor
            || spaghetti.parentNode == cursor
        ) return true;
        else return false;
    }

    function cuttingSound() {
        let sound = document.createElement('a-sound');
        sound.setAttribute('src', 'Sound/carrotCut.mpeg');
        sound.setAttribute('autoplay', 'true');
        scene.append(sound);

    }

    window.setInterval(function () {
        cookBeef();
        cookSpaghetti();
    }, 1000);

    // Components   ----------------------------------------------------------------------------------------------------

    // Plaats de pan op de meegegeven x en z coordinaten
    AFRAME.registerComponent('place-pan', {
        schema: {
            x: {
                default: '0',
            },
            z: {
                default: '0',
            },
            index: {
                default: '0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                if (pan.parentNode == cursor) {
                    hidePanPositions();
                    scene.append(pan);
                    pan.setAttribute('position', data.x + ' -2.1 ' + data.z);
                    panPositionIndex = data.index;
                    if (beef.parentNode == pan) {
                        beef.setAttribute('position', '0.5 0 0.2');
                    }
                    if (carrot.parentNode == pan) {
                        carrot.setAttribute('position', '.25 0 .2');
                        loadCarrotPositions();
                    }
                    if (onion.parentNode == pan) {
                        onion.setAttribute('position', '.65 0 .2');
                        loadOnionPositions();
                    }
                    if (tomatoSauceInPan) tomatoSauce.setAttribute('visible', 'true');
                }
                if (spaghetPan.parentNode == cursor) {
                    objectiveCompleted(2);
                    hideSpaghetPanPositions();
                    scene.append(spaghetPan);
                    spaghetPan.setAttribute('position', data.x-.4 + ' -2.1 ' + data.z);
                    spaghetPanPositionIndex = data.index;
                    loadSpaghetPan();
                    
                }

                ;
            });
        },
    });

    // Verplaatst de camera naar de mee gegeven coordinaten bij een mouseenter event
    AFRAME.registerComponent('move-on-mouseenter', {
        schema: {
            to: {
                default: '0 0 0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'position');
                anim.setAttribute('dur', '2000');
                anim.setAttribute('easing', 'linear');
                anim.setAttribute('to', data.to);
                camera.append(anim);
            });
        },
    });

    // Geeft de furnace buttons de functionaliteit om het gas aan te zetten
    AFRAME.registerComponent('furnace-button', {
        schema: {
            index: {
                default: '0',
            },
        },
        init: function () {
            var data = this.data;
            this.el.addEventListener('click', function () {
                let anim = document.createElement('a-animation');
                anim.setAttribute('attribute', 'rotation');
                anim.setAttribute('dur', '1500');
                if (gasActive[data.index]) {
                    anim.setAttribute('to', '0 0 0');
                    gasActive[data.index] = false;
                    gases[data.index].setAttribute('visible', 'false');
                } else {
                    anim.setAttribute('to', '0 -180 0');
                    gasActive[data.index] = true;
                    gases[data.index].setAttribute('visible', 'true');
                }

                this.append(anim);
            });
        },
    });
};
