# pinyin-tool
[![npm package](https://nodei.co/npm/pinyin-tool.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pinyin-tool/)

[![build status](https://travis-ci.org/maqing01/pinyin-tool.svg?branch=master)](https://travis-ci.org/maqing01/pinyin-tool)
[![devDependency](https://img.shields.io/david/dev/maqing01/pinyin-tool.svg)](https://nodei.co/npm/pinyin-tool/)
[![npm version](https://img.shields.io/npm/v/pinyin-tool.svg)](https://nodei.co/npm/pinyin-tool/)
[![npm](https://img.shields.io/npm/l/pinyin-tool.svg)](https://nodei.co/npm/pinyin-tool/)

## 汉字转无声调拼音

> 内置字典  

* 繁简字体对照字典
  * 包含2531个繁体字
* 简体字拼音对照字典
  * 包含18372个简体字读音
* 多音字词语对照字典
  * 包含843个常用多音字词语读音

> 使用说明

* 安装
```js
  npm install --save pinyin-tool
```

* 使用

```js
  const ToPinyin = require('pinyin-tool')

  const userResult = ToPinyin.chineseToPinyin('userString')
```
 
