import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiLayers } from 'react-icons/fi';
import { useCMS } from '../../context/CMSContext';

const CustomFieldsManager = ({ pageKey, title }) => {
  const { customFields, addCustomField, deleteCustomField } = useCMS();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newField, setNewField] = useState({ label: '', value: '' });

  const activeFields = customFields && customFields[pageKey] ? customFields[pageKey] : [];

  const handleAddField = (e) => {
    e.preventDefault();
    if (!newField.label.trim() || !newField.value.trim()) return;
    if (addCustomField) {
      addCustomField(pageKey, newField);
    }
    setNewField({ label: '', value: '' });
    setShowAddForm(false);
  };

  return (
    <div className="dash-form-wrapper" style={{ marginTop: '24px', background: '#ffffff', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 2px', color: '#121212', fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiLayers style={{ color: '#ff6b00' }} /> {title || 'Custom Dynamic Content Fields'}
          </h4>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            Add custom labels, keys, or sub-content fields dynamically.
          </span>
        </div>

        <button 
          type="button" 
          className="action-pill-btn primary-pill"
          style={{ background: '#121212', color: '#ffffff', border: 'none', fontWeight: 800 }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FiPlus /> {showAddForm ? 'Close Form' : '+ Add Custom Field'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddField} className="dash-form-grid" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <div className="dash-field-group">
            <label className="dash-label">Field Name / Label</label>
            <input 
              type="text" 
              placeholder="e.g. Sub-headline / Notice / Special Link" 
              className="dash-input-styled"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              required
            />
          </div>

          <div className="dash-field-group">
            <label className="dash-label">Field Content / Value</label>
            <input 
              type="text" 
              placeholder="e.g. Enter custom text content" 
              className="dash-input-styled"
              value={newField.value}
              onChange={(e) => setNewField({ ...newField, value: e.target.value })}
              required
            />
          </div>

          <div className="dash-field-group full-width" style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="action-pill-btn primary-pill" style={{ background: 'linear-gradient(135deg, #ff6b00, #ea580c)', color: '#ffffff', border: 'none' }}>
              <FiCheck /> Save Field
            </button>
            <button type="button" className="action-pill-btn" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {activeFields.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
            Active Dynamic Fields ({activeFields.length})
          </div>
          {activeFields.map((field) => (
            <div 
              key={field.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justify: 'space-between', 
                padding: '12px 16px', 
                background: '#fff7ed', 
                borderRadius: '14px', 
                border: '1px solid #fed7aa' 
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, background: '#ffedd5', color: '#ea580c', padding: '2px 8px', borderRadius: '8px', marginRight: '8px' }}>
                  {field.label}
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                  {field.value}
                </span>
              </div>

              <button 
                type="button" 
                className="promo-mint-btn" 
                style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca', padding: '5px 10px', fontSize: '0.75rem' }} 
                onClick={() => deleteCustomField && deleteCustomField(pageKey, field.id)}
              >
                <FiTrash2 /> Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px', color: '#94a3b8', fontSize: '0.82rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
          No custom fields added yet. Click <strong>+ Add Custom Field</strong> above to add custom properties.
        </div>
      )}
    </div>
  );
};

export default CustomFieldsManager;
