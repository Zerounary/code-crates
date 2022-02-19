//import _ from "lodash";
const { trim, trimStart, trimEnd, split } = require('lodash');

module.exports.transfrom = (text = '') => {
  let sql_reg = /==>  Preparing: .*\n/;
  let params_reg = /==> Parameters: .*\n/;
  let sql = trim(trimStart(sql_reg.exec(text)[0] || '', '==>  Preparing: '));
  let params = trim(trimStart(params_reg.exec(text)[0] || '', '==>  Parameters: '));
  for (let param of split(params, ', ')) {
    let parts = split(param, '(')
    let value = parts[0]
    let type =  trimEnd(parts[1],')')
    let pv = '';
    if(['String', 'Char'].includes(type)){
      pv = `'${value}'`
    }else if(['Integer','Long','BigDecimal','Double'].includes(type)){
      pv = `${value}`
    }
    sql = sql.replace('?', pv )

  }
  return sql;
};

