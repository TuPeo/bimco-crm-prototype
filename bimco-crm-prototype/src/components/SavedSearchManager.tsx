'use client';

import { useState, useEffect } from 'react';
import { SavedSearch, PowerSearchQuery, UserPermissions } from '@/types';
import {
  BookmarkIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  EyeIcon,
  EyeSlashIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface SavedSearchManagerProps {
  currentQuery: PowerSearchQuery | null;
  userPermissions: UserPermissions;
  onLoadSearch: (search: SavedSearch) => void;
  onDeleteSearch?: (searchId: string) => void;
  onShareSearch?: (search: SavedSearch) => void;
}

interface SavedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (search: Omit<SavedSearch, 'id' | 'createdAt' | 'updatedAt'>) => void;
  currentQuery: PowerSearchQuery | null;
  editingSearch?: SavedSearch | null;
}

function SavedSearchModal({ isOpen, onClose, onSave, currentQuery, editingSearch }: SavedSearchModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isPublic: false,
    category: '',
    tags: [] as string[],
    newTag: ''
  });

  useEffect(() => {
    if (editingSearch) {
      setFormData({
        title: editingSearch.title,
        description: editingSearch.description || '',
        isPublic: editingSearch.isPublic,
        category: editingSearch.category || '',
        tags: editingSearch.tags || [],
        newTag: ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        isPublic: false,
        category: '',
        tags: [],
        newTag: ''
      });
    }
  }, [editingSearch, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuery || !formData.title.trim()) return;

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      query: currentQuery,
      isPublic: formData.isPublic,
      category: formData.category || undefined,
      tags: formData.tags,
      userId: 'current-user', // This would come from auth context
      isStarred: editingSearch?.isStarred || false
    });

    onClose();
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const categories = [
    'Company Research',
    'Contact Lists',
    'Course Planning',
    'Fleet Management',
    'Compliance',
    'Sales Prospects',
    'Member Engagement'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            {editingSearch ? 'Edit Saved Search' : 'Save Current Search'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter search title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Optional description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={formData.isPublic}
              onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              Share with team (make public)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!currentQuery || !formData.title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingSearch ? 'Update' : 'Save'} Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SavedSearchManager({
  currentQuery,
  userPermissions,
  onLoadSearch,
  onDeleteSearch,
  onShareSearch
}: SavedSearchManagerProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSearch, setEditingSearch] = useState<SavedSearch | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [showOnlyPublic, setShowOnlyPublic] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSavedSearches: SavedSearch[] = [
      {
        id: '1',
        title: 'Active Danish Members',
        description: 'All active member companies in Denmark',
        query: {
          query: 'Denmark',
          filters: {
            entityTypes: ['company'],
            countries: ['Denmark'],
            companyTypes: ['Member'],
            status: ['Active']
          },
          sorting: { field: 'name', direction: 'asc' },
          pagination: { page: 1, limit: 50 }
        },
        userId: 'current-user',
        isPublic: false,
        isStarred: true,
        category: 'Member Engagement',
        tags: ['denmark', 'members', 'active'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Maritime Training Courses 2024',
        description: 'All maritime training courses for this year',
        query: {
          query: 'maritime training',
          filters: {
            entityTypes: ['course'],
            categories: ['Maritime Training'],
            dateRange: { start: '2024-01-01', end: '2024-12-31' }
          },
          sorting: { field: 'dateCreated', direction: 'desc' },
          pagination: { page: 1, limit: 25 }
        },
        userId: 'team-user',
        isPublic: true,
        isStarred: false,
        category: 'Course Planning',
        tags: ['maritime', 'training', '2024'],
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      },
      {
        id: '3',
        title: 'Prospect Companies - Germany',
        description: 'German companies that could become members',
        query: {
          query: 'Germany prospect',
          filters: {
            entityTypes: ['company'],
            countries: ['Germany'],
            status: ['Prospect']
          },
          sorting: { field: 'lastUpdated', direction: 'desc' },
          pagination: { page: 1, limit: 100 }
        },
        userId: 'current-user',
        isPublic: false,
        isStarred: true,
        category: 'Sales Prospects',
        tags: ['germany', 'prospects', 'sales'],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-02-15')
      }
    ];

    setSavedSearches(mockSavedSearches);
  }, []);

  const handleSaveSearch = (searchData: Omit<SavedSearch, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSearch: SavedSearch = {
      ...searchData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (editingSearch) {
      setSavedSearches(prev => prev.map(search => 
        search.id === editingSearch.id 
          ? { ...newSearch, id: editingSearch.id, createdAt: editingSearch.createdAt }
          : search
      ));
    } else {
      setSavedSearches(prev => [...prev, newSearch]);
    }

    setEditingSearch(null);
  };

  const handleToggleStar = (searchId: string) => {
    setSavedSearches(prev => prev.map(search =>
      search.id === searchId
        ? { ...search, isStarred: !search.isStarred, updatedAt: new Date() }
        : search
    ));
  };

  const handleDeleteSearch = (searchId: string) => {
    if (confirm('Are you sure you want to delete this saved search?')) {
      setSavedSearches(prev => prev.filter(search => search.id !== searchId));
      onDeleteSearch?.(searchId);
    }
  };

  const categories = ['all', 'Company Research', 'Contact Lists', 'Course Planning', 'Fleet Management', 'Compliance', 'Sales Prospects', 'Member Engagement'];

  const filteredSearches = savedSearches.filter(search => {
    if (selectedCategory !== 'all' && search.category !== selectedCategory) return false;
    if (showOnlyStarred && !search.isStarred) return false;
    if (showOnlyPublic && !search.isPublic) return false;
    return true;
  });

  const userSearches = filteredSearches.filter(s => s.userId === 'current-user');
  const publicSearches = filteredSearches.filter(s => s.isPublic && s.userId !== 'current-user');

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BookmarkSolidIcon className="h-5 w-5 text-blue-600 mr-2" />
              Saved Searches
            </h3>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowOnlyStarred(!showOnlyStarred)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  showOnlyStarred
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                <StarIcon className={`h-4 w-4 mr-1 ${showOnlyStarred ? 'text-yellow-500' : ''}`} />
                Starred
              </button>

              <button
                onClick={() => setShowOnlyPublic(!showOnlyPublic)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  showOnlyPublic
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                <ShareIcon className="h-4 w-4 mr-1" />
                Public
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={!currentQuery}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Save Current Search
          </button>
        </div>
      </div>

      <div className="p-6">
        {filteredSearches.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {savedSearches.length === 0 ? (
              <>
                <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No saved searches yet.</p>
                <p className="text-sm">Perform a search and save it for quick access later.</p>
              </>
            ) : (
              <p>No searches match the current filters.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* User's Searches */}
            {userSearches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <FolderIcon className="h-4 w-4 mr-2" />
                  My Searches ({userSearches.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userSearches.map((search) => (
                    <div
                      key={search.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 flex items-center">
                            {search.title}
                            {search.isStarred && (
                              <StarSolidIcon className="h-4 w-4 text-yellow-500 ml-2" />
                            )}
                            {search.isPublic && (
                              <ShareIcon className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </h5>
                          {search.description && (
                            <p className="text-sm text-gray-600 mt-1">{search.description}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => handleToggleStar(search.id)}
                            className="p-1 text-gray-400 hover:text-yellow-500"
                            title={search.isStarred ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            {search.isStarred ? (
                              <StarSolidIcon className="h-4 w-4" />
                            ) : (
                              <StarIcon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingSearch(search);
                              setShowModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit search"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSearch(search.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete search"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {search.category && (
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {search.category}
                          </span>
                        </div>
                      )}

                      {search.tags && search.tags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {search.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {search.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{search.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => onLoadSearch(search)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          Load Search
                        </button>
                        
                        <span className="text-xs text-gray-500">
                          {search.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Public Searches */}
            {publicSearches.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <ShareIcon className="h-4 w-4 mr-2" />
                  Team Searches ({publicSearches.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {publicSearches.map((search) => (
                    <div
                      key={search.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors bg-green-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 flex items-center">
                            {search.title}
                            <ShareIcon className="h-4 w-4 text-green-500 ml-2" />
                          </h5>
                          {search.description && (
                            <p className="text-sm text-gray-600 mt-1">{search.description}</p>
                          )}
                        </div>
                      </div>

                      {search.category && (
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {search.category}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => onLoadSearch(search)}
                          className="text-sm font-medium text-green-600 hover:text-green-700"
                        >
                          Load Search
                        </button>
                        
                        <span className="text-xs text-gray-500">
                          {search.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <SavedSearchModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingSearch(null);
        }}
        onSave={handleSaveSearch}
        currentQuery={currentQuery}
        editingSearch={editingSearch}
      />
    </div>
  );
}
