-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert roles with generated UUIDs
INSERT INTO public.role (id, createdAt, updatedAt, division, name)
VALUES
  (uuid_generate_v4(), NOW(), NOW(), 'Division A', 'Admin'),
  (uuid_generate_v4(), NOW(), NOW(), 'Division B', 'User'),
  (uuid_generate_v4(), NOW(), NOW(), 'Division C', 'Manager');

-- Insert users with generated UUIDs
INSERT INTO public.user (id, createdAt, updatedAt, username, email, password, name, roleId, verified)
VALUES
  (uuid_generate_v4(), NOW(), NOW(), 'admin_user', 'admin@example.com', 'admin_password', 'Admin User', (SELECT id FROM public.role WHERE name = 'Admin'), true),
  (uuid_generate_v4(), NOW(), NOW(), 'john_doe', 'john@example.com', 'user_password', 'John Doe', (SELECT id FROM public.role WHERE name = 'User'), false),
  (uuid_generate_v4(), NOW(), NOW(), 'manager123', 'manager@example.com', 'manager_password', 'Manager User', (SELECT id FROM public.role WHERE name = 'Manager'), true);

-- Insert verification codes with generated UUIDs
INSERT INTO public.verification_code (id, createdAt, updatedAt, user_id, code)
VALUES
  (uuid_generate_v4(), NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_doe'), 'verification_code_123'),
  (uuid_generate_v4(), NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'manager123'), 'verification_code_456');
