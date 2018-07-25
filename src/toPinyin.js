/**
 * 汉字转拼音
 */
import PINYIN_TABLE from "./dictionary/pinyin.dict"; // 单字字典
import MUTIL_PINYIN_TABLE from "./dictionary/mutil_pinyin.dict"; // 词组字典
import chineseDict from "./dictionary/traditional_chinese.dict"; // 繁体字典

const CHINESE_LING = '〇';
const CHINESE_REGEX = /[\u4e00-\u9fa5]/g;

export default class ToPinyin {

    static chineseToPinyin(str) {
        if (typeof str !== 'string') throw new TypeError('参数错误');
        if (!CHINESE_REGEX.test(str)) return str; // 无汉字返回str

        str = this._traditionalToSimplified(str); // 繁转简
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
     * @param {string/char} c 
     */
    static _isMultiPinyin(c) {
        const pinyinArr = PINYIN_TABLE[c];
        if (!!pinyinArr) {
            return pinyinArr.length > 1
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
