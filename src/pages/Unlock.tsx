import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { japanRegions } from '../data/regions';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, Upload, Clock, CheckCircle } from 'lucide-react';

const Unlock = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds for demo
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const region = japanRegions.find(r => r.id === regionId);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleUnlock();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  if (!region) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">地域が見つかりません</h1>
          <button
            onClick={() => navigate('/map')}
            className="mt-4 px-6 py-2 bg-[#2E86C1] text-white rounded-lg"
          >
            マップに戻る
          </button>
        </div>
      </div>
    );
  }

  const handleLocationSelect = () => {
    // Demo: simulate location selection
    setSelectedLocation({ lat: 35.6762 + Math.random() * 10, lng: 139.6503 + Math.random() * 10 });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimeLeft(5); // Reset to 5 seconds
  };

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setTimeout(() => {
        navigate('/map');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <AnimatePresence mode="wait">
        {isUnlocked ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle size={80} className="mx-auto text-[#27AE60] mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold text-[#27AE60] mb-4">
              {region.name} を解禁しました！
            </h1>
            <p className="text-gray-600 text-lg">
              おめでとうございます！新しい地域を発見しました。
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">+100 探索ポイント</p>
              <p className="text-green-600 text-sm">新しい思い出が作られました！</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="unlock-process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-[#1B2E57]">{region.name}を解禁</h1>
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md"
                  style={{ backgroundColor: region.color }}
                >
                  {region.name.charAt(0)}
                </div>
              </div>
              <p className="text-gray-700">{region.description}</p>
            </div>

            {/* Step 1: Location Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  selectedLocation ? 'bg-[#27AE60] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <h3 className="text-lg font-bold text-[#1B2E57]">場所を選択</h3>
              </div>
              
              {selectedLocation ? (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center text-[#27AE60]">
                    <MapPin size={20} className="mr-2" />
                    <span className="font-medium">
                      場所が選択されました: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">{region.name}地域の現在地を選択してください</p>
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                    <button
                      onClick={handleLocationSelect}
                      className="px-6 py-3 bg-[#2E86C1] text-white rounded-lg font-medium hover:bg-[#45B7D1] transition-colors"
                    >
                      <MapPin size={16} className="mr-2 inline" />
                      デモ位置を選択
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Photo Upload */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  uploadedPhoto ? 'bg-[#27AE60] text-white' : selectedLocation ? 'bg-[#2E86C1] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <h3 className="text-lg font-bold text-[#1B2E57]">写真をアップロード</h3>
              </div>

              {uploadedPhoto ? (
                <div className="space-y-4">
                  <img src={uploadedPhoto} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center text-[#27AE60]">
                      <Camera size={20} className="mr-2" />
                      <span className="font-medium">写真のアップロードが完了しました！</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">訪問を記念して写真を撮影してください</p>
                  <label className={`block w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    selectedLocation ? 'border-[#2E86C1] hover:border-[#45B7D1] hover:bg-blue-50' : 'border-gray-300 cursor-not-allowed'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={!selectedLocation}
                    />
                    <div className="flex flex-col items-center justify-center h-full">
                      <Upload size={24} className={selectedLocation ? 'text-[#2E86C1]' : 'text-gray-400'} />
                      <span className={`mt-2 font-medium ${selectedLocation ? 'text-[#2E86C1]' : 'text-gray-400'}`}>
                        写真をアップロード
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Step 3: Stay Duration */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  isTimerRunning || timeLeft === 0 ? 'bg-[#27AE60] text-white' : 
                  uploadedPhoto ? 'bg-[#2E86C1] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
                <h3 className="text-lg font-bold text-[#1B2E57]">滞在時間</h3>
              </div>

              {isTimerRunning ? (
                <div className="text-center">
                  <div className="text-6xl font-bold text-[#F39C12] mb-4">
                    {timeLeft}
                  </div>
                  <p className="text-gray-600">残り秒数（デモモード）</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-[#F39C12] h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ) : timeLeft === 0 ? (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center text-[#27AE60] justify-center">
                    <Clock size={20} className="mr-2" />
                    <span className="font-medium">滞在時間完了！</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">エリアに5分間滞在してください（デモモードでは5秒）</p>
                  <button
                    onClick={startTimer}
                    disabled={!uploadedPhoto || isUnlocking}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      uploadedPhoto && !isUnlocking
                        ? 'bg-[#F39C12] text-white hover:bg-[#E67E22] hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Clock size={16} className="mr-2 inline" />
                    タイマー開始
                  </button>
                </div>
              )}
            </div>

            {/* Unlock Button */}
            {timeLeft === 0 && !isUnlocking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <button
                  onClick={handleUnlock}
                  className="px-8 py-4 bg-gradient-to-r from-[#27AE60] to-[#2ECC71] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🎉 {region.name}を解禁！ 🎉
                </button>
              </motion.div>
            )}

            {isUnlocking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-[#F39C12] border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-lg font-medium text-[#1B2E57]">地域を解禁中...</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Unlock;