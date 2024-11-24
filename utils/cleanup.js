const fs = require("fs");
const path = require("path");

const uploadsPath = path.join(__dirname, "uploads");

// Funzione per eliminare file vecchi
const deleteOldFiles = () => {
    const now = Date.now();
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

    fs.readdir(uploadsPath, (err, files) => {
        if (err) {
            console.error(
                "Errore durante la lettura della directory uploads:",
                err
            );
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(uploadsPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(
                        `Errore durante l'accesso al file ${file}:`,
                        err
                    );
                    return;
                }

                if (now - stats.mtimeMs > threeDaysInMs) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(
                                `Errore durante l'eliminazione del file ${file}:`,
                                err
                            );
                        } else {
                            console.log(`File eliminato: ${file}`);
                        }
                    });
                }
            });
        });
    });
};

module.exports = { deleteOldFiles };
