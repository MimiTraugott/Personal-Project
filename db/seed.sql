create table customer (
    customer_id serial primary key,
    email varchar(100) not null,
    password varchar(250) not null
);
create table product (
product_id serial primary key,
product_name varchar(50),
product_image varchar(250),
product_description text,
price decimal
);
create table cart (
current_cart_id serial primary key,
customer_id int references customer(customer_id),
product_id int,
qty int
)
create table customer_orders (
customer_order_id serial primary key,
customer_id int references customer(customer_id),
paid boolean
);
create table ordered_items (
order_item_id serial primary key,
customer_order_id int references customer_order(customer_order_id),
product_id int references products(product_id),
qty int,
price decimal
);