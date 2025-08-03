-- Custom SQL migration file, put your code below! --
-- Have the basic quiz_stat for initialization --
INSERT INTO quiz_state
VALUES (1, 'NOT_STARTED')
ON CONFLICT DO NOTHING;