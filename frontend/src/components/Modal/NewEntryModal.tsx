import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './NewEntryModal.module.css';

// Modal accessibility setup
ReactModal.setAppElement('#root'); // Or VibeScribe's root element ID

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const NewEntryModal: React.FC<NewEntryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Reset fields when modal opens/closes if needed, or just closes
  useEffect(() => {
    if (!isOpen) {
        setTitle('');
        setContent('');
    }
  }, [isOpen]);

  const handleSave = () => {
    // Basic validation could be added here
    if (title.trim() && content.trim()) {
        onSave(title, content);
        // Reminder: Implement logic to keep modal open until save is confirmed by parent. For now, modal will close immediately.
        onClose();
    } else {
        alert('Please enter both title and content.');
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      contentLabel="New Journal Entry Modal"
    >
      <h2 className={styles.modalTitle}>New Entry</h2>
      <input
        type="text"
        placeholder="Entry Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />
      <textarea
        placeholder="Start writing your entry here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textAreaField}
      />
      <div className={styles.buttonContainer}>
        <button onClick={onClose} className={`${styles.modalButton} ${styles.cancelButton}`}>
          Cancel
        </button>
        <button onClick={handleSave} className={`${styles.modalButton} ${styles.saveButton}`}>
          Save
        </button>
      </div>
    </ReactModal>
  );
};

export default NewEntryModal;
