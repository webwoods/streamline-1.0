--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying
);


ALTER TABLE public.file OWNER TO postgres;

--
-- Name: property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    key character varying NOT NULL,
    value character varying NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.property OWNER TO postgres;

--
-- Name: request; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    "requestType" character varying NOT NULL,
    description character varying,
    file_id uuid,
    requested_by character varying,
    status text
);


ALTER TABLE public.request OWNER TO postgres;

--
-- Name: request_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_item (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    name character varying NOT NULL,
    sku character varying NOT NULL,
    quantity bigint,
    type character varying,
    unit character varying,
    price double precision
);


ALTER TABLE public.request_item OWNER TO postgres;

--
-- Name: request_item_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_item_properties (
    request_item_id uuid NOT NULL,
    property_id uuid NOT NULL
);


ALTER TABLE public.request_item_properties OWNER TO postgres;

--
-- Name: request_request_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_request_items (
    request_item_id uuid NOT NULL,
    request_id uuid NOT NULL
);


ALTER TABLE public.request_request_items OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    name text NOT NULL,
    division character varying
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    username character varying,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying,
    "roleId" uuid,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: verification_code; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_code (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now(),
    user_id uuid NOT NULL,
    code character varying NOT NULL,
    "expirationDate" date NOT NULL
);


ALTER TABLE public.verification_code OWNER TO postgres;

--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (id, "createdAt", "updatedAt", name) FROM stdin;
3230e879-ddff-4555-a9e7-f85744a8fb19	2023-11-12 18:12:59.115537	2023-11-12 18:12:59.115537	File 1
fb7214f1-cdb5-4048-98b4-9a0a7d268ec9	2023-11-12 18:12:59.115537	2023-11-12 18:12:59.115537	File 2
a7192ad8-fe3b-46c0-9614-19dbedcfebe1	2023-11-12 18:12:59.115537	2023-11-12 18:12:59.115537	File 3
4a279604-1f67-476b-aba2-9bf1d9a0fa28	2023-11-12 18:12:59.115537	2023-11-12 18:12:59.115537	File 4
89256a21-04ec-4549-8302-d0732f15a304	2023-11-12 18:12:59.115537	2023-11-12 18:12:59.115537	File 5
dd3da82d-4cb8-4653-80ac-933f977209e5	2023-11-12 18:18:59.928102	2023-11-12 18:18:59.928102	Document 1
2e6a13bc-1b00-43e3-b9af-97ae29657896	2023-11-12 18:18:59.928102	2023-11-12 18:18:59.928102	Document 2
df756e45-3df1-4668-8eb9-5fc3dfc5620d	2023-11-12 18:18:59.928102	2023-11-12 18:18:59.928102	Document 3
702d0786-ee61-4fd0-96b7-8a4efb791a4d	2023-11-12 18:18:59.928102	2023-11-12 18:18:59.928102	Document 4
f19cb6f6-4b5c-4ca0-ae42-eb5274f084b8	2023-11-12 18:18:59.928102	2023-11-12 18:18:59.928102	Document 5
\.


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property (id, "createdAt", "updatedAt", key, value, type) FROM stdin;
48106274-4159-44a5-b3f2-5dad2778d218	2023-11-12 18:44:59.273067	2023-11-12 18:44:59.273067	Gas Type	Oxygen	Gas
e3eca685-6a5b-4b5c-b8e0-42028f1a6b9b	2023-11-12 18:44:59.273067	2023-11-12 18:44:59.273067	Lab Equipment Type	Microscope	Lab Equipment
16d9530e-3821-4f16-9182-8664ca714510	2023-11-12 18:44:59.273067	2023-11-12 18:44:59.273067	Maintenance Type	Machine Maintenance	Equipment Maintenance
e49227e9-743f-4256-b255-90b2f4156897	2023-11-12 18:44:59.273067	2023-11-12 18:44:59.273067	Gas Type	Hydrogen	Gas
5078a210-dc11-4b25-bd4b-58ff48bad27b	2023-11-12 18:44:59.273067	2023-11-12 18:44:59.273067	Lab Equipment Type	Safety Goggles	Lab Equipment
\.


