import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Save, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function Settings({
  settings,
  onSaveSettings,
  onTestConnection,
  onResetDatabase,
  onToast
}) {
  const [provider, setProvider] = useState(settings?.provider || 'mock');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [model, setModel] = useState(settings?.model || 'gemini-1.5-flash');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setProvider(settings.provider || 'mock');
      setModel(settings.model || 'gemini-1.5-flash');
    }
  }, [settings]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSaveSettings({
        provider,
        geminiApiKey: geminiApiKey || undefined,
        openaiApiKey: openaiApiKey || undefined,
        model
      });
      if (onToast) onToast('AI settings saved successfully!', 'success');
      setGeminiApiKey('');
      setOpenaiApiKey('');
    } catch (err) {
      if (onToast) onToast('Failed to save settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    try {
      const activeKey = provider === 'gemini' ? geminiApiKey : openaiApiKey;
      const res = await onTestConnection({
        provider,
        apiKey: activeKey,
        model
      });
      if (res.success) {
        if (onToast) onToast(res.message || 'Connection successful!', 'success');
      } else {
        if (onToast) onToast(res.message || 'Connection test failed', 'error');
      }
    } catch (err) {
      if (onToast) onToast('Test error: ' + err.message, 'error');
    } finally {
      setTesting(false);
    }
  };

  const handleResetData = async () => {
    if (window.confirm('Are you sure you want to restore default sample questions and interviews?')) {
      await onResetDatabase();
      if (onToast) onToast('Sample data reset successfully!', 'success');
    }
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem' }}>
          AI & System <span className="gradient-text">Configuration</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
          Connect live generative AI models (Google Gemini or OpenAI) or use the built-in offline intelligent mock engine.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>
          <Cpu size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem' }}>Generative AI Provider Architecture</h3>
        </div>

        {/* Provider Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.8rem' }}>
          
          {/* Mock Provider */}
          <div
            onClick={() => setProvider('mock')}
            style={{
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: provider === 'mock' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: provider === 'mock' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-system">Offline Default</span>
              {provider === 'mock' && <CheckCircle2 size={18} color="var(--primary)" />}
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Mock AI Engine</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Fast, deterministic, zero-cost generator. Preloaded with comprehensive questions & rubric scoring.
            </p>
          </div>

          {/* Google Gemini */}
          <div
            onClick={() => { setProvider('gemini'); setModel('gemini-1.5-flash'); }}
            style={{
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: provider === 'gemini' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: provider === 'gemini' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-coding">Google Cloud</span>
              {provider === 'gemini' && <CheckCircle2 size={18} color="var(--primary)" />}
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>Google Gemini</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              State of the art multimodal reasoning with Gemini 1.5/2.0 Flash for dynamic real-time interview generation.
            </p>
          </div>

          {/* OpenAI */}
          <div
            onClick={() => { setProvider('openai'); setModel('gpt-4o-mini'); }}
            style={{
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              border: provider === 'openai' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: provider === 'openai' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255, 255, 255, 0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span className="badge badge-tech">OpenAI API</span>
              {provider === 'openai' && <CheckCircle2 size={18} color="var(--primary)" />}
            </div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>OpenAI (GPT-4o)</h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              High-accuracy evaluation and prompt-tuned interview simulations powered by OpenAI completions.
            </p>
          </div>

        </div>

        {/* API Key inputs if Gemini or OpenAI chosen */}
        {provider === 'gemini' && (
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.4rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">
                Google Gemini API Key
                {settings?.hasGeminiKey && <span style={{ color: '#10b981', fontSize: '0.78rem' }}>Key configured on server ✓</span>}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showKey ? 'text' : 'password'}
                  className="input-field"
                  placeholder="AIzaSy..."
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Model Selection</label>
              <select
                className="select-field"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash (Fast & Recommended)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (High Analytical Depth)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
              </select>
            </div>
          </div>
        )}

        {provider === 'openai' && (
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.4rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">
                OpenAI API Key
                {settings?.hasOpenaiKey && <span style={{ color: '#10b981', fontSize: '0.78rem' }}>Key configured on server ✓</span>}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showKey ? 'text' : 'password'}
                  className="input-field"
                  placeholder="sk-..."
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Model Selection</label>
              <select
                className="select-field"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              >
                <option value="gpt-4o-mini">gpt-4o-mini (Cost-effective & High Quality)</option>
                <option value="gpt-4o">gpt-4o (State of the art)</option>
              </select>
            </div>
          </div>
        )}

        {/* Buttons Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="button"
            onClick={handleTest}
            disabled={testing}
            className="btn btn-secondary"
          >
            {testing ? <Sparkles size={16} className="animate-spin" /> : <Zap size={16} />}
            Test AI Connection
          </button>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ minWidth: '180px' }}
          >
            {saving ? <Sparkles size={16} className="animate-spin" /> : <Save size={16} />}
            Save Settings
          </button>
        </div>

      </form>

      {/* Database Sample Data Reset Section */}
      <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>Sample Data & Demo Reset</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Reset questions, sample mock sessions, and candidate analytics back to rich default state.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="btn btn-danger btn-sm"
        >
          <RotateCcw size={14} /> Reset Sample Database
        </button>
      </div>

    </div>
  );
}
