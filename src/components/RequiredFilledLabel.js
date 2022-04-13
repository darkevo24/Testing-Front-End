const RequiredFilledLabel = ({ label }) => {
  return (
    <>
      <span className="sdp-text-red mr-5">*</span>
      {label}
    </>
  );
};

export default RequiredFilledLabel;
