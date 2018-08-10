const ToPinyin = require('../dist/index')

describe('chineseToPinyin', () => {
    test('no param', () => {
        const noParam = () => {
            ToPinyin.chineseToPinyin();
        }
        expect(noParam).toThrow('参数必须为String类型')
    })
    test('type not string', () => {
        const notString = () => {
            ToPinyin.chineseToPinyin({});
        }
        expect(notString).toThrow('参数必须为String类型')
    })
    test('simplified to pinyin', () => {
        expect(ToPinyin.chineseToPinyin('走路去重庆积重难返')).toBe('zouluquchongqingjizhongnanfan')
        expect(ToPinyin.chineseToPinyin('恶人很可恶')).toBe('erenhenkewu')
    })
    test('traditional to pinyin', () => {
        expect(ToPinyin.chineseToPinyin('萬戶')).toBe('wanhu')
    })
    test('mix', () => {
        expect(ToPinyin.chineseToPinyin('Marbury 来中国打球，获粉无数！so good man！')).toBe('Marbury laizhongguodaqiu，huofenwushu！so good man！')
    })
})
