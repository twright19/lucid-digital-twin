'use client'

import GovContractorTwin from '../components/GovContractorTwin'

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Government Contractor Process Simulation</h2>
        <p className="mt-1 text-sm text-gray-500">
          Adjust the parameters below to simulate different scenarios and optimize your contract performance.
        </p>
      </div>
      <GovContractorTwin />
    </div>
  )
}