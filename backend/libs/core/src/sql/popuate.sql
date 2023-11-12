-- Insert data into "role" table
INSERT INTO role (name, division)
VALUES
  ('superadmin', NULL),
  ('admin', NULL),
  ('director', NULL),
  ('procurement-staff', NULL),
  ('employee', NULL),
  ('store-staff', NULL),
  ('hod', NULL),
  ('vendor', NULL);

-- Insert data into "user" table
INSERT INTO "user" (username, email, password, name, "roleId", verified)
VALUES
  -- SUPERADMIN
  ('superadmin', 'superadmin@streamline.org', 'superadmin', 'Super Admin', (SELECT id FROM role WHERE name = 'superadmin'), true),

  -- ADMIN
  ('admin', 'admin@streamline.org', 'admin', 'Admin', (SELECT id FROM role WHERE name = 'admin'), true),

  -- DIRECTOR
  ('jdoe', 'jhondoe@gmail.com', 'doe', 'Jhon Doe', (SELECT id FROM role WHERE name = 'director'), true),

  -- PROCUREMENT_STAFF
  ('jane', 'janewilde@gmail.com', '1amBig&Better', 'Jane Wilde', (SELECT id FROM role WHERE name = 'procurement-staff'), true),
  ('john', 'johnsmith@gmail.com', 'SecurePassword123', 'John Smith', (SELECT id FROM role WHERE name = 'procurement-staff'), true),

  -- EMPLOYEE
  ('jill', 'jillbrown@gmail.com', 'JillBrownPass', 'Jill Brown', (SELECT id FROM role WHERE name = 'employee'), true),

  -- STORE_STAFF
  ('mary', 'marygreen@gmail.com', 'MaryGreenPass', 'Mary Green', (SELECT id FROM role WHERE name = 'store-staff'), true),
  ('bob', 'bobwhite@gmail.com', 'BobWhitePass', 'Bob White', (SELECT id FROM role WHERE name = 'store-staff'), true),

  -- HOD
  ('alex', 'alexandrasmith@gmail.com', 'AlexandraPass', 'Alexandra Smith', (SELECT id FROM role WHERE name = 'hod'), true),
  ('luke', 'lukethomas@gmail.com', 'LukeThomasPass', 'Luke Thomas', (SELECT id FROM role WHERE name = 'hod'), true),
  ('emma', 'emmaroberts@gmail.com', 'EmmaRobertsPass', 'Emma Roberts', (SELECT id FROM role WHERE name = 'hod'), true),
  ('jason', 'jasonmiller@gmail.com', 'JasonMillerPass', 'Jason Miller', (SELECT id FROM role WHERE name = 'hod'), true),
  ('olivia', 'oliviamartin@gmail.com', 'OliviaMartinPass', 'Olivia Martin', (SELECT id FROM role WHERE name = 'hod'), true),

  -- VENDOR
  ('marco_rossi', 'marco.rossi@email.it', 'MarcoPass123', 'Marco Rossi', (SELECT id FROM role WHERE name = 'vendor'), true),
  ('yuki_tanaka', 'yuki.tanaka@email.jp', 'YukiSecure456', 'Yuki Tanaka', (SELECT id FROM role WHERE name = 'vendor'), true),
  ('priya_patel', 'priya.patel@email.in', 'PriyaStrongPass', 'Priya Patel', (SELECT id FROM role WHERE name = 'vendor'), true),
  ('giuseppe_ferrari', 'giuseppe.ferrari@email.it', 'GiuseppeSecret789', 'Giuseppe Ferrari', (SELECT id FROM role WHERE name = 'vendor'), true),
  ('sakura_yamamoto', 'sakura.yamamoto@email.jp', 'SakuraSafePass', 'Sakura Yamamoto', (SELECT id FROM role WHERE name = 'vendor'), true);

-- Insert data into "file" table
INSERT INTO file (name)
VALUES
  ('Document 1'),
  ('Document 2'),
  ('Document 3'),
  ('Document 4'),
  ('Document 5');

