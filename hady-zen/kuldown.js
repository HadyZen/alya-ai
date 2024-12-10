let lastCommandUsage = {};

function kuldown(id, cmd, cd) {
    if (jeda(id, cmd, cd)) {
        if (!lastCommandUsage[id]) {
            lastCommandUsage[id] = {};
        }
        lastCommandUsage[id][cmd] = Date.now();
        return "ok";
    } else {
        return "no";
    }
}

function jeda(id, cmd, cd) {
    if (!lastCommandUsage[id] || !lastCommandUsage[id][cmd]) {
        return true;
    }

    const timePassed = (Date.now() - lastCommandUsage[id][cmd]) / 1000; 

    return timePassed >= cd;
}

module.exports = { kuldown, jeda };
