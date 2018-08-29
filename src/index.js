"use strict";
/**
 * @module 字符串中的汉字转拼音
 * @method chineseToPinyin 汉字转五声调拼音
 * @method traditionalToSimplified 繁体字转简体字
 */
var PINYIN_TABLE = require("./dictionary/pinyin.dict"); // 单字字典
var PHRASE_PINYIN_TABLE = require("./dictionary/phrase_pinyin.dict"); // 词组字典
var chineseDict = require("./dictionary/traditional_chinese.dict"); // 繁体字典
var CHINESE_REGEX = /[\u4e00-\u9fa5]/;
var CHINESE_REGEX_GLOBAL = /[\u4e00-\u9fa5]/g;
var ToPinyin = {
    chineseToPinyin: function (str) {
        var _this = this;
        if (typeof str !== 'string')
            throw new TypeError('参数必须为String类型');
        if (!CHINESE_REGEX.test(str))
            return str; // 无汉字返回str
        var newStr = this.traditionalToSimplified(str); // 繁转简
        var resultArr = [];
        var i = 0;
        var strLen = newStr.length;
        while (i < strLen) { // 将词组和单字分离
            var subStr = newStr.substring(i);
            if (!CHINESE_REGEX.test(subStr[0])) { // 字符串首字符非汉字，直接放入resultArr中，i++
                resultArr.push(subStr[0]);
                i++;
                continue;
            }
            var phrase = this._multiPinyin(subStr);
            if (!phrase) { // 字符串首字符不满足词组条件，直接放入resultArr中，i++
                resultArr.push(subStr[0]);
                i++;
                continue;
            }
            // 匹配到词组，将词组放入resultArr中，i = i + phrase.length
            resultArr.push(phrase);
            i = i + phrase.length;
        }
        resultArr.forEach(function (item, i, arr) {
            if (item.length > 1) {
                arr[i] = PHRASE_PINYIN_TABLE[item];
            }
            else if (CHINESE_REGEX.test(item)) {
                arr[i] = _this._toSimplifiedPinyin(item);
            }
        });
        return resultArr.join('');
    },
    traditionalToSimplified: function (str) {
        if (typeof str !== 'string')
            throw new TypeError('参数必须为String类型');
        if (!CHINESE_REGEX.test(str))
            return str; // 无汉字返回str
        var chineseArr = str.match(CHINESE_REGEX_GLOBAL);
        chineseArr = chineseArr.filter(function (val) {
            if (chineseDict[val]) {
                return val;
            }
        });
        !!chineseArr.length && chineseArr.forEach(function (val) {
            str = str.replace(val, chineseDict[val]);
        });
        return str;
    },
    _multiPinyin: function (str) {
        var result = '';
        for (var i = 2; i < 5; i++) { // 简化操作 暂时只支持5字以内字典检测
            var temp = PHRASE_PINYIN_TABLE[str.substring(0, i)];
            if (typeof (temp) != 'undefined') {
                result = str.substring(0, i);
            }
        }
        return result;
    },
    _toSimplifiedPinyin: function (c) {
        if (!PINYIN_TABLE[c])
            return '(' + c + '我的字典中无记录' + ')';
        return PINYIN_TABLE[c][0];
    }
};
module.exports = ToPinyin;
