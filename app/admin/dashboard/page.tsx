'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import {
  LogOut,
  Mail,
  Clock,
  CheckCircle,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  User,
  MessageSquare,
  Calendar
} from 'lucide-react';

// Prevent static generation - this page requires runtime Firebase
export const dynamic = 'force-dynamic';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType?: string;
  currentSituation?: string;
  timeline?: string;
  budget?: string;
  features?: string[];
  designNeeds?: string;
  techPreferences?: string;
  description: string;
  subject?: string; // Legacy field
  message?: string; // Legacy field
  estimatedPrice?: {
    min: number;
    max: number;
  };
  estimatedTimeline?: string;
  recommendedTier?: string;
  status: string;
  read: boolean;
  createdAt: string;
  ip?: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Inquiry[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const markAsRead = async (inquiryId: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        read: !currentStatus,
      });
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatFeature = (feature: string) => {
    const featureMap: Record<string, string> = {
      auth: 'User Authentication',
      database: 'Database',
      admin: 'Admin Panel',
      payments: 'Payment Processing',
      ai: 'AI/ML Features',
      realtime: 'Real-time Updates',
      analytics: 'Analytics',
      api: 'API Integration',
      search: 'Search',
      notifications: 'Notifications',
    };
    return featureMap[feature] || feature;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  const unreadCount = inquiries.filter((i) => !i.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Contact Inquiries</h1>
              <p className="text-sm text-gray-400 mt-1">
                {inquiries.length} total {unreadCount > 0 && `• ${unreadCount} unread`}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inquiries List */}
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No inquiries yet</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  onClick={() => {
                    setSelectedInquiry(inquiry);
                    if (!inquiry.read) markAsRead(inquiry.id, inquiry.read);
                  }}
                  className={`bg-white/5 border rounded-xl p-6 cursor-pointer transition-all hover:bg-white/10 ${
                    selectedInquiry?.id === inquiry.id
                      ? 'border-cyan-500 bg-white/10'
                      : 'border-white/10'
                  } ${!inquiry.read ? 'border-l-4 border-l-cyan-500' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{inquiry.name}</h3>
                        {!inquiry.read && (
                          <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs font-medium rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{inquiry.email}</p>
                    </div>
                  </div>
                  {inquiry.projectType && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-xs font-medium capitalize">
                        {inquiry.projectType.replace('-', ' ')}
                      </span>
                      {inquiry.estimatedPrice && (
                        <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-medium">
                          {formatPrice(inquiry.estimatedPrice.min)} - {formatPrice(inquiry.estimatedPrice.max)}
                        </span>
                      )}
                    </div>
                  )}
                  {inquiry.subject && (
                    <p className="text-white font-medium mb-2">{inquiry.subject}</p>
                  )}
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {inquiry.description || inquiry.message}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(inquiry.createdAt)}
                    </div>
                    <div className="flex items-center gap-1 capitalize">
                      {inquiry.status === 'new' && <AlertCircle className="w-3 h-3" />}
                      {inquiry.status === 'responded' && <CheckCircle className="w-3 h-3" />}
                      {inquiry.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Inquiry Detail */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedInquiry ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between pb-6 border-b border-white/10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedInquiry.projectType
                        ? `${selectedInquiry.projectType.replace('-', ' ')} Project`
                        : selectedInquiry.subject || 'Inquiry Details'}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedInquiry.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">From</p>
                      <p className="text-white font-medium">{selectedInquiry.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Pricing Estimate */}
                {selectedInquiry.estimatedPrice && (
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2">Estimated Investment</p>
                    <p className="text-2xl font-bold text-green-400 mb-2">
                      {formatPrice(selectedInquiry.estimatedPrice.min)} -{' '}
                      {formatPrice(selectedInquiry.estimatedPrice.max)}
                    </p>
                    {selectedInquiry.estimatedTimeline && (
                      <p className="text-sm text-gray-400">
                        Timeline: {selectedInquiry.estimatedTimeline}
                      </p>
                    )}
                    {selectedInquiry.recommendedTier && (
                      <p className="text-sm text-gray-400 mt-1">
                        Recommended: {selectedInquiry.recommendedTier} Tier
                      </p>
                    )}
                  </div>
                )}

                {/* Project Details */}
                {selectedInquiry.projectType && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">Project Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedInquiry.currentSituation && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Situation</p>
                          <p className="text-white font-medium capitalize text-sm">
                            {selectedInquiry.currentSituation.replace('-', ' ')}
                          </p>
                        </div>
                      )}
                      {selectedInquiry.timeline && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Timeline</p>
                          <p className="text-white font-medium capitalize text-sm">
                            {selectedInquiry.timeline}
                          </p>
                        </div>
                      )}
                      {selectedInquiry.budget && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Budget</p>
                          <p className="text-white font-medium text-sm">{selectedInquiry.budget}</p>
                        </div>
                      )}
                      {selectedInquiry.designNeeds && (
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <p className="text-xs text-gray-400 mb-1">Design</p>
                          <p className="text-white font-medium capitalize text-sm">
                            {selectedInquiry.designNeeds.replace('-', ' ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                {selectedInquiry.features && selectedInquiry.features.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Required Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInquiry.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm"
                        >
                          {formatFeature(feature)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Preferences */}
                {selectedInquiry.techPreferences && selectedInquiry.techPreferences !== 'no-preference' && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Tech Stack</h3>
                    <p className="text-gray-300 capitalize">
                      {selectedInquiry.techPreferences.replace('-', ' ')}
                    </p>
                  </div>
                )}

                {/* Description/Message */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-400">
                      {selectedInquiry.projectType ? 'Project Vision' : 'Message'}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-white whitespace-pre-wrap">
                      {selectedInquiry.description || selectedInquiry.message}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="responded">Responded</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t border-white/10">
                  <button
                    onClick={() => markAsRead(selectedInquiry.id, selectedInquiry.read)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all"
                  >
                    {selectedInquiry.read ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Mark Unread</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Mark Read</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Select an inquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
