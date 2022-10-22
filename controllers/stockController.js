const mongoose = require('mongoose')
const Stock = require('../models/stock')

const stock_index = (req, res) => {
  Stock.find()
    .sort({ createdAt: -1 }) // -1 bedeutet, dass die Reihfolge absteigend ist also von neu erstellte Stock zum Alten
    .then(result => {
      res.render('stocks/index', { title: 'Übersicht', stocks: result })
    })
    .catch(err => {
      console.log(err)
    })
}

const stock_create_get = (req, res) => {
  res.render('stocks/create', { title: 'Neues Lager erstellen' })
}

const stock_create_post = (req, res) => {
  const stock = new Stock(req.body)
  stock
    .save()
    .then(result => {
      res.redirect('/stocks')
    })
    .catch(err => {
      console.log(err)
    })
}

const stock_details = (req, res) => {
  const id = req.params.id
  Stock.findById(id)
    .then(result => {
      res.render('stocks/details', {
        title: `${result.title} Details`,
        stock: result,
      })
    })
    .catch(err => {
      console.log(err)
    })
}

const stock_delete = (req, res) => {
  const id = req.params.id
  Stock.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/stocks' })
    })
    .catch(err => console.log(err))
}

const stock_delete_product = (req, res) => {
  const productName = req.params.productname
  const stockID = req.params.id

  Stock.findByIdAndUpdate(stockID, { $pull: { products: productName } })
    .then(result => {
      res.json({ redirect: '/stocks/' + String(stockID) })
    })
    .catch(err => console.log(err))
}

const checkStockCapacity = (req, res, next) => {
  const stockID = req.params.id
  Stock.findById(stockID)
    .then(result => {
      if (result.products.length >= 5) {
        res.render('stockFull', { title: 'Fehler' })
      } else {
        next()
      }
    })
    .catch(err => console.log(err))
}

const stock_addproduct_get = (req, res) => {
  const stockID = req.params.id

  Stock.findById(stockID)
    .then(result =>
      res.render('stocks/addProduct', { title: 'Add Product', stock: result })
    )
    .catch(err => console.log(err))
}

const stock_addproduct_post = (req, res) => {
  const stockID = req.params.id
  const newProductName = req.body.producktname
  Stock.findByIdAndUpdate(stockID, { $push: { products: newProductName } })
    .then(resule => res.redirect('/stocks/' + stockID))
    .catch(err => console.log(err))
}

module.exports = {
  stock_index,
  stock_details,
  stock_create_get,
  stock_create_post,
  stock_delete,
  stock_delete_product,
  stock_addproduct_get,
  checkStockCapacity,
  stock_addproduct_post,
}
