var assert = require('assert');
var { format } = require('sql-formatter');
describe('java相关测试', function () {
  describe('Mybatis 日志解析测试', function () {
    it('不含 "==> Preparing: " 和 "==> Parameters: " 标记的报错', function () {
      const { transfrom, errorTips } = require('../src/common/java');
      assert.equal(
        transfrom(
          `  SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (SELECT p.id as "id", get_product_imgurl(p.id) AS "img", p.name AS "pdt", p.value AS "name", p.pricelist as "pricelist", sum(t.qty) AS "qty", sum(p.pricelist * t.qty) as "tot_amt_list", d.attribname as "dim", sp.name as "supplier" FROM fa_storage t, c_store s, mbv_storage_product p, m_product_alias a, m_attributesetinstance m, m_attributevalue cl, m_attributevalue sz, m_dim d, c_supplier sp WHERE t.m_product_id = p.id AND t.m_attributesetinstance_id = m.id AND p.id = a.m_product_id and m.id = a.m_attributesetinstance_id AND t.c_store_id = s.id AND m.value1_id = cl.id AND m.value2_id = sz.id AND p.c_supplier_id = sp.id AND p.m_dim1_id = d.id(+) AND (p.name like '%' || ? || '%' OR a.no like '%' || ? || '%' ) AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) group by p.id, p.imageurl, p.name, sp.name, p.value, p.pricelist, d.attribname ORDER BY "qty" desc ) "#O" where rownum <= ?) WHERE "#NO" >= ? 
2022-02-16 12:13:25.200 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         : ==> Parameters: SK2710061212(String), SK2710061212(String), 1(Integer), 20(Integer), 1(Integer)
2022-02-16 12:13:25.767 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         :`,
        ),
        errorTips,
      );
    });
    it('获取日志内容', function () {
      const { transfrom } = require('../src/common/java');
      assert.equal(
        transfrom(
          ` : ==>  Preparing: SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (SELECT p.id as "id", get_product_imgurl(p.id) AS "img", p.name AS "pdt", p.value AS "name", p.pricelist as "pricelist", sum(t.qty) AS "qty", sum(p.pricelist * t.qty) as "tot_amt_list", d.attribname as "dim", sp.name as "supplier" FROM fa_storage t, c_store s, mbv_storage_product p, m_product_alias a, m_attributesetinstance m, m_attributevalue cl, m_attributevalue sz, m_dim d, c_supplier sp WHERE t.m_product_id = p.id AND t.m_attributesetinstance_id = m.id AND p.id = a.m_product_id and m.id = a.m_attributesetinstance_id AND t.c_store_id = s.id AND m.value1_id = cl.id AND m.value2_id = sz.id AND p.c_supplier_id = sp.id AND p.m_dim1_id = d.id(+) AND (p.name like '%' || ? || '%' OR a.no like '%' || ? || '%' ) AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) group by p.id, p.imageurl, p.name, sp.name, p.value, p.pricelist, d.attribname ORDER BY "qty" desc ) "#O" where rownum <= ?) WHERE "#NO" >= ? 
2022-02-16 12:13:25.200 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         : ==> Parameters: SK2710061212(String), SK2710061212(String), 1(Integer), 20(Integer), 1(Integer)
2022-02-16 12:13:25.767 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         :`,
        ),
        format(
          `SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (SELECT p.id as "id", get_product_imgurl(p.id) AS "img", p.name AS "pdt", p.value AS "name", p.pricelist as "pricelist", sum(t.qty) AS "qty", sum(p.pricelist * t.qty) as "tot_amt_list", d.attribname as "dim", sp.name as "supplier" FROM fa_storage t, c_store s, mbv_storage_product p, m_product_alias a, m_attributesetinstance m, m_attributevalue cl, m_attributevalue sz, m_dim d, c_supplier sp WHERE t.m_product_id = p.id AND t.m_attributesetinstance_id = m.id AND p.id = a.m_product_id and m.id = a.m_attributesetinstance_id AND t.c_store_id = s.id AND m.value1_id = cl.id AND m.value2_id = sz.id AND p.c_supplier_id = sp.id AND p.m_dim1_id = d.id(+) AND (p.name like '%' || 'SK2710061212' || '%' OR a.no like '%' || 'SK2710061212' || '%' ) AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 1 AND a1.c_store_id = t.c_store_id ) group by p.id, p.imageurl, p.name, sp.name, p.value, p.pricelist, d.attribname ORDER BY "qty" desc ) "#O" where rownum <= 20) WHERE "#NO" >= 1`,
        ),
      );
    });
    it('多行日志', function () {
      const { transfrom } = require('../src/common/java');
      assert.equal(
        transfrom(
          `G 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : ==>  Preparing: SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (WITH v_w as (SELECT sum(i.tot_amt_mark) as tot_amt_mark FROM c_storemark t, c_storemarkitem i WHERE t.id = i.c_storemark_id AND i.monthdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) AND t.isactive = 'Y') select round(nvl(c."零售总额",0)/10000,2) as "零售总额", c."目标值", round(c."预估值"/10000,2) as "预估值", decode(c."目标值",0,0,round(c."零售总额"/c."目标值",2)*100) as "达成率", decode(c."目标值",0,0,round(c."预估值"/c."目标值",2)*100) as "预估达成率", nvl((SELECT round(sum(t.TOT_AMT_ACTUAL)/10000, 2) FROM b_vipmoney t WHERE t.status = 2 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) and t.billdate between ? and ?),0) as "储值" from (SELECT b.tot_amt_actual as "零售总额", (nvl(b.tot_amt_actual,0) / (to_date(to_char(sysdate, 'yyyymmdd'),'yyyymmdd') - to_date(?,'yyyymmdd') + 1)) * (to_date(?,'yyyymmdd') - to_date(?,'yyyymmdd') + 1) as "预估值", nvl((select tot_amt_mark from v_w),0) as "目标值" FROM (SELECT SUM(i.RETAIL_AMT) AS tot_amt_actual FROM m_retail t, m_retailitem i, mbv_retail_product p WHERE t.id = i.m_retail_id AND i.m_product_id = p.id AND t.isactive = 'Y' AND t.status = 2 AND t.billdate BETWEEN ? AND ? AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) ) b) c) "#O" WHERE rownum < 30) 
2022-02-19 16:11:57.210 DEBUG 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : ==> Parameters: 20220107(Integer), 20220107(Integer), 87(Integer), 87(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 20220107(Integer), 87(Integer)
2022-02-19 16:11:57.379 DEBUG 2408 --- [http-nio-8080-exec-1] SELECT.527967772                         : <==      Total: 1
2022-02-19 16:11:57.380  INFO 2408 --- [http-nio-8080-exec-1] c.u.p.controller.ReportController        : [{"#NO":1,"零售总额":16.13,"目标值":0,`,
        ),
        format(
          `SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (WITH v_w as (SELECT sum(i.tot_amt_mark) as tot_amt_mark FROM c_storemark t, c_storemarkitem i WHERE t.id = i.c_storemark_id AND i.monthdate BETWEEN 20220107 AND 20220107 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) AND t.isactive = 'Y') select round(nvl(c."零售总额",0)/10000,2) as "零售总额", c."目标值", round(c."预估值"/10000,2) as "预估值", decode(c."目标值",0,0,round(c."零售总额"/c."目标值",2)*100) as "达成率", decode(c."目标值",0,0,round(c."预估值"/c."目标值",2)*100) as "预估达成率", nvl((SELECT round(sum(t.TOT_AMT_ACTUAL)/10000, 2) FROM b_vipmoney t WHERE t.status = 2 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) and t.billdate between 20220107 and 20220107),0) as "储值" from (SELECT b.tot_amt_actual as "零售总额", (nvl(b.tot_amt_actual,0) / (to_date(to_char(sysdate, 'yyyymmdd'),'yyyymmdd') - to_date(20220107,'yyyymmdd') + 1)) * (to_date(20220107,'yyyymmdd') - to_date(20220107,'yyyymmdd') + 1) as "预估值", nvl((select tot_amt_mark from v_w),0) as "目标值" FROM (SELECT SUM(i.RETAIL_AMT) AS tot_amt_actual FROM m_retail t, m_retailitem i, mbv_retail_product p WHERE t.id = i.m_retail_id AND i.m_product_id = p.id AND t.isactive = 'Y' AND t.status = 2 AND t.billdate BETWEEN 20220107 AND 20220107 AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 87 AND a1.c_store_id = t.c_store_id ) ) b) c) "#O" WHERE rownum < 30)`,
        ),
      );
    });
  });
});
