import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

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
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold" fontSize="xl">
          New Entry
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Input
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
          />
          <Textarea
            placeholder="Start writing your entry here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minHeight="200px"
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewEntryModal;
