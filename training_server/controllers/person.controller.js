const db =  require('../database/db')

class PersonController {
    async createPerson(req, res) {
        const {surname, name, patronymic, phone, email, date_reg, time_reg, answers, result, date_end, time_end, product} =  req.body
        const newPerson =  await db.query(`INSERT INTO person_data 
        (surname, name, patronymic, phone, email, date_reg, time_reg, answers, result, date_end, time_end, product) 
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, 
        [surname, name, patronymic, phone, email, date_reg, time_reg, answers, result, date_end, time_end, product])
        
        res.json(newPerson.rows[0])
    }
    async getPeople(req, res) {
        const people = await db.query('SELECT * FROM person_data ORDER BY id')
        res.json(people.rows)
    }
    async getOnePerson(req, res) {
        const id = req.params.id
        const person = await db.query('SELECT * FROM person_data WHERE id = $1', [id])

        res.json(person.rows)
    }
    async updatePerson(req, res) {
        const {id, surname, name, patronymic, phone, email, result} = req.body
        const person = await db.query
        ('UPDATE person_data set surname = $1, name = $2, patronymic = $3, phone = $4, email = $5, result = $6 where id = $7 RETURNING *', 
        [surname, name, patronymic, phone, email, result, id])

        res.json(person.rows)
    }
    async deletePerson(req, res) {
        const id = req.params.id
        const person = await db.query('DELETE FROM person_data WHERE id = $1', [id])

        res.json(person.rows)
    }
}

module.exports = new PersonController()