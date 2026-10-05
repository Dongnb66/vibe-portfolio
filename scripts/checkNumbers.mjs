#!/usr/bin/env node
/**
 * 数字口径门 · vibe-portfolio
 *
 * 为什么存在：同一个测试数在本仓库里**同时存在于多个文件**
 *   · src/data.ts                → projects[].badges
 *   · src/components/ProjectCover.tsx → 封面芯片数组 / McpCover 页脚
 * 只改一处，页面就自相矛盾。2026-10-05 实测：iw 的 900+ 改了 data.ts 却漏了封面芯片，
 * 是肉眼看**线上 JS 包**才发现的；mcp 的 48 VITEST 漏得比它还久。
 *
 * 四道检查（全部零依赖，直接 node 跑）：
 *   A 求和自洽   data.ts 第 2 行的 `N 个项目 = a + b + … = T 条测试` 必须真的加得对
 *   B 总数一致   T 必须同时等于 stats 的 num / intro 的「N 个项目共 T 条」/ skills 的「T 条测试与断言」；
 *                projects 数组长度必须等于 N
 *   C 跨文件同数 **封面里出现的每个测试数，都必须是求和式里的某一项** ← 这道门才是真正防漂移的
 *   D 作废值遗留 生成物过期 = 失败（与 archify 的 generate-* --check、iw 的 testBadge.mjs 同构）
 *
 * 退出码：0 通过 / 1 有违规 / 2 解析失败（拒绝静默 no-op）
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = join(ROOT, 'src');

/* ---------- 已作废的数字/措辞：出现即失败 ---------- */
const RETIRED = [
  [/\b1284\b/, '合计旧值 1284（现行 1271）'],
  [/\b1163\b/, '合计旧值 1163（更早口径）'],
  [/\b779\b/, 'internship-workbench 旧值 779'],
  [/\b769\b/, 'internship-workbench 旧值 769'],
  [/900\+\s*项测试/, 'internship-workbench 旧值 900+'],
  [/92\s*[项条]测试/, 'campus-mutual-aid 旧值 92'],
  [/\b48\s*VITEST/, 'mcp-toolkit 旧值 48 VITEST（实测 50）'],
  [/\b156\s*项/, 'python-learning-agent 旧值 156'],
  [/12\s*台真实浏览器/, '访问数旧值 12 台（实测 27 台）'],
  [/有真实用户/, '旧措辞「有真实用户」→「有真实访问」'],
  [/抖音/, '已推翻的前提（从未发过抖音）'],
  [/\b129\s*node\s*--test/i, 'offer-pipeline 死代码残留（项目已下线）'],
  [/\b130\s*题\s*QBANK/i, 'offer-pipeline 死代码残留（项目已下线）'],
  [/\b35\s*JUnit/, 'agent-platform-java 死代码残留（项目已下线）'],
  [/offer-pipeline/, '已下线项目名不得出现在 src'],
  [/agent-platform-java/, '已下线项目名不得出现在 src'],
  [/PipelineCover|JavaCover/, '已删除的孤儿封面组件（会随死代码泄漏已下线项目数字）'],
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|css|html)$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const read = (p) => readFileSync(p, 'utf-8');
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/');

let failures = 0;
const fail = (msg) => { failures++; console.log(`  ✗ ${msg}`); };
const ok = (msg) => console.log(`  ✓ ${msg}`);

const dataPath = files.find((p) => rel(p) === 'src/data.ts');
const coverPath = files.find((p) => rel(p) === 'src/components/ProjectCover.tsx');
if (!dataPath) { console.error('解析失败：找不到 src/data.ts'); process.exit(2); }
const data = read(dataPath);

console.log('数字口径门 · vibe-portfolio');
console.log(`扫描 ${files.length} 个文件\n`);

