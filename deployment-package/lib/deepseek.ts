interface DeepseekAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: 'recommended' | 'consider' | 'not_recommended';
  summary: string;
  technicalSkills: string[];
  experience: string;
  education: string;
  fitForPosition: string;
}

export async function analyzeResumeWithDeepseek(resumeText: string, position: string): Promise<DeepseekAnalysis> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️ 未配置Deepseek API Key，跳过AI分析');
    throw new Error('Deepseek API Key未配置');
  }

  const prompt = `请对以下简历进行分析，针对${position}岗位评估候选人的适配度。

简历内容：
${resumeText}

请以JSON格式返回分析结果，包含以下字段：
{
  "score": 0-100的综合评分,
  "strengths": ["优势1", "优势2"],
  "weaknesses": ["不足1", "不足2"],
  "recommendation": "recommended|consider|not_recommended",
  "summary": "整体评价总结",
  "technicalSkills": ["技能1", "技能2"],
  "experience": "工作经验描述",
  "education": "教育背景描述",
  "fitForPosition": "与岗位匹配度分析"
}`;

  try {
    // 🛡️ 创建超时Promise
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('API请求超时')), 30000)
    );

    // 🛡️ API请求Promise
    const apiPromise = fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的HR助手，负责分析简历和评估候选人。请始终返回有效的JSON格式。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    // 🛡️ 使用Promise.race来处理超时
    const response = await Promise.race([apiPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Deepseek API响应错误:', response.status, errorText);
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      console.error('Deepseek API返回数据格式异常:', data);
      throw new Error('API返回数据格式异常');
    }

    const content = data.choices[0].message.content;
    
    // 🛡️ 安全的JSON解析
    let analysis: DeepseekAnalysis;
    try {
      analysis = JSON.parse(content);
    } catch (jsonError) {
      console.error('JSON解析失败:', jsonError, 'Content:', content);
      throw new Error('AI分析结果格式错误');
    }

    // 🛡️ 验证返回数据结构
    if (!analysis || typeof analysis !== 'object') {
      throw new Error('AI分析结果结构无效');
    }

    // 🛡️ 提供默认值以防止undefined
    const safeAnalysis: DeepseekAnalysis = {
      score: Number(analysis.score) || 0,
      strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
      weaknesses: Array.isArray(analysis.weaknesses) ? analysis.weaknesses : [],
      recommendation: analysis.recommendation || 'consider',
      summary: analysis.summary || '分析完成',
      technicalSkills: Array.isArray(analysis.technicalSkills) ? analysis.technicalSkills : [],
      experience: analysis.experience || '待补充',
      education: analysis.education || '待补充',
      fitForPosition: analysis.fitForPosition || '待分析'
    };

    console.log('✅ Deepseek分析完成, 评分:', safeAnalysis.score);
    return safeAnalysis;

  } catch (error) {
    console.error('❌ Deepseek分析失败:', error);
    
    // 🛡️ 返回安全的默认分析结果，而不是抛出错误
    return {
      score: 50,
      strengths: ['简历已提交'],
      weaknesses: ['AI分析暂不可用'],
      recommendation: 'consider',
      summary: `针对${position}岗位的简历已收到，AI分析功能暂时不可用，请手动审核。`,
      technicalSkills: ['待人工评估'],
      experience: '待人工评估',
      education: '待人工评估',
      fitForPosition: '需要人工审核评估'
    };
  }
} 