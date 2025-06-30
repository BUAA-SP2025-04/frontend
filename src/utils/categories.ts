// 科研问题分类标签配置
export const RESEARCH_CATEGORIES = [
  { value: '人工智能', label: '人工智能' },
  { value: '机器学习', label: '机器学习' },
  { value: '深度学习', label: '深度学习' },
  { value: '计算机视觉', label: '计算机视觉' },
  { value: '自然语言处理', label: '自然语言处理' },
  { value: '数据科学', label: '数据科学' },
  { value: '大数据分析', label: '大数据分析' },
  { value: '算法与数据结构', label: '算法与数据结构' },
  { value: '软件工程', label: '软件工程' },
  { value: '系统架构', label: '系统架构' },
  { value: '网络安全', label: '网络安全' },
  { value: '数据库', label: '数据库' },
  { value: '云计算', label: '云计算' },
  { value: '物联网', label: '物联网' },
  { value: '区块链', label: '区块链' },
  { value: '数学建模', label: '数学建模' },
  { value: '统计学', label: '统计学' },
  { value: '优化理论', label: '优化理论' },
  { value: '图论', label: '图论' },
  { value: '数值分析', label: '数值分析' },
  { value: '理论物理', label: '理论物理' },
  { value: '实验物理', label: '实验物理' },
  { value: '量子计算', label: '量子计算' },
  { value: '材料科学', label: '材料科学' },
  { value: '化学工程', label: '化学工程' },
  { value: '生物信息学', label: '生物信息学' },
  { value: '生物医学', label: '生物医学' },
  { value: '基因组学', label: '基因组学' },
  { value: '药物发现', label: '药物发现' },
  { value: '环境科学', label: '环境科学' },
  { value: '气候变化', label: '气候变化' },
  { value: '能源技术', label: '能源技术' },
  { value: '机械工程', label: '机械工程' },
  { value: '电子工程', label: '电子工程' },
  { value: '通信工程', label: '通信工程' },
  { value: '控制理论', label: '控制理论' },
  { value: '机器人学', label: '机器人学' },
  { value: '航空航天', label: '航空航天' },
  { value: '土木工程', label: '土木工程' },
  { value: '经济学', label: '经济学' },
  { value: '金融科技', label: '金融科技' },
  { value: '社会科学', label: '社会科学' },
  { value: '心理学', label: '心理学' },
  { value: '认知科学', label: '认知科学' },
  { value: '教育学', label: '教育学' },
  { value: '医学影像', label: '医学影像' },
  { value: '临床研究', label: '临床研究' },
  { value: '公共卫生', label: '公共卫生' },
  { value: '农业科技', label: '农业科技' },
  { value: '食品科学', label: '食品科学' },
  { value: '海洋科学', label: '海洋科学' },
  { value: '地球科学', label: '地球科学' },
  { value: '天文学', label: '天文学' },
  { value: '空间科学', label: '空间科学' },
  { value: '纳米技术', label: '纳米技术' },
  { value: '生物技术', label: '生物技术' },
  { value: '再生医学', label: '再生医学' },
  { value: '精准医疗', label: '精准医疗' },
  { value: '数字孪生', label: '数字孪生' },
  { value: '边缘计算', label: '边缘计算' },
  { value: '5G/6G技术', label: '5G/6G技术' },
  { value: '虚拟现实', label: '虚拟现实' },
  { value: '增强现实', label: '增强现实' },
  { value: '元宇宙', label: '元宇宙' },
  { value: '论文写作', label: '论文写作' },
  { value: '学术规范', label: '学术规范' },
  { value: '研究方法', label: '研究方法' },
  { value: '实验设计', label: '实验设计' },
  { value: '数据分析方法', label: '数据分析方法' },
  { value: '其他', label: '其他' }
]

// 分类标签分组（按领域）
export const CATEGORY_GROUPS = {
  '计算机科学与技术': [
    '人工智能', '机器学习', '深度学习', '计算机视觉', '自然语言处理',
    '数据科学', '大数据分析', '算法与数据结构', '软件工程', '系统架构',
    '网络安全', '数据库', '云计算', '物联网', '区块链'
  ],
  '数学与统计学': [
    '数学建模', '统计学', '优化理论', '图论', '数值分析'
  ],
  '物理学与量子科学': [
    '理论物理', '实验物理', '量子计算'
  ],
  '材料与化学': [
    '材料科学', '化学工程'
  ],
  '生命科学与医学': [
    '生物信息学', '生物医学', '基因组学', '药物发现', '医学影像',
    '临床研究', '公共卫生', '生物技术', '再生医学', '精准医疗'
  ],
  '环境与能源': [
    '环境科学', '气候变化', '能源技术'
  ],
  '工程与技术': [
    '机械工程', '电子工程', '通信工程', '控制理论', '机器人学',
    '航空航天', '土木工程'
  ],
  '社会科学与人文': [
    '经济学', '金融科技', '社会科学', '心理学', '认知科学', '教育学'
  ],
  '农业与食品': [
    '农业科技', '食品科学'
  ],
  '地球与空间科学': [
    '海洋科学', '地球科学', '天文学', '空间科学'
  ],
  '新兴技术': [
    '纳米技术', '数字孪生', '边缘计算', '5G/6G技术', '虚拟现实',
    '增强现实', '元宇宙'
  ],
  '学术方法': [
    '论文写作', '学术规范', '研究方法', '实验设计', '数据分析方法'
  ]
}

// 获取分类标签的显示名称
export const getCategoryLabel = (value: string): string => {
  const category = RESEARCH_CATEGORIES.find(cat => cat.value === value)
  return category ? category.label : value
}

// 获取分类所属的领域组
export const getCategoryGroup = (value: string): string => {
  for (const [groupName, categories] of Object.entries(CATEGORY_GROUPS)) {
    if (categories.includes(value)) {
      return groupName
    }
  }
  return '其他'
}

// 获取热门分类（用于显示）
export const getPopularCategories = () => [
  { name: '人工智能', count: 89 },
  { name: '机器学习', count: 67 },
  { name: '深度学习', count: 54 },
  { name: '数据科学', count: 43 },
  { name: '计算机视觉', count: 38 },
  { name: '自然语言处理', count: 35 },
  { name: '算法与数据结构', count: 31 },
  { name: '论文写作', count: 28 },
  { name: '软件工程', count: 25 },
  { name: '网络安全', count: 22 },
  { name: '量子计算', count: 19 },
  { name: '生物信息学', count: 17 },
  { name: '云计算', count: 15 },
  { name: '物联网', count: 13 },
  { name: '区块链', count: 11 }
] 