/* ---------- A · 求和自洽 ---------- */
console.log('A 求和自洽');
const SUM = /口径与简历逐项对齐：\s*(\d+)\s*个项目\s*=\s*([\d\s+]+?)\s*=\s*(\d+)\s*条测试/;
const m = data.match(SUM);
if (!m) {
  console.error('解析失败：src/data.ts 里找不到求和式「N 个项目 = a + b + … = T 条测试」');
  console.error('这是 A/B/C 三道检查的锚点，改动它就必须同步改本脚本。');
  process.exit(2);
}
const nProjects = Number(m[1]);
const parts = m[2].split('+').map((s) => Number(s.trim()));
const total = Number(m[3]);
const items = new Set(parts);
const sum = parts.reduce((a, b) => a + b, 0);
console.log(`  求和式：${nProjects} 个项目 = ${parts.join(' + ')} = ${total}`);
if (sum !== total) fail(`加不出来：${parts.join(' + ')} = ${sum}，但写在等号右边的是 ${total}`);
else ok(`求和正确 ${sum} = ${total}`);
if (parts.length !== nProjects) fail(`项数不符：列了 ${parts.length} 项，但写的是 ${nProjects} 个项目`);
else ok(`项数一致（${nProjects}）`);

/* ---------- B · 总数在四处一致 ---------- */
console.log('\nB 总数一致');
const statsNum = (data.match(/num:\s*'(\d+)'\s*,\s*label:\s*'Tests'/) || [])[1];
const introNum = (data.match(/个项目共\s*(\d+)\s*条/) || [])[1];
const skillsNum = (data.match(/(\d+)\s*条测试与断言/) || [])[1];
const idCount = (data.match(/^\s{4}id:\s*'/gm) || []).length;

for (const [label, got] of [['stats.num(label=Tests)', statsNum], ['profile.intro「N 个项目共 T 条」', introNum], ['skills「T 条测试与断言」', skillsNum]]) {
  if (got === undefined) fail(`${label} 没解析到（写法变了？先修本脚本，别让它静默通过）`);
  else if (Number(got) !== total) fail(`${label} = ${got}，与求和式的 ${total} 不一致`);
  else ok(`${label} = ${total}`);
}
if (idCount !== nProjects) fail(`projects 数组有 ${idCount} 个 id，但文案写 ${nProjects} 个项目`);
else ok(`projects 数组长度 = ${nProjects}`);

/* ---------- C · 封面里的每个测试数都必须是求和式里的一项 ---------- */
console.log('\nC 跨文件同数（封面 ⊆ 求和式）');
if (!coverPath) {
  fail('找不到 src/components/ProjectCover.tsx（改名了就同步改本脚本）');
} else {
  const cover = read(coverPath);
  const found = [...cover.matchAll(/(\d+)\+?\s*(?:项测试|VITEST)/g)].map((x) => Number(x[1]));
  if (!found.length) ok('封面里没有测试数（全部走真截图？）');
  for (const n of new Set(found)) {
    if (items.has(n)) ok(`封面 ${n} 在求和式集合 {${[...items].join(', ')}} 里`);
    else fail(`封面写 ${n}，但求和式里没有这个数 —— 封面与简历口径已经漂移`);
  }
}

/* ---------- D · 作废值遗留 ---------- */
console.log('\nD 作废值遗留');
for (const p of files) {
  const lines = read(p).split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const [rx, why] of RETIRED) {
      if (rx.test(line)) fail(`${rel(p)}:${i + 1} ${why}\n      ${line.trim().slice(0, 120)}`);
    }
  });
}
if (!failures) ok('未发现作废值');

/* ---------- 结论 ---------- */
console.log('');
if (failures) {
  console.error(`FAIL 数字口径门：${failures} 处不通过`);
  console.error('修法：把 src 里的旧值改成现值；若某个值是新作废的，把它加进本脚本的 RETIRED。');
  process.exit(1);
}
console.log(`PASS 数字口径门：求和自洽 ${total}，封面与 data.ts 一致，无作废值残留`);
process.exit(0);
