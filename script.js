addEventListener("load", (event) => {
    const ls = localStorage;
    const logdata = JSON.parse(ls.getItem('logdata')) || [];
    let last = null;
    for (let i = 0; i < logdata.length; i++) {
        const entry = logdata[i];
        // console.log(tick);
        let duration = ((entry.time - last) / 1000) / 86400;
        if (last == null)
            duration = 0;
        last = entry.time;
        addentry(entry, duration)
    }
});

function addtolog() {
    const ls = localStorage;
    let logdata = JSON.parse(ls.getItem('logdata')) || [];
    const reasonstring = prompt("why did you lose??")
    if (!reasonstring)
        return;
    let newentry = {
        time:Date.now(),
        reason:reasonstring
    };
    const count = logdata.push(newentry) - 1;
    ls.setItem('logdata', JSON.stringify(logdata));
    let last = logdata[count-1];
    const entry = logdata[count];
    console.log(entry);
    // console.log(tick);
    let duration;
    if (last) {
        duration = ((entry.time - last.time) / 1000) / 86400;
    } else {
        duration = 0;
    }
    last = entry.time;
    addentry(entry, duration)
}

function addentry(entry, duration) {
    const date = new Date(entry.time);
    const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear().toString().substring(2)}`;
    const row0 = document.querySelector('.table-headers');
    row0.insertAdjacentHTML('afterend', `<tr><td>${row0.parentElement.childElementCount}</td><td>${dateString}</td><td>${Math.round(duration)} Days</td><td class="reason"><i>${entry.reason}</i></td>`);
}