export default function Newsletter() {
  return (
    <div className="w-full">
      <form className="flex items-center justify-center p-2">
        <input
          type="email"
          placeholder="Email address"
          className="w-full rounded-l-md p-2 text-black"
        />
        <button
          type="submit"
          className="rounded-r-md bg-blue-600 p-2 px-4 font-bold text-white hover:bg-blue-900"
        >
          Join
        </button>
      </form>
      <p className="text-left text-sm">
        By entering your email, you agree to our Terms of Use & Privacy Policy,
        including receipt of emails and promotions. You can unsubcribe at any
        time.
      </p>
    </div>
  );
}
