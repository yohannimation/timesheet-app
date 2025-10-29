const { getYearsAvailable, loadTimesheet, saveTimesheet } = require("../models/timesheetModel");

function calculateTotal(start, end) {
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);
    const totalMinutes = (endTime - startTime) / (1000 * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${Math.round(minutes).toString().padStart(2, "0")}`;
}

exports.getTimesheet = (req, res) => {
    const yearsAvailable = getYearsAvailable();
    const selectedYear = req.params.year || new Date().getFullYear();
    const timesheetData = loadTimesheet(selectedYear);
    res.render("index", { timesheetData, yearsAvailable, selectedYear });
};

exports.addLine = (req, res) => {
    const { day, start, end, ticket, state, project, description, uploaded } = req.body;
    const year = req.params.year;
    const timesheetData = loadTimesheet(year);

    timesheetData.unshift({
        day,
        start,
        end,
        total: calculateTotal(start, end),
        ticket,
        state,
        project,
        description,
        uploaded: uploaded === "on",
    });

    saveTimesheet(year, timesheetData);
    res.redirect(`/${year}`);
};

exports.editLinePage = (req, res) => {
    const year = req.params.year;
    const index = req.params.index;
    const timesheetData = loadTimesheet(year);
    const entry = timesheetData[index];
    res.render("edit", { entry, index, currentYear: year });
};

exports.updateLine = (req, res) => {
    const { day, start, end, ticket, state, project, description, uploaded } = req.body;
    const year = req.params.year;
    const index = req.params.index;
    const timesheetData = loadTimesheet(year);

    timesheetData[index] = {
        day,
        start,
        end,
        total: calculateTotal(start, end),
        ticket,
        state,
        project,
        description,
        uploaded: uploaded === "on",
    };

    saveTimesheet(year, timesheetData);
    res.redirect(`/${year}`);
};

exports.duplicateLine = (req, res) => {
    const year = req.params.year;
    const index = parseInt(req.params.index, 10);
    const timesheetData = loadTimesheet(year);

    if (index >= 0 && index < timesheetData.length) {
        const duplicated = { ...timesheetData[index] };
        timesheetData.unshift(duplicated);
        saveTimesheet(year, timesheetData);
    }
    res.redirect(`/${year}`);
};

exports.deleteLine = (req, res) => {
    const year = req.params.year;
    const index = req.params.index;
    const timesheetData = loadTimesheet(year);

    timesheetData.splice(index, 1);
    saveTimesheet(year, timesheetData);
    res.redirect(`/${year}`);
};
