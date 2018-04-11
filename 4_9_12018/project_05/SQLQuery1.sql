Select addToCart.productid, addToCart.productname
FROM  addToCart,adminProducts
WHERE addToCart.productid = adminProducts.productid