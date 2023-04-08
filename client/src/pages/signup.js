export default function Signup() {
  return (
  <div className="flex justify-center items-center h-full">
    <div className="card h-min w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Sign up!</h2>
        <input type="text" placeholder="Username" className="input input-bordered input-secondary w-full max-w-xs" />
        <input type="text" placeholder="Password" className="input input-bordered input-secondary w-full max-w-xs" />

        <div className="card-actions flex flex-row justify-between items-center">
          <button className="btn btn-primary">Sign up</button>
          <a className="link link-secondary">Login instead</a>
        </div>
      </div>
    </div>
  </div>
  );
}