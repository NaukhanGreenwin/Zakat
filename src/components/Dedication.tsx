"use client";

export default function Dedication() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center py-8 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-3">Dedicated to My Beloved Parents</h2>
        <p className="text-gray-700 italic max-w-2xl mx-auto">
          To the two souls who shaped my world with endless love and sacrifice. 
          May Allah bless you with radiant health, boundless joy, and the highest ranks in Jannah. 
          Every good deed from this tool is a testament to your beautiful teachings.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-500 text-left shadow-md">
          <h3 className="text-lg font-semibold text-emerald-800 mb-3">From the Holy Quran</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            "And establish prayer and give zakat, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing."
          </p>
          <p className="text-sm text-gray-500 text-right">— Surah Al-Baqarah 2:110</p>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500 text-left shadow-md">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Hadith on Zakat</h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            "When you pay the Zakat on your wealth, you have fulfilled what is required of you. Whoever collects goodness will have the reward of it."
          </p>
          <p className="text-sm text-gray-500 text-right">— Tirmidhi</p>
        </div>
      </div>
      
      <div className="mt-10 text-gray-600">
        <p className="text-sm">May this humble tool help Muslims fulfill their obligation of Zakat and bring benefit to those in need.</p>
        <p className="text-sm mt-2 font-medium">And may the reward of every calculation flow to my parents, whose love knows no calculation.</p>
      </div>
    </div>
  );
} 