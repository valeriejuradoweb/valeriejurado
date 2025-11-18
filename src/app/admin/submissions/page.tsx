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
                {submissions.map((submission) => {
                  const isSpam = submission.spamDetected || false;
                  return (
                    <div 
                      key={submission.id} 
                      className={`border rounded-lg p-4 ${
                        isSpam 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-lg font-semibold ${
                          isSpam ? 'text-red-900' : 'text-gray-900'
                        }`}>
                          {submission.firstName} {submission.lastName}
                        </h3>
                        <div className="flex flex-wrap gap-2 items-center">
                          {isSpam && (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-200 text-red-900 font-semibold">
                              ⚠️ SPAM DETECTED
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            submission.mailchimpAdded 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {submission.mailchimpAdded ? 'Added to Mailchimp' : 'Not added to Mailchimp'}
                          </span>
                          {submission.recaptchaScore !== undefined && (
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              submission.recaptchaScore >= 0.7 
                                ? 'bg-blue-100 text-blue-800' 
                                : submission.recaptchaScore >= 0.5
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              reCAPTCHA: {submission.recaptchaScore.toFixed(2)}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(submission.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      {isSpam && submission.spamReasons && submission.spamReasons.length > 0 && (
                        <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded">
                          <p className="text-xs font-semibold text-red-900 mb-1">Spam Detection Reasons:</p>
                          <ul className="list-disc list-inside text-xs text-red-800">
                            {submission.spamReasons.map((reason, idx) => (
                              <li key={idx}>{reason}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
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
                      
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-1">
                        <p><strong>Submission ID:</strong> {submission.id}</p>
                        {submission.ipAddress && (
                          <p><strong>IP Address:</strong> {submission.ipAddress}</p>
                        )}
                        {submission.userAgent && (
                          <p><strong>User Agent:</strong> <span className="font-mono text-xs">{submission.userAgent}</span></p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

