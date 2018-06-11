var crobatIdleAnimation =
    '<a-animation attribute="position" ' +
    'direction="alternate" ' +
    'dur="600" ' +
    'to="0 11 -36" ' +
    'repeat="indefinite" ' +
    'easing="ease"> ' +
    '</a-animation> ' +
    '<a-animation attribute="rotation" ' +
    'direction="alternate" ' +
    'dur="600" ' +
    'to="20 0 0" ' +
    'repeat="indefinite" ' +
    'easing="ease"> ' +
    '</a-animation>';


// Scene ready
AFRAME.registerComponent('scene-loaded', {
    schema: {type: 'string'},
    init: function () {
        var splash = document.getElementById("splash");


        splash.addEventListener('click', function () {
            var battleMusic = document.getElementById("battle-music");
            var scene = document.getElementById("scene");

            battleMusic.play();
            splash.style.display = "none";
            scene.style.opacity = "1";
            scene.style.zIndex = "0";
        });


        // Hide loading spinner
        document.getElementById("spinner-container").style.display = "none";
        document.getElementById("splash").style.display = "flex";
    }
});


/********************************************** Main Menu *************************************************************/
AFRAME.registerComponent('add-menu-arrow', {
    init: function () {

        // Add menu item arrow
        this.el.addEventListener('mouseenter', function () {
            var tempContainer = document.createElement('div');
            tempContainer.innerHTML = '<a-entity id="menu-arrow" geometry="primitive: cone; radiusBottom: 1; radiusTop: 0" ' +
                'material="shader: flat; color: #000000" scale="0.1 0.1 0.01" rotation="0 0 -90" ' +
                'position="-0.35 0 0"></a-entity>';
            var arrow = tempContainer.firstChild;
            var menuText = this;

            menuText.appendChild(arrow);
        });


        // Remove menu item arrow
        this.el.addEventListener('mouseleave', function () {
            var arrow = document.getElementById("menu-arrow");

            if (arrow !== null) {
                arrow.parentNode.removeChild(arrow);
            }
        });
    }
});


// Navigate between menus
AFRAME.registerComponent('change-menu', {
    schema: {type: 'string'},

    init: function () {
        var data = this.data;

        this.el.addEventListener('click', function () {
            updateMenu(data);
        });
    }
});


