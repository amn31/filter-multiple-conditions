
export interface IOperators {
    [index: string]: symbol
}
type IOperator = ''|"like"|"not like"|"="|"!="|">"|">="|"<"|"<="|"contains"|"endswith"|"startswith"|'regex'|'notRegex'
type IOrAnd = "or" | "and" ;
interface ISimpleCondition {
    0: string | number;
    1: string | IOperator;
    2: string | number;
}


export type ISimpleConditions = (ISimpleCondition |IOrAnd|FilterConditions)[];
export type FilterConditions = (ISimpleCondition | IOrAnd | ISimpleConditions)

export class MaFilter {
  
    static Operators = [];
    static FilterByConditions(where, temp: any) {
      // console.log('DEAL findFull ==== ', where);
  
      if (!where || where.length == 0) {
        return temp;
      }
  
      var result : any = [];
      for (var i = 0; i < where.length; i++) {
        var condition = where[i];
        let temp1;
        // console.log('DEAL typeof(condition)' + typeof (condition), condition);
        if (typeof (condition) == 'object') {
          if (condition.length == 3 &&
            typeof (condition[0]) == 'string' && typeof (condition[1]) == 'string' &&
            (typeof (condition[2]) == 'string' || typeof (condition[2]) == 'number')) {
            // console.log("DEAL TO FIND ", temp.length)
            temp1 = this._filterResultBySimpleCondition(condition, temp);
          } else if (condition.length > 0 && condition.find(d => typeof (d) == 'object')) {
            temp1 = this.FilterByConditions(condition, temp);
          }
        } else {
          if (typeof (condition) == 'string') {
            if (condition != 'or' && condition != 'and') {
              throw ("Unexpected condition :" + condition)
            }
          }
        }
        if (temp1) {
          // console.log('DEAL TODO', temp1.length);
          // Cas où l'operator précédent était 'or'
          if (where[i + 1] && where[i + 1] == 'or' || (i == where.length - 1 && where[i - 1] && where[i - 1] == 'or')) {
            // On ajoute au result les valeurs non trouvées précédemment
            for (let t of temp1) {
              //console.log(t);
              if (!(result.find(d => d === t))) {
                result.push(t);
              }
            }
            // console.log("DEAL TODO OR", result)
  
            // Cas où l'operator précédent était 'and'
          } else {
            // console.log("DEAL TODO AND", temp1);
            // On ecrase temp
            temp = temp1;
            result = temp;
          }
        }
  
        i++;
      }
      return result;
    }
   
  
    private static _filterResultBySimpleCondition(condition, temp: any) {
      // console.log('DEAL findTemp === ', condition)
      if (typeof (condition) == 'object') {
        var field = condition[0];
        var operator = condition[1];
        var value = condition[2];
        let reg : any = null;
        let opnum = false;
        let reverse = false;
    
        if (operator == 'startswith') {
          reg = new RegExp("^" + value, 'i');
        } else if (operator == 'endswith') {
          reg = new RegExp(value + "$", 'i');
        } else if (operator == 'contains') {
          reg = new RegExp(value, 'i');
        } else if (operator == 'like' || operator == 'not like') {
          if (operator == 'not like') {
            reverse = true;
          }
          if (value.match(/^%.+%$/)) {
            value = value.replace(/^%/, '').replace(/%$/, '')
            operator = 'contains'
            reg = new RegExp(value, 'i');
          } else if (value.match(/.+%$/)) {
            value = value.replace(/%$/, '')
            operator = 'startswith'
            reg = new RegExp("^" + value, 'i');
          } else if (value.match(/^%/)) {
            value = value.replace(/^%/, '')
            operator = 'endswith'
            reg = new RegExp(value + "$", 'i');
          }
        } else if (operator == 'regex') {
          reg = new RegExp(value, 'i');
        } else if (operator == 'notRegex') {
          reg = new RegExp(value, 'i');
          reverse = true;
        } else if (operator == 'isnull') {
        } else if (operator == 'isnotnull') {
        } else if (operator == '=') {
          opnum = true;
        } else if (operator == '>=') {
          opnum = true;
        } else if (operator == '>') {
          opnum = true;
        } else if (operator == '<') {
          opnum = true;
        } else if (operator == '!=') {
          opnum = true;
        } else if (operator == '<=') {
          opnum = true;
        } else {
          throw ("Unkown operator " + operator)
        }
  
        // console.log('field:' + field, operator, value, reg)
        temp = temp.filter(function (d, index, array) {
          //console.log(d[field])
          if (reg == null) {
            if (opnum && typeof (d[field]) == 'number') {
              value = parseFloat(value)
            }
            if (operator == '=') {
              if (typeof (d[field]) == 'boolean') {
                if (value == '1')
                  value = true;
                if (value == '0')
                  value = false;
              }
              if (d[field] !== null) {
                if (d[field] === value) {
                  return true;
                }
              }
            } else if (operator == 'isnull') {
              if (d[field] == null) {
                return true;
              }
            } else if (operator == 'isnotnull') {
              if (d[field] != null) {
                return true;
              }
            } else if (operator == '>=') {
              if (d[field] !== null && d[field] >= value) {
                return true;
              }
            } else if (operator == '>') {
              if (d[field] !== null && d[field] > value) {
                return true;
              }
            } else if (operator == '!=') {
              if (d[field] !== null && d[field] != value) {
                return true;
              }
            } else if (operator == '<=') {
              if (d[field] !== null && d[field] <= value) {
                return true;
              }
            } else if (operator == '<') {
              if (d[field] !== null && d[field] < value) {
                return true;
              }
            }
          } else {
            if (d[field] && d[field].match(reg)) {
              if (reverse) {
                return false;
              }
              return true;
            }
  
          }
          if (reverse) {
            return true;
          }
          return false;
        })
      }
      return temp;
    }
  
  }