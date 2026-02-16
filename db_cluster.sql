PGPASSWORD=postgres psql -h localhost -p 5433 -U postgres -f /home/eugene/Artisan-Bakery/db_cluster.sql 2>&1 | tail -100

ndard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE anon;
ALTER ROLE anon WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticated;
ALTER ROLE authenticated WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE authenticator;
ALTER ROLE authenticator WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE dashboard_user;
ALTER ROLE dashboard_user WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE pgbouncer;
ALTER ROLE pgbouncer WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE postgres;
ALTER ROLE postgres WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE service_role;
ALTER ROLE service_role WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_admin;
ALTER ROLE supabase_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE supabase_auth_admin;
ALTER ROLE supabase_auth_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_read_only_user;
ALTER ROLE supabase_read_only_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION BYPASSRLS;
CREATE ROLE supabase_realtime_admin;
ALTER ROLE supabase_realtime_admin WITH NOSUPERUSER NOINHERIT NOCREATEROLE NOCREATEDB NOLOGIN NOREPLICATION NOBYPASSRLS;
CREATE ROLE supabase_replication_admin;
ALTER ROLE supabase_replication_admin WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN REPLICATION NOBYPASSRLS;
CREATE ROLE supabase_storage_admin;
ALTER ROLE supabase_storage_admin WITH NOSUPERUSER NOINHERIT CREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS;

--
-- User Configurations
--

--
-- User Config "anon"
--

ALTER ROLE anon SET statement_timeout TO '3s';

--
-- User Config "authenticated"
--

ALTER ROLE authenticated SET statement_timeout TO '8s';

--
-- User Config "authenticator"
--

ALTER ROLE authenticator SET session_preload_libraries TO 'safeupdate';
ALTER ROLE authenticator SET statement_timeout TO '8s';
ALTER ROLE authenticator SET lock_timeout TO '8s';

--
-- User Config "postgres"
--

ALTER ROLE postgres SET search_path TO E'\\$user', 'public', 'extensions';

--
-- User Config "supabase_admin"
--

ALTER ROLE supabase_admin SET search_path TO '$user', 'public', 'auth', 'extensions';
ALTER ROLE supabase_admin SET log_statement TO 'none';

--
-- User Config "supabase_auth_admin"
--

ALTER ROLE supabase_auth_admin SET search_path TO 'auth';
ALTER ROLE supabase_auth_admin SET idle_in_transaction_session_timeout TO '60000';
ALTER ROLE supabase_auth_admin SET log_statement TO 'none';

--
-- User Config "supabase_read_only_user"
--

ALTER ROLE supabase_read_only_user SET default_transaction_read_only TO 'on';

--
-- User Config "supabase_storage_admin"
--

ALTER ROLE supabase_storage_admin SET search_path TO 'storage';
ALTER ROLE supabase_storage_admin SET log_statement TO 'none';


--
-- Role memberships
--

GRANT anon TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT anon TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticated TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT authenticated TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT authenticator TO supabase_storage_admin WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT pg_create_subscription TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_monitor TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_read_all_data TO supabase_read_only_user WITH INHERIT TRUE GRANTED BY supabase_admin;
GRANT pg_signal_backend TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT service_role TO authenticator WITH INHERIT FALSE GRANTED BY supabase_admin;
GRANT service_role TO postgres WITH ADMIN OPTION, INHERIT TRUE GRANTED BY supabase_admin;
GRANT supabase_realtime_admin TO postgres WITH INHERIT TRUE GRANTED BY supabase_admin;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

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

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select
        rolname::text,
        case when rolvaliduntil < now()
            then null
            else rolpassword::text
        end
    from pg_authid
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    author text NOT NULL,
    category text NOT NULL,
    tags text[] DEFAULT '{}'::text[],
    image_url text NOT NULL,
    read_time text NOT NULL,
    is_published boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.blog_posts OWNER TO postgres;

--
-- Name: custom_cakes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.custom_cakes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_item_id uuid,
    size text NOT NULL,
    flavor text NOT NULL,
    frosting text NOT NULL,
    decorations text[] DEFAULT '{}'::text[],
    custom_message text,
    total_price numeric(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.custom_cakes OWNER TO postgres;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id uuid NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    address text,
    city text,
    zip_code text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: event_registrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_registrations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event_id uuid,
    customer_id uuid,
    registration_date timestamp with time zone DEFAULT now(),
    payment_status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT event_registrations_payment_status_check CHECK ((payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text])))
);


ALTER TABLE public.event_registrations OWNER TO postgres;

--
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    event_date date NOT NULL,
    event_time time without time zone NOT NULL,
    duration text NOT NULL,
    location text NOT NULL,
    price numeric(10,2) NOT NULL,
    max_participants integer NOT NULL,
    current_participants integer DEFAULT 0,
    instructor text NOT NULL,
    difficulty text NOT NULL,
    category text NOT NULL,
    image_url text NOT NULL,
    includes text[] DEFAULT '{}'::text[],
    requirements text[] DEFAULT '{}'::text[],
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT events_category_check CHECK ((category = ANY (ARRAY['Workshop'::text, 'Class'::text, 'Special Event'::text]))),
    CONSTRAINT events_difficulty_check CHECK ((difficulty = ANY (ARRAY['Beginner'::text, 'Intermediate'::text, 'Advanced'::text])))
);


ALTER TABLE public.events OWNER TO postgres;

