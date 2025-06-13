'use client';

import { useState, useRef } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { KBatchBadge } from '@/components/ui/KBatchBadge';
import { useToast } from '@/components/Toast';
import BottomNavigation from '@/components/BottomNavigation';
import {
  User,
  Settings,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  MessageCircle,
  Camera,
  Edit3,
  Save,
  X,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  LogOut,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Heart,
  Users,
  Image,
  Video,
  Hash,
  MapPin
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { showToast } = useToast();
  const avatarInputRef = useRef(null);

  // Profile Settings State
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    username: 'johndoe2024',
    email: 'john.doe@bitmesra.ac.in',
    bio: 'Computer Science student at BIT Mesra. Love coding and coffee ☕',
    location: 'Ranchi, Jharkhand',
    website: 'https://johndoe.dev',
    birthday: '2002-03-15',
    kbatch: '2024',
    branch: 'Computer Science & Engineering',
    interests: ['Programming', 'AI/ML', 'Web Development', 'Gaming'],
    skills: ['JavaScript', 'React', 'Python', 'Node.js']
  });

  // Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    emailVisibility: 'friends',
    phoneVisibility: 'private',
    postVisibility: 'public',
    storyVisibility: 'friends',
    allowMessages: 'everyone',
    allowTagging: 'friends',
    showOnlineStatus: true,
    showReadReceipts: true,
    allowSearchByEmail: false,
    allowSearchByPhone: false
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    likes: true,
    comments: true,
    mentions: true,
    follows: true,
    messages: true,
    posts: true,
    events: true,
    achievements: false,
    newsletters: true,
    promotions: false
  });

  // App Settings State
  const [appSettings, setAppSettings] = useState({
    theme: 'system',
    language: 'en',
    autoplayVideos: true,
    highQualityImages: true,
    saveDataMode: false,
    offlineMode: false,
    fontSize: 'medium',
    compactMode: false
  });

  const settingSections = [
    { id: 'profile', name: 'Profile', icon: User, description: 'Manage your profile information' },
    { id: 'privacy', name: 'Privacy', icon: Shield, description: 'Control who can see your content' },
    { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Manage your notification preferences' },
    { id: 'appearance', name: 'Appearance', icon: Moon, description: 'Customize your app experience' },
    { id: 'security', name: 'Security', icon: Lock, description: 'Account security and login settings' },
    { id: 'data', name: 'Data & Storage', icon: Download, description: 'Manage your data and storage' },
    { id: 'help', name: 'Help & Support', icon: HelpCircle, description: 'Get help and contact support' }
  ];

  const handleProfileUpdate = () => {
    showToast('Profile updated successfully!', 'success');
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle avatar upload
      showToast('Avatar updated successfully!', 'success');
    }
  };

  const handlePasswordChange = () => {
    showToast('Password change email sent to your inbox', 'info');
  };

  const handleDataExport = () => {
    showToast('Data export will be emailed to you within 24 hours', 'info');
  };

  const handleAccountDelete = () => {
    if (showDeleteConfirm) {
      showToast('Account deletion scheduled. You have 30 days to cancel.', 'error');
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2"
        >
          {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar size="xl" className="w-20 h-20" />
          {isEditing && (
            <button
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          )}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{profileData.name}</h4>
          <p className="text-gray-600 dark:text-gray-400">@{profileData.username}</p>
          <KBatchBadge batch={profileData.kbatch} branch={profileData.branch} />
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <Input
            value={profileData.name}
            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <Input
            value={profileData.username}
            onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <Input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <Input
            value={profileData.location}
            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
            disabled={!isEditing}
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <Input
            value={profileData.website}
            onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
            disabled={!isEditing}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Birthday
          </label>
          <Input
            type="date"
            value={profileData.birthday}
            onChange={(e) => setProfileData(prev => ({ ...prev, birthday: e.target.value }))}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
          disabled={!isEditing}
          rows={3}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500"
          placeholder="Tell us about yourself..."
        />
      </div>

      {/* Interests & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Interests
          </label>
          <div className="flex flex-wrap gap-2">
            {profileData.interests.map((interest, index) => (
              <Badge key={index} variant="secondary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <Badge key={index} variant="primary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3">
          <Button onClick={handleProfileUpdate} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Profile Visibility</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your profile</p>
          </div>
          <select
            value={privacySettings.profileVisibility}
            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Email Visibility</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Who can see your email</p>
          </div>
          <select
            value={privacySettings.emailVisibility}
            onChange={(e) => setPrivacySettings(prev => ({ ...prev, emailVisibility: e.target.value }))}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="public">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Allow Messages</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Who can send you messages</p>
          </div>
          <select
            value={privacySettings.allowMessages}
            onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.value }))}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends Only</option>
            <option value="none">No One</option>
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Show Online Status</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Let others know when you're online</p>
          </div>
          <button
            onClick={() => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: !prev.showOnlineStatus }))}
            className={`w-12 h-6 rounded-full transition-colors ${privacySettings.showOnlineStatus ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${privacySettings.showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
              }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Read Receipts</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Show when you've read messages</p>
          </div>
          <button
            onClick={() => setPrivacySettings(prev => ({ ...prev, showReadReceipts: !prev.showReadReceipts }))}
            className={`w-12 h-6 rounded-full transition-colors ${privacySettings.showReadReceipts ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${privacySettings.showReadReceipts ? 'translate-x-6' : 'translate-x-1'
              }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Delivery Methods</h4>
          <div className="space-y-3">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
              { key: 'pushNotifications', label: 'Push Notifications', icon: Smartphone },
              { key: 'smsNotifications', label: 'SMS Notifications', icon: MessageCircle }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-300">{label}</span>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-12 h-6 rounded-full transition-colors ${notificationSettings[key] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notificationSettings[key] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Activity Notifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: 'likes', label: 'Likes on your posts', icon: Heart },
              { key: 'comments', label: 'Comments on your posts', icon: MessageCircle },
              { key: 'mentions', label: 'Mentions in posts', icon: Hash },
              { key: 'follows', label: 'New followers', icon: Users },
              { key: 'messages', label: 'Direct messages', icon: Mail },
              { key: 'posts', label: 'Posts from friends', icon: Bell }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                </div>
                <button
                  onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-10 h-5 rounded-full transition-colors ${notificationSettings[key] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings[key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance & Display</h3>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Theme</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'light', label: 'Light', icon: Sun },
              { value: 'dark', label: 'Dark', icon: Moon },
              { value: 'system', label: 'System', icon: Smartphone }
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setAppSettings(prev => ({ ...prev, theme: value }))}
                className={`p-4 rounded-lg border-2 transition-all ${appSettings.theme === value
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${appSettings.theme === value ? 'text-blue-500' : 'text-gray-500'
                  }`} />
                <div className="text-sm font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Display Options</h4>
          <div className="space-y-3">
            {[
              { key: 'autoplayVideos', label: 'Autoplay Videos', description: 'Videos will play automatically in feeds' },
              { key: 'highQualityImages', label: 'High Quality Images', description: 'Download images in higher resolution' },
              { key: 'compactMode', label: 'Compact Mode', description: 'Show more content in less space' }
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{label}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
                </div>
                <button
                  onClick={() => setAppSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-12 h-6 rounded-full transition-colors ${appSettings[key] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${appSettings[key] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>

      <div className="space-y-4">
        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Password & Authentication</h4>
          <div className="space-y-4">
            <Button onClick={handlePasswordChange} className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full">
              View Login Activity
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Connected Apps</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Manage apps and services connected to your account
          </p>
          <Button variant="outline" className="w-full">
            Manage Connected Apps
          </Button>
        </Card>

        <Card className="p-6 border-red-200 dark:border-red-800">
          <h4 className="font-medium text-red-900 dark:text-red-300 mb-4">Danger Zone</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
              Deactivate Account
            </Button>
            <Button
              variant="outline"
              onClick={handleAccountDelete}
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              {showDeleteConfirm ? 'Confirm Delete Account' : 'Delete Account'}
            </Button>
            {showDeleteConfirm && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium">This action cannot be undone!</span>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Your account and all data will be permanently deleted after 30 days.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data & Storage</h3>

      <div className="space-y-4">
        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Data Export</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Download a copy of your data including posts, messages, and profile information.
          </p>
          <Button onClick={handleDataExport} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export My Data
          </Button>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Storage Usage</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Photos & Videos</span>
              <span>245 MB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Messages</span>
              <span>89 MB</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Clear Cache
          </Button>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Data Preferences</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Save Data Mode</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Reduce data usage</div>
              </div>
              <button
                onClick={() => setAppSettings(prev => ({ ...prev, saveDataMode: !prev.saveDataMode }))}
                className={`w-12 h-6 rounded-full transition-colors ${appSettings.saveDataMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${appSettings.saveDataMode ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderHelpSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Help & Support</h3>

      <div className="space-y-4">
        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Get Help</h4>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ & Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Info className="w-4 h-4 mr-2" />
              Community Guidelines
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">About</h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Dec 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span>2024.12.001</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" className="w-full">
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full mt-2">
              Privacy Policy
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Account Actions</h4>
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-300 hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderSettingContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      case 'data':
        return renderDataSettings();
      case 'help':
        return renderHelpSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Settings className="w-8 h-8 text-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account and app preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {settingSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${activeSection === section.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{section.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                          {section.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              {renderSettingContent()}
            </Card>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation currentPage="settings" />
    </PageLayout>

  );
}
