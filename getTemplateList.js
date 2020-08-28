const fs = require('fs');
const path = require('path');

// TODO: 读取模板 && 获取api.doc数据 --> 文件写入
let list = fs.readdirSync(`${path.resolve()}/src/template/`);

let templateList = list.map((t) => {
    let key = t.substring(0, t.length - 3);
    return { [`${key}`]: fs.readFileSync(`${path.resolve()}/src/template/${t}`, 'utf-8')};
});

module.exports = {
    templateList: templateList
};