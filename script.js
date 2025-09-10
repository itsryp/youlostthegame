let last = null;
let lightmode = false;

addEventListener("load", (event) => {
    const ls = localStorage;
    const logdata = JSON.parse(ls.getItem('logdata')) || [];
    for (let i = 0; i < logdata.length; i++) {
        const entry = logdata[i];
        addentry(entry)
    }
    if (last && last.time) {
        if (((Date.now() - last.time) / 1000) < 86400) {
            document.querySelector('.yesbutton').classList.add('inactive');
        }
    }
    document.querySelector('.days-lasted').innerHTML = `you lasted ${last != null ? Math.round(((Date.now() - last.time) / 1000) / 86400) : 0} days! 👏`;
});

function addtolog() {
    if (last && last.time) {
        if (((Date.now() - last.time) / 1000) < 86400) {
            alert('doesnt count if its less than a day :)')
            return;
        }
    }
    const ls = localStorage;
    let logdata = JSON.parse(ls.getItem('logdata')) || [];
    const reasonstring = prompt("who/what made you lose?")
    if (!reasonstring)
        return;
    let newentry = {
        time:Date.now(),
        reason:reasonstring
    };
    const count = logdata.push(newentry) - 1;
    ls.setItem('logdata', JSON.stringify(logdata));
    const entry = logdata[count];
    addentry(entry);
}

function addentry(entry) {
    let duration;
    if (last) {
        duration = Math.round(((entry.time - last.time) / 1000) / 86400);
    } else {
        duration = 0;
    }
    last = entry;
    const date = new Date(entry.time);
    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear().toString().substring(2)}`;
    const row0 = document.querySelector('.table-headers');
    row0.insertAdjacentHTML('afterend', `<tr><td>${row0.parentElement.childElementCount}</td><td>${dateString}</td><td>${duration.toString().concat(duration==1?' Day':' Days')}</td><td class="reason"><i>"${entry.reason}"</i></td>`);
}

function clearlogs() {
    if (localStorage.getItem('logdata') == null) {
        alert('no saved data');
        return;
    } else {
        let confirmresult = confirm('reset data?');
        if (confirmresult) {
            let confirmresult2 = confirm('you sure?');
            if (confirmresult2) {
                localStorage.clear();
                window.location.reload();
            } else
                return;
        } else
            return;
    }
}

function togglelightmode() {
    lightmode = !lightmode;
    var body = document.body;
    var button = document.querySelector('.lightmode-button');
    if (lightmode) {
        body.classList.add('light-mode');
        button.innerHTML = "🌙"
    } else {
        body.classList.remove('light-mode');
        button.innerHTML = "☀️"
    }
}