import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { japanRegions } from '../data/regions';
import { motion } from 'framer-motion';
import { Lock, MapPin, Camera } from 'lucide-react';

const Map = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(selectedRegion === regionId ? null : regionId);
  };

  const selectedRegionData = selectedRegion 
    ? japanRegions.find(r => r.id === selectedRegion)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <h1 className="text-2xl font-bold text-[#1B2E57] mb-2">日本地域マップ</h1>
        <p className="text-gray-600 mb-6">日本の8つの地域を探索し、解禁しましょう</p>

        {/* Map Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {japanRegions.map((region) => (
            <motion.div
              key={region.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRegionClick(region.id)}
              className={`relative aspect-square rounded-xl cursor-pointer border-2 transition-all duration-300 shadow-lg ${
                region.unlocked
                  ? 'border-transparent shadow-lg'
                  : 'border-dashed border-[#1B2E57] bg-[#1B2E57]/10'
              } ${
                selectedRegion === region.id ? 'ring-4 ring-[#F39C12]' : ''
              }`}
              style={{
                backgroundColor: region.unlocked ? region.color : '#1B2E57',
                backgroundImage: region.unlocked 
                  ? `linear-gradient(135deg, ${region.color}CC, ${region.color})`
                  : 'none'
              }}
            >
              {region.unlocked ? (
                <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{region.name}</h3>
                    <p className="text-xs opacity-90 mt-1">{region.prefecture.length} 県</p>
                  </div>
                  {region.photoUrl && (
                    <Camera size={16} className="self-end opacity-75" />
                  )}
                </div>
              ) : (
                <div className="absolute inset-0 p-3 flex flex-col items-center justify-center text-[#1B2E57]">
                  <Lock size={24} className="mb-2 opacity-50" />
                  <p className="text-sm font-medium text-center opacity-75">{region.name}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Region Details */}
        {selectedRegionData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#1B2E57] mb-2">
                  {selectedRegionData.name}
                </h3>
                <p className="text-gray-700 mb-3">{selectedRegionData.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRegionData.prefecture.map((pref) => (
                    <span
                      key={pref}
                      className="px-3 py-1 bg-white text-sm font-medium rounded-full border border-gray-200"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md"
                style={{ backgroundColor: selectedRegionData.color }}
              >
                {selectedRegionData.name.charAt(0)}
              </div>
            </div>

            {selectedRegionData.unlocked ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center text-[#27AE60]">
                  <MapPin size={20} className="mr-2" />
                  <span className="font-medium">
                    {new Date(selectedRegionData.unlockedAt!).toLocaleDateString('ja-JP')} に解禁
                  </span>
                </div>
                {selectedRegionData.photoUrl && (
                  <Link
                    to="/gallery"
                    className="flex items-center text-[#2E86C1] hover:text-[#F39C12] transition-colors"
                  >
                    <Camera size={16} className="mr-1" />
                    <span className="text-sm">写真を見る</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to={`/unlock/${selectedRegionData.id}`}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2E86C1] to-[#45B7D1] text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Lock size={16} className="mr-2" />
                地域を解禁
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-[#F39C12] to-[#E67E22] text-white rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-bold mb-2">探索の進捗</h3>
        <div className="flex items-center justify-between">
          <span>
            {japanRegions.filter(r => r.unlocked).length} / {japanRegions.length} 地域が解禁済み
          </span>
          <div className="text-2xl font-bold">
            {Math.round((japanRegions.filter(r => r.unlocked).length / japanRegions.length) * 100)}%
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Map;