
    -- Insert users
    INSERT INTO public.user (id, "createdAt", "updatedAt", username, email, password, name, "roleId", verified)
    VALUES
    (7703b922-dcf9-42b6-99b3-46165ccc7666, NOW(), NOW(), 'superadmin', 'superadmin@streamline.org', '$2b$10$CttBnnI.4HpFxws9MhzVg.CxPSSvQTqTVP4KFemuWkWqf5gF0OJZq', 'Will Ferrel', (SELECT id FROM public.role WHERE name = superadmin), true),
    (3f2ce183-1060-499c-b9d5-bea567226f9c, NOW(), NOW(), 'admin', 'superadmin@streamline.org', '$2b$10$yvi.BcU1Vt7S2XwOfHMiFuq7CPweLWztl7UEm8rQSJmY4mFOdHZcG', 'Dennis Berckham', (SELECT id FROM public.role WHERE name = admin), true),
    (2e619a95-1897-49d8-a8d7-b67b41d9a49f, NOW(), NOW(), 'john_doe', 'john_doe@streamline.org', '$2b$10$paxGPKzgnC.5Jtrn39r2A.h350CubCwsRUvZhhxp/EZ1rWi5Zbc2O', 'John Doe', (SELECT id FROM public.role WHERE name = store-staff), true),
    (d6ba6a33-463d-403a-860a-c4a7de585988, NOW(), NOW(), 'jane_smith', 'jane_smith@streamline.org', '$2b$10$myrbm1wjDn/VuG.E0H1BM.2va6BpTnKceuuZWKo/SBTz3.rTGPSGC', 'Jane Smith', (SELECT id FROM public.role WHERE name = procurement-staff), false),
    (44ac23f5-2732-4b99-8b89-584eeb9e65a6, NOW(), NOW(), 'alice_wonderland', 'alice_wonderland@streamline.org', '$2b$10$tV3c1tE/5FP6WtyQ5MH6rehOm4Air8mKD/SAGrbCuu6fC1.NkS9j2', 'Alice Wonderland', (SELECT id FROM public.role WHERE name = employee), false),
    (a181015a-4e12-47d0-bc98-3a7c3e36e479, NOW(), NOW(), 'bob_marley', 'bob_marley@streamline.org', '$2b$10$i.XOSAoGK91eCLbliIrXM.4NdWzpG3y51yt3PfHCQRa/R.Fn36kKm', 'Bob Marley', (SELECT id FROM public.role WHERE name = procurement-staff), false),
    (747a1c61-f0cc-44d9-803b-f44c7f64671e, NOW(), NOW(), 'emma_watson', 'emma_watson@streamline.org', '$2b$10$giwLb8Rx/fv7t/l.6eKKTO/PuJ6v28.fZSgDrmj38/DPt7ZXoQZuu', 'Emma Watson', (SELECT id FROM public.role WHERE name = procurement-staff), false),
    (4fc2cc97-e358-4cf3-8a98-6bf5923ce04c, NOW(), NOW(), 'john_smith', 'john_smith@streamline.org', '$2b$10$F9yelJwaqvEerJE2DW/.MeSG2AXWSKM8wWeZJHaTy1Bh3Y7lxt4ce', 'John Smith', (SELECT id FROM public.role WHERE name = superadmin), false),
    (8e1033e1-d297-4003-91a5-430aa3b03cf9, NOW(), NOW(), 'jane_doe', 'jane_doe@streamline.org', '$2b$10$wbAeeJ/nKTLoxbN8DQXee.fkDekYH5cR/2UTARV6BVx5OvO3tr70.', 'Jane Doe', (SELECT id FROM public.role WHERE name = employee), false),
    (1e31b234-06cd-4502-affc-ffd00f8ccbf3, NOW(), NOW(), 'bob_wonderland', 'bob_wonderland@streamline.org', '$2b$10$JxyFpXgTVCAt5bsQembMqerApU0LZutSo33R9vKuHRCgoXAcrlI6G', 'Bob Wonderland', (SELECT id FROM public.role WHERE name = procurement-staff), false),
    (2a147715-527f-4ac8-b959-79d9bc6c2639, NOW(), NOW(), 'alice_marley', 'alice_marley@streamline.org', '$2b$10$W0GX/3x2eYKH883D0t1R4u36LSYO/JKIBafBmNLCZlQqB7ddmQYCG', 'Alice Marley', (SELECT id FROM public.role WHERE name = store-staff), false),
    (e1e346fd-0a75-47ea-a0ed-8ade79d7e6af, NOW(), NOW(), 'emma_doe', 'emma_doe@streamline.org', '$2b$10$Dd34lHPUYKJSmg0I3/xp/eVkO/kJaOkdQrkHjKRYXgd/ywk3.AyFO', 'Emma Doe', (SELECT id FROM public.role WHERE name = employee), false);

    -- Insert roles
    INSERT INTO public.role (id, "createdAt", "updatedAt", name)
    VALUES
    (62fbdcfb-4b00-4219-b184-944aa9b177cc, NOW(), NOW(),'superadmin'),
    (b25f7269-7cd1-46b7-b473-35325749134e, NOW(), NOW(),'admin'),
    (b00f6d17-4b5b-4e62-820f-50678089d502, NOW(), NOW(),'director'),
    (64c6441c-15bf-48f5-a8a9-7f013b1adbb6, NOW(), NOW(),'employee'),
    (bc7b29f4-78bc-4d04-8e17-7220a032f916, NOW(), NOW(),'procurement-staff'),
    (c367a3bf-f2f8-42cb-baca-767d17b31020, NOW(), NOW(),'store-staff');

    -- Insert verification codes
    INSERT INTO public.verification_code (id, "createdAt", "updatedAt", user_id, code)
    VALUES
    (189ff4f9-015c-4006-b1cb-5bffab2d3d5f, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'superadmin'), '$2b$10$B0kV623lSvhmrtmucXj2pu21dtF4lUAqmSKwzqhAv0eoQ56otGCWq'),
    (ad62c89e-07ab-4c1e-9f83-2bf49a50ba70, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'admin'), '$2b$10$kqaWUUF6xxfg7QmMPMjBoOITo9VHVMk8X4gf42P7uRXfvDcYvygiS'),
    (b6330f6c-9b1c-4d67-baa8-18538412c2b5, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_doe'), '$2b$10$LlNJ38P.S7MSPN4JQtfMM.XbQS.zQ8VYmlMPqb/0VvcM.8qe1Rf0O'),
    (c3437f07-7f81-4e46-b3ff-1b8df184e480, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_smith'), '$2b$10$kdIPc3Pbt2TA5S.SV6arIe10srwMjava5yQxdXG0o59c0xnL1Zk2C'),
    (e5607fd4-49ae-4c43-b842-79c6fce60c51, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_wonderland'), '$2b$10$xKzp7Xf09bCMYx5/C4AliOYjvzhbcqdx/6GbqagdKdSRCm15qgQOW'),
    (b5e7cf57-f447-422d-a037-a074e3c06cee, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_marley'), '$2b$10$XnCtxU0XQxM3vDxDNC5NWON8tizQZu729JrSMCUoeRPzDjsbb6VDy'),
    (f4756e58-22d1-49b1-8f58-9d4ee9cd5aa8, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_watson'), '$2b$10$Qm/hRSwael2yzTdw52PxDOOAeS9CPoJdEj7qfH5J9ncGz4bPDrHyG'),
    (43587701-7616-4d5c-9953-a4d6e04dc470, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'john_smith'), '$2b$10$AScgfwaFEp0NI1R0qaz1LeSKnY.zSv92WsGbvSSDKqMbdYnLJAiDy'),
    (5860e659-40a6-4d39-b35f-299df55a1ce0, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'jane_doe'), '$2b$10$YSzReVI0RqrCM5bib9orOeQguc3U3AjKP8bQi4Zw1.43ZEiwSouXC'),
    (14cd2291-4e4d-4df1-b804-cb7442a31858, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'bob_wonderland'), '$2b$10$dQez/wY//FxiwyJn2u3vs.VmvLGGRFTFKVL5OTaYR/WAJOAo5WhkK'),
    (d3f983e6-7c77-4de0-8c48-6f31c9233db7, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'alice_marley'), '$2b$10$UjRzzKqQOxnb9yAk3Fvpg.If0GmtwlYkkFs5qB8e18Wr.gDEYOQSK'),
    (5f4e6315-43b1-4294-b780-f7dc06382028, NOW(), NOW(), (SELECT id FROM public.user WHERE username = 'emma_doe'), '$2b$10$nT7aTCDgAkqCCH41MyQQwe8Bl4r6Kf22lanSeMYHiK4FGtSIJYbma');
  