--
-- Data for Name: request; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request (id, "createdAt", "updatedAt", "requestType", description, file_id, requested_by, status) FROM stdin;
229baf86-fa5a-4e09-8200-5092a12a0da1	2023-11-12 19:05:23.40419	2023-11-12 19:05:23.40419	Gas	Request for Gas Supply	dd3da82d-4cb8-4653-80ac-933f977209e5	916fb12d-0303-4cb2-af03-9e752b00d324	pending
746e0bf0-04b9-412b-b323-f55e321ebfdc	2023-11-12 19:05:23.40419	2023-11-12 19:05:23.40419	Lab Equipment	Request for Lab Equipment	2e6a13bc-1b00-43e3-b9af-97ae29657896	b950ec63-1061-4812-91b4-abb5275ffb3a	approved
fcfe5922-5bd4-4083-a389-0e98a04d4aa4	2023-11-12 19:05:23.40419	2023-11-12 19:05:23.40419	Equipment Maintenance	Equipment Maintenance Request	df756e45-3df1-4668-8eb9-5fc3dfc5620d	bba89337-c919-475b-a66a-e52369916e94	rejected
1f892f65-b0d0-4b53-9a09-879d96a114d2	2023-11-12 19:05:23.40419	2023-11-12 19:05:23.40419	Gas	Urgent Gas Supply Request	702d0786-ee61-4fd0-96b7-8a4efb791a4d	b1cd685d-9a2e-4ee7-953c-42dda71621cb	pending
f7782081-8789-4fde-a5f2-daaaafa76db1	2023-11-12 19:05:23.40419	2023-11-12 19:05:23.40419	Lab Equipment	Lab Instruments Purchase Request	f19cb6f6-4b5c-4ca0-ae42-eb5274f084b8	9885dd5f-e4d2-4d4f-a128-986ebdc2b3ca	approved
\.


--
-- Data for Name: request_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_item (id, "createdAt", "updatedAt", name, sku, quantity, type, unit, price) FROM stdin;
f285c484-4e57-4afa-a35b-83a6c4c56f5b	2023-11-12 18:44:36.309373	2023-11-12 18:44:36.309373	Oxygen Gas	SKU-OXY	5	Gas	Cylinder	100
49b91ff1-582c-430e-becb-c9313b721978	2023-11-12 18:44:36.309373	2023-11-12 18:44:36.309373	Microscope	SKU-MIC	2	Lab Equipment	Unit	500
0c8b9a3a-d911-4f20-9308-8d69ee826f16	2023-11-12 18:44:36.309373	2023-11-12 18:44:36.309373	Machine Maintenance	SKU-MAIN	1	Equipment Maintenance	Service	800
4e6c4507-b74f-4e76-9f99-eac45c811bf7	2023-11-12 18:44:36.309373	2023-11-12 18:44:36.309373	Hydrogen Gas	SKU-H2	3	Gas	Cylinder	120
48522519-eddb-4be3-9db0-f27b721cc3fa	2023-11-12 18:44:36.309373	2023-11-12 18:44:36.309373	Safety Goggles	SKU-SAFE	10	Lab Equipment	Pair	20
\.


--
-- Data for Name: request_item_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_item_properties (request_item_id, property_id) FROM stdin;
f285c484-4e57-4afa-a35b-83a6c4c56f5b	48106274-4159-44a5-b3f2-5dad2778d218
49b91ff1-582c-430e-becb-c9313b721978	e3eca685-6a5b-4b5c-b8e0-42028f1a6b9b
0c8b9a3a-d911-4f20-9308-8d69ee826f16	16d9530e-3821-4f16-9182-8664ca714510
4e6c4507-b74f-4e76-9f99-eac45c811bf7	e49227e9-743f-4256-b255-90b2f4156897
48522519-eddb-4be3-9db0-f27b721cc3fa	5078a210-dc11-4b25-bd4b-58ff48bad27b
\.


