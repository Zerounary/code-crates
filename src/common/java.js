import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import split from 'lodash/split';

export let transfrom = (text = '') => {
  if (
    !text.includes('==>  Preparing: ') ||
    !text.includes('==> Parameters: ')
  ) {
    return `错误格式！请在文本框中输入 包含 ==> Preparing: ... ==> Parameters: ...的Mybatis日志，才能转换为完整sql`;
  }
  let sql_reg = /==>\s+Preparing: .*\r?\n/gm;
  let params_reg = /==>\s+Parameters: .*\r?\n/gm;
  let sql = trim(trimStart(sql_reg.exec(text)[0] || '', '==>  Preparing: '));
  let params = trim(
    trimStart(params_reg.exec(text)[0] || '', '==>  Parameters: '),
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
  return sql;
};