--
-- Name: newsletter_subscribers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    is_active boolean DEFAULT true,
    subscribed_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.newsletter_subscribers OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    order_id uuid,
    product_id uuid,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    customizations jsonb,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT order_items_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    customer_id uuid,
    order_type text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    pickup_date date NOT NULL,
    pickup_time time without time zone NOT NULL,
    special_instructions text,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) NOT NULL,
    delivery_fee numeric(10,2) DEFAULT 0,
    total numeric(10,2) NOT NULL,
    payment_status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT orders_order_type_check CHECK ((order_type = ANY (ARRAY['pickup'::text, 'delivery'::text]))),
    CONSTRAINT orders_payment_status_check CHECK ((payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text, 'refunded'::text]))),
    CONSTRAINT orders_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'preparing'::text, 'ready'::text, 'completed'::text, 'cancelled'::text])))
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    special_price numeric(10,2),
    category text NOT NULL,
    image_url text NOT NULL,
    ingredients text[] DEFAULT '{}'::text[],
    allergens text[] DEFAULT '{}'::text[],
    is_special boolean DEFAULT false,
    is_available boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.testimonials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    customer_id uuid,
    name text NOT NULL,
    content text NOT NULL,
    rating integer NOT NULL,
    image_url text,
    is_approved boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT testimonials_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.testimonials OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	64e5b4f3-0f3f-444a-9c8e-bc861401e96b	{"action":"user_signedup","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-06-12 18:17:27.885622+00
00000000-0000-0000-0000-000000000000	fd4af87f-41d7-4d7d-94b6-bb3a02955cc3	{"action":"login","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-12 18:17:27.894624+00
00000000-0000-0000-0000-000000000000	75215584-e3f7-498d-bad1-71d6b70808cb	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-12 20:05:27.496935+00
00000000-0000-0000-0000-000000000000	4e261acd-2ebf-4802-965a-d0f649a2f624	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-12 20:05:27.497874+00
00000000-0000-0000-0000-000000000000	6f510c85-cfd4-4794-930f-504270c73ecb	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-12 21:15:32.579187+00
00000000-0000-0000-0000-000000000000	efd65c4b-acdf-456b-8fee-7c9b8c2241ea	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-12 21:15:32.58012+00
00000000-0000-0000-0000-000000000000	68e20641-48c6-4efa-95c7-610c3f381305	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-13 06:12:39.337427+00
00000000-0000-0000-0000-000000000000	74ef924f-4fe9-47ba-acbc-4e6fe909c520	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-13 06:12:39.338274+00
00000000-0000-0000-0000-000000000000	f5b71a5b-6082-49ed-a62b-6cf0b5fd3124	{"action":"login","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-13 14:39:25.541122+00
00000000-0000-0000-0000-000000000000	083ad9bd-2b5f-4d89-b9fa-b482e64a0eba	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-13 15:37:55.059745+00
00000000-0000-0000-0000-000000000000	46b1f60c-011a-48ee-a4bb-ddc269df3660	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-13 15:37:55.076182+00
00000000-0000-0000-0000-000000000000	f82b2ba1-0924-4379-9b09-4c9dabe843cd	{"action":"login","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-06-16 04:30:11.816471+00
00000000-0000-0000-0000-000000000000	6f6a196d-3c9c-4a0d-820f-91d3b7abd223	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 06:36:41.587386+00
00000000-0000-0000-0000-000000000000	dcf91f19-fd62-45fd-bc96-313ffe0a9191	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 06:36:41.591689+00
00000000-0000-0000-0000-000000000000	0db8f62f-b503-4fc0-98d8-a469f17ad9f9	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 07:36:31.116274+00
00000000-0000-0000-0000-000000000000	8415d752-db10-44c4-ba23-16e7266fd6b0	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 07:36:31.117213+00
00000000-0000-0000-0000-000000000000	df7d4540-786c-439b-a6e4-a61400f7f96c	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 14:14:58.21486+00
00000000-0000-0000-0000-000000000000	78795ed1-1269-491e-87f3-41c67f1c96cb	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 14:14:58.226937+00
00000000-0000-0000-0000-000000000000	45fe7ac6-49fe-4f33-b44a-f1da4c491eec	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 22:27:09.826757+00
00000000-0000-0000-0000-000000000000	39447dd2-332b-4471-b1eb-9959a6a8f85e	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-16 22:27:09.834356+00
00000000-0000-0000-0000-000000000000	184b6dd2-ef67-4f10-9048-2568796c924b	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 05:51:48.934823+00
00000000-0000-0000-0000-000000000000	fae7ff30-5692-4da4-9362-8eda927242ac	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 05:51:48.944152+00
00000000-0000-0000-0000-000000000000	fd732e7e-4669-4f08-97a0-64270391fe46	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 07:21:43.16738+00
00000000-0000-0000-0000-000000000000	b324a031-bbf6-4cc5-8733-0b058b7dfd9b	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 07:21:43.180876+00
00000000-0000-0000-0000-000000000000	d11ee41c-59c6-4653-87df-14f6133927bc	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 09:49:36.837682+00
00000000-0000-0000-0000-000000000000	ea532469-722b-409d-a923-0d86dc216fa9	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-06-17 09:49:36.839363+00
00000000-0000-0000-0000-000000000000	0c9248a9-7b0c-436e-b0fe-4a9715945080	{"action":"login","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-07-17 09:00:16.932105+00
00000000-0000-0000-0000-000000000000	5949da7e-21dd-46b1-b55c-1e21558e2728	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 10:22:22.638076+00
00000000-0000-0000-0000-000000000000	3a17ca1e-2dd1-4ff5-903b-073d3bf0b487	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 10:22:22.641871+00
00000000-0000-0000-0000-000000000000	fcd80e54-6ce5-4b37-950a-8d0c6389081e	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 15:16:29.773311+00
00000000-0000-0000-0000-000000000000	b79cad78-c29c-4059-a840-4813d1b883c8	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 15:16:29.775646+00
00000000-0000-0000-0000-000000000000	7b2f8cb8-be5d-4341-a1e4-d23ecb2d6abe	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 19:14:34.280566+00
00000000-0000-0000-0000-000000000000	3c082ee1-d922-4299-92ff-7f3391eaa990	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-17 19:14:34.282251+00
00000000-0000-0000-0000-000000000000	54119357-0213-4415-b81c-0c7531c5e11b	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 09:39:09.861796+00
00000000-0000-0000-0000-000000000000	380e533b-4eb2-45bb-9fd6-4a61b7e25383	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 09:39:09.867899+00
00000000-0000-0000-0000-000000000000	68606740-74d0-49d8-b71a-1f655d1fa30a	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 10:41:22.227597+00
00000000-0000-0000-0000-000000000000	94708356-d2f6-4339-8168-6b6175c38dcf	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 10:41:22.229161+00
00000000-0000-0000-0000-000000000000	b50a6fd5-9f4d-4a88-9e97-dce963182acb	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 11:40:43.938448+00
00000000-0000-0000-0000-000000000000	d755b810-f9c0-4856-9dbd-d28661dedaaf	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 11:40:43.940584+00
00000000-0000-0000-0000-000000000000	fb8558b2-bf8b-4f76-9cc1-300ccd954149	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 12:39:19.64321+00
00000000-0000-0000-0000-000000000000	5b1eb8b3-5965-4448-bc54-58c794d90d89	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 12:39:19.645696+00
00000000-0000-0000-0000-000000000000	8e81e85d-fb86-4f6b-a234-303cd0458de2	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 15:38:45.796549+00
00000000-0000-0000-0000-000000000000	f0e01f1f-2067-4c9f-9322-7d08c142ab03	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 15:38:45.798217+00
00000000-0000-0000-0000-000000000000	999dc9c3-e157-4d59-8d3a-f3cae4151fcd	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 16:46:43.344081+00
00000000-0000-0000-0000-000000000000	fa524840-041e-487b-836a-0da9a59526b8	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-18 16:46:43.345698+00
00000000-0000-0000-0000-000000000000	897f7069-eabf-4561-8eff-6ed0cd3966d5	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 07:07:32.908639+00
00000000-0000-0000-0000-000000000000	31f03383-5617-4ba5-bfdf-499e7c190d54	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 07:07:32.919123+00
00000000-0000-0000-0000-000000000000	3bdb7c7b-3b52-4f9b-bdb4-adc9b5d718ff	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 08:49:41.388105+00
00000000-0000-0000-0000-000000000000	783e8dd5-c731-48bd-b7ef-8a878b1304c2	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 08:49:41.388977+00
00000000-0000-0000-0000-000000000000	49f86a43-95b6-4d71-be21-77ded9b1eb38	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 11:15:20.544227+00
00000000-0000-0000-0000-000000000000	8620a455-df6c-40c4-bbe5-c06224e5bb6e	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 11:15:20.54647+00
00000000-0000-0000-0000-000000000000	403eae38-ea3b-49fa-86e2-32097153d6b5	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 18:56:20.43321+00
00000000-0000-0000-0000-000000000000	7455ea43-0112-458c-bbbe-1b5a54660701	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-19 18:56:20.436637+00
00000000-0000-0000-0000-000000000000	f0474e78-9b92-4835-978d-1948b6554d33	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 04:39:09.165154+00
00000000-0000-0000-0000-000000000000	6859dfcd-20af-4021-8851-3ba82e13053f	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 04:39:09.166473+00
00000000-0000-0000-0000-000000000000	3c0c1c94-f7bd-4584-83ad-03b593b8302c	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 09:36:16.328373+00
00000000-0000-0000-0000-000000000000	6f456a6c-bd6d-4050-b058-21e28ca665b6	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-20 09:36:16.332063+00
00000000-0000-0000-0000-000000000000	bc5cc8a9-fd68-4117-a2c5-9fec8ac6b131	{"action":"token_refreshed","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-27 20:50:41.030706+00
00000000-0000-0000-0000-000000000000	4cca2a16-43b9-4fa5-b526-f50fb128c937	{"action":"token_revoked","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-07-27 20:50:41.087753+00
00000000-0000-0000-0000-000000000000	f165c203-86c6-4aef-a4ca-8cf271d5ef3c	{"action":"user_repeated_signup","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-01 13:58:46.949901+00
00000000-0000-0000-0000-000000000000	a9d58662-32e4-4086-87be-d4be2a3210ce	{"action":"user_repeated_signup","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-01 13:58:47.001644+00
00000000-0000-0000-0000-000000000000	0182361e-424c-4967-ada5-afad4bc18893	{"action":"user_repeated_signup","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-01 14:10:20.516317+00
00000000-0000-0000-0000-000000000000	5a0be135-b1cd-4acf-afb7-058b794ec05f	{"action":"user_repeated_signup","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2025-08-01 14:10:35.468441+00
00000000-0000-0000-0000-000000000000	31471a98-3850-4ea1-852c-03b4210823f8	{"action":"user_signedup","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-01 14:12:13.679619+00
00000000-0000-0000-0000-000000000000	c3dee9f4-a903-4ffa-ab75-cdd2ac8aca81	{"action":"login","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-01 14:12:13.7027+00
00000000-0000-0000-0000-000000000000	e5b13fef-e7b2-4a6f-80a5-aa4bb851fe63	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-01 15:40:54.287384+00
00000000-0000-0000-0000-000000000000	94f51d8d-863d-4e64-9609-5660b105ef91	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-01 15:40:54.313099+00
00000000-0000-0000-0000-000000000000	dfca0e4d-5ebd-4037-9b70-f9e9d91944ea	{"action":"logout","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-01 16:10:02.359779+00
00000000-0000-0000-0000-000000000000	90dfbc19-9243-412f-9ce5-6a41b39d75d4	{"action":"login","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-01 16:10:22.519866+00
00000000-0000-0000-0000-000000000000	3a9020c0-33c0-4a75-bd8d-09b407e7f16a	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:56:40.085423+00
00000000-0000-0000-0000-000000000000	78263e18-9979-47f8-ab99-1284b125351b	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 08:56:40.113231+00
00000000-0000-0000-0000-000000000000	7132524a-5d83-4deb-bbbe-aa0de9c3a1d8	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 10:04:38.827824+00
00000000-0000-0000-0000-000000000000	1910aa59-cdce-40e8-8e5a-9746b5925b9e	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 10:04:38.860488+00
00000000-0000-0000-0000-000000000000	5ab02f2d-9c24-4905-b188-7122287b57aa	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 11:10:32.947751+00
00000000-0000-0000-0000-000000000000	d4fd412a-279d-4e6e-9797-7c1515b6bb44	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 11:10:32.970113+00
00000000-0000-0000-0000-000000000000	03aaf484-abd1-4fc3-b440-d18eb34fdc5c	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 12:15:53.920677+00
00000000-0000-0000-0000-000000000000	def00829-d9ab-429e-b9f3-a8985b13d95c	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 12:15:53.943649+00
00000000-0000-0000-0000-000000000000	21ff8968-9161-4b4d-b85c-e1c222fafa2f	{"action":"token_refreshed","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 13:27:27.995869+00
00000000-0000-0000-0000-000000000000	f0b24444-13e2-4a74-bc7b-6dabd3139841	{"action":"token_revoked","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 13:27:28.024879+00
00000000-0000-0000-0000-000000000000	ece87cb9-47b9-45b5-a209-7e1808727319	{"action":"logout","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-05 14:16:25.267488+00
00000000-0000-0000-0000-000000000000	b236f48f-3c0b-4078-a4d6-9e8c8a9abe89	{"action":"user_signedup","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2025-08-05 14:18:20.662274+00
00000000-0000-0000-0000-000000000000	019d2006-ec8f-42e8-96d5-0f23d68383e9	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-05 14:18:20.679113+00
00000000-0000-0000-0000-000000000000	84ca24e8-2982-4e42-9951-bfafcc396135	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 15:17:03.730311+00
00000000-0000-0000-0000-000000000000	246a10d4-224a-4a17-bf64-7d8d879b9640	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 15:17:03.748321+00
00000000-0000-0000-0000-000000000000	ad4967eb-257a-4902-a03c-ffb7932e6c7e	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 19:13:22.376494+00
00000000-0000-0000-0000-000000000000	8aced4b0-aa92-473b-bf6c-8bacaf93b672	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-05 19:13:22.405131+00
00000000-0000-0000-0000-000000000000	8d84032d-6745-4eef-bf5a-70eb335413df	{"action":"logout","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-05 19:22:12.88703+00
00000000-0000-0000-0000-000000000000	947a701d-ee1f-4ac7-98a1-d5c7266f1bfe	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-05 19:23:15.968633+00
00000000-0000-0000-0000-000000000000	1f3cf757-6eff-43f9-b755-a10f5684c13b	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-06 07:28:20.674724+00
00000000-0000-0000-0000-000000000000	3dfcaeba-90d3-4401-959c-85ddc4a45a62	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-06 07:28:20.704724+00
00000000-0000-0000-0000-000000000000	a016e1ab-f022-48e1-8634-2f5890aa3a6d	{"action":"logout","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-06 07:44:29.444413+00
00000000-0000-0000-0000-000000000000	34d285c3-247b-4765-b4cb-029d32b93659	{"action":"login","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-06 08:28:55.253979+00
00000000-0000-0000-0000-000000000000	0e7a8570-0cdc-41dc-8dd3-82b2a2ff1731	{"action":"logout","actor_id":"9f079173-db30-4434-ab53-51486e0fe005","actor_username":"charlie@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-06 08:29:06.686534+00
00000000-0000-0000-0000-000000000000	87b10e69-6f50-43f6-b338-d4b6a64a3cc2	{"action":"user_recovery_requested","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"user"}	2025-08-06 08:29:43.782174+00
00000000-0000-0000-0000-000000000000	f943f754-94de-4a9c-ab5d-1d27a4cfb716	{"action":"login","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-06 08:30:32.299408+00
00000000-0000-0000-0000-000000000000	0482ef16-cac9-42e9-a20f-26563457c842	{"action":"logout","actor_id":"4b229687-bb59-4f30-b219-2749e16aa343","actor_username":"eugenco578@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-06 08:32:41.561571+00
00000000-0000-0000-0000-000000000000	41f7743e-2308-49e1-918d-4c020769a7fd	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-06 19:08:09.285385+00
00000000-0000-0000-0000-000000000000	06496ea1-dcc6-42df-927f-b68bafaaf8c4	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-06 19:10:07.984148+00
00000000-0000-0000-0000-000000000000	0bc0f073-8b58-408b-991e-ef77c994a70f	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-06 19:11:33.779669+00
00000000-0000-0000-0000-000000000000	25b1fbf7-90e6-4004-bea6-abac5324dc8c	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-06 20:22:11.268885+00
00000000-0000-0000-0000-000000000000	e0a9b010-220d-470a-ab83-30cced7a42ac	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-06 20:22:11.294017+00
00000000-0000-0000-0000-000000000000	ba4e1b3c-b561-49cc-90bd-d63d18cd532c	{"action":"logout","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account"}	2025-08-06 20:42:31.58804+00
00000000-0000-0000-0000-000000000000	b18ebaeb-a47d-4544-9978-e5a046cef7a2	{"action":"login","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2025-08-07 10:24:55.711186+00
00000000-0000-0000-0000-000000000000	318e88da-a40d-4ccd-9cba-e1e59320d42e	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 12:24:35.904619+00
00000000-0000-0000-0000-000000000000	915ae327-10b8-4ecb-ada3-9252f0e7aec0	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 12:24:35.934797+00
00000000-0000-0000-0000-000000000000	780a0258-0cb2-470f-91c5-8f65ef10f158	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 12:24:44.858909+00
00000000-0000-0000-0000-000000000000	d65b0d06-731d-47f6-81ab-8ce9a0f6443a	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 14:42:03.009036+00
00000000-0000-0000-0000-000000000000	dbc5f516-cf9e-4932-96c0-1322569a9dfd	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 14:42:03.034774+00
00000000-0000-0000-0000-000000000000	74093e5f-9f0e-4bba-8a7c-178890931f43	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 16:12:00.85674+00
00000000-0000-0000-0000-000000000000	bc3f3c40-aade-4e72-84c9-4bc6f669c5c4	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 16:12:00.88345+00
00000000-0000-0000-0000-000000000000	c0104d11-75ee-4a63-9736-c610afcd3891	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 18:25:01.862485+00
00000000-0000-0000-0000-000000000000	22613b8a-b2cd-4f19-a22d-c2dc356874da	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 18:25:01.88715+00
00000000-0000-0000-0000-000000000000	338813e2-4c44-4d70-8c07-f2d605a97254	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 19:27:22.910448+00
00000000-0000-0000-0000-000000000000	8ea07934-56b9-4645-98ee-37f1d091d684	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 19:27:22.936425+00
00000000-0000-0000-0000-000000000000	927c5b3f-d876-4ee8-a80a-2d08cb138f21	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 21:04:45.454772+00
00000000-0000-0000-0000-000000000000	1f9d31bc-5ef9-42cb-87ae-27785e1daa22	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-07 21:04:45.46762+00
00000000-0000-0000-0000-000000000000	3e931002-1fd5-411d-964c-c225ed1e79de	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 02:23:24.157943+00
00000000-0000-0000-0000-000000000000	243b05aa-54be-40c6-9aa5-d931ae7c2602	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 02:23:24.184829+00
00000000-0000-0000-0000-000000000000	adafd881-13b7-4bc5-b40a-bb5ffa404edb	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 05:16:22.984586+00
00000000-0000-0000-0000-000000000000	ba4766d8-99c2-4a1c-9704-fc2146f7f70b	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 05:16:23.015003+00
00000000-0000-0000-0000-000000000000	e67deb6b-cae5-4a0d-9d2e-917b305b00c0	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 06:25:41.607529+00
00000000-0000-0000-0000-000000000000	9200f3f3-4e9f-46c9-b0b6-46220596018f	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 06:25:41.623967+00
00000000-0000-0000-0000-000000000000	a301c342-7a09-44df-90a9-9e05172b8963	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 07:24:10.421171+00
00000000-0000-0000-0000-000000000000	f5e3469d-6d55-4e38-a06a-3cefe509a11b	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 07:24:10.444423+00
00000000-0000-0000-0000-000000000000	36e0e353-696c-408c-b83e-fddc494958c3	{"action":"token_refreshed","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 10:01:02.54167+00
00000000-0000-0000-0000-000000000000	a00fcd86-1c6b-4375-a057-7bd081ba8576	{"action":"token_revoked","actor_id":"cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4","actor_username":"walden@gmail.com","actor_via_sso":false,"log_type":"token"}	2025-08-08 10:01:02.570238+00
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
4b229687-bb59-4f30-b219-2749e16aa343	4b229687-bb59-4f30-b219-2749e16aa343	{"sub": "4b229687-bb59-4f30-b219-2749e16aa343", "email": "eugenco578@gmail.com", "phone": "0797824442", "lastName": "Wekesa", "firstName": "Eugene", "email_verified": false, "phone_verified": false}	email	2025-06-12 18:17:27.880636+00	2025-06-12 18:17:27.880712+00	2025-06-12 18:17:27.880712+00	df95de85-6b7f-4268-9b06-2eaca313858f
9f079173-db30-4434-ab53-51486e0fe005	9f079173-db30-4434-ab53-51486e0fe005	{"sub": "9f079173-db30-4434-ab53-51486e0fe005", "email": "charlie@gmail.com", "phone": "0787943878", "lastName": "Harper", "firstName": "Charlie", "email_verified": false, "phone_verified": false}	email	2025-08-01 14:12:13.659308+00	2025-08-01 14:12:13.659366+00	2025-08-01 14:12:13.659366+00	17768472-6cfb-4c0d-8ec8-66be4af10943
cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	{"sub": "cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4", "email": "walden@gmail.com", "phone": "0731995460", "lastName": "Schmidt", "firstName": "Walden ", "email_verified": false, "phone_verified": false}	email	2025-08-05 14:18:20.655559+00	2025-08-05 14:18:20.656243+00	2025-08-05 14:18:20.656243+00	91538ca2-8f56-4da1-9ad5-ea7b9d5a6df1
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
47f2e8e0-1d6d-4b8a-a858-496885e07d01	2025-08-07 10:24:55.829804+00	2025-08-07 10:24:55.829804+00	password	ccc75de9-d902-4801-953e-2425859545dd
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	51	lhrocm3r7vg7	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 10:24:55.773437+00	2025-08-07 12:24:35.938419+00	\N	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	52	2vd3tw4vwxya	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 12:24:35.955397+00	2025-08-07 14:42:03.03536+00	lhrocm3r7vg7	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	53	jbj2hjxhts7y	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 14:42:03.051595+00	2025-08-07 16:12:00.884698+00	2vd3tw4vwxya	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	54	pljr37d6o62v	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 16:12:00.89753+00	2025-08-07 18:25:01.890576+00	jbj2hjxhts7y	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	55	5fkrvwmcduew	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 18:25:01.911805+00	2025-08-07 19:27:22.93707+00	pljr37d6o62v	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	56	4lxnu53vb6vw	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 19:27:22.956908+00	2025-08-07 21:04:45.469599+00	5fkrvwmcduew	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	57	qul5urm7bulz	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-07 21:04:45.491613+00	2025-08-08 02:23:24.185389+00	4lxnu53vb6vw	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	58	puvdibqlftuy	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-08 02:23:24.203572+00	2025-08-08 05:16:23.018753+00	qul5urm7bulz	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	59	medfyrkaioi2	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-08 05:16:23.041662+00	2025-08-08 06:25:41.625275+00	puvdibqlftuy	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	60	sjcku3dmcqmz	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-08 06:25:41.643274+00	2025-08-08 07:24:10.445845+00	medfyrkaioi2	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	61	yxjzqvei2jgf	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	t	2025-08-08 07:24:10.468116+00	2025-08-08 10:01:02.571456+00	sjcku3dmcqmz	47f2e8e0-1d6d-4b8a-a858-496885e07d01
00000000-0000-0000-0000-000000000000	62	x5ipxyglp6bl	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	f	2025-08-08 10:01:02.592527+00	2025-08-08 10:01:02.592527+00	yxjzqvei2jgf	47f2e8e0-1d6d-4b8a-a858-496885e07d01
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag) FROM stdin;
47f2e8e0-1d6d-4b8a-a858-496885e07d01	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	2025-08-07 10:24:55.74603+00	2025-08-08 10:01:02.615148+00	\N	aal1	\N	2025-08-08 10:01:02.613288	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36	41.90.187.166	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	4b229687-bb59-4f30-b219-2749e16aa343	authenticated	authenticated	eugenco578@gmail.com	$2a$10$.kOZhgzM7F8zuYJVO0H/E.RC7Gh38QC2JPJ8zRnWg.453APBjCpTe	2025-06-12 18:17:27.889162+00	\N		\N		2025-08-06 08:29:43.784914+00			\N	2025-08-06 08:30:32.310963+00	{"provider": "email", "providers": ["email"]}	{"sub": "4b229687-bb59-4f30-b219-2749e16aa343", "email": "eugenco578@gmail.com", "phone": "0797824442", "lastName": "Wekesa", "firstName": "Eugene", "email_verified": true, "phone_verified": false}	\N	2025-06-12 18:17:27.865057+00	2025-08-06 08:30:32.316906+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	authenticated	authenticated	walden@gmail.com	$2a$10$b4ATC2HuCeXN6QDoQoFGdObqnR80.DKRCh7r8sy.bmZE.m0Tq31lC	2025-08-05 14:18:20.663801+00	\N		\N		\N			\N	2025-08-07 10:24:55.745424+00	{"provider": "email", "providers": ["email"]}	{"sub": "cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4", "email": "walden@gmail.com", "phone": "0731995460", "lastName": "Schmidt", "firstName": "Walden ", "email_verified": true, "phone_verified": false}	\N	2025-08-05 14:18:20.63578+00	2025-08-08 10:01:02.60313+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	9f079173-db30-4434-ab53-51486e0fe005	authenticated	authenticated	charlie@gmail.com	$2a$10$psL0GjJcq9.u/dx15cS5m.Y11hZXtumNnXm4hHgl/S5zaobJlI.mu	2025-08-01 14:12:13.689719+00	\N		\N		\N			\N	2025-08-06 08:28:55.25664+00	{"provider": "email", "providers": ["email"]}	{"sub": "9f079173-db30-4434-ab53-51486e0fe005", "email": "charlie@gmail.com", "phone": "0787943878", "lastName": "Harper", "firstName": "Charlie", "email_verified": true, "phone_verified": false}	\N	2025-08-01 14:12:13.60834+00	2025-08-06 08:28:55.306112+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blog_posts (id, title, excerpt, content, author, category, tags, image_url, read_time, is_published, created_at, updated_at) FROM stdin;
964ba2a2-1cca-4722-b38c-c63ece7ce4ba	The Art of Sourdough: A Beginner's Guide	Learn the ancient art of sourdough baking with our step-by-step guide to creating your own starter and baking perfect loaves.	Sourdough baking is both an art and a science that has been practiced for thousands of years. In this comprehensive guide, we'll walk you through everything you need to know to start your sourdough journey...	Marie Dubois	Baking Tips	{sourdough,bread,beginner,starter}	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	8 min read	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
a07f24bf-218f-43ad-b037-a659da3ccb32	Seasonal Ingredients: Winter Baking Favorites	Discover how to incorporate seasonal winter ingredients into your baking for flavors that capture the essence of the season.	Winter brings a wonderful array of ingredients that can transform your baking. From warming spices like cinnamon and nutmeg to seasonal fruits like pears and cranberries...	James Wilson	Seasonal	{seasonal,winter,ingredients,flavors}	https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800	6 min read	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
a893946c-0e76-4fba-bb9a-4f36909cf37a	Decorating Techniques for Professional-Looking Cakes	Master the art of cake decoration with these professional techniques that will make your homemade cakes look bakery-perfect.	Creating beautiful cakes is about more than just taste – presentation matters too. In this detailed guide, we'll share the professional techniques we use daily...	Sofia Rodriguez	Cake Decorating	{cakes,decorating,techniques,professional}	https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800	12 min read	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
4de602b4-a138-410b-9c09-ca2ba6620f33	The Science Behind Perfect Pastry	Understanding the science behind pastry making will help you achieve consistent, flaky, and delicious results every time.	Pastry making is a precise science where temperature, timing, and technique all play crucial roles. Understanding these fundamentals will elevate your baking...	David Chen	Baking Science	{pastry,science,technique,baking}	https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800	10 min read	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
89a73009-ce0a-4999-b1d5-e354c5bf5686	Gluten-Free Baking: Tips and Tricks	Navigate the world of gluten-free baking with confidence using our tested tips and favorite flour blends.	Gluten-free baking doesn't have to be intimidating. With the right knowledge and techniques, you can create delicious baked goods that everyone will enjoy...	Marie Dubois	Dietary	{gluten-free,dietary,tips,flour}	https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800	7 min read	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
\.


--
-- Data for Name: custom_cakes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.custom_cakes (id, order_item_id, size, flavor, frosting, decorations, custom_message, total_price, created_at) FROM stdin;
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, first_name, last_name, email, phone, address, city, zip_code, created_at, updated_at) FROM stdin;
4b229687-bb59-4f30-b219-2749e16aa343	Eugene	Wekesa	eugenco578@gmail.com	0797824442	\N	\N	\N	2025-06-12 18:17:28.940181+00	2025-06-12 18:17:28.940181+00
9f079173-db30-4434-ab53-51486e0fe005	Charlie	Harper	charlie@gmail.com	0787943878	Mwananchi Road	Nairobi	+254	2025-08-01 14:12:14.942828+00	2025-08-01 14:14:00.88999+00
cfc2a22e-a4a5-4d9a-948e-57d2b4ee5ac4	Walden 	Schmidt	walden@gmail.com	0731995460	\N	\N	\N	2025-08-05 14:18:21.532199+00	2025-08-05 14:18:21.532199+00
\.


--
-- Data for Name: event_registrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_registrations (id, event_id, customer_id, registration_date, payment_status, created_at) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, title, description, event_date, event_time, duration, location, price, max_participants, current_participants, instructor, difficulty, category, image_url, includes, requirements, is_active, created_at, updated_at) FROM stdin;
c91f2176-96b9-4153-9fc3-c0493fc20c92	Sourdough Bread Making Workshop	Learn the ancient art of sourdough bread making from our master baker. You'll create your own starter and take home fresh bread.	2024-02-15	10:00:00	4 hours	Main Bakery Kitchen	85.00	12	0	Marie Dubois	Beginner	Workshop	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	{"All ingredients","Recipe booklet","Sourdough starter","Fresh bread to take home","Light lunch"}	{"Apron (provided)","Comfortable shoes"}	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
8690b44c-ef66-4349-9b45-89ff2e97ad67	French Pastry Masterclass	Master the delicate techniques of French pastry making including croissants, éclairs, and macarons.	2024-02-18	09:00:00	6 hours	Professional Kitchen	150.00	8	0	James Wilson	Advanced	Class	https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800	{"Premium ingredients","Professional techniques guide","Pastries to take home","Certificate of completion","Gourmet lunch"}	{"Basic baking knowledge","Comfortable clothing"}	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
f5c605e1-1926-40c5-a444-a22f5dfb2fb4	Valentine's Day Cake Decorating	Create beautiful Valentine's themed cakes with professional decorating techniques and romantic designs.	2024-02-12	14:00:00	3 hours	Decorating Studio	65.00	15	0	Sofia Rodriguez	Intermediate	Special Event	https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800	{"Pre-baked cake","All decorating supplies","Design templates","Decorated cake to take home",Refreshments}	{"No experience necessary"}	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
e2bbfeec-3b53-46a8-9c52-642fbc7d8663	Kids Baking Adventure	A fun-filled baking session designed for children aged 8-14. Learn to make cookies, cupcakes, and simple breads.	2024-02-20	11:00:00	2.5 hours	Kids Kitchen	45.00	16	0	David Chen	Beginner	Workshop	https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800	{"All ingredients","Kid-friendly tools","Recipe cards","Baked goods to take home","Fun activities"}	{"Adult supervision for children under 10","Closed-toe shoes"}	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
1dc2559f-2504-473c-89ef-63ddb7a1028c	Gluten-Free Baking Essentials	Discover the secrets of successful gluten-free baking with alternative flours and binding techniques.	2024-02-25	13:00:00	3.5 hours	Specialty Kitchen	75.00	10	0	Marie Dubois	Intermediate	Class	https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800	{"Gluten-free ingredients","Flour blend recipes","Multiple baked items","Nutritional guide","Light refreshments"}	{"Basic baking knowledge helpful"}	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
\.


--
-- Data for Name: newsletter_subscribers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newsletter_subscribers (id, email, is_active, subscribed_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, unit_price, total_price, customizations, created_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, customer_id, order_type, status, pickup_date, pickup_time, special_instructions, subtotal, tax, delivery_fee, total, payment_status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, special_price, category, image_url, ingredients, allergens, is_special, is_available, created_at, updated_at) FROM stdin;
cb51fa14-40c9-4685-b26f-708adb968e52	Artisan Sourdough Loaf	Traditional sourdough with a crispy crust and tangy flavor, made with our 100-year-old starter.	8.50	7.50	bread	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	{"Organic flour",Water,"Sea salt","Sourdough starter"}	{Gluten}	t	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
4fc9da47-3a0a-491e-acb5-5ea56e2eceed	Whole Wheat Bread	Hearty whole wheat bread packed with nutrients and fiber.	6.00	\N	bread	https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=800	{"Whole wheat flour",Water,Yeast,Honey,Salt}	{Gluten}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
5e7a8b22-344f-49a4-828d-a017c47fd310	French Baguette	Classic French baguette with a golden crust and airy interior.	4.50	\N	bread	https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800	{"Bread flour",Water,Yeast,Salt}	{Gluten}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
9322aead-5921-49b3-bff7-6435d516b615	Pain au Chocolat	Buttery, flaky croissant filled with rich dark chocolate.	3.75	3.25	pastry	https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800	{Butter,Flour,"Dark chocolate",Eggs,Milk}	{Gluten,Dairy,Eggs}	t	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
a859769a-45f6-4a0e-b8d4-59b6bc1082fe	Almond Croissant	Delicate croissant filled with sweet almond cream and topped with sliced almonds.	4.25	\N	pastry	https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800	{Butter,Flour,"Almond cream","Sliced almonds",Sugar}	{Gluten,Dairy,Nuts}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
fb23ac1c-9e2e-41ad-be33-2b6e32b87272	Fruit Danish	Light and flaky Danish pastry topped with seasonal fruit and glaze.	3.50	\N	pastry	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	{"Pastry dough","Seasonal fruit","Cream cheese","Sugar glaze"}	{Gluten,Dairy,Eggs}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
992c3567-3c70-49f6-9b6b-02b2a37c8609	Triple Chocolate Layer Cake	Decadent three-layer chocolate cake with rich chocolate ganache.	45.00	\N	cake	https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800	{"Dark chocolate",Flour,Eggs,Butter,Sugar,Vanilla}	{Gluten,Dairy,Eggs}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
c7353ccd-1af4-43de-ba02-57a40a5291ee	Red Velvet Cake	Classic red velvet cake with cream cheese frosting.	42.00	38.00	cake	https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800	{Flour,"Cocoa powder","Red food coloring","Cream cheese",Butter}	{Gluten,Dairy,Eggs}	t	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
2d015589-a030-4f43-8a0b-816addc0218b	Chocolate Chip Cookies	Classic chocolate chip cookies with a perfect chewy texture.	2.50	\N	cookie	https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800	{Flour,"Chocolate chips",Butter,"Brown sugar",Eggs}	{Gluten,Dairy,Eggs}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
191c5e93-9852-42a9-b718-3dfcf31bfb73	Oatmeal Raisin Cookies	Hearty oatmeal cookies studded with plump raisins.	2.25	\N	cookie	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	{Oats,Flour,Raisins,Butter,Cinnamon}	{Gluten,Dairy}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
4922d5c3-a03b-43e4-8959-ca8a595fabc6	Gluten-Free Almond Bread	Moist and flavorful bread made with almond flour.	12.00	\N	gluten-free	https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800	{"Almond flour",Eggs,Honey,"Baking soda",Salt}	{Nuts,Eggs}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
61110d7b-8808-43d1-b091-9c65c1b8d2cc	Gluten-Free Chocolate Muffins	Rich chocolate muffins that are completely gluten-free.	4.50	\N	gluten-free	https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800	{"Rice flour","Cocoa powder","Chocolate chips",Eggs,"Coconut oil"}	{Eggs}	f	t	2025-06-12 18:15:58.176015+00	2025-06-12 18:15:58.176015+00
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.testimonials (id, customer_id, name, content, rating, image_url, is_approved, created_at) FROM stdin;
274a6927-ce9a-46c9-bd52-1f4d39245605	\N	Sarah Johnson	The best bakery in town! Their sourdough bread is absolutely incredible, and the staff is always so friendly. I come here every weekend for fresh pastries.	5	https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
ec1cc835-7a53-41a6-9eaa-b60c1cff0713	\N	Michael Chen	Ordered a custom wedding cake and it exceeded all expectations. Not only was it beautiful, but it tasted amazing too. Highly recommend for special occasions!	5	https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
5d53b571-b3e9-4ca7-8f4c-d592681ab3bd	\N	Emily Rodriguez	As someone with gluten sensitivity, I was thrilled to find such delicious gluten-free options. The almond bread is my new favorite!	5	https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
89b72ec9-7437-4a44-b017-11975fc23a00	\N	David Thompson	The croissants here are just like the ones I had in Paris. Buttery, flaky, and absolutely perfect. Worth every penny!	5	https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
1e9b0a37-cff2-49e6-9606-fd0e6dff479c	\N	Lisa Park	Great selection of fresh baked goods daily. The chocolate chip cookies are my kids' absolute favorite. We're regular customers now!	5	https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
a39fba00-ac7b-4fba-93ab-dd9f0a144587	\N	Robert Wilson	Fantastic bakery with authentic recipes. The French baguettes are crispy on the outside and soft inside, just perfect for our family dinners.	5	https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150	t	2025-06-12 18:15:58.176015+00
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2025-06-12 18:01:27
20211116045059	2025-06-12 18:01:30
20211116050929	2025-06-12 18:01:33
20211116051442	2025-06-12 18:01:35
20211116212300	2025-06-12 18:01:37
20211116213355	2025-06-12 18:01:40
20211116213934	2025-06-12 18:01:42
20211116214523	2025-06-12 18:01:45
20211122062447	2025-06-12 18:01:47
20211124070109	2025-06-12 18:01:49
20211202204204	2025-06-12 18:01:51
20211202204605	2025-06-12 18:01:54
20211210212804	2025-06-12 18:02:00
20211228014915	2025-06-12 18:02:03
20220107221237	2025-06-12 18:02:05
20220228202821	2025-06-12 18:02:07
20220312004840	2025-06-12 18:02:09
20220603231003	2025-06-12 18:02:13
20220603232444	2025-06-12 18:02:15
20220615214548	2025-06-12 18:02:18
20220712093339	2025-06-12 18:02:20
20220908172859	2025-06-12 18:02:22
20220916233421	2025-06-12 18:02:24
20230119133233	2025-06-12 18:02:26
20230128025114	2025-06-12 18:02:29
20230128025212	2025-06-12 18:02:32
20230227211149	2025-06-12 18:02:34
20230228184745	2025-06-12 18:02:36
20230308225145	2025-06-12 18:02:38
20230328144023	2025-06-12 18:02:40
20231018144023	2025-06-12 18:02:43
20231204144023	2025-06-12 18:02:47
20231204144024	2025-06-12 18:02:49
20231204144025	2025-06-12 18:02:51
20240108234812	2025-06-12 18:02:53
20240109165339	2025-06-12 18:02:55
20240227174441	2025-06-12 18:02:59
20240311171622	2025-06-12 18:03:02
20240321100241	2025-06-12 18:03:07
20240401105812	2025-06-12 18:03:13
20240418121054	2025-06-12 18:03:16
20240523004032	2025-06-12 18:03:24
20240618124746	2025-06-12 18:03:27
20240801235015	2025-06-12 18:03:29
20240805133720	2025-06-12 18:03:31
20240827160934	2025-06-12 18:03:33
20240919163303	2025-06-12 18:03:36
20240919163305	2025-06-12 18:03:39
20241019105805	2025-06-12 18:03:41
20241030150047	2025-06-12 18:03:49
20241108114728	2025-06-12 18:03:52
20241121104152	2025-06-12 18:03:54
20241130184212	2025-06-12 18:03:57
20241220035512	2025-06-12 18:03:59
20241220123912	2025-06-12 18:04:02
20241224161212	2025-06-12 18:04:04
20250107150512	2025-06-12 18:04:06
20250110162412	2025-06-12 18:04:08
20250123174212	2025-06-12 18:04:10
20250128220012	2025-06-12 18:04:13
20250506224012	2025-06-12 18:04:14
20250523164012	2025-06-12 18:04:17
20250714121412	2025-08-01 13:29:24
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id) FROM stdin;
avatars	avatars	\N	2025-08-01 16:24:12.177894+00	2025-08-01 16:24:12.177894+00	t	f	\N	{image/jpeg,image/png}	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2025-06-12 18:01:25.608096
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2025-06-12 18:01:25.612551
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2025-06-12 18:01:25.6151
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2025-06-12 18:01:25.629364
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2025-06-12 18:01:25.639266
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2025-06-12 18:01:25.64267
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2025-06-12 18:01:25.647232
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2025-06-12 18:01:25.651228
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2025-06-12 18:01:25.657269
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2025-06-12 18:01:25.660602
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2025-06-12 18:01:25.664751
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2025-06-12 18:01:25.668404
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2025-06-12 18:01:25.672059
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2025-06-12 18:01:25.675345
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2025-06-12 18:01:25.678476
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2025-06-12 18:01:25.693696
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2025-06-12 18:01:25.697341
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2025-06-12 18:01:25.700696
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2025-06-12 18:01:25.704418
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2025-06-12 18:01:25.710026
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2025-06-12 18:01:25.713391
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2025-06-12 18:01:25.71882
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2025-06-12 18:01:25.729719
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2025-06-12 18:01:25.740618
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2025-06-12 18:01:25.744346
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2025-06-12 18:01:25.749055
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20250609100115	{"\\\\n\\\\n-- Create products table\\\\nCREATE TABLE IF NOT EXISTS products (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  name text NOT NULL,\\\\n  description text NOT NULL,\\\\n  price decimal(10,2) NOT NULL,\\\\n  special_price decimal(10,2),\\\\n  category text NOT NULL,\\\\n  image_url text NOT NULL,\\\\n  ingredients text[] DEFAULT '{}',\\\\n  allergens text[] DEFAULT '{}',\\\\n  is_special boolean DEFAULT false,\\\\n  is_available boolean DEFAULT true,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create customers table\\\\nCREATE TABLE IF NOT EXISTS customers (\\\\n  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,\\\\n  first_name text NOT NULL,\\\\n  last_name text NOT NULL,\\\\n  email text NOT NULL,\\\\n  phone text NOT NULL,\\\\n  address text,\\\\n  city text,\\\\n  zip_code text,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create orders table\\\\nCREATE TABLE IF NOT EXISTS orders (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,\\\\n  order_type text NOT NULL CHECK (order_type IN ('pickup', 'delivery')),\\\\n  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),\\\\n  pickup_date date NOT NULL,\\\\n  pickup_time time NOT NULL,\\\\n  special_instructions text,\\\\n  subtotal decimal(10,2) NOT NULL,\\\\n  tax decimal(10,2) NOT NULL,\\\\n  delivery_fee decimal(10,2) DEFAULT 0,\\\\n  total decimal(10,2) NOT NULL,\\\\n  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create order_items table\\\\nCREATE TABLE IF NOT EXISTS order_items (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,\\\\n  product_id uuid REFERENCES products(id) ON DELETE CASCADE,\\\\n  quantity integer NOT NULL CHECK (quantity > 0),\\\\n  unit_price decimal(10,2) NOT NULL,\\\\n  total_price decimal(10,2) NOT NULL,\\\\n  customizations jsonb,\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create custom_cakes table\\\\nCREATE TABLE IF NOT EXISTS custom_cakes (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  order_item_id uuid REFERENCES order_items(id) ON DELETE CASCADE,\\\\n  size text NOT NULL,\\\\n  flavor text NOT NULL,\\\\n  frosting text NOT NULL,\\\\n  decorations text[] DEFAULT '{}',\\\\n  custom_message text,\\\\n  total_price decimal(10,2) NOT NULL,\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create testimonials table\\\\nCREATE TABLE IF NOT EXISTS testimonials (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,\\\\n  name text NOT NULL,\\\\n  content text NOT NULL,\\\\n  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),\\\\n  image_url text,\\\\n  is_approved boolean DEFAULT false,\\\\n  created_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create events table\\\\nCREATE TABLE IF NOT EXISTS events (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  title text NOT NULL,\\\\n  description text NOT NULL,\\\\n  event_date date NOT NULL,\\\\n  event_time time NOT NULL,\\\\n  duration text NOT NULL,\\\\n  location text NOT NULL,\\\\n  price decimal(10,2) NOT NULL,\\\\n  max_participants integer NOT NULL,\\\\n  current_participants integer DEFAULT 0,\\\\n  instructor text NOT NULL,\\\\n  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),\\\\n  category text NOT NULL CHECK (category IN ('Workshop', 'Class', 'Special Event')),\\\\n  image_url text NOT NULL,\\\\n  includes text[] DEFAULT '{}',\\\\n  requirements text[] DEFAULT '{}',\\\\n  is_active boolean DEFAULT true,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create event_registrations table\\\\nCREATE TABLE IF NOT EXISTS event_registrations (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  event_id uuid REFERENCES events(id) ON DELETE CASCADE,\\\\n  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,\\\\n  registration_date timestamptz DEFAULT now(),\\\\n  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),\\\\n  created_at timestamptz DEFAULT now(),\\\\n  UNIQUE(event_id, customer_id)\\\\n)","\\\\n\\\\n-- Create blog_posts table\\\\nCREATE TABLE IF NOT EXISTS blog_posts (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  title text NOT NULL,\\\\n  excerpt text NOT NULL,\\\\n  content text NOT NULL,\\\\n  author text NOT NULL,\\\\n  category text NOT NULL,\\\\n  tags text[] DEFAULT '{}',\\\\n  image_url text NOT NULL,\\\\n  read_time text NOT NULL,\\\\n  is_published boolean DEFAULT false,\\\\n  created_at timestamptz DEFAULT now(),\\\\n  updated_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Create newsletter_subscribers table\\\\nCREATE TABLE IF NOT EXISTS newsletter_subscribers (\\\\n  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),\\\\n  email text UNIQUE NOT NULL,\\\\n  is_active boolean DEFAULT true,\\\\n  subscribed_at timestamptz DEFAULT now()\\\\n)","\\\\n\\\\n-- Enable Row Level Security\\\\nALTER TABLE products ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE customers ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE orders ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE order_items ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE custom_cakes ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE testimonials ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE events ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY","\\\\nALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY","\\\\n\\\\n-- Products policies (public read, admin write)\\\\nCREATE POLICY \\"Products are viewable by everyone\\"\\\\n  ON products FOR SELECT\\\\n  TO public\\\\n  USING (true)","\\\\n\\\\n-- Customers policies\\\\nCREATE POLICY \\"Users can view own customer data\\"\\\\n  ON customers FOR SELECT\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\nCREATE POLICY \\"Users can update own customer data\\"\\\\n  ON customers FOR UPDATE\\\\n  TO authenticated\\\\n  USING (auth.uid() = id)","\\\\n\\\\nCREATE POLICY \\"Users can insert own customer data\\"\\\\n  ON customers FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (auth.uid() = id)","\\\\n\\\\n-- Orders policies\\\\nCREATE POLICY \\"Users can view own orders\\"\\\\n  ON orders FOR SELECT\\\\n  TO authenticated\\\\n  USING (customer_id = auth.uid())","\\\\n\\\\nCREATE POLICY \\"Users can create own orders\\"\\\\n  ON orders FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (customer_id = auth.uid())","\\\\n\\\\nCREATE POLICY \\"Users can update own orders\\"\\\\n  ON orders FOR UPDATE\\\\n  TO authenticated\\\\n  USING (customer_id = auth.uid())","\\\\n\\\\n-- Order items policies\\\\nCREATE POLICY \\"Users can view own order items\\"\\\\n  ON order_items FOR SELECT\\\\n  TO authenticated\\\\n  USING (\\\\n    order_id IN (\\\\n      SELECT id FROM orders WHERE customer_id = auth.uid()\\\\n    )\\\\n  )","\\\\n\\\\nCREATE POLICY \\"Users can create own order items\\"\\\\n  ON order_items FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (\\\\n    order_id IN (\\\\n      SELECT id FROM orders WHERE customer_id = auth.uid()\\\\n    )\\\\n  )","\\\\n\\\\n-- Custom cakes policies\\\\nCREATE POLICY \\"Users can view own custom cakes\\"\\\\n  ON custom_cakes FOR SELECT\\\\n  TO authenticated\\\\n  USING (\\\\n    order_item_id IN (\\\\n      SELECT oi.id FROM order_items oi\\\\n      JOIN orders o ON oi.order_id = o.id\\\\n      WHERE o.customer_id = auth.uid()\\\\n    )\\\\n  )","\\\\n\\\\nCREATE POLICY \\"Users can create own custom cakes\\"\\\\n  ON custom_cakes FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (\\\\n    order_item_id IN (\\\\n      SELECT oi.id FROM order_items oi\\\\n      JOIN orders o ON oi.order_id = o.id\\\\n      WHERE o.customer_id = auth.uid()\\\\n    )\\\\n  )","\\\\n\\\\n-- Testimonials policies\\\\nCREATE POLICY \\"Approved testimonials are viewable by everyone\\"\\\\n  ON testimonials FOR SELECT\\\\n  TO public\\\\n  USING (is_approved = true)","\\\\n\\\\nCREATE POLICY \\"Users can create own testimonials\\"\\\\n  ON testimonials FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (customer_id = auth.uid())","\\\\n\\\\n-- Events policies\\\\nCREATE POLICY \\"Active events are viewable by everyone\\"\\\\n  ON events FOR SELECT\\\\n  TO public\\\\n  USING (is_active = true)","\\\\n\\\\n-- Event registrations policies\\\\nCREATE POLICY \\"Users can view own event registrations\\"\\\\n  ON event_registrations FOR SELECT\\\\n  TO authenticated\\\\n  USING (customer_id = auth.uid())","\\\\n\\\\nCREATE POLICY \\"Users can create own event registrations\\"\\\\n  ON event_registrations FOR INSERT\\\\n  TO authenticated\\\\n  WITH CHECK (customer_id = auth.uid())","\\\\n\\\\n-- Blog posts policies\\\\nCREATE POLICY \\"Published blog posts are viewable by everyone\\"\\\\n  ON blog_posts FOR SELECT\\\\n  TO public\\\\n  USING (is_published = true)","\\\\n\\\\n-- Newsletter subscribers policies\\\\nCREATE POLICY \\"Anyone can subscribe to newsletter\\"\\\\n  ON newsletter_subscribers FOR INSERT\\\\n  TO public\\\\n  WITH CHECK (true)","\\\\n\\\\n-- Create indexes for better performance\\\\nCREATE INDEX IF NOT EXISTS idx_products_category ON products(category)","\\\\nCREATE INDEX IF NOT EXISTS idx_products_is_special ON products(is_special)","\\\\nCREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id)","\\\\nCREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)","\\\\nCREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)","\\\\nCREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved)","\\\\nCREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date)","\\\\nCREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published)","\\\\n\\\\n-- Create updated_at trigger function\\\\nCREATE OR REPLACE FUNCTION update_updated_at_column()\\\\nRETURNS TRIGGER AS $$\\\\nBEGIN\\\\n  NEW.updated_at = now()","\\\\n  RETURN NEW","\\\\nEND","\\\\n$$ language 'plpgsql'","\\\\n\\\\n-- Create triggers for updated_at\\\\nCREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()","\\\\nCREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()","\\\\nCREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()","\\\\nCREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()","\\\\nCREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()",""}	rapid_truth
20250609100154	{"\\\\n\\\\n-- Insert sample products\\\\nINSERT INTO products (name, description, price, special_price, category, image_url, ingredients, allergens, is_special) VALUES\\\\n('Artisan Sourdough Loaf', 'Traditional sourdough with a crispy crust and tangy flavor, made with our 100-year-old starter.', 8.50, 7.50, 'bread', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Organic flour', 'Water', 'Sea salt', 'Sourdough starter'], ARRAY['Gluten'], true),\\\\n('Whole Wheat Bread', 'Hearty whole wheat bread packed with nutrients and fiber.', 6.00, null, 'bread', 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Whole wheat flour', 'Water', 'Yeast', 'Honey', 'Salt'], ARRAY['Gluten'], false),\\\\n('French Baguette', 'Classic French baguette with a golden crust and airy interior.', 4.50, null, 'bread', 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Bread flour', 'Water', 'Yeast', 'Salt'], ARRAY['Gluten'], false),\\\\n('Pain au Chocolat', 'Buttery, flaky croissant filled with rich dark chocolate.', 3.75, 3.25, 'pastry', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', ARRAY['Butter', 'Flour', 'Dark chocolate', 'Eggs', 'Milk'], ARRAY['Gluten', 'Dairy', 'Eggs'], true),\\\\n('Almond Croissant', 'Delicate croissant filled with sweet almond cream and topped with sliced almonds.', 4.25, null, 'pastry', 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Butter', 'Flour', 'Almond cream', 'Sliced almonds', 'Sugar'], ARRAY['Gluten', 'Dairy', 'Nuts'], false),\\\\n('Fruit Danish', 'Light and flaky Danish pastry topped with seasonal fruit and glaze.', 3.50, null, 'pastry', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Pastry dough', 'Seasonal fruit', 'Cream cheese', 'Sugar glaze'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),\\\\n('Triple Chocolate Layer Cake', 'Decadent three-layer chocolate cake with rich chocolate ganache.', 45.00, null, 'cake', 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Dark chocolate', 'Flour', 'Eggs', 'Butter', 'Sugar', 'Vanilla'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),\\\\n('Red Velvet Cake', 'Classic red velvet cake with cream cheese frosting.', 42.00, 38.00, 'cake', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Flour', 'Cocoa powder', 'Red food coloring', 'Cream cheese', 'Butter'], ARRAY['Gluten', 'Dairy', 'Eggs'], true),\\\\n('Chocolate Chip Cookies', 'Classic chocolate chip cookies with a perfect chewy texture.', 2.50, null, 'cookie', 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Flour', 'Chocolate chips', 'Butter', 'Brown sugar', 'Eggs'], ARRAY['Gluten', 'Dairy', 'Eggs'], false),\\\\n('Oatmeal Raisin Cookies', 'Hearty oatmeal cookies studded with plump raisins.', 2.25, null, 'cookie', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Oats', 'Flour', 'Raisins', 'Butter', 'Cinnamon'], ARRAY['Gluten', 'Dairy'], false),\\\\n('Gluten-Free Almond Bread', 'Moist and flavorful bread made with almond flour.', 12.00, null, 'gluten-free', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Almond flour', 'Eggs', 'Honey', 'Baking soda', 'Salt'], ARRAY['Nuts', 'Eggs'], false),\\\\n('Gluten-Free Chocolate Muffins', 'Rich chocolate muffins that are completely gluten-free.', 4.50, null, 'gluten-free', 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Rice flour', 'Cocoa powder', 'Chocolate chips', 'Eggs', 'Coconut oil'], ARRAY['Eggs'], false)","\\\\n\\\\n-- Insert sample testimonials\\\\nINSERT INTO testimonials (name, content, rating, image_url, is_approved) VALUES\\\\n('Sarah Johnson', 'The best bakery in town! Their sourdough bread is absolutely incredible, and the staff is always so friendly. I come here every weekend for fresh pastries.', 5, 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150', true),\\\\n('Michael Chen', 'Ordered a custom wedding cake and it exceeded all expectations. Not only was it beautiful, but it tasted amazing too. Highly recommend for special occasions!', 5, 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', true),\\\\n('Emily Rodriguez', 'As someone with gluten sensitivity, I was thrilled to find such delicious gluten-free options. The almond bread is my new favorite!', 5, 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150', true),\\\\n('David Thompson', 'The croissants here are just like the ones I had in Paris. Buttery, flaky, and absolutely perfect. Worth every penny!', 5, 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150', true),\\\\n('Lisa Park', 'Great selection of fresh baked goods daily. The chocolate chip cookies are my kids'' absolute favorite. We''re regular customers now!', 5, 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150', true),\\\\n('Robert Wilson', 'Fantastic bakery with authentic recipes. The French baguettes are crispy on the outside and soft inside, just perfect for our family dinners.', 5, 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150', true)","\\\\n\\\\n-- Insert sample events\\\\nINSERT INTO events (title, description, event_date, event_time, duration, location, price, max_participants, instructor, difficulty, category, image_url, includes, requirements) VALUES\\\\n('Sourdough Bread Making Workshop', 'Learn the ancient art of sourdough bread making from our master baker. You''ll create your own starter and take home fresh bread.', '2024-02-15', '10:00', '4 hours', 'Main Bakery Kitchen', 85.00, 12, 'Marie Dubois', 'Beginner', 'Workshop', 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['All ingredients', 'Recipe booklet', 'Sourdough starter', 'Fresh bread to take home', 'Light lunch'], ARRAY['Apron (provided)', 'Comfortable shoes']),\\\\n('French Pastry Masterclass', 'Master the delicate techniques of French pastry making including croissants, éclairs, and macarons.', '2024-02-18', '09:00', '6 hours', 'Professional Kitchen', 150.00, 8, 'James Wilson', 'Advanced', 'Class', 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', ARRAY['Premium ingredients', 'Professional techniques guide', 'Pastries to take home', 'Certificate of completion', 'Gourmet lunch'], ARRAY['Basic baking knowledge', 'Comfortable clothing']),\\\\n('Valentine''s Day Cake Decorating', 'Create beautiful Valentine''s themed cakes with professional decorating techniques and romantic designs.', '2024-02-12', '14:00', '3 hours', 'Decorating Studio', 65.00, 15, 'Sofia Rodriguez', 'Intermediate', 'Special Event', 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Pre-baked cake', 'All decorating supplies', 'Design templates', 'Decorated cake to take home', 'Refreshments'], ARRAY['No experience necessary']),\\\\n('Kids Baking Adventure', 'A fun-filled baking session designed for children aged 8-14. Learn to make cookies, cupcakes, and simple breads.', '2024-02-20', '11:00', '2.5 hours', 'Kids Kitchen', 45.00, 16, 'David Chen', 'Beginner', 'Workshop', 'https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['All ingredients', 'Kid-friendly tools', 'Recipe cards', 'Baked goods to take home', 'Fun activities'], ARRAY['Adult supervision for children under 10', 'Closed-toe shoes']),\\\\n('Gluten-Free Baking Essentials', 'Discover the secrets of successful gluten-free baking with alternative flours and binding techniques.', '2024-02-25', '13:00', '3.5 hours', 'Specialty Kitchen', 75.00, 10, 'Marie Dubois', 'Intermediate', 'Class', 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', ARRAY['Gluten-free ingredients', 'Flour blend recipes', 'Multiple baked items', 'Nutritional guide', 'Light refreshments'], ARRAY['Basic baking knowledge helpful'])","\\\\n\\\\n-- Insert sample blog posts\\\\nINSERT INTO blog_posts (title, excerpt, content, author, category, tags, image_url, read_time, is_published) VALUES\\\\n('The Art of Sourdough: A Beginner''s Guide', 'Learn the ancient art of sourdough baking with our step-by-step guide to creating your own starter and baking perfect loaves.', 'Sourdough baking is both an art and a science that has been practiced for thousands of years. In this comprehensive guide, we''ll walk you through everything you need to know to start your sourdough journey...', 'Marie Dubois', 'Baking Tips', ARRAY['sourdough', 'bread', 'beginner', 'starter'], 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800', '8 min read', true),\\\\n('Seasonal Ingredients: Winter Baking Favorites', 'Discover how to incorporate seasonal winter ingredients into your baking for flavors that capture the essence of the season.', 'Winter brings a wonderful array of ingredients that can transform your baking. From warming spices like cinnamon and nutmeg to seasonal fruits like pears and cranberries...', 'James Wilson', 'Seasonal', ARRAY['seasonal', 'winter', 'ingredients', 'flavors'], 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800', '6 min read', true),\\\\n('Decorating Techniques for Professional-Looking Cakes', 'Master the art of cake decoration with these professional techniques that will make your homemade cakes look bakery-perfect.', 'Creating beautiful cakes is about more than just taste – presentation matters too. In this detailed guide, we''ll share the professional techniques we use daily...', 'Sofia Rodriguez', 'Cake Decorating', ARRAY['cakes', 'decorating', 'techniques', 'professional'], 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800', '12 min read', true),\\\\n('The Science Behind Perfect Pastry', 'Understanding the science behind pastry making will help you achieve consistent, flaky, and delicious results every time.', 'Pastry making is a precise science where temperature, timing, and technique all play crucial roles. Understanding these fundamentals will elevate your baking...', 'David Chen', 'Baking Science', ARRAY['pastry', 'science', 'technique', 'baking'], 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=800', '10 min read', true),\\\\n('Gluten-Free Baking: Tips and Tricks', 'Navigate the world of gluten-free baking with confidence using our tested tips and favorite flour blends.', 'Gluten-free baking doesn''t have to be intimidating. With the right knowledge and techniques, you can create delicious baked goods that everyone will enjoy...', 'Marie Dubois', 'Dietary', ARRAY['gluten-free', 'dietary', 'tips', 'flour'], 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=800', '7 min read', true)",""}	restless_island
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 62, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: custom_cakes custom_cakes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.custom_cakes
    ADD CONSTRAINT custom_cakes_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: event_registrations event_registrations_event_id_customer_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_customer_id_key UNIQUE (event_id, customer_id);


--
-- Name: event_registrations event_registrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: newsletter_subscribers newsletter_subscribers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_email_key UNIQUE (email);


--
-- Name: newsletter_subscribers newsletter_subscribers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newsletter_subscribers
    ADD CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_blog_posts_published; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_blog_posts_published ON public.blog_posts USING btree (is_published);


--
-- Name: idx_events_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_events_date ON public.events USING btree (event_date);


--
-- Name: idx_order_items_order_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_items_order_id ON public.order_items USING btree (order_id);


--
-- Name: idx_orders_customer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_customer_id ON public.orders USING btree (customer_id);


--
-- Name: idx_orders_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_orders_status ON public.orders USING btree (status);


--
-- Name: idx_products_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_category ON public.products USING btree (category);


--
-- Name: idx_products_is_special; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_products_is_special ON public.products USING btree (is_special);


--
-- Name: idx_testimonials_approved; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_testimonials_approved ON public.testimonials USING btree (is_approved);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: blog_posts update_blog_posts_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: customers update_customers_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: events update_events_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: orders update_orders_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: products update_products_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: custom_cakes custom_cakes_order_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.custom_cakes
    ADD CONSTRAINT custom_cakes_order_item_id_fkey FOREIGN KEY (order_item_id) REFERENCES public.order_items(id) ON DELETE CASCADE;


--
-- Name: customers customers_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: event_registrations event_registrations_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- Name: event_registrations event_registrations_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_registrations
    ADD CONSTRAINT event_registrations_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: events Active events are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Active events are viewable by everyone" ON public.events FOR SELECT USING ((is_active = true));


--
-- Name: newsletter_subscribers Anyone can subscribe to newsletter; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);


--
-- Name: testimonials Approved testimonials are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Approved testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING ((is_approved = true));


--
-- Name: products Products are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);


--
-- Name: blog_posts Published blog posts are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING ((is_published = true));


--
-- Name: custom_cakes Users can create own custom cakes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own custom cakes" ON public.custom_cakes FOR INSERT TO authenticated WITH CHECK ((order_item_id IN ( SELECT oi.id
   FROM (public.order_items oi
     JOIN public.orders o ON ((oi.order_id = o.id)))
  WHERE (o.customer_id = auth.uid()))));


--
-- Name: event_registrations Users can create own event registrations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own event registrations" ON public.event_registrations FOR INSERT TO authenticated WITH CHECK ((customer_id = auth.uid()));


--
-- Name: order_items Users can create own order items; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own order items" ON public.order_items FOR INSERT TO authenticated WITH CHECK ((order_id IN ( SELECT orders.id
   FROM public.orders
  WHERE (orders.customer_id = auth.uid()))));


--
-- Name: orders Users can create own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own orders" ON public.orders FOR INSERT TO authenticated WITH CHECK ((customer_id = auth.uid()));


--
-- Name: testimonials Users can create own testimonials; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can create own testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK ((customer_id = auth.uid()));


--
-- Name: customers Users can insert own customer data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own customer data" ON public.customers FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: customers Users can update own customer data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own customer data" ON public.customers FOR UPDATE TO authenticated USING ((auth.uid() = id));


--
-- Name: orders Users can update own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own orders" ON public.orders FOR UPDATE TO authenticated USING ((customer_id = auth.uid()));


--
-- Name: custom_cakes Users can view own custom cakes; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own custom cakes" ON public.custom_cakes FOR SELECT TO authenticated USING ((order_item_id IN ( SELECT oi.id
   FROM (public.order_items oi
     JOIN public.orders o ON ((oi.order_id = o.id)))
  WHERE (o.customer_id = auth.uid()))));


--
-- Name: customers Users can view own customer data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own customer data" ON public.customers FOR SELECT TO authenticated USING ((auth.uid() = id));


--
-- Name: event_registrations Users can view own event registrations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own event registrations" ON public.event_registrations FOR SELECT TO authenticated USING ((customer_id = auth.uid()));


--
-- Name: order_items Users can view own order items; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT TO authenticated USING ((order_id IN ( SELECT orders.id
   FROM public.orders
  WHERE (orders.customer_id = auth.uid()))));


--
-- Name: orders Users can view own orders; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT TO authenticated USING ((customer_id = auth.uid()));


--
-- Name: blog_posts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: custom_cakes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.custom_cakes ENABLE ROW LEVEL SECURITY;

--
-- Name: customers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

--
-- Name: event_registrations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

--
-- Name: events; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

--
-- Name: newsletter_subscribers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

--
-- Name: order_items; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

--
-- Name: orders; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

--
-- Name: products; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

--
-- Name: testimonials; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION get_size_by_bucket(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_size_by_bucket() TO postgres;


--
-- Name: FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;


--
-- Name: FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;


--
-- Name: FUNCTION operation(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.operation() TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE blog_posts; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.blog_posts TO anon;
GRANT ALL ON TABLE public.blog_posts TO authenticated;
GRANT ALL ON TABLE public.blog_posts TO service_role;


--
-- Name: TABLE custom_cakes; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.custom_cakes TO anon;
GRANT ALL ON TABLE public.custom_cakes TO authenticated;
GRANT ALL ON TABLE public.custom_cakes TO service_role;


--
-- Name: TABLE customers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.customers TO anon;
GRANT ALL ON TABLE public.customers TO authenticated;
GRANT ALL ON TABLE public.customers TO service_role;


--
-- Name: TABLE event_registrations; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event_registrations TO anon;
GRANT ALL ON TABLE public.event_registrations TO authenticated;
GRANT ALL ON TABLE public.event_registrations TO service_role;


--
-- Name: TABLE events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.events TO anon;
GRANT ALL ON TABLE public.events TO authenticated;
GRANT ALL ON TABLE public.events TO service_role;


--
-- Name: TABLE newsletter_subscribers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.newsletter_subscribers TO anon;
GRANT ALL ON TABLE public.newsletter_subscribers TO authenticated;
GRANT ALL ON TABLE public.newsletter_subscribers TO service_role;


--
-- Name: TABLE order_items; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.order_items TO anon;
GRANT ALL ON TABLE public.order_items TO authenticated;
GRANT ALL ON TABLE public.order_items TO service_role;


--
-- Name: TABLE orders; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.orders TO anon;
GRANT ALL ON TABLE public.orders TO authenticated;
GRANT ALL ON TABLE public.orders TO service_role;


--
-- Name: TABLE products; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.products TO anon;
GRANT ALL ON TABLE public.products TO authenticated;
GRANT ALL ON TABLE public.products TO service_role;


--
-- Name: TABLE testimonials; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.testimonials TO anon;
GRANT ALL ON TABLE public.testimonials TO authenticated;
GRANT ALL ON TABLE public.testimonials TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads TO postgres;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO postgres;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

