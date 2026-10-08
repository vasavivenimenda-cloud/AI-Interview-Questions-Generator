import React, { useState, useEffect } from 'react';
import { 
  User, 
  Save, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  CheckCircle, 
  Sparkles, 
  Tag, 
  X, 
  Plus,
  Compass
} from 'lucide-react';

export default function UserProfile({ profile, onSaveProfile, onToast }) {
  const [formData, setFormData] = useState({
    name: profile?.name || 'Alex Morgan',
    education: profile?.education || 'B.Tech in Computer Science & Engineering',
    experience: profile?.experience || 'Fresher',
    targetRole: profile?.targetRole || 'Full Stack Developer',
    skills: profile?.skills || 'React, Node.js, Python, JavaScript, SQL, Git',
    programmingLanguage: profile?.programmingLanguage || 'JavaScript',
    preferredInterviewType: profile?.preferredInterviewType || 'Technical Interview',
    avatar: profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        education: profile.education || '',
        experience: profile.experience || 'Fresher',
        targetRole: profile.targetRole || '',
        skills: profile.skills || '',
        programmingLanguage: profile.programmingLanguage || 'JavaScript',
        preferredInterviewType: profile.preferredInterviewType || 'Technical Interview',
        avatar: profile.avatar || formData.avatar
      });
    }
  }, [profile]);

  // Skill tags helpers
  const skillList = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

  const removeSkill = (skillToRemove) => {
    const updated = skillList.filter(s => s.toLowerCase() !== skillToRemove.toLowerCase()).join(', ');
    setFormData({ ...formData, skills: updated });
  };

  const addSkill = (skillToAdd) => {
    if (!skillList.some(s => s.toLowerCase() === skillToAdd.toLowerCase())) {
      const updated = formData.skills ? `${formData.skills}, ${skillToAdd}` : skillToAdd;
      setFormData({ ...formData, skills: updated });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.targetRole.trim()) {
      if (onToast) onToast('Name and Target Job Role are required', 'error');
      return;
    }

    setSaving(true);
    try {
      await onSaveProfile(formData);
      if (onToast) onToast('Profile saved successfully! AI prompts will now personalize to your details.', 'success');
    } catch (err) {
      if (onToast) onToast('Failed to save profile: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Avatar presets
  const avatarPresets = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
  ];

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem' }}>
          Candidate <span className="gradient-text">Profile Settings</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
          Your profile automatically trains the AI question engine to target your specific degree, skill stack, and experience level.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem', border: '1px solid var(--border-glow)' }}>
        
        {/* Avatar and Identity Preview */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
          <img
            src={formData.avatar}
            alt="Candidate Avatar"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: '0 0 20px var(--primary-glow)' }}
          />

          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{formData.name || 'Candidate Name'}</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Target: <strong style={{ color: 'var(--text-primary)' }}>{formData.targetRole}</strong> • {formData.experience}
            </p>

            {/* Choose avatar presets */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Choose avatar:</span>
              {avatarPresets.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt={`Preset ${i}`}
                  onClick={() => setFormData({ ...formData, avatar: av })}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: formData.avatar === av ? '2px solid var(--primary)' : '1px solid var(--border-subtle)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
          
          {/* Full Name */}
          <div className="input-group">
            <label className="input-label">Full Name *</label>
            <input
              type="text"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Education */}
          <div className="input-group">
            <label className="input-label">Education / Degree</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. B.Tech Computer Science, BCA, MCA"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            />
          </div>

          {/* Experience Level */}
          <div className="input-group">
            <label className="input-label">Experience Level *</label>
            <select
              className="select-field"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            >
              <option value="Fresher">Fresher (Campus / Entry Level)</option>
              <option value="1-2 Years">1-2 Years (Junior Associate)</option>
              <option value="3-5 Years">3-5 Years (Mid-Level Engineer)</option>
              <option value="5+ Years">5+ Years (Senior / Tech Lead)</option>
            </select>
          </div>

          {/* Target Job Role */}
          <div className="input-group">
            <label className="input-label">Target Job Role *</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Full Stack Developer, Frontend, Backend, AI/ML"
              value={formData.targetRole}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              required
            />
          </div>

          {/* Programming Language */}
          <div className="input-group">
            <label className="input-label">Primary Programming Language</label>
            <select
              className="select-field"
              value={formData.programmingLanguage}
              onChange={(e) => setFormData({ ...formData, programmingLanguage: e.target.value })}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Preferred Interview Type */}
          <div className="input-group">
            <label className="input-label">Preferred Interview Type</label>
            <select
              className="select-field"
              value={formData.preferredInterviewType}
              onChange={(e) => setFormData({ ...formData, preferredInterviewType: e.target.value })}
            >
              <option value="Technical Interview">Technical Interview</option>
              <option value="HR Interview">HR Interview</option>
              <option value="Coding Interview">Coding Interview</option>
              <option value="Behavioral Interview">Behavioral Interview</option>
              <option value="Scenario-Based Interview">Scenario-Based Interview</option>
              <option value="Mixed Interview">Mixed Interview</option>
            </select>
          </div>

        </div>

        {/* Skills Tag Management */}
        <div className="input-group" style={{ marginTop: '0.8rem' }}>
          <label className="input-label">
            Key Skills & Technologies (comma separated)
          </label>
          <input
            type="text"
            className="input-field"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            placeholder="e.g. React, Node.js, Python, SQL, REST APIs, Git"
          />

          {/* Render Active Skill Pills with delete */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
            {skillList.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontSize: '0.8rem'
                }}
              >
                {skill}
                <X
                  size={13}
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeSkill(skill)}
                />
              </span>
            ))}
          </div>

          {/* Suggested Skills */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Suggestions:</span>
            {['TypeScript', 'Docker', 'AWS', 'System Design', 'PostgreSQL', 'GraphQL', 'TailwindCSS', 'Data Structures'].map((s) => (
              <span
                key={s}
                onClick={() => addSkill(s)}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.15rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                + {s}
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-lg"
            style={{ minWidth: '220px' }}
          >
            {saving ? (
              <>
                <Sparkles size={18} className="animate-spin" /> Saving Profile...
              </>
            ) : (
              <>
                <Save size={18} /> Save & Update Profile
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
