import { StatsCards } from "@/components/admin/stats-cards";
import { FacilitiesTable } from "@/components/admin/facilities-table";
import { AddFacilityForm } from "@/components/admin/facilityform";
import { stats, facilities } from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back!</p>
        </div>
        <AddFacilityForm />
      </div>

      <StatsCards stats={stats} />
      <FacilitiesTable facilities={facilities} />
    </div>
  );
}
