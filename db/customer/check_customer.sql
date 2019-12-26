select * from customer c
join customer_order co on c.customer_id=co.customer_id
and c.email = $1
and co.paid=false;