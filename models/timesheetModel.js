const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");

function getYearsAvailable() {
    if (!fs.existsSync(dataDir)) return [];
    return fs
        .readdirSync(dataDir)
        .filter(file => file.endsWith("-timesheet.json"))
        .map(file => file.replace("-timesheet.json", ""));
}

function loadTimesheet(year) {
    const filePath = path.join(dataDir, `${year}-timesheet.json`);
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveTimesheet(year, data) {
    data.sort((a, b) => new Date(b.day) - new Date(a.day));

    const filePath = path.join(dataDir, `${year}-timesheet.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { getYearsAvailable, loadTimesheet, saveTimesheet };
