import React from 'react';
import { achievements } from '../data/achievements';
import { japanRegions } from '../data/regions';
import { motion } from 'framer-motion';
import { Trophy, Star, Lock } from 'lucide-react';

const Achievements = () => {
  const unlockedRegionsCount = japanRegions.filter(r => r.unlocked).length;

  const calculateProgress = (achievement: typeof achievements[0]) => {
    switch (achievement.type) {
      case 'first_unlock':
        return unlockedRegionsCount > 0 ? 100 : 0;
      case 'three_regions':
        return Math.min((unlockedRegionsCount / 3) * 100, 100);
      case 'five_regions':
        return Math.min((unlockedRegionsCount / 5) * 100, 100);
      case 'all_regions':
        return Math.min((unlockedRegionsCount / 8) * 100, 100);
      case 'photo_collector':
        return Math.min((unlockedRegionsCount * 3 / 10) * 100, 100);
      default:
        return 0;
    }
  };

  const isUnlocked = (achievement: typeof achievements[0]) => {
    const progress = calculateProgress(achievement);
    return progress >= 100;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white rounded-xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center mb-4">
          <Trophy size={32} className="mr-3" />
          <h1 className="text-2xl font-bold">実績</h1>
        </div>
        <p className="text-orange-100">探索の進捗を追跡し、特別なバッジを獲得しましょう</p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl font-bold text-[#1B2E57] mb-4">全体の進捗</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#2E86C1]">{unlockedRegionsCount}</div>
            <div className="text-sm text-gray-600">解禁済み地域</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#27AE60]">
              {achievements.filter(a => isUnlocked(a)).length}
            </div>
            <div className="text-sm text-gray-600">実績</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F39C12]">{unlockedRegionsCount * 3}</div>
            <div className="text-sm text-gray-600">撮影した写真</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#E67E22]">
              {Math.round((unlockedRegionsCount / 8) * 100)}%
            </div>
            <div className="text-sm text-gray-600">完了率</div>
          </div>
        </div>
      </motion.div>

      {/* Achievements List */}
      <div className="space-y-4">
        {achievements.map((achievement, index) => {
          const progress = calculateProgress(achievement);
          const unlocked = isUnlocked(achievement);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 ${
                unlocked
                  ? 'border-[#27AE60] bg-gradient-to-r from-green-50 to-white'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Achievement Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md ${
                    unlocked
                      ? 'bg-gradient-to-br from-[#27AE60] to-[#2ECC71]'
                      : 'bg-gray-200'
                  }`}>
                    {unlocked ? (
                      <span className="text-white">{achievement.icon}</span>
                    ) : (
                      <Lock size={24} className="text-gray-400" />
                    )}
                  </div>

                  {/* Achievement Details */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className={`text-lg font-bold mr-2 ${
                        unlocked ? 'text-[#27AE60]' : 'text-[#1B2E57]'
                      }`}>
                        {achievement.title}
                      </h3>
                      {unlocked && (
                        <Star size={16} className="text-[#F39C12] fill-current" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3">{achievement.description}</p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">進捗</span>
                        <span className={`font-medium ${
                          unlocked ? 'text-[#27AE60]' : 'text-[#2E86C1]'
                        }`}>
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          className={`h-2 rounded-full ${
                            unlocked
                              ? 'bg-gradient-to-r from-[#27AE60] to-[#2ECC71]'
                              : 'bg-gradient-to-r from-[#2E86C1] to-[#45B7D1]'
                          }`}
                        />
                      </div>
                    </div>

                    {unlocked && achievement.unlockedAt && (
                      <p className="text-sm text-[#27AE60] mt-2 font-medium">
                        {new Date(achievement.unlockedAt).toLocaleDateString('ja-JP')} に解禁
                      </p>
                    )}
                  </div>
                </div>

                {/* Achievement Status */}
                <div className="text-right">
                  {unlocked ? (
                    <div className="bg-[#27AE60] text-white px-3 py-1 rounded-full text-sm font-medium">
                      完了
                    </div>
                  ) : (
                    <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      未達成
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Achievement Hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-xl p-6 mt-6 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-2">次の目標</h3>
        <p className="text-blue-100">
          {unlockedRegionsCount === 0
            ? "最初の地域を解禁して「はじめの一歩」実績を獲得しましょう！"
            : unlockedRegionsCount < 3
            ? `あと${3 - unlockedRegionsCount}つの地域を解禁してエクスプローラーになりましょう！`
            : unlockedRegionsCount < 5
            ? `あと${5 - unlockedRegionsCount}つの地域を解禁してアドベンチャラーになりましょう！`
            : unlockedRegionsCount < 8
            ? `あと${8 - unlockedRegionsCount}つの地域を解禁してマスターエクスプローラーになりましょう！`
            : "おめでとうございます！すべての地域を解禁し、旅を完了しました！"}
        </p>
      </motion.div>
    </div>
  );
};

export default Achievements;