"use client"

import DashboardStats from "@/components/features/DashboardStats";
import EmissionChart from "@/components/features/EmissionChart";
import NetZeroTracker from "@/components/features/NetZeroTracker";
import GreenBadgeDisplay from "@/components/features/GreenBadgeDisplay";
import AIRecommendations from "@/components/features/AIRecommendations";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            dashboard
          </h1>

          
        </div>

        <DashboardStats />

        <div className="mt-8">
          <EmissionChart />
        </div>

        <div className="mt-8">
          <NetZeroTracker />
        </div>

        <div className="grid gap-8 mt-8 lg:grid-cols-2">
          <GreenBadgeDisplay />
          <AIRecommendations />
        </div>
      </section>
    </main>
  );
}