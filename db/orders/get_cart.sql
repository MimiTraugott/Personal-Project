select * from cart
join product on cart.product_id=product.product_id
where cart.customer_id = $1