--
-- Data for Name: request_request_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_request_items (request_item_id, request_id) FROM stdin;
f285c484-4e57-4afa-a35b-83a6c4c56f5b	229baf86-fa5a-4e09-8200-5092a12a0da1
49b91ff1-582c-430e-becb-c9313b721978	746e0bf0-04b9-412b-b323-f55e321ebfdc
0c8b9a3a-d911-4f20-9308-8d69ee826f16	fcfe5922-5bd4-4083-a389-0e98a04d4aa4
4e6c4507-b74f-4e76-9f99-eac45c811bf7	1f892f65-b0d0-4b53-9a09-879d96a114d2
48522519-eddb-4be3-9db0-f27b721cc3fa	f7782081-8789-4fde-a5f2-daaaafa76db1
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, "createdAt", "updatedAt", name, division) FROM stdin;
58d34625-3dc4-474f-baa8-7c02ac54fa35	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	superadmin	\N
8004d79e-a34f-44ee-8dd7-7cebc8c8c631	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	admin	\N
95ec7a61-cc28-491e-b402-df293c7f1626	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	director	\N
ac792770-7e5d-404f-bbb1-1fa7f993c8df	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	procurement-staff	\N
c83eb37f-8f50-4589-80ac-01980b758c74	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	employee	\N
14dbf142-03d7-4463-a858-2e335fe19cf6	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	store-staff	\N
2960b97d-cbda-40aa-84ff-09b3fb8e24f2	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	hod	\N
75ec722b-8bcd-493f-84ba-56131bc3b48c	2023-11-12 18:26:25.299247	2023-11-12 18:26:25.299247	vendor	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "createdAt", "updatedAt", username, email, password, name, "roleId", verified) FROM stdin;
bd1d200f-8715-43fd-afa3-bda5891e1e25	2023-11-06 00:39:06.140008	2023-11-06 00:41:29.770455	shihan	shihan@streamline.org	$2b$10$1nxpaNviL9cE1ATvs1qDwONIDnJNFR.OwbHmwgFGi9yZCIELyPSiS	Shihan Thathsara	\N	t
c8d522f4-1a3a-482b-8429-1774438d29a7	2023-11-06 19:59:44.85092	2023-11-06 19:59:44.85092	\N	demo@user.com	$2b$10$K2MbzmMeRAMod41zPfHZw.og6i1nyxsyrs85lF8DsFIy3IdWSNPbW	\N	\N	f
f3ce24ad-319d-4973-ac8b-a36507012ef1	2023-11-06 20:01:54.520884	2023-11-06 20:01:54.520884	\N	test@test.com	$2b$10$DRa.A6PhFamAyTAYQFedyezLiIIbtxBAvcvhzxRxgy0pm8fyt/zQ6	\N	\N	f
33f7342d-25de-4547-b56a-a50a2e073420	2023-11-06 20:03:52.843532	2023-11-06 20:03:52.843532	\N	test1@test.com	$2b$10$nTfUmfgqGFSdPAZKqxb48uaWu2MtnILabME8lWVoYL4srrCZcG/0O	\N	\N	f
829b9cf1-cac8-4932-80d4-0b75ebafedd1	2023-11-06 20:06:34.507897	2023-11-06 20:06:34.507897	\N	dave@triple	$2b$10$wNiMFnRHt14AhOj1Mx5EoesljbZJVv4V8lIIvXenYOwaRSea6pxIW	\N	\N	f
35f832f2-2a7d-456c-bd69-14ca7a5935af	2023-11-06 20:06:39.439958	2023-11-06 20:06:39.439958	\N	dave@triple.com	$2b$10$.mCPBWb7ySpxj1OXy508Ne.TszTmqXvM7ftFKNFxYGXmGkfO7qUFe	\N	\N	f
24bd46e8-5103-4bab-ac89-8815712d2774	2023-11-06 20:07:57.24235	2023-11-06 20:09:35.453924	\N	davis@triple.com	$2b$10$5BxN5tKbloxgmgjJ7p1aRO.UlZHJlD9xKVpaSFntkMfjXpES4cpOq	\N	\N	t
aa91a980-1d2b-49d8-a203-65e7c944e23b	2023-11-06 20:11:43.21471	2023-11-06 20:12:18.276227	\N	prince@udaya.com	$2b$10$QTgrAN.9ztvuCjL0zVycqe3Yab36bbdSsGUr27KVDSoMeVV8tTsga	\N	\N	t
74f48dbe-e9e9-4d0d-bdce-794c389704b5	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	superadmin	superadmin@streamline.org	superadmin	Super Admin	58d34625-3dc4-474f-baa8-7c02ac54fa35	t
3f34fd4d-dc75-4693-a2d0-209c282db8be	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	admin	admin@streamline.org	admin	Admin	8004d79e-a34f-44ee-8dd7-7cebc8c8c631	t
3544b8a8-efe8-4199-81d4-7651fa7236a7	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	jdoe	jhondoe@gmail.com	doe	Jhon Doe	95ec7a61-cc28-491e-b402-df293c7f1626	t
26434168-92ed-4cd4-92de-4483b4760ed3	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	jane	janewilde@gmail.com	1amBig&Better	Jane Wilde	ac792770-7e5d-404f-bbb1-1fa7f993c8df	t
c8859acb-1e62-4fc6-9066-d0a577f322e8	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	john	johnsmith@gmail.com	SecurePassword123	John Smith	ac792770-7e5d-404f-bbb1-1fa7f993c8df	t
7ba177e9-d41a-4c94-b01f-93a02c8be22a	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	jill	jillbrown@gmail.com	JillBrownPass	Jill Brown	c83eb37f-8f50-4589-80ac-01980b758c74	t
da1b9b0a-d0e9-48dc-bdac-3e110aff6f4a	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	mary	marygreen@gmail.com	MaryGreenPass	Mary Green	14dbf142-03d7-4463-a858-2e335fe19cf6	t
146f27a4-8646-4ff6-9edf-d575f9ad4f46	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	bob	bobwhite@gmail.com	BobWhitePass	Bob White	14dbf142-03d7-4463-a858-2e335fe19cf6	t
916fb12d-0303-4cb2-af03-9e752b00d324	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	alex	alexandrasmith@gmail.com	AlexandraPass	Alexandra Smith	2960b97d-cbda-40aa-84ff-09b3fb8e24f2	t
b950ec63-1061-4812-91b4-abb5275ffb3a	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	luke	lukethomas@gmail.com	LukeThomasPass	Luke Thomas	2960b97d-cbda-40aa-84ff-09b3fb8e24f2	t
bba89337-c919-475b-a66a-e52369916e94	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	emma	emmaroberts@gmail.com	EmmaRobertsPass	Emma Roberts	2960b97d-cbda-40aa-84ff-09b3fb8e24f2	t
b1cd685d-9a2e-4ee7-953c-42dda71621cb	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	jason	jasonmiller@gmail.com	JasonMillerPass	Jason Miller	2960b97d-cbda-40aa-84ff-09b3fb8e24f2	t
9885dd5f-e4d2-4d4f-a128-986ebdc2b3ca	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	olivia	oliviamartin@gmail.com	OliviaMartinPass	Olivia Martin	2960b97d-cbda-40aa-84ff-09b3fb8e24f2	t
f6befb7e-499f-4c1d-ab7c-b2d52100b44a	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	marco_rossi	marco.rossi@email.it	MarcoPass123	Marco Rossi	75ec722b-8bcd-493f-84ba-56131bc3b48c	t
83ef4f91-d578-4523-9d7d-af2bcd04a2e2	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	yuki_tanaka	yuki.tanaka@email.jp	YukiSecure456	Yuki Tanaka	75ec722b-8bcd-493f-84ba-56131bc3b48c	t
aa37be9b-3079-45e7-9dd1-82592523fd7a	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	priya_patel	priya.patel@email.in	PriyaStrongPass	Priya Patel	75ec722b-8bcd-493f-84ba-56131bc3b48c	t
d83073c5-967b-42c5-bf0f-6778a2947157	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	giuseppe_ferrari	giuseppe.ferrari@email.it	GiuseppeSecret789	Giuseppe Ferrari	75ec722b-8bcd-493f-84ba-56131bc3b48c	t
d5a8bf6d-b936-4823-a16e-bedba6146026	2023-11-12 18:41:07.036971	2023-11-12 18:41:07.036971	sakura_yamamoto	sakura.yamamoto@email.jp	SakuraSafePass	Sakura Yamamoto	75ec722b-8bcd-493f-84ba-56131bc3b48c	t
097a916c-e528-4509-81b7-76bf256d0fc7	2023-11-12 21:16:40.816163	2023-11-12 21:17:00.305257	\N	kamalaharris@gmail.com	$2b$10$9rHoUT0jQFYBw8oR7VK3xuwdFpFqEmpWB8Da5J23sPMCtSSd8ante	\N	\N	t
\.


