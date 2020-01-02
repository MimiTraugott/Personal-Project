-- insert into ordered_items (
--     customer_order_id,
--     product_id,
--     qty,
--     price
-- ) values (
--     ${order_id},
--     ${product_id},
--     1,
--     ${price}
-- )

insert into cart (
    customer_id,
    product_id,
    qty
) values (
    ${customer_id},
    ${product_id},
    ${qty}
)