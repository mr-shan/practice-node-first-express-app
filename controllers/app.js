module.exports.getHome = (req, res, next) => {
  res.render('home', { pageTitle: 'Shop Mart - Home', path: '/' })
}

module.exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: '404! Not Found.', path: req.path })
}