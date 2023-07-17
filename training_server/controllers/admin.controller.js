const db = require('../database/db');
const multer = require('multer');
const upload = require('../upload');
const path = require('path');
const s3 = require('../easyYandexS3');


class AdminController {
    async getAdmin(req, res) {
        const {name, password} = req.body
        const newPerson = await db.query(`SELECT * FROM admin WHERE name = $1 AND password = $2`, [name, password])

        res.json(newPerson.rows)
    }
    async getReplica(req, res) {
        const replica = await db.query('SELECT * FROM script ORDER BY id')
        res.json(replica.rows)
    }

    async updateReplica(req, res) {
        try {
            await new Promise((resolve, reject) => {
                upload.single('audio')(req, res, (err) => {
                    if (err instanceof multer.MulterError) {
                        reject(err);
                    } else if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            const { id, replica, image_name, product } = req.body;

            // Check existing entry
            const existingRecord = await db.query('SELECT * FROM script WHERE id = $1 AND product = $2', [id, product]);

            if (existingRecord.rows.length === 0) {
                return res.status(404).json({ error: 'Record is not found' });
            }

            let audio = existingRecord.rows[0].audio || '';

            if (req.file) {
                const audioFilePath = existingRecord.rows[0].audio;
                const fileName = audioFilePath.split('/').pop();
                await s3.Remove(`/audio/${fileName}`);

                const uploadResult = await s3.Upload(
                    {
                        buffer: req.file.buffer,
                    },
                    '/audio/'
                );
                audio = uploadResult.Location;
            }

            // Update the record in the database
            const updatedRecord = await db.query(
                `UPDATE script SET replica = $2, image_name = $3, audio = $4 WHERE id = $1 AND product = $5 RETURNING *`,
                [id, replica, image_name, decodeURIComponent(audio), product] // Используйте переменную audio напрямую
            );

            res.json(updatedRecord.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update replica' });
        }
    }


    async createReplica(req, res) {
        try {
            await new Promise((resolve, reject) => {
                upload.single('audio')(req, res, (err) => {
                    if (err instanceof multer.MulterError) {
                        reject(err);
                    } else if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            const file = req.file.buffer;
            if (!file) {
                return res.status(400).json({error: 'No file uploaded'});
            }

            const {id, replica, image_name, product} = req.body;

            // check existing entry
            const existingRecord = await db.query(
                'SELECT * FROM script WHERE id = $1 AND product = $2', [id, product]);

            if (existingRecord.rows.length > 0) {
                return res.status(400).json({error: 'Record with the same id already exists'});
            } else {
                const uploadResult = await s3.Upload(
                    {
                        buffer: file,
                        save_name: true
                    },
                    '/audio/'
                );
                const newPerson = await db.query(
                    `INSERT INTO script (id, replica, image_name, audio, product)
                     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                    [id, replica, image_name, decodeURIComponent(uploadResult.Location), product]
                );
                res.json(newPerson.rows[0]);
            }


        } catch (error) {
            res.status(500).json({error: 'Failed to create replica'});
        }
    }

    async getReplicaById(req, res) {
        try {
            const {id, product} = req.params;

            // Получение записи по id и product
            const existingRecord = await db.query(
                'SELECT * FROM script WHERE id = $1 AND product = $2',
                [id, product]
            );

            if (existingRecord.rows.length === 0) {
                return res.status(404).json({error: 'Record not found'});
            }

            res.json(existingRecord.rows[0]);
        } catch (error) {
            res.status(500).json({error: 'Failed to retrieve replica'});
        }
    }

    async deleteReplica(req, res) {
        try {
            const {id, product} = req.params;

            // check existing entry
            const existingRecord = await db.query(
                'SELECT * FROM script WHERE id = $1 AND product = $2', [id, product]);
            if (existingRecord.rows.length === 0) {
                return res.status(404).json({error: 'Record not found'});
            }

            const audioFilePath = existingRecord.rows[0].audio;

            const fileName = audioFilePath.split('/').pop(); // Извлечение имени файла
            console.log(fileName)

            // Удаление файла из Яндекс.Облака
            await s3.Remove(`/audio/${fileName}`);

            // Удаление записи из таблицы
            await db.query('DELETE FROM script WHERE id = $1 AND product = $2', [id, product]);

            res.json({message: 'Record deleted successfully'});
        } catch (error) {
            res.status(500).json({error: 'Failed to delete record'});
        }
    }
}



module.exports = new AdminController()