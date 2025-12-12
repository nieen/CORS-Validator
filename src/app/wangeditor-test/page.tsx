'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css';

// 动态导入 WangEditor 和 Toolbar，确保只在客户端渲染
const Editor = dynamic(
  () => import('@wangeditor/editor-for-react').then(mod => mod.Editor),
  { 
    ssr: false,
    loading: () => <p>加载编辑器中...</p>
  }
);

const Toolbar = dynamic(
  () => import('@wangeditor/editor-for-react').then(mod => mod.Toolbar),
  { 
    ssr: false,
    loading: () => <p>加载工具栏中...</p>
  }
);

const WangEditorTestPage = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello&nbsp;world</p>');
  const [jsonContent, setJsonContent] = useState<any>({});
  const [jsonInput, setJsonInput] = useState<string>('[]');
  const [showJsonModal, setShowJsonModal] = useState(false);

  // 工具栏配置
  const toolbarConfig = useMemo(() => ({}), []);
  
  // 编辑器配置 - 使用 useMemo 确保配置稳定
  const editorConfig: Partial<IEditorConfig> = useMemo(() => ({
    placeholder: '请输入内容...',
    onCreated: (editor: IDomEditor) => {
      console.log('编辑器已创建', editor);
      setEditor(editor);
    },
    onChange: (editor: IDomEditor) => {
      setHtml(editor.getHtml());
    },
    MENU_CONF: {
      uploadImage: {
        server: '/api/upload', // 上传服务器地址
        fieldName: 'file',
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxNumberOfFiles: 10,
        allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        onBeforeUpload: (files: any) => {
          console.log('上传前的文件:', files);
          return files;
        },
        onProgress: (progress: any) => {
          console.log('上传进度:', progress);
        },
        onSuccess: (file: any, res: any) => {
          console.log('上传成功:', file, res);
        },
        onFailed: (file: any, err: any) => {
          console.error('上传失败:', file, err);
        },
        onError: (err: any) => {
          console.error('上传错误:', err);
        },
        customInsertFn: (url: any) => {
          console.log('使用自定义URL插入:', url);
        }
      }
    }
  }), []);

  // 获取JSON格式内容
  const handleGetJson = useCallback(() => {
    if (editor) {
      const json = editor.children;
      setJsonContent(json);
      console.log('JSON 内容:', json);
      alert('JSON 内容已输出到控制台，请查看浏览器开发者工具');
    } else {
      alert('编辑器未就绪，请稍后重试');
      console.log('editor state:', editor);
    }
  }, [editor]);

  // 设置JSON格式内容
  const handleSetJson = useCallback(() => {
    if (editor) {
      // 示例JSON内容
      const sampleJson = [
        {
          type: 'paragraph',
          children: [
            { text: '这是通过JSON设置的内容' }
          ]
        },
        {
          type: 'paragraph',
          children: [
            { text: '' }
          ]
        }
      ];
      
      try {
        // 使用 setHtml 方法更新编辑器内容
        // WangEditor 提供的标准方法
        editor.setHtml('<p>这是通过JSON设置的内容</p><p></p>');
        
        // 同时更新 children
        editor.children = sampleJson;
        
        // 触发 onChange 更新 html 状态
        setHtml(editor.getHtml());
        setJsonContent(sampleJson);
        
        alert('已设置示例JSON内容');
      } catch (error) {
        console.error('设置内容失败:', error);
        alert('设置内容失败，请查看控制台错误信息');
      }
    } else {
      alert('编辑器未就绪，请稍后重试');
      console.log('editor state:', editor);
    }
  }, [editor]);

  // 提交自定义JSON内容
  const handleSubmitJson = useCallback(() => {
    if (!editor) {
      alert('编辑器未就绪，请稍后重试');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      
      if (!Array.isArray(parsedJson)) {
        alert('JSON 必须是数组格式');
        return;
      }

      // 转换 JSON 格式数据为 HTML
      let htmlContent = '';
      parsedJson.forEach((block: any) => {
        if (block.type === 'paragraph') {
          let paragraphContent = '';
          if (block.children && Array.isArray(block.children)) {
            paragraphContent = block.children.map((child: any) => {
              let text = child.text || '';
              if (child.bold) text = `<strong>${text}</strong>`;
              if (child.italic) text = `<em>${text}</em>`;
              if (child.underline) text = `<u>${text}</u>`;
              if (child.code) text = `<code>${text}</code>`;
              return text;
            }).join('');
          }
          htmlContent += `<p>${paragraphContent || '&nbsp;'}</p>`;
        } else if (block.type === 'blockquote') {
          let quoteContent = '';
          if (block.children && Array.isArray(block.children)) {
            quoteContent = block.children.map((child: any) => child.text || '').join('');
          }
          htmlContent += `<blockquote><p>${quoteContent}</p></blockquote>`;
        }
      });

      // 设置编辑器内容
      editor.setHtml(htmlContent || '<p></p>');
      editor.children = parsedJson;
      
      // 更新状态
      setHtml(editor.getHtml());
      setJsonContent(parsedJson);
      setShowJsonModal(false);
      
      alert('已成功设置 JSON 内容');
    } catch (error) {
      alert(`JSON 格式错误: ${error instanceof Error ? error.message : '未知错误'}`);
      console.error('JSON 解析错误:', error);
    }
  }, [editor, jsonInput]);

  // 组件销毁时销毁编辑器
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WangEditor 5 验证</h1>
      
      {!editor && <p style={{ color: '#ff6b6b' }}>正在加载编辑器...</p>}
      
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          defaultHtml={html}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      
      <div className="flex gap-2 my-4">
        <button 
          onClick={handleGetJson}
          disabled={!editor}
          className={`px-4 py-2 rounded ${editor ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        >
          获取JSON格式内容
        </button>
        <button 
          onClick={() => setShowJsonModal(true)}
          disabled={!editor}
          className={`px-4 py-2 rounded ${editor ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        >
          设置JSON格式内容
        </button>
      </div>
      
      {/* JSON 输入模态框 */}
      {showJsonModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0 }}>设置 JSON 格式内容</h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              输入有效的 JSON 数组，格式示例：
            </p>
            <pre style={{
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '4px',
              fontSize: '12px',
              overflowX: 'auto'
            }}>
{`[
  {
    "type": "paragraph",
    "children": [
      { "text": "这是段落文本" }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      { "text": "粗体文本", "bold": true }
    ]
  }
]`}
            </pre>
            
            <label style={{ display: 'block', marginTop: '16px', marginBottom: '8px', fontWeight: 'bold' }}>
              JSON 内容：
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              style={{
                width: '100%',
                height: '200px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
                boxSizing: 'border-box'
              }}
              placeholder="粘贴 JSON 数据..."
            />
            
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowJsonModal(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer'
                }}
              >
                取消
              </button>
              <button
                onClick={handleSubmitJson}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">HTML 内容</h2>
          <div className="border border-gray-300 rounded p-2 min-h-[100px]">
            <pre style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{html}</pre>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">JSON 内容</h2>
          <div className="border border-gray-300 rounded p-2 min-h-[100px]">
            <pre style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '300px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>{JSON.stringify(jsonContent, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WangEditorTestPage;