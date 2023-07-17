const Router = require('express')
const router = new Router()
const personController = require('../controllers/person.controller')
const adminController = require('../controllers/admin.controller')
const auth = require('../controllers/auth');
const upload = require('../upload')

router.post('/person', personController.createPerson)
router.get('/people', personController.getPeople)
router.get('/person/:id', personController.getOnePerson)
router.put('/person', personController.updatePerson)
router.delete('/person/:id', personController.deletePerson)

router.post('/admin', adminController.getAdmin)
router.get('/steps', adminController.getReplica)
router.put('/step', adminController.updateReplica)
router.post('/step', adminController.createReplica)
router.post('/auth/login', auth.login)
router.post('/auth/registration', auth.register)
router.delete('/step/:product/:id', adminController.deleteReplica)
router.get("/step/:product/:id", adminController.getReplicaById)

router.delete('/replica', adminController.deleteReplica)

module.exports = router