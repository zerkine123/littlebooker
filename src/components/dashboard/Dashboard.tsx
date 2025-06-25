import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { LoginForm } from './LoginForm';
import { DashboardLayout } from './DashboardLayout';
import { DashboardHome } from './DashboardHome';
import { BooksList } from './BooksList';
import { BookForm } from './BookForm';
import { FreebiesList } from './FreebiesList';
import { FreebieForm } from './FreebieForm';
import { SiteSettings } from './SiteSettings';
import { Book, Freebie } from '../../types/Book';

export const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editingFreebie, setEditingFreebie] = useState<Freebie | null>(null);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setCurrentPage('edit-book');
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setCurrentPage('add-book');
  };

  const handleSaveBook = () => {
    setEditingBook(null);
    setCurrentPage('books');
  };

  const handleCancelEditBook = () => {
    setEditingBook(null);
    setCurrentPage('books');
  };

  const handleEditFreebie = (freebie: Freebie) => {
    setEditingFreebie(freebie);
    setCurrentPage('edit-freebie');
  };

  const handleAddFreebie = () => {
    setEditingFreebie(null);
    setCurrentPage('add-freebie');
  };

  const handleSaveFreebie = () => {
    setEditingFreebie(null);
    setCurrentPage('freebies');
  };

  const handleCancelEditFreebie = () => {
    setEditingFreebie(null);
    setCurrentPage('freebies');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'books':
        return <BooksList onEditBook={handleEditBook} onAddBook={handleAddBook} />;
      case 'add-book':
      case 'edit-book':
        return (
          <BookForm
            book={editingBook || undefined}
            onSave={handleSaveBook}
            onCancel={handleCancelEditBook}
          />
        );
      case 'freebies':
        return <FreebiesList onEditFreebie={handleEditFreebie} onAddFreebie={handleAddFreebie} />;
      case 'add-freebie':
      case 'edit-freebie':
        return (
          <FreebieForm
            freebie={editingFreebie || undefined}
            onSave={handleSaveFreebie}
            onCancel={handleCancelEditFreebie}
          />
        );
      case 'settings':
        return <SiteSettings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  );
};