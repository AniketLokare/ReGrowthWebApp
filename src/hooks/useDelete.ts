import { useState } from 'react';

interface DeleteConfirmationModalValues {
  id: string;
  name: string;
}

type UseDeleteProps = {
  onDelete: (id: string) => void;
};

export const useDeleteConfirmationModal = (props: UseDeleteProps) => {
  const { onDelete } = props;
  const [deleteConfirmationModalValues, setDeleteConfirmationModalValues] =
    useState<DeleteConfirmationModalValues>({ id: '', name: '' });
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState<boolean>(false);

  const onDeleteConfirm = () => {
    onDelete(deleteConfirmationModalValues.id);
    setShowDeleteConfirmationModal(false);
  };

  const onShowDeleteConfirmationModal = (id: string, name: string) => {
    setDeleteConfirmationModalValues({ id, name });
    setShowDeleteConfirmationModal(true);
  };

  const onClose = () => setShowDeleteConfirmationModal(false);

  return {
    deleteConfirmationModalValues,
    showDeleteConfirmationModal,
    onDeleteConfirm,
    onShowDeleteConfirmationModal,
    onClose,
  };
};

export default useDeleteConfirmationModal;