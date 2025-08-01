import toast from "react-hot-toast";

export function showCopyToast() {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex items-center p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-gray-500 flex-shrink-0"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path
              d="
                M 33.197266 9.2714844
                C 20.281821 9.2714844 9.7910156 19.764243 9.7910156 32.679688
                C 9.7910156 45.595239 20.284785 56.085938 33.199219 56.085938
                C 46.098891 56.085938 56.115234 45.842172 56.115234 32.953125
                C 56.115234 29.623112 55.515011 27.186677 54.259766 24.341797
                A 1.0001 1.0001 0 1 0 52.429688 25.148438
                C 53.614441 27.833557 54.115234 29.851138 54.115234 32.953125
                C 54.115234 44.814078 45.047547 54.085938 33.199219 54.085938
                C 21.365653 54.085938 11.791016 44.514135 11.791016 32.679688
                C 11.791016 20.845132 21.36271 11.271484 33.197266 11.271484
                C 39.884981 11.271484 45.77146 14.400892 49.697266 19.197266
                C 39.948314 24.516952 32.695185 35.518278 28.818359 44.048828
                C 25.004581 36.806968 19.589844 31.146484 19.589844 31.146484
                A 1.0001 1.0001 0 1 0 18.160156 32.544922
                C 18.160156 32.544922 24.3787 38.929794 27.964844 46.611328
                A 1.0001 1.0001 0 0 0 29.792969 46.574219
                C 33.416137 37.916259 41.494372 25.353394 51.644531 20.365234
                A 1.0001 1.0001 0 0 0 52.082031 18.845703
                C 47.822715 13.041627 40.942391 9.2714844 33.197266 9.2714844
                z
              "
            />
          </svg>

          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Copied to clipboard!
            </p>
          </div>
        </div>
      </div>
    ),
    { duration: 10 } 
  );
}
