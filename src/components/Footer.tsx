function Footer({ total, handleReset, handleSubmit }) {
  return (
    <footer className="footer footer-center p-5 bg-base-200 text-base-content rounded fixed bottom-0 left-0">
      <div className="grid grid-flow-col gap-2 w-[75%]">
        <button className="btn btn-ghost" onClick={handleReset}>
          Reset
        </button>
        <h2 className="footer-title">Total: ${total}</h2>
        <button className="btn btn-ghost" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </footer>
  );
}

export default Footer;
