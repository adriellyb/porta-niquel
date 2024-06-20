const { Router } = require('express');
const UserController = require('../controllers/UserController');
const SaldoController = require('../controllers/SaldoController');
const DespesaController = require('../controllers/DespesaController');

const router = Router();

// UserController
router.get('/users', UserController.index);
router.get('/user/:id', UserController.show);
router.post('/user', UserController.create);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);

// SaldoController
router.get('/saldos', SaldoController.index);
router.get('/saldo/:id', SaldoController.show);
router.post('/saldo', SaldoController.create);
router.put('/saldo/:id', SaldoController.update);
router.delete('/saldo/:id', SaldoController.destroy);

// DespesaController
router.get('/despesas', DespesaController.index);
router.get('/despesa/:id', DespesaController.show);
router.post('/despesa', DespesaController.create);
router.put('/despesa/:id', DespesaController.update);
router.delete('/despesa/:id', DespesaController.destroy);

module.exports = router;