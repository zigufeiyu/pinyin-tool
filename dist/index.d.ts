/**
 * @module 字符串中的汉字转拼音
 * @method chineseToPinyin 汉字转五声调拼音
 * @method traditionalToSimplified 繁体字转简体字
 */

type Func = (str: string) => string | never;

interface Options {
    chineseToPinyin: Func;
    traditionalToSimplified: Func;
}

declare let ToPinyin: Options;

export = ToPinyin;