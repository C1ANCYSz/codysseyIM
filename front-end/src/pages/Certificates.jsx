import { useGetCertificates } from "../hooks/user/useGetCertificates";
import { GiCancel } from "react-icons/gi";
import { FiDownload } from "react-icons/fi";

function Certificates() {
  const { certificates, isLoading, error } = useGetCertificates();

  console.log(certificates);
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!certificates?.length) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <GiCancel className="text-6xl text-red-400" />
        <h2 className="text-2xl font-semibold text-gray-300">
          No certificates yet
        </h2>
        <p className="text-gray-400">
          Complete roadmaps to earn your certificates
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-12 text-center text-4xl font-bold text-white">
        My Certificates
      </h1>
      <div className="flex flex-wrap gap-4">
        {certificates.map((certificate) => (
          <div
            key={certificate._id}
            className="group bg-footer-900/50 relative overflow-hidden rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg">
              <img
                src={certificate.roadmap.image}
                alt={certificate.roadmap.title}
                className="h-[128px] w-[128px] object-cover"
              />
            </div>
            <h3 className="mb-4 text-center text-xl font-semibold text-white">
              {certificate.roadmap.title}
            </h3>
            <a
              href={`http://localhost:3000/api/student/certificates/${certificate._id}`}
              target="_blank"
              rel="noreferrer"
              download
              className="bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
            >
              <FiDownload className="text-lg" />
              <span>Download Certificate</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;