-- Insert data into "request" table
INSERT INTO request ("requestType", description, file_id, requested_by, status)
VALUES
  ('Gas', 'Request for Gas Supply', (SELECT id FROM file WHERE name = 'Document 1'), (SELECT id FROM "user" WHERE username = 'alex'), 'pending'),
  ('Lab Equipment', 'Request for Lab Equipment', (SELECT id FROM file WHERE name = 'Document 2'), (SELECT id FROM "user" WHERE username = 'luke'), 'approved'),
  ('Equipment Maintenance', 'Equipment Maintenance Request', (SELECT id FROM file WHERE name = 'Document 3'), (SELECT id FROM "user" WHERE username = 'emma'), 'rejected'),
  ('Gas', 'Urgent Gas Supply Request', (SELECT id FROM file WHERE name = 'Document 4'), (SELECT id FROM "user" WHERE username = 'jason'), 'pending'),
  ('Lab Equipment', 'Lab Instruments Purchase Request', (SELECT id FROM file WHERE name = 'Document 5'), (SELECT id FROM "user" WHERE username = 'olivia'), 'approved');


-- Insert data into "request_item" table
INSERT INTO request_item (name, sku, quantity, type, unit, price)
VALUES
  ('Oxygen Gas', 'SKU-OXY', 5, 'Gas', 'Cylinder', 100.00),
  ('Microscope', 'SKU-MIC', 2, 'Lab Equipment', 'Unit', 500.00),
  ('Machine Maintenance', 'SKU-MAIN', 1, 'Equipment Maintenance', 'Service', 800.00),
  ('Hydrogen Gas', 'SKU-H2', 3, 'Gas', 'Cylinder', 120.00),
  ('Safety Goggles', 'SKU-SAFE', 10, 'Lab Equipment', 'Pair', 20.00);

-- Insert data into "property" table
INSERT INTO property (key, value, type)
VALUES
  ('Gas Type', 'Oxygen', 'Gas'),
  ('Lab Equipment Type', 'Microscope', 'Lab Equipment'),
  ('Maintenance Type', 'Machine Maintenance', 'Equipment Maintenance'),
  ('Gas Type', 'Hydrogen', 'Gas'),
  ('Lab Equipment Type', 'Safety Goggles', 'Lab Equipment');

-- Insert data into "request_item_properties" table
INSERT INTO request_item_properties (request_item_id, property_id)
VALUES
  ((SELECT id FROM request_item WHERE name = 'Oxygen Gas'), (SELECT id FROM property WHERE key = 'Gas Type' AND value = 'Oxygen')),
  ((SELECT id FROM request_item WHERE name = 'Microscope'), (SELECT id FROM property WHERE key = 'Lab Equipment Type' AND value = 'Microscope')),
  ((SELECT id FROM request_item WHERE name = 'Machine Maintenance'), (SELECT id FROM property WHERE key = 'Maintenance Type' AND value = 'Machine Maintenance')),
  ((SELECT id FROM request_item WHERE name = 'Hydrogen Gas'), (SELECT id FROM property WHERE key = 'Gas Type' AND value = 'Hydrogen')),
  ((SELECT id FROM request_item WHERE name = 'Safety Goggles'), (SELECT id FROM property WHERE key = 'Lab Equipment Type' AND value = 'Safety Goggles'));

-- Insert data into "request_request_items" table
INSERT INTO request_request_items (request_item_id, request_id)
VALUES
  ((SELECT id FROM request_item WHERE name = 'Oxygen Gas'), (SELECT id FROM request WHERE requested_by::text = (SELECT id FROM public.user WHERE name = 'Alexandra Smith')::text)),
  ((SELECT id FROM request_item WHERE name = 'Microscope'), (SELECT id FROM request WHERE requested_by::text = (SELECT id FROM public.user WHERE name = 'Luke Thomas')::text)),
  ((SELECT id FROM request_item WHERE name = 'Machine Maintenance'), (SELECT id FROM request WHERE requested_by::text = (SELECT id FROM public.user WHERE name = 'Emma Roberts')::text)),
  ((SELECT id FROM request_item WHERE name = 'Hydrogen Gas'), (SELECT id FROM request WHERE requested_by::text = (SELECT id FROM public.user WHERE name = 'Jason Miller')::text)),
  ((SELECT id FROM request_item WHERE name = 'Safety Goggles'), (SELECT id FROM request WHERE requested_by::text = (SELECT id FROM public.user WHERE name = 'Olivia Martin')::text));


