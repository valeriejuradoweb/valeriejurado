import { getAllSubmissions } from '@/lib/storage';

export default async function SubmissionsPage() {
  const submissions = getAllSubmissions();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Form Submissions ({submissions.length})
            </h1>
            
            {submissions.length === 0 ? (
              <p className="text-gray-500">No submissions yet.</p>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <div key={submission.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          submission.mailchimpAdded 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.mailchimpAdded ? 'Added to Mailchimp' : 'Not in Mailchimp'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(submission.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Email:</strong> {submission.email}</p>
                        {submission.phone && <p><strong>Phone:</strong> {submission.phone}</p>}
                        {submission.service && <p><strong>Service:</strong> {submission.service}</p>}
                        {submission.eventDate && <p><strong>Event Date:</strong> {submission.eventDate}</p>}
                      </div>
                      <div>
                        {submission.address1 && <p><strong>Address 1:</strong> {submission.address1}</p>}
                        {submission.address2 && <p><strong>Address 2:</strong> {submission.address2}</p>}
                      </div>
                    </div>
                    
                    {submission.details && (
                      <div className="mt-3">
                        <p><strong>Details:</strong></p>
                        <p className="text-gray-700 whitespace-pre-wrap">{submission.details}</p>
                      </div>
                    )}
                    
                    <div className="mt-3 text-xs text-gray-500">
                      <p><strong>Submission ID:</strong> {submission.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