--
-- Data for Name: verification_code; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_code (id, "createdAt", "updatedAt", user_id, code, "expirationDate") FROM stdin;
8cc256d8-0e0b-4a3e-a3b2-b7a1a90cbbf7	2023-11-06 00:39:06.204337	2023-11-06 00:39:06.204337	bd1d200f-8715-43fd-afa3-bda5891e1e25	854910	2023-11-06
8d0c4d3c-d608-4897-9c84-012d25ddfaf7	2023-11-06 19:59:44.939218	2023-11-06 19:59:44.939218	c8d522f4-1a3a-482b-8429-1774438d29a7	827684	2023-11-06
4cd525cd-8734-45fc-83eb-0650e66a8675	2023-11-06 20:01:54.587416	2023-11-06 20:01:54.587416	f3ce24ad-319d-4973-ac8b-a36507012ef1	941039	2023-11-06
16164d68-e4a0-472a-bd7e-2f6a7ff358d0	2023-11-06 20:03:52.914677	2023-11-06 20:03:52.914677	33f7342d-25de-4547-b56a-a50a2e073420	360546	2023-11-06
ea6b1d07-4a8d-4881-936f-76092e0b46c7	2023-11-06 20:06:34.568202	2023-11-06 20:06:34.568202	829b9cf1-cac8-4932-80d4-0b75ebafedd1	672154	2023-11-06
28b3e240-1c3e-4150-ba7d-45bc48b7f5cb	2023-11-06 20:06:39.516874	2023-11-06 20:06:39.516874	35f832f2-2a7d-456c-bd69-14ca7a5935af	740984	2023-11-06
b0324b21-a2b4-4991-b83e-46d7c65d677e	2023-11-06 20:07:57.317223	2023-11-06 20:07:57.317223	24bd46e8-5103-4bab-ac89-8815712d2774	326817	2023-11-06
509f22e5-3720-4bee-8257-3c4bba4a5139	2023-11-06 20:11:43.277426	2023-11-06 20:11:43.277426	aa91a980-1d2b-49d8-a203-65e7c944e23b	477187	2023-11-06
b745de83-059e-400a-9ae9-521388598e2c	2023-11-12 21:16:40.89155	2023-11-12 21:16:40.89155	097a916c-e528-4509-81b7-76bf256d0fc7	142189	2023-11-12
\.


