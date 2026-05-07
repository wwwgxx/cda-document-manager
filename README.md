# 共享文档管理系统 - CDA Document Management Platform

医院四乙互联互通等级评审 CDA 文档管理模块，支持 CDA 文档的生成、检索、注册、标准管理和数据源对接。

## 功能模块

| 模块 | 功能 |
|------|------|
| CDA概览 | 仪表盘统计、文档类型分布、科室覆盖率、数据源状态、质量指标、异常告警 |
| 文档检索 | 多维度搜索（身份证/患者ID/姓名/EMPI）、文档类型/科室筛选、日期范围、数据脱敏 |
| 文档列表 | 文档生命周期管理（已生成/已提交/已注册/已归档/异常）、批量操作、操作日志 |
| 标准管理 | CDA模板管理、数据元映射、术语编码（ICD-10/ICD-9）、编码对照、合规性检查 |
| 数据源管理 | HIS/LIS/PACS/EMR等系统对接、连接状态监控、接口日志 |
| 数据删除 | 删除申请、审批流程、审计日志、合规报告 |

## 系统截图

### 登录页面
![登录页面](screenshots/01-login.png)

### CDA概览仪表盘
![CDA概览](screenshots/02-overview.png)

### 文档检索
![文档检索](screenshots/03-search.png)

### 文档列表
![文档列表](screenshots/04-doclist.png)

### 标准管理
![标准管理](screenshots/05-standard.png)

### 数据源管理
![数据源管理](screenshots/06-datasource.png)

### 数据删除
![数据删除](screenshots/07-delete.png)


## 技术栈

- **前端**: Vue 2.7 + HTML5 + CSS3 + 原生 JavaScript
- **部署**: 纯静态文件，无需后端服务
- **标准**: HL7 CDA R2（医疗文档交换标准）

## 快速开始

### 方式一：直接打开

双击 `login.html` 在浏览器中打开即可。

### 方式二：本地服务器

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# 然后访问 http://localhost:8080/login.html
```

### 方式三：Docker

```bash
docker run -d -p 8080:80 nginx:alpine
docker cp . <container>:/usr/share/nginx/html
```

## 登录说明

- 用户名/密码：任意输入即可（演示系统）
- 验证码：输入右侧显示的 4 位验证码
- 也支持 CA 证书登录（演示）

## 页面截图

登录页面采用深色科技风格，主系统包含六个功能模块。

## 项目结构

```
cda-document-manager/
├── login.html    # 登录页面（科技风格）
├── index.html    # 主系统页面
├── style.css     # 全局样式
├── app.js        # 应用逻辑 + 模拟数据
└── README.md     # 项目说明
```

## 许可证

MIT License