function updateMenu(data) {
    var parent = document.getElementById('menu');
    var tempContainer = document.createElement('div');
    var newMenu = tempContainer.innerHTML;
    var clickSound = document.getElementById("click-sound");

    // Battle Menu
    if (data === "battle-menu") {
        tempContainer.innerHTML = '<a-plane class="link" id="battle-menu" cursor-listener position="0 0 0.02" scale="1 1 1">' +
            '<a-plane class="link" id="battle-menu-text-1" cursor-listener position="-0.25 0.25 0.02" scale="0.5 0.5 1" add-menu-arrow="">' +
            '<a-text value="SURF" color="#BDBDBD" position=" -0.25 0 0.2" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '<a-plane class="link" id="battle-menu-text-2" cursor-listener position="0.25 0.25 0.02" scale="0.5 0.5 1" ' +
            'add-menu-arrow="" attack="ice-beam">' +
            '<a-text value="ICE" color="#000000" position=" -0.25 0.1 0.2" scale="1 1 1"></a-text>' +
            '<a-text value="BEAM" color="#000000" position=" -0.25 -0.1 0.2" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '<a-plane id="battle-menu-text-3" cursor-listener position="-0.25 -0.25 0.02" scale="0.5 0.5 1" ' +
            'add-menu-arrow="">' +
            '<a-text value="PERISH" color="#BDBDBD" position=" -0.25 0.1 0.2" scale="1 1 1"></a-text>' +
            '<a-text value="SONG" color="#BDBDBD" position=" -0.25 -0.1 0.2" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '<a-plane id="battle-menu-text-4" cursor-listener position="0.25 -0.25 0.02" scale="0.5 0.5 1" ' +
            'add-menu-arrow="">' +
            '<a-text value="BODY" color="#BDBDBD" position=" -0.25 0.1 0.2" scale="1 1 1"></a-text>' +
            '<a-text value="SLAM" color="#BDBDBD" position=" -0.25 -0.1 0.2" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '</a-plane>';
        newMenu = tempContainer.firstChild;
    }

    // Pokemon Menu
    else if (data === "pkmn-menu") {
        tempContainer.innerHTML = '<a-plane id="pkmn-menu" cursor-listener position="0 0 0.01" scale="1 1 1">' +
            '<a-plane class="link" id="pkmn-menu-text-1" cursor-listener position="-0.25 0.25 0.01" scale="0.5 0.5 1">' +
            '<a-image id="lapras-icon" src="#lapras-thumb" position="-0.2 0.27 0.01" scale="0.25 0.25 0.25">' +
            '<a-animation attribute="position" direction="alternate" dur="1000" to="-0.2 0.23 0.01" ' +
            'repeat="indefinite" easing="ease">' +
            '</a-animation>' +
            '</a-image>' +
            '<a-text value="LAPRAS" color="#000000" position=" -0.05 0.25 0.1" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '</a-plane>';
        newMenu = tempContainer.firstChild;
    }

    // Item Menu
    else if (data === "item-menu") {
        tempContainer.innerHTML = "<div></div>";
        newMenu = tempContainer.firstChild;
    }

    // Run Menu
    else if (data === "run-menu") {
        tempContainer.innerHTML = "<div></div>";
        newMenu = tempContainer.firstChild;
    }

    // Main Menu
    else if (data === "back") {
        tempContainer.innerHTML = '<a-plane id="main-menu" cursor-listener position="0 0 0.01" scale="1 1 1">' +
            '<a-plane class="link" id="menu-text-1" cursor-listener position="-0.25 0.25 0.01" scale="0.5 0.5 1" ' +
            'add-menu-arrow="" change-menu="battle-menu">' +
            '<a-text value="FIGHT" color="#000000" position=" -0.25 0 0.1" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '<a-plane class="link" id="menu-text-2" cursor-listener position="0.25 0.25 0.01" scale="0.5 0.5 1" ' +
            'add-menu-arrow="" change-menu="pkmn-menu">' +
            '<a-text value="P" color="#000000" position="-0.12 0.08 0.1" scale="0.5 0.5 1"></a-text>' +
            '<a-text value="K" color="#000000" position="-0.04 0.00 0.1" scale="0.5 0.5 1"></a-text>' +
            '<a-text value="M" color="#000000" position="0.04 0.08 0.1" scale="0.5 0.5 1"></a-text>' +
            '<a-text value="N" color="#000000" position="0.12 0.00 0.1" scale="0.5 0.5 1"></a-text>' +
            '</a-plane>' +
            '<a-plane class="link" id="menu-text-3" cursor-listener position="-0.25 -0.25 0.01" scale="0.5 0.5 1" add-menu-arrow="">' +
            '<a-text value="ITEM" color="#BDBDBD" position=" -0.25 0 0.1" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '<a-plane class="link" id="menu-text-4" cursor-listener position="0.25 -0.25 0.01" scale="0.5 0.5 1" add-menu-arrow="">' +
            '<a-text value="RUN" color="#BDBDBD" position=" -0.25 0 0.1" scale="1 1 1"></a-text>' +
            '</a-plane>' +
            '</a-plane>';
        newMenu = tempContainer.firstChild;
    }

    clickSound.play();
    parent.innerHTML = "";
    parent.appendChild(newMenu);
}

/*********************************************** Attacks **************************************************************/

// Redirect to appropriate attack animation
AFRAME.registerComponent('attack', {
    schema: {type: 'string'},

    init: function () {
        var data = this.data;

        this.el.addEventListener('click', function () {
            var menuContainer = document.getElementById("menu");
            var clickSound = document.getElementById("click-sound");


            clickSound.play();
            menuContainer.innerHTML = "";

            if (data === "ice-beam") {
                iceBeam();
            } else if (data === "surf") {
                // surf();
            } else if (data === "body-slam") {
                // bodySlam();
            } else if (data === "perish-song") {
                // perishSong();
            }
        });
    }
});


