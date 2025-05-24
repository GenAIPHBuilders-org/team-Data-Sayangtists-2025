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
  isSaving: boolean;
}

const NewEntryModal: React.FC<NewEntryModalProps> = ({ isOpen, onClose, onSave, isSaving }) => {
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
    if (isSaving || !title.trim() || !content.trim()) return;

    onSave(title, content);
  };

  const handleRequestClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleRequestClose} size="xl" isCentered closeOnOverlayClick={!isSaving}>
      <ModalOverlay />
      <ModalContent mx={{ base: 4, sm: 0}}>
        <ModalHeader fontWeight="bold" fontSize="xl" color="text.primary">
          New Entry
        </ModalHeader>
        <ModalCloseButton disabled={isSaving} />
        <ModalBody pb={6}>
          <Input
            placeholder="Entry Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={4}
            isDisabled={isSaving}
            focusBorderColor='brand.500'
            autoFocus
          />
          <Textarea
            placeholder="Start writing your entry here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minHeight="200px"
            isDisabled={isSaving}
            focusBorderColor='brand.500'
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleRequestClose} isDisabled={isSaving}>
            Cancel
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSave}
            isLoading={isSaving}
            isDisabled={isSaving || !title.trim() || !content.trim()}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewEntryModal;
