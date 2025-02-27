export default function ConfirmationPopup({ onYes, onNo, message }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className="flex flex-col max-w-md gap-4 p-6 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold leading-tight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 fill-current shrink-0 text-violet-600 dark:text-violet-400"
          >
            <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
            <rect width="32" height="136" x="240" y="112"></rect>
            <rect width="32" height="32" x="240" y="280"></rect>
          </svg>
          {message}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This action cannot be undone. Please confirm your choice.
        </p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-300"
            onClick={() => {
              onNo();
            }}
          >
            No
          </button>
          <button
            className="px-4 py-2 text-white bg-violet-600 rounded-md shadow-md hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            onClick={() => {
              onYes();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