/********************* Apply Damage *********************/
function applyDamage(recipient, amount, element, statusEffect) {
    var recipientEl, healthBar;
    if (recipient === "enemy") {
        recipientEl = document.getElementById("crobat");
        healthBar = document.getElementById("enemy-health-percent");
    }
    else {
        recipientEl = document.getElementById("lapras");
        healthBar = document.getElementById("your-health-percent");
    }
    var maxHealth = recipientEl.dataset.maxhealth;
    var currentHealth = recipientEl.dataset.currenthealth;
    var newHealth;
    var type1 = recipientEl.dataset.type1;
    var type2 = recipientEl.dataset.type2;


    // Apply weaknesses
    if (element === "ice" && (type1 === "flying" || type2 === "flying")) {
        amount = amount * 2;
    }


    // Set new health
    newHealth = currentHealth - amount;
    recipientEl.setAttribute('data-currentHealth', newHealth);


    // Update health bar
    var tempContainer = document.createElement('div');
    var newPercent = ((newHealth / maxHealth) * 100) / 100; // Find new percent then make 1 == 100%
    var newXPosition = ((1 - newPercent) * -1) / 2;  // Find the offset from the right then halve because it starts from the middle

    tempContainer.innerHTML =
        '<a-animation attribute="scale" ' +
        'dur="1000" ' +
        'to="' + newPercent + ' 1 0.1" ' +
        'easing="ease"> ' +
        '</a-animation> ' +
        '<a-animation attribute="position" ' +
        'dur="1000" ' +
        'to="' + newXPosition + ' 0 0.01" ' +
        'easing="ease"> ' +
        '</a-animation>';
    var animateNodes = tempContainer.childNodes;


    healthBar.innerHTML = "";

    animateNodes.forEach(function (node) {
        healthBar.appendChild(node);
    });

    // Either faint or move onto the next attack
    if (newPercent <= 0) {
        faint(recipientEl, recipient);
    } else if (recipient === "enemy") {
        setTimeout(function () {
            enemyAttack();
        }, 1500);
    } else if (recipient === "ally") {
        setTimeout(function () {
            updateMenu("back");
        }, 1500);
    }
}


/********************* Attack Animations *********************/
function iceBeam() {
    var scene = document.getElementsByTagName("a-scene")[0];
    var tempContainer = document.createElement('div');
    var menuContainer = document.getElementById('menu');
    var iceSound = document.getElementById("ice-sound");


    // Update Menu
    tempContainer.innerHTML =
        '<a-plane id="enemy-warning" position="0 0 0.01" scale="1 1 0.1"> ' +
        '<a-text value="LAPRAS USED" color="#000000" position=" -0.4 0.1 1" scale="0.5 0.7 0.1"></a-text>' +
        '<a-text value="ICE BEAM" color="#000000" position=" -0.4 -0.1 1" scale="0.5 0.7 0.1"></a-text> ' +
        '</a-plane>';
    var allyAttack = tempContainer.childNodes;


    allyAttack.forEach(function (node) {
        menuContainer.appendChild(node);
    });


    // Apply Animation
    tempContainer.innerHTML = '<a-cylinder id="ice-beam" color="#8EFEFF" height="0.1" radius="0.1" position="0 12 -17.5" rotation="90 0 0">' +
        '<a-animation attribute="height" ' +
        'to="18" ' +
        'dur="1600" ' +
        'easing="ease"> ' +
        '</a-animation> ' +
        '<a-animation attribute="position" ' +
        'to="0 12 -27" ' +
        'dur="1600" ' +
        'easing="ease"> ' +
        '</a-animation> ' +
        '<a-animation attribute="visible" ' +
        'dur="5000" ' +
        'to="false" ' +
        'repeat="indefinite" ' +
        'delay="2000"> ' +
        '</a-animation> ' +
        '</a-cylinder>';
    var beamString = tempContainer.firstChild;


    scene.appendChild(beamString);
    iceSound.play();

    setTimeout(function () {
        applyDamage("enemy", 90, "ice", "freeze");
        var beamObject = document.getElementById("ice-beam");

        scene.removeChild(beamObject);
    }, 2500);
}

