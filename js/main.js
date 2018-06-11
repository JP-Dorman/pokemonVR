// Load stadium model correctly
var modelEl = document.getElementById('stadium');

modelEl.addEventListener('model-loaded', function(evt) {
    var model = evt.detail.model;

    model.children.forEach(function(child) {
        var material = child['material'];

        if (!!material && material instanceof THREE.Material) {
            material.side = THREE.DoubleSide;
        }
    });
});

