import { useGetCertificates } from "../hooks/user/useGetCertificates";

function Certificates() {
  const { certificates, isLoading, error } = useGetCertificates();
  console.log(certificates);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex items-center">
      {certificates.map((certificate) => (
        <div key={certificate._id}>
          {certificate.roadmap.title}
          <img
            src={certificate.roadmap.image}
            alt={certificate.roadmap.title}
          />
          <a
            href={`http://localhost:3000/api/student/certificates/${certificate._id}`}
            target="_blank"
            rel="noreferrer"
            download
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}

export default Certificates;
