const Profile = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="mb-0">Profile Information</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Name:</strong>
            </div>
            <div className="col-md-9">
              <p className="text-muted">Not available</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Email:</strong>
            </div>
            <div className="col-md-9">
              <p className="text-muted">Not available</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <strong>Phone:</strong>
            </div>
            <div className="col-md-9">
              <p className="text-muted">Not available</p>
            </div>
          </div>
          {/* Add more profile details here */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
