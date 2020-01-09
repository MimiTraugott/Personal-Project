create table customer (
    customer_id serial primary key,
    email varchar(100) not null,
    password varchar(250) not null,
    username varchar(100)
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
);
create table customer_order (
customer_order_id serial primary key,
customer_id int references customer(customer_id),
paid boolean
);
