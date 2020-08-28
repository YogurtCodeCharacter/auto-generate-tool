const fs = require('fs');
const request = require('request');
const minimist = require('minimist');
const chalk = require('chalk');
const ora = require('ora');
const log = console.log;


let fileList = [];
let args = minimist(process.argv.slice(2));
if (args._.length == 0) { log(chalk.red('请先在命令行配置应用名称,例如: npm run autoFile 应用名')); process.exit() };

const spinner = ora('file generation...').start();

const { templateList } = TEMPLATE_LIST;

const getTemplate = templateList.filter((t) => Object.keys(t) == 'get')[0].get;
const postTemplate = templateList.filter((t) => Object.keys(t) == 'post')[0].post;

request.get(`http://192.168.201.34/${args._}/api_data.js`, (err, response, body) => {
    if (!err) {
        // TOOD: 去除define() 首尾
        let processString = body;
        processString = processString.replace('define(', '');
        processString = processString.substring(0, processString.length - 3);
        let { api } = JSON.parse(processString);
        if (api.length > 0) {
            api.forEach((t) => {
                    if (t.type == 'GET') {
                        let string = getTemplate;
                        string = string.replace('name', t.name);
                        string = string.replace('url', `/${args._}${t.url}`);
                        fileList.push(string);
                    } else {
                        let string = postTemplate;
                        string = string.replace('name', t.name);
                        string = string.replace('url', `/${args._}${t.url}`);
                        fileList.push(string);
                    }
            })
        }

        fs.writeFile('server.js', fileList.toString().replace(/,/g, ''), 'utf-8', () => {
            spinner.stop();
            log(chalk.green('file created successfully'));
        });

    } else {
        // TODO: api.doc 失败处理
        spinner.stop();
        log(chalk.red('api.doc获取失败'))
    }
})