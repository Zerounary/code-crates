#!/usr/bin/env zx
import 'zx/globals'

// $.verbose = false;

const {green} = chalk;

let host = '156';
let ip = '45.145.75.156';
const nginxHome = `/usr/local/nginx`;
const nginxHtml = `${nginxHome}/html`;

console.log('删除已有文件');
await $`ssh ${host} "rm -rf ${nginxHtml}"`;
console.log(green('文件删除完成'));

console.log('2秒后,开始复制文件');
await sleep(2000);
// "" 中的数据 变量传入，否则会报错
await $`rsync -avz -e "rsync-ssh -i D:\\Tools\\Commands\\cwrsync\\id_rsa_45.145.75.156" --chmod=ugo=rwX dist/ root@${ip}:${nginxHtml}`;
console.log(green('文件上传完成'));
console.log('重启NG服务');
await $`ssh ${host} "${nginxHome}/sbin/nginx -s reload"`;
console.log(green('部署完成'));
