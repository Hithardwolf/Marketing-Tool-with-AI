'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ImageEditor from '../components/ImageEditor'; // relative import (adjust if needed)

const API_URL = 'http://localhost:3001';

interface Poster {
  id: number;
  prompt: string;
  imageUrl: string;
  createdAt: string;
}

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [publishing, setPublishing] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  // Editor state
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [editedImages, setEditedImages] = useState<Record<number, { imageUrl: string; caption: string }>>({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('userEmail');

    if (!userId) {
      router.push('/login');
      return;
    }

    setUserEmail(email || '');
    loadPosters(userId);
  }, [router]);

  const loadPosters = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posters/user/${userId}`);
      setPosters(response.data);
    } catch (error) {
      console.error('Failed to load posters:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePoster = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    setGenerating(true);

    try {
      const response = await axios.post(`${API_URL}/posters/generate`, {
        userId: parseInt(userId),
        prompt: prompt.trim(),
      });

      // Prepend new poster
      setPosters((prev) => [response.data, ...prev]);
      setPrompt('');
    } catch (error: any) {
      console.error('Failed to generate poster:', error);
      alert(error.response?.data?.message || 'Failed to generate poster');
    } finally {
      setGenerating(false);
    }
  };

  const publishToTwitter = async (poster: Poster) => {
    if (publishing) return;

    setPublishing(poster.id);

    try {
      const response = await axios.post(`${API_URL}/twitter/publish`, {
        imageUrl: poster.imageUrl,
        text: poster.prompt,
      });

      if (response.data.success) {
        alert('Posted to Twitter successfully! ✓');
        window.open(response.data.data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Twitter publish error:', error);
      alert(error.response?.data?.message || 'Failed to publish to Twitter');
    } finally {
      setPublishing(null);
    }
  };

  // --- Image editor handlers ---
  const handleEdit = (poster: Poster) => {
    setEditingPoster(poster);
  };

  const handleSaveEdit = (editedImageUrl: string, caption: string) => {
    if (!editingPoster) return;

    setEditedImages((prev) => ({
      ...prev,
      [editingPoster.id]: { imageUrl: editedImageUrl, caption },
    }));

    setEditingPoster(null);
  };

  const publishToTwitterWithEdit = async (poster: Poster) => {
    if (publishing) return;

    setPublishing(poster.id);

    const edited = editedImages[poster.id];
    const imageUrl = edited?.imageUrl || poster.imageUrl;
    const caption = edited?.caption || poster.prompt;

    try {
      const response = await axios.post(`${API_URL}/twitter/publish`, {
        imageUrl,
        text: caption,
      });

      if (response.data.success) {
        alert('Posted to Twitter successfully! ✓');
        window.open(response.data.data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Twitter publish error:', error);
      alert(error.response?.data?.message || 'Failed to publish to Twitter');
    } finally {
      setPublishing(null);
    }
  };
  // --- end editor handlers ---

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Apple-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🎨</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">AI Marketing Tool</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:block">{userEmail}</span>
              <button
                onClick={() => router.push('/analytics')}
                className="text-sm text-blue-500 hover:text-blue-600 font-medium transition"
              >
                Analytics
              </button>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
            Create stunning posters
            <br />
            with AI.
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your vision and watch as AI brings it to life in seconds.
          </p>
        </div>

        {/* Generator */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Summer sale with tropical beach vibes..."
                className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                disabled={generating}
                onKeyDown={(e) => e.key === 'Enter' && generatePoster()}
              />
              <button
                onClick={generatePoster}
                disabled={generating || !prompt.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm self-end"
              >
                {generating ? 'Creating...' : 'Generate'}
              </button>
            </div>

            {generating && (
              <div className="mt-6 flex items-center justify-center gap-3 text-gray-600">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-sm">Creating your poster...</span>
              </div>
            )}
          </div>
        </div>

        {/* Posters Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : posters.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posters yet</h3>
            <p className="text-gray-600">Create your first AI-generated poster above.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">Your Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posters.map((poster) => (
                <div
                  key={poster.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={editedImages[poster.id]?.imageUrl || poster.imageUrl}
                      alt={poster.prompt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(poster.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-900 mb-4 line-clamp-2">
                      {editedImages[poster.id]?.caption || poster.prompt}
                    </p>

                    {/* Buttons: Edit + Post (uses edited image/caption if present) */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(poster)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-medium text-sm transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => publishToTwitterWithEdit(poster)}
                        disabled={publishing === poster.id}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {publishing === poster.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Publishing...</span>
                          </>
                        ) : (
                          <>
                            <span>Post</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Image Editor Modal */}
      {editingPoster && (
        <ImageEditor
          imageUrl={editedImages[editingPoster.id]?.imageUrl || editingPoster.imageUrl}
          initialCaption={editedImages[editingPoster.id]?.caption || editingPoster.prompt}
          onSave={handleSaveEdit}
          onClose={() => setEditingPoster(null)}
        />
      )}
    </div>
  );
}
