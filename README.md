## auto-generate-tool  
#### 自动化抓取api.doc上的内容  

>使用  
  
  在package.json中命令配置，命令名称可以自定义
  <code>  

    {  
        "scripts": {  
            "autoFile": "node ./node_modules/auto-generate-tool/dist/index.js"  
                }  
    }  
  </code>  
    
> server.js文件生成  

<code>  
    npm run autoFile(和自定义命令保持一致) 应用名
</code>