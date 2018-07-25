/**
 * 汉字转拼音
 */
const PINYIN_TABLE = require("./dictionary/pinyin.dict"); // 单字字典
const MUTIL_PINYIN_TABLE = require("./dictionary/mutil_pinyin.dict"); // 词组字典
const chineseDict = require("./dictionary/traditional_chinese.dict"); // 繁体字典

const CHINESE_LING = '〇';
const CHINESE_REGEX = /[\u4e00-\u9fa5]/g;

class ToPinyin {

    static chineseToPinyin(str) {
        if (typeof str !== 'string') throw new TypeError('参数错误');
        if (!CHINESE_REGEX.test(str)) return str; // 无汉字返回str

        str = this._traditionalToSimplified(str); // 繁转简

        if(!this._hasMultiPinyin(str)) {

        } else {

        }
    }

    /**
     * 非多音字转拼音
     *
     * @static
     * @param {*} str
     * @memberof ToPinyin
     */
    static _noMultiPinyin(str) {
        
    }

    /**
     * 获取给定字符串是否在字典中找到词组拼音对应关系
     * 
     * 简化操作 暂时只支持6字以内字典检测
     * @param {string} str 
     */
    static _getWords(str) {
        for (var i = 1; i < 6; i++) {
            var temp = MUTIL_PINYIN_TABLE[str.substring(0, i)];
            if (typeof (temp) != 'undefined') {
                return [str.substring(0, i)];
            }
        }
        return [];
    }

    /**
     * 判断一个汉字是否为多音字
     * @param {string} str
     */
    static _hasMultiPinyin(str) {
        const chineseArr = str.match(CHINESE_REGEX);
        const len = chineseArr.length;

        for (let i = 0; i < len; i++) {
            const pinyinArr = PINYIN_TABLE[chineseArr[i]];
            if (!!pinyinArr && pinyinArr.length > 1) {
                return true;
            }
        }
        return false;
    }

    /**
     * 繁体字转换成简体字
     * @param {*} str 需要验证和转换的字符串
     * @returns 完成转换的字符串
     */
    static _traditionalToSimplified(str) {
        let chineseArr = str.match(CHINESE_REGEX);

        chineseArr = chineseArr.filter(val => { // 过滤繁体字
            if (chineseDict[val]) {
                return val;
            }
        })

        !!chineseArr.length && chineseArr.forEach(val => { // 将繁体字逐一替换为简体字
            str = str.replace(val, chineseDict[val])
        })
        return str;
    }
}

module.exports = ToPinyin;
