import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Trophy, Camera, TrendingUp } from 'lucide-react';
import { japanRegions } from '../data/regions';
import { motion } from 'framer-motion';

const Home = () => {
  const unlockedCount = japanRegions.filter(region => region.unlocked).length;
  const totalRegions = japanRegions.length;
  const progressPercentage = (unlockedCount / totalRegions) * 100;

  const recentUnlocks = japanRegions
    .filter(region => region.unlocked && region.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
    .slice(0, 2);

  const todaySteps = 8547; // Demo step count

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-xl p-6 mb-6 shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-2">おかえりなさい、探検家！</h1>
        <p className="text-blue-100">日本の新しい地域を発見する準備はできましたか？</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-[#1B2E57] mb-4 flex items-center">
          <Trophy className="mr-2 text-[#F39C12]" size={24} />
          あなたの進捗
        </h2>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">解禁済み地域</span>
            <span className="text-2xl font-bold text-[#2E86C1]">
              {unlockedCount}/{totalRegions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-[#2E86C1] to-[#F39C12] h-3 rounded-full shadow-inner"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{progressPercentage.toFixed(0)}% 完了</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <TrendingUp className="mx-auto mb-2 text-[#2E86C1]" size={24} />
            <p className="text-sm text-gray-600">今日の歩数</p>
            <p className="text-xl font-bold text-[#2E86C1]">{todaySteps.toLocaleString()}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <Camera className="mx-auto mb-2 text-[#F39C12]" size={24} />
            <p className="text-sm text-gray-600">撮影した写真</p>
            <p className="text-xl font-bold text-[#F39C12]">{unlockedCount * 3}</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Unlocks */}
      {recentUnlocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
        >
          <h3 className="text-lg font-bold text-[#1B2E57] mb-4 flex items-center">
            <MapPin className="mr-2 text-[#27AE60]" size={20} />
            最近の解禁
          </h3>
          <div className="space-y-3">
            {recentUnlocks.map((region) => (
              <div key={region.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: region.color }}
                >
                  {region.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{region.name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(region.unlockedAt!).toLocaleDateString('ja-JP')} に解禁
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link
          to="/map"
          className="bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <MapPin className="mb-3" size={32} />
          <h3 className="text-lg font-bold mb-2">マップを探索</h3>
          <p className="text-blue-100">新しい地域を発見し、次の冒険を計画しましょう</p>
        </Link>

        <Link
          to="/achievements"
          className="bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Trophy className="mb-3" size={32} />
          <h3 className="text-lg font-bold mb-2">実績</h3>
          <p className="text-orange-100">進捗を確認し、新しいバッジを獲得しましょう</p>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;