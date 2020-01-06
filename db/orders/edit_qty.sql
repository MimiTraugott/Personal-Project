update cart
set qty=$2
where current_cart_id=$1
returning *;