--
-- Name: request PK_167d324701e6867f189aed52e18; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY (id);


--
-- Name: file PK_36b46d232307066b3a2c9ea3a1d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);


--
-- Name: request_request_items PK_511613c444759b7340fd58cc9f3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_request_items
    ADD CONSTRAINT "PK_511613c444759b7340fd58cc9f3" PRIMARY KEY (request_item_id, request_id);


--
-- Name: request_item_properties PK_5383ccff9b397299f1d3455432d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_item_properties
    ADD CONSTRAINT "PK_5383ccff9b397299f1d3455432d" PRIMARY KEY (request_item_id, property_id);


--
-- Name: request_item PK_56dd6bc5f964de3ddbf8f75d63b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_item
    ADD CONSTRAINT "PK_56dd6bc5f964de3ddbf8f75d63b" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: verification_code PK_d702c086da466e5d25974512d46; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_code
    ADD CONSTRAINT "PK_d702c086da466e5d25974512d46" PRIMARY KEY (id);


--
-- Name: property PK_d80743e6191258a5003d5843b4f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY (id);


--
-- Name: role UQ_ae4578dcaed5adff96595e61660; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE (name);


--
-- Name: IDX_5a26be712c879d3cda39e40c52; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5a26be712c879d3cda39e40c52" ON public.request_request_items USING btree (request_id);


--
-- Name: IDX_87d75f91477ac77a8e96052039; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_87d75f91477ac77a8e96052039" ON public.request_item_properties USING btree (request_item_id);


--
-- Name: IDX_e9f0e01483acc7b09abea3d227; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_e9f0e01483acc7b09abea3d227" ON public.request_request_items USING btree (request_item_id);


--
-- Name: IDX_ffaf8bebd2836af2b806d6e66c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ffaf8bebd2836af2b806d6e66c" ON public.request_item_properties USING btree (property_id);


--
-- Name: verification_code FK_20dc9f8d86616620881be140833; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_code
    ADD CONSTRAINT "FK_20dc9f8d86616620881be140833" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: request_request_items FK_5a26be712c879d3cda39e40c525; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_request_items
    ADD CONSTRAINT "FK_5a26be712c879d3cda39e40c525" FOREIGN KEY (request_id) REFERENCES public.request(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: request_item_properties FK_87d75f91477ac77a8e960520394; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_item_properties
    ADD CONSTRAINT "FK_87d75f91477ac77a8e960520394" FOREIGN KEY (request_item_id) REFERENCES public.request_item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- Name: request FK_ceb556b62d7a52cd8d689b4841b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT "FK_ceb556b62d7a52cd8d689b4841b" FOREIGN KEY (file_id) REFERENCES public.file(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: request_request_items FK_e9f0e01483acc7b09abea3d227e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_request_items
    ADD CONSTRAINT "FK_e9f0e01483acc7b09abea3d227e" FOREIGN KEY (request_item_id) REFERENCES public.request_item(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: request_item_properties FK_ffaf8bebd2836af2b806d6e66c5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_item_properties
    ADD CONSTRAINT "FK_ffaf8bebd2836af2b806d6e66c5" FOREIGN KEY (property_id) REFERENCES public.property(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

