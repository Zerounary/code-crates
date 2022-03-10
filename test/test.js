var assert = require('assert');
var { format } = require('sql-formatter');
const { transfrom, errorTips } = require('../src/common/java.ts');
describe('java相关测试', function () {
  describe('Mybatis 日志解析测试', function () {
    it('不含 "==> Preparing: " 和 "==> Parameters: " 标记的报错', function () {
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
    it('获取日志内容', function () {
      assert.equal(
        transfrom(
          `Source0} inited
     2022-02-23 14:55:46.420 DEBUG 9852 --- [nio-8079-exec-5] c.u.p.mapper.UserMapper.findUserByname   : ==>  Preparing: select u.id "uid", u.name "name", u.name as "username", u.email as "email", u.passwordhash "password", get_user_attr(u.id) as "attr", g.id "gid", g.name "groupname" from users u left join groupuser r on u.id = r.userid left join groups g on r.groupid = g.id where u.name = ?
     2022-02-23 14:55:46.549 DEBUG 9852 --- [nio-8079-exec-5] c.u.p.mapper.UserMapper.findUserByname   : ==> Parameters: admin(String)`,
        ),
        format(
          `select u.id "uid", u.name "name", u.name as "username", u.email as "email", u.passwordhash "password", get_user_attr(u.id) as "attr", g.id "gid", g.name "groupname" from users u left join groupuser r on u.id = r.userid left join groups g on r.groupid = g.id where u.name = 'admin'`,
        ),
      );
    });
    it('多行日志', function () {
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

    it('null值转换', function () {
      assert.equal(
        transfrom(
          `eportMapper.insertFacts    : ==>  Preparing: insert into AD_CXTAB_FACT (id, ad_client_id, ad_org_id, isactive, creationdate, ownerid, modifieddate, modifierid, ad_cxtab_id, description, function_, valuename, userfact, valueformat, sgrade, orderno ) select get_sequences('AD_CXTAB_DIMENSION'), 37, 27, 'Y', sysdate, 893, sysdate, 893, ?, ?, ?, ?, ?, ?, ?, ? * 10 + 10 from dual union all select get_sequences('AD_CXTAB_DIMENSION'), 37, 27, 'Y', sysdate, 893, sysdate, 893, ?, ?, ?, ?, ?, ?, ?, ? * 10 + 10 from dual union all select get_sequences('AD_CXTAB_DIMENSION'), 37, 27, 'Y', sysdate, 893, sysdate, 893, ?, ?, ?, ?, ?, ?, ?, ? * 10 + 10 from dual union all select get_sequences('AD_CXTAB_DIMENSION'), 37, 27, 'Y', sysdate, 893, sysdate, 893, ?, ?, ?, ?, ?, ?, ?, ? * 10 + 10 from dual union all select get_sequences('AD_CXTAB_DIMENSION'), 37, 27, 'Y', sysdate, 893, sysdate, 893, ?, ?, ?, ?, ?, ?, ?, ? * 10 + 10 from dual
2022-03-10 15:06:21.723 DEBUG 11568 --- [nio-8079-exec-9] c.u.p.mapper.ReportMapper.insertFacts    : ==> Parameters: 5029(Integer), 在途数量(String), (String), (String), (String), #0.00(String), null, 0(Integer), 5029(Integer), 可配数量(String), (String), (String), (String), #0.00(String), null, 1(Integer), 5029(Integer), 在单数量(String), (String), (String), (String), #0.00(String), null, 2(Integer), 5029(Integer), 预计数量(String), (String), (String), (String), #0.00(String), null, 3(Integer), 5029(Integer), 库存数量(String), MAX(String), (String), (String), #0.00(String), 0(Integer), 4(Integer)
2022-03-10 15:06:21.766 DEBUG 11568 --- [nio-8079-exec-9] c.u.p.mapper.ReportMapper.insertFacts    : <==    Updates: 5`,
        ),
        format(
          `insert into
  AD_CXTAB_FACT (
    id,
    ad_client_id,
    ad_org_id,
    isactive,
    creationdate,
    ownerid,
    modifieddate,
    modifierid,
    ad_cxtab_id,
    description,
    function_,
    valuename,
    userfact,
    valueformat,
    sgrade,
    orderno
  )
select
  get_sequences('AD_CXTAB_DIMENSION'),
  37,
  27,
  'Y',
  sysdate,
  893,
  sysdate,
  893,
  5029,
  '在途数量',
  '',
  '',
  '',
  '#0.00',
  null,
  0 * 10 + 10
from
  dual
union all
select
  get_sequences('AD_CXTAB_DIMENSION'),
  37,
  27,
  'Y',
  sysdate,
  893,
  sysdate,
  893,
  5029,
  '可配数量',
  '',
  '',
  '',
  '#0.00',
  null,
  1 * 10 + 10
from
  dual
union all
select
  get_sequences('AD_CXTAB_DIMENSION'),
  37,
  27,
  'Y',
  sysdate,
  893,
  sysdate,
  893,
  5029,
  '在单数量',
  '',
  '',
  '',
  '#0.00',
  null,
  2 * 10 + 10
from
  dual
union all
select
  get_sequences('AD_CXTAB_DIMENSION'),
  37,
  27,
  'Y',
  sysdate,
  893,
  sysdate,
  893,
  5029,
  '预计数量',
  '',
  '',
  '',
  '#0.00',
  null,
  3 * 10 + 10
from
  dual
union all
select
  get_sequences('AD_CXTAB_DIMENSION'),
  37,
  27,
  'Y',
  sysdate,
  893,
  sysdate,
  893,
  5029,
  '库存数量',
  'MAX',
  '',
  '',
  '#0.00',
  0,
  4 * 10 + 10
from
  dual`,
        ),
      );
    });

  });
});
