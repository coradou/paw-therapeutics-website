interface DeepseekAnalysis {
  skills: string[];
  experience: string;
  education: string;
  summary: string;
  score: number;
  suggestions: string[];
}

export async function analyzeResumeWithDeepseek(resumeText: string, position: string): Promise<DeepseekAnalysis> {
  const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-073e99ff73a14eacacedfefa2cbaf7bd';
  
  const prompt = `
请分析以下简历内容，针对"${position}"岗位进行评估：

简历内容：
${resumeText}

请按照以下JSON格式返回分析结果，确保返回的是有效的JSON：

{
  "skills": ["技能1", "技能2", "技能3"],
  "experience": "工作经验总结",
  "education": "教育背景总结", 
  "summary": "候选人整体评价",
  "score": 85,
  "suggestions": ["建议1", "建议2", "建议3"]
}

要求：
1. skills：提取候选人的关键技能，最多5个
2. experience：总结工作经验，2-3句话
3. education：总结教育背景，1-2句话
4. summary：对候选人的整体评价，2-3句话
5. score：综合评分（0-100分）
6. suggestions：改进建议，最多3个

请只返回JSON，不要包含其他文字。
`;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from Deepseek API');
    }

    // 尝试解析JSON响应
    try {
      const analysis = JSON.parse(content);
      
      // 验证返回的数据结构
      if (!analysis.skills || !analysis.experience || !analysis.summary || typeof analysis.score !== 'number') {
        throw new Error('Invalid response structure from Deepseek API');
      }
      
      return analysis;
    } catch (parseError) {
      console.error('Failed to parse Deepseek response:', content);
      
      // 如果解析失败，返回默认分析结果
      return {
        skills: extractSkillsFromText(resumeText),
        experience: '需要进一步分析工作经验',
        education: '需要进一步分析教育背景',
        summary: '此简历需要人工审核分析',
        score: 60,
        suggestions: ['建议进行面试进一步了解', '可以补充更多项目经验', '建议优化简历格式']
      };
    }
  } catch (error) {
    console.error('Deepseek API error:', error);
    
    // API调用失败时返回基础分析
    return {
      skills: extractSkillsFromText(resumeText),
      experience: '需要进一步分析工作经验',
      education: '需要进一步分析教育背景', 
      summary: 'API分析暂不可用，建议人工审核',
      score: 60,
      suggestions: ['建议进行人工审核', '可以进行电话沟通', '考虑安排面试']
    };
  }
}

// 简单的技能提取函数作为备用
function extractSkillsFromText(text: string): string[] {
  const commonSkills = [
    'Python', 'JavaScript', 'Java', 'React', 'Vue', 'Node.js', 'SQL', 'MongoDB',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'Linux', 'Machine Learning', 'AI',
    '数据分析', '项目管理', '团队协作', '沟通能力', '领导力'
  ];
  
  const foundSkills = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  return foundSkills.slice(0, 5);
} 