/**
 * @module 字符串中的汉字转拼音
 * @method chineseToPinyin 汉字转五声调拼音
 * @method traditionalToSimplified 繁体字转简体字
 */
import * as PINYIN_TABLE from './dictionary/pinyin.dict'; // 单字字典
import * as PHRASE_PINYIN_TABLE from './dictionary/phrase_pinyin.dict'; // 词组字典
import * as  chineseDict from './dictionary/traditional_chinese.dict'; // 繁体字典

const CHINESE_REGEX = /[\u4e00-\u9fa5]/;
const CHINESE_REGEX_GLOBAL = /[\u4e00-\u9fa5]/g;

interface Options {
    chineseToPinyin: (str: string) => string | never;
    traditionalToSimplified: (str: string) => string | never;
    _multiPinyin: (str: string) => string;
    _toSimplifiedPinyin: (str: string) => string;
}

const ToPinyin: Options = {
    chineseToPinyin(str) {
        if (typeof str !== 'string') throw new TypeError('参数必须为String类型');
        if (!CHINESE_REGEX.test(str)) return str; // 无汉字返回str

        let newStr = this.traditionalToSimplified(str); // 繁转简

        let resultArr = [];
        let i = 0;
        const strLen = newStr.length;
        while (i < strLen) { // 将词组和单字分离
            const subStr = newStr.substring(i);
            if (!CHINESE_REGEX.test(subStr[0])) { // 字符串首字符非汉字，直接放入resultArr中，i++
                resultArr.push(subStr[0])
                i++;
                continue;
            }
            const phrase = this._multiPinyin(subStr);
            if (!phrase) { // 字符串首字符不满足词组条件，直接放入resultArr中，i++
                resultArr.push(subStr[0])
                i++;
                continue;
            }

            // 匹配到词组，将词组放入resultArr中，i = i + phrase.length
            resultArr.push(phrase);
            i = i + phrase.length;

        }

        resultArr.forEach((item, i, arr) => { // 将汉字替换为拼音
            if (item.length > 1) {
                arr[i] = PHRASE_PINYIN_TABLE[item];
            } else if (CHINESE_REGEX.test(item)) {
                arr[i] = this._toSimplifiedPinyin(item);
            }
        })

        return resultArr.join('');
    },
    traditionalToSimplified(str) {
        if (typeof str !== 'string') throw new TypeError('参数必须为String类型');
        if (!CHINESE_REGEX.test(str)) return str; // 无汉字返回str

        let chineseArr = str.match(CHINESE_REGEX_GLOBAL);

        chineseArr = chineseArr.filter(val => { // 过滤繁体字
            if (chineseDict[val]) {
                return val;
            }
        })

        !!chineseArr.length && chineseArr.forEach(val => { // 将繁体字逐一替换为简体字
            str = str.replace(val, chineseDict[val])
        })
        return str;
    },
    _multiPinyin(str) { // 获取字符串参数在词典中的拼音对应关系
        let result = '';
        for (var i = 2; i < 5; i++) { // 简化操作 暂时只支持5字以内字典检测
            var temp = PHRASE_PINYIN_TABLE[str.substring(0, i)];
            if (typeof (temp) != 'undefined') {
                result = str.substring(0, i);
            }
        }
        return result;
    },
    _toSimplifiedPinyin(c) { // 将单个汉字转为拼音输出
        if (!PINYIN_TABLE[c]) return '(' + c + '我的字典中无记录' + ')';
        return PINYIN_TABLE[c][0];
    }
}

export = ToPinyin;
