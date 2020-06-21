
var whitelist = [];

$$('photos-list-photo').forEach(el => el.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); whitelist.push(this.dataset.id) }, true));

