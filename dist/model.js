"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require('./config/connection');

var table = 'messages';
var select = 'SELECT';
var columnsSetted = false;

var Model =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);
  }

  _createClass(Model, null, [{
    key: "all",
    // constructor(){
    // }
    value: function all() {
      columnsSetted != columnsSetted;
      select += ' * FROM ' + table;
      return this;
    } // select specific columns

  }, {
    key: "specific",
    value: function specific(columns) {
      if (columns) {
        if (columns instanceof Array) {
          var length = columns.length;

          for (var i in columns) {
            select += ' ' + columns[i];
            select += i != 1 && i < length - 1 ? ' , ' : '';
          }

          columnsSetted != columnsSetted;
        } else {
          select += ' ' + columns;
        }

        select += ' FROM ' + table;
      } else {
        this.error('make sure to put columns');
      } // let compare = (comparison) ? comparison : ' and '


      return this;
    } //where arguments

  }, {
    key: "where",
    value: function where(columns, values) {
      if (columns && values) {
        if (columns instanceof Array && values instanceof Array) {
          var length = columns.length;

          if (length == values.length) {
            select += ' WHERE ';

            for (var i in columns) {
              var column = void 0,
                  comparator = 'and',
                  value = void 0,
                  sign = ' =';
              column = columns[i].split(' ');

              if (column.length == 2) {
                comparator = column[0].replace('c_', ' ');
                column = column[1];
              }

              i != 0 && i < columns.length ? select += comparator : '';
              value = values[i].split(' ');

              if (value.length >= 2) {
                sign = value[0];

                if (sign[0] == 's' && sign[1] == '_') {
                  value.splice(0, 1);
                  sign = sign.replace('s_', ' ');
                  console.log(sign);
                }
              }

              select += ' ' + column + sign + '  "' + value + '"';
            }

            console.log(select);
          } else {
            this.error('colums and values are not equal ny size');
          }
        } else if (!(columns instanceof Array) && !(values instanceof Array)) {
          select += ' WHERE ' + columns + ' = ' + values;
        } else {
          this.error('not identic maybe array and value given');
        }
      } else {
        tthis.error('make sure to put columns and values');
      }

      return this;
    } //run the sql statement or prepared query

  }, {
    key: "get",
    value: function get() {
      connection.query(select, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
      });
    } //throe predefined errors  

  }, {
    key: "error",
    value: function error(m) {
      throw new Error(m);
    }
  }]);

  return Model;
}();

Model.all().where(['id', 'c_or content'], ['2', 'first']).get(); //remain to treate the string in values 
//treat error if he enter many values which are noy in array
// Model.specific('id', 'content').where(['id', 'content'], [1,'"first"']).get()