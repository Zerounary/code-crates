var assert = require('assert');
describe('java相关测试', function () {
  describe('Mybatis 日志解析测试', function () {
    it('获取日志内容', function () {
      const { transfrom } = require('../src/common/java');
      assert.equal(
        transfrom(
          ` : ==>  Preparing: SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (SELECT p.id as "id", get_product_imgurl(p.id) AS "img", p.name AS "pdt", p.value AS "name", p.pricelist as "pricelist", sum(t.qty) AS "qty", sum(p.pricelist * t.qty) as "tot_amt_list", d.attribname as "dim", sp.name as "supplier" FROM fa_storage t, c_store s, mbv_storage_product p, m_product_alias a, m_attributesetinstance m, m_attributevalue cl, m_attributevalue sz, m_dim d, c_supplier sp WHERE t.m_product_id = p.id AND t.m_attributesetinstance_id = m.id AND p.id = a.m_product_id and m.id = a.m_attributesetinstance_id AND t.c_store_id = s.id AND m.value1_id = cl.id AND m.value2_id = sz.id AND p.c_supplier_id = sp.id AND p.m_dim1_id = d.id(+) AND (p.name like '%' || ? || '%' OR a.no like '%' || ? || '%' ) AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = ? AND a1.c_store_id = t.c_store_id ) group by p.id, p.imageurl, p.name, sp.name, p.value, p.pricelist, d.attribname ORDER BY "qty" desc ) "#O" where rownum <= ?) WHERE "#NO" >= ? 
2022-02-16 12:13:25.200 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         : ==> Parameters: SK2710061212(String), SK2710061212(String), 1(Integer), 20(Integer), 1(Integer)
2022-02-16 12:13:25.767 DEBUG 18820 --- [http-nio-8080-exec-42] SELECT.826811530                         :`,
        ),
        `SELECT * FROM ( SELECT rownum as "#NO", "#O".* FROM (SELECT p.id as "id", get_product_imgurl(p.id) AS "img", p.name AS "pdt", p.value AS "name", p.pricelist as "pricelist", sum(t.qty) AS "qty", sum(p.pricelist * t.qty) as "tot_amt_list", d.attribname as "dim", sp.name as "supplier" FROM fa_storage t, c_store s, mbv_storage_product p, m_product_alias a, m_attributesetinstance m, m_attributevalue cl, m_attributevalue sz, m_dim d, c_supplier sp WHERE t.m_product_id = p.id AND t.m_attributesetinstance_id = m.id AND p.id = a.m_product_id and m.id = a.m_attributesetinstance_id AND t.c_store_id = s.id AND m.value1_id = cl.id AND m.value2_id = sz.id AND p.c_supplier_id = sp.id AND p.m_dim1_id = d.id(+) AND (p.name like '%' || 'SK2710061212' || '%' OR a.no like '%' || 'SK2710061212' || '%' ) AND exists (select a1.c_store_id from mb_users_stores a1, c_store s1 where a1.c_store_id = s1.id AND a1.mb_users_id = 1 AND a1.c_store_id = t.c_store_id ) group by p.id, p.imageurl, p.name, sp.name, p.value, p.pricelist, d.attribname ORDER BY "qty" desc ) "#O" where rownum <= 20) WHERE "#NO" >= 1`,
      );
    });
  });
});
