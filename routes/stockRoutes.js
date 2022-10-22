const express = require('express')
const stockController = require('../controllers/stockController')
const router = express.Router()

router.get('/', stockController.stock_index)

router.get('/create', stockController.stock_create_get)

router.post('/', stockController.stock_create_post)

router.get('/:id', stockController.stock_details)

router.delete('/:id', stockController.stock_delete)

//Products
//Hier habe keine DELETE-Method, da Product ist kein Model, sondern ein Element des Array von Stock, daher update bzw. PUT
router.put('/:id/:productname', stockController.stock_delete_product)

router.post(
  '/:id/addproduct',
  stockController.checkStockCapacity,
  stockController.stock_addproduct_post
)

router.get(
  '/:id/addproduct',
  stockController.checkStockCapacity,
  stockController.stock_addproduct_get
)

module.exports = router
