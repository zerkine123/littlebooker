import React, { useState } from 'react';
import { Download, Upload, Save, RefreshCw } from 'lucide-react';
import { useBookStore } from '../../store/bookStore';

export const Settings: React.FC = () => {
  const { exportBooks, importBooks, books } = useBookStore();
  const [importData, setImportData] = useState('');
  const [showImport, setShowImport] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    const data = exportBooks();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookhaven-books-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setMessage({ type: 'success', text: 'Books exported successfully!' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImport = () => {
    if (!importData.trim()) {
      setMessage({ type: 'error', text: 'Please enter JSON data to import' });
      return;
    }

    const success = importBooks(importData);
    if (success) {
      setMessage({ type: 'success', text: 'Books imported successfully!' });
      setImportData('');
      setShowImport(false);
    } else {
      setMessage({ type: 'error', text: 'Invalid JSON data. Please check your input.' });
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your application settings and data</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {/* Data Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Data Management</h2>
          <p className="text-gray-600 mt-1">Export and import your book data</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Export Section */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Export Books</h3>
              <p className="text-sm text-gray-600">
                Download all your books as a JSON file ({books.length} books)
              </p>
            </div>
            <button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>

          {/* Import Section */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">Import Books</h3>
                <p className="text-sm text-gray-600">
                  Import books from a JSON file or paste JSON data
                </p>
              </div>
              <button
                onClick={() => setShowImport(!showImport)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
            </div>

            {showImport && (
              <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload JSON File
                  </label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                </div>

                <div className="text-center text-gray-500">or</div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste JSON Data
                  </label>
                  <textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                    placeholder="Paste your JSON data here..."
                  />
                </div>

                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowImport(false);
                      setImportData('');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Import Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Application Information</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Version</h3>
              <p className="text-gray-600">1.0.0</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Last Updated</h3>
              <p className="text-gray-600">January 2024</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Total Books</h3>
              <p className="text-gray-600">{books.length} books</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Storage</h3>
              <p className="text-gray-600">Local Storage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};