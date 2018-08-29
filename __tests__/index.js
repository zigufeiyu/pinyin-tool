const ToPinyin = require('../dist/index')

describe('chineseToPinyin', () => {
    test('no param', () => {
        const noParam1 = () => {
            ToPinyin.chineseToPinyin();
        }
        const noParam2 = () => {
            ToPinyin.traditionalToSimplified();
        }
        expect(noParam1).toThrow('参数必须为String类型')
        expect(noParam2).toThrow('参数必须为String类型')
    })
    test('type not string', () => {
        const notString1 = () => {
            ToPinyin.chineseToPinyin({});
        }
        const notString2 = () => {
            ToPinyin.traditionalToSimplified({});
        }
        expect(notString1).toThrow('参数必须为String类型')
        expect(notString2).toThrow('参数必须为String类型')
    })
    test('simplified to pinyin', () => {
        expect(ToPinyin.chineseToPinyin('走路去重庆积重难返')).toBe('zouluquchongqingjizhongnanfan')
        expect(ToPinyin.chineseToPinyin('恶人很可恶')).toBe('erenhenkewu')
    })
    test('traditional to pinyin', () => {
        expect(ToPinyin.chineseToPinyin('萬戶')).toBe('wanhu')
    })
    test('traditional to simplified', () => {
        expect(ToPinyin.traditionalToSimplified('萬戶')).toBe('万户')
    })
    test('mix', () => {
        expect(ToPinyin.chineseToPinyin('Marbury 来中国打球，获粉无数！so good man！')).toBe('Marbury laizhongguodaqiu，huofenwushu！so good man！')
    })
})
