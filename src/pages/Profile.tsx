import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Trophy, Camera, Star, Settings } from 'lucide-react';
import { japanRegions } from '../data/regions';
import { achievements } from '../data/achievements';

const Profile = () => {
  const unlockedRegionsCount = japanRegions.filter(r => r.unlocked).length;
  const unlockedAchievements = achievements.filter(a => {
    // Simple achievement calculation for demo
    switch (a.type) {
      case 'first_unlock':
        return unlockedRegionsCount > 0;
      case 'three_regions':
        return unlockedRegionsCount >= 3;
      case 'five_regions':
        return unlockedRegionsCount >= 5;
      case 'all_regions':
        return unlockedRegionsCount >= 8;
      default:
        return false;
    }
  });

  const totalSteps = 127842; // Demo step count
  const joinDate = new Date('2024-01-15');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">探索者 太郎</h1>
            <p className="text-blue-100">冒険家 • レベル {Math.floor(unlockedRegionsCount * 2) + 1}</p>
            <p className="text-blue-100 text-sm">
              {joinDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })} から参加
            </p>
          </div>
          <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-[#1B2E57] mb-4">冒険統計</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <MapPin className="mx-auto mb-2 text-[#2E86C1]" size={24} />
            <div className="text-2xl font-bold text-[#2E86C1]">{unlockedRegionsCount}</div>
            <div className="text-sm text-gray-600">解禁済み地域</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Trophy className="mx-auto mb-2 text-[#27AE60]" size={24} />
            <div className="text-2xl font-bold text-[#27AE60]">{unlockedAchievements.length}</div>
            <div className="text-sm text-gray-600">実績</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <Camera className="mx-auto mb-2 text-[#F39C12]" size={24} />
            <div className="text-2xl font-bold text-[#F39C12]">{unlockedRegionsCount * 3}</div>
            <div className="text-sm text-gray-600">撮影した写真</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Star className="mx-auto mb-2 text-[#9B59B6]" size={24} />
            <div className="text-2xl font-bold text-[#9B59B6]">{totalSteps.toLocaleString()}</div>
            <div className="text-sm text-gray-600">総歩数</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-bold text-[#1B2E57] mb-4">最近の活動</h3>
        <div className="space-y-4">
          {japanRegions
            .filter(r => r.unlocked && r.unlockedAt)
            .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
            .slice(0, 3)
            .map((region) => (
              <div key={region.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ backgroundColor: region.color }}
                >
                  {region.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{region.name}を解禁</p>
                  <p className="text-sm text-gray-600">
                    {new Date(region.unlockedAt!).toLocaleDateString('ja-JP')} • +100 XP
                  </p>
                </div>
                <Trophy size={16} className="text-[#F39C12]" />
              </div>
            ))}
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-bold text-[#1B2E57] mb-4">日本探索の進捗</h3>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">全体の進捗</span>
            <span className="text-lg font-bold text-[#2E86C1]">
              {Math.round((unlockedRegionsCount / japanRegions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedRegionsCount / japanRegions.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-[#2E86C1] to-[#F39C12] h-3 rounded-full"
            />
          </div>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-4 gap-2">
          {japanRegions.map((region) => (
            <div
              key={region.id}
              className={`aspect-square rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                region.unlocked ? 'shadow-md' : 'bg-gray-300'
              }`}
              style={{
                backgroundColor: region.unlocked ? region.color : undefined
              }}
            >
              {region.unlocked ? region.name.charAt(0) : '?'}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Latest Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-lg font-bold text-[#1B2E57] mb-4">最新の実績</h3>
        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.slice(-2).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 bg-gradient-to-br from-[#27AE60] to-[#2ECC71] rounded-lg flex items-center justify-center text-white text-lg shadow-md">
                  {achievement.icon}
                </div>
                <div>
                  <p className="font-bold text-[#27AE60]">{achievement.title}</p>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Trophy size={48} className="mx-auto mb-4 text-gray-300" />
            <p>まだ実績が解禁されていません</p>
            <p className="text-sm">探索を始めて最初のバッジを獲得しましょう！</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;