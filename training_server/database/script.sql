CREATE SEQUENCE person_data_id_seq;

CREATE TABLE public.person_data
(
    id integer DEFAULT nextval('person_data_id_seq'::regclass),
    surname text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    patronymic text COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    date_reg date NOT NULL,
    time_reg time with time zone,
    answers text COLLATE pg_catalog."default",
    result text COLLATE pg_catalog."default",
    date_end date,
    time_end time with time zone,
    CONSTRAINT person_data_pkey PRIMARY KEY (id)
)

    TABLESPACE pg_default;

ALTER TABLE public.person_data
    OWNER to postgres;

CREATE SEQUENCE admin_id_seq;

CREATE TABLE public.admin (
    id integer DEFAULT nextval('admin_id_seq'::regclass) NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (id)
)
    TABLESPACE pg_default;

CREATE TABLE public.script
(
    id text COLLATE pg_catalog."default",
    replica json,
    image_name json,
    audio text COLLATE pg_catalog."default",
    product text COLLATE pg_catalog."default",
    CONSTRAINT script_id_product_unique UNIQUE (id, product)
)
    TABLESPACE pg_default;

ALTER TABLE public.script
    OWNER to postgres;


CREATE TABLE temporary_tokens (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