/********************* Faint Animation *********************/
function faint(recipientEl, recipient) {
    var tempContainer1 = document.createElement('div');
    var tempContainer2 = document.createElement('div');
    var newXRotation, newYRotation, newZRotation, newXPosition, newYPosition, newZPosition;
    var menuContainer = document.getElementById('menu');
    var faintCry;
    if (recipient = "enemy") {faintCry = document.getElementById("crobat-cry");}
    else if (recipient = "ally") {faintCry = document.getElementById("lapras-cry");}


    //Setup Menu
    tempContainer1.innerHTML =
        '<a-plane id="enemy-warning" position="0 0 0.01" scale="1 1 0.1"> ' +
        '<a-text value="ENEMY CROBAT" color="#000000" position=" -0.4 0.1 1" scale="0.5 0.7 0.1"></a-text>' +
        '<a-text value="FAINTED" color="#000000" position=" -0.4 -0.1 1" scale="0.5 0.7 0.1"></a-text> ' +
        '</a-plane>';
    var faintText = tempContainer1.childNodes;


    // Setup animations
    if (recipient === "enemy") {
        newXRotation = -90;
        newYRotation = -40;
        newZRotation = 0;
        newXPosition = 0;
        newYPosition = 10;
        newZPosition = -36;
    } else {
        newXRotation = 60;
        newYRotation = 180;
        newZRotation = 0;
        newXPosition = 0;
        newYPosition = 10.4;
        newZPosition = -17;
    }

    tempContainer2.innerHTML =
        '<a-animation attribute="rotation" ' +
        'dur="1000" ' +
        'to=" ' + newXRotation + ' ' + newYRotation + ' ' + newZRotation + ' " ' +
        'easing="ease"> ' +
        '</a-animation> ' +
        '<a-animation attribute="position" ' +
        'dur="1000" ' +
        'to=" ' + newXPosition + ' ' + newYPosition + ' ' + newZPosition + ' " ' +
        'easing="ease"> ' +
        '</a-animation>';
    var animateNodes = tempContainer2.childNodes;


    //Remove back button
    var back = document.getElementById("menu-back");
    back.parentNode.removeChild(back);


    // Wait then exeggcute
    setTimeout(function () {
        // Apply Menu
        menuContainer.innerHTML = "";
        faintText.forEach(function (node) {
            menuContainer.appendChild(node);
        });

        // Apply Animations
        recipientEl.innerHTML = "";
        animateNodes.forEach(function (node) {
            recipientEl.appendChild(node);
        });
        faintCry.play();

        victory();
    }, 1000);
}


function victory() {
    setTimeout(function () {
        var victoryMusic = document.getElementById("victory-music");
        var battleMusic = document.getElementById("battle-music");

        battleMusic.pause();
        victoryMusic.play();
    }, 1000);
}

/********************************************* Enemy Attacks **********************************************************/
function enemyAttack() {
    var menuContainer = document.getElementById('menu');
    var tempContainer = document.createElement('div');
    tempContainer.innerHTML =
        '<a-plane id="enemy-warning" position="0 0 0.01" scale="1 1 0.1"> ' +
        '<a-text value="ENEMY CROBAT" color="#000000" position=" -0.4 0.1 1" scale="0.5 0.7 0.1"></a-text>' +
        '<a-text value="USED CRUNCH" color="#000000" position=" -0.4 -0.1 1" scale="0.5 0.7 0.1"></a-text> ' +
        '</a-plane>';
    var enemyAttack = tempContainer.childNodes;


    menuContainer.innerHTML = "";
    enemyAttack.forEach(function (node) {
        menuContainer.appendChild(node);
    });

    enemyTackle();
}

/********************* Attack Animations *********************/
function enemyTackle() {
    var crobat = document.getElementById("crobat");
    var tempContainer3 = document.createElement('div');
    var dashSound = document.getElementById("dash-sound");
    tempContainer3.innerHTML =
        '<a-animation attribute="position" ' +
        'to="0 10.4 -17" ' +
        'dur="500" ' +
        'easing="ease" ' +
        'direction="alternate" ' +
        'repeat="1" ' +
        '> ' +
        '</a-animation> ' +
        '<a-animation attribute="rotation" ' +
        'dur="500" ' +
        'to="90 0 0" ' +
        'direction="alternate" ' +
        'repeat="1" ' +
        '> ' +
        '</a-animation>';
    var attackAnimation = tempContainer3.childNodes;


    setTimeout(function () {
        attackAnimation.forEach(function (node) {
            crobat.appendChild(node);
        });
        dashSound.play();
    }, 1500);

    setTimeout(function () {
        applyDamage("ally", 90, "normal", "");
    }, 2500);
}


