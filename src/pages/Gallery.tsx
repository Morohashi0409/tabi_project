import React from 'react';
import { japanRegions } from '../data/regions';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar } from 'lucide-react';

const Gallery = () => {
  const unlockedRegions = japanRegions.filter(region => region.unlocked && region.photoUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white rounded-xl p-6 mb-6 shadow-lg"
      >
        <div className="flex items-center mb-4">
          <Camera size={32} className="mr-3" />
          <h1 className="text-2xl font-bold">フォトギャラリー</h1>
        </div>
        <p className="text-orange-100">日本全国の旅の思い出コレクション</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#2E86C1]">{unlockedRegions.length}</div>
            <div className="text-sm text-gray-600">写真</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#27AE60]">
              {japanRegions.filter(r => r.unlocked).length}
            </div>
            <div className="text-sm text-gray-600">地域</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#F39C12]">
              {japanRegions.filter(r => r.unlocked).reduce((acc, r) => acc + r.prefecture.length, 0)}
            </div>
            <div className="text-sm text-gray-600">都道府県</div>
          </div>
        </div>
      </motion.div>

      {/* Photo Grid */}
      {unlockedRegions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unlockedRegions.map((region, index) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={region.photoUrl}
                  alt={region.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{region.name}</h3>
                </div>
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                  style={{ backgroundColor: region.color }}
                >
                  {region.name.charAt(0)}
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">{region.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={14} className="mr-2" />
                    <span>{region.prefecture.join(', ')}</span>
                  </div>
                  {region.unlockedAt && (
                    <div className="flex items-center text-gray-600">
                      <Calendar size={14} className="mr-2" />
                      <span>解禁日: {new Date(region.unlockedAt).toLocaleDateString('ja-JP')}</span>
                    </div>
                  )}
                </div>

                {/* Prefecture Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {region.prefecture.slice(0, 3).map((pref) => (
                    <span
                      key={pref}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {pref}
                    </span>
                  ))}
                  {region.prefecture.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      他{region.prefecture.length - 3}県
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Camera size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">まだ写真がありません</h3>
          <p className="text-gray-500 mb-6">
            冒険を始めて地域を解禁し、写真コレクションを作りましょう！
          </p>
          <motion.a
            href="/map"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-lg font-medium shadow-lg"
          >
            <MapPin size={16} className="mr-2" />
            マップを探索
          </motion.a>
        </motion.div>
      )}

      {/* Photo Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 rounded-xl p-6 mt-6 border border-blue-200"
      >
        <h3 className="text-lg font-bold text-[#2E86C1] mb-3 flex items-center">
          <Camera size={20} className="mr-2" />
          写真撮影のコツ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>🌅 ゴールデンアワー:</strong> 日の出や日没時に撮影すると温かく美しい光が得られます
          </div>
          <div>
            <strong>🏛️ 地元の名所:</strong> 有名な建物や自然の特色を含めて撮影しましょう
          </div>
          <div>
            <strong>🍜 食文化:</strong> 地域の特産品や地元料理を撮影しましょう
          </div>
          <div>
            <strong>👥 人と文化:</strong> 祭り、伝統、日常生活を記録しましょう
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Gallery;