#!/usr/bin/env zx
import 'zx/globals'

// $.verbose = false;

const {green} = chalk;

let host = 'spartan_156';
let ip = '45.145.75.156';
const site = 'tools.jianpuwang.cn';
const site2 = 'tools.j-k.one';
const remotePath = `/root/${site}/html`;
const remotePath2 = `/root/${site2}/html`;

console.log('删除已有文件');
await $`ssh ${host} "rm -rf ${remotePath}"`;
await $`ssh ${host} "rm -rf ${remotePath2}"`;
console.log(green('文件删除完成'));

console.log('2秒后,开始复制文件');
await sleep(2000);
// "" 中的数据 变量传入，否则会报错
await $`rsync -avz -e "rsync-ssh -i D:\\Tools\\Commands\\cwrsync\\id_rsa_45.145.75.156" --chmod=ugo=rwX dist/ root@${ip}:${remotePath}`;
console.log(green('文件上传完成'));
await $`ssh ${host} "cp -r ${remotePath} ${remotePath2}"`;
console.log('重启NG服务');
await $`ssh ${host} "docker restart ${site}"`;
await $`ssh ${host} "docker restart ${site2}"`;
console.log(green('部署完成'));
