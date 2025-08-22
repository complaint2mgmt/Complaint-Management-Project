--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-22 14:35:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16605)
-- Name: complaints; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.complaints (
    id bigint NOT NULL,
    track_id character varying(255) NOT NULL,
    phone_no character varying(255),
    email character varying(255),
    complaint_text character varying(255),
    complaint_date timestamp without time zone,
    status character varying(255)
);


ALTER TABLE public.complaints OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16604)
-- Name: complaints_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.complaints_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.complaints_id_seq OWNER TO postgres;

--
-- TOC entry 4798 (class 0 OID 0)
-- Dependencies: 217
-- Name: complaints_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.complaints_id_seq OWNED BY public.complaints.id;


--
-- TOC entry 4641 (class 2604 OID 16615)
-- Name: complaints id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints ALTER COLUMN id SET DEFAULT nextval('public.complaints_id_seq'::regclass);


--
-- TOC entry 4792 (class 0 OID 16605)
-- Dependencies: 218
-- Data for Name: complaints; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.complaints (id, track_id, phone_no, email, complaint_text, complaint_date, status) FROM stdin;
2	TCK2025082228512	9876501234	user2@test.com	Internet speed is very slow compared to promised plan.	2025-08-22 11:05:21.250937	PENDING
3	TCK202508225719B	9876512345	user3@test.com	Unable to make outgoing calls, issue fixed after SIM replacement.	2025-08-22 11:05:31.750341	RESOLVED
5	TCK20250822D2A49	9876534567	user5@test.com	Frequent call drops when traveling between cities.	2025-08-22 11:05:55.657523	PENDING
6	TCK20250822708AD	9876545678	user6@test.com	SMS service was not working, now it is fixed.	2025-08-22 11:06:06.583718	ESCALATED
4	TCK20250822E6E13	9876523456	user4@test.com	Charged extra on the latest bill, customer care not resolving properly.	2025-08-22 11:05:44.922308	RESOLVED
1	TCK20250822F8DBA	9876543210	user@test.com	Network issue	2025-08-22 11:02:09.066451	RESOLVED
\.


--
-- TOC entry 4799 (class 0 OID 0)
-- Dependencies: 217
-- Name: complaints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.complaints_id_seq', 6, true);


--
-- TOC entry 4643 (class 2606 OID 16617)
-- Name: complaints complaints_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_pkey PRIMARY KEY (id);


--
-- TOC entry 4645 (class 2606 OID 16614)
-- Name: complaints complaints_track_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.complaints
    ADD CONSTRAINT complaints_track_id_key UNIQUE (track_id);


-- Completed on 2025-08-22 14:35:50

--
-- PostgreSQL database dump complete
--

