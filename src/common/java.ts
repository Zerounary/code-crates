import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import split from 'lodash/split';
import { format } from 'sql-formatter';
export let transfrom = (text = '') => {
  if (
    !text.includes('==>  Preparing: ') ||
    !text.includes('==> Parameters: ')
  ) {
    return errorTips;
  }
  let sql_reg = /==>\s+Preparing: .*\r?\n/gm;
  let params_reg = /==>\s+Parameters: .*\r?(\n|$)/gm;
  try {
    let found_sql = sql_reg.exec(text) || [];
    let found_param = params_reg.exec(text) || [];
    let sql = trim(trimStart(found_sql[0] || '', '==>  Preparing: '));
    let params = trim(
      trimStart(found_param[0] || '', '==>  Parameters: '),
    );
    for (let param of split(params, ', ')) {
      let parts = split(param, '(');
      let value = parts[0];
      let type = trimEnd(parts[1], ')');
      let pv = '';
      if (['String', 'Char'].includes(type)) {
        pv = `'${value}'`;
      } else if (['Integer', 'Long', 'BigDecimal', 'Double'].includes(type)) {
        pv = `${value}`;
      }
      sql = sql.replace('?', pv);
    }
    // console.log('🚀 ~ file: java.js ~ line 30 ~ transfrom ~ sql', sql);
    return format(sql);
  } catch (error) {
    return `解析失败: ${error}`;
  }
};


export let errorTips = `
错误格式！


----------------------------------------------转换示例-----------------------------------------

如以下日志：

          G 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : ==>  Preparing: SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (WITH v_w as (SELECT sum(i.tot_amt_mark) as tot_amt_mark FROM c_storemark t, c_storemarkitem i WHERE t.id = i.c_storemark_id AND i.monthdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) AND t.isactive = 'Y') select round(nvl(c."零售总额",0)/10000,2) as "零售总额", c."目标值", round(c."预估值"/10000,2) as "预估值", decode(c."目标值",0,0,round(c."零售总额"/c."目标值",2)*100) as "达成率", decode(c."目标值",0,0,round(c."预估值"/c."目标值",2)*100) as "预估达成率", nvl((SELECT round(sum(t.TOT_AMT_ACTUAL)/10000, 2) FROM b_vipmoney t WHERE t.status = 2 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) and t.billdate between ? and ?),0) as "储值" from (SELECT b.tot_amt_actual as "零售总额", (nvl(b.tot_amt_actual,0) / (to_date(to_char(sysdate, 'yyyymmdd'),'yyyymmdd') - to_date(?,'yyyymmdd') + 1)) * (to_date(?,'yyyymmdd') - to_date(?,'yyyymmdd') + 1) as "预估值", nvl((select tot_amt_mark from v_w),0) as "目标值" FROM (SELECT SUM(i.RETAIL_AMT) AS tot_amt_actual FROM m_retail t, m_retailitem i, mbv_retail_product p WHERE t.id = i.m_retail_id AND i.m_product_id = p.id AND t.isactive = 'Y' AND t.status = 2 AND t.billdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) ) b) c) "#O" WHERE rownum < 30) 
2022-02-19 16:11:57.210 DEBUG 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : ==> Parameters: 20220107(Integer), 20220107(Integer), 87(Integer), 87(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 87(Integer)
2022-02-19 16:11:57.379 DEBUG 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : <==      Total: 1
2022-02-19 16:11:57.380  INFO 2408 --- [http-nio-8080-exec-1] c.u.p.controller.ReportController        : [{"#NO":1,"零售总额":16.13,"目标值":0,
    

将被替换为：

SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (WITH v_w as (SELECT sum(i.tot_amt_mark) as tot_amt_mark FROM c_storemark t, c_storemarkitem i WHERE t.id = i.c_storemark_id AND i.monthdate BETWEEN 20220107 AND 20220107 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) AND t.isactive = 'Y') select round(nvl(c."零售总额",0)/10000,2) as "零售总额", c."目标值", round(c."预估值"/10000,2) as "预估值", decode(c."目标值",0,0,round(c."零售总额"/c."目标值",2)*100) as "达成率", decode(c."目标值",0,0,round(c."预估值"/c."目标值",2)*100) as "预估达成率", nvl((SELECT round(sum(t.TOT_AMT_ACTUAL)/10000, 2) FROM b_vipmoney t WHERE t.status = 2 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) and t.billdate between 20220107 and 20220107),0) as "储值" from (SELECT b.tot_amt_actual as "零售总额", (nvl(b.tot_amt_actual,0) / (to_date(to_char(sysdate, 'yyyymmdd'),'yyyymmdd') - to_date(20220107,'yyyymmdd') + 1)) * (to_date(20220107,'yyyymmdd') - to_date(20220107,'yyyymmdd') + 1) as "预估值", nvl((select tot_amt_mark from v_w),0) as "目标值" FROM (SELECT SUM(i.RETAIL_AMT) AS tot_amt_actual FROM m_retail t, m_retailitem i, mbv_retail_product p WHERE t.id = i.m_retail_id AND i.m_product_id = p.id AND t.isactive = 'Y' AND t.status = 2 AND t.billdate BETWEEN 20220107 AND 20220107 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) ) b) c) "#O" WHERE rownum < 30)


-----------------------------------------------分割线-----------------------------------------

如上列中，至少应当包含：

==>  Preparing: SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (WITH v_w as (SELECT sum(i.tot_amt_mark) as tot_amt_mark FROM c_storemark t, c_storemarkitem i WHERE t.id = i.c_storemark_id AND i.monthdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) AND t.isactive = 'Y') select round(nvl(c."零售总额",0)/10000,2) as "零售总额", c."目标值", round(c."预估值"/10000,2) as "预估值", decode(c."目标值",0,0,round(c."零售总额"/c."目标值",2)*100) as "达成率", decode(c."目标值",0,0,round(c."预估值"/c."目标值",2)*100) as "预估达成率", nvl((SELECT round(sum(t.TOT_AMT_ACTUAL)/10000, 2) FROM b_vipmoney t WHERE t.status = 2 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) and t.billdate between ? and ?),0) as "储值" from (SELECT b.tot_amt_actual as "零售总额", (nvl(b.tot_amt_actual,0) / (to_date(to_char(sysdate, 'yyyymmdd'),'yyyymmdd') - to_date(?,'yyyymmdd') + 1)) * (to_date(?,'yyyymmdd') - to_date(?,'yyyymmdd') + 1) as "预估值", nvl((select tot_amt_mark from v_w),0) as "目标值" FROM (SELECT SUM(i.RETAIL_AMT) AS tot_amt_actual FROM m_retail t, m_retailitem i, mbv_retail_product p WHERE t.id = i.m_retail_id AND i.m_product_id = p.id AND t.isactive = 'Y' AND t.status = 2 AND t.billdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) ) b) c) "#O" WHERE rownum < 30) 
2022-02-19 16:11:57.210 DEBUG 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : ==> Parameters: 20220107(Integer), 20220107(Integer), 87(Integer), 87(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 87(Integer)


Tips: 日志随便复制，只要包含了日志sql和参数就可以自动替换，多余的会自动过滤掉。 你可以直接再次点击【日志转SQL】按钮尝试直接转换这个文本内容。



 `;

