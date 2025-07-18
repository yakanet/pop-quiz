-- Custom SQL migration file, put your code below! --
CREATE OR REPLACE FUNCTION notify_quiz_change()
    RETURNS trigger AS
$$
DECLARE
    payload JSON;
BEGIN
    -- You can customize the payload structure as needed
    payload := json_build_object(
            'operation', TG_OP,
            'quiz_pool_id', COALESCE(NEW.id, OLD.id),
            'state', COALESCE(NEW.state, 'PENDING'),
            'timestamp', current_timestamp
               );
    -- Send notification on the "quiz_changes" channel
    PERFORM pg_notify('quiz_changes', payload::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER quiz_change_trigger
    AFTER INSERT OR UPDATE
    ON quiz_pool
    FOR EACH ROW
EXECUTE FUNCTION notify_quiz_change();
