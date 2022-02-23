export let diff_left_example:string = `
--对比函数--
CREATE OR REPLACE FUNCTION get_column_refs(p_id IN NUMBER) RETURN VARCHAR2 IS

		v_dbname        VARCHAR2(500);
		v_table_id      NUMBER(10);
		v_column_id     NUMBER(10);
		v_ref_column_id NUMBER(10);
		r_result        VARCHAR2(500);
		v_count_cn      NUMBER(10);
BEGIN

		SELECT ad_table_id, dbname INTO v_table_id, v_dbname FROM ad_column WHERE id = p_id;

		FOR x IN (SELECT regexp_substr(v_dbname, '[^;]+', 1, LEVEL) AS sub_name
								FROM dual
							 WHERE instr(v_dbname, ';') > 0
							CONNECT BY LEVEL <= (length(translate(v_dbname, ';' || v_dbname, ';')) + 1))
		LOOP

				SELECT t.id, t.ref_table_id
					INTO v_ref_column_id, v_table_id
					FROM ad_column t
				 WHERE t.ad_table_id = v_table_id
					 AND t.dbname = x.sub_name
					 AND t.isactive = 'Y';

				IF v_table_id IS NOT NULL THEN
						r_result := r_result || ',' || v_table_id;
				END IF;

		END LOOP;

		IF r_result IS NOT NULL THEN
				RETURN substr(r_result, 2);
		END IF;

		RETURN(r_result);
END;
`
export let diff_right_example:string = `
--对比函数--
CREATE OR REPLACE FUNCTION get_column_refs(p_id IN NUMBER) RETURN VARCHAR2 IS

		v_dbname        VARCHAR2(500);
		v_table_id      NUMBER(10);
		v_column_id     NUMBER(10);
		v_ref_column_id NUMBER(10);
		r_result        VARCHAR2(500);
BEGIN

		SELECT ad_table_id, dbname INTO v_table_id, v_dbname FROM ad_column WHERE id = p_id;

		FOR x IN (SELECT regexp_substr(v_dbname, '[^;]+', 1, LEVEL) AS sub_name
								FROM dual
							 WHERE instr(v_dbname, ':') > 0
							CONNECT BY LEVEL <= (length(translate(v_dbname, ';' || v_dbname, ';')) + 1))
		LOOP

				SELECT t.id, t.ref_table_id
					INTO v_ref_column_id, v_column_id
					FROM ad_column t
				 WHERE t.ad_table_id = v_table_id
					 AND t.dbname = x.sub_name
					 AND t.isactive = 'Y';

				IF v_table_id IS NOT NULL THEN
						r_result := r_result || ',' || v_table_id;
				END IF;

		END LOOP;

		IF r_result IS NOT NULL THEN
				RETURN substr(r_result, 2);
		END IF;

		RETURN(r_result);
END;
`