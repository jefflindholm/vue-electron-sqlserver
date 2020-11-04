const sql = require('mssql');
const ipcMain = require('electron').ipcMain;

const pool = new sql.ConnectionPool('mssql://sa:Fuzzy123@localhost/AdventureWorks');
const conn = pool.connect();

pool.on('error', err => {
    console.error('Sql Pool Error: ', err);
});

async function query(command, sqlArgs = null) {
    await conn;
    try {
        const request = pool.request();
        if (sqlArgs) {
            sqlArgs.forEach(p => {
                request.input(p.name, p.value);
            });
        }
        const result = await request.query(command);
        return result;
    } catch (err) {
        console.error('SQL error', err);
    }
}

ipcMain.handle('query', async(event, ...args) => {
    const result = await query(...args);
    return result;
});
