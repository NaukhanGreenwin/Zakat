import ZakatCalculator from '../components/ZakatCalculator';
import ZakatFAQ from '../components/ZakatFAQ';
import Dedication from '../components/Dedication';

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">🌙 Zakat Calculator</span>
          </h1>
        </div>

        <Dedication />

        <div className="mt-16">
          <ZakatCalculator />
        </div>

        <div className="mt-16">
          <ZakatFAQ />
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>This calculator is intended as a helpful tool and should not replace scholarly advice.</p>
          <p className="mt-1">Remember to pay your Zakat to help those in need.</p>
        </div>
      </div>
    </main>
  );
}
