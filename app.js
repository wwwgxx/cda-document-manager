new Vue({
    el: '#app',
    data: {
        // Navigation
        currentMenu: 'overview',
        sidebarCollapsed: false,
        loginUser: '信息科',

        // ===== Search =====
        searchType: 'idcard',
        searchValue: '',
        serialNo: '',
        docType: 'EMR-11',
        department: '',
        desensitize: false,
        dateFrom: '',
        dateTo: '',

        // Pagination
        currentPage: 1,
        pageSize: 10,
        jumpPage: 1,

        // Stats
        totalCount: 3613,
        generatedCount: 3456,
        pendingCount: 108,
        errorCount: 49,

        // Modal
        showModal: false,
        showLogModal: false,
        modalData: null,

        // ===== DocList =====
        doclistStatus: '',
        doclistDocType: '',
        doclistRegStatus: '',
        doclistPage: 1,
        doclistPageSize: 10,
        selectedDocs: [],

        // ===== Standard =====
        standardTab: 'template',
        mappingSearch: '',
        termType: '',
        complianceResult: true,

        // ===== Delete =====
        deleteTab: 'apply',

        // Mock Data
        allData: [],
        doclistAllData: [],

        // ===== Overview Data =====
        docTypeStats: [
            { name: 'EMR-01 入院记录', count: 523, pct: 85, color: '#00695c' },
            { name: 'EMR-11 麻醉记录', count: 486, pct: 79, color: '#00897b' },
            { name: 'EMR-12 手术记录', count: 412, pct: 67, color: '#26a69a' },
            { name: 'EMR-14 出院记录', count: 398, pct: 65, color: '#4db6ac' },
            { name: 'EMR-02 首次病程', count: 367, pct: 60, color: '#80cbc4' },
            { name: 'EMR-18 知情同意', count: 341, pct: 55, color: '#b2dfdb' },
            { name: 'LAB-01 检验报告', count: 512, pct: 83, color: '#e6a23c' },
            { name: 'RIS-01 放射报告', count: 289, pct: 47, color: '#f0c78a' },
        ],
        deptCoverage: [
            { name: '产科', pct: 95, color: '#00695c' },
            { name: '骨科', pct: 88, color: '#00897b' },
            { name: '儿科', pct: 82, color: '#26a69a' },
            { name: '内科', pct: 91, color: '#4db6ac' },
            { name: 'ICU', pct: 97, color: '#00695c' },
            { name: '急诊科', pct: 76, color: '#e6a23c' },
        ],
        sourceStatus: [
            { name: 'HIS 系统', type: '主数据源', lastSync: '2024-07-30 18:30', status: 'online', statusText: '在线' },
            { name: 'LIS 系统', type: '检验数据', lastSync: '2024-07-30 18:25', status: 'online', statusText: '在线' },
            { name: 'PACS 系统', type: '影像数据', lastSync: '2024-07-30 17:50', status: 'online', statusText: '在线' },
            { name: '电子病历系统', type: '病历数据', lastSync: '2024-07-30 18:28', status: 'online', statusText: '在线' },
            { name: '麻醉信息系统', type: '专科数据', lastSync: '2024-07-30 16:00', status: 'timeout', statusText: '超时' },
            { name: '护理信息系统', type: '护理数据', lastSync: '2024-07-29 23:50', status: 'offline', statusText: '离线' },
        ],
        trendData: [
            { date: '07-24', count: 487, pct: 81 },
            { date: '07-25', count: 512, pct: 85 },
            { date: '07-26', count: 498, pct: 83 },
            { date: '07-27', count: 523, pct: 87 },
            { date: '07-28', count: 501, pct: 83 },
            { date: '07-29', count: 534, pct: 89 },
            { date: '07-30', count: 558, pct: 93 },
        ],
        alerts: [
            { level: 'error', msg: '护理信息系统连接超时，已连续3次同步失败', time: '2024-07-30 18:32' },
            { level: 'warning', msg: 'EMR-26 病历首页模板数据元DE03.00.014.00映射缺失', time: '2024-07-30 17:15' },
            { level: 'warning', msg: '麻醉信息系统接口响应时间超过5秒', time: '2024-07-30 16:02' },
            { level: 'error', msg: '患者EMPI 47f49-3e2a冲突，2条记录疑似重复', time: '2024-07-30 14:45' },
            { level: 'info', msg: 'LAB-01 检验报告模板已更新至v3.2', time: '2024-07-30 10:20' },
        ],

        // ===== DocType Options =====
        docTypeOptions: [
            { value: 'EMR-01', label: 'EMR-01 入院记录' },
            { value: 'EMR-02', label: 'EMR-02 首次病程记录' },
            { value: 'EMR-03', label: 'EMR-03 日常病程记录' },
            { value: 'EMR-04', label: 'EMR-04 上级医师查房记录' },
            { value: 'EMR-11', label: 'EMR-11 麻醉记录' },
            { value: 'EMR-12', label: 'EMR-12 手术记录' },
            { value: 'EMR-14', label: 'EMR-14 出院记录' },
            { value: 'EMR-18', label: 'EMR-18 知情同意书' },
            { value: 'EMR-26', label: 'EMR-26 病历首页' },
            { value: 'LAB-01', label: 'LAB-01 检验报告' },
            { value: 'RIS-01', label: 'RIS-01 放射报告' },
            { value: 'PHARM-01', label: 'PHARM-01 处方' },
        ],
        departmentOptions: [
            '产科', '关节外科、运动医学科（骨二区）', '脑血管病科（脑病ICU）',
            '日间手术中心', '儿科', '内科', '外科', '急诊科',
            '心内科', '呼吸内科', '消化内科', '神经内科',
            '泌尿外科', '骨科', '眼科', 'ICU'
        ],

        // ===== Standard: CDA Templates =====
        cdaTemplates: [
            { code: 'TPL-001', name: '入院记录', docType: 'EMR-01', version: '3.2', enabled: true },
            { code: 'TPL-002', name: '首次病程记录', docType: 'EMR-02', version: '3.1', enabled: true },
            { code: 'TPL-003', name: '日常病程记录', docType: 'EMR-03', version: '3.0', enabled: true },
            { code: 'TPL-004', name: '上级医师查房记录', docType: 'EMR-04', version: '3.0', enabled: true },
            { code: 'TPL-011', name: '麻醉记录', docType: 'EMR-11', version: '3.2', enabled: true },
            { code: 'TPL-012', name: '手术记录', docType: 'EMR-12', version: '3.2', enabled: true },
            { code: 'TPL-014', name: '出院记录', docType: 'EMR-14', version: '3.1', enabled: true },
            { code: 'TPL-018', name: '知情同意书', docType: 'EMR-18', version: '3.0', enabled: true },
            { code: 'TPL-026', name: '病历首页', docType: 'EMR-26', version: '3.3', enabled: true },
            { code: 'TPL-LAB1', name: '检验报告', docType: 'LAB-01', version: '2.8', enabled: true },
            { code: 'TPL-RIS1', name: '放射报告', docType: 'RIS-01', version: '2.5', enabled: false },
        ],

        // ===== Standard: Data Mappings =====
        dataMappings: [
            { stdCode: 'DE02.01.039.00', stdName: '患者姓名', dataType: 'ST', hisField: 'PATIENT.NAME', mapped: true },
            { stdCode: 'DE02.01.010.00', stdName: '患者身份证号', dataType: 'ST', hisField: 'PATIENT.ID_CARD', mapped: true },
            { stdCode: 'DE02.01.032.00', stdName: '性别代码', dataType: 'CS', hisField: 'PATIENT.GENDER', mapped: true },
            { stdCode: 'DE02.01.005.01', stdName: '出生日期', dataType: 'DT', hisField: 'PATIENT.BIRTH_DATE', mapped: true },
            { stdCode: 'DE03.00.014.00', stdName: '入院诊断', dataType: 'ST', hisField: 'ADMISSION.DIAGNOSIS', mapped: true },
            { stdCode: 'DE03.00.017.00', stdName: '手术名称', dataType: 'ST', hisField: 'SURGERY.NAME', mapped: true },
            { stdCode: 'DE08.10.026.00', stdName: '手术日期', dataType: 'DT', hisField: 'SURGERY.DATE', mapped: true },
            { stdCode: 'DE04.01.018.00', stdName: '体温', dataType: 'PQ', hisField: '', mapped: false },
            { stdCode: 'DE04.01.019.00', stdName: '脉搏', dataType: 'PQ', hisField: '', mapped: false },
            { stdCode: 'DE04.01.020.00', stdName: '呼吸频率', dataType: 'PQ', hisField: '', mapped: false },
            { stdCode: 'DE04.01.021.00', stdName: '收缩压', dataType: 'PQ', hisField: 'VITAL.SYSTOLIC', mapped: true },
            { stdCode: 'DE06.00.096.00', stdName: '药物名称', dataType: 'ST', hisField: 'DRUG.NAME', mapped: true },
        ],

        // ===== Standard: Terminology =====
        terminologyList: [
            { code: 'ICD-10', name: 'ICD-10 国际疾病分类第10版', typeName: '诊断编码', version: '2024版', count: '14,567' },
            { code: 'ICD-9-CM', name: 'ICD-9-CM 国际手术操作分类', typeName: '手术编码', version: '2024版', count: '4,892' },
            { code: 'DEPT', name: '医疗机构科室分类与代码', typeName: '科室编码', version: 'WS/T 102', count: '286' },
            { code: 'DRUG', name: '国家基本药物目录编码', typeName: '药品编码', version: '2024版', count: '1,256' },
            { code: 'NATIONAL', name: '居民健康档案信息集', typeName: '健康档案', version: '2017版', count: '368' },
        ],

        // ===== Standard: Coding Mappings =====
        codingMappings: [
            { hisCode: 'CK-001', hisName: '产科一区', stdCode: 'DEPT-04-01', stdName: '产科', type: '科室' },
            { hisCode: 'CK-002', hisName: '骨科二区', stdCode: 'DEPT-07-02', stdName: '骨科', type: '科室' },
            { hisCode: 'G01.001', hisName: '头孢呋辛钠', stdCode: 'DRUG-C05A', stdName: '头孢呋辛', type: '药品' },
            { hisCode: 'M01.101', hisName: '阑尾切除术', stdCode: 'ICD9-47.0', stdName: '阑尾切除术', type: '手术' },
            { hisCode: 'D01.003', hisName: '2型糖尿病', stdCode: 'ICD10-E11', stdName: '2型糖尿病', type: '诊断' },
            { hisCode: 'D01.001', hisName: '高血压病', stdCode: 'ICD10-I10', stdName: '原发性高血压', type: '诊断' },
        ],

        // ===== Standard: Compliance =====
        complianceItems: [
            { name: 'CDA文档格式规范', desc: '符合HL7 CDA R2标准结构', pass: true },
            { name: '必填数据元完整性', desc: '核心数据元完整率>=95%', pass: true },
            { name: '术语编码一致性', desc: 'ICD-10/ICD-9编码使用规范', pass: false, failCount: 12 },
            { name: 'EMPI唯一性', desc: '患者主索引无重复', pass: true },
            { name: '文档注册完整性', desc: '所有文档已注册到平台', pass: false, failCount: 49 },
            { name: '隐私脱敏合规', desc: '敏感字段已脱敏处理', pass: true },
            { name: '审计日志完整', desc: '所有操作有审计记录', pass: true },
            { name: '数据元映射覆盖', desc: '标准数据元映射率>=90%', pass: false, failCount: 3 },
        ],

        // ===== DataSource =====
        dataSources: [
            { name: 'HIS 系统', type: '医院信息系统', interface: 'HL7 FHIR', url: 'https://his.hospital.local/fhir', syncStrategy: '实时同步', lastSync: '2024-07-30 18:30', dataCount: 2856, status: 'online', statusText: '在线' },
            { name: 'LIS 系统', type: '检验信息系统', interface: 'Web Service', url: 'https://lis.hospital.local/ws', syncStrategy: '定时同步(5min)', lastSync: '2024-07-30 18:25', dataCount: 1234, status: 'online', statusText: '在线' },
            { name: 'PACS 系统', type: '影像归档系统', interface: 'DICOM/WADO', url: 'https://pacs.hospital.local/wado', syncStrategy: '触发式同步', lastSync: '2024-07-30 17:50', dataCount: 856, status: 'online', statusText: '在线' },
            { name: '电子病历系统', type: 'EMR系统', interface: 'REST API', url: 'https://emr.hospital.local/api', syncStrategy: '实时同步', lastSync: '2024-07-30 18:28', dataCount: 3421, status: 'online', statusText: '在线' },
            { name: '麻醉信息系统', type: '专科系统', interface: '数据库直连', url: 'db://anesthesia.hospital.local:3306', syncStrategy: '定时同步(10min)', lastSync: '2024-07-30 16:00', dataCount: 423, status: 'timeout', statusText: '超时' },
            { name: '护理信息系统', type: '护理系统', interface: 'Web Service', url: 'https://nurse.hospital.local/ws', syncStrategy: '定时同步(15min)', lastSync: '2024-07-29 23:50', dataCount: 1876, status: 'offline', statusText: '离线' },
        ],

        // ===== Delete Requests =====
        deleteRequests: [
            { applyNo: 'DEL-2024-001', empi: '6834-ae1e-47f4', name: '张三', reason: '患者要求删除', docCount: 5, applicant: '信息科-王明', applyTime: '2024-07-28', status: 'executed', statusText: '已执行' },
            { applyNo: 'DEL-2024-002', empi: 'fd7b-17ae-88ce', name: '李四', reason: '数据录入错误', docCount: 3, applicant: '产科-张医生', applyTime: '2024-07-29', status: 'pending', statusText: '待审批' },
            { applyNo: 'DEL-2024-003', empi: '5105-06d9-d28c', name: '王五', reason: '重复记录清理', docCount: 2, applicant: '信息科-李明', applyTime: '2024-07-29', status: 'approved', statusText: '已通过' },
            { applyNo: 'DEL-2024-004', empi: 'e3f1-9a2b-c4d5', name: '赵六', reason: '患者隐私保护', docCount: 8, applicant: '医务科-刘主任', applyTime: '2024-07-30', status: 'pending', statusText: '待审批' },
            { applyNo: 'DEL-2024-005', empi: 'b7c8-d9e0-f1a2', name: '钱七', reason: '系统测试数据清理', docCount: 15, applicant: '信息科-王明', applyTime: '2024-07-30', status: 'rejected', statusText: '已驳回' },
        ],

        // ===== Audit =====
        auditList: [
            { applyNo: 'DEL-2024-002', name: '李四', reason: '数据录入错误', time: '2024-07-29', status: 'pending', statusText: '待审批' },
            { applyNo: 'DEL-2024-004', name: '赵六', reason: '患者隐私保护', time: '2024-07-30', status: 'pending', statusText: '待审批' },
            { applyNo: 'DEL-2024-003', name: '王五', reason: '重复记录清理', time: '2024-07-29', status: 'approved', statusText: '已通过' },
            { applyNo: 'DEL-2024-005', name: '钱七', reason: '系统测试数据清理', time: '2024-07-30', status: 'rejected', statusText: '已驳回' },
            { applyNo: 'DEL-2024-001', name: '张三', reason: '患者要求删除', time: '2024-07-28', status: 'approved', statusText: '已通过' },
        ],

        // ===== Audit Logs =====
        auditLogs: [
            { time: '2024-07-30 15:30', type: '审批通过', typeClass: 'generated', user: '信息科-王明', content: '审批通过删除申请 DEL-2024-003', target: '患者王五 2条CDA', ip: '192.168.1.101' },
            { time: '2024-07-30 14:20', type: '执行删除', typeClass: 'error', user: '系统', content: '执行删除申请 DEL-2024-001', target: '患者张三 5条CDA', ip: '10.0.0.1' },
            { time: '2024-07-30 11:00', type: '审批驳回', typeClass: 'error', user: '医务科-刘主任', content: '驳回删除申请 DEL-2024-005', target: '系统测试数据', ip: '192.168.1.102' },
            { time: '2024-07-29 16:45', type: '申请创建', typeClass: 'pending', user: '产科-张医生', content: '创建删除申请 DEL-2024-002', target: '患者李四 3条CDA', ip: '192.168.1.105' },
            { time: '2024-07-29 14:30', type: '申请创建', typeClass: 'pending', user: '信息科-李明', content: '创建删除申请 DEL-2024-003', target: '患者王五 2条CDA', ip: '192.168.1.101' },
        ],

        // ===== API Logs =====
        apiLogs: [
            { time: '18:30:15', endpoint: '/fhir/Patient', method: 'GET', ok: true, duration: 45 },
            { time: '18:30:12', endpoint: '/fhir/DocumentReference', method: 'POST', ok: true, duration: 128 },
            { time: '18:29:58', endpoint: '/lis/result/query', method: 'GET', ok: true, duration: 230 },
            { time: '18:25:03', endpoint: '/ws/anesthesia/record', method: 'POST', ok: false, duration: 5023 },
            { time: '18:20:11', endpoint: '/api/emr/cda/generate', method: 'POST', ok: true, duration: 356 },
            { time: '18:15:44', endpoint: '/wado?requestType=WADO', method: 'GET', ok: true, duration: 890 },
        ],

        // ===== Operation Logs =====
        operationLogs: [
            { action: '文档生成', detail: 'EMR-11 麻醉记录 CDA文档自动生成', type: 'generate', user: '系统', time: '2024-07-30 18:30' },
            { action: '格式校验', detail: '文档通过HL7 CDA R2格式校验', type: 'validate', user: '系统', time: '2024-07-30 18:30' },
            { action: '数据脱敏', detail: '身份证号、EMPI字段已脱敏处理', type: 'desensitize', user: '系统', time: '2024-07-30 18:30' },
            { action: '平台注册', detail: '文档已注册到区域健康信息平台', type: 'register', user: '系统', time: '2024-07-30 18:31' },
            { action: '人工审核', detail: '信息科-王明 审核通过', type: 'audit', user: '王明', time: '2024-07-30 17:20' },
            { action: '模板更新', detail: 'EMR-11模板从v3.1更新至v3.2', type: 'template', user: '管理员', time: '2024-07-30 10:20' },
        ],
    },

    computed: {
        searchPlaceholder() {
            const map = { idcard: '请输入患者身份证号码、患者ID', patientId: '请输入患者ID', name: '请输入患者姓名', empi: '请输入EMPI' };
            return map[this.searchType] || '请输入搜索内容';
        },

        currentDocTypeLabel() {
            const found = this.docTypeOptions.find(d => d.value === this.docType);
            return found ? found.label : '全部文档';
        },

        filteredData() {
            let data = this.allData;
            if (this.docType) data = data.filter(d => d.docType === this.docType);
            if (this.department) data = data.filter(d => d.department === this.department);
            if (this.searchValue) {
                const val = this.searchValue.toLowerCase();
                data = data.filter(d => {
                    if (this.searchType === 'idcard') return d.idcard.includes(val);
                    if (this.searchType === 'patientId') return d.patientId.toLowerCase().includes(val);
                    if (this.searchType === 'name') return d.name.includes(val);
                    if (this.searchType === 'empi') return d.empi.toLowerCase().includes(val);
                    return true;
                });
            }
            return data;
        },

        filteredTotal() { return this.filteredData.length; },
        totalPages() { return Math.ceil(this.filteredTotal / this.pageSize) || 1; },

        tableData() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredData.slice(start, start + this.pageSize);
        },

        visiblePages() {
            const total = this.totalPages, current = this.currentPage, pages = [];
            if (total <= 7) { for (let i = 1; i <= total; i++) pages.push(i); return pages; }
            pages.push(1);
            if (current > 4) pages.push('...');
            const start = Math.max(2, current - 2), end = Math.min(total - 1, current + 2);
            for (let i = start; i <= end; i++) pages.push(i);
            if (current < total - 3) pages.push('...');
            pages.push(total);
            return pages;
        },

        // DocList
        doclistFilteredData() {
            let data = this.doclistAllData;
            if (this.doclistStatus) data = data.filter(d => d.status === this.doclistStatus);
            if (this.doclistDocType) data = data.filter(d => d.docType === this.doclistDocType);
            if (this.doclistRegStatus) data = data.filter(d => d.regStatus === this.doclistRegStatus);
            return data;
        },
        doclistFilteredTotal() { return this.doclistFilteredData.length; },
        doclistTotalPages() { return Math.ceil(this.doclistFilteredTotal / this.doclistPageSize) || 1; },
        doclistTableData() {
            const start = (this.doclistPage - 1) * this.doclistPageSize;
            return this.doclistFilteredData.slice(start, start + this.doclistPageSize);
        },
        isAllSelected() {
            return this.doclistTableData.length > 0 && this.selectedDocs.length === this.doclistTableData.length;
        },
    },

    methods: {
        toggleSidebar() { this.sidebarCollapsed = !this.sidebarCollapsed; },
        switchMenu(menu) { this.currentMenu = menu; this.showLogModal = false; },
        toggleDesensitize() { this.desensitize = !this.desensitize; },
        resetSearch() { this.searchValue = ''; this.serialNo = ''; this.department = ''; this.dateFrom = ''; this.dateTo = ''; this.currentPage = 1; },
        doSearch() { this.currentPage = 1; },
        changePage(page) { if (page >= 1 && page <= this.totalPages) this.currentPage = page; },
        changePageSize() { this.currentPage = 1; },
        doJump() { if (this.jumpPage >= 1 && this.jumpPage <= this.totalPages) this.currentPage = this.jumpPage; },
        viewDocument(row) { this.modalData = row; this.showModal = true; },
        viewDocDetail(row) { alert('查看文档详情 - ' + row.docNo); },
        downloadCDA() { alert('CDA文档下载功能 - 请连接后端接口'); },
        exportData() { alert('数据导出功能 - 请连接后端接口'); },
        batchRegist() { alert('批量注册 ' + this.selectedDocs.length + ' 个文档到区域平台'); },
        batchExport() { alert('批量导出 ' + this.selectedDocs.length + ' 个文档'); },
        batchGenerate() { alert('批量生成 ' + this.selectedDocs.length + ' 个CDA文档'); },
        registOne(row) { alert('注册文档 ' + row.docNo + ' 到区域平台'); },
        toggleSelectAll(e) {
            if (e.target.checked) {
                this.selectedDocs = this.doclistTableData.map(d => d.id);
            } else {
                this.selectedDocs = [];
            }
        },
        runComplianceCheck() { this.complianceResult = true; alert('合规检查已执行，请查看检查结果'); },

        desensitizeEmpi(emp) { return emp ? emp.substring(0, 4) + '...' : emp; },
        desensitizeName(name) { return name && name.length > 1 ? name[0] + '**' : name; },
        desensitizeIdcard(id) { return id && id.length > 6 ? id.substring(0, 3) + '***********' + id.substring(id.length - 3) : '***'; },

        generateMockData() {
            const names = ['邹蜻蜻', '蒙婷', '温振强', '陈谷英', '谢秋玲', '张亦可', '刘家林', '陈丹妮', '梅志龙', '陈容生', '王建国', '李秀英', '张明', '王芳', '刘洋', '陈静', '杨丽', '赵伟', '黄敏', '周强', '吴芳', '孙磊', '朱婷', '马超', '胡静', '林峰', '何雪', '罗浩', '梁慧', '宋杰'];
            const departments = ['产科', '关节外科、运动医学科（骨二区）', '脑血管病科（脑病ICU）', '日间手术中心', '儿科', '内科', '外科', '急诊科', '心内科', '呼吸内科', '消化内科', '神经内科'];
            const caseTitles = ['麻醉记录', '入院记录', '首次病程记录', '日常病程记录', '上级医师查房记录', '手术记录', '出院记录', '知情同意书'];
            const docTypes = ['EMR-11', 'EMR-01', 'EMR-02', 'EMR-03', 'EMR-04', 'EMR-12', 'EMR-14', 'EMR-18'];
            const statuses = ['generated', 'submitted', 'registered', 'archived', 'error'];
            const statusTexts = ['已生成', '已提交', '已注册', '已归档', '异常'];
            const regStatuses = ['registered', 'unregistered', 'failed'];
            const regStatusTexts = ['已注册', '未注册', '注册失败'];

            const data = [], doclistData = [];
            const baseDate = new Date(2024, 6, 30);

            for (let i = 0; i < 1214; i++) {
                const name = names[i % names.length];
                const dept = departments[i % departments.length];
                const caseTitle = caseTitles[i % caseTitles.length];
                const docType = docTypes[i % docTypes.length];
                const empi = this.randomHex(4) + '-' + this.randomHex(2) + '-' + this.randomHex(2) + '-' + this.randomHex(2) + '-' + this.randomHex(6);
                const patientId = '936' + String(6690 + Math.floor(Math.random() * 500)).padStart(4, '0');
                const idcard = this.generateIdcard();
                const dayOffset = Math.floor(Math.random() * 60) - 30;
                const admDate = new Date(baseDate.getTime() + dayOffset * 86400000);
                const admissionDate = this.formatDate(admDate);

                const si = i % 5;
                const rsi = i % 3;

                data.push({ empi, name, patientId, idcard, department: dept, admissionDate, caseTitle, docType });

                if (i < 200) {
                    const genDate = new Date(baseDate.getTime() + (dayOffset + 1) * 86400000);
                    doclistData.push({
                        id: i + 1,
                        docNo: 'CDA-' + String(20240001 + i),
                        name: name,
                        docType: docType,
                        docTypeName: this.docTypeOptions.find(d => d.value === docType)?.label || docType,
                        generateTime: this.formatDate(genDate),
                        status: statuses[si],
                        statusText: statusTexts[si],
                        regStatus: regStatuses[rsi],
                        regStatusText: regStatusTexts[rsi],
                    });
                }
            }

            return { data, doclistData };
        },

        randomHex(len) {
            const chars = '0123456789abcdef';
            let result = '';
            for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * 16)];
            return result;
        },

        generateIdcard() {
            const area = ['440100', '440103', '440104', '440105', '440106', '440111', '440112', '440113'];
            return area[Math.floor(Math.random() * area.length)] + (1960 + Math.floor(Math.random() * 40)) + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0') + String(Math.floor(Math.random() * 999) + 1).padStart(3, '0') + String(Math.floor(Math.random() * 10));
        },

        formatDate(date) {
            return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
        },

        alert(msg) { window.alert(msg); },

        doLogout() {
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('loginUser');
            window.location.href = 'login.html';
        },

        updateClock() {
            const now = new Date();
            const pad = n => String(n).padStart(2, '0');
            const el = document.getElementById('topClock');
            if (el) {
                el.textContent = now.getFullYear() + '-' + pad(now.getMonth()+1) + '-' + pad(now.getDate()) + ' ' +
                    pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
            }
        }
    },

    mounted() {
        // Login check
        if (!sessionStorage.getItem('loggedIn')) {
            window.location.href = 'login.html';
            return;
        }
        this.loginUser = sessionStorage.getItem('loginUser') || '信息科';

        // Clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // Generate data
        const { data, doclistData } = this.generateMockData();
        this.allData = data;
        this.doclistAllData = doclistData;
    }
